import piexif
from PIL import Image
from pathlib import Path

ARTIST    = "Carlos Eduardo Ravello Joo"
COPYRIGHT = (
    "© 2026 Carlos Eduardo Ravello Joo / Zoovet Travel — "
    "zoovettravel.com | carlosravello.com — "
    "Todos los derechos reservados"
)
XP_AUTHOR  = "Carlos Eduardo Ravello Joo — ORCID 0009-0007-5631-7436 — carlosravello.com"
XP_COMMENT = (
    "Servicio veterinario especializado en viajes de mascotas internacionales. "
    "Dra. Jessica Ysabel Camacho García, Médico Veterinario, CMVP 12434 — "
    "jessica-camacho.com | WhatsApp: +51 979 620 402 | +51 922 083 707 — "
    "zoovettravel.com"
)
XP_KEYWORDS = (
    "zoovet travel; transporte mascotas; viaje internacional mascota; "
    "veterinaria aeropuerto Lima; SENASA certificado; kennel IATA; "
    "Jessica Camacho CMVP 12434; Carlos Ravello; mascota en avion Peru; "
    "pet travel Peru; vuelo internacional perro"
)

DESCRIPCIONES = {
    "exp-01.webp": (
        "West Highland Terrier blanco en kennel IATA con etiqueta LIVE ANIMAL "
        "y documentación de viaje encima, sala de aeropuerto internacional — "
        "exportación de mascotas desde Perú gestionada por Zoovet Travel. "
        "zoovettravel.com | +51 979 620 402"
    ),
    "exp-02.webp": (
        "Documentación completa para ingreso a España y la Unión Europea: "
        "Pasaporte Europeo para Animales de Compañía España ES01, FAVN Report "
        "y Certificado Veterinario con sello oficial ZOOVET TRUJILLO y firma CMVP. "
        "Zoovet Travel tramita toda la documentación. "
        "zoovettravel.com | +51 979 620 402"
    ),
    "exp-03.webp": (
        "Inspectora veterinaria revisando documentación oficial junto a kennel IATA "
        "con gato en sala de aeropuerto internacional al atardecer — "
        "protocolo SENASA de exportación de mascotas desde Perú. "
        "Zoovet Travel garantiza que cada expediente pase la inspección sin contratiempos. "
        "zoovettravel.com | +51 979 620 402"
    ),
    "historia-01.webp": (
        "Pareja de propietarios con Shih Tzu y Pug sosteniendo pasaportes de viaje "
        "frente al mural corporativo de Zoovet Travel Trujillo — "
        "caso real de exportación de dos mascotas al extranjero desde Perú. "
        "Dra. Jessica Ysabel Camacho García, CMVP 12434 — "
        "zoovettravel.com | +51 979 620 402"
    ),
    "historia-02.webp": (
        "Propietaria entre dos kennels IATA con sus perros en zona de pre-embarque "
        "aeropuerto peruano — exportación simultánea de dos mascotas al extranjero. "
        "Zoovet Travel coordina embarques múltiples con plena documentación. "
        "zoovettravel.com | +51 979 620 402 | +51 922 083 707"
    ),
    "historia-03.webp": (
        "Propietaria con Yorkshire Terrier en ropa roja a su llegada al destino internacional — "
        "caso real de mascota exportada desde Perú con protocolo completo Zoovet Travel. "
        "De Trujillo al mundo. "
        "zoovettravel.com | +51 979 620 402"
    ),
    "historia-04.webp": (
        "Familia reunida con Bichón Maltés en Aeropuerto de Barcelona-El Prat — "
        "llegada exitosa de mascota exportada desde Perú a España con protocolo UE completo. "
        "FAVN, SENASA, pasaporte europeo gestionados por Zoovet Travel. "
        "zoovettravel.com | +51 979 620 402"
    ),
    "historia-05.webp": (
        "Viajero europeo con Dachshund frente a camioneta 4x4 con casa rodante en Perú — "
        "caso real de mascota de viajero internacional con documentación de salida gestionada. "
        "Zoovet Travel atiende también a extranjeros viajando con mascotas desde Perú. "
        "zoovettravel.com | +51 979 620 402"
    ),
    "historia-06.webp": (
        "Propietaria con Shih Tzu en brazos dentro del avión, ventanilla con cielo al fondo — "
        "mascota viajando en cabina en vuelo internacional desde Perú. "
        "Zoovet Travel certifica y coordina viajes de mascotas en cabina y en bodega. "
        "zoovettravel.com | +51 979 620 402 | +51 922 083 707"
    ),
}

def utf16le(s):
    return s.encode("utf-16-le") + b"\x00\x00"

BASE = Path("/sessions/eager-wonderful-cerf/mnt/zoovet-travel/images")
CARPETAS = [BASE / "experiencia", BASE / "historias"]

for carpeta in CARPETAS:
    for ruta in sorted(carpeta.glob("*.webp")):
        desc = DESCRIPCIONES.get(ruta.name)
        if not desc:
            print(f"SKIP (sin descripción): {ruta.name}")
            continue
        img = Image.open(ruta)
        exif_dict = {"0th": {}, "Exif": {}, "GPS": {}, "1st": {}}
        exif_dict["0th"][piexif.ImageIFD.Artist]           = ARTIST.encode("utf-8")
        exif_dict["0th"][piexif.ImageIFD.Copyright]        = COPYRIGHT.encode("utf-8")
        exif_dict["0th"][piexif.ImageIFD.ImageDescription] = desc.encode("utf-8")
        exif_dict["0th"][piexif.ImageIFD.Software]         = "Zoovet Travel — zoovettravel.com".encode("utf-8")
        exif_dict["0th"][piexif.ImageIFD.XPAuthor]         = list(utf16le(XP_AUTHOR))
        exif_dict["0th"][piexif.ImageIFD.XPComment]        = list(utf16le(XP_COMMENT))
        exif_dict["0th"][piexif.ImageIFD.XPKeywords]       = list(utf16le(XP_KEYWORDS))
        exif_bytes = piexif.dump(exif_dict)
        img.save(ruta, format="WEBP", exif=exif_bytes, quality=82, method=6)
        size_kb = ruta.stat().st_size // 1024
        print(f"OK {ruta.parent.name}/{ruta.name} → {size_kb}KB")

print("\nListo.")
