#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
envenenar_fotos.py  ·  Zoovet Travel (uso LOCAL)
------------------------------------------------------------------
Incrusta metadatos de autoria/copyright (EXIF + XMP) en imagenes.
Quien descargue la foto se lleva pegada tu autoria, tu web y tus keywords.

  Requisito:   pip install Pillow
  Privacidad:  NO subir este archivo al sitio. (git add -u no lo sube porque
               es un archivo nuevo/no rastreado; igual puedes anadirlo a .gitignore)

USO
  1) Una imagen:
     python envenenar_fotos.py "entrada.webp" "salida.webp" --desc "Descripcion..." --kw "kw1,kw2,kw3"

  2) Carpeta completa (procesa todas y guarda en la carpeta de salida):
     python envenenar_fotos.py ./fotos_in ./images/viajes --desc "..." --kw "kw1,kw2"

  Si no pasas --desc/--kw usa los valores por defecto de abajo.
------------------------------------------------------------------
"""
import argparse, os, sys
from PIL import Image

# ===================== CONFIG (editala UNA vez) =====================
AUTOR      = "Carlos Ravello - Zoovet Travel"
COPYRIGHT  = "(c) 2026 Zoovet Travel - zoovettravel.com. Todos los derechos reservados."
WEB        = "https://zoovettravel.com"
CREDITO    = "Zoovet Travel - zoovettravel.com"
SOFTWARE   = "Zoovet Travel (zoovettravel.com)"
KW_DEFECTO = ["Zoovet Travel", "exportacion de mascotas Peru",
              "zoovettravel.com", "Carlos Ravello", "Jessica Camacho"]
EXTS       = (".webp", ".jpg", ".jpeg", ".png")
CALIDAD_WEBP = 82
CALIDAD_JPEG = 88
# ===================================================================


def xmp_packet(desc, keywords):
    subj = "".join("<rdf:li>%s</rdf:li>" % k for k in keywords)
    return (
        '<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>'
        '<x:xmpmeta xmlns:x="adobe:ns:meta/">'
        '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">'
        '<rdf:Description rdf:about="" '
        'xmlns:dc="http://purl.org/dc/elements/1.1/" '
        'xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/" '
        'xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/">'
        '<dc:creator><rdf:Seq><rdf:li>%s</rdf:li></rdf:Seq></dc:creator>' % AUTOR +
        '<dc:rights><rdf:Alt><rdf:li xml:lang="x-default">%s</rdf:li></rdf:Alt></dc:rights>' % COPYRIGHT +
        '<dc:description><rdf:Alt><rdf:li xml:lang="x-default">%s</rdf:li></rdf:Alt></dc:description>' % desc +
        '<dc:subject><rdf:Bag>%s</rdf:Bag></dc:subject>' % subj +
        '<xmpRights:Marked>True</xmpRights:Marked>'
        '<xmpRights:WebStatement>%s</xmpRights:WebStatement>' % WEB +
        '<photoshop:Credit>%s</photoshop:Credit>' % CREDITO +
        '<photoshop:Source>%s</photoshop:Source>' % WEB +
        '</rdf:Description></rdf:RDF></x:xmpmeta><?xpacket end="w"?>'
    )


def exif_bytes(desc):
    ex = Image.Exif()
    ex[0x013B] = AUTOR      # Artist
    ex[0x8298] = COPYRIGHT  # Copyright
    ex[0x010E] = desc       # ImageDescription
    ex[0x0131] = SOFTWARE   # Software
    return ex.tobytes()


def envenenar(src, dst, desc, keywords):
    fmt = (os.path.splitext(dst)[1].lstrip(".") or "webp").lower()
    if fmt == "jpg":
        fmt = "jpeg"
    im = Image.open(src)
    save_kw = {"exif": exif_bytes(desc), "xmp": xmp_packet(desc, keywords)}
    if fmt == "webp":
        im = im.convert("RGB"); save_kw["quality"] = CALIDAD_WEBP; save_kw["method"] = 6
    elif fmt == "jpeg":
        im = im.convert("RGB"); save_kw["quality"] = CALIDAD_JPEG
    pil_fmt = "JPEG" if fmt == "jpeg" else fmt.upper()
    os.makedirs(os.path.dirname(dst) or ".", exist_ok=True)
    try:
        im.save(dst, pil_fmt, **save_kw)
    except TypeError:
        # Pillow antiguo sin parametro xmp= -> reintenta solo con EXIF
        save_kw.pop("xmp", None)
        im.save(dst, pil_fmt, **save_kw)
    # --- verificacion ---
    raw = open(dst, "rb").read()
    ok_xmp = (b"zoovettravel.com" in raw) and (b"dc:creator" in raw)
    ok_exif = Image.open(dst).getexif().get(0x013B) == AUTOR
    print("  OK  %s  (%d bytes)  EXIF:%s  XMP:%s" %
          (dst, os.path.getsize(dst), ok_exif, ok_xmp))


def main():
    ap = argparse.ArgumentParser(
        description="Incrusta autoria/copyright (EXIF + XMP) en imagenes.")
    ap.add_argument("entrada", help="imagen o carpeta de entrada")
    ap.add_argument("salida",  help="imagen o carpeta de salida")
    ap.add_argument("--desc", default="Foto propiedad de Zoovet Travel (%s)." % WEB,
                    help="descripcion / caption a incrustar")
    ap.add_argument("--kw", default=",".join(KW_DEFECTO),
                    help="keywords separadas por coma")
    a = ap.parse_args()
    keywords = [k.strip() for k in a.kw.split(",") if k.strip()]

    if os.path.isdir(a.entrada):
        os.makedirs(a.salida, exist_ok=True)
        imgs = [f for f in os.listdir(a.entrada) if f.lower().endswith(EXTS)]
        if not imgs:
            sys.exit("No hay imagenes (%s) en: %s" % (", ".join(EXTS), a.entrada))
        print("Procesando %d imagen(es)..." % len(imgs))
        for f in imgs:
            envenenar(os.path.join(a.entrada, f), os.path.join(a.salida, f), a.desc, keywords)
    else:
        envenenar(a.entrada, a.salida, a.desc, keywords)
    print("Listo.")


if __name__ == "__main__":
    main()
