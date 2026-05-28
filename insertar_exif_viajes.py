"""
Inyección EXIF en images/viajes/ — Zoovet Travel
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
    "aeropuerto-barajas-madrid.webp": (
        "Joven con 2 kennels IATA en zona de check-in del Aeropuerto Internacional Jorge Chavez de Lima, lista para viajar a Madrid, España. Servicio de exportación de mascotas Zoovet Travel — zoovettravel.com",
        "kennel IATA; aeropuerto Lima; exportacion mascotas; viaje Peru España; check-in mascota; IATA Live Animal; Jorge Chavez"
    ),
    "alexander-usa-dallas.webp": (
        "Alexander y su Bulldog Francés en Dallas, Texas, USA, tras completar exitosamente el proceso de exportación de mascotas con Zoovet Travel desde Perú — zoovettravel.com",
        "Bulldog Frances; Dallas Texas; viaje mascota USA; exportacion perro; mascota en avion; pet travel Peru USA"
    ),
    "barcelona.webp": (
        "Familia reunida con su Bichón Maltés en el Aeropuerto de Barcelona-El Prat, España, tras el viaje internacional gestionado por Zoovet Travel — zoovettravel.com",
        "Bichon Maltes; aeropuerto Barcelona El Prat; reencuentro mascota España; viaje internacional mascota; exportacion Peru España"
    ),
    "cartlla-de-exportacion-completa-destino-europa.webp": (
        "Certificado sanitario SENASA para exportación de mascota a Europa, tramitado en consultorio Zoovet Travel, Lima Perú. Documentación veterinaria completa para Union Europea — zoovettravel.com",
        "certificado SENASA; exportacion Europa; documentacion veterinaria; Union Europea mascota; cartilla exportacion; SENASA Lima"
    ),
    "destino-chile.webp": (
        "Señora con su perro mestizo en consulta veterinaria previa al viaje a Chile. Tramitación de documentación para exportación de mascotas con Zoovet Travel, Lima Perú — zoovettravel.com",
        "viaje mascota Chile; exportacion Peru Chile; documentacion veterinaria; consulta veterinaria Lima; mascota en avion Chile"
    ),
    "destino-espana.webp": (
        "Pareja con su Bulldog Francés en sala de embarque del aeropuerto, destino España. Exportación de mascotas tramitada con Zoovet Travel, Lima Perú — zoovettravel.com",
        "Bulldog Frances; aeropuerto Lima; destino España; viaje mascota España; exportacion perro España; mascota cabina avion"
    ),
    "dra-jess-camacho-y-coco.webp": (
        "Dra. Jessica Ysabel Camacho García, Médico Veterinario CMVP 12434, especialista en viajes internacionales de mascotas, con Coco en Zoovet Travel, Lima Perú — jessica-camacho.com — zoovettravel.com",
        "Dra Jessica Camacho; CMVP 12434; veterinaria Lima; Zoovet Travel; especialista viaje mascotas; medico veterinario Peru"
    ),
    "espana.webp": (
        "Dueña viajando con su Shih Tzu en cabina del avión, destino España. Mascota autorizada para viajar en cabina tras cumplir requisitos sanitarios gestionados por Zoovet Travel — zoovettravel.com",
        "Shih Tzu avion; mascota en cabina; viaje España; pet in cabin; perro en avion; requisitos sanitarios España"
    ),
    "espana-2-perros.webp": (
        "Joven con sus 2 perros frente al Arco de Triunfo de Barcelona de noche, España. Viaje internacional de mascotas desde Perú gestionado por Zoovet Travel — zoovettravel.com",
        "Arco de Triunfo Barcelona; viaje mascotas España; 2 perros España; viaje internacional mascota; Zoovet Travel Barcelona"
    ),
    "estados-unidos-thor.webp": (
        "Certificado sanitario SENASA para exportación del perro Thor con destino a Estados Unidos, tramitado en Zoovet Travel, Lima Perú. Documentación completa para viaje internacional — zoovettravel.com",
        "SENASA; exportacion USA; viaje perro Estados Unidos; certificado sanitario; Thor mascota; documentacion veterinaria Lima"
    ),
    "gato-documentacion-lista-italia.webp": (
        "Dueño con gato y documentación SENASA completa para exportación a Italia: certificado sanitario y cartilla de vacunación. Servicio Zoovet Travel, Lima Perú — zoovettravel.com",
        "gato Italia; exportacion gato; SENASA gato; documentacion gato viaje; viaje internacional gato; certificado veterinario Italia"
    ),
    "humita-y-alma-destino-a-italia.webp": (
        "Humita y Alma listas para su viaje a Italia con su dueña. Exportación de mascotas a la Unión Europea tramitada por Zoovet Travel, Lima Perú — zoovettravel.com",
        "Maltipoo Italia; viaje mascota Italia; exportacion Union Europea; Humita Alma; mascota en avion Italia; Zoovet Travel"
    ),
    "madrid-espana.webp": (
        "Dueña con su Yorkshire Terrier ya instalados en Madrid, España, tras el exitoso proceso de exportación de mascotas desde Perú con Zoovet Travel — zoovettravel.com",
        "Yorkshire Terrier Madrid; vida con mascota España; exportacion Peru España; mascota en Madrid; Zoovet Travel Madrid"
    ),
    "milli-destino-canda-luego-francia.webp": (
        "Milli, Toy Poodle, recién llegada a Canadá en la sala de recogida de equipaje. Viaje de Perú a Canadá y luego Francia gestionado por Zoovet Travel — zoovettravel.com",
        "Toy Poodle Canada; viaje mascota Canada; exportacion Peru Canada; Milli Poodle; baggage claim mascota; viaje Canada Francia"
    ),
    "protocolo-listo-union-europea.webp": (
        "Pareja con su Shih Tzu y Pug con pasaportes y documentación veterinaria completa para la Unión Europea, en Zoovet Travel, Lima Perú — zoovettravel.com",
        "protocolo Union Europea; Shih Tzu Pug; pasaporte mascota; exportacion UE; documentacion mascotas Europa; Zoovet Travel Lima"
    ),
    "reencuentro-canada.webp": (
        "Emotivo reencuentro en Canadá: dueña abraza a su Border Collie tras el proceso de exportación de mascotas desde Perú gestionado por Zoovet Travel — zoovettravel.com",
        "reencuentro mascota Canada; Border Collie Canada; exportacion perro Canada; viaje mascota Canada; Zoovet Travel Canada"
    ),
    "reencuentro-en-espana.webp": (
        "Reencuentro familiar en España: madre e hija abrazan a su perro recién llegado desde Perú gracias a Zoovet Travel — zoovettravel.com",
        "reencuentro mascota España; familia con mascota España; exportacion Peru España; perro viaje España; Zoovet Travel España"
    ),
    "rocky-usa.webp": (
        "Rocky, Lhasa Apso, feliz en su nuevo hogar en Estados Unidos tras el proceso de exportación de mascotas desde Perú gestionado por Zoovet Travel — zoovettravel.com",
        "Lhasa Apso USA; Rocky mascota; viaje mascota Estados Unidos; exportacion Peru USA; perro en USA; Zoovet Travel USA"
    ),
    "sony-aeropuerto-de-toronto.webp": (
        "Sony, Poodle miniatura, pasando por seguridad del Aeropuerto Internacional de Toronto, Canadá. Viaje internacional de mascotas desde Perú gestionado por Zoovet Travel — zoovettravel.com",
        "Poodle Toronto; aeropuerto Toronto; seguridad aeropuerto mascota; Sony Poodle; viaje mascota Canada; pet airport security Toronto"
    ),
    "texas-usa.webp": (
        "Dueño con su Bullmastiff en la zona de carga del aeropuerto de Lima, listos para el vuelo de cargo a Texas, USA. Servicio de exportación de mascotas en bodega con Zoovet Travel — zoovettravel.com",
        "Bullmastiff cargo; exportacion Texas USA; mascota bodega avion; cargo mascotas Lima; viaje perro Texas; CERES aeropuerto Lima"
    ),
}

VIAJES_DIR = os.path.join(os.path.dirname(__file__), "images", "viajes")

def inject(filename, description, keywords):
    path = os.path.join(VIAJES_DIR, filename)
    img = Image.open(path)

    exif_dict = {"0th": {}, "Exif": {}, "GPS": {}, "1st": {}}

    exif_dict["0th"][piexif.ImageIFD.Artist]            = ARTIST.encode()
    exif_dict["0th"][piexif.ImageIFD.Copyright]         = COPYRIGHT.encode()
    exif_dict["0th"][piexif.ImageIFD.ImageDescription]  = description.encode()
    exif_dict["0th"][piexif.ImageIFD.XPAuthor]          = list(utf16le(XP_AUTHOR))
    exif_dict["0th"][piexif.ImageIFD.XPComment]         = list(utf16le(XP_COMMENT))
    exif_dict["0th"][piexif.ImageIFD.XPKeywords]        = list(utf16le(XP_KEYWORDS + "; " + keywords))

    exif_bytes = piexif.dump(exif_dict)
    img.save(path, "webp", exif=exif_bytes, quality=82, method=6)
    print(f"  ✓ {filename}")

print("Inyectando EXIF en images/viajes/ ...")
for fname, (desc, kw) in DESCRIPTIONS.items():
    inject(fname, desc, kw)
print("Done.")
