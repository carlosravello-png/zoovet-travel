# -*- coding: utf-8 -*-
"""Auditoria HTML solo lectura. Salida: scripts/auditoria/. python scripts/auditoria_completa.py"""
from __future__ import annotations
import json, os, re, sys, unicodedata
from collections import defaultdict
from html.parser import HTMLParser
from typing import Any
from urllib.parse import unquote, urljoin, urlparse

TERMINOS_CATALOGO = (
    "ISO 11784/11785","ISO 11784","ISO 11785","IATA LAR","576/2013","Regulation (EU) 576/2013",
    "fit-to-fly","fit to fly","RFFIT","RNATT","FAVN","SENASICA","SENASA","MAPA","CFIA","APHIS","USDA","CDC",
    "DALRRD","DAERA","DEFRA","APHA","MPI","AQIS","GACC","SAG","CVI","TRACES","EORI","OIE","IATA","ISO",
    "microchip","cuarentena","quarantine","braquicéfalo","braquicefalo","brachycephalic","hipobaria","hypobaric",
    "serología","serologia","titulación","titulacion","zoosanitario","zoosanitary","certificado zoosanitario",
    "certificado sanitario","health certificate","rabia","rabies","APQA",
)

def norm_rel(path, root):
    return os.path.relpath(path, root).replace("\\", "/")

def norm_lang(raw):
    if not raw: return "es"
    c = raw.strip().split("-")[0].lower()
    return c if c in ("es","en","fr") else "es"

def classify(rel_posix):
    lower = rel_posix.lower()
    base = os.path.basename(lower)
    if lower.startswith("zoopedia/"): return "zoopedia"
    if lower.startswith("articles/"): return "articulo_cientifico"
    if any(m in base for m in ("bulldog_frances","viajarconpug","golden_labrador")): return "pagina_raza"
    if lower.startswith(("pet-travel-planner/","planificador-viaje-mascota/","planificateur-voyage-animal/")):
        return "pagina_servicio"
    if lower.startswith("articulos-interes/") and base.startswith("index"): return "pagina_servicio"
    sb = {"about.html","about-en.html","about-fr.html","cargo.html","cargo-en.html","cargo-fr.html",
        "kennels.html","kennels-en.html","favn-es.html","favn-en.html","favn-fr.html",
        "exportar-perro-requisitos.html","exportar-perro-requisitos-en.html","exportar-perro-requisitos-fr.html",
        "viajar-con-mi-mascota.html","voyager-avec-mon-animal.html","traveling-with-my-pet.html",
        "responsabilidad-veterinario.html","responsabilidad-veterinario-en.html","responsabilidad-veterinario-fr.html",
        "serologia-rabia-mascotas-peru.html","serologia-rabia-mascotas-peru-fr.html",
        "viajar-sin-favn-eeuu.html","viajar-sin-favn-eeuu-en.html","viajar-sin-favn-eeuu-fr.html",
        "index.html","index-en.html","index-fr.html"}
    if base in sb: return "pagina_servicio"
    cm = ("llevar_gato_estados_unidos","llevar_mascota_japon","requisitos_mascota_reino_unido",
        "viajar_mascotas_australia","zoovet_canada_exportacion","viaja-chile-argentina",
        "mexico-clasificacion-cdc","mexico-cdc-dog-rabies","mexique-classification-cdc","como_viajar_perro_espana")
    if lower.startswith("articulos-interes/") and any(m in base for m in cm): return "pagina_pais"
    return "otro"

def strip_tags_fragment(s):
    return re.sub(r"\s+"," ",re.sub(r"<[^>]+>"," ",s)).strip()

def inferir_palabra_clave(h1, titulo):
    base = (h1 or titulo or "").strip() or (titulo or "").strip()
    base = re.sub(r"\s*\|\s*Zoovet Travel.*$","",base,flags=re.I).strip()
    base = re.sub(r"\s+"," ",base)
    return base[:160] if len(base)>160 else base

def slug_tema(rel):
    rel = rel.replace("\\","/")
    parts = rel.split("/")
    stem = parts[-1].rsplit(".",1)[0] if "." in parts[-1] else parts[-1]
    stem = re.sub(r"-(EN|ES|FR|en|es|fr)$","",stem)
    stem = re.sub(r"_(EN|ES|FR)$","",stem,flags=re.I)
    stem = re.sub(r"-(ES|EN|FR)$","",stem,flags=re.I)
    d = "/".join(parts[:-1]) if len(parts)>1 else ""
    return f"{d}/{stem}".strip("/") if d else stem

def seccion_enlace(ruta):
    r = ruta.replace("\\","/").lower()
    for pref,name in (("zoopedia/","zoopedia"),("articulos-interes/","articulos_interes"),("articles/","articles"),
        ("pet-travel-planner/","pet_travel_planner"),("planificador-viaje-mascota/","planificador_viaje_mascota"),
        ("planificateur-voyage-animal/","planificateur_voyage_animal"),("glosario/","glosario"),
        ("servicios/","servicios"),("assets/","assets"),("images/","images")):
        if r.startswith(pref): return name
    return "raiz" if "/" not in r else "otro_interno"

def page_url(rel):
    return "https://zoovettravel.com/"+rel.replace("\\","/")

def resolver_href(cur_rel, href):
    h = href.strip()
    if not h: return None,"vacio"
    low = h.lower()
    if low.startswith("#") or low.startswith("javascript:"): return None,"fragmento_o_js"
    if low.startswith("mailto:") or low.startswith("tel:"): return None,"mailto_tel"
    if low.startswith("data:"): return None,"data"
    j = urljoin(page_url(cur_rel), h)
    p = urlparse(j)
    host = (p.netloc or "").lower()
    if host.startswith("www."): host = host[4:]
    if host and host != "zoovettravel.com": return None,"externo"
    path = unquote(p.path or "").lstrip("/")
    if not path: return None,"raiz_sitio"
    if path.endswith("/"): path += "index.html"
    return path,"interno"

def encontrar_terminos(texto):
    if not texto: return []
    tnorm = unicodedata.normalize("NFC", texto)
    tlower = tnorm.lower()
    out, seen = [], set()
    for term in sorted(set(TERMINOS_CATALOGO), key=len, reverse=True):
        if " " in term or "-" in term or "/" in term:
            if term.lower() not in tlower and not re.search(re.escape(term), tnorm, re.I): continue
        elif not re.search(r"(?<![A-Za-z0-9])"+re.escape(term)+r"(?![A-Za-z0-9])", tnorm, re.I): continue
        if term not in seen:
            seen.add(term); out.append(term)
    return sorted(out, key=lambda x:(-len(x), x.lower()))

def extraer_hrefs(html):
    return [m.group(2).strip() for m in re.finditer(r"<a\s[^>]*?\bhref\s*=\s*(['\"])(.*?)\1", html, re.I|re.S)]

def extraer_ld_json_raw(html):
    pat = r'<script[^>]*type\s*=\s*(["\'])application/ld\+json\1[^>]*>(.*?)</script>'
    return [m.group(2).strip() for m in re.finditer(pat, html, re.I|re.S)]

def tipos_schema_desde_obj(obj, bag):
    if isinstance(obj, dict):
        if "@type" in obj:
            t = obj["@type"]
            if isinstance(t, list): bag.extend(str(x) for x in t)
            else: bag.append(str(t))
        for v in obj.values(): tipos_schema_desde_obj(v, bag)
    elif isinstance(obj, list):
        for x in obj: tipos_schema_desde_obj(x, bag)

def analizar_json_ld(chunks):
    if not chunks: return True, [], None
    errs, tipos = [], []
    for i, raw in enumerate(chunks):
        try: data = json.loads(raw)
        except json.JSONDecodeError as e:
            errs.append("bloque[%s]: %s (col %s)"%(i,e.msg,e.colno)); continue
        tipos_schema_desde_obj(data, tipos)
    seen, uniq = set(), []
    for t in tipos:
        if t not in seen: seen.add(t); uniq.append(t)
    return (len(errs)==0), uniq, ("; ".join(errs) if errs else None)

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lang = ""; self._in_title=False; self._title_parts=[]
        self._h1_done=False; self._h1_parts=[]; self.h1_text=""
        self._h2_list=[]; self._h3_list=[]; self._h2_parts=None; self._h3_parts=None
        self.descripcion=""; self.canonical=""; self._stack=[]
    def handle_starttag(self, tag, attrs):
        ad = {k.lower():(v or "") for k,v in attrs}
        if tag=="html" and "lang" in ad: self.lang=ad["lang"].strip()
        if tag=="title": self._in_title=True; self._title_parts=[]
        if tag=="meta" and ad.get("name","").lower()=="description" and "content" in ad:
            self.descripcion=ad["content"].strip()
        if tag=="link":
            rel=" ".join(ad.get("rel","").lower().split())
            if rel=="canonical" and "href" in ad and not self.canonical: self.canonical=ad["href"].strip()
        if tag=="h1" and not self._h1_done: self._stack.append("h1"); self._h1_parts=[]
        elif tag=="h2": self._stack.append("h2"); self._h2_parts=[]
        elif tag=="h3": self._stack.append("h3"); self._h3_parts=[]
    def handle_endtag(self, tag):
        if tag=="title" and self._in_title: self._in_title=False
        if self._stack and self._stack[-1]==tag:
            self._stack.pop()
            if tag=="h1" and not self._h1_done:
                self.h1_text=strip_tags_fragment("".join(self._h1_parts)); self._h1_done=True
            elif tag=="h2" and self._h2_parts is not None:
                t=strip_tags_fragment("".join(self._h2_parts))
                if t: self._h2_list.append(t); self._h2_parts=None
            elif tag=="h3" and self._h3_parts is not None:
                t=strip_tags_fragment("".join(self._h3_parts))
                if t: self._h3_list.append(t); self._h3_parts=None
    def handle_data(self, data):
        if self._in_title: self._title_parts.append(data)
        if self._stack:
            c=self._stack[-1]
            if c=="h1" and not self._h1_done: self._h1_parts.append(data)
            elif c=="h2" and self._h2_parts is not None: self._h2_parts.append(data)
            elif c=="h3" and self._h3_parts is not None: self._h3_parts.append(data)

def extraer_pagina(html):
    p=PageParser()
    try: p.feed(html); p.close()
    except Exception: pass
    titulo = strip_tags_fragment("".join(p._title_parts)) if p._title_parts else ""
    h1 = p.h1_text or ""
    if not h1:
        m=re.search(r"<h1[^>]*>(.*?)</h1>",html,re.I|re.S)
        if m: h1=strip_tags_fragment(m.group(1))
    h2s=list(p._h2_list)
    if not h2s:
        for m in re.finditer(r"<h2[^>]*>(.*?)</h2>",html,re.I|re.S):
            t=strip_tags_fragment(m.group(1))
            if t: h2s.append(t)
    h3s=list(p._h3_list)
    if not h3s:
        for m in re.finditer(r"<h3[^>]*>(.*?)</h3>",html,re.I|re.S):
            t=strip_tags_fragment(m.group(1))
            if t: h3s.append(t)
    return {"lang":p.lang,"titulo":titulo,"h1":h1,"h2s":h2s,"h3s":h3s,"descripcion":p.descripcion,"canonical":p.canonical}

def prioridad_sin_schema(cat,n2,n3):
    if cat in ("zoopedia","articulo_cientifico"): return "alta"
    if cat in ("pagina_pais","pagina_raza") or (cat=="otro" and (n2+n3)>=8): return "media"
    return "baja"

def main():
    root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_dir=os.path.join(root,"scripts","auditoria")
    os.makedirs(out_dir, exist_ok=True)
    html_files=[]
    for dp,dns,fns in os.walk(root):
        if os.path.basename(dp)==".git": continue
        dns.sort()
        for name in sorted(fns):
            if not name.lower().endswith(".html"): continue
            rel=norm_rel(os.path.join(dp,name),root)
            if not rel.startswith(".git/"): html_files.append(rel)
    html_set=set(html_files)
    salientes, metas = {}, {}
    for rel in sorted(html_files):
        full=os.path.join(root,*rel.split("/"))
        try: html=open(full,"r",encoding="utf-8",errors="replace").read()
        except OSError: continue
        metas[rel]=extraer_pagina(html)
        tg=[]
        for href in extraer_hrefs(html):
            dest,_=resolver_href(rel,href)
            if dest and dest.lower().endswith(".html") and dest in html_set and dest!=rel: tg.append(dest)
        salientes[rel]=tg
    incoming=defaultdict(set)
    for src,tgts in salientes.items():
        for t in tgts: incoming[t].add(src)
    cats=("zoopedia","articulo_cientifico","pagina_raza","pagina_servicio","pagina_pais","otro")
    por={k:[] for k in cats}
    termino_freq=defaultdict(int); termino_paginas=defaultdict(set)
    for rel in sorted(html_files):
        full=os.path.join(root,*rel.split("/"))
        try: html=open(full,"r",encoding="utf-8",errors="replace").read()
        except OSError: continue
        meta=metas[rel]; cat=classify(rel); lang=norm_lang(meta["lang"])
        chunks=extraer_ld_json_raw(html)
        jpre=bool(chunks); jok, jtip, jerr = analizar_json_ld(chunks)
        jtip_out = (jtip if jtip else ["objeto_sin_@type_detectable"]) if jpre else "sin schema"
        txt="\n".join([meta["descripcion"] or ""]+meta["h2s"]+meta["h3s"])
        tp=encontrar_terminos(txt)
        for t in tp:
            termino_freq[t]+=1; termino_paginas[t].add(rel)
        sec=defaultdict(int); nint=0
        for href in extraer_hrefs(html):
            dest,tipo=resolver_href(rel,href)
            if dest is None: sec[tipo]+=1; continue
            if not dest.lower().endswith(".html"): sec["interno_no_html"]+=1; continue
            if dest not in html_set: sec["interno_fuera_repo"]+=1; continue
            nint+=1; sec[seccion_enlace(dest)]+=1
        fu={s for s in incoming.get(rel,set()) if s!=rel}
        por[cat].append({"ruta":rel,"categoria":cat,"lang":lang,"titulo":meta["titulo"],"h1":meta["h1"],
            "h2s":meta["h2s"],"h3s":meta["h3s"],"descripcion":meta["descripcion"],"canonical":meta["canonical"],
            "palabra_clave_inferida":inferir_palabra_clave(meta["h1"],meta["titulo"]),
            "json_ld_presente":jpre,"json_ld_tipos":jtip_out,"json_ld_valido":jok,"json_ld_error":jerr,
            "enlaces_internos_html_total":nint,
            "enlaces_por_seccion":dict(sorted(sec.items(),key=lambda x:(-x[1],x[0]))),
            "es_huerfana":len(fu)==0,"fuentes_enlace_interno_count":len(fu),"terminos_regulatorios":tp})
    for k in por: por[k].sort(key=lambda x:x["ruta"])
    aud={k:por[k] for k in cats}
    json.dump(aud,open(os.path.join(out_dir,"auditoria_completa.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=2)
    tl=[{"termino":t,"frecuencia_paginas":termino_freq[t],"paginas":sorted(termino_paginas[t])}
         for t in sorted(termino_freq,key=lambda x:(-termino_freq[x],x.lower()))]
    json.dump({"terminos":tl},open(os.path.join(out_dir,"terminos_tecnicos_frecuencia.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=2)
    ss=[]
    for cat,items in por.items():
        for it in items:
            if it["json_ld_presente"]: continue
            ss.append({"ruta":it["ruta"],"categoria":cat,"prioridad_sugerida":prioridad_sin_schema(cat,len(it["h2s"]),len(it["h3s"])),
                "titulo":it["titulo"],"lang":it["lang"]})
    ss.sort(key=lambda x:({"alta":0,"media":1,"baja":2}[x["prioridad_sugerida"]],x["ruta"]))
    json.dump({"paginas":ss,"total":len(ss)},open(os.path.join(out_dir,"paginas_sin_schema.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=2)
    hu=[x for c in por for x in por[c] if x["es_huerfana"]]; hu.sort(key=lambda x:(x["categoria"],x["ruta"]))
    json.dump({"paginas":[{"ruta":x["ruta"],"categoria":x["categoria"],"lang":x["lang"],"titulo":x["titulo"]} for x in hu],
        "total":len(hu)},open(os.path.join(out_dir,"paginas_huerfanas.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=2)
    temas=defaultdict(lambda:{"es":[],"en":[],"fr":[]})
    for rel in html_files:
        if rel not in metas: continue
        temas[slug_tema(rel)][norm_lang(metas[rel]["lang"])].append(rel)
    cob, inc = [], []
    for key in sorted(temas):
        L=temas[key]; has={x for x in ("es","en","fr") if L[x]}; comp=has=={"es","en","fr"}
        cob.append({"clave_tema":key,"es":L["es"],"en":L["en"],"fr":L["fr"],"idiomas_presentes":sorted(has),"cobertura_completa":comp})
        if not comp: inc.append({"clave_tema":key,"faltan_idiomas":sorted({"es","en","fr"}-has),"presentes":sorted(has)})
    json.dump({"temas":cob,"temas_cobertura_incompleta":inc,"total_temas":len(cob),"total_incompletos":len(inc)},
        open(os.path.join(out_dir,"cobertura_idiomas.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=2)
    tot_cat={c:len(por[c]) for c in cats}; tot_id=defaultdict(int); cs=sn=iv=0
    for items in por.values():
        for it in items:
            tot_id[it["lang"]]+=1
            if it["json_ld_presente"]:
                cs+=1
                if not it["json_ld_valido"]: iv+=1
            else: sn+=1
    top20=sorted(termino_freq.items(),key=lambda x:(-x[1],x[0].lower()))[:20]
    dens={}
    for cat,items in por.items():
        if not items: dens[cat]={"promedio_enlaces_internos_html":0.0,"total_enlaces_internos_html":0,"paginas":0}; continue
        tot=sum(x["enlaces_internos_html_total"] for x in items)
        dens[cat]={"promedio_enlaces_internos_html":round(tot/len(items),2),"total_enlaces_internos_html":tot,"paginas":len(items)}
    ds=sorted(dens.items(),key=lambda x:x[1]["promedio_enlaces_internos_html"])
    res={"total_paginas_por_categoria":tot_cat,"total_paginas_por_idioma":dict(sorted(tot_id.items())),
        "schema":{"paginas_con_json_ld":cs,"paginas_sin_json_ld":sn,"paginas_con_json_ld_invalido":iv},
        "paginas_huerfanas_total":len(hu),
        "top_20_terminos_tecnicos":[{"termino":t,"frecuencia_paginas":n} for t,n in top20],
        "gaps_cobertura_linguistica":{"total_temas_incompletos":len(inc),"muestra_max_50":inc[:50]},
        "densidad_enlaces_internos_html_por_categoria":dens,
        "categorias_mayor_densidad_enlaces":[{"categoria":c,**dens[c]} for c,_ in ds[-3:][::-1]],
        "categorias_menor_densidad_enlaces":[{"categoria":c,**dens[c]} for c,_ in ds[:3]],
        "inteligencia_estrategica":{"fortalezas":[
            "Vocabulario regulatorio repetido en zoopedia y serie tecnica: base para glosario y entidades.",
            "Estructura trilingue en muchas rutas: activo para internacionalizacion SEO."],
            "riesgos":["Huerfanas reducen descubrimiento interno.","Sin JSON-LD se pierden rich results.",
                "Temas con idiomas incompletos fragmentan senal de producto."],
            "oportunidades_prioritarias":["Glosario desde terminos_tecnicos_frecuencia.json.",
                "Enlaces hub -> huerfanas.","JSON-LD primero en zoopedia y articles."]}}
    json.dump(res,open(os.path.join(out_dir,"resumen_estrategico.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=2)
    print("OK",out_dir,"HTML",len(html_files),"huerfanas",len(hu))
    return 0

if __name__=="__main__": sys.exit(main())


