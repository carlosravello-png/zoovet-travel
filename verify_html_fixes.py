#!/usr/bin/env python3
"""
Verificación post-fixes (solo lectura). Genera AUDIT_VERIFICATION_REPORT.md
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urldefrag, urlparse

REPO = Path(__file__).resolve().parent

HREF_RE = re.compile(r"""href\s*=\s*(["'])(.*?)\1""", re.I | re.DOTALL)

EXCLUDE_BODY_CHECK = frozenset(
    {
        "google65c09db8e18af7da.html",
        "original_index.html",
    }
)

STRUCTURE_FILES = [
    "about.html",
    "about-en.html",
    "about-fr.html",
    "cargo.html",
    "cargo-en.html",
    "cargo-fr.html",
    "kennels.html",
    "kennels-en.html",
    "kennels-fr.html",
    "index-fr.html",
    "pet-travel-planner/index.html",
    "planificador-viaje-mascota/index.html",
    "planificateur-voyage-animal/index.html",
]

ZOOPEDIA_INDEX_META = [
    "zoopedia/index.html",
    "zoopedia/index-en.html",
    "zoopedia/index-fr.html",
]

INDEX_DOT_PATTERN = re.compile(r"index\.en\.html|index\.fr\.html", re.I)

RE_META_DESC = re.compile(
    r'<meta\s+[^>]*name\s*=\s*["\']description["\'][^>]*>',
    re.I | re.DOTALL,
)

ALEMANIA_P = re.compile(r"/zoopedia/alemania\.html", re.I)
ESTADOS_UNIDOS_P = re.compile(r"/zoopedia/estados-unidos(?:-en|-fr)?\.html", re.I)

MICROCHIP_BAD = (
    "/glosario/microchip.html",
    "/glosario/microchip-en.html",
    "/glosario/microchip-fr.html",
)


def read_text(path: Path) -> str:
    raw = path.read_bytes()
    for enc in ("utf-8-sig", "utf-8", "latin-1"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="replace")


def iter_html():
    for p in sorted(REPO.rglob("*.html")):
        if "node_modules" in {x.lower() for x in p.parts}:
            continue
        yield p


def check_a1(text: str, rel: str) -> list[tuple[str, str]]:
    bad = []
    for m in HREF_RE.finditer(text):
        val = m.group(2)
        if "</a>" in val.lower():
            bad.append((rel, val[:120]))
    return bad


def check_a2(text: str, rel: str) -> list[tuple[str, str]]:
    bad = []
    for m in HREF_RE.finditer(text):
        val = m.group(2)
        if "&lt;/a&gt;" in val.lower():
            bad.append((rel, val[:120]))
    return bad


def check_a3(text: str, rel: str) -> list[str]:
    if re.search(r"</a\s*>\s*</a\s*>", text, re.I):
        return [rel]
    return []


def meta_description_ok(text: str, rel: str) -> list[str]:
    errs: list[str] = []
    if not RE_META_DESC.search(text):
        return [f"{rel}: no se encontró <meta name=\"description\""]
    for m in RE_META_DESC.finditer(text):
        tag = m.group(0)
        cm = re.search(r'content\s*=\s*["\'](.*?)["\']', tag, re.I | re.DOTALL)
        if not cm:
            errs.append(f"{rel}: meta description sin content=")
            continue
        content = cm.group(1)
        if "<a" in content.lower() or "&lt;" in content:
            errs.append(f"{rel}: content con markup: {content[:90]!r}…")
    return errs


def has_body_html(text: str) -> bool:
    low = text.lower()
    return "</body>" in low and "</html>" in low


def whatsapp_ok(text: str) -> bool:
    """`<a>` con whatsapp-float y `<path d=` (atributos pueden partirse en varias líneas)."""
    pat = re.compile(r"<a\b(?:(?!>).)*whatsapp-float(?:(?!>).)*>", re.I | re.DOTALL)
    for m in pat.finditer(text):
        chunk = text[m.start() : m.start() + 5000]
        if re.search(r"<path\s+[^>]*\bd\s*=", chunk, re.I):
            return True
    return False


def resolve_href(base: Path, href: str) -> Path | None:
    href_clean, _ = urldefrag(href.strip())
    href_clean = unquote(href_clean)
    if urlparse(href_clean).scheme in ("http", "https", "mailto", "tel", "javascript"):
        return None
    try:
        if href_clean.startswith("/"):
            return (REPO / href_clean.lstrip("/")).resolve()
        return (base.parent / href_clean).resolve()
    except OSError:
        return None


def broken_internal_html(base_file: Path, text: str) -> list[tuple[str, str]]:
    broken: list[tuple[str, str]] = []
    seen: set[tuple[str, str]] = set()
    for m in HREF_RE.finditer(text):
        href = m.group(2).strip().split("#", 1)[0].strip()
        if not href or href.startswith(("http://", "https://", "mailto:", "tel:", "javascript:", "//")):
            continue
        if ".html" not in href:
            continue
        tgt = resolve_href(base_file, href)
        if tgt is None:
            continue
        try:
            tgt.relative_to(REPO.resolve())
        except ValueError:
            continue
        if not tgt.is_file():
            t = str(tgt.relative_to(REPO)).replace("\\", "/")
            key = (href[:200], t)
            if key not in seen:
                seen.add(key)
                broken.append(key)
    return broken


def href_path_only(href: str) -> str:
    return href.split("?")[0].split("#")[0].strip().lower()


def main() -> dict:
    a1: list[tuple[str, str]] = []
    a2: list[tuple[str, str]] = []
    a3: list[str] = []
    a4: list[tuple[str, str]] = []
    a5: list[tuple[str, str]] = []
    a6: list[tuple[str, str]] = []
    a7: list[tuple[str, str]] = []
    a8: list[str] = []
    b9_fail: list[str] = []
    b10_fail: list[str] = []
    c11_fail: list[str] = []
    c12: list[tuple[str, str, str]] = []
    c12_seen: set[tuple[str, str, str]] = set()

    for path in iter_html():
        rel = str(path.relative_to(REPO)).replace("\\", "/")
        text = read_text(path)

        for item in check_a1(text, rel):
            if item not in a1:
                a1.append(item)
        for item in check_a2(text, rel):
            if item not in a2:
                a2.append(item)
        for r in check_a3(text, rel):
            if r not in a3:
                a3.append(r)

        for m in HREF_RE.finditer(text):
            v = m.group(2).strip()
            vl = v.lower()
            vp = href_path_only(vl)
            if ALEMANIA_P.search(vl):
                t = (rel, v[:160])
                if t not in a4:
                    a4.append(t)
            if ESTADOS_UNIDOS_P.search(vl):
                t = (rel, v[:160])
                if t not in a5:
                    a5.append(t)
            if any(re.search(re.escape(s) + r"(\?|#|$)", vp) for s in MICROCHIP_BAD):
                t = (rel, v[:160])
                if t not in a6:
                    a6.append(t)
            if INDEX_DOT_PATTERN.search(v):
                t = (rel, v[:160])
                if t not in a7:
                    a7.append(t)

        if rel in ZOOPEDIA_INDEX_META:
            a8.extend(meta_description_ok(text, rel))

        if rel in STRUCTURE_FILES:
            if not has_body_html(text):
                b9_fail.append(rel)
            if not whatsapp_ok(text):
                b10_fail.append(rel)

        if path.name not in EXCLUDE_BODY_CHECK:
            if "</body>" not in text.lower():
                c11_fail.append(rel)

        for h, t in broken_internal_html(path, text):
            key = (rel, h, t)
            if key not in c12_seen:
                c12_seen.add(key)
                c12.append(key)

    return {
        "a1": a1,
        "a2": a2,
        "a3": a3,
        "a4": a4,
        "a5": a5,
        "a6": a6,
        "a7": a7,
        "a8": a8,
        "b9_fail": b9_fail,
        "b10_fail": b10_fail,
        "c11_fail": c11_fail,
        "c12": c12,
    }


def _fmt_hits(hits: list, maxn: int = 8) -> str:
    if not hits:
        return "0 hallazgos"
    lines = [str(x) for x in hits[:maxn]]
    if len(hits) > maxn:
        lines.append(f"… y {len(hits) - maxn} más")
    return "; ".join(lines)


def build_markdown(r: dict, manual_md: str, regresiones: str) -> str:
    def row(cid: str, ok: bool, detail: str) -> str:
        st = "✅ PASS" if ok else "❌ FAIL"
        return f"| {cid} | {st} | {detail.replace('|', '\\|')} |"

    rows = [
        "| Check | Resultado | Detalle |",
        "|-------|-------------|---------|",
        row("A1", len(r["a1"]) == 0, _fmt_hits(r["a1"])),
        row("A2", len(r["a2"]) == 0, _fmt_hits(r["a2"])),
        row("A3", len(r["a3"]) == 0, _fmt_hits(r["a3"])),
        row("A4", len(r["a4"]) == 0, _fmt_hits(r["a4"])),
        row("A5", len(r["a5"]) == 0, _fmt_hits(r["a5"])),
        row("A6", len(r["a6"]) == 0, _fmt_hits(r["a6"])),
        row("A7", len(r["a7"]) == 0, _fmt_hits(r["a7"])),
        row("A8", len(r["a8"]) == 0, "; ".join(r["a8"]) or "Las 3 meta description son texto plano"),
        row(
            "B9",
            len(r["b9_fail"]) == 0,
            "Los 13 archivos tienen </body> y </html>" if not r["b9_fail"] else "Faltan: " + ", ".join(r["b9_fail"]),
        ),
        row(
            "B10",
            len(r["b10_fail"]) == 0,
            "whatsapp-float + `<path d=` OK" if not r["b10_fail"] else "Faltan: " + ", ".join(r["b10_fail"]),
        ),
        row(
            "C11",
            len(r["c11_fail"]) == 0,
            "Ningún archivo sin `</body>` (salvo utilidad)" if not r["c11_fail"] else _fmt_hits(r["c11_fail"], 20),
        ),
        row(
            "C12",
            len(r["c12"]) == 0,
            "0 enlaces .html rotos" if not r["c12"] else f"{len(r['c12'])} rotos: " + _fmt_hits(r["c12"], 5),
        ),
    ]
    auto_all = all(
        len(r[k]) == 0
        for k in ("a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "b9_fail", "b10_fail", "c11_fail", "c12")
    )
    summary = "✅ **Todas las comprobaciones automáticas PASS**" if auto_all else "❌ **Hay FAIL en al menos un check** — ver tabla."

    return (
        "# AUDIT_VERIFICATION_REPORT\n\n"
        "Auditoría de verificación post-fixes (solo lectura). **Ningún `.html` fue modificado**.\n\n"
        f"{summary}\n\n"
        "## VERIFICACIÓN DE FIXES (debe ser todo ✅)\n\n"
        + "\n".join(rows)
        + "\n\n"
        + manual_md.strip()
        + "\n\n## REGRESIONES DETECTADAS (si las hay)\n\n"
        + regresiones.strip()
        + "\n"
    )


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--manual-file", type=Path, default=None)
    ap.add_argument("--out", type=Path, default=REPO / "AUDIT_VERIFICATION_REPORT.md")
    ap.add_argument("--regresiones-file", type=Path, default=None)
    args = ap.parse_args()
    r = main()
    if args.manual_file and args.manual_file.is_file():
        manual = args.manual_file.read_text(encoding="utf-8")
    else:
        manual = (
            "## INSPECCIÓN MANUAL\n\n| Archivo | Estado | Nota |\n"
            "|---------|--------|------|\n| — | — | Sin fragmento manual |\n"
        )
    if not manual.lstrip().startswith("##"):
        manual = "## INSPECCIÓN MANUAL\n\n" + manual
    reg = ""
    if args.regresiones_file and args.regresiones_file.is_file():
        reg = args.regresiones_file.read_text(encoding="utf-8")
    else:
        reg = "*(Sin archivo de regresiones; completar tras revisión.)*\n"
    full = build_markdown(r, manual, reg)
    args.out.write_text(full, encoding="utf-8")
    print("Escrito:", args.out, file=sys.stderr)
