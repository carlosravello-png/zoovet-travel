#!/usr/bin/env python3
"""
Auditoría HTML de solo lectura. No modifica archivos .html.
Uso: python audit_html.py [--root RUTA] [--report AUDIT_REPORT.md]
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urldefrag, urlparse


def read_text(path: Path) -> str:
    raw = path.read_bytes()
    for enc in ("utf-8-sig", "utf-8", "latin-1"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="replace")


def strip_scripts_and_styles(html: str) -> str:
    html = re.sub(r"(?is)<script\b[^>]*>.*?</script>", " ", html)
    html = re.sub(r"(?is)<style\b[^>]*>.*?</style>", " ", html)
    return html


RE_A_OPEN = re.compile(r"<a(\s[^>]*)?>", re.IGNORECASE)
RE_A_CLOSE = re.compile(r"</a\s*>", re.IGNORECASE)


def find_nested_anchors(html: str) -> list[tuple[int, int, str]]:
    """
    Detecta <a> que contiene otro <a> antes del </a> de cierre (anidación real).
    """
    sample = strip_scripts_and_styles(html)
    hits: list[tuple[int, int, str]] = []
    i = 0
    while True:
        m_open = RE_A_OPEN.search(sample, i)
        if not m_open:
            break
        depth = 1
        j = m_open.end()
        nested_at: int | None = None
        while depth > 0:
            m_next_a = RE_A_OPEN.search(sample, j)
            m_next_c = RE_A_CLOSE.search(sample, j)
            if m_next_c is None:
                break
            pos_a = m_next_a.start() if m_next_a else len(sample)
            pos_c = m_next_c.start()
            if m_next_a and pos_a < pos_c:
                if depth == 1:
                    nested_at = pos_a
                depth += 1
                j = m_next_a.end()
            else:
                depth -= 1
                j = m_next_c.end()
        if nested_at is not None:
            line = sample.count("\n", 0, nested_at) + 1
            last_nl = sample.rfind("\n", 0, nested_at)
            col = nested_at - last_nl
            snippet = sample[nested_at : nested_at + 100].replace("\n", " ")
            hits.append((line, col, snippet))
        if j <= m_open.end():
            j = m_open.end() + 1
        i = j
    return hits


# --- Crítico: firmas conocidas de meta description rota ---
RE_BROKEN_DESC = re.compile(
    r'name\s*=\s*["\']description["\'][^>]*(?:/&gt;|/>)\s*microchip|'
    r'&lt;\s*a\s+href\s*=\s*["\']|'
    r'glosario\s*=\s*["\']["\']|'
    r'name\s*=\s*["\']description["\'][^>]*\/>[A-Za-z<]',
    re.IGNORECASE,
)

def critical_head_issues(rel_path: str, text: str) -> list[str]:
    issues: list[str] = []
    lines = text.splitlines()
    head = text.lower()
    head_close = head.find("</head>")
    body_open = head.find("<body")

    if head_close == -1:
        issues.append("Sin etiqueta </head> (minúsculas) detectada.")
    if body_open == -1:
        issues.append("Sin etiqueta <body> detectada.")
    if head_close != -1 and body_open != -1 and head_close > body_open:
        issues.append("</head> aparece después de <body>.")

    if head_close != -1 and body_open != -1 and head_close < body_open:
        between = text[head_close + len("</head>") : body_open]
        stripped = between.strip()
        if stripped and not stripped.startswith("<!--"):
            # comentarios solos o mixtos: si queda texto sustantivo
            no_comments = re.sub(r"<!--.*?-->", "", between, flags=re.DOTALL).strip()
            if no_comments:
                preview = no_comments.replace("\n", " ")[:200]
                issues.append(f"Texto/markup entre </head> y <body>: {preview!r}")

    for i, line in enumerate(lines[:40], start=1):
        if "name" in line.lower() and "description" in line.lower():
            if RE_BROKEN_DESC.search(line) or (
                "&lt;a href=" in line
                and "glosario" in line
                and "/>" in line
            ):
                issues.append(f"L{i}: meta description corrupta (HTML embebido en atributo). Fragmento: {line.strip()[:220]!r}")

    # Comillas desbalanceadas en primeras líneas con <meta ... content="
    for i, line in enumerate(lines[:50], start=1):
        if re.match(r"^\s*<meta\b", line, re.I):
            q = line.count('"')
            if q % 2 == 1 and "/>" in line:
                issues.append(f"L{i}: número impar de comillas dobles en <meta/> — posible atributo roto. {line.strip()[:180]!r}")

    return issues


def check_truncated(text: str) -> list[str]:
    low = text.lower()
    issues = []
    if "</body>" not in low:
        issues.append("Falta </body>")
    if "</html>" not in low:
        issues.append("Falta </html>")
    if "</head>" not in low:
        issues.append("Falta </head>")
    return issues


def check_whatsapp(text: str) -> tuple[str | None, str | None]:
    """
    Retorna (None, None) si OK.
    'missing' o 'broken' con detalle.
    """
    if "whatsapp-float" not in text:
        return "missing", "No se encontró class con whatsapp-float"
    idx = text.find("whatsapp-float")
    window = text[idx : idx + 4000]
    svg_start = window.lower().find("<svg")
    if svg_start == -1:
        return "broken", "whatsapp-float presente pero sin <svg> cercano"
    svg_chunk = window[svg_start : svg_start + 3500]
    if not re.search(r"<path\s+[^>]*\bd\s*=", svg_chunk, re.I):
        return "broken", "SVG del botón sin <path d=...>"
    return None, None


def check_json_ld(text: str) -> bool:
    return bool(re.search(r'<script\s+[^>]*type\s*=\s*["\']?\s*application/ld\+json', text, re.I))


HREF_RE = re.compile(
    r"""href\s*=\s*(["'])(.*?)\1""",
    re.I | re.DOTALL,
)


def collect_internal_html_hrefs(base_file: Path, text: str) -> list[str]:
    out: list[str] = []
    for m in HREF_RE.finditer(text):
        href = m.group(2).strip()
        href = href.split("#", 1)[0].strip()
        if not href or href.startswith(("http://", "https://", "mailto:", "tel:", "javascript:", "//")):
            continue
        if ".html" not in href and not href.endswith("/"):
            continue
        if ".html" in href:
            out.append(href)
    return out


def resolve_local(repo_root: Path, base_file: Path, href: str) -> Path | None:
    href_clean, _frag = urldefrag(href)
    href_clean = unquote(href_clean.strip())
    if urlparse(href_clean).scheme in ("http", "https", "mailto", "tel"):
        return None
    try:
        if href_clean.startswith("/"):
            target = (repo_root / href_clean.lstrip("/")).resolve()
        else:
            target = (base_file.parent / href_clean).resolve()
    except OSError:
        return None
    try:
        target.relative_to(repo_root.resolve())
    except ValueError:
        return None
    return target


def audit_file(repo_root: Path, path: Path) -> dict:
    rel = str(path.relative_to(repo_root)).replace("\\", "/")
    text = read_text(path)
    low = text.lower()

    result: dict = {
        "path": rel,
        "critical": critical_head_issues(rel, text),
        "truncated": check_truncated(text),
        "nested_a": find_nested_anchors(text),
        "whatsapp": check_whatsapp(text),
        "json_ld": check_json_ld(text),
        "broken_hrefs": [],
    }

    for href in collect_internal_html_hrefs(path, text):
        tgt = resolve_local(repo_root, path, href)
        if tgt is None:
            continue
        if not tgt.is_file():
            result["broken_hrefs"].append((href, str(tgt.relative_to(repo_root)).replace("\\", "/")))

    return result


PRIORITY_FILES = [
    "zoopedia/index.html",
    "zoopedia/index-en.html",
    "zoopedia/index-fr.html",
    "glosario/index.html",
    "glosario/index-en.html",
    "glosario/index-fr.html",
    "index.html",
    "index-en.html",
    "index-fr.html",
    "kennels.html",
    "kennels-en.html",
    "kennels-fr.html",
]


def inspect_priority(repo_root: Path, rel: str) -> tuple[str, str]:
    """
    Inspección estructural prioritaria: ✅ o ❌ con nota y líneas relevantes.
    """
    path = repo_root / rel
    if not path.is_file():
        return "❌", f"Archivo no presente en el repositorio: `{rel}`"

    text = read_text(path)
    lines = text.splitlines()
    notes: list[str] = []

    low_full = text.lower()
    i_head_o = low_full.find("<head")
    i_head_c = low_full.find("</head>")
    i_body_o = low_full.find("<body")
    i_body_c = low_full.rfind("</body>")
    i_html_c = low_full.rfind("</html>")

    if i_head_o == -1:
        notes.append("L?: sin <head>")
    if i_head_c == -1:
        notes.append("L?: sin </head>")
    if i_body_o == -1:
        notes.append("L?: sin <body>")
    if i_head_o != -1 and i_head_c != -1 and i_body_o != -1:
        if not (i_head_o < i_head_c < i_body_o):
            notes.append("Orden incorrecto: se esperaba <head>…</head>…<body>")
        else:
            # línea aproximada de </head>
            head_c_line = text.count("\n", 0, i_head_c) + 1
            body_o_line = text.count("\n", 0, i_body_o) + 1
            notes.append(f"</head> ≈L{head_c_line}; <body> ≈L{body_o_line}")

    if i_body_c == -1:
        notes.append("Falta </body>")
    else:
        notes.append(f"</body> ≈L{text.count(chr(10), 0, i_body_c) + 1}")
    if i_html_c == -1:
        notes.append("Falta </html>")
    else:
        notes.append(f"</html> ≈L{text.count(chr(10), 0, i_html_c) + 1}")

    wa, wa_detail = check_whatsapp(text)
    if wa:
        notes.append(f"WhatsApp: {wa} ({wa_detail})")
    else:
        notes.append("WhatsApp: OK (whatsapp-float + path d=)")

    crit = critical_head_issues(rel, text)
    if crit:
        for c in crit[:3]:
            notes.append(f"Crítico: {c}")

    ok = not notes or all(
        not n.startswith(("L?: sin", "Falta ", "Orden incorrecto", "Crítico:"))
        for n in notes
    )
    # Re-evaluar: ok estricto
    strict_ok = (
        i_head_o != -1
        and i_head_c != -1
        and i_body_o != -1
        and i_body_c != -1
        and i_html_c != -1
        and i_head_o < i_head_c < i_body_o
        and wa is None
        and not crit
    )

    detail = "; ".join(notes) if notes else "Estructura coherente"
    return ("✅", detail) if strict_ok else ("❌", detail)


def run_audit(repo_root: Path) -> list[dict]:
    repo_root = repo_root.resolve()
    results: list[dict] = []
    for path in sorted(repo_root.rglob("*.html")):
        parts = {p.lower() for p in path.parts}
        if "node_modules" in parts:
            continue
        results.append(audit_file(repo_root, path))
    return results


def build_markdown(repo_root: Path, results: list[dict]) -> str:
    repo_root = repo_root.resolve()
    critical_files = [(r["path"], msg) for r in results for msg in r["critical"]]

    def section_list(title: str, items: list[str]) -> str:
        body = "\n".join(f"- {x}" for x in items) if items else "- *(ninguno)*"
        return f"## {title}\n\n{body}\n"

    # Crítico
    crit_lines = []
    for r in results:
        for msg in r["critical"]:
            crit_lines.append(f"- `{r['path']}` — {msg}")
    crit_block = "\n".join(crit_lines) if crit_lines else "- *(no detectados por heurística; revisar manualmente si persiste en prod)*"

    # Truncados
    trunc = [f"`{r['path']}` — {', '.join(r['truncated'])}" for r in results if r["truncated"]]

    # Nested a
    nested: list[str] = []
    for r in results:
        for line, col, snip in r["nested_a"]:
            nested.append(f"`{r['path']}` L{line}: {snip!r}")

    # WhatsApp
    wa_miss = [f"`{r['path']}`" for r in results if r["whatsapp"][0] == "missing"]
    wa_broke = [f"`{r['path']}` — {r['whatsapp'][1]}" for r in results if r["whatsapp"][0] == "broken"]

    # JSON-LD
    no_ld = [f"`{r['path']}`" for r in results if not r["json_ld"]]

    # Broken hrefs (dedupe per file+href)
    broken: list[str] = []
    seen: set[tuple[str, str]] = set()
    for r in results:
        for href, tgt in r["broken_hrefs"]:
            key = (r["path"], href)
            if key in seen:
                continue
            seen.add(key)
            broken.append(f"`{r['path']}` → `href={href!r}` (no existe `{tgt}`)")

    # Manual table
    rows = []
    for rel in PRIORITY_FILES:
        mark, note = inspect_priority(repo_root, rel)
        rows.append(f"| `{rel}` | {mark} | {note.replace('|', '\\|')} |")

    table = (
        "## Inspección manual (tabla ✅/❌)\n\n"
        "| Archivo | Estado | Nota |\n"
        "|---------|--------|------|\n"
        + "\n".join(rows)
        + "\n"
    )

    zoopedia = [r for r in results if r["path"].startswith("zoopedia/")]
    zo_crit = sum(1 for r in zoopedia if r["critical"])

    limitations = (
        "## Limitaciones del script\n\n"
        "- Detección de `<a>` anidados equilibra etiquetas `<a>`…`</a>` tras quitar `<script>`/`<style>`; "
        "un `<a>` sin cerrar aguas arriba puede hacer que enlaces posteriores (p. ej. WhatsApp flotante) "
        "aparezcan como anidados.\n"
        "- `href` solo se consideran enlaces locales si el atributo usa comillas simples o dobles "
        "consistentes con el regex.\n"
        "- Rutas absolutas del sitio (`https://zoovettravel.com/...`) no se validan contra disco.\n"
    )

    intro = (
        "# AUDIT_REPORT — HTML estático (solo lectura)\n\n"
        "Generado por `audit_html.py`. **Ningún archivo `.html` fue modificado** por esta auditoría.\n\n"
        "### Móvil vs escritorio (texto HTML visible)\n\n"
        "El fallo de fragmentos tipo `...Perú.\">` proviene de **HTML inválido en el `<head>`** "
        "(p. ej. meta `description` con comillas/atributos rotos). El motor HTML5 de cualquier navegador "
        "puede mostrar el remanente como nodo de texto en el body; **no es un problema exclusivo de CSS móvil**.\n\n"
        f"Archivos HTML auditados: **{len(results)}**. Páginas en `zoopedia/`: **{len(zoopedia)}** "
        f"(con hallazgos críticos en esta pasada: **{zo_crit}**).\n\n"
    )

    return (
        intro
        + "## PROBLEMA CRÍTICO: texto HTML visible\n\n"
        + crit_block
        + "\n\n"
        + section_list("Archivos truncados", trunc)
        + "\n"
        + section_list("<a> anidados", nested)
        + "\n"
        + "## WhatsApp ausente / roto\n\n"
        + "### Ausente\n\n"
        + ("\n".join(f"- {x}" for x in wa_miss) if wa_miss else "- *(ninguno)*")
        + "\n\n### Roto (float sin path SVG válido)\n\n"
        + ("\n".join(f"- {x}" for x in wa_broke) if wa_broke else "- *(ninguno)*")
        + "\n\n"
        + section_list("JSON-LD ausente", no_ld)
        + "\n"
        + section_list("Links internos rotos (href a .html inexistente)", broken[:500])
        + ("\n\n*(lista truncada a 500 entradas; ejecutar script y filtrar si hace falta)*\n" if len(broken) > 500 else "")
        + "\n"
        + table
        + "\n"
        + limitations
    )


def main() -> int:
    ap = argparse.ArgumentParser(description="Auditoría HTML solo lectura")
    ap.add_argument("--root", type=Path, default=Path(__file__).resolve().parent)
    ap.add_argument("--report", type=Path, default=None, help="Ruta del markdown de salida")
    args = ap.parse_args()
    root = args.root
    if not root.is_dir():
        print("Root inválido", file=sys.stderr)
        return 1
    results = run_audit(root)
    md = build_markdown(root, results)
    if args.report:
        args.report.write_text(md, encoding="utf-8")
        print(f"Escrito: {args.report}")
    else:
        print(md)
    # Resumen stderr
    n_crit = sum(len(r["critical"]) for r in results)
    print(f"Resumen: {len(results)} archivos, {n_crit} avisos críticos (líneas/mensajes)", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
