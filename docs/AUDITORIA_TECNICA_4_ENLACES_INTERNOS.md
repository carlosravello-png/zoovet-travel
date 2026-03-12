# Auditoría Técnica 4 — Enlaces internos

**Fecha:** 2026-02-23  
**Dominio:** zoovettravel.com  
**Alcance:** Todo el proyecto (279 HTML: raíz, articles/, articulos-interes/, zoopedia/).

---

## Criterios revisados

1. **Rutas obsoletas:** Ningún `href` debe apuntar a /fichas/, zoovet-travel.com (con guion) ni zoovettravel.pe.
2. **Consistencia por idioma:** En páginas EN el enlace "Home" debe ir a la raíz EN (../index-en.html); en páginas FR "Accueil" debe ir a la raíz FR (../index-fr.html). En páginas ES "Inicio" a la raíz ES (../index.html).
3. **Enlaces a raíz:** Coherencia con canonical raíz (https://zoovettravel.com/); uso de ../index.html, ../index-en.html, ../index-fr.html según idioma de la página.
4. **Enlaces rotos:** No se han detectado enlaces a archivos inexistentes en las muestras revisadas (zoopedia, articles, articulos-interes).

---

## Resultado

| Verificación | Estado |
|--------------|--------|
| href a /fichas/, zoovet-travel.com, .pe | ✓ 0 ocurrencias |
| Enlaces "Inicio/Home/Accueil" por idioma | ✓ Corregidos 3 archivos |
| Muestra de enlaces internos zoopedia/articles/articulos-interes | ✓ Destinos existentes |

---

## Cambios realizados

### 1. zoopedia/union-europea-fr.html

El enlace "Accueil" y el logo (ZOOVET TRAVEL) apuntaban a `../index.html` (raíz en español). En una página FR deben apuntar a la raíz en francés.  
**Cambio:** `href="../index.html"` → `href="../index-fr.html"` (2 ocurrencias).

### 2. zoopedia/union-europea-en.html

El enlace "Home" y el logo apuntaban a `../index.html`. En una página EN deben apuntar a la raíz en inglés.  
**Cambio:** `href="../index.html"` → `href="../index-en.html"` (2 ocurrencias).

### 3. articles/zoovet_art11_cuarentena-EN.html

El breadcrumb "Home" apuntaba a `../index.html`. Debe apuntar a la raíz EN.  
**Cambio:** `href="../index.html"` → `href="../index-en.html"` en el breadcrumb.

---

## Comprobaciones sin cambios

- **Páginas ES:** Siguen usando `../index.html` para "Inicio" y `index.html` para el índice de la sección (articles, articulos-interes, zoopedia). Correcto.
- **Páginas EN:** La gran mayoría ya usaban `../index-en.html` y `index-en.html` / `index-en.html` en la sección. Solo union-europea-en y zoovet_art11_cuarentena-EN necesitaban corrección.
- **Páginas FR:** La gran mayoría ya usaban `../index-fr.html` y `index-fr.html` en la sección. Solo union-europea-fr necesitaba corrección.
- **Índices de sección (articles/index-en.html, index-fr.html, articulos-interes/index-en.html, index-fr.html, zoopedia/index-en.html, index-fr.html):** El switcher de idioma "ES" apunta a `index.html` (índice ES de esa sección). Correcto.
- **Enlaces relativos** entre fichas zoopedia (ej. espana.html, italia.html, francia.html desde union-europea.html) y entre artículos: destinos existentes en el árbol del proyecto.

---

## Conclusión

**Auditoría Técnica 4 (enlaces internos): COMPLETADA.**

- **Errores corregidos:** 3 archivos con enlace "Inicio/Home/Accueil" al idioma equivocado (raíz).
- **Rutas obsoletas:** Ninguna detectada.
- **Enlaces rotos:** No detectados en la revisión por muestreo.

---

## Siguiente ítem recomendado: Auditoría Técnica 5 — Meta y Open Graph

- Revisar **meta description** y **títulos** por página: presencia, longitud razonable, coherencia con el contenido y con el idioma de la página.
- Revisar **Open Graph** (og:url, og:title, og:description, og:image) en todo el proyecto: que og:url coincida con la URL canonical, que las imágenes existan y que no queden URLs con dominio antiguo.
- Revisar **Twitter Card** (twitter:card, twitter:title, etc.) donde existan.
- Opcional: revisar **meta robots** (index/follow, noindex) para páginas que no deban indexarse (si las hubiera).
