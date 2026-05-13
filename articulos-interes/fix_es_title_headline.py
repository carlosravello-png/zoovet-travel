# -*- coding: utf-8 -*-
"""HOTFIX V6.1 — Fix ES: title and JSON-LD headline with '| Zoovet Travel' only ONCE. Remove {kw} placeholder."""
import json
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent

ES_KW = {
    "articulo_alimentacion_antes_durante_vuelo": "alimentación antes y durante el vuelo",
}

def normalize_title_once(t):
    """One ' | Zoovet Travel' at end."""
    t = (t.split("|")[0].strip() if "|" in t else t).strip()
    if t.endswith(" | Zoovet Travel"):
        return t
    return t + " | Zoovet Travel"


def fix_one_es(path):
    html = path.read_text(encoding="utf-8")
    soup = __import__("bs4").BeautifulSoup(html, "html.parser")

    title_el = soup.find("title")
    if title_el:
        new_title = normalize_title_once(title_el.get_text())
        title_el.string = new_title

    script = soup.find("script", type="application/ld+json")
    if script and script.string:
        try:
            data = json.loads(script.string)
            graph = data.get("@graph", [])
            for node in graph:
                if node.get("@type") == "Article" and "headline" in node:
                    h = node["headline"]
                    if "| Zoovet Travel" in h:
                        node["headline"] = normalize_title_once(h)
            script.string = json.dumps(data, ensure_ascii=False)
        except Exception:
            pass

    html = str(soup)
    slug = path.stem
    if slug in ES_KW:
        html = html.replace("{kw}", ES_KW[slug])
    path.write_text(html, encoding="utf-8")
    return True


def main():
    for basename in [
        "articulo_alimentacion_antes_durante_vuelo.html", "streesmascotas.html", "veterimariosntrujillo.html",
        "mascotabodega.html", "dondetramitarentrujillo.html", "mascotasinpapeles.html", "viaja-chile-argentina.html",
        "viajar_mascotas_australia_proceso_mas_estricto_editorial.html", "llevar_mascota_japon_proceso_que_pocos_intentan.html",
        "articulo_rechazo_aduana_mascota.html", "articulo_cuanto_tiempo_antes_viaje_mascota.html",
        "articulo_certificado_zoosanitario_senasa_trujillo.html", "gatosbodegaavion.html", "transportindeal.html",
        "viajarconpug.html", "prepararatuperro.html", "llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2.html",
        "viajeanimalgeriatrico.html", "requisitos_mascota_reino_unido_desde_latinoamerica_editorial_v2.html",
        "zoovet_canada_exportacion.html", "bulldog_frances.html", "como_viajar_perro_espana_desde_peru_requisitos_final_v2.html",
        "queeselmicrochipdondelotramitas.html", "rnattviajes.html", "articulo_golden_labrador_cabina_bodega.html",
        "articulo_vacuna_antirrabica_para_viajar.html",
    ]:
        p = BASE / basename
        if p.exists():
            fix_one_es(p)
            print("Fixed:", basename)
    print("ES title/headline and {kw} fix done.")


if __name__ == "__main__":
    main()
