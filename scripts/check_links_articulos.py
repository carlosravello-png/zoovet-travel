# Verifica que todos los href a .html desde articulos-interes apunten a archivos existentes (evitar 404)
import os
import re

BASE = os.path.join(os.path.dirname(__file__), "..")
ART = os.path.join(BASE, "articulos-interes")

def resolve(from_path, href):
    if href.startswith("http://") or href.startswith("https://"):
        return None  # externo, no comprobar
    if href.startswith("#") or href.startswith("mailto:") or href.startswith("tel:"):
        return None
    from_dir = os.path.dirname(from_path)
    if href.startswith("../"):
        target = os.path.normpath(os.path.join(from_dir, href))
    else:
        target = os.path.normpath(os.path.join(from_dir, href))
    if not target.endswith(".html"):
        return None
    return os.path.join(BASE, target.lstrip(os.sep)) if not os.path.isabs(target) else target

existing = set()
for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d != "node_modules"]
    for f in files:
        if f.endswith(".html"):
            rel = os.path.relpath(os.path.join(root, f), BASE)
            existing.add(rel.replace("\\", "/"))

broken = []
for root, dirs, files in os.walk(ART):
    for name in files:
        if not name.endswith(".html"):
            continue
        path = os.path.join(root, name)
        rel_path = os.path.relpath(path, BASE).replace("\\", "/")
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()
        for m in re.finditer(r'href=["\']([^"\']+\.html)[^"\']*["\']', text):
            href = m.group(1).split("#")[0].split("?")[0]
            if "zoovettravel.com" in href or href.startswith("http"):
                continue
            target = resolve(path, href)
            if target is None:
                continue
            target_rel = os.path.relpath(target, BASE).replace("\\", "/")
            if target_rel not in existing:
                # puede ser que resolve devolvió ruta absoluta
                if os.path.isfile(target):
                    continue
                broken.append((rel_path, href, target_rel))
if broken:
    for from_f, href, target in broken:
        print("BROKEN:", from_f, "->", href, "| resolved:", target)
    print("Total broken:", len(broken))
else:
    print("OK: No broken internal .html links found in articulos-interes.")
