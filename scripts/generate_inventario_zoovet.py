# -*- coding: utf-8 -*-
from __future__ import annotations
import json, os, re, sys
from html.parser import HTMLParser
from typing import Any

def norm_rel(path, root):
    return os.path.relpath(path, root).replace("\\", "/")

def norm_lang(raw):
    if not raw: return "es"
    code = raw.strip().split("-")[0].lower()
    return code if code in ("es","en","fr") else "es"

def classify(rel_posix):
    lower = rel_posix.lower()
    base = os.path.basename(lower)
    if lower.startswith("zoopedia/"): return "termino_zoopedia"
    if lower.startswith("articles/"): return "articulo_cientifico"
    if any(m in base for m in ("bulldog_frances","viajarconpug","golden_labrador")): return "pagina_raza"
    if lower.startswith("pet-travel-planner/") or lower.startswith("planificador-viaje-mascota/") or lower.startswith("planificateur-voyage-animal/"): return "pagina_servicio"
    if lower.startswith("articulos-interes/") and base.startswith("index"): return "pagina_servicio"
    service_bases = {"about.html","about-en.html","about-fr.html","cargo.html","cargo-en.html","cargo-fr.html",
        "kennels.html","kennels-en.html","favn-es.html","favn-en.html","favn-fr.html","exportar-perro-requisitos.html",
        "exportar-perro-requisitos-en.html","exportar-perro-requisitos-fr.html","viajar-con-mi-mascota.html",
        "voyager-avec-mon-animal.html","traveling-with-my-pet.html","responsabilidad-veterinario.html",
        "responsabilidad-veterinario-en.html","responsabilidad-veterinario-fr.html","serologia-rabia-mascotas-peru.html",
        "serologia-rabia-mascotas-peru-fr.html","viajar-sin-favn-eeuu.html","viajar-sin-favn-eeuu-en.html",
        "viajar-sin-favn-eeuu-fr.html","index.html","index-en.html","index-fr.html"}
    if base in service_bases: return "pagina_servicio"
    country_markers = ("llevar_gato_estados_unidos","llevar_mascota_japon","requisitos_mascota_reino_unido",
        "viajar_mascotas_australia","zoovet_canada_exportacion","viaja-chile-argentina","mexico-clasificacion-cdc",
        "mexico-cdc-dog-rabies","mexique-classification-cdc","como_viajar_perro_espana")
    if lower.startswith("articulos-interes/") and any(m in base for m in country_markers): return "pagina_pais"
    return "otro"

def strip_tags_fragment(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s)).strip()

class HtmlMetaExtractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lang = ""
        self._in_title = False
        self._title_parts = []
        self._h1_done = False
        self._h1_parts = []
        self.h1_text = ""
        self._h2_list = []
        self._h2_parts = None
        self.descripcion = ""
        self.canonical = ""
        self._stack = []
    def handle_starttag(self, tag, attrs):
        ad = {k.lower(): (v or "") for k, v in attrs}
        if tag == "html" and "lang" in ad: self.lang = ad["lang"].strip()
        if tag == "title":
            self._in_title = True
            self._title_parts = []
        if tag == "meta":
            if ad.get("name","").lower()=="description" and "content" in ad:
                self.descripcion = ad["content"].strip()
        if tag == "link":
            rel = " ".join(ad.get("rel","").lower().split())
            if rel == "canonical" and "href" in ad and not self.canonical:
                self.canonical = ad["href"].strip()
        if tag == "h1" and not self._h1_done:
            self._stack.append("h1"); self._h1_parts = []
        elif tag == "h2":
            self._stack.append("h2"); self._h2_parts = []
    def handle_endtag(self, tag):
        if tag == "title" and self._in_title: self._in_title = False
        if self._stack and self._stack[-1] == tag:
            self._stack.pop()
            if tag == "h1" and not self._h1_done:
                self.h1_text = strip_tags_fragment("".join(self._h1_parts)); self._h1_done = True
            elif tag == "h2" and self._h2_parts is not None:
                t = strip_tags_fragment("".join(self._h2_parts))
                if t: self._h2_list.append(t)
                self._h2_parts = None
    def handle_data(self, data):
        if self._in_title: self._title_parts.append(data)
        if self._stack:
            cur = self._stack[-1]
            if cur == "h1" and not self._h1_done: self._h1_parts.append(data)
            elif cur == "h2" and self._h2_parts is not None: self._h2_parts.append(data)

def extract_fields(html):
    p = HtmlMetaExtractor()
    try: p.feed(html); p.close()
    except Exception: pass
    titulo = strip_tags_fragment("".join(p._title_parts)) if p._title_parts else ""
    h1 = p.h1_text
    if not h1:
        m = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.I|re.S)
        if m: h1 = strip_tags_fragment(m.group(1))
    h2s = list(p._h2_list)
    if not h2s:
        for m in re.finditer(r"<h2[^>]*>(.*?)</h2>", html, re.I|re.S):
            t = strip_tags_fragment(m.group(1))
            if t: h2s.append(t)
    return {"lang":p.lang,"titulo":titulo,"h1":h1,"h2s":h2s,"descripcion":p.descripcion,"canonical":p.canonical}

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_path = os.path.join(root, "inventario_zoovet.json")
    categories = ("termino_zoopedia","pagina_pais","pagina_raza","articulo_cientifico","pagina_servicio","otro")
    langs = ("es","en","fr")
    data = {c:{lng:[] for lng in langs} for c in categories}
    data["resumen"] = {"total_archivos":0,"por_categoria":{c:0 for c in categories},"por_idioma":{lng:0 for lng in langs}}
    total = 0
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames.sort()
        for name in sorted(filenames):
            if not name.lower().endswith(".html"): continue
            full = os.path.join(dirpath, name)
            rel = norm_rel(full, root)
            try:
                with open(full,"r",encoding="utf-8",errors="replace") as f: raw = f.read()
            except OSError: continue
            meta = extract_fields(raw)
            lng = norm_lang(meta["lang"])
            cat = classify(rel)
            data[cat][lng].append({"ruta":rel,"titulo":meta["titulo"],"h1":meta["h1"],"h2s":meta["h2s"],
                "descripcion":meta["descripcion"],"canonical":meta["canonical"]})
            total += 1
            data["resumen"]["por_categoria"][cat] += 1
            data["resumen"]["por_idioma"][lng] += 1
    data["resumen"]["total_archivos"] = total
    with open(out_path,"w",encoding="utf-8") as out: json.dump(data,out,ensure_ascii=False,indent=2)
    print("OK:", total, "->", out_path)
    return 0
if __name__ == "__main__": sys.exit(main())

