# Reemplaza hero-tag "Artículo de interés" por "Guía práctica" (y EN/FR) en articulos-interes
import os

ART = os.path.join(os.path.dirname(__file__), "..", "articulos-interes")

REPLACES = [
    ("Artículo de interés — medicina de viaje y exportación internacional", "Guía práctica — medicina de viaje y exportación internacional"),
    ("Article of interest — travel medicine and international export", "Practical guide — travel medicine and international export"),
    ("Article d'intérêt — médecine du voyage et exportation internationale", "Guide pratique — médecine du voyage et exportation internationale"),
]

count = 0
for name in os.listdir(ART):
    if not name.endswith(".html") or name.startswith("index"):
        continue
    path = os.path.join(ART, name)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    for old, new in REPLACES:
        if old in content:
            content = content.replace(old, new)
            count += 1
            print(name)
            break
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
print("Total files updated:", count)
