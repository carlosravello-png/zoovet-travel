# Guía: Favicon y logo para Zoovet Travel

Antes de subir nada: **todas las páginas del sitio comparten el mismo favicon y el mismo logo**. No hace falta un favicon distinto por sección. Solo preparas los archivos, los subes a la carpeta indicada y luego se añaden las etiquetas en el `<head>` de las páginas (o se hace en bloque).

---

## 1. Favicon (icono en la pestaña del navegador)

### Dónde subirlo
- **Carpeta:** `images/` en la **raíz del proyecto** (junto a `index.html`).
- Si no existe, créala: `zoovet-travel/images/`.

### Archivos y dimensiones recomendados

| Archivo              | Dimensión   | Uso principal                    |
|----------------------|------------|-----------------------------------|
| **favicon.ico**      | 32×32 px   | Navegadores clásicos (y 16×16)   |
| **favicon.svg**      | Escalable  | Opcional, buena nitidez en HD    |
| **apple-touch-icon.png** | **180×180 px** | iOS (añadir a inicio)        |

**Nombre recomendado:**  
- `favicon.ico` (o `favicon.svg` si solo usas SVG).  
- `apple-touch-icon.png` para el de 180×180.

### Mínimo necesario
- **Solo favicon:** sube **favicon.ico** (32×32, o 16×32 en un .ico con dos tamaños).  
- **Mejor experiencia:** además **apple-touch-icon.png** a **180×180 px**.

La URL que usaremos en el HTML será:
- `https://zoovettravel.com/images/favicon.ico`
- `https://zoovettravel.com/images/apple-touch-icon.png` (si lo añades)

---

## 2. Logo (marca para cabecera y schema)

El sitio **ya referencia** este logo en el JSON-LD (Schema.org) en muchas páginas:

- **URL esperada:** `https://zoovettravel.com/images/zoovet-logo.png`

### Dónde subirlo
- **Carpeta:** `images/` en la raíz del proyecto (la misma que el favicon).

### Nombre del archivo
- **zoovet-logo.png**  
Así no hay que cambiar nada en el código que ya usa `zoovettravel.com/images/zoovet-logo.png`.

### Dimensiones recomendadas
- **Alto sugerido:** 40–60 px (para cabecera/nav).  
- **Ancho:** proporcional (logo horizontal típico).  
- **Resolución:** 2x para pantallas retina, p. ej. **~120 px de alto** (60×2) y ancho proporcional.  
- **Formato:** PNG con fondo transparente.

Ejemplo: 240×80 px (o 200×60 px) en PNG.

---

## 3. Resumen rápido

| Qué              | Nombre del archivo   | Dónde        | Tamaño típico   |
|------------------|----------------------|-------------|------------------|
| Favicon         | `favicon.ico`        | `images/`   | 32×32 px         |
| Apple touch     | `apple-touch-icon.png` | `images/` | **180×180 px**   |
| Logo (schema/cabecera) | `zoovet-logo.png` | `images/`   | p. ej. 240×80 px (PNG) |

---

## 4. En qué páginas “se suben”

- **No** subes el favicon/logo “por página”.  
- Los **archivos** se suben **una vez** a la carpeta `images/`.  
- El **favicon** se enlaza en el `<head>` de **todas** las páginas HTML (raíz, articles, articulos-interes, zoopedia).  
- El **logo** ya está referenciado en el JSON-LD en muchas páginas como `https://zoovettravel.com/images/zoovet-logo.png`; solo hace falta que ese archivo exista en `images/zoovet-logo.png`.

Cuando tengas los archivos en `images/`, se puede:
1. Añadir en todas las páginas las etiquetas `<link rel="icon">` y, si quieres, `apple-touch-icon`.  
2. Comprobar que ninguna página apunte a otro path o nombre para el logo.

---

## 5. Checklist antes de seguir con la auditoría (meta/Open Graph)

- [ ] Crear carpeta `images/` en la raíz del proyecto (si no existe).  
- [ ] Subir **favicon.ico** (32×32) a `images/favicon.ico`.  
- [ ] (Opcional) Subir **apple-touch-icon.png** (180×180) a `images/apple-touch-icon.png`.  
- [ ] Subir **zoovet-logo.png** (p. ej. 240×80 px, PNG) a `images/zoovet-logo.png`.

Cuando esto esté hecho, se pueden añadir las etiquetas de favicon en el `<head>` de todas las páginas y seguir con la auditoría de meta y Open Graph.
