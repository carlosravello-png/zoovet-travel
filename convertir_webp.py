"""
convertir_webp.py — Convierte imágenes a WebP optimizado
Uso: python convertir_webp.py
Convierte JPEG/JPG/JFIF/PNG en la carpeta 'seleccionar por ocr y cloudvision'
a WebP con calidad 78, máx 1920px, y elimina los originales.
"""

from PIL import Image
from pathlib import Path
import os

CARPETA = Path(__file__).parent / "seleccionar por ocr y cloudvision"
CALIDAD  = 60       # suficiente para OCR + Cloud Vision
MAX_PX   = 1440     # lado mayor máximo
EXTS     = {".jpeg", ".jpg", ".jfif", ".png", ".webp"}

def convertir(src: Path) -> None:
    img = Image.open(src).convert("RGB")

    # Redimensionar si supera MAX_PX en cualquier lado
    w, h = img.size
    if max(w, h) > MAX_PX:
        factor = MAX_PX / max(w, h)
        img = img.resize((int(w * factor), int(h * factor)), Image.LANCZOS)

    orig_kb = src.stat().st_size / 1024
    dst = src.with_suffix(".webp")

    # Si src ya es webp, guardar en temporal y reemplazar
    if src.suffix.lower() == ".webp":
        tmp = src.with_name(src.stem + "_tmp.webp")
        img.save(tmp, "WEBP", quality=CALIDAD, method=6)
        src.unlink()
        tmp.rename(dst)
    else:
        img.save(dst, "WEBP", quality=CALIDAD, method=6)
        src.unlink()

    new_kb  = dst.stat().st_size / 1024
    ahorro  = 100 - (new_kb / orig_kb * 100)
    flag    = " ⚠" if new_kb > 70 else ""
    print(f"  {src.name}")
    print(f"    {orig_kb:.0f} KB  →  {new_kb:.0f} KB  ({ahorro:.0f}% menos){flag}\n")

def main():
    archivos = [f for f in CARPETA.iterdir() if f.suffix.lower() in EXTS]
    if not archivos:
        print("No se encontraron imágenes para convertir.")
        return

    print(f"Convirtiendo {len(archivos)} imagen(es) en:\n  {CARPETA}\n")
    total_orig = total_new = 0

    for f in sorted(archivos):
        orig_size = f.stat().st_size
        convertir(f)
        new_size = f.with_suffix(".webp").stat().st_size
        total_orig += orig_size
        total_new  += new_size

    print("=" * 40)
    print(f"TOTAL  {total_orig/1024:.0f} KB  →  {total_new/1024:.0f} KB")
    print(f"AHORRO {100 - (total_new/total_orig*100):.0f}%  ({(total_orig-total_new)/1024:.0f} KB liberados)")

if __name__ == "__main__":
    main()
