# Actualiza el nombre de la sección Zoopedia solo dentro de la carpeta zoopedia/
# No toca index.html, index-en.html, index-fr.html (ya actualizados a mano)
import os

ZOOPEDIA = os.path.join(os.path.dirname(__file__), "..", "zoopedia")

REPLACES = [
    ("La Zoopedia de los Viajes", "La Zoopedia de la Exportación e Importación Internacional de Mascotas"),
    ("The Zoopedia of Travel", "The Zoopedia of International Pet Export and Import"),
    ("La Zoopédie des Voyages", "La Zoopédie de l'Exportation et de l'Importation Internationales des Animaux de Compagnie"),
]

for name in os.listdir(ZOOPEDIA):
    if not name.endswith(".html") or name.startswith("index"):
        continue
    path = os.path.join(ZOOPEDIA, name)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    changed = False
    for old, new in REPLACES:
        if old in content:
            content = content.replace(old, new)
            changed = True
    if changed:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(name)
print("Done.")
