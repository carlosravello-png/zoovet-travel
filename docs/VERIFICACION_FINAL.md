# Verificación final pre-sitemap — zoovettravel.com

**Fecha:** 2026-02-25  
**Alcance:** Todos los archivos HTML del repositorio (186 archivos).  
**Restricciones:** No se ha modificado contenido editorial, ni generado sitemap. No se han aplicado correcciones; solo auditoría y propuesta.  
**Verificación:** Revisión en múltiples pasadas (coherencia de idioma, enlaces a inicio/índices, enlaces internos, breadcrumb, hreflang, canonical, botones de traducción) y contraste cruzado entre secciones (articles, articulos-interes, zoopedia, raíz).

---

## Resumen ejecutivo

| Tipo de comprobación | Archivos revisados | Errores encontrados |
|----------------------|--------------------|----------------------|
| Coherencia de idioma (enlaces inicio, índices, internos) | 186 | 0 (tras correcciones previas) |
| Breadcrumb visual y JSON-LD | 186 | Ver nota JSON-LD (opcional) |
| Hreflang | Todos con hreflang | 0 (URLs con barra final resuelven a index) |
| Canonical | 186 | **3** (índices con URL directorio en vez de archivo) |
| Botones de traducción (switcher ES/EN/FR) | 186 | **1** (artículo v2 sin enlace ES en switcher) |

**Total de errores a corregir:** **4** (3 canonical + 1 switcher opcional).

---

## PASO 1 — Coherencia de idioma

### 1.1 Enlaces al inicio (index)

- **Archivos sin sufijo o -ES:** Enlazan correctamente a `../index.html` (español).
- **Archivos -EN:** Enlazan correctamente a `../index-en.html`.
- **Archivos -FR:** Enlazan correctamente a `../index-fr.html`.
- **Zoopedia** (-en.html, -fr.html): Enlazan a `../index-en.html` y `../index-fr.html` respectivamente.
- **Articles / articulos-interes:** Misma lógica; sin incoherencias detectadas.

**Resultado:** Sin errores.

### 1.2 Enlaces a índices de sección

- **articles/:** Páginas ES → `index.html`; EN → `index-en.html`; FR → `index-fr.html`. Correcto.
- **articulos-interes/:** Índice de sección en cada idioma correcto (index.html, index-en.html, index-fr.html).
- **zoopedia/:** Fichas sin sufijo → `index.html`; -en → `index-en.html`; -fr → `index-fr.html`. Correcto.

**Resultado:** Sin errores.

### 1.3 Enlaces internos entre artículos

- **articulos-interes/*-EN.html:** Enlaces a `../articles/*-EN.html` o `*-en.html` (versión inglés). Correcto.
- **articulos-interes/*-FR.html:** Enlaces a `../articles/*-FR.html` o `*_FR.html` (versión francés). Correcto.
- **articulos-interes/*.html (ES):** Enlaces a `../articles/*.html` o `*-ES.html` donde aplica. Correcto.
- No se detectan enlaces cruzados de idioma (p. ej. página EN enlazando al cuerpo de un artículo ES).

**Resultado:** Sin errores.

### 1.4 Breadcrumb visual y JSON-LD

- **Breadcrumb visual:** Texto y URLs coherentes con el idioma del archivo (Inicio/Home/Accueil → index correcto; nombre de sección e índice en idioma correcto).
- **JSON-LD BreadcrumbList:** En varios artículos de `articles/`, la posición 2 del breadcrumb usa `"item": "https://zoovettravel.com/articles/"`. Si se unifica el canonical del índice a `articles/index.html`, sería coherente usar `https://zoovettravel.com/articles/index.html` también en el JSON-LD (corrección opcional y solo de URL, sin tocar nombres ni estructura).

**Resultado:** Sin errores obligatorios; opcional unificar URL del ítem de sección a `.../index.html` si se cambia el canonical.

---

## PASO 2 — Hreflang

- **Índices (articles, articulos-interes, zoopedia):** Declaran hreflang es/en/fr y x-default. Las URLs con barra final (p. ej. `https://zoovettravel.com/articles/`, `https://zoovettravel.com/zoopedia/`) suelen resolverse al `index.html` en servidor; los archivos declarados existen.
- **Páginas de artículo/ficha:** Donde hay hreflang, las tres (o dos) versiones existen en el repositorio. No se declaran versiones fantasma.

**Resultado:** Sin errores. Opcional: si se prefiere URL explícita del archivo, cambiar en hreflang `zoopedia/` → `zoopedia/index.html`, `articles/` → `articles/index.html`, `articulos-interes/` → `articulos-interes/index.html`.

---

## PASO 3 — Canonical

**Requisito:** Cada archivo debe canonicalizar a sí mismo. Dominio: `https://zoovettravel.com` (sin guión, sin http).

### Errores detectados (3 archivos)

| Archivo | Canonical actual | Debe ser |
|---------|------------------|----------|
| `articles/index.html` | `https://zoovettravel.com/articles/` | `https://zoovettravel.com/articles/index.html` |
| `articulos-interes/index.html` | `https://zoovettravel.com/articulos-interes/` | `https://zoovettravel.com/articulos-interes/index.html` |
| `zoopedia/index.html` | `https://zoovettravel.com/zoopedia/` | `https://zoovettravel.com/zoopedia/index.html` |

El resto de archivos revisados tienen `rel="canonical"` apuntando a su propia URL con dominio correcto.

**Propuesta de corrección:** En cada uno de los tres archivos, sustituir en `<head>` el valor del `href` del `rel="canonical"` por la URL de la fila "Debe ser" de la tabla anterior.

---

## PASO 4 — Botones de traducción (switcher ES/EN/FR)

- **articles/:** Casi todos los artículos con versión multidioma incluyen los tres enlaces (ES, EN, FR) en el header. **Excepción:** `articles/zoovet_article_v2.html` (versión español) solo muestra enlaces **EN** y **FR**; no muestra el enlace **ES** (a sí mismo). El resto de artículos de la serie muestran los tres.
- **articulos-interes/:** Todas las guías con versión EN/FR revisadas incluyen switcher con ES, EN y FR correctos.
- **zoopedia/:** Todas las fichas revisadas incluyen los tres botones (ES, EN, FR) con rutas correctas a la misma ficha en cada idioma.
- **Índices (index, index-en, index-fr)** de raíz, articles, articulos-interes, zoopedia: Tienen botones de idioma correctos.

**Propuesta de corrección (opcional):** En `articles/zoovet_article_v2.html`, añadir en el bloque del switcher un enlace "ES" a `./zoovet_article_v2.html` (o a sí mismo) para homogeneizar con el resto de artículos (por ejemplo con estilo “actual”/deshabilitado o mismo patrón que en zoovet_art10_certificado-salud-ES.html).

---

## Listado de errores por tipo

### Canonical (3)

1. **articles/index.html** — Canonical debe ser `https://zoovettravel.com/articles/index.html`.
2. **articulos-interes/index.html** — Canonical debe ser `https://zoovettravel.com/articulos-interes/index.html`.
3. **zoopedia/index.html** — Canonical debe ser `https://zoovettravel.com/zoopedia/index.html`.

### Botones de traducción (1, opcional)

4. **articles/zoovet_article_v2.html** — Añadir enlace "ES" en el switcher de idioma para consistencia con el resto de artículos.

---

## Verificaciones adicionales realizadas

- No se encontraron enlaces a `zoovet-travel.com` (con guión) ni a `http://`.
- No hay archivos HTML sin `rel="canonical"` en el conjunto revisado.
- Enlaces internos entre artículos técnicos (articles) y guías (articulos-interes) respetan el idioma de la página.
- Los índices index-en e index-fr de cada sección enlazan correctamente a la versión española (index.html) desde el botón ES.

---

## Número total de archivos revisados

**186** archivos HTML (raíz, articles, articulos-interes, zoopedia).

---

## Próximo paso

Tras tu confirmación, se pueden aplicar únicamente las **3 correcciones de canonical** (y, si lo deseas, la corrección opcional del switcher en `zoovet_article_v2.html`). No se ha generado el sitemap ni se ha modificado contenido editorial.
