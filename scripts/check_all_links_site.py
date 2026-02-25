# Verifica todos los href a .html en el sitio (articulos-interes, articles, zoopedia, raíz)
import os
import re

BASE = os.path.join(os.path.dirname(__file__), "..")
SKIP_DIRS = {"node_modules", ".git"}

def resolve(from_path, href):
    if href.startswith("http://") or href.startswith("https://"):
        return None
    if href.startswith("#") or href.startswith("mailto:") or href.startswith("tel:"):
        return None
    if ".html" not in href:
        return None
    href_clean = href.split("#")[0].split("?")[0].strip()
    if not href_clean.endswith(".html"):
        return None
    from_dir = os.path.dirname(from_path)
    target = os.path.normpath(os.path.join(from_dir, href_clean))
    if not os.path.isabs(target):
        target = os.path.join(BASE, target.lstrip(os.sep))
    return target

existing = set()
for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
    for f in files:
        if f.endswith(".html"):
            full = os.path.join(root, f)
            try:
                rel = os.path.relpath(full, BASE)
            except ValueError:
                continue
            existing.add(os.path.normpath(full))
            existing.add(rel.replace("\\", "/"))

broken = []
checked = 0
for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
    for name in files:
        if not name.endswith(".html"):
            continue
        path = os.path.join(root, name)
        try:
            rel_path = os.path.relpath(path, BASE).replace("\\", "/")
        except ValueError:
            continue
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            text = f.read()
        for m in re.finditer(r'href=["\']([^"\']+)["\']', text):
            href = m.group(1).split("#")[0].split("?")[0].strip()
            target_full = resolve(path, href)
            if target_full is None:
                continue
            checked += 1
            if not os.path.isfile(target_full):
                broken.append((rel_path, href, target_full))
if broken:
    for from_f, href, target in broken:
        t_rel = os.path.relpath(target, BASE).replace("\\", "/") if os.path.exists(BASE) else target
        print("BROKEN:", from_f, "->", href, "| file:", t_rel)
    print("Total broken:", len(broken))
else:
    print("OK: No broken internal .html links in the site (checked", checked, "links).")
