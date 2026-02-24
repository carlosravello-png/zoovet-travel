# -*- coding: utf-8 -*-
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

for b in ES_BASES:
    p = BASE / b
    if not p.is_file():
        continue
    raw = p.read_text(encoding="utf-8")
    t = re.search(r"<title>([^<]+)</title>", raw)
    d = re.search(r'<meta name="description" content="([^"]*)"', raw)
    title = (t.group(1).split("|")[0].strip() if t else b)
    desc = (d.group(1)[:200] if d else "")
    print(b + "|" + title + "|" + desc)
