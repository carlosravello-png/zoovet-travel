# -*- coding: utf-8 -*-
"""
Reemplaza el bloque CTA en los 78 archivos (26 ES + 26 EN + 26 FR).
Solo toca el párrafo CTA y añade CSS .cta-contact si no existe.
"""
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

CTA_CSS = """
.cta-contact {
  background: #0f2340;
  color: #fff;
  padding: 28px 32px;
  margin: 48px 0 32px;
  border-radius: 4px;
}
.cta-text {
  font-family: 'DM Sans', Arial, sans-serif;
  font-size: 0.97rem;
  line-height: 1.7;
  color: rgba(255,255,255,.88);
  margin-bottom: 20px;
}
.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}
.cta-wa {
  display: inline-block;
  background: #25D366;
  color: #fff;
  font-family: 'DM Sans', Arial, sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 3px;
  text-decoration: none;
  letter-spacing: .03em;
}
.cta-wa:hover { background: #1ebe5d; }
.cta-tel {
  display: inline-block;
  background: transparent;
  color: rgba(255,255,255,.75);
  font-family: 'DM Sans', Arial, sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 3px;
  border: 1px solid rgba(255,255,255,.3);
  text-decoration: none;
}
.cta-tel:hover {
  border-color: rgba(255,255,255,.7);
  color: #fff;
}
.cta-address {
  font-family: 'DM Sans', Arial, sans-serif;
  font-size: 0.75rem;
  color: rgba(255,255,255,.45);
  margin: 0;
  letter-spacing: .02em;
}
"""

def cta_block_es(text):
    return f'''<div class="cta-contact">
  <p class="cta-text">{text}</p>
  <div class="cta-buttons">
    <a class="cta-wa"
       href="https://wa.me/51979620402"
       target="_blank"
       rel="noopener">
      WhatsApp · +51 979 620 402
    </a>
    <a class="cta-wa"
       href="https://wa.me/51922083707"
       target="_blank"
       rel="noopener">
      WhatsApp · +51 922 083 707
    </a>
    <a class="cta-tel"
       href="tel:+51044366094">
      Llamar · 044 366094
    </a>
  </div>
  <p class="cta-address">
    Calle Cuba 241, Urb. El Recreo — Trujillo, Perú
  </p>
</div>'''

def cta_block_en(text):
    return f'''<div class="cta-contact">
  <p class="cta-text">{text}</p>
  <div class="cta-buttons">
    <a class="cta-wa"
       href="https://wa.me/51979620402"
       target="_blank"
       rel="noopener">
      WhatsApp · +51 979 620 402
    </a>
    <a class="cta-wa"
       href="https://wa.me/51922083707"
       target="_blank"
       rel="noopener">
      WhatsApp · +51 922 083 707
    </a>
    <a class="cta-tel"
       href="tel:+51044366094">
      Call · 044 366094
    </a>
  </div>
  <p class="cta-address">
    Calle Cuba 241, Urb. El Recreo — Trujillo, Perú
  </p>
</div>'''

def cta_block_fr(text):
    return f'''<div class="cta-contact">
  <p class="cta-text">{text}</p>
  <div class="cta-buttons">
    <a class="cta-wa"
       href="https://wa.me/51979620402"
       target="_blank"
       rel="noopener">
      WhatsApp · +51 979 620 402
    </a>
    <a class="cta-wa"
       href="https://wa.me/51922083707"
       target="_blank"
       rel="noopener">
      WhatsApp · +51 922 083 707
    </a>
    <a class="cta-tel"
       href="tel:+51044366094">
      Appeler · 044 366094
    </a>
  </div>
  <p class="cta-address">
    Calle Cuba 241, Urb. El Recreo — Trujillo, Perú
  </p>
</div>'''


def clean_cta_text(raw: str) -> str:
    """Elimina números de teléfono, dirección y frases de contacto del texto CTA."""
    t = raw
    # Quitar comentarios HTML dentro del texto
    t = re.sub(r"<!--\s*CTA-START\s*-->", "", t)
    t = re.sub(r"<!--\s*CTA-END\s*-->", "", t)
    # Números de teléfono (cualquier formato +51, 044, etc.)
    t = re.sub(r"\+\s*51\s*9\s*\d{2}\s*\d{3}\s*\d{3}", "", t)
    t = re.sub(r"\+\s*51\s*943\s*004\s*055", "", t)
    t = re.sub(r"044\s*366094", "", t)
    t = re.sub(r"\d{3}\s*\d{3}\s*\d{3}", "", t)  # 9 dígitos seguidos (Peru mobile)
    # Frases de contacto ES
    t = re.sub(r"Contacta\s+al\s+[\d\s—\-\.]+\.?", "", t, flags=re.I)
    t = re.sub(r"Contáctenos\s+al\s+[\d\s—\-\.]+\.?", "", t, flags=re.I)
    t = re.sub(r"Escríbanos\s+al\s+[\d\s—\-\.]+\.?", "", t, flags=re.I)
    t = re.sub(r"Solicite\s+su\s+cita\s+[^\.]+\.", "", t, flags=re.I)
    t = re.sub(r"llamando\s+al\s+[\d\s—\-\.]+\.?", "", t, flags=re.I)
    # EN
    t = re.sub(r"Contact\s+(us\s+at\s+)?[\d\s—\-\.]+\.?", "", t, flags=re.I)
    t = re.sub(r"To\s+coordinate\s+[^\.]*write\s+to\s+\[contact\]\.?", "", t, flags=re.I)
    t = re.sub(r"write\s+to\s+\[contact\]\.?", "", t, flags=re.I)
    t = re.sub(r"Request\s+your\s+[^\.]+calling\s+[\d\s—\-\.]+\.?", "", t, flags=re.I)
    t = re.sub(r"by\s+calling\s+[\d\s—\-\.]+\.?", "", t, flags=re.I)
    t = re.sub(r"schedule\s+your\s+technical\s+[^\.]+\.?", "", t, flags=re.I)
    # FR
    t = re.sub(r"Contactez-nous\s+au\s+[\d\s—\-\.]+\.?", "", t, flags=re.I)
    t = re.sub(r"Écrivez-nous\s+au\s+[\d\s—\-\.]+\.?", "", t, flags=re.I)
    t = re.sub(r"Pour\s+coordonner[^\.]*écrivez\s+à\s+\[contact\]\.?", "", t, flags=re.I)
    t = re.sub(r"écrivez\s+à\s+\[contact\]\.?", "", t, flags=re.I)
    t = re.sub(r"Écrivez-nous\s+au\s+[\d\s—\-\.]+\.?", "", t, flags=re.I)
    # Dirección
    t = re.sub(r"Calle\s+Cuba\s+241[^\.]*\.?", "", t, flags=re.I)
    # Restos: " — " suelto de números, "[contact]"
    t = re.sub(r"\s*—\s*\+\d[\d\s—\-]*", "", t)
    t = re.sub(r"\[contact\]", "", t, flags=re.I)
    t = re.sub(r"\.\s*\.", ".", t)
    t = " ".join(t.split()).strip()
    if t.endswith("."):
        pass
    elif t and not t.endswith("."):
        t = t.rstrip(" ,;—")
    return t or "Zoovet Travel — Asesoría técnica desde Trujillo, Perú."


def get_cta_text_and_old_block(html: str):
    """Encuentra el bloque CTA y extrae el texto. Retorna (texto_limpio, bloque_completo_a_reemplazar) o (None, None)."""
    # Patrón 1: <!-- CTA-START --> \n <p>...</p> \n <!-- CTA-END -->
    m1 = re.search(
        r"<!--\s*CTA-START\s*-->\s*<p>([\s\S]*?)</p>\s*<!--\s*CTA-END\s*-->",
        html,
        re.IGNORECASE,
    )
    if m1:
        raw_text = re.sub(r"<[^>]+>", "", m1.group(1))
        raw_text = raw_text.replace("&nbsp;", " ").replace("&ldquo;", '"').replace("&rdquo;", '"').replace("&rsquo;", "'")
        return clean_cta_text(raw_text), m1.group(0)

    # Patrón 2: <p><!-- CTA-START -->...<!-- CTA-END --></p>
    m2 = re.search(
        r"<p>\s*<!--\s*CTA-START\s*-->([\s\S]*?)<!--\s*CTA-END\s*-->\s*</p>",
        html,
        re.IGNORECASE,
    )
    if m2:
        raw_text = re.sub(r"<[^>]+>", "", m2.group(1))
        raw_text = raw_text.replace("&nbsp;", " ").replace("&ldquo;", '"').replace("&rdquo;", '"').replace("&rsquo;", "'")
        return clean_cta_text(raw_text), m2.group(0)

    # Patrón 3: último <p> antes de <footer> que contenga Zoovet o teléfono
    idx_footer = html.find("<footer")
    if idx_footer == -1:
        idx_footer = html.find("<Footer")
    if idx_footer != -1:
        before_footer = html[:idx_footer]
        matches = list(re.finditer(r"<p>([\s\S]*?)</p>", before_footer))
        if matches:
            last = matches[-1]
            last_content = last.group(1)
            if "Zoovet" in last_content or "+51" in last_content or "Contact" in last_content or "Contactez" in last_content or "Contáctenos" in last_content or "Contacter" in last_content:
                raw_text = re.sub(r"<[^>]+>", "", last_content)
                raw_text = raw_text.replace("&nbsp;", " ").replace("&ldquo;", '"').replace("&rdquo;", '"').replace("&rsquo;", "'")
                old_block = html[last.start() : idx_footer]
                return clean_cta_text(raw_text), old_block
    return None, None


def add_css_if_missing(html: str) -> str:
    if ".cta-contact" in html:
        return html
    # Insertar antes de </style>
    return re.sub(r"(\s*)(</style>)", r"\1" + CTA_CSS + r"\1\2", html, count=1)


def process_file(path: Path, lang: str) -> tuple[bool, bool]:
    """Procesa un archivo. Retorna (modificado, tenía_número_incorrecto)."""
    content = path.read_text(encoding="utf-8", errors="replace")
    had_wrong_number = "943 004 055" in content or "943004055" in content
    text, old_block = get_cta_text_and_old_block(content)
    if text is None or old_block is None:
        return False, had_wrong_number
    if lang == "es":
        new_block = cta_block_es(text)
    elif lang == "en":
        new_block = cta_block_en(text)
    else:
        new_block = cta_block_fr(text)
    content = content.replace(old_block, new_block, 1)
    content = add_css_if_missing(content)
    path.write_text(content, encoding="utf-8")
    return True, had_wrong_number


def main():
    files_lang = []
    for es_name in ES_BASES:
        base = es_name.replace(".html", "")
        files_lang.append((BASE / es_name, "es"))
        files_lang.append((BASE / (base + "-EN.html"), "en"))
        files_lang.append((BASE / (base + "-FR.html"), "fr"))
    modified = 0
    wrong_number_fixed = 0
    not_found = []
    for path, lang in files_lang:
        if not path.exists():
            not_found.append(path.name)
            continue
        ok, had_wrong = process_file(path, lang)
        if ok:
            modified += 1
            if had_wrong:
                wrong_number_fixed += 1
        else:
            not_found.append(path.name)
    print("ARCHIVOS MODIFICADOS:", modified)
    print("ARCHIVOS CON NÚMERO INCORRECTO CORREGIDO:", wrong_number_fixed)
    print("ARCHIVOS SIN CTA ENCONTRADO (revisar manual):", not_found if not_found else "Ninguno")


if __name__ == "__main__":
    main()
