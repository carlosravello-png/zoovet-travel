# -*- coding: utf-8 -*-
"""Genera index.html, index-en.html e index-fr.html con 26 cards y selector de idioma correcto."""
import re
from pathlib import Path

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


def extract(basename):
    p = BASE / basename
    if not p.is_file():
        return basename.replace(".html", "").replace("_", " "), ""
    raw = p.read_text(encoding="utf-8")
    t = re.search(r"<title>([^<]+)</title>", raw)
    d = re.search(r'<meta name="description" content="([^"]*)"', raw)
    title = (t.group(1).split("|")[0].strip() if t else basename.replace(".html", "").replace("_", " "))
    desc = (d.group(1)[:220] if d else "")
    return title, desc


def slug(basename):
    return basename.replace(".html", "")


def card(href, title, desc, num, label="Artículo"):
    esc_title = title.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")
    esc_desc = desc.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")
    return f'''      <li>
        <a href="{href}" class="block relative p-5 border border-[#1a2e35]/15 transition-colors hover:border-[#0C789E]/40">
          <span class="absolute top-2 right-2 text-[10px] font-mono tracking-wider text-[#1a2e35]/60 uppercase">{label} {num}</span>
          <span class="font-semibold text-[#1a2e35]">{esc_title}</span>
          <span class="block text-sm text-[#1a2e35]/70 mt-1">{esc_desc}</span>
        </a>
      </li>'''


# Recoger título y descripción de cada ES
items = []
for b in ES_BASES:
    title, desc = extract(b)
    items.append((b, slug(b), title, desc))

# Header común (nav + logo) — variará el bloque de idiomas
def lang_switcher(current):
    if current == "es":
        return '''    <div class="flex gap-2">
      <span class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35] border border-[#0C789E] bg-[#0C789E]/10 px-3 py-2 rounded-sm">ES</span>
      <a href="index-en.html" class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35]/80 hover:text-[#1a2e35] border border-[#1a2e35]/30 px-3 py-2 rounded-sm transition-colors">EN</a>
      <a href="index-fr.html" class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35]/80 hover:text-[#1a2e35] border border-[#1a2e35]/30 px-3 py-2 rounded-sm transition-colors">FR</a>
    </div>'''
    if current == "en":
        return '''    <div class="flex gap-2">
      <a href="index.html" class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35]/80 hover:text-[#1a2e35] border border-[#1a2e35]/30 px-3 py-2 rounded-sm transition-colors">ES</a>
      <span class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35] border border-[#0C789E] bg-[#0C789E]/10 px-3 py-2 rounded-sm">EN</span>
      <a href="index-fr.html" class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35]/80 hover:text-[#1a2e35] border border-[#1a2e35]/30 px-3 py-2 rounded-sm transition-colors">FR</a>
    </div>'''
    return '''    <div class="flex gap-2">
      <a href="index.html" class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35]/80 hover:text-[#1a2e35] border border-[#1a2e35]/30 px-3 py-2 rounded-sm transition-colors">ES</a>
      <a href="index-en.html" class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35]/80 hover:text-[#1a2e35] border border-[#1a2e35]/30 px-3 py-2 rounded-sm transition-colors">EN</a>
      <span class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35] border border-[#0C789E] bg-[#0C789E]/10 px-3 py-2 rounded-sm">FR</span>
    </div>'''


def build_index(lang):
    if lang == "es":
        home_href = "../index.html"
        home_label = "Inicio"
        h1_text = "Artículos de interés"
        intro = "Selección de artículos sobre mascotas, viajes, salud animal y exportación internacional. Ordenados por número."
        back_text = "← Volver al inicio"
        suffix = ""
    elif lang == "en":
        home_href = "../index-en.html"
        home_label = "Home"
        h1_text = "Articles of Interest"
        intro = "Selection of articles on pets, travel, animal health and international export. Ordered by number."
        back_text = "← Back to home"
        suffix = "-EN"
    else:
        home_href = "../index-fr.html"
        home_label = "Accueil"
        h1_text = "Articles d'intérêt"
        intro = "Sélection d'articles sur les animaux de compagnie, les voyages, la santé animale et l'exportation internationale. Classés par numéro."
        back_text = "← Retour à l'accueil"
        suffix = "-FR"

    card_label = "Artículo" if lang == "es" else "Article" if lang == "en" else "Article"
    cards_html = []
    for i, (basename, slug_name, title, desc) in enumerate(items, 1):
        href = f"./{slug_name}{suffix}.html" if suffix else f"./{basename}"
        cards_html.append(card(href, title, desc, i, card_label))

    return f"""<!DOCTYPE html>
<html lang="{'es' if lang == 'es' else 'en' if lang == 'en' else 'fr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{'Artículos de interés de Zoovet Travel: mascotas, viajes, salud animal y exportación internacional.' if lang == 'es' else 'Articles of interest from Zoovet Travel: pets, travel, animal health and international export.' if lang == 'en' else "Articles d'intérêt Zoovet Travel : animaux de compagnie, voyages, santé animale et exportation internationale."}">
  <title>{h1_text} | Zoovet Travel</title>
  <link rel="canonical" href="https://zoovettravel.com/articulos-interes/{'index-en.html' if lang == 'en' else 'index-fr.html' if lang == 'fr' else ''}">
  <link rel="alternate" hreflang="es" href="https://zoovettravel.com/articulos-interes/">
  <link rel="alternate" hreflang="en" href="https://zoovettravel.com/articulos-interes/index-en.html">
  <link rel="alternate" hreflang="fr" href="https://zoovettravel.com/articulos-interes/index-fr.html">
  <link rel="alternate" hreflang="x-default" href="https://zoovettravel.com/articulos-interes/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      theme: {{
        extend: {{
          fontFamily: {{ montserrat: ['Montserrat', 'sans-serif'] }},
          colors: {{ 'zoovet-navy': '#1a2e35', 'zoovet-blue': '#0C789E' }}
        }}
      }}
    }}
  </script>
  <style>body {{ font-family: 'Montserrat', sans-serif; }} html {{ scroll-behavior: smooth; }}</style>
</head>
<body class="bg-[#F8FAFC] min-h-screen text-[#1a2e35]">
  <nav class="px-4 py-3 text-sm border-b border-[#1a2e35]/10">
    <ol class="flex gap-2 text-[#1a2e35]/70">
      <li><a href="{home_href}" class="hover:text-[#1a2e35]">{home_label}</a></li>
      <li aria-hidden="true">/</li>
      <li class="text-[#1a2e35]">{h1_text}</li>
    </ol>
  </nav>
  <header class="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
    <a href="{home_href}" class="text-xl font-bold tracking-[0.25em] text-[#1a2e35] font-montserrat">ZOOVET TRAVEL</a>
{lang_switcher(lang)}
  </header>
  <main class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-2xl font-bold tracking-wide uppercase text-[#1a2e35] mb-6 font-montserrat">{h1_text}</h1>
    <p class="text-[#1a2e35]/90 font-montserrat mb-6">{intro}</p>
    <ul class="space-y-4 mb-8">
{chr(10).join(cards_html)}
    </ul>
    <a href="{home_href}#articulos-de-interes" class="inline-flex items-center gap-2 text-[#0C789E] font-semibold hover:underline font-montserrat">{back_text}</a>
  </main>
</body>
</html>"""


def main():
    for lang in ("es", "en", "fr"):
        out = "index-en.html" if lang == "en" else "index-fr.html" if lang == "fr" else "index.html"
        BASE.joinpath(out).write_text(build_index(lang), encoding="utf-8")
        print("OK:", out)
    print("Done. index.html, index-en.html, index-fr.html generated.")


if __name__ == "__main__":
    main()
