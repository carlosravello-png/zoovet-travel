#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Inyección quirúrgica de interlinks editoriales en fichas zoopedia.

Estrategia: regex puro con masking de zonas peligrosas. NO re-parsea HTML.
Se preserva byte-a-byte todo el documento salvo los inserts puntuales de <a>.

Reglas:
- Solo enlaza sobre texto editorial existente.
- Por archivo: máximo 2 enlaces al mismo destino, máximo 1 por categoría tech.
- Zonas excluidas: <head>, <script>, <style>, <a>, <h1-h6>, <table>, <title>, comentarios HTML, tags.
- Solo busca en la primera ocurrencia válida.
"""

import os, re, sys, json
from pathlib import Path

ROOT = Path("/sessions/brave-youthful-cray/mnt/zoovet-travel")

COUNTRIES = [
    ("australia",      "australia"),
    ("brasil",         "brasil"),
    ("canada",         "canada"),
    ("chile",          "chile"),
    ("china",          "china"),
    ("corea-del-sur",  "corea-del-sur"),
    ("eau",            "eau"),
    ("eeuu",           "eeuu"),
    ("espana",         "espana"),
    ("francia",        "francia"),
    ("india",          "india"),
    ("italia",         "italia"),
    ("japon",          "japon"),
    ("mexico",         "mexico"),
    ("nueva-zelanda",  "nueva-zelanda"),
    ("reino-unido",    "reino-unido"),
    ("rusia",          "rusia"),
    ("singapur",       "singapur"),
    ("sudafrica",      "sudafrica"),
    ("union-europea",  "union-europea"),
]

LANG_SUFFIX = {"es": "", "en": "-en", "fr": "-fr"}

# Términos técnicos por idioma (case-insensitive). Una entrada por categoría.
TECH_TERMS_ES = [
    (r"\bmicrochip ISO\b",                  "../articles/zoovet_art6_microchip-ES.html",         "microchip"),
    (r"\bmicrochip\b",                      "../articles/zoovet_art6_microchip-ES.html",         "microchip"),
    (r"\bRNATT\b",                          "../favn-es.html",                                    "rnatt"),
    (r"\bvacuna antirrábica\b",             "../articles/zoovet_art9_certificados-vacunacion-ES.html", "vacuna"),
    (r"\bcertificado de salud\b",           "../articles/zoovet_art10_certificado-salud-ES.html","certsalud"),
    (r"\bcuarentena\b",                     "../articles/zoovet_art11_cuarentena-ES.html",       "cuarentena"),
    (r"\bexpediente sanitario\b",           "../articles/zoovet_art12_expediente-ES.html",       "expediente"),
    (r"\btratamientos antiparasitarios\b",  "../articles/zoovet_art4_desparasitacionES.html",    "antipara"),
    (r"\brazas braquicéfalas\b",            "../articles/zoovet_article3_braquicefalos_ES.html", "braqui"),
    (r"\bdesincronización circadiana\b",    "../articles/zoovet_art7_jetlag-ES.html",            "jetlag"),
    (r"\bjet lag\b",                        "../articles/zoovet_art7_jetlag-ES.html",            "jetlag"),
]

TECH_TERMS_EN = [
    (r"\bISO microchip\b",                  "../articles/zoovet_art6_microchip-EN.html",         "microchip"),
    (r"\bmicrochip\b",                      "../articles/zoovet_art6_microchip-EN.html",         "microchip"),
    (r"\bRNATT\b",                          "../favn-en.html",                                    "rnatt"),
    (r"\brabies vaccination\b",             "../articles/zoovet_art9_certificados-vacunacion-EN.html", "vacuna"),
    (r"\brabies vaccine\b",                 "../articles/zoovet_art9_certificados-vacunacion-EN.html", "vacuna"),
    (r"\bhealth certificate\b",             "../articles/zoovet_art10_certificado-salud-EN.html","certsalud"),
    (r"\bquarantine\b",                     "../articles/zoovet_art11_cuarentena-EN.html",       "cuarentena"),
    (r"\bexport dossier\b",                 "../articles/zoovet_art12_expediente-EN.html",       "expediente"),
    (r"\bantiparasitic treatment\b",        "../articles/zoovet_art4_desparasitacionEN.html",    "antipara"),
    (r"\bbrachycephalic breeds\b",          "../articles/zoovet_article3_braquicefalos_EN.html", "braqui"),
    (r"\bcircadian desynchronization\b",    "../articles/zoovet_art7_jetlag-EN.html",            "jetlag"),
    (r"\bjet lag\b",                        "../articles/zoovet_art7_jetlag-EN.html",            "jetlag"),
]

TECH_TERMS_FR = [
    (r"\bpuce ISO\b",                       "../articles/zoovet_art6_microchip-FR.html",         "microchip"),
    (r"\bmicropuce\b",                      "../articles/zoovet_art6_microchip-FR.html",         "microchip"),
    (r"\bmicrochip\b",                      "../articles/zoovet_art6_microchip-FR.html",         "microchip"),
    (r"\bRNATT\b",                          "../favn-fr.html",                                    "rnatt"),
    (r"\bvaccination antirabique\b",        "../articles/zoovet_art9_certificados-vacunacion-FR.html", "vacuna"),
    (r"\bvaccin antirabique\b",             "../articles/zoovet_art9_certificados-vacunacion-FR.html", "vacuna"),
    (r"\bcertificat de santé\b",            "../articles/zoovet_art10_certificado-salud-FR.html","certsalud"),
    (r"\bquarantaine\b",                    "../articles/zoovet_art11_cuarentena-FR.html",       "cuarentena"),
    (r"\bdossier d'exportation\b",          "../articles/zoovet_art12_expediente-FR.html",       "expediente"),
    (r"\btraitement antiparasitaire\b",     "../articles/zoovet_art4_desparasitacionFR.html",    "antipara"),
    (r"\braces brachycéphales\b",           "../articles/zoovet_article3_braquicefalos_FR.html", "braqui"),
    (r"\bdésynchronisation circadienne\b",  "../articles/zoovet_art7_jetlag-FR.html",            "jetlag"),
    (r"\bjet lag\b",                        "../articles/zoovet_art7_jetlag-FR.html",            "jetlag"),
    (r"\bdécalage horaire\b",               "../articles/zoovet_art7_jetlag-FR.html",            "jetlag"),
]

COUNTRY_TERMS_ES = [
    (r"\bAustralia\b",          "australia.html"),
    (r"\bBrasil\b",             "brasil.html"),
    (r"\bCanadá\b",             "canada.html"),
    (r"\bChile\b",              "chile.html"),
    (r"\bChina\b",              "china.html"),
    (r"\bCorea del Sur\b",      "corea-del-sur.html"),
    (r"\bEmiratos Árabes Unidos\b", "eau.html"),
    (r"\bEstados Unidos\b",     "eeuu.html"),
    (r"\bEspaña\b",             "espana.html"),
    (r"\bFrancia\b",            "francia.html"),
    (r"\bIndia\b",              "india.html"),
    (r"\bItalia\b",             "italia.html"),
    (r"\bJapón\b",              "japon.html"),
    (r"\bMéxico\b",             "mexico.html"),
    (r"\bNueva Zelanda\b",      "nueva-zelanda.html"),
    (r"\bReino Unido\b",        "reino-unido.html"),
    (r"\bRusia\b",              "rusia.html"),
    (r"\bSingapur\b",           "singapur.html"),
    (r"\bSudáfrica\b",          "sudafrica.html"),
    (r"\bUnión Europea\b",      "union-europea.html"),
]

COUNTRY_TERMS_EN = [
    (r"\bAustralia\b",          "australia-en.html"),
    (r"\bBrazil\b",             "brasil-en.html"),
    (r"\bCanada\b",             "canada-en.html"),
    (r"\bChile\b",              "chile-en.html"),
    (r"\bChina\b",              "china-en.html"),
    (r"\bSouth Korea\b",        "corea-del-sur-en.html"),
    (r"\bUnited Arab Emirates\b","eau-en.html"),
    (r"\bUnited States\b",      "eeuu-en.html"),
    (r"\bSpain\b",              "espana-en.html"),
    (r"\bFrance\b",             "francia-en.html"),
    (r"\bIndia\b",              "india-en.html"),
    (r"\bItaly\b",              "italia-en.html"),
    (r"\bJapan\b",              "japon-en.html"),
    (r"\bMexico\b",             "mexico-en.html"),
    (r"\bNew Zealand\b",        "nueva-zelanda-en.html"),
    (r"\bUnited Kingdom\b",     "reino-unido-en.html"),
    (r"\bRussia\b",             "rusia-en.html"),
    (r"\bSingapore\b",          "singapur-en.html"),
    (r"\bSouth Africa\b",       "sudafrica-en.html"),
    (r"\bEuropean Union\b",     "union-europea-en.html"),
]

COUNTRY_TERMS_FR = [
    (r"\bAustralie\b",          "australia-fr.html"),
    (r"\bBrésil\b",             "brasil-fr.html"),
    (r"\bCanada\b",             "canada-fr.html"),
    (r"\bChili\b",              "chile-fr.html"),
    (r"\bChine\b",              "china-fr.html"),
    (r"\bCorée du Sud\b",       "corea-del-sur-fr.html"),
    (r"\bÉmirats arabes unis\b","eau-fr.html"),
    (r"\bÉtats-Unis\b",         "eeuu-fr.html"),
    (r"\bEspagne\b",            "espana-fr.html"),
    (r"\bFrance\b",             "francia-fr.html"),
    (r"\bInde\b",               "india-fr.html"),
    (r"\bItalie\b",             "italia-fr.html"),
    (r"\bJapon\b",              "japon-fr.html"),
    (r"\bMexique\b",            "mexico-fr.html"),
    (r"\bNouvelle-Zélande\b",   "nueva-zelanda-fr.html"),
    (r"\bRoyaume-Uni\b",        "reino-unido-fr.html"),
    (r"\bRussie\b",             "rusia-fr.html"),
    (r"\bSingapour\b",          "singapur-fr.html"),
    (r"\bAfrique du Sud\b",     "sudafrica-fr.html"),
    (r"\bUnion européenne\b",   "union-europea-fr.html"),
]

# Artículo práctico de articulos-interes/ por país
COUNTRY_ARTICLE_ES = {
    "eeuu":         ("../articulos-interes/llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2.html", r"llevar tu mascota a (?:EE\.UU\.|Estados Unidos)"),
    "japon":        ("../articulos-interes/llevar_mascota_japon_proceso_que_pocos_intentan.html", r"proceso[^.]{0,30}Japón"),
    "reino-unido":  ("../articulos-interes/requisitos_mascota_reino_unido_desde_latinoamerica_editorial_v2.html", r"requisitos[^.]{0,20}Reino Unido"),
    "chile":        ("../articulos-interes/viaja-chile-argentina.html", r"Chile y Argentina|viajar a Chile"),
    "espana":       ("../articulos-interes/como_viajar_perro_espana_desde_peru_requisitos_final_v2.html", r"viajar[^.]{0,20}España"),
    "australia":    ("../articulos-interes/viajar_mascotas_australia_proceso_mas_estricto_editorial.html", r"proceso[^.]{0,30}Australia"),
    "canada":       ("../articulos-interes/zoovet_canada_exportacion.html", r"exportación a Canadá"),
}

COUNTRY_ARTICLE_EN = {
    "eeuu":         ("../articulos-interes/llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2-EN.html", r"(?:guide|process)[^.]{0,30}(?:United States|USA)"),
    "japon":        ("../articulos-interes/llevar_mascota_japon_proceso_que_pocos_intentan-EN.html", r"(?:guide|process)[^.]{0,30}Japan"),
    "reino-unido":  ("../articulos-interes/requisitos_mascota_reino_unido_desde_latinoamerica_editorial_v2-EN.html", r"requirements[^.]{0,20}(?:United Kingdom|UK)"),
    "chile":        ("../articulos-interes/viaja-chile-argentina-EN.html", r"Chile and Argentina"),
    "espana":       ("../articulos-interes/como_viajar_perro_espana_desde_peru_requisitos_final_v2-EN.html", r"dog[^.]{0,20}Spain"),
    "australia":    ("../articulos-interes/viajar_mascotas_australia_proceso_mas_estricto_editorial-EN.html", r"Australia[^.]{0,20}process"),
    "canada":       ("../articulos-interes/zoovet_canada_exportacion-EN.html", r"export[^.]{0,20}Canada"),
}

COUNTRY_ARTICLE_FR = {
    "eeuu":         ("../articulos-interes/llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2-FR.html", r"(?:guide|processus)[^.]{0,30}États-Unis"),
    "japon":        ("../articulos-interes/llevar_mascota_japon_proceso_que_pocos_intentan-FR.html", r"(?:guide|processus)[^.]{0,30}Japon"),
    "reino-unido":  ("../articulos-interes/requisitos_mascota_reino_unido_desde_latinoamerica_editorial_v2-FR.html", r"exigences[^.]{0,20}Royaume-Uni"),
    "chile":        ("../articulos-interes/viaja-chile-argentina-FR.html", r"Chili et Argentine"),
    "espana":       ("../articulos-interes/como_viajar_perro_espana_desde_peru_requisitos_final_v2-FR.html", r"chien[^.]{0,20}Espagne"),
    "australia":    ("../articulos-interes/viajar_mascotas_australia_proceso_mas_estricto_editorial-FR.html", r"Australie[^.]{0,20}processus"),
    "canada":       ("../articulos-interes/zoovet_canada_exportacion-FR.html", r"exportation[^.]{0,20}Canada"),
}

LINK_CSS = "text-[#0C789E] underline"


def find_excluded_ranges(html: str):
    """
    Devuelve lista de tuplas (start, end) que NO deben modificarse.
    Incluye: <head>...</head>, <script>...</script>, <style>...</style>,
    <a>...</a>, <h1-6>...</h1-6>, <table>...</table>, <title>...</title>,
    comentarios HTML.
    """
    ranges = []
    patterns = [
        (r"<head\b[^>]*>.*?</head>",       re.IGNORECASE | re.DOTALL),
        (r"<script\b[^>]*>.*?</script>",   re.IGNORECASE | re.DOTALL),
        (r"<style\b[^>]*>.*?</style>",     re.IGNORECASE | re.DOTALL),
        (r"<a\b[^>]*>.*?</a>",             re.IGNORECASE | re.DOTALL),
        (r"<h[1-6]\b[^>]*>.*?</h[1-6]>",   re.IGNORECASE | re.DOTALL),
        (r"<title\b[^>]*>.*?</title>",     re.IGNORECASE | re.DOTALL),
        (r"<table\b[^>]*>.*?</table>",     re.IGNORECASE | re.DOTALL),
        (r"<!--.*?-->",                    re.DOTALL),
    ]
    for pat, flags in patterns:
        for m in re.finditer(pat, html, flags):
            ranges.append((m.start(), m.end()))
    # Merge solapados
    ranges.sort()
    merged = []
    for s, e in ranges:
        if merged and s <= merged[-1][1]:
            merged[-1] = (merged[-1][0], max(merged[-1][1], e))
        else:
            merged.append((s, e))
    return merged


def position_in_excluded(pos: int, ranges: list) -> bool:
    """¿La posición cae dentro de algún rango excluido?"""
    # binary search lite
    for s, e in ranges:
        if s <= pos < e:
            return True
        if pos < s:
            return False
    return False


def position_in_html_tag(html: str, pos: int) -> bool:
    """¿La posición está dentro de un tag HTML (entre < y >)?"""
    # buscar el último < antes de pos
    last_lt = html.rfind("<", 0, pos)
    last_gt = html.rfind(">", 0, pos)
    return last_lt > last_gt


def find_paragraph_bounds(html: str, pos: int):
    """
    Encuentra el rango (start, end) del bloque de párrafo más cercano
    que contiene la posición pos. Considera <p>, <li>, <div class="caso">,
    <div class="bloque-...">, <summary>. Si no hay, devuelve None.
    """
    # Buscar el último <p, <li, <div, <summary abierto antes de pos
    open_pat = re.compile(r"<(p|li|summary|div)\b[^>]*>", re.IGNORECASE)
    close_map = {"p": "</p>", "li": "</li>", "summary": "</summary>", "div": "</div>"}
    # Encontrar el más cercano hacia atrás cuyo cierre venga después de pos
    candidates = list(open_pat.finditer(html, 0, pos))
    for m in reversed(candidates):
        tag = m.group(1).lower()
        close_str = close_map[tag]
        # buscar el cierre correspondiente más cercano después del open
        # esto es heurística simple, no maneja anidamiento perfecto
        close_idx = html.lower().find(close_str.lower(), m.end())
        if close_idx == -1:
            continue
        if close_idx > pos:
            return (m.end(), close_idx)
    return None


def count_internal_links_in_range(html: str, start: int, end: int) -> int:
    """Cuenta enlaces internos (relativos al sitio) en el rango."""
    chunk = html[start:end]
    # Cuenta <a href="..."> donde href no comienza con http, mailto, tel, javascript, #
    count = 0
    for m in re.finditer(r'<a\b[^>]*href=["\']([^"\']+)["\']', chunk, re.IGNORECASE):
        href = m.group(1)
        if href.startswith(("http://", "https://", "mailto:", "tel:", "javascript:", "#")):
            continue
        count += 1
    return count


def find_first_safe_match(html: str, pattern: str, excluded_ranges: list, search_from: int = 0):
    """
    Encuentra la primera ocurrencia del pattern en html, fuera de zonas excluidas
    y fuera de tags HTML. También respeta "max 2 enlaces internos por párrafo".
    Devuelve (start, end, matched_text) o None.
    """
    for m in re.finditer(pattern, html[search_from:], flags=re.IGNORECASE):
        start = search_from + m.start()
        end = search_from + m.end()
        if position_in_excluded(start, excluded_ranges):
            continue
        if position_in_html_tag(html, start):
            continue
        # Verificar densidad del párrafo contenedor
        bounds = find_paragraph_bounds(html, start)
        if bounds is not None:
            ps, pe = bounds
            if count_internal_links_in_range(html, ps, pe) >= 2:
                continue
        return (start, end, m.group(0))
    return None


def insert_link_at(html: str, start: int, end: int, matched: str, href: str) -> str:
    """Reemplaza html[start:end] con <a href="...">matched</a>."""
    new_a = f'<a href="{href}" class="{LINK_CSS}">{matched}</a>'
    return html[:start] + new_a + html[end:]


def process_file(filepath: Path, country_slug: str, lang: str):
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()
    original_len = len(html)

    if lang == "es":
        tech, countries, country_article = TECH_TERMS_ES, COUNTRY_TERMS_ES, COUNTRY_ARTICLE_ES
    elif lang == "en":
        tech, countries, country_article = TECH_TERMS_EN, COUNTRY_TERMS_EN, COUNTRY_ARTICLE_EN
    elif lang == "fr":
        tech, countries, country_article = TECH_TERMS_FR, COUNTRY_TERMS_FR, COUNTRY_ARTICLE_FR
    else:
        return None

    log = {
        "file": str(filepath.relative_to(ROOT)),
        "country": country_slug,
        "lang": lang,
        "links_added": [],
    }

    used_destinations = {}

    def can_use(href):
        return used_destinations.get(href, 0) < 2

    def mark(href):
        used_destinations[href] = used_destinations.get(href, 0) + 1

    # 1) Tech: max 1 por categoría
    used_categories = set()
    for pat, dest, cat in tech:
        if cat in used_categories or not can_use(dest):
            continue
        # Recalcular zonas excluidas porque el HTML cambia tras cada inserción
        excluded = find_excluded_ranges(html)
        match = find_first_safe_match(html, pat, excluded)
        if match:
            s, e, txt = match
            html = insert_link_at(html, s, e, txt, dest)
            log["links_added"].append({"category": cat, "anchor": txt, "dest": dest})
            used_categories.add(cat)
            mark(dest)

    # 2) Cross-country: enlazar primer match de país distinto al propio
    for pat, dest_file in countries:
        own_targets = {f"{country_slug}.html", f"{country_slug}-en.html", f"{country_slug}-fr.html"}
        if dest_file in own_targets:
            continue
        if not can_use(dest_file):
            continue
        excluded = find_excluded_ranges(html)
        match = find_first_safe_match(html, pat, excluded)
        if match:
            s, e, txt = match
            html = insert_link_at(html, s, e, txt, dest_file)
            log["links_added"].append({"category": "country", "anchor": txt, "dest": dest_file})
            mark(dest_file)

    # 3) Artículo práctico del país
    if country_slug in country_article:
        dest, pat = country_article[country_slug]
        if can_use(dest):
            excluded = find_excluded_ranges(html)
            match = find_first_safe_match(html, pat, excluded)
            if match:
                s, e, txt = match
                html = insert_link_at(html, s, e, txt, dest)
                log["links_added"].append({"category": "country_article", "anchor": txt, "dest": dest})
                mark(dest)

    # Validar tamaño plausible
    if log["links_added"] and len(html) > original_len:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(html)

    return log


def main():
    results = []
    only = sys.argv[1] if len(sys.argv) > 1 else None  # opcional: filtrar slug
    for slug, base in COUNTRIES:
        if only and slug != only:
            continue
        for lang, suf in LANG_SUFFIX.items():
            fp = ROOT / "zoopedia" / f"{base}{suf}.html"
            if not fp.exists():
                continue
            log = process_file(fp, slug, lang)
            if log is not None:
                results.append(log)
                n = len(log["links_added"])
                print(f"{n:2d} | {log['file']}")
    total_links = sum(len(r["links_added"]) for r in results)
    files_changed = sum(1 for r in results if r["links_added"])
    print(f"\n=== TOTAL: {total_links} enlaces añadidos en {files_changed} archivos ===")
    log_path = ROOT / "docs" / "INTERLINKS_ZOOPEDIA_LOG_2026-04-30.json"
    log_path.parent.mkdir(exist_ok=True)
    with open(log_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"Log: {log_path}")


if __name__ == "__main__":
    main()
                                                                                            