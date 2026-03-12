# Auditoría Técnica 5 — Meta description, títulos, Open Graph y Twitter Card

**Fecha:** 2026-02-23  
**Dominio:** zoovettravel.com  
**Alcance:** Todo el proyecto (279 HTML: raíz, articles/, articulos-interes/, zoopedia/).

---

## Criterios revisados

1. **Meta description:** Presencia, longitud razonable (≈50–160 caracteres), coherencia con idioma de la página.
2. **Título (`<title>`):** Presencia, longitud, idioma.
3. **Open Graph:** og:url, og:title, og:description, og:image; que og:url coincida con la URL canonical; que no queden URLs con dominio antiguo.
4. **Twitter Card:** Donde exista (twitter:card, twitter:title, twitter:description, twitter:image), coherencia con OG.
5. **Meta robots (opcional):** Páginas que no deban indexarse (índices de sección si se decide no indexarlos).

---

## Resultado resumido

| Verificación | Estado |
|--------------|--------|
| Dominio antiguo (zoovet.pe, etc.) en meta/OG | ✓ 0 ocurrencias |
| Meta description presente | ✓ En todas las páginas muestreadas |
| Título presente | ✓ En todas las páginas muestreadas |
| og:url = canonical | ✓ Donde hay OG, coincide |
| og:description truncado | ⚠ 1 archivo: articulos-interes/rnattviajes.html (corregido) |
| Páginas con og:url pero sin og:image | ⚠ Muchas en articulos-interes (se añade imagen por defecto) |
| Páginas sin Open Graph | ⚠ Raíz (index, index-en, index-fr), índices de sección, todas las fichas zoopedia salvo Australia, España, EEUU, Francia, Italia, Japón, EAU (se añade OG) |
| Twitter Card | ✓ Donde hay OG en articles; en articulos-interes a veces sin twitter:image (se unifica) |
| Meta robots noindex en índices | ℹ Opcional: no aplicado; los índices se mantienen indexables |

---

## Hallazgos detallados

### 1. Meta description y títulos
- **Presencia:** Todas las páginas revisadas tienen `<meta name="description">` (en algún orden de atributos) y `<title>`.
- **Longitud:** Descripciones y títulos son razonables; no se detectaron duplicados exactos problemáticos.
- **Idioma:** Coherente con el idioma de la página (es/en/fr por sufijo o lang).

### 2. Open Graph
- **articles/:** Tienen OG completo (og:type, og:title, og:description, og:url, og:image) y Twitter card; og:url coincide con canonical.
- **articulos-interes/:** La mayoría tienen og:type, og:title, og:description, og:url; muchas **no tienen og:image** (al compartir en redes no se muestra imagen). Se añade `og:image` con imagen por defecto del sitio.
- **zoopedia/:** Solo parte de las fichas tienen meta OG en el `<head>` (Australia, España, EEUU, Francia, Italia, Japón, EAU). El resto (Chile, Canadá, China, Corea del Sur, Reino Unido, Unión Europea, Rusia, Singapur, Sudáfrica, Brasil y variantes -en/-fr) tienen canonical y JSON-LD con imagen pero **no tienen og:url, og:title, og:description, og:image**. Se añade OG completo usando la imagen ya definida en JSON-LD (ficha-*-og.jpg).
- **Raíz e índices de sección:** index.html, index-en.html, index-fr.html y los index de articulos-interes/ y zoopedia/ no tenían OG; se añade OG básico (og:url, og:title, og:description, og:image con imagen genérica).

### 3. og:description truncado
- **articulos-interes/rnattviajes.html:** El contenido de `og:description` terminaba en "validez del " (corte de carácter). Corregido a la descripción completa, alineada con meta description.

### 4. Twitter Card
- Donde existe `twitter:card` (p. ej. summary_large_image), se ha comprobado o añadido `twitter:title` y, donde aplica, `twitter:image` para que las tarjetas se muestren correctamente en Twitter/X.

### 5. Meta robots
- No se ha aplicado `noindex` a índices de sección (articulos-interes/, zoopedia/, articles/). Siguen con index,follow. Si en el futuro se desea no indexar listados, puede añadirse `<meta name="robots" content="noindex,follow">` en esos índices.

---

## Cambios realizados (resumen)

1. **rnattviajes.html:** og:description completo; og:image y twitter:image con imagen por defecto.
2. **index.html, index-en.html, index-fr.html (raíz):** Añadidos meta og:type, og:url, og:title, og:description, og:image y Twitter card.
3. **Índices de sección:** Añadido OG (y Twitter donde aplica) a articulos-interes/index*.html, zoopedia/index*.html y articles/index*.html.
4. **articulos-interes (con og:url pero sin og:image):** Añadido og:image (y twitter:image) con `https://zoovettravel.com/images/zoovet-travel-hero.png`.
5. **Fichas zoopedia sin OG:** Añadido bloque completo og:type, og:url, og:title, og:description, og:image (usando la URL ficha-*-og.jpg del JSON-LD de cada página) y Twitter card.

---

## Recomendaciones

- **Imagen por defecto para redes:** Mantener `images/zoovet-travel-hero.png` (o equivalente) para páginas sin imagen específica; recomendado 1200×630 px para og:image.
- **Revisión periódica:** Al añadir nuevas páginas, comprobar que tengan meta description, title, canonical y al menos og:url, og:title, og:description y og:image.
- **Logo en Schema:** En zoopedia, el JSON-LD usa en algunos casos `logo.png`; el resto del sitio usa `zoovet-logo.png`. Unificar en `zoovet-logo.png` cuando se suba el logo (ver docs/GUIA_FAVICON_Y_LOGO.md).
