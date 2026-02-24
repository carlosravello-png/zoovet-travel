# -*- coding: utf-8 -*-
"""
Aplica estética Artículos Científicos a los 26 ES de Artículos de interés.
- Sanitiza: elimina ```html y ```.
- Corrige enlaces a ../articles/ cuando el archivo existe; si no, deja texto plano.
- Reemplaza con head + style + body (breadcrumb Artículos de interés, masthead, hero, scope-box, contenido, footer, JSON-LD).
"""
import os
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent
ARTICLES_DIR = BASE.parent / "articles"
ARTICLES_FILES = set(f.name for f in ARTICLES_DIR.glob("zoovet_*.html"))

# Lista de 26 archivos ES (sin -EN/-FR, sin index)
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

SCOPE_BOX_ES = """<div class="scope-box">
  <strong>Declaración de alcance — lectura obligatoria</strong>
  Este artículo es un documento técnico descriptivo. No es asesoría legal ni veterinaria individualizada. No sustituye la normativa oficial de ninguna jurisdicción ni reemplaza la evaluación del veterinario responsable.<br><br>
  Las exigencias varían por país, ruta, especie y aerolínea. Las normas cambian con frecuencia. La verificación con la autoridad sanitaria competente del país de destino y de tránsito es obligatoria antes de cualquier proceso de exportación.<br><br>
  La emisión de certificados es responsabilidad exclusiva del veterinario habilitado. Este artículo no interfiere con ese criterio profesional.
</div>"""

FOOTER_ES = """<footer>
  <p><strong>Zoovet Travel — Artículos de interés</strong></p>
  <p>Documento de referencia técnica. No constituye prescripción veterinaria ni asesoría legal. Verificación con la autoridad competente del destino obligatoria.</p>
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


def normalize_href(href):
    """Si el destino está en articles/ y existe, devuelve ../articles/nombre; si no existe, None."""
    href = href.strip()
    if not href or href.startswith("#") or href.startswith("mailto:") or href.startswith("http"):
        return None
    # uploaded:zoovet_article3_braquicefalos_ES.html -> zoovet_article3_braquicefalos_ES.html
    if "uploaded:" in href:
        href = href.replace("uploaded:", "")
    name = href.split("/")[-1].split("?")[0]
    if name in ARTICLES_FILES:
        return "../articles/" + name
    return None


def fix_links(html):
    """Reemplaza enlaces que apuntan a articles/ por ../articles/X si existe; si no, deja solo el texto."""
    def repl(m):
        href = m.group(1)
        text = m.group(2)
        new_href = normalize_href(href)
        if new_href:
            return '<a href="' + new_href + '">' + text + '</a>'
        return text
    return re.sub(r'<a\s+href="([^"]+)"[^>]*>([^<]*(?:<[^/][^>]*>[^<]*)*)</a>', repl, html, flags=re.DOTALL)


def extract_content(raw):
    """Sanitiza (quita ```html y ```), extrae title, description y body (h1 + resto hasta </body>)."""
    raw = raw.strip()
    if raw.startswith("```html"):
        raw = raw[7:].strip()
    if raw.startswith("```"):
        raw = raw[3:].strip()
    if raw.endswith("```"):
        raw = raw[:-3].strip()
    title = ""
    desc = ""
    m = re.search(r"<title>([^<]+)</title>", raw, re.IGNORECASE)
    if m:
        title = m.group(1).strip()
    m = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', raw, re.IGNORECASE)
    if m:
        desc = m.group(1).strip()
    # Body: desde <body> hasta </body>
    m = re.search(r"<body[^>]*>(.*?)</body>", raw, re.DOTALL | re.IGNORECASE)
    if not m:
        return title, desc, title, ""
    body = m.group(1).strip()
    # Primer h1 para hero; el resto es contenido
    h1_match = re.search(r"<h1[^>]*>(.*?)</h1>", body, re.DOTALL | re.IGNORECASE)
    if h1_match:
        h1_content = h1_match.group(1).strip()
        rest = body[h1_match.end():].strip()
    else:
        h1_content = title
        rest = body
    rest = fix_links(rest)
    # Quitar cualquier script JSON-LD y footer que vengan del original (evitar duplicados)
    rest = re.sub(r'<script\s+type="application/ld\+json">.*?</script>', '', rest, flags=re.DOTALL | re.IGNORECASE)
    rest = re.sub(r'<footer>.*?</footer>', '', rest, flags=re.DOTALL)
    rest = re.sub(r'<!--\s*META TITLE.*?-->', '', rest, flags=re.DOTALL)
    # Quitar resto de hero (hero-lead, hero-meta, </section>) y scope-box(es) para no duplicar
    for _ in range(3):  # por si el archivo fuente ya era salida previa
        rest = re.sub(r'^.*?</section>', '', rest, count=1, flags=re.DOTALL | re.IGNORECASE)
        rest = re.sub(r'<div class="scope-box">.*?</div>', '', rest, count=1, flags=re.DOTALL)
        rest = re.sub(r'^<p class="hero-lead">.*?</p>\s*', '', rest, flags=re.DOTALL)
        rest = re.sub(r'^<div class="hero-meta">.*?</div>\s*', '', rest, flags=re.DOTALL)
    rest = rest.lstrip()
    # Añadir sec-label a h2 (Sección 1, 2, 3...); quitar sec-label previo si existe
    n = [0]
    def add_sec(m):
        n[0] += 1
        inner = re.sub(r'<span class="sec-label">[^<]*</span>\s*', '', m.group(1).strip())
        return '<h2><span class="sec-label">Sección ' + str(n[0]) + '</span> ' + inner + '</h2>'
    rest = re.sub(r"<h2[^>]*>\s*(.+?)\s*</h2>", add_sec, rest, flags=re.DOTALL)
    return title, desc, h1_content, rest


def build_es_html(basename, title, desc, h1_content, main_content):
    """Construye el HTML completo con estética científica."""
    slug = basename.replace(".html", "")
    base_url = "https://zoovet-travel.com/articulos-interes/"
    url_es = base_url + basename
    url_en = base_url + slug + "-EN.html"
    url_fr = base_url + slug + "-FR.html"
    short_title = title.split("|")[0].strip() if "|" in title else title[:60]
    breadcrumb_name = short_title[:50] + ("…" if len(short_title) > 50 else "")

    head = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{desc.replace('"', '&quot;')}">
  <meta name="author" content="Camacho Garcia JY — Zoovet Travel, Perú">
  <title>{title} | Zoovet Travel</title>
  <link rel="canonical" href="{url_es}">
  <link rel="alternate" hreflang="es" href="{url_es}">
  <link rel="alternate" hreflang="en" href="{url_en}">
  <link rel="alternate" hreflang="fr" href="{url_fr}">
  <link rel="alternate" hreflang="x-default" href="{url_es}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{short_title} | Zoovet Travel">
  <meta property="og:description" content="{desc[:160].replace('"', '&quot;')}">
  <meta property="og:url" content="{url_es}">
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
      <a href="../index.html">Inicio</a> &rarr; <a href="index.html">Artículos de interés</a> &rarr; <span>{breadcrumb_name}</span>
    </nav>
    <div class="lang-switcher">
      <a href="{basename}" hreflang="es">ES</a>
      <a href="{slug}-EN.html" hreflang="en">EN</a>
      <a href="{slug}-FR.html" hreflang="fr">FR</a>
    </div>
  </div>
</header>

<header class="masthead">
  <span class="masthead-series">Zoovet Travel · Artículos de interés</span>
  <span class="masthead-date">Febrero 2026</span>
</header>

<section class="hero">
  <span class="hero-tag">Artículo de interés — medicina de viaje y exportación internacional</span>
  <h1>{h1_content}</h1>
  <p class="hero-lead">{desc.replace('"', '&quot;')}</p>
  <div class="hero-meta">
    <strong>Jessica Ysabel Camacho Garcia</strong>, MVZ — <span class="font-mono">CMVP 12434</span> — Zoovet Travel, Trujillo, Perú &nbsp;|&nbsp; Febrero 2026
  </div>
</section>

{SCOPE_BOX_ES}

{main_content}

{FOOTER_ES}
"""
    # JSON-LD
    json_ld = f"""<script type="application/ld+json">
{{"@context":"https://schema.org","@graph":[{{"@type":"WebPage","@id":"{url_es}#webpage","url":"{url_es}","name":"{short_title} | Zoovet Travel","inLanguage":"es","isPartOf":{{"@id":"https://zoovet-travel.com/#website"}}}},{{"@type":"Article","@id":"{url_es}#article","headline":"{title.replace('"', '\\"')[:200]}","inLanguage":"es","datePublished":"2026-02-24","dateModified":"2026-02-24","author":{{"@id":"{url_es}#author-jessica"}},"publisher":{{"@id":"https://zoovet-travel.com/#organization"}},"mainEntityOfPage":{{"@id":"{url_es}#webpage"}}}},{{"@type":"BreadcrumbList","@id":"{url_es}#breadcrumb","itemListElement":[{{"@type":"ListItem","position":1,"name":"Inicio","item":"https://zoovet-travel.com/"}},{{"@type":"ListItem","position":2,"name":"Artículos de interés","item":"https://zoovet-travel.com/articulos-interes/"}},{{"@type":"ListItem","position":3,"name":"{breadcrumb_name.replace('"', '\\"')}","item":"{url_es}"}}]}},{{"@type":"Organization","@id":"https://zoovet-travel.com/#organization","name":"Zoovet Travel","url":"https://zoovet-travel.com/","logo":{{"@type":"ImageObject","url":"https://zoovet-travel.com/images/zoovet-logo.png"}}}},{{"@type":"WebSite","@id":"https://zoovet-travel.com/#website","url":"https://zoovet-travel.com/","name":"Zoovet Travel","publisher":{{"@id":"https://zoovet-travel.com/#organization"}}}},{{"@type":"Person","@id":"{url_es}#author-jessica","name":"Jessica Ysabel Camacho Garcia","jobTitle":"Médico Veterinaria","identifier":"CMVP 12434","affiliation":{{"@id":"https://zoovet-travel.com/#organization"}}}}]}}
</script>
</body>
</html>"""
    return head + json_ld


def main():
    for basename in ES_BASES:
        path = BASE / basename
        if not path.is_file():
            print("Skip (no file):", basename)
            continue
        raw = path.read_text(encoding="utf-8")
        title, desc, h1_content, main_content = extract_content(raw)
        if not title:
            title = basename.replace(".html", "").replace("_", " ").replace("-", " ")
        if not desc:
            desc = "Artículo de interés — Zoovet Travel."
        html = build_es_html(basename, title, desc, h1_content, main_content)
        path.write_text(html, encoding="utf-8")
        print("OK:", basename)
    print("Done. 26 ES procesados.")


if __name__ == "__main__":
    main()
