# -*- coding: utf-8 -*-
"""
Genera 26 EN + 26 FR a partir de los 26 ES de Artículos de interés.
Misma estética que Artículos Científicos. Scope/footer/breadcrumb/hero en EN/FR.
Enlaces a ../articles/ con sufijo -EN.html / -FR.html solo si el archivo existe.
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

BASE_URL = "https://zoovet-travel.com/articulos-interes/"


def target_article_name(es_name, lang):
    """Dado nombre archivo en articles/ (ej zoovet_art5_estres-metabolico-ES.html), devuelve nombre EN o FR si existe."""
    if lang == "en":
        candidates = [
            es_name.replace("-ES.html", "-EN.html").replace("_ES.html", "_EN.html"),
            es_name.replace("ES.html", "EN.html"),  # zoovet_art4_desparasitacionES.html
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


def fix_links_for_lang(html, lang):
    """Enlaces a ../articles/X: usar versión EN o FR solo si existe; si no, texto plano."""
    # Pase explícito para zoovet_article_v2 (sin sufijo -ES en el nombre)
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


def extract_from_es(html):
    """Extrae title, desc, h1, main_content del HTML ES ya construido."""
    title = ""
    desc = ""
    m = re.search(r"<title>([^<]+)</title>", html, re.IGNORECASE)
    if m:
        title = m.group(1).strip()
    m = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', html, re.IGNORECASE)
    if m:
        desc = m.group(1).strip()
    body = re.search(r"<body[^>]*>(.*?)</body>", html, re.DOTALL | re.IGNORECASE)
    if not body:
        return title, desc, title, ""
    body = body.group(1)
    h1_m = re.search(r"<h1[^>]*>(.*?)</h1>", body, re.DOTALL | re.IGNORECASE)
    h1_content = h1_m.group(1).strip() if h1_m else title
    # Main content: entre el primer </div> del scope-box y <footer>
    scope_end = re.search(r'<div class="scope-box">.*?</div>', body, re.DOTALL)
    if scope_end:
        after_scope = body[scope_end.end():]
        footer_m = re.search(r"<footer>", after_scope, re.IGNORECASE)
        main_content = after_scope[:footer_m.start()].strip() if footer_m else after_scope.strip()
    else:
        main_content = ""
    # Quitar script/footer que pudieran haber quedado
    main_content = re.sub(r'<script\s+type="application/ld\+json">.*?</script>', '', main_content, flags=re.DOTALL | re.IGNORECASE)
    main_content = re.sub(r'<footer>.*', '', main_content, flags=re.DOTALL)
    return title, desc, h1_content, main_content


def build_lang_html(basename, title, desc, h1_content, main_content, lang):
    """Construye HTML completo para EN o FR."""
    slug = basename.replace(".html", "")
    url_es = BASE_URL + basename
    url_en = BASE_URL + slug + "-EN.html"
    url_fr = BASE_URL + slug + "-FR.html"
    short_title = (title.split("|")[0].strip() if "|" in title else title)[:60]
    breadcrumb_name = short_title[:50] + ("…" if len(short_title) > 50 else "")

    if lang == "en":
        lang_attr = "en"
        canonical = url_en
        breadcrumb = f'<a href="../index-en.html">Home</a> &rarr; <a href="index-en.html">Articles of Interest</a> &rarr; <span>{breadcrumb_name}</span>'
        masthead_series = "Zoovet Travel · Articles of Interest"
        hero_tag = "Article of interest — travel medicine and international export"
        scope_box = SCOPE_BOX_EN
        footer = FOOTER_EN
        bc_json = [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://zoovet-travel.com/"}, {"@type": "ListItem", "position": 2, "name": "Articles of Interest", "item": "https://zoovet-travel.com/articulos-interes/index-en.html"}, {"@type": "ListItem", "position": 3, "name": breadcrumb_name, "item": url_en}]
    else:
        lang_attr = "fr"
        canonical = url_fr
        breadcrumb = f'<a href="../index-fr.html">Accueil</a> &rarr; <a href="index-fr.html">Articles d\'intérêt</a> &rarr; <span>{breadcrumb_name}</span>'
        masthead_series = "Zoovet Travel · Articles d'intérêt"
        hero_tag = "Article d'intérêt — médecine du voyage et exportation internationale"
        scope_box = SCOPE_BOX_FR
        footer = FOOTER_FR
        bc_json = [{"@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://zoovet-travel.com/"}, {"@type": "ListItem", "position": 2, "name": "Articles d'intérêt", "item": "https://zoovet-travel.com/articulos-interes/index-fr.html"}, {"@type": "ListItem", "position": 3, "name": breadcrumb_name, "item": url_fr}]

    main_content = fix_links_for_lang(main_content, lang)
    # Sec-label: mantener "Sección" (cuerpo en ES)
    graph = [
        {"@type": "WebPage", "@id": canonical + "#webpage", "url": canonical, "name": short_title + " | Zoovet Travel", "inLanguage": lang_attr, "isPartOf": {"@id": "https://zoovet-travel.com/#website"}},
        {"@type": "Article", "@id": canonical + "#article", "headline": title[:200], "inLanguage": lang_attr, "datePublished": "2026-02-24", "dateModified": "2026-02-24", "author": {"@id": canonical + "#author-jessica"}, "publisher": {"@id": "https://zoovet-travel.com/#organization"}, "mainEntityOfPage": {"@id": canonical + "#webpage"}},
        {"@type": "BreadcrumbList", "@id": canonical + "#breadcrumb", "itemListElement": bc_json},
        {"@type": "Organization", "@id": "https://zoovet-travel.com/#organization", "name": "Zoovet Travel", "url": "https://zoovet-travel.com/", "logo": {"@type": "ImageObject", "url": "https://zoovet-travel.com/images/zoovet-logo.png"}},
        {"@type": "WebSite", "@id": "https://zoovet-travel.com/#website", "url": "https://zoovet-travel.com/", "name": "Zoovet Travel", "publisher": {"@id": "https://zoovet-travel.com/#organization"}},
        {"@type": "Person", "@id": canonical + "#author-jessica", "name": "Jessica Ysabel Camacho Garcia", "jobTitle": "Médico Veterinaria", "identifier": "CMVP 12434", "affiliation": {"@id": "https://zoovet-travel.com/#organization"}}
    ]
    json_ld_str = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False)

    html = f"""<!DOCTYPE html>
<html lang="{lang_attr}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{desc.replace('"', '&quot;')}">
  <meta name="author" content="Camacho Garcia JY — Zoovet Travel, Perú">
  <title>{title} | Zoovet Travel</title>
  <link rel="canonical" href="{canonical}">
  <link rel="alternate" hreflang="es" href="{url_es}">
  <link rel="alternate" hreflang="en" href="{url_en}">
  <link rel="alternate" hreflang="fr" href="{url_fr}">
  <link rel="alternate" hreflang="x-default" href="{url_es}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{short_title} | Zoovet Travel">
  <meta property="og:description" content="{desc[:160].replace('"', '&quot;')}">
  <meta property="og:url" content="{canonical}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{short_title} | Zoovet Travel">
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
  <span class="masthead-date">February 2026</span>
</header>

<section class="hero">
  <span class="hero-tag">{hero_tag}</span>
  <h1>{h1_content}</h1>
  <p class="hero-lead">{desc.replace('"', '&quot;')}</p>
  <div class="hero-meta">
    <strong>Jessica Ysabel Camacho Garcia</strong>, DVM — <span class="font-mono">CMVP 12434</span> — Zoovet Travel, Trujillo, Peru &nbsp;|&nbsp; February 2026
  </div>
</section>

{scope_box}

{main_content}

{footer}
<script type="application/ld+json">
{json_ld_str}
</script>
</body>
</html>"""
    if lang == "fr":
        html = html.replace("February 2026", "Février 2026")
    return html


def main():
    for basename in ES_BASES:
        path_es = BASE / basename
        if not path_es.is_file():
            print("Skip (no ES):", basename)
            continue
        raw = path_es.read_text(encoding="utf-8")
        title, desc, h1_content, main_content = extract_from_es(raw)
        if not title:
            title = basename.replace(".html", "").replace("_", " ").replace("-", " ")
        if not desc:
            desc = "Article of interest — Zoovet Travel."

        for lang in ("en", "fr"):
            out_name = basename.replace(".html", "") + "-EN.html" if lang == "en" else basename.replace(".html", "") + "-FR.html"
            out_path = BASE / out_name
            html = build_lang_html(basename, title, desc, h1_content, main_content, lang)
            out_path.write_text(html, encoding="utf-8")
            print("OK:", out_name)
    print("Done. 26 EN + 26 FR generated.")


if __name__ == "__main__":
    main()
