"""
Inyección EXIF en articles/images/ — Zoovet Travel
Autor: Carlos Eduardo Ravello Joo
"""

import os
import piexif
from PIL import Image

ARTIST    = "Carlos Eduardo Ravello Joo"
COPYRIGHT = "© 2026 Carlos Eduardo Ravello Joo / Zoovet Travel — zoovettravel.com | carlosravello.com — Todos los derechos reservados"
XP_AUTHOR  = "Carlos Eduardo Ravello Joo — ORCID 0009-0007-5631-7436 — carlosravello.com"
XP_COMMENT = "Servicio veterinario especializado en viajes de mascotas internacionales. Dra. Jessica Ysabel Camacho García, Médico Veterinario, CMVP 12434 — jessica-camacho.com | WhatsApp: +51 979 620 402 | +51 922 083 707 — zoovettravel.com"
XP_KEYWORDS = "zoovet travel; transporte mascotas; viaje internacional mascota; veterinaria aeropuerto Lima; SENASA certificado; kennel IATA; Jessica Camacho CMVP 12434; Carlos Ravello; mascota en avion Peru; pet travel Peru; vuelo internacional perro"

def utf16le(s):
    return s.encode("utf-16-le") + b"\x00\x00"

DESCRIPTIONS = {
    "Jessica-articulo-cientifico.webp": (
        "Dra. Jessica Ysabel Camacho García, Médico Veterinario CMVP 12434, aplicando vacuna antirrábica con jeringa y guantes en clínica Zoovet Travel, Lima Perú. Especialista en medicina veterinaria preventiva y viajes internacionales de mascotas — jessica-camacho.com — zoovettravel.com",
        "Dra Jessica Camacho; CMVP 12434; vacuna antirrabica; veterinaria Lima; vacunacion canina; medicina veterinaria preventiva; Zoovet Travel; vacuna viaje mascota"
    ),
    "Documento-articulo-cientifico.webp": (
        "Veterinary Health Certificate — International Movement Regulations. Certificado sanitario internacional para exportación de mascotas. Documentación veterinaria oficial para viajes internacionales con animales — zoovettravel.com",
        "veterinary health certificate; certificado sanitario internacional; exportacion mascotas; documentacion veterinaria; international pet travel; movimiento internacional animales"
    ),
    "Microscopio-lab-articulo-cientifico.webp": (
        "Laboratorio de serología veterinaria con microscopio óptico, rack de tubos de muestras y pipeta automática. Análisis FAVN (Fluorescent Antibody Virus Neutralization) para titulación de anticuerpos antirrábicos en mascotas — zoovettravel.com",
        "laboratorio serologia; FAVN test; titulacion anticuerpos; vacuna antirrabica laboratorio; microscopio veterinario; analisis FAVN Peru; serologia canina viaje"
    ),
    "grafica-microscopica-vacuna-articulo-cientifico.webp": (
        "Ilustración científica 3D de respuesta inmunológica: células dendríticas y linfocitos activados en tejido muscular tras administración de vacuna antirrábica. Mecanismo de acción inmune post-vacunal en caninos — zoovettravel.com",
        "respuesta inmune vacuna; celulas dendriticas; linfocitos activados; inmunologia veterinaria; mecanismo vacuna antirrabica; respuesta inmunologica canina; anticuerpos antirrabicos"
    ),
}

ARTICLES_DIR = os.path.join(os.path.dirname(__file__), "articles", "images")

def inject(filename, description, keywords):
    path = os.path.join(ARTICLES_DIR, filename)
    img = Image.open(path)

    exif_dict = {"0th": {}, "Exif": {}, "GPS": {}, "1st": {}}

    exif_dict["0th"][piexif.ImageIFD.Artist]           = ARTIST.encode()
    exif_dict["0th"][piexif.ImageIFD.Copyright]        = COPYRIGHT.encode()
    exif_dict["0th"][piexif.ImageIFD.ImageDescription] = description.encode()
    exif_dict["0th"][piexif.ImageIFD.XPAuthor]         = list(utf16le(XP_AUTHOR))
    exif_dict["0th"][piexif.ImageIFD.XPComment]        = list(utf16le(XP_COMMENT))
    exif_dict["0th"][piexif.ImageIFD.XPKeywords]       = list(utf16le(XP_KEYWORDS + "; " + keywords))

    exif_bytes = piexif.dump(exif_dict)
    img.save(path, "webp", exif=exif_bytes, quality=85, method=6)
    print(f"  ✓ {filename}")

print("Inyectando EXIF en articles/images/ ...")
for fname, (desc, kw) in DESCRIPTIONS.items():
    inject(fname, desc, kw)
print("Done.")
