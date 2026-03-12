# Renombra "Artículos Científicos sobre Transporte y Exportación Internacional de Mascotas"
# a "Artículos Científicos en Medicina Veterinaria Aplicada al Transporte Internacional de Mascotas"
# y equivalentes EN/FR en todo el sitio.

import os
import re

BASE = os.path.join(os.path.dirname(__file__), "..")

# Pares (antiguo, nuevo) para reemplazo en todos los HTML
REPLACES = [
    # ES - título largo y corto
    (
        "Artículos Científicos sobre Transporte y Exportación Internacional de Mascotas",
        "Artículos Científicos en Medicina Veterinaria Aplicada al Transporte Internacional de Mascotas",
    ),
    (
        "Zoovet Artículos Científicos",
        "Artículos Científicos en Medicina Veterinaria Aplicada al Transporte Internacional de Mascotas",
    ),
    (
        "Artículos Científicos",
        "Artículos Científicos en Medicina Veterinaria Aplicada al Transporte Internacional de Mascotas",
    ),
    (
        "Artículos científicos",
        "Artículos Científicos en Medicina Veterinaria Aplicada al Transporte Internacional de Mascotas",
    ),
    (
        "Volver a Artículos Científicos",
        "Volver a Artículos Científicos en Medicina Veterinaria Aplicada al Transporte Internacional de Mascotas",
    ),
    # EN
    (
        "Scientific Articles on International Pet Transport and Export",
        "Scientific Articles in Applied Veterinary Medicine for International Pet Transport",
    ),
    (
        "Zoovet Scientific Articles",
        "Scientific Articles in Applied Veterinary Medicine for International Pet Transport",
    ),
    (
        "Scientific Articles",
        "Scientific Articles in Applied Veterinary Medicine for International Pet Transport",
    ),
    (
        "Back to Scientific Articles",
        "Back to Scientific Articles in Applied Veterinary Medicine for International Pet Transport",
    ),
    # FR (orden: primero el título largo, luego los cortos)
    (
        "Articles scientifiques sur le transport et l'exportation internationale d'animaux de compagnie",
        "Articles scientifiques en médecine vétérinaire appliquée au transport international d'animaux de compagnie",
    ),
    (
        "Zoovet Articles Scientifiques",
        "Articles scientifiques en médecine vétérinaire appliquée au transport international d'animaux de compagnie",
    ),
    (
        "Articles Scientifiques",
        "Articles scientifiques en médecine vétérinaire appliquée au transport international d'animaux de compagnie",
    ),
    (
        "Articles scientifiques",
        "Articles scientifiques en médecine vétérinaire appliquée au transport international d'animaux de compagnie",
    ),
]

# En títulos de pestaña/meta dejamos el nombre corto (no reemplazar en <title>, og:title, twitter:title)

# En toda la web se usa el nombre largo. Los títulos de articles/index*.html se actualizaron manualmente.
SKIP_IN_TITLE = True  # si True, no reemplazamos en <title>, og:title, twitter:title (ya actualizados)

def should_skip_line(line, path):
    if not SKIP_IN_TITLE:
        return False
    lower = line.lower()
    # No reemplazar dentro de <title>, property="og:title", name="twitter:title"
    if "<title>" in line or "</title>" in line:
        return True
    if 'property="og:title"' in line or "property='og:title'" in line:
        return True
    if 'name="twitter:title"' in line or "name='twitter:title'" in line:
        return True
    return False

def process_file(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        print("Skip (read):", path, e)
        return 0
    original = content
    lines = content.split("\n")
    new_lines = []
    for i, line in enumerate(lines):
        if should_skip_line(line, path):
            new_lines.append(line)
            continue
        new_line = line
        for old, new in REPLACES:
            if old in new_line:
                new_line = new_line.replace(old, new)
        new_lines.append(new_line)
    new_content = "\n".join(new_lines)
    if new_content != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        return 1
    return 0

count = 0
for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in ("node_modules", ".git")]
    for name in files:
        if not name.endswith(".html"):
            continue
        path = os.path.join(root, name)
        if process_file(path):
            count += 1
            print(os.path.relpath(path, BASE))

# ARTICLE-TEMPLATE.md
tmpl = os.path.join(BASE, "articles", "ARTICLE-TEMPLATE.md")
if os.path.isfile(tmpl):
    with open(tmpl, "r", encoding="utf-8") as f:
        c = f.read()
    for old, new in REPLACES:
        if old in c:
            c = c.replace(old, new)
            count += 1
            print(tmpl)
            break
    with open(tmpl, "w", encoding="utf-8") as f:
        f.write(c)

print("Total files updated:", count)
