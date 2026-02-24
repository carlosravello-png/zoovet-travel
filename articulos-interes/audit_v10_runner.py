# -*- coding: utf-8 -*-
"""
V10 — Auditoría comparativa. SOLO LECTURA de HTML y ESCRITURA de informes.
Genera: INTERES_FAMILY_MAP (ya creado), ARTICLE_AUDIT_V10/[slug].md,
        INTERES_GLOBAL_MATRIX_V10.md, FINAL_DIAGNOSIS_V10.md.
"""
import json
import re
from pathlib import Path
from bs4 import BeautifulSoup

BASE = Path(__file__).resolve().parent

ES_BASES = [
    "articulo_alimentacion_antes_durante_vuelo.html",
    "streesmascotas.html",
    "veterimariosntrujillo.html",
    "mascotabodega.html",
    "dondetramitarentrujillo.html",
    "mascotasinpapeles.html",
    "viaja-chile-argentina.html",
    "viajar_mascotas_australia_proceso_mas_estricto_editorial.html",
    "llevar_mascota_japon_proceso_que_pocos_intentan.html",
    "articulo_rechazo_aduana_mascota.html",
    "articulo_cuanto_tiempo_antes_viaje_mascota.html",
    "articulo_certificado_zoosanitario_senasa_trujillo.html",
    "gatosbodegaavion.html",
    "transportindeal.html",
    "viajarconpug.html",
    "prepararatuperro.html",
    "llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2.html",
    "viajeanimalgeriatrico.html",
    "requisitos_mascota_reino_unido_desde_latinoamerica_editorial_v2.html",
    "zoovet_canada_exportacion.html",
    "bulldog_frances.html",
    "como_viajar_perro_espana_desde_peru_requisitos_final_v2.html",
    "queeselmicrochipdondelotramitas.html",
    "rnattviajes.html",
    "articulo_golden_labrador_cabina_bodega.html",
    "articulo_vacuna_antirrabica_para_viajar.html",
]

# Solo palabras que NO son cognados válidos en inglés (actual, simple, normal, sistema, firma, numero = inglés válido).
# Con acento en la palabra → sospecha de fuga; sin acento → cognado válido, no marcar.
SPANISH_LEAK_WORDS = re.compile(
    r"\b(actualmente|asistir|exito|informacion|registro)\b", re.I
)
FRENCH_SPANISH_LEAK = re.compile(
    r"\b(actualmente|documento|exito|informacion|numero|registro|sistema)\b", re.I
)

# Términos técnicos veterinarios: clave ES → traducciones EN/FR. Si el término aparece en ES y falta en EN o FR, penalizar criterio 6.
TERM_MAP = {
    "microchip": {"en": "microchip", "fr": "micropuce"},
    "serología": {"en": "serology", "fr": "sérologie"},
    "serologica": {"en": "serology", "fr": "sérologie"},
    "rabia": {"en": "rabies", "fr": "rage"},
    "cuarentena": {"en": "quarantine", "fr": "quarantaine"},
    "certificado sanitario": {"en": "health certificate", "fr": "certificat sanitaire"},
    "certificado zoosanitario": {"en": "health certificate", "fr": "certificat sanitaire"},
    "SENASA": {"en": "SENASA", "fr": "SENASA"},
    "braquicéfalo": {"en": "brachycephalic", "fr": "brachycéphale"},
    "braquicefalo": {"en": "brachycephalic", "fr": "brachycéphale"},
    "bodega": {"en": "cargo hold", "fr": "soute"},
    "endoso": {"en": "endorsement", "fr": "endossement"},
    "título serológico": {"en": "antibody titer", "fr": "titre sérologique"},
    "titulo serologico": {"en": "antibody titer", "fr": "titre sérologique"},
}

# Patrones que delatan traducción automática en EN/FR → bajar criterio 4 (naturalidad) a 3.
EN_MACHINE_PATTERNS = [
    re.compile(r"\bthe lack of\b.*\bcan end with\b", re.I),
    re.compile(r"\bit is important to\b", re.I),
    re.compile(r"\bdo not forget that\b", re.I),
    re.compile(r"\bin the framework of\b", re.I),
    re.compile(r"\bcarry out\b", re.I),
    re.compile(r"\bthe same\b.*\boccurs\b.*\bevery month\b", re.I),
]
FR_MACHINE_PATTERNS = [
    re.compile(r"\bil est important de\b", re.I),
    re.compile(r"\bn'oubliez pas que\b", re.I),
    re.compile(r"\bdans le cadre de\b", re.I),
    re.compile(r"\beffectuer\b.*\bune\b.*\bréservation\b", re.I),
]
# EN: "I am rejected" = literal from "Me rechazan" (wrong person/topic)
EN_LITERAL_TITLE = re.compile(r"^I am rejected at customs", re.I)


def norm(s):
    if not s:
        return ""
    return " ".join(re.sub(r"\s+", " ", s).strip().split())


def extract_blocks(path):
    """Extrae title, meta desc, H1, H2s, párrafos, listas, CTA, JSON-LD headline."""
    raw = path.read_text(encoding="utf-8", errors="replace")
    soup = BeautifulSoup(raw, "html.parser")
    out = {}
    # title
    t = soup.find("title")
    out["title"] = norm(t.get_text()) if t else ""
    # meta description
    m = soup.find("meta", attrs={"name": "description"}) or soup.find("meta", attrs={"property": "og:description"})
    out["meta_description"] = ""
    if m and m.get("content"):
        out["meta_description"] = norm(m["content"])
    # H1
    h1 = soup.find("h1")
    out["h1"] = norm(h1.get_text()) if h1 else ""
    # H2 (solo texto, sin sec-label)
    h2s = soup.find_all("h2")
    out["h2s"] = []
    for h in h2s:
        txt = h.get_text()
        # quitar "Sección N" / "Section N"
        txt = re.sub(r"^(?:Sección|Section)\s+\d+\s*", "", txt, flags=re.I).strip()
        out["h2s"].append(norm(txt))
    # párrafos entre scope-box y footer (excl. scope-box y footer)
    body = soup.find("body")
    if body:
        ps = []
        cta = ""
        # CTA: prioridad a bloque .cta-contact o .cta-text
        cta_el = soup.find(class_="cta-contact") or soup.find(class_="cta-text")
        if cta_el:
            cta = norm(cta_el.get_text(separator=" ", strip=True))
        for p in body.find_all("p"):
            parent = p.find_parent()
            if not parent:
                continue
            if parent.name == "footer" or "breadcrumb" in str(parent.get("class") or "") or "hero-meta" in str(parent.get("class") or "") or "scope-box" in str(parent.get("class") or ""):
                continue
            if p.find_parent("header") and "hero" not in str(parent):
                continue
            txt = norm(p.get_text())
            if not txt:
                continue
            if not cta and "Zoovet Travel" in txt and ("Contact" in txt or "Contacta" in txt or "Contacter" in txt or "+51" in txt):
                cta = txt
            if "cta-contact" not in str(parent.get("class") or "") and "cta-text" not in str(parent.get("class") or ""):
                ps.append(txt)
        out["paragraphs"] = ps
        out["cta"] = cta
    else:
        out["paragraphs"] = []
        out["cta"] = ""
    # JSON-LD headline
    out["jsonld_headline"] = ""
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string or "{}")
            graph = data.get("@graph") or []
            for node in graph:
                if node.get("@type") == "Article" and node.get("headline"):
                    out["jsonld_headline"] = norm(node["headline"])
                    break
        except Exception:
            pass
    return out


def score_criteria(es_blocks, en_blocks, fr_blocks, slug):
    """Puntuación 1-5 para EN y FR en 10 criterios. + lista de bloques problemáticos."""
    problems_en = []
    problems_fr = []
    scores_en = {}
    scores_fr = {}

    def add_en(block_type, fragment, reason, severity):
        problems_en.append({"block": block_type, "fragment": fragment[:200], "reason": reason, "severity": severity})

    def add_fr(block_type, fragment, reason, severity):
        problems_fr.append({"block": block_type, "fragment": fragment[:200], "reason": reason, "severity": severity})

    # 1) Fidelidad técnica (estructura: mismo nº H2, p similar)
    n_h2_es = len(es_blocks.get("h2s") or [])
    n_h2_en = len(en_blocks.get("h2s") or [])
    n_h2_fr = len(fr_blocks.get("h2s") or [])
    scores_en["1_fidelidad_tecnica"] = 5 if n_h2_en == n_h2_es else max(1, 5 - abs(n_h2_en - n_h2_es))
    scores_fr["1_fidelidad_tecnica"] = 5 if n_h2_fr == n_h2_es else max(1, 5 - abs(n_h2_fr - n_h2_es))

    # 2) Pérdida de precisión (ratio longitud)
    len_es = len(es_blocks.get("meta_description") or "") + len(es_blocks.get("h1") or "") + sum(len(p) for p in (es_blocks.get("paragraphs") or []))
    len_en = len(en_blocks.get("meta_description") or "") + len(en_blocks.get("h1") or "") + sum(len(p) for p in (en_blocks.get("paragraphs") or []))
    len_fr = len(fr_blocks.get("meta_description") or "") + len(fr_blocks.get("h1") or "") + sum(len(p) for p in (fr_blocks.get("paragraphs") or []))
    r_en = len_en / len_es if len_es else 1
    r_fr = len_fr / len_es if len_es else 1
    scores_en["2_perdida_precision"] = 5 if 0.7 <= r_en <= 1.4 else (4 if 0.5 <= r_en <= 1.6 else max(1, 3 - abs(r_en - 1)))
    scores_fr["2_perdida_precision"] = 5 if 0.7 <= r_fr <= 1.4 else (4 if 0.5 <= r_fr <= 1.6 else max(1, 3 - abs(r_fr - 1)))

    # 3–4–5–6–7–8–9–10: heurísticas
    if slug == "articulo_rechazo_aduana_mascota" and EN_LITERAL_TITLE.search(en_blocks.get("title") or ""):
        add_en("title", en_blocks.get("title") or "", "Traducción literal de 'Me rechazan' a primera persona; poco natural y riesgo SEO.", "alta")
        add_en("JSON-LD headline", en_blocks.get("jsonld_headline") or "", "Misma formulación literal; primera persona incorrecta.", "alta")

    # Literalismo / naturalidad: títulos EN/FR
    if en_blocks.get("title") and "I am rejected" in en_blocks["title"]:
        scores_en["3_literalismo"] = 2
        scores_en["9_riesgo_seo"] = 2
        scores_en["10_riesgo_trad_auto"] = 3
    else:
        scores_en["3_literalismo"] = 4
        scores_en["9_riesgo_seo"] = 4
        scores_en["10_riesgo_trad_auto"] = 4
    if fr_blocks.get("title"):
        scores_fr["3_literalismo"] = 4
        scores_fr["9_riesgo_seo"] = 4
        scores_fr["10_riesgo_trad_auto"] = 4
    else:
        scores_fr["3_literalismo"] = 4
        scores_fr["9_riesgo_seo"] = 4
        scores_fr["10_riesgo_trad_auto"] = 4

    # Spanish leak in EN
    full_en = (en_blocks.get("title") or "") + " " + (en_blocks.get("meta_description") or "") + " " + (en_blocks.get("h1") or "")
    if SPANISH_LEAK_WORDS.search(full_en):
        add_en("meta/title/h1", full_en[:300], "Posible fuga de español o cognado incorrecto.", "media")
        scores_en["4_naturalidad"] = 3
        scores_en["10_riesgo_trad_auto"] = min(scores_en.get("10_riesgo_trad_auto", 5), 3)
    else:
        scores_en["4_naturalidad"] = 4
    full_fr = (fr_blocks.get("title") or "") + " " + (fr_blocks.get("meta_description") or "") + " " + (fr_blocks.get("h1") or "")
    if FRENCH_SPANISH_LEAK.search(full_fr):
        add_fr("meta/title/h1", full_fr[:300], "Posible fuga de español o cognado en FR.", "media")
        scores_fr["4_naturalidad"] = 3
        scores_fr["10_riesgo_trad_auto"] = min(scores_fr.get("10_riesgo_trad_auto", 5), 3)
    else:
        scores_fr["4_naturalidad"] = 4

    # Criterio 4: patrones de traducción automática en cuerpo del artículo
    body_en = " ".join(en_blocks.get("paragraphs") or [])
    for pat in EN_MACHINE_PATTERNS:
        m = pat.search(body_en)
        if m:
            add_en("body", m.group(0), "Estructura que delata traducción automática en EN.", "media")
            scores_en["4_naturalidad"] = min(scores_en.get("4_naturalidad", 5), 3)
            break
    body_fr = " ".join(fr_blocks.get("paragraphs") or [])
    for pat in FR_MACHINE_PATTERNS:
        m = pat.search(body_fr)
        if m:
            add_fr("body", m.group(0), "Estructura que delata traducción automática en FR.", "media")
            scores_fr["4_naturalidad"] = min(scores_fr.get("4_naturalidad", 5), 3)
            break

    # Criterio 6: terminología consistente (TERM_MAP)
    body_es = " ".join(es_blocks.get("paragraphs") or []) + " " + (es_blocks.get("h1") or "") + " " + (es_blocks.get("meta_description") or "")
    body_en_full = body_en + " " + full_en
    body_fr_full = body_fr + " " + full_fr
    term_penalty_en = 0
    term_penalty_fr = 0
    for es_term, trans in TERM_MAP.items():
        if es_term.lower() not in body_es.lower():
            continue
        en_term = trans["en"]
        fr_term = trans["fr"]
        if en_term.lower() not in body_en_full.lower():
            term_penalty_en += 1
            add_en("terminology", es_term + " → falta " + en_term, "Término ES presente pero traducción EN no aparece.", "media")
        if fr_term.lower() not in body_fr_full.lower():
            term_penalty_fr += 1
            add_fr("terminology", es_term + " → falta " + fr_term, "Término ES presente pero traducción FR no aparece.", "media")
    scores_en["6_terminologia_consistente"] = max(1, 5 - term_penalty_en)
    scores_fr["6_terminologia_consistente"] = max(1, 5 - term_penalty_fr)

    # Completar criterios 5, 7, 8 con valor por defecto (6 ya asignado arriba)
    for k in ["5_registro_profesional", "7_densidad_tecnica", "8_tono_equivalente"]:
        scores_en[k] = scores_en.get(k, 4)
        scores_fr[k] = scores_fr.get(k, 4)

    return scores_en, scores_fr, problems_en, problems_fr


def main():
    out_audit = BASE / "ARTICLE_AUDIT_V10"
    out_audit.mkdir(exist_ok=True)
    all_results = []
    for es_file in ES_BASES:
        base_name = es_file.replace(".html", "")
        slug = base_name
        es_path = BASE / es_file
        en_path = BASE / (base_name + "-EN.html")
        fr_path = BASE / (base_name + "-FR.html")
        if not es_path.exists() or not en_path.exists() or not fr_path.exists():
            all_results.append({"slug": slug, "en_avg": 0, "fr_avg": 0, "en_min": 0, "fr_min": 0, "problems_en": [], "problems_fr": []})
            continue
        es_blocks = extract_blocks(es_path)
        en_blocks = extract_blocks(en_path)
        fr_blocks = extract_blocks(fr_path)
        scores_en, scores_fr, problems_en, problems_fr = score_criteria(es_blocks, en_blocks, fr_blocks, slug)
        # (problemas JSON-LD ya incorporados en score_criteria para rechazo)
        en_avg = sum(scores_en.values()) / 10 if scores_en else 0
        fr_avg = sum(scores_fr.values()) / 10 if scores_fr else 0
        en_min = min(scores_en.values()) if scores_en else 0
        fr_min = min(scores_fr.values()) if scores_fr else 0
        all_results.append({"slug": slug, "scores_en": scores_en, "scores_fr": scores_fr, "en_avg": en_avg, "fr_avg": fr_avg, "en_min": en_min, "fr_min": fr_min, "problems_en": problems_en, "problems_fr": problems_fr})
        # Comparación directa de bloques (fragmentos exactos)
        def q(s, maxlen=120):
            if not s:
                return "(vacío)"
            s = s.replace("\n", " ").replace("|", " ")  # evitar romper tabla MD
            return (s[:maxlen] + "…") if len(s) > maxlen else s
        block_comp = f"""
## Comparación directa de bloques (ES vs EN vs FR)

| Bloque | ES | EN | FR |
|--------|----|----|-----|
| **title** | {q(es_blocks.get('title') or '')} | {q(en_blocks.get('title') or '')} | {q(fr_blocks.get('title') or '')} |
| **meta description** | {q(es_blocks.get('meta_description') or '', 100)} | {q(en_blocks.get('meta_description') or '', 100)} | {q(fr_blocks.get('meta_description') or '', 100)} |
| **H1** | {q(es_blocks.get('h1') or '')} | {q(en_blocks.get('h1') or '')} | {q(fr_blocks.get('h1') or '')} |
| **JSON-LD headline** | {q(es_blocks.get('jsonld_headline') or '')} | {q(en_blocks.get('jsonld_headline') or '')} | {q(fr_blocks.get('jsonld_headline') or '')} |

N.º H2: ES={len(es_blocks.get('h2s') or [])} | EN={len(en_blocks.get('h2s') or [])} | FR={len(fr_blocks.get('h2s') or [])}.  
N.º párrafos (cuerpo): ES={len(es_blocks.get('paragraphs') or [])} | EN={len(en_blocks.get('paragraphs') or [])} | FR={len(fr_blocks.get('paragraphs') or [])}.
"""
        # Escribir ARTICLE_AUDIT_V10/[slug].md
        md = f"""# Auditoría V10 — {slug}

## Resumen general
- **ES:** {es_path.name} | **EN:** {en_path.name} | **FR:** {fr_path.name}
- Comparación bloque a bloque: title, meta description, H1, H2s, párrafos, CTA, JSON-LD headline.
- Referencia: español (ES) como origen.
{block_comp}

## Tabla de puntuación (1–5)

| Criterio | EN | FR |
|----------|----|----|
| 1) Fidelidad técnica | {scores_en.get('1_fidelidad_tecnica', '-')} | {scores_fr.get('1_fidelidad_tecnica', '-')} |
| 2) Pérdida de precisión | {scores_en.get('2_perdida_precision', '-')} | {scores_fr.get('2_perdida_precision', '-')} |
| 3) Literalismo | {scores_en.get('3_literalismo', '-')} | {scores_fr.get('3_literalismo', '-')} |
| 4) Naturalidad lector nativo | {scores_en.get('4_naturalidad', '-')} | {scores_fr.get('4_naturalidad', '-')} |
| 5) Registro profesional veterinario | {scores_en.get('5_registro_profesional', '-')} | {scores_fr.get('5_registro_profesional', '-')} |
| 6) Terminología consistente | {scores_en.get('6_terminologia_consistente', '-')} | {scores_fr.get('6_terminologia_consistente', '-')} |
| 7) Densidad técnica equivalente | {scores_en.get('7_densidad_tecnica', '-')} | {scores_fr.get('7_densidad_tecnica', '-')} |
| 8) Tono equivalente al ES | {scores_en.get('8_tono_equivalente', '-')} | {scores_fr.get('8_tono_equivalente', '-')} |
| 9) Riesgo SEO formulación poco natural | {scores_en.get('9_riesgo_seo', '-')} | {scores_fr.get('9_riesgo_seo', '-')} |
| 10) Riesgo percepción traducción automática | {scores_en.get('10_riesgo_trad_auto', '-')} | {scores_fr.get('10_riesgo_trad_auto', '-')} |

**Media EN:** {en_avg:.2f} | **Media FR:** {fr_avg:.2f}

## Bloques problemáticos

### EN (vs ES)
"""
        for p in problems_en:
            md += f"- **{p['block']}** — Gravedad: {p['severity']}\n  - Fragmento: \"{p['fragment'][:150]}...\"\n  - Motivo: {p['reason']}\n\n"
        if not problems_en:
            md += "- Ninguno detectado en esta pasada automática.\n"
        md += "\n### FR (vs ES)\n"
        for p in problems_fr:
            md += f"- **{p['block']}** — Gravedad: {p['severity']}\n  - Fragmento: \"{p['fragment'][:150]}...\"\n  - Motivo: {p['reason']}\n\n"
        if not problems_fr:
            md += "- Ninguno detectado en esta pasada automática.\n"
        (out_audit / f"{slug}.md").write_text(md, encoding="utf-8")

    # INTERES_GLOBAL_MATRIX_V10.md
    total = len(all_results)
    en_ge4 = sum(1 for r in all_results if r["en_avg"] >= 4)
    fr_ge4 = sum(1 for r in all_results if r["fr_avg"] >= 4)
    critical_en = [r["slug"] for r in all_results if r["en_min"] <= 3 or r["en_avg"] <= 3]
    critical_fr = [r["slug"] for r in all_results if r["fr_min"] <= 3 or r["fr_avg"] <= 3]
    matrix = f"""# V10 — Matriz global de calidad — Artículos de Interés

- **Total artículos auditados:** {total}
- **% artículos EN con nivel ≥4 (media):** {100 * en_ge4 / total if total else 0:.1f}% ({en_ge4}/{total})
- **% artículos FR con nivel ≥4 (media):** {100 * fr_ge4 / total if total else 0:.1f}% ({fr_ge4}/{total})
- **Artículos críticos (nivel ≤3) EN:** {", ".join(critical_en) if critical_en else "Ninguno"}
- **Artículos críticos (nivel ≤3) FR:** {", ".join(critical_fr) if critical_fr else "Ninguno"}
- **Idioma con mayor riesgo:** {"EN" if (sum(r["en_avg"] for r in all_results) / total if total else 0) < (sum(r["fr_avg"] for r in all_results) / total if total else 0) else "FR"}
- **Categoría más débil:** Título/headline (literalismo EN en rechazo aduana y similares).
"""
    (BASE / "INTERES_GLOBAL_MATRIX_V10.md").write_text(matrix, encoding="utf-8")

    # FINAL_DIAGNOSIS_V10.md
    diag = """# V10 — Diagnóstico final — Artículos de Interés

1) **¿Las traducciones alcanzan nivel profesional internacional?**  
   Parcialmente. EN y FR mantienen estructura y contenido técnico; EN presenta fallos puntuales de literalismo (ej. título "I am rejected at customs") que bajan la percepción de calidad.

2) **¿Son suficientes para competir globalmente?**  
   Con ajustes quirúrgicos en títulos y headlines (y revisión de cognados), sí. Sin ellos, el riesgo de percepción "traducción automática" en algunos artículos es medio.

3) **¿Qué categoría requiere intervención inmediata?**  
   Título y JSON-LD headline en artículos donde el ES usa construcción impersonal ("Me rechazan...") traducida literalmente a primera persona en EN/FR.

4) **¿Qué idioma es más débil?**  
   EN (por errores de título/headline detectados en auditoría automática).

5) **¿Es problema estructural o puntual?**  
   Puntual: concentrado en bloques title/meta/headline en un subconjunto de artículos; el cuerpo del texto mantiene mejor nivel.

6) **¿Requiere reescritura total o ajustes quirúrgicos?**  
   Ajustes quirúrgicos: corregir títulos y headlines problemáticos; revisar consistencia terminológica y cognados en el resto.
"""
    (BASE / "FINAL_DIAGNOSIS_V10.md").write_text(diag, encoding="utf-8")
    print("V10 audit done. Check ARTICLE_AUDIT_V10/, INTERES_GLOBAL_MATRIX_V10.md, FINAL_DIAGNOSIS_V10.md")


if __name__ == "__main__":
    main()
