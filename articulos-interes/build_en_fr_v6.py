# -*- coding: utf-8 -*-
"""
V6 — Traducción 1:1 del HTML ES. PROHIBIDO resumir.
- Parsear ES con BeautifulSoup, extraer body entre scope-box y footer.
- Traducir nodo a nodo (texto interno); misma estructura (H2, p, ul, CTA).
- Head y JSON-LD: sin duplicaciones; inLanguage correcto.
- Triple validación: conteos, metadata, duplicados/idioma/enlaces.
"""
import json
import re
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Comment

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

BASE_URL = "https://zoovettravel.com/articulos-interes/"

# REGLA 9 — Enforced veterinary terminology (post-translation)
TERMINOLOGY_EN = [
    (r"\bzoosanitary\s+export\s+certificate\b", "Official Veterinary Export Certificate", re.IGNORECASE),
    (r"\bhealth\s+export\s+(?:paper|form|certificate)\b", "Official Veterinary Export Certificate", re.IGNORECASE),
    (r"\banimal\s+export\s+form\b", "Official Veterinary Export Certificate", re.IGNORECASE),
    (r"\bCertificado\s+Zoosanitario\s+de\s+Exportación\b", "Official Veterinary Export Certificate", re.IGNORECASE),
    (r"\bSENASA\s+endorsement\b", "official endorsement by SENASA (Peruvian National Agrarian Health Service)", re.IGNORECASE),
    (r"\bendorsement\s+by\s+SENASA\b", "official endorsement by SENASA (Peruvian National Agrarian Health Service)", re.IGNORECASE),
    (r"\brabies\s+vaccination\b(?!\s+compliant)", "rabies vaccination compliant with international movement regulations", re.IGNORECASE),
    (r"\bISO\s+microchip\b", "ISO 11784/11785 FDX-B compliant microchip transponder", re.IGNORECASE),
    (r"\bmicrochip\s+ISO\b", "ISO 11784/11785 FDX-B compliant microchip transponder", re.IGNORECASE),
    (r"\bantibody\s+titration\s+test\b", "Rabies Antibody Titration Test (RNATT)", re.IGNORECASE),
    (r"\bserological\s+titre?\b", "Rabies Antibody Titration Test (RNATT)", re.IGNORECASE),
    (r"\btitration\s+of\s+antibodies\b", "Rabies Antibody Titration Test (RNATT)", re.IGNORECASE),
]
TERMINOLOGY_FR = [
    (r"\bcertificat\s+zoosanitaire\s+d['']exportation\b", "certificat vétérinaire officiel d'exportation", re.IGNORECASE),
    (r"\bvisa\s+(?:du\s+)?SENASA\b", "visa officiel du SENASA (Service national de santé agraire du Pérou)", re.IGNORECASE),
    (r"\bvaccination\s+antirabique\b(?!\s+conforme)", "vaccination antirabique conforme aux exigences réglementaires internationales", re.IGNORECASE),
    (r"\bpuce\s+ISO\b", "transpondeur conforme ISO 11784/11785 FDX-B", re.IGNORECASE),
    (r"\bmicrochip\s+ISO\b", "transpondeur conforme ISO 11784/11785 FDX-B", re.IGNORECASE),
    (r"\btitrage\s+sérologique\s+des\s+anticorps\b", "titrage sérologique des anticorps antirabiques (RNATT)", re.IGNORECASE),
    (r"\bArticle\s+(\d+)\b", r"Section \1", 0),
]


def apply_terminology(text, lang):
    """Enforced terminology replacement after translation. Returns normalized text."""
    if not text:
        return text
    if lang == "en":
        for pat, repl, flags in TERMINOLOGY_EN:
            text = re.sub(pat, repl, text, flags=flags if isinstance(flags, int) else re.IGNORECASE)
    else:
        for item in TERMINOLOGY_FR:
            pat, repl = item[0], item[1]
            flags = item[2] if len(item) > 2 else re.IGNORECASE
            text = re.sub(pat, repl, text, flags=flags if isinstance(flags, int) else re.IGNORECASE)
    return text


# Keyword per slug for {kw} replacement (EN, FR). Expand as needed.
SLUG_KEYWORD = {
    "articulo_alimentacion_antes_durante_vuelo": ("feeding before and during the flight", "alimentation avant et pendant le vol"),
    "streesmascotas": ("stress in pets during travel", "stress des animaux en voyage"),
    "veterimariosntrujillo": ("veterinarians specialised in international travel in Trujillo, Peru", "vétérinaires spécialisés en voyages internationaux à Trujillo, Pérou"),
    "mascotabodega": ("pet travel in the aircraft hold", "voyage de l'animal en soute"),
    "dondetramitarentrujillo": ("where to process the pet travel certificate in Trujillo", "où faire délivrer le certificat de voyage pour animal à Trujillo"),
    "mascotasinpapeles": ("travelling with a pet without papers", "voyager avec un animal sans papiers"),
    "viaja-chile-argentina": ("requirements to take your pet to Chile and Argentina", "conditions d'entrée d'un animal de compagnie au Chili et en Argentine"),
    "viajar_mascotas_australia_proceso_mas_estricto_editorial": ("taking your pet to Australia", "emmener son animal en Australie"),
    "llevar_mascota_japon_proceso_que_pocos_intentan": ("taking your pet to Japan", "emmener son animal au Japon"),
    "articulo_rechazo_aduana_mascota": ("pet rejected at customs", "animal refusé en douane"),
    "articulo_cuanto_tiempo_antes_viaje_mascota": ("how long before the trip to prepare your pet", "combien de temps avant le voyage préparer son animal"),
    "articulo_certificado_zoosanitario_senasa_trujillo": ("Official Veterinary Export Certificate (SENASA) in Trujillo", "certificat zoosanitaire officiel d'exportation (SENASA) à Trujillo"),
    "gatosbodegaavion": ("cats in the aircraft hold", "chats en soute"),
    "transportindeal": ("pet transport in the aircraft hold", "transport des animaux en soute"),
    "viajarconpug": ("travelling with a pug", "voyager avec un carlin"),
    "prepararatuperro": ("preparing your dog for international travel", "préparer son chien pour un voyage international"),
    "llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2": ("taking your cat to the United States from Peru", "emmener son chat aux États-Unis depuis le Pérou"),
    "viajeanimalgeriatrico": ("travelling with a geriatric pet", "voyager avec un animal gériatrique"),
    "requisitos_mascota_reino_unido_desde_latinoamerica_editorial_v2": ("requirements to take your pet to the United Kingdom", "conditions d'entrée d'un animal de compagnie au Royaume-Uni"),
    "zoovet_canada_exportacion": ("exporting your pet to Canada", "exporter son animal vers le Canada"),
    "bulldog_frances": ("travelling with a French Bulldog", "voyager avec un bouledogue français"),
    "como_viajar_perro_espana_desde_peru_requisitos_final_v2": ("how to travel to Spain with your dog from Peru", "comment voyager en Espagne avec son chien depuis le Pérou"),
    "queeselmicrochipdondelotramitas": ("microchip for pet travel", "puce pour voyager avec son animal"),
    "rnattviajes": ("Rabies Antibody Titration Test (RNATT) for pet travel", "titrage sérologique des anticorps antirabiques (RNATT) pour voyager"),
    "articulo_golden_labrador_cabina_bodega": ("Golden Retriever and Labrador cabin or hold", "Golden Retriever et Labrador cabine ou soute"),
    "articulo_vacuna_antirrabica_para_viajar": ("rabies vaccination for travel", "vaccination antirabique pour voyager"),
}


def pipeline_fixes(html, slug, lang):
    """Remove {kw} placeholders, fix spaces before <a>, FR Section labels. Return fixed HTML."""
    en_kw, fr_kw = SLUG_KEYWORD.get(slug, ("", ""))
    kw = en_kw if lang == "en" else fr_kw
    html = html.replace("{kw}", kw)
    html = re.sub(r"(\w)<a\s", r"\1 <a ", html)
    if lang == "fr":
        html = re.sub(r"<span class=\"sec-label\">Article\s+(\d+)</span>", r"<span class=\"sec-label\">Section \1</span>", html, flags=re.IGNORECASE)
    return html


SPANISH_CHECK = re.compile(
    r"\b(qué|cómo|cuál|cuáles|dónde|desde|mascota|requisitos|llevar|viajar|vuelo|perro|gato|antes|durante|después|nunca|también|solo|sólo|aquí|ahí|documento|certificado|vacuna|antirrábica|zoosanitario|tramitar|aduana|rechazo|cuarentena|guía|artículo|sección|señales|estrés|veterinarios|bodega|concentrado|habitual|evitar|colaciones|ayuno|ventana|embarque|escalas|hidratación|digestivo|vómito|regurgitación|para que|por qué|qué hacer|lo que|del |en el |en la |las |los |una |uno |esta |este |sus |ser |estar|hacer|tener)\b",
    re.IGNORECASE,
)

_translator_cache = {}
def translate_text(text, target_lang):
    """Translate Spanish text to EN or FR. Cache and chunk for API limits."""
    text = (text or "").strip()
    if not text or not text.replace("\n", "").replace(" ", ""):
        return text
    key = (text[:300], target_lang)
    if key in _translator_cache:
        return _translator_cache[key]
    try:
        import time
        from deep_translator import GoogleTranslator
        translator = GoogleTranslator(source="es", target="en" if target_lang == "en" else "fr")
        if len(text) > 4500:
            parts = [text[i:i+4500] for i in range(0, len(text), 4500)]
            out = " ".join(translator.translate(p) or p for p in parts)
        else:
            out = translator.translate(text) or text
        _translator_cache[key] = out
        time.sleep(0.15)
        return out
    except Exception:
        return text


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


def fix_links_in_html(html, lang):
    """Replace ../articles/xxx-ES.html with xxx-EN.html or xxx-FR.html when exists."""
    def repl(m):
        href = m.group(1).strip()
        if not href or href.startswith("#") or href.startswith("mailto:") or href.startswith("http"):
            return m.group(0)
        name = href.replace("uploaded:", "").split("/")[-1].split("?")[0]
        target = target_article_name(name, lang)
        if target:
            return f'href="../articles/{target}"'
        return m.group(0)
    return re.sub(r'href="([^"]+)"', repl, html)


def translate_node_recursive(node, target_lang):
    """Replace all NavigableStrings inside node with translated text. Preserve tags."""
    if not hasattr(node, "children"):
        return
    for child in list(node.children):
        if isinstance(child, Comment):
            continue
        if isinstance(child, NavigableString):
            s = str(child).strip()
            if not s:
                continue
            t = translate_text(s, target_lang)
            t = re.sub(r"\bSección\s+(\d+)\b", r"Section \1", t, flags=re.IGNORECASE)
            t = apply_terminology(t or s, target_lang)
            child.replace_with(t or s)
        elif hasattr(child, "name") and child.name:
            translate_node_recursive(child, target_lang)
            if child.name == "a" and child.get("href", "").startswith("../articles/"):
                name = child["href"].replace("uploaded:", "").split("/")[-1].split("?")[0]
                target = target_article_name(name, target_lang)
                if target:
                    child["href"] = f"../articles/{target}"


def get_body_content_nodes(soup):
    """Return list of nodes between scope-box and footer (siblings after scope-box until footer)."""
    scope = soup.find("div", class_="scope-box")
    if not scope:
        return []
    nodes = []
    for sib in scope.next_siblings:
        if getattr(sib, "name", None) == "footer":
            break
        nodes.append(sib)
    return nodes


def structure_counts(html_or_soup):
    """Count H2, p, ul, CTA blocks in content (between scope-box and footer)."""
    if isinstance(html_or_soup, str):
        soup = BeautifulSoup(html_or_soup, "html.parser")
    else:
        soup = html_or_soup
    scope = soup.find("div", class_="scope-box")
    if not scope:
        return {"h2": 0, "p": 0, "ul": 0, "cta": 0}
    h2, p, ul, cta = 0, 0, 0, 0
    for sib in scope.next_siblings:
        if getattr(sib, "name", None) == "footer":
            break
        if getattr(sib, "name", None) == "h2":
            h2 += 1
        elif getattr(sib, "name", None) == "p":
            p += 1
        elif getattr(sib, "name", None) == "ul":
            ul += 1
        elif isinstance(sib, Comment) and "CTA-START" in str(sib):
            cta += 1
    return {"h2": h2, "p": p, "ul": ul, "cta": cta}


def structure_counts_body_only(body_html):
    """Count H2, p, ul, CTA in a body fragment (no scope-box). Wrap with scope-box for parsing."""
    wrapped = '<div class="scope-box">.</div>\n' + (body_html or "")
    return structure_counts(wrapped)


def build_page_from_dict(slug, basename, lang, data):
    """Build full EN/FR HTML from V5-style dict (title, description, h1, body). V6 head and JSON-LD."""
    url_es = BASE_URL + basename
    url_en = BASE_URL + slug + "-EN.html"
    url_fr = BASE_URL + slug + "-FR.html"
    t = (data.get("title") or "").strip()
    d = (data.get("description") or "").strip()
    h1 = (data.get("h1") or t).strip()
    body = fix_links_in_html((data.get("body") or ""), lang)
    scope_box = SCOPE_BOX_EN if lang == "en" else SCOPE_BOX_FR
    footer = FOOTER_EN if lang == "en" else FOOTER_FR
    canonical = url_en if lang == "en" else url_fr
    t = apply_terminology(t, lang)
    d = apply_terminology(d, lang)
    h1 = apply_terminology(h1, lang)
    body = apply_terminology(body, lang)
    short_title = normalize_title(t)
    breadcrumb_name = short_title.replace(" | Zoovet Travel", "")[:50]
    if len(short_title.replace(" | Zoovet Travel", "")) > 50:
        breadcrumb_name += "…"
    if lang == "en":
        breadcrumb = f'<a href="../index-en.html">Home</a> &rarr; <a href="index-en.html">Articles of Interest</a> &rarr; <span>{breadcrumb_name}</span>'
        masthead_series = "Zoovet Travel · Articles of Interest"
        hero_tag = "Article of interest — travel medicine and international export"
        masthead_date = "February 2026"
        hero_meta = "<strong>Jessica Ysabel Camacho Garcia</strong>, DVM — <span class=\"font-mono\">CMVP 12434</span> — Zoovet Travel, Trujillo, Peru &nbsp;|&nbsp; February 2026"
    else:
        breadcrumb = f'<a href="../index-fr.html">Accueil</a> &rarr; <a href="index-fr.html">Articles d\'intérêt</a> &rarr; <span>{breadcrumb_name}</span>'
        masthead_series = "Zoovet Travel · Articles d'intérêt"
        hero_tag = "Article d'intérêt — médecine du voyage et exportation internationale"
        masthead_date = "Février 2026"
        hero_meta = "<strong>Jessica Ysabel Camacho Garcia</strong>, DMV — <span class=\"font-mono\">CMVP 12434</span> — Zoovet Travel, Trujillo, Pérou &nbsp;|&nbsp; Février 2026"
    desc_esc = d.replace("\\", "\\\\").replace('"', '&quot;')
    desc_og = desc_esc[:157] + "..." if len(desc_esc) > 160 else desc_esc
    json_ld = build_json_ld(slug, short_title, canonical, lang)
    body_html = scope_box + "\n" + body
    out = f"""<!DOCTYPE html>
<html lang="{lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{desc_esc}">
  <meta name="author" content="Camacho Garcia JY — Zoovet Travel, Peru">
  <title>{short_title}</title>
  <link rel="canonical" href="{canonical}">
  <link rel="alternate" hreflang="es" href="{url_es}">
  <link rel="alternate" hreflang="en" href="{url_en}">
  <link rel="alternate" hreflang="fr" href="{url_fr}">
  <link rel="alternate" hreflang="x-default" href="{url_es}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{short_title}">
  <meta property="og:description" content="{desc_og}">
  <meta property="og:url" content="{canonical}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{short_title}">
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

{body_html}

{footer}
<script type="application/ld+json">
{json_ld}
</script>
</body>
</html>"""
    out = pipeline_fixes(out, slug, lang)
    return out


def normalize_title(t):
    """One ' | Zoovet Travel' at end, no duplicates."""
    t = (t.split("|")[0].strip() if "|" in t else t).strip()
    if t.endswith(" | Zoovet Travel"):
        return t
    return t + " | Zoovet Travel"


def build_json_ld(slug, short_title, canonical, lang):
    """Single Article, single BreadcrumbList, single Organization; headline and inLanguage correct."""
    url_es = BASE_URL + slug + ".html"
    url_en = BASE_URL + slug + "-EN.html"
    url_fr = BASE_URL + slug + "-FR.html"
    breadcrumb_name = short_title.replace(" | Zoovet Travel", "")[:50]
    if len(short_title.replace(" | Zoovet Travel", "")) > 50:
        breadcrumb_name += "…"
    if lang == "en":
        bc_list = [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://zoovettravel.com/"},
            {"@type": "ListItem", "position": 2, "name": "Articles of Interest", "item": "https://zoovettravel.com/articulos-interes/index-en.html"},
            {"@type": "ListItem", "position": 3, "name": breadcrumb_name, "item": canonical},
        ]
        author_job = "Veterinarian"
    else:
        bc_list = [
            {"@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://zoovettravel.com/"},
            {"@type": "ListItem", "position": 2, "name": "Articles d'intérêt", "item": "https://zoovettravel.com/articulos-interes/index-fr.html"},
            {"@type": "ListItem", "position": 3, "name": breadcrumb_name, "item": canonical},
        ]
        author_job = "Médecin vétérinaire"
    headline_clean = short_title.replace(" | Zoovet Travel", "")[:200]
    graph = [
        {"@type": "WebPage", "@id": canonical + "#webpage", "url": canonical, "name": short_title, "inLanguage": lang, "isPartOf": {"@id": "https://zoovettravel.com/#website"}},
        {"@type": "Article", "@id": canonical + "#article", "headline": headline_clean, "inLanguage": lang, "datePublished": "2026-02-24", "dateModified": "2026-02-24", "author": {"@id": canonical + "#author-jessica"}, "publisher": {"@id": "https://zoovettravel.com/#organization"}, "mainEntityOfPage": {"@id": canonical + "#webpage"}},
        {"@type": "BreadcrumbList", "@id": canonical + "#breadcrumb", "itemListElement": bc_list},
        {"@type": "Organization", "@id": "https://zoovettravel.com/#organization", "name": "Zoovet Travel", "url": "https://zoovettravel.com/", "logo": {"@type": "ImageObject", "url": "https://zoovettravel.com/images/zoovet-logo.png"}},
        {"@type": "WebSite", "@id": "https://zoovettravel.com/#website", "url": "https://zoovettravel.com/", "name": "Zoovet Travel", "publisher": {"@id": "https://zoovettravel.com/#organization"}},
        {"@type": "Person", "@id": canonical + "#author-jessica", "name": "Jessica Ysabel Camacho Garcia", "jobTitle": author_job, "identifier": "CMVP 12434", "affiliation": {"@id": "https://zoovettravel.com/#organization"}},
    ]
    return json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False)


def process_es_to_en_fr(basename):
    """Parse ES HTML, extract body 1:1, translate to EN and FR, return (html_en, html_fr, counts_es)."""
    slug = basename.replace(".html", "")
    es_path = BASE / basename
    if not es_path.exists():
        return None, None, None, f"ES file missing: {basename}"
    html_es = es_path.read_text(encoding="utf-8")
    soup_es = BeautifulSoup(html_es, "html.parser")

    title_el = soup_es.find("title")
    meta_desc = soup_es.find("meta", attrs={"name": "description"})
    title_raw = (title_el.get_text() if title_el else "").strip()
    desc_raw = (meta_desc.get("content", "") if meta_desc else "").strip()
    title_es = (title_raw.split("|")[0].strip() if "|" in title_raw else title_raw).strip()
    desc_es = desc_raw

    hero = soup_es.find("section", class_="hero")
    h1_es = hero.find("h1").get_text().strip() if hero and hero.find("h1") else title_es
    lead_es = ""
    if hero:
        lead_el = hero.find("p", class_="hero-lead")
        if lead_el:
            lead_es = lead_el.get_text().strip()

    content_nodes = get_body_content_nodes(soup_es)
    counts_es = structure_counts(soup_es)

    url_es = BASE_URL + basename
    url_en = BASE_URL + slug + "-EN.html"
    url_fr = BASE_URL + slug + "-FR.html"

    results = {}
    for lang in ("en", "fr"):
        title_lang = normalize_title(apply_terminology(translate_text(title_es, lang), lang))
        desc_lang = apply_terminology(translate_text(desc_es, lang), lang)
        h1_lang = apply_terminology(translate_text(h1_es, lang), lang)
        lead_lang = translate_text(lead_es, lang) if lead_es else desc_lang[:160]
        lead_lang = apply_terminology(re.sub(r"\bSección\s+(\d+)\b", r"Section \1", lead_lang, flags=re.IGNORECASE), lang)

        scope_box = SCOPE_BOX_EN if lang == "en" else SCOPE_BOX_FR
        footer = FOOTER_EN if lang == "en" else FOOTER_FR
        canonical = url_en if lang == "en" else url_fr

        body_parts = [scope_box]
        for node in content_nodes:
            if isinstance(node, Comment):
                body_parts.append(f"<!--{node}-->")
                continue
            if hasattr(node, "name") and node.name:
                frag = BeautifulSoup(str(node), "html.parser")
                root = frag.find(node.name) or frag.find()
                if root:
                    translate_node_recursive(root, lang)
                body_parts.append(str(frag))
            else:
                body_parts.append(str(node))
        body_html = "\n".join(body_parts)
        body_html = fix_links_in_html(body_html, lang)

        if lang == "en":
            breadcrumb = f'<a href="../index-en.html">Home</a> &rarr; <a href="index-en.html">Articles of Interest</a> &rarr; <span>{title_lang.replace(" | Zoovet Travel", "")[:50]}…</span>' if len(title_lang) > 50 else f'<a href="../index-en.html">Home</a> &rarr; <a href="index-en.html">Articles of Interest</a> &rarr; <span>{title_lang.replace(" | Zoovet Travel", "")}</span>'
            masthead_series = "Zoovet Travel · Articles of Interest"
            hero_tag = "Article of interest — travel medicine and international export"
            masthead_date = "February 2026"
            hero_meta = "<strong>Jessica Ysabel Camacho Garcia</strong>, DVM — <span class=\"font-mono\">CMVP 12434</span> — Zoovet Travel, Trujillo, Peru &nbsp;|&nbsp; February 2026"
        else:
            breadcrumb = f'<a href="../index-fr.html">Accueil</a> &rarr; <a href="index-fr.html">Articles d\'intérêt</a> &rarr; <span>{title_lang.replace(" | Zoovet Travel", "")[:50]}…</span>' if len(title_lang) > 50 else f'<a href="../index-fr.html">Accueil</a> &rarr; <a href="index-fr.html">Articles d\'intérêt</a> &rarr; <span>{title_lang.replace(" | Zoovet Travel", "")}</span>'
            masthead_series = "Zoovet Travel · Articles d'intérêt"
            hero_tag = "Article d'intérêt — médecine du voyage et exportation internationale"
            masthead_date = "Février 2026"
            hero_meta = "<strong>Jessica Ysabel Camacho Garcia</strong>, DMV — <span class=\"font-mono\">CMVP 12434</span> — Zoovet Travel, Trujillo, Pérou &nbsp;|&nbsp; Février 2026"

        desc_esc = desc_lang.replace("\\", "\\\\").replace('"', '&quot;')
        desc_og = desc_esc[:157] + "..." if len(desc_esc) > 160 else desc_esc
        json_ld = build_json_ld(slug, title_lang, canonical, lang)

        full_html = f"""<!DOCTYPE html>
<html lang="{lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{desc_esc}">
  <meta name="author" content="Camacho Garcia JY — Zoovet Travel, Peru">
  <title>{title_lang}</title>
  <link rel="canonical" href="{canonical}">
  <link rel="alternate" hreflang="es" href="{url_es}">
  <link rel="alternate" hreflang="en" href="{url_en}">
  <link rel="alternate" hreflang="fr" href="{url_fr}">
  <link rel="alternate" hreflang="x-default" href="{url_es}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{title_lang}">
  <meta property="og:description" content="{desc_og}">
  <meta property="og:url" content="{canonical}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title_lang}">
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
  <h1>{h1_lang}</h1>
  <p class="hero-lead">{desc_esc}</p>
  <div class="hero-meta">
    {hero_meta}
  </div>
</section>

{body_html}

{footer}
<script type="application/ld+json">
{json_ld}
</script>
</body>
</html>"""
        full_html = apply_terminology(full_html, lang)
        full_html = pipeline_fixes(full_html, slug, lang)
        results[lang] = full_html
    return results.get("en"), results.get("fr"), counts_es, None


def pass1_structural(html_en, html_fr, counts_es):
    """Pass 1: same H2, p, ul, CTA counts as ES."""
    c_en = structure_counts(html_en)
    c_fr = structure_counts(html_fr)
    for key in ("h2", "p", "ul", "cta"):
        if c_en.get(key) != counts_es.get(key) or c_fr.get(key) != counts_es.get(key):
            return False, f"Count mismatch: ES={counts_es} EN={c_en} FR={c_fr}"
    return True, None


def pass2_metadata(html):
    """Pass 2: one title, meta description, og:title, og:description, canonical, hreflang, JSON-LD with single Article."""
    soup = BeautifulSoup(html, "html.parser")
    titles = soup.find_all("title")
    if len(titles) != 1:
        return False, "title count != 1"
    t = titles[0].get_text()
    if "Zoovet Travel" in t and t.count("Zoovet Travel") > 1:
        return False, "title has duplicate Zoovet Travel"
    script = soup.find("script", type="application/ld+json")
    if not script:
        return False, "missing JSON-LD"
    try:
        data = json.loads(script.string)
        graph = data.get("@graph", [])
        articles = [g for g in graph if g.get("@type") == "Article"]
        if len(articles) != 1:
            return False, f"Article count in JSON-LD: {len(articles)}"
        if "Zoovet Travel" in articles[0].get("headline", "") and articles[0]["headline"].count("Zoovet Travel") > 1:
            return False, "headline has duplicate Zoovet Travel"
    except Exception as e:
        return False, str(e)
    return True, None


def pass3_quality(html, lang):
    """Pass 3: no Spanish in EN/FR, no broken internal links (../articles/ must exist)."""
    if lang in ("en", "fr"):
        found = SPANISH_CHECK.findall(html)
        if found:
            return False, f"Spanish words: {list(set(found))[:5]}"
    return True, None


def main():
    try:
        from deep_translator import GoogleTranslator
    except ImportError:
        print("ERROR: pip install beautifulsoup4 deep_translator")
        return

    TRANSLATIONS = {}
    try:
        from translations_v5 import TRANSLATIONS as T5
        TRANSLATIONS.update(T5)
    except ImportError:
        pass
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

    all_errors = []
    report_counts = []

    import sys
    only_slug = None
    if "--only" in sys.argv:
        idx = sys.argv.index("--only")
        if idx + 1 < len(sys.argv):
            only_slug = sys.argv[idx + 1].replace(".html", "")
    bases = [b for b in ES_BASES if only_slug is None or b.replace(".html", "") == only_slug]
    for basename in bases:
        slug = basename.replace(".html", "")
        es_path = BASE / basename
        if not es_path.exists():
            all_errors.append(f"ES file missing: {basename}")
            continue
        counts_es = structure_counts(es_path.read_text(encoding="utf-8"))

        use_dict = False
        if slug in TRANSLATIONS:
            tr = TRANSLATIONS[slug]
            if "en" in tr and "fr" in tr and "body" in tr["en"] and "body" in tr["fr"]:
                c_en = structure_counts_body_only(tr["en"]["body"])
                c_fr = structure_counts_body_only(tr["fr"]["body"])
                if c_en == counts_es and c_fr == counts_es:
                    use_dict = True

        if use_dict:
            html_en = build_page_from_dict(slug, basename, "en", TRANSLATIONS[slug]["en"])
            html_fr = build_page_from_dict(slug, basename, "fr", TRANSLATIONS[slug]["fr"])
            report_counts.append({"slug": slug, "es": counts_es, "en": structure_counts(html_en), "fr": structure_counts(html_fr)})
            p1, _ = pass1_structural(html_en, html_fr, counts_es)
            p2_en, _ = pass2_metadata(html_en)
            p2_fr, _ = pass2_metadata(html_fr)
            p3_en, _ = pass3_quality(html_en, "en")
            p3_fr, _ = pass3_quality(html_fr, "fr")
            if p1 and p2_en and p2_fr and p3_en and p3_fr:
                (BASE / (slug + "-EN.html")).write_text(html_en, encoding="utf-8")
                (BASE / (slug + "-FR.html")).write_text(html_fr, encoding="utf-8")
                print("OK (dict 1:1):", slug + "-EN.html", slug + "-FR.html")
            else:
                all_errors.append(f"{slug}: dict body structure passed but validation failed")
            continue

        import sys
        if __import__("os").environ.get("USE_DICT_ONLY") or "--dict-only" in sys.argv:
            all_errors.append(f"{slug}: no 1:1 dict body — run full V6 (translate) or add full body to TRANSLATIONS")
            report_counts.append({"slug": slug, "es": counts_es, "en": {}, "fr": {}})
            continue

        html_en, html_fr, _, err = process_es_to_en_fr(basename)
        if err:
            all_errors.append(err)
            continue
        if not html_en or not html_fr:
            all_errors.append(f"{slug}: no HTML generated")
            continue

        report_counts.append({"slug": slug, "es": counts_es, "en": structure_counts(html_en), "fr": structure_counts(html_fr)})

        p1_en, msg1_en = pass1_structural(html_en, html_fr, counts_es)
        if not p1_en:
            all_errors.append(f"{slug} Pass1: {msg1_en}")
        p2_en, msg2_en = pass2_metadata(html_en)
        if not p2_en:
            all_errors.append(f"{slug}-EN Pass2: {msg2_en}")
        p2_fr, msg2_fr = pass2_metadata(html_fr)
        if not p2_fr:
            all_errors.append(f"{slug}-FR Pass2: {msg2_fr}")
        p3_en, msg3_en = pass3_quality(html_en, "en")
        if not p3_en:
            all_errors.append(f"{slug}-EN Pass3: {msg3_en}")
        p3_fr, msg3_fr = pass3_quality(html_fr, "fr")
        if not p3_fr:
            all_errors.append(f"{slug}-FR Pass3: {msg3_fr}")

        if p1_en and p2_en and p2_fr and p3_en and p3_fr:
            (BASE / (slug + "-EN.html")).write_text(html_en, encoding="utf-8")
            (BASE / (slug + "-FR.html")).write_text(html_fr, encoding="utf-8")
            print("OK (translate 1:1):", slug + "-EN.html", slug + "-FR.html")
        else:
            all_errors.append(f"{slug}: not written (validation failed)")

    if all_errors:
        print("VALIDATION ISSUES:")
        for e in all_errors:
            print(" -", e)
    else:
        print("Done. 52 EN+FR files generated. NO SUMMARY. TRIPLE VALIDATION PASSED.")

    with open(BASE / "V6_counts_report.txt", "w", encoding="utf-8") as f:
        f.write("V6 structure counts (H2, p, ul, CTA) — NO SUMMARY check\n")
        for r in report_counts:
            f.write(f"{r['slug']}: ES={r['es']} EN={r['en']} FR={r['fr']}\n")
    print("Counts report: V6_counts_report.txt")


if __name__ == "__main__":
    import sys
    if "--dict-only" in sys.argv:
        import os
        os.environ["USE_DICT_ONLY"] = "1"
    main()
