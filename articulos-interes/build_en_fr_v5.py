# -*- coding: utf-8 -*-
"""
V5 — Reconstrucción profesional EN/FR. Traducción completa real.
- Meta title UNA sola vez: "Short Title | Zoovet Travel"
- JSON-LD headline e inLanguage en idioma correcto
- H1, hero-lead, breadcrumb, CTA, body 100% en idioma destino
- Validación: 0 frases en español en EN/FR
"""
import json
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent
ARTICLES_DIR = BASE.parent / "articles"
ARTICLES_ALL = set(f.name for f in ARTICLES_DIR.glob("zoovet_*.html"))

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

# Scope/Footer EN/FR — terminología formal
SCOPE_BOX_EN = """<div class="scope-box">
  <strong>Scope statement — required reading</strong>
  This article is a descriptive technical document. It is not legal or individualized veterinary advice. It does not replace official regulations of any jurisdiction nor the assessment of the responsible veterinarian.<br><br>
  Requirements vary by country, route, species and airline. Regulations change frequently. Verification with the competent health authority of the destination and transit country is mandatory before any export process.<br><br>
  Certificate issuance is the sole responsibility of the authorized veterinarian. This article does not override that professional judgment.
</div>"""

SCOPE_BOX_FR = """<div class="scope-box">
  <strong>Déclaration de portée — lecture obligatoire</strong>
  Cet article est un document technique descriptif. Ce n'est pas un conseil juridique ni vétérinaire individualisé. Il ne remplace pas la réglementation officielle d'aucune juridiction ni l'évaluation du vétérinaire responsable.<br><br>
  Les exigences varient selon le pays, l'itinéraire, l'espèce et la compagnie aérienne. Les normes changent fréquemment. La vérification auprès de l'autorité sanitaire compétente du pays de destination et de transit est obligatoire avant tout processus d'exportation.<br><br>
  La délivrance des certificats relève exclusivement du vétérinaire habilité. Cet article n'interfère pas avec ce critère professionnel.
</div>"""

FOOTER_EN = """<footer>
  <p><strong>Zoovet Travel — Articles of Interest</strong></p>
  <p>Technical reference document. Not veterinary prescription or legal advice. Verification with the competent authority of the destination is mandatory.</p>
</footer>"""

FOOTER_FR = """<footer>
  <p><strong>Zoovet Travel — Articles d'intérêt</strong></p>
  <p>Document de référence technique. Ne constitue pas une prescription vétérinaire ni un conseil juridique. Vérification auprès de l'autorité compétente de la destination obligatoire.</p>
</footer>"""

STYLE_BLOCK = """  <style>
    :root { --ink: #1c1917; --deep: #0f2340; --mid: #1e4976; --teal: #0e6655; --teal-bg: #e8f5f1; --accent: #c0392b; --warm: #7b3f00; --warm-bg: #fdf6ef; --sky: #e8f2fa; --rule: #cdd8e3; --muted: #5a6a7a; --paper: #fafaf8; --white: #ffffff; --amber: #b45309; --amber-bg: #fffbeb; --violet: #5b21b6; --violet-bg: #f5f3ff; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Libre Baskerville', Georgia, serif; font-size: 17px; line-height: 1.85; color: var(--ink); background: var(--paper); max-width: 940px; margin: 0 auto; padding: 0 28px 100px; }
    .site-header { font-family: 'DM Sans', sans-serif; background: #fff; border-bottom: 1px solid var(--rule); margin: 0 -28px 20px -28px; padding: 12px 28px 14px; }
    .site-header-inner { max-width: 940px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; }
    .site-header a { color: var(--mid); text-decoration: none; }
    .site-header a:hover { text-decoration: underline; }
    .breadcrumb { font-size: 0.85rem; color: var(--muted); }
    .lang-switcher { display: flex; gap: 8px; }
    .lang-switcher a { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; padding: 6px 12px; border: 1px solid var(--rule); border-radius: 3px; color: var(--mid); }
    .masthead { border-bottom: 3px solid var(--deep); padding: 28px 0 16px; display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap; }
    .masthead-series { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--mid); }
    .masthead-date { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; color: var(--muted); }
    .hero { background: var(--deep); color: #fff; padding: 48px 44px 42px; margin: 0 -28px; position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; top: -80px; right: -80px; width: 320px; height: 320px; background: radial-gradient(circle, rgba(255,255,255,.05) 0%, transparent 70%); pointer-events: none; }
    .hero-tag { display: inline-block; background: var(--teal); color: #fff; font-family: 'DM Sans', sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 4px 12px; border-radius: 2px; margin-bottom: 20px; }
    h1 { font-family: 'Libre Baskerville', serif; font-size: clamp(1.35rem, 3.2vw, 1.9rem); font-weight: 700; line-height: 1.3; color: #fff; margin-bottom: 18px; max-width: 760px; }
    .hero-lead { font-family: 'DM Sans', sans-serif; font-size: 1.03rem; font-weight: 300; line-height: 1.7; color: rgba(255,255,255,.85); max-width: 700px; margin-bottom: 28px; }
    .hero-meta { font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: rgba(255,255,255,.6); border-top: 1px solid rgba(255,255,255,.15); padding-top: 16px; }
    .hero-meta strong { color: rgba(255,255,255,.9); }
    .abstract-box { background: var(--sky); border-left: 4px solid var(--mid); padding: 22px 28px; margin: 32px 0; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; line-height: 1.72; color: var(--deep); }
    .abstract-box strong { display: block; font-size: 0.72rem; letter-spacing: .1em; text-transform: uppercase; color: var(--mid); margin-bottom: 10px; }
    .scope-box { background: var(--white); border: 1px solid var(--rule); border-left: 4px solid var(--muted); padding: 16px 22px; margin: 20px 0 36px; font-family: 'DM Sans', sans-serif; font-size: 0.84rem; color: var(--muted); line-height: 1.6; }
    .scope-box strong { display: block; font-size: 0.7rem; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 6px; }
    h2 { font-family: 'Libre Baskerville', serif; font-size: 1.42rem; font-weight: 700; color: var(--deep); margin: 56px 0 18px; padding-bottom: 10px; border-bottom: 2px solid var(--rule); }
    h3 { font-family: 'DM Sans', sans-serif; font-size: 1.06rem; font-weight: 700; color: var(--mid); margin: 34px 0 12px; letter-spacing: .015em; }
    h4 { font-family: 'DM Sans', sans-serif; font-size: 0.92rem; font-weight: 700; color: var(--teal); margin: 22px 0 8px; text-transform: uppercase; letter-spacing: .05em; }
    p { margin-bottom: 1.3rem; }
    strong { font-weight: 700; }
    em { font-style: italic; }
    .sec-label { font-family: 'DM Sans', sans-serif; font-size: 0.67rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 6px; }
    .ev-box { background: var(--violet-bg); border-left: 4px solid var(--violet); padding: 14px 20px; margin: 24px 0; font-family: 'DM Sans', sans-serif; font-size: 0.86rem; line-height: 1.65; color: #3b0764; }
    .caution-box { background: var(--amber-bg); border: 1.5px solid #d97706; border-radius: 4px; padding: 18px 22px; margin: 28px 0; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; line-height: 1.65; color: #78350f; }
    .pullquote { border-left: 4px solid var(--teal); padding: 16px 28px; margin: 36px 0; background: var(--teal-bg); font-family: 'DM Sans', sans-serif; font-size: 0.96rem; line-height: 1.72; color: #0d4a3f; }
    footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid var(--rule); font-family: 'DM Sans', sans-serif; font-size: 0.78rem; color: var(--muted); }
    .font-mono { font-family: ui-monospace, monospace; }
    ul { margin-bottom: 1.3rem; padding-left: 1.5rem; }
    li { margin-bottom: 0.5rem; }
    a { color: var(--mid); text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>"""

BASE_URL = "https://zoovettravel.com/articulos-interes/"

# Spanish words that must NOT appear in EN or FR. Exclude FR/EN common: "de la", "son", "su" (FR: de la, son/sa; EN: Banco de la Nación)
SPANISH_CHECK = re.compile(
    r"\b(qué|cómo|cuál|cuáles|dónde|desde|mascota|requisitos|llevar|viajar|vuelo|perro|gato|antes|durante|después|nunca|también|solo|sólo|aquí|ahí|documento|certificado|vacuna|antirrábica|zoosanitario|tramitar|aduana|rechazo|cuarentena|guía|artículo|sección|señales|estrés|veterinarios|bodega|concentrado|habitual|evitar|colaciones|ayuno|ventana|embarque|escalas|hidratación|digestivo|vómito|regurgitación|para que|por qué|qué hacer|lo que|del |en el |en la |las |los |una |uno |esta |este |sus |ser |estar|hacer|tener)\b",
    re.IGNORECASE,
)


def target_article_name(es_name, lang):
    if lang == "en":
        candidates = [
            es_name.replace("-ES.html", "-EN.html").replace("_ES.html", "_EN.html"),
            es_name.replace("ES.html", "EN.html"),
            "zoovet_article_v2-en.html" if es_name == "zoovet_article_v2.html" else None,
        ]
    else:
        candidates = [
            es_name.replace("-ES.html", "-FR.html").replace("_ES.html", "_FR.html"),
            es_name.replace("ES.html", "FR.html"),
            "zoovet_article_v2_FR.html" if es_name == "zoovet_article_v2.html" else None,
        ]
    for c in candidates:
        if c and c in ARTICLES_ALL:
            return c
    return None


def fix_links_in_body(html, lang):
    if lang == "en":
        html = html.replace('href="../articles/zoovet_article_v2.html"', 'href="../articles/zoovet_article_v2-en.html"')
    else:
        html = html.replace('href="../articles/zoovet_article_v2.html"', 'href="../articles/zoovet_article_v2_FR.html"')

    def repl(m):
        href = m.group(1).strip()
        text = m.group(2)
        if not href or href.startswith("#") or href.startswith("mailto:") or href.startswith("http"):
            return m.group(0)
        name = href.replace("uploaded:", "").split("/")[-1].split("?")[0]
        target = target_article_name(name, lang)
        if target:
            return '<a href="../articles/' + target + '">' + text + '</a>'
        return text

    return re.sub(r'<a\s+href="([^"]+)"[^>]*>([^<]*(?:<[^/][^>]*>[^<]*)*)</a>', repl, html, flags=re.DOTALL)


def normalize_title(t):
    """One single ' | Zoovet Travel' at end."""
    t = (t.split("|")[0].strip() if "|" in t else t).strip()
    if t.endswith(" | Zoovet Travel"):
        return t
    return t + " | Zoovet Travel"


def build_one(basename, data, lang):
    slug = basename.replace(".html", "")
    url_es = BASE_URL + basename
    url_en = BASE_URL + slug + "-EN.html"
    url_fr = BASE_URL + slug + "-FR.html"

    t = data["title"]
    d = data["description"]
    h1 = data["h1"]
    body = data["body"]
    body = fix_links_in_body(body, lang)

    short_title = normalize_title(t)
    page_title = short_title
    breadcrumb_name = (t.split("|")[0].strip() if "|" in t else t)[:50]
    if len((t.split("|")[0].strip() if "|" in t else t)) > 50:
        breadcrumb_name += "…"

    if lang == "en":
        lang_attr = "en"
        canonical = url_en
        breadcrumb = f'<a href="../index-en.html">Home</a> &rarr; <a href="index-en.html">Articles of Interest</a> &rarr; <span>{breadcrumb_name}</span>'
        masthead_series = "Zoovet Travel · Articles of Interest"
        hero_tag = "Article of interest — travel medicine and international export"
        scope_box = SCOPE_BOX_EN
        footer = FOOTER_EN
        masthead_date = "February 2026"
        hero_meta = "<strong>Jessica Ysabel Camacho Garcia</strong>, DVM — <span class=\"font-mono\">CMVP 12434</span> — Zoovet Travel, Trujillo, Peru &nbsp;|&nbsp; February 2026"
        bc_list = [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://zoovettravel.com/"}, {"@type": "ListItem", "position": 2, "name": "Articles of Interest", "item": "https://zoovettravel.com/articulos-interes/index-en.html"}, {"@type": "ListItem", "position": 3, "name": breadcrumb_name, "item": url_en}]
        author_job = "Veterinarian"
    else:
        lang_attr = "fr"
        canonical = url_fr
        breadcrumb = f'<a href="../index-fr.html">Accueil</a> &rarr; <a href="index-fr.html">Articles d\'intérêt</a> &rarr; <span>{breadcrumb_name}</span>'
        masthead_series = "Zoovet Travel · Articles d'intérêt"
        hero_tag = "Article d'intérêt — médecine du voyage et exportation internationale"
        scope_box = SCOPE_BOX_FR
        footer = FOOTER_FR
        masthead_date = "Février 2026"
        hero_meta = "<strong>Jessica Ysabel Camacho Garcia</strong>, DMV — <span class=\"font-mono\">CMVP 12434</span> — Zoovet Travel, Trujillo, Pérou &nbsp;|&nbsp; Février 2026"
        bc_list = [{"@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://zoovettravel.com/"}, {"@type": "ListItem", "position": 2, "name": "Articles d'intérêt", "item": "https://zoovettravel.com/articulos-interes/index-fr.html"}, {"@type": "ListItem", "position": 3, "name": breadcrumb_name, "item": url_fr}]
        author_job = "Médecin vétérinaire"

    headline_clean = (t.split("|")[0].strip() if "|" in t else t)[:200]
    graph = [
        {"@type": "WebPage", "@id": canonical + "#webpage", "url": canonical, "name": page_title, "inLanguage": lang_attr, "isPartOf": {"@id": "https://zoovettravel.com/#website"}},
        {"@type": "Article", "@id": canonical + "#article", "headline": headline_clean, "inLanguage": lang_attr, "datePublished": "2026-02-24", "dateModified": "2026-02-24", "author": {"@id": canonical + "#author-jessica"}, "publisher": {"@id": "https://zoovettravel.com/#organization"}, "mainEntityOfPage": {"@id": canonical + "#webpage"}},
        {"@type": "BreadcrumbList", "@id": canonical + "#breadcrumb", "itemListElement": bc_list},
        {"@type": "Organization", "@id": "https://zoovettravel.com/#organization", "name": "Zoovet Travel", "url": "https://zoovettravel.com/", "logo": {"@type": "ImageObject", "url": "https://zoovettravel.com/images/zoovet-logo.png"}},
        {"@type": "WebSite", "@id": "https://zoovettravel.com/#website", "url": "https://zoovettravel.com/", "name": "Zoovet Travel", "publisher": {"@id": "https://zoovettravel.com/#organization"}},
        {"@type": "Person", "@id": canonical + "#author-jessica", "name": "Jessica Ysabel Camacho Garcia", "jobTitle": author_job, "identifier": "CMVP 12434", "affiliation": {"@id": "https://zoovettravel.com/#organization"}},
    ]
    json_ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False)

    desc_esc = d.replace("\\", "\\\\").replace('"', '&quot;')
    if len(desc_esc) > 160:
        desc_og = desc_esc[:157] + "..."
    else:
        desc_og = desc_esc

    return f"""<!DOCTYPE html>
<html lang="{lang_attr}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{desc_esc}">
  <meta name="author" content="Camacho Garcia JY — Zoovet Travel, Peru">
  <title>{page_title}</title>
  <link rel="canonical" href="{canonical}">
  <link rel="alternate" hreflang="es" href="{url_es}">
  <link rel="alternate" hreflang="en" href="{url_en}">
  <link rel="alternate" hreflang="fr" href="{url_fr}">
  <link rel="alternate" hreflang="x-default" href="{url_es}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{page_title}">
  <meta property="og:description" content="{desc_og}">
  <meta property="og:url" content="{canonical}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{page_title}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;1,9..40,300&display=swap" rel="stylesheet">
{STYLE_BLOCK}
</head>
<body>

<header class="site-header">
  <div class="site-header-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      {breadcrumb}
    </nav>
    <div class="lang-switcher">
      <a href="{basename}" hreflang="es">ES</a>
      <a href="{slug}-EN.html" hreflang="en">EN</a>
      <a href="{slug}-FR.html" hreflang="fr">FR</a>
    </div>
  </div>
</header>

<header class="masthead">
  <span class="masthead-series">{masthead_series}</span>
  <span class="masthead-date">{masthead_date}</span>
</header>

<section class="hero">
  <span class="hero-tag">{hero_tag}</span>
  <h1>{h1}</h1>
  <p class="hero-lead">{desc_esc}</p>
  <div class="hero-meta">
    {hero_meta}
  </div>
</section>

{scope_box}

{body}

{footer}
<script type="application/ld+json">
{json_ld}
</script>
</body>
</html>"""


def validate_no_spanish(html_content, lang, path):
    """Returns list of Spanish words found (empty = passed)."""
    if lang not in ("en", "fr"):
        return []
    found = SPANISH_CHECK.findall(html_content)
    return list(set(found))


def main():
    try:
        from translations_v5 import TRANSLATIONS
    except ImportError:
        print("ERROR: Create translations_v5.py with TRANSLATIONS dict (slug -> {en: {title, description, h1, body}, fr: {...}})")
        return
    try:
        from TRANSLATIONS_NEW_ENTRIES import TRANSLATIONS_NEW_ENTRIES
        TRANSLATIONS.update(TRANSLATIONS_NEW_ENTRIES)
    except ImportError:
        pass
    try:
        from TRANSLATIONS_BATCH2 import TRANSLATIONS_BATCH2
        TRANSLATIONS.update(TRANSLATIONS_BATCH2)
    except ImportError:
        pass

    errors = []
    for basename in ES_BASES:
        slug = basename.replace(".html", "")
        if slug not in TRANSLATIONS:
            errors.append(f"Missing translation: {slug}")
            continue
        tr = TRANSLATIONS[slug]
        for lang in ("en", "fr"):
            if lang not in tr:
                errors.append(f"Missing {lang} for {slug}")
                continue
            data = tr[lang]
            for key in ("title", "description", "h1", "body"):
                if key not in data:
                    errors.append(f"Missing {key} in {slug} {lang}")
                    break
            else:
                out_name = slug + "-EN.html" if lang == "en" else slug + "-FR.html"
                out_path = BASE / out_name
                html = build_one(basename, data, lang)
                spanish = validate_no_spanish(html, lang, out_name)
                if spanish:
                    errors.append(f"{out_name}: Spanish words found: {spanish[:5]}")
                out_path.write_text(html, encoding="utf-8")
                print("OK:", out_name)

    if errors:
        print("VALIDATION ISSUES:")
        for e in errors:
            print(" -", e)
    else:
        print("Done. 52 EN+FR files generated. LANGUAGE CONSISTENCY PASSED.")


if __name__ == "__main__":
    main()
