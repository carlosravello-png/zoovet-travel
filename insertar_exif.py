"""
insertar_exif.py — Inserta metadatos EXIF en todas las imágenes WebP
Carpeta destino: 'seleccionar por ocr y cloudvision'

Campos:
  Artist          → Carlos Eduardo Ravello Joo (fotógrafo / arquitecto web)
  Copyright       → © 2026 Carlos Eduardo Ravello Joo / Zoovet Travel
  ImageDescription → Descripción semántica calibrada para OCR + Cloud Vision
  XPAuthor        → Carlos Eduardo Ravello Joo — ORCID 0009-0007-5631-7436
  XPComment       → Dra. Jessica Ysabel Camacho García, CMVP 12434
  XPKeywords      → Tags SEO / entidades

Uso: pip install piexif Pillow && python insertar_exif.py
"""

import piexif
import struct
from PIL import Image
from pathlib import Path

CARPETA = Path(__file__).parent / "seleccionar por ocr y cloudvision"

# ─── Identidades ────────────────────────────────────────────────────────────
ARTIST    = "Carlos Eduardo Ravello Joo"
COPYRIGHT = (
    "© 2026 Carlos Eduardo Ravello Joo / Zoovet Travel — "
    "zoovettravel.com | carlosravello.com — "
    "Todos los derechos reservados"
)
XP_AUTHOR = (
    "Carlos Eduardo Ravello Joo — ORCID 0009-0007-5631-7436 — "
    "carlosravello.com"
)
XP_COMMENT = (
    "Servicio veterinario especializado en viajes de mascotas internacionales. "
    "Dra. Jessica Ysabel Camacho García, Médico Veterinario, CMVP 12434 — "
    "jessica-camacho.com | WhatsApp: +51 979 620 402 | +51 922 083 707 — "
    "zoovettravel.com"
)

# ─── Descripciones por imagen ────────────────────────────────────────────────
DESCRIPCIONES = {
    "aeropuerto-jorge-chavez-piso3-salidas-internacionales.webp": (
        "¿Cómo viajar con tu mascota en avión desde Lima? "
        "Piso 3 Salidas del Aeropuerto Internacional Jorge Chávez: el punto de partida "
        "de cada viaje internacional que coordinamos. "
        "Zoovet Travel gestiona todo el proceso — zoovettravel.com | +51 979 620 402"
    ),
    "hall-salidas-internacionales-jorge-chavez-lima.webp": (
        "Hall de Salidas Internacionales, Aeropuerto Jorge Chávez, Lima. "
        "Viajar con mascota al extranjero requiere documentación, certificados SENASA "
        "y coordinación precisa en aeropuerto. Zoovet Travel lo hace por ti. "
        "zoovettravel.com | +51 979 620 402 | +51 922 083 707"
    ),
    "dra-jessica-camacho-cmvp12434-labrador-kennel-iata.webp": (
        "Dra. Jessica Ysabel Camacho García, Médico Veterinario CMVP 12434, "
        "especialista en viajes de mascotas internacionales, con Labrador Retriever "
        "y kennel IATA listo para vuelo. Tu perro viaja seguro con Zoovet Travel. "
        "jessica-camacho.com | +51 979 620 402 | zoovettravel.com"
    ),
    "dra-jessica-camacho-atencion-mascota-viaje-internacional.webp": (
        "Atención veterinaria con amor y expertise. "
        "Dra. Jessica Ysabel Camacho García, CMVP 12434, "
        "brinda confianza a cada mascota antes de su viaje internacional. "
        "Consultas y coordinación: +51 979 620 402 | jessica-camacho.com | zoovettravel.com"
    ),
    "auscultacion-estetoscopio-littmann-certificacion-vuelo-mascota.webp": (
        "Evaluación clínica con estetoscopio Littmann — el estándar más alto en medicina veterinaria. "
        "Dra. Jessica Ysabel Camacho García, CMVP 12434, certifica que tu mascota "
        "está en perfectas condiciones para volar. "
        "Reserva tu consulta: +51 979 620 402 | jessica-camacho.com | zoovettravel.com"
    ),
    "kennel-iata-transporte-aereo-mascota-vista-frontal.webp": (
        "Kennel de transporte aéreo homologado IATA, tamaño y ventilación correctos para tu mascota. "
        "Elegir el kennel adecuado es clave para que tu perro o gato viaje sin estrés. "
        "Zoovet Travel asesora y gestiona: zoovettravel.com | +51 979 620 402"
    ),
    "kennel-latam-cargo-etiqueta-destino-internacional.webp": (
        "Kennel listo para embarque con guía LATAM Cargo y etiquetas de destino internacional. "
        "Tu mascota viaja en bodega con toda la documentación en regla. "
        "Zoovet Travel coordina cada detalle con la aerolínea. "
        "zoovettravel.com | +51 979 620 402 | +51 922 083 707"
    ),
    "etiqueta-live-animals-iata-perro-gato-conejo-ave.webp": (
        "Etiqueta oficial 'Live Animals / Animales Vivos' IATA — "
        "señalización obligatoria en todo transporte aéreo de mascotas. "
        "Perro, gato, conejo, ave: Zoovet Travel gestiona el viaje de cualquier especie. "
        "zoovettravel.com | +51 979 620 402"
    ),
    "centro-aero-comercial-klm-latam-carga-lima-peru.webp": (
        "Centro Aero Comercial, terminal de carga Lima — acceso a operadores KLM y LATAM. "
        "Aquí se inicia el despacho oficial de mascotas en vuelos internacionales. "
        "Zoovet Travel conoce cada rincón del proceso. "
        "zoovettravel.com | +51 979 620 402 | +51 922 083 707"
    ),
    "certificado-veterinario-zoovet-travel-documentos-senasa.webp": (
        "Documentación completa para viajar con mascota al extranjero: "
        "certificado de salud, vacunación, SENASA, guía aérea — todo en orden. "
        "Preparado y firmado por Dra. Jessica Ysabel Camacho García, CMVP 12434. "
        "Sin papeleos de tu parte. zoovettravel.com | jessica-camacho.com | +51 979 620 402"
    ),
    "inspeccion-senasa-documentacion-mascota-aeropuerto-lima.webp": (
        "Inspección oficial SENASA en aeropuerto: el último filtro antes del vuelo. "
        "Zoovet Travel garantiza que toda la documentación pase la revisión sin contratiempos. "
        "Tu mascota cruza fronteras sin complicaciones. "
        "zoovettravel.com | +51 979 620 402"
    ),
    "tracking-latam-cargo-vuelo-mascota-tiempo-real.webp": (
        "Tracking en tiempo real LATAM Cargo: así monitoreamos el vuelo de tu mascota. "
        "Estado de tránsito, guía AWB y destino visibles en pantalla. "
        "Con Zoovet Travel sabes dónde está tu perro en todo momento. "
        "zoovettravel.com | +51 979 620 402 | +51 922 083 707"
    ),
    "kennel-embarque-bodega-avion-mascota-viva.webp": (
        "El momento que más importa: el kennel entra en la bodega del avión. "
        "Personal especializado, protocolo IATA, mascota segura. "
        "Zoovet Travel documenta y supervisa el embarque de principio a fin. "
        "zoovettravel.com | +51 979 620 402"
    ),
    "guia-awb-destino-madrid-espana-latam-cargo.webp": (
        "Guía aérea AWB con destino MAD — Madrid, España. "
        "Cada envío de mascota lleva su trazabilidad completa: número de vuelo, "
        "ruta y datos del animal. Zoovet Travel gestiona vuelos a toda Europa y el mundo. "
        "zoovettravel.com | +51 979 620 402"
    ),
    "kennel-pesaje-bascula-terminal-carga-jorge-chavez.webp": (
        "Pesaje oficial del kennel en terminal de carga Lima — paso obligatorio antes del embarque. "
        "El peso total (mascota + caja) define el costo del flete aéreo. "
        "Zoovet Travel te orienta en todo: zoovettravel.com | +51 979 620 402"
    ),
    "pitbull-kennel-iata-terminal-carga-aeropuerto-lima.webp": (
        "American Pitbull Terrier listo para volar — dentro de su kennel IATA en el aeropuerto. "
        "Razas con restricciones también viajan con los permisos correctos. "
        "Dra. Jessica Ysabel Camacho García, CMVP 12434, evalúa cada caso. "
        "Consulta: +51 979 620 402 | jessica-camacho.com | zoovettravel.com"
    ),
    "reunion-mascota-destino-madrid-aeropuerto-llegada.webp": (
        "Reunión emotiva con mascota a su llegada a Madrid — el final feliz de cada viaje. "
        "Labrador recibido en zona de carga aeroportuaria tras vuelo LIM-MAD. "
        "Zoovet Travel acompaña a tu mascota de puerta a puerta, Lima a Europa. "
        "zoovettravel.com | +51 979 620 402 | +51 922 083 707"
    ),
    "latam-cargo-tracking-lim-mad-delivered-dogs.webp": (
        "Tracking LATAM Cargo confirmando entrega completada: MAWB 145-11916693, LIM→MAD, estado Delivered. "
        "Commodity: DOGS, EXP ALIVE, 1 pieza, 53 kg. Las 4 etapas cumplidas: "
        "Received at LIM → In transit → Arrived at MAD → Delivered. "
        "Trazabilidad total garantizada por Zoovet Travel — zoovettravel.com | +51 979 620 402"
    ),
    "kennels-iata-multiples-sala-espera-gato-live-animals.webp": (
        "Tres kennels IATA en sala de espera aeroportuaria, etiquetas Live Animals visibles. "
        "Gato asomado en kennel central. Zoovet Travel gestiona el transporte aéreo de perros, gatos y más especies. "
        "Tu mascota no viaja sola — nosotros coordinamos todo. "
        "zoovettravel.com | +51 979 620 402 | +51 922 083 707"
    ),
    "gato-kennel-iata-clinica-veterinaria-transporte-aereo.webp": (
        "Gato felino dentro de kennel IATA homologado en punto de entrega veterinario. "
        "Cartel SALIDA al fondo — escena real previa al despacho en aeropuerto. "
        "Zoovet Travel también gestiona viajes internacionales de gatos. "
        "Dra. Jessica Ysabel Camacho García, CMVP 12434 — jessica-camacho.com | +51 979 620 402"
    ),
    "kennel-iata-awb-lax-live-animals-mostrador-aereo.webp": (
        "Kennel IATA con guía aérea AWB naranja: 145-9075 3003, destino LAX (Los Ángeles, EE.UU.). "
        "Stickers Live Animals visibles. Mascota en mostrador de carga previa al embarque. "
        "Zoovet Travel gestiona vuelos a EE.UU., Europa y todo el mundo. "
        "zoovettravel.com | +51 979 620 402 | +51 922 083 707"
    ),
    "cuatro-kennels-iata-exterior-operativo-multiple.webp": (
        "Cuatro kennels IATA alineados en exterior aeroportuario — operativo múltiple. "
        "Etiquetas naranjas de guía aérea en cada caja. Zoovet Travel maneja embarques simultáneos. "
        "Capacidad y experiencia para grupos y criadores profesionales. "
        "zoovettravel.com | +51 979 620 402"
    ),
    "comandante-piloto-poodle-cabina-avion-mascota.webp": (
        "Comandante de aerolínea sosteniendo un Toy Poodle chocolate en cabina de pilotaje. "
        "La confianza de la tripulación con la mascota refleja un traslado bien documentado y coordinado. "
        "Zoovet Travel garantiza que tu perro llegue en las mejores condiciones — en cabina o bodega. "
        "zoovettravel.com | jessica-camacho.com | +51 979 620 402"
    ),
    "documentacion-veterinaria-certificado-vacunacion-salud-zoove.webp": (
        "Set completo de documentación veterinaria para viaje internacional: "
        "Certificado de Vacunación, Certificado de Salud CMVD La Libertad, "
        "Certificado de Identificación Zoove con foto de la mascota. "
        "Todo preparado y firmado por Dra. Jessica Ysabel Camacho García, CMVP 12434. "
        "zoovettravel.com | jessica-camacho.com | +51 979 620 402"
    ),
    "pasaporte-europeo-mascota-espana-senasa-favn-certificado.webp": (
        "Documentación premium para entrada a la Unión Europea: FAVN Report (Kansas State University), "
        "Certificado Sanitario de Exportación SENASA Perú, Certificado CMVD, "
        "y Pasaporte para Animales de Compañía España ES01 — Unión Europea. "
        "Zoovet Travel tramita el pasaporte europeo y todos los requisitos de ingreso a España y la UE. "
        "Dra. Jessica Ysabel Camacho García, CMVP 12434 — zoovettravel.com | +51 979 620 402"
    ),
}
