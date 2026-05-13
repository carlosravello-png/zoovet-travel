# -*- coding: utf-8 -*-
import os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EX = frozenset({"original_index.html","indexnow-submit.html","google65c09db8e18af7da.html"})
OFF = 'd="M17.472'
GREEN = re.compile(r"\.whatsapp-float\s*\{[^}]*background\s*:\s*#25d366", re.I|re.S)

def norm(p):
    return os.path.relpath(p, ROOT).replace("\\","/")

def skip(rel):
    if rel.startswith(".git/"): return True
    if os.path.basename(rel) in EX: return True
    return "PREVIEW" in rel.upper()

def styles(html):
    return [m.group(1) for m in re.finditer(r"<style[^>]*>(.*?)</style>", html, re.I|re.S)]

def wf_style(html):
    return any(".whatsapp-float" in b for b in styles(html))

def body(html):
    m = re.search(r"<body[^>]*>", html, re.I)
    return html[m.end():] if m else html

def lineno(h, pos):
    return h.count("\n",0,pos)+1

def anchors(b):
    o = []
    for m in re.finditer(r"<a\s[^>]{0,8000}?>", b, re.I|re.S):
        t = m.group(0)
        if "whatsapp-float" not in t: continue
        cm = re.search(r"class\s*=\s*([\'\"])(.*?)\1", t, re.I|re.S)
        if cm and "whatsapp-float" in cm.group(2):
            o.append((lineno(b,m.start()), m.start()))
    return o

def inner(b, st):
    m = re.match(r"<a[^>]*>", b[st:], re.I|re.S)
    if not m: return ""
    i0 = st + m.end()
    dep, j, n = 1, i0, len(b)
    while j < n:
        if b[j:j+2].lower()=="<a" and (j+2>=n or b[j+2] in " \t\n>/"):
            dep += 1; j += 2; continue
        if b[j:j+4].lower()=="</a>":
            dep -= 1
            if dep==0: return b[i0:j]
            j += 4; continue
        j += 1
    return ""

def main():
    rows = []
    for dp, dns, fns in os.walk(ROOT):
        if ".git" in dp.replace("\\","/").split("/"): continue
        dns.sort()
        for fn in sorted(fns):
            if not fn.lower().endswith(".html"): continue
            rel = norm(os.path.join(dp,fn))
            if skip(rel): continue
            h = open(os.path.join(ROOT,*rel.split("/")), encoding="utf-8", errors="replace").read()
            bd = body(h)
            ans = anchors(bd)
            la = ans[0][0] if ans else None
            st = ans[0][1] if ans else None
            inn = inner(bd, st) if st is not None else ""
            svg = bool(re.search(r"<svg\b", inn, re.I))
            logo = OFF in inn
            grn = bool(GREEN.search(h))
            wfs = wf_style(h)
            has = "whatsapp-float" in h
            if ans and svg and logo: g=1
            elif ans and grn and not logo: g=2
            elif wfs and not ans: g=3
            elif not has: g=4
            elif ans: g=2
            elif wfs: g=3
            else: g=4
            rows.append((g,rel,la,svg,logo))
    for g in (1,2,3,4):
        p = sorted([r for r in rows if r[0]==g], key=lambda x:x[1])
        print("\n=== GRUPO %s (%s) ==="%(g,len(p)))
        for _,ruta,la,sv,lg in p:
            print("%s\tlinea_a=%s\tsvg=%s\tpath_M17.472=%s"%(ruta, la if la else chr(8212), "si" if sv else "no", "si" if lg else "no"))
    print("\nTOTAL=%s"%len(rows))
if __name__=="__main__": sys.exit(main())
