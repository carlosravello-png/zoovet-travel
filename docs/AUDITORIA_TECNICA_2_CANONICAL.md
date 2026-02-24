# Auditoría Técnica 2 — Canonical

**Fecha:** 2026-02-23  
**Dominio:** zoovettravel.com  
**Alcance:** Todo el proyecto (279 archivos HTML en raíz, articles/, articulos-interes/, zoopedia/).

---

## Criterios revisados

1. **Único canonical:** Cada página debe tener exactamente una etiqueta `rel="canonical"`.
2. **Auto-referente:** La URL canonical debe ser la URL real de esa misma página (no apuntar a otra variante de idioma ni a otra ruta).
3. **Dominio:** Todas las URLs canonical deben ser `https://zoovettravel.com/...`.
4. **Consistencia de formato:** Índices de sección con barra final (ej. `https://zoovettravel.com/zoopedia/`) y raíz unificada con barra final (`https://zoovettravel.com/`).

---

## Resultado

| Verificación | Estado |
|--------------|--------|
| Una sola canonical por página | ✓ 279/279 |
| Canonical auto-referente | ✓ Todas |
| Dominio zoovettravel.com | ✓ 100% |
| Índices con barra final (articles/, articulos-interes/, zoopedia/) | ✓ Ya estaban correctos |
| Raíz (index.html) | ✓ Corregido: canonical y hreflang es/x-default unificados a `https://zoovettravel.com/` |

---

## Cambios realizados

1. **index.html (raíz):**  
   - `rel="canonical"` de `https://zoovettravel.com/index.html` → `https://zoovettravel.com/`  
   - hreflang `es` y `x-default` de `.../index.html` → `.../`  
   - JSON-LD BreadcrumbList: `item` de `.../index.html` → `.../`

2. **index-en.html e index-fr.html:**  
   - hreflang `es` y `x-default` (referencia a la versión española) de `https://zoovettravel.com/index.html` → `https://zoovettravel.com/`

Con esto, la raíz queda alineada con el resto de índices (articles/, articulos-interes/, zoopedia/), que ya usaban URL con barra final.

---

## Páginas sin canonical

**Ninguna.** Todos los HTML del proyecto tienen canonical. No hay HTML en docs/ ni en otras carpetas fuera de raíz, articles, articulos-interes y zoopedia.

---

## Conclusión

**Auditoría Técnica 2 (canonical): COMPLETADA.**  
- 0 errores críticos (canonical duplicado o no auto-referente).  
- 1 mejora aplicada: consistencia de la URL raíz con barra final.

---

## Siguiente ítem recomendado: Auditoría Técnica 3 — JSON-LD

- Revisar que todas las páginas con contenido principal tengan **JSON-LD** adecuado (Article, WebPage, Organization, BreadcrumbList según corresponda).
- Comprobar que los **@id** y **url** en el JSON-LD usen `https://zoovettravel.com/...` y coincidan con la URL canonical de la página.
- Detectar scripts JSON-LD mal formados, duplicados o con URLs antiguas (zoovet-travel.com, .pe, etc.).
