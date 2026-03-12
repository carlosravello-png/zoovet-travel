# Renombra "Artículos de interés" por "Guías Prácticas..." en articulos-interes (solo texto, sin tocar URLs/canonical)
import os

ART = os.path.join(os.path.dirname(__file__), "..", "articulos-interes")

# Reemplazos por idioma (solo contenido visible y JSON-LD name, no href ni canonical)
REPLACES_ES = [
    (">Artículos de interés</a>", ">Guías Prácticas para Viajar y Exportar Mascotas Internacionalmente</a>"),
    ("Zoovet Travel · Artículos de interés", "Zoovet Travel · Guías Prácticas para Viajar y Exportar Mascotas Internacionalmente"),
    ("Zoovet Travel — Artículos de interés", "Zoovet Travel — Guías Prácticas para Viajar y Exportar Mascotas Internacionalmente"),
    ('"name":"Artículos de interés"', '"name":"Guías Prácticas para Viajar y Exportar Mascotas Internacionalmente"'),
]
REPLACES_EN = [
    (">Articles of Interest</a>", ">Practical Guides for International Pet Travel and Export</a>"),
    ("Zoovet Travel · Articles of Interest", "Zoovet Travel · Practical Guides for International Pet Travel and Export"),
    ("Zoovet Travel — Articles of Interest", "Zoovet Travel — Practical Guides for International Pet Travel and Export"),
    ('"name":"Articles of Interest"', '"name":"Practical Guides for International Pet Travel and Export"'),
]
REPLACES_FR = [
    (">Articles d'intérêt</a>", ">Guides pratiques pour voyager et exporter des animaux à l'international</a>"),
    ("Zoovet Travel · Articles d'intérêt", "Zoovet Travel · Guides pratiques pour voyager et exporter des animaux à l'international"),
    ("Zoovet Travel — Articles d'intérêt", "Zoovet Travel — Guides pratiques pour voyager et exporter des animaux à l'international"),
    ('"name":"Articles d\'intérêt"', '"name":"Guides pratiques pour voyager et exporter des animaux à l\'international"'),
]

def process(path, content):
    modified = False
    if "-EN.html" in path or path.endswith("index-en.html"):
        for old, new in REPLACES_EN:
            if old in content:
                content = content.replace(old, new)
                modified = True
    elif "-FR.html" in path or path.endswith("index-fr.html"):
        for old, new in REPLACES_FR:
            if old in content:
                content = content.replace(old, new)
                modified = True
    else:
        # ES (incl. index.html sin sufijo)
        for old, new in REPLACES_ES:
            if old in content:
                content = content.replace(old, new)
                modified = True
    return content, modified

count = 0
for name in sorted(os.listdir(ART)):
    if not name.endswith(".html"):
        continue
    path = os.path.join(ART, name)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    content, modified = process(path, content)
    if modified:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        count += 1
        print(name)
print("Total modified:", count)
