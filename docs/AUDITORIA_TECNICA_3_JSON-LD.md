# Auditoría Técnica 3 — JSON-LD

**Fecha:** 2026-02-23  
**Dominio:** zoovettravel.com  
**Alcance:** Todo el proyecto (279 HTML: raíz, articles/, articulos-interes/, zoopedia/).

---

## Criterios revisados

1. **Cobertura:** Páginas con contenido principal (artículos, fichas, índices) con JSON-LD adecuado (Article, WebPage, Organization, BreadcrumbList, WebSite, FAQPage según corresponda).
2. **URLs y @id:** Todos los `url` y `@id` en JSON-LD deben usar `https://zoovettravel.com/...` y coincidir con la URL canonical de la página.
3. **Calidad:** Sin dominio antiguo (zoovet-travel.com, .pe), sin ruta obsoleta (/fichas/), sin scripts duplicados o mal cerrados.
4. **Estructura:** Article con author, datePublished/dateModified; BreadcrumbList coherente con la jerarquía de la página.

---

## Resultado

| Verificación | Estado |
|--------------|--------|
| Dominio antiguo (zoovet-travel.com, .pe) en HTML | ✓ 0 ocurrencias |
| Ruta obsoleta /fichas/ en JSON-LD | ✓ Corregida → /zoopedia/ |
| @id/url en JSON-LD no coinciden con canonical | ✓ Corregidos en zoopedia |
| Formato @id (barra final vs .html) | ✓ Unificado a .html en zoopedia |

---

## Cambios realizados

### 1. BreadcrumbList: /fichas/ → /zoopedia/

En 11 archivos de zoopedia (australia, australia-en, australia-fr, reino-unido, reino-unido-en, reino-unido-fr, union-europea, union-europea-en, union-europea-fr, italia, francia) el ítem "La Zoopedia" / "The Zoopedia of Travel" apuntaba a `https://zoovettravel.com/fichas/`. Se reemplazó por `https://zoovettravel.com/zoopedia/`.

### 2. @id y URLs en JSON-LD de Zoopedia: alineados con canonical

- **Páginas EN/FR** que tenían `@id` apuntando a la versión ES (ej. `zoopedia/australia/#article` en australia-en.html): se corrigió para que cada página tenga `@id` con su propia URL (ej. `zoopedia/australia-en.html#article`). Afectados: australia-en/fr, reino-unido-en/fr, canada-en/fr, italia-en/fr, espana-en/fr, francia-en/fr, corea-del-sur-en/fr, union-europea-en/fr.
- **Todas las fichas zoopedia:** se unificó el formato de `@id` y de las URLs en el JSON-LD de barra final (ej. `zoopedia/chile/#article`) a formato `.html` (ej. `zoopedia/chile.html#article`) para coincidir con la canonical. Aplicado a todas las fichas ES, EN y FR de zoopedia (incl. chile, brasil, china, rusia, singapur, sudafrica, eau, eeuu, japon donde aplicaba).

### 3. Resumen por sección

- **Raíz (index, index-en, index-fr):** JSON-LD con BreadcrumbList y/o Organization; ya usaban zoovettravel.com. Sin cambios en esta auditoría.
- **articles/:** Artículos científicos con @graph (WebPage, Article, BreadcrumbList, Organization, WebSite); URLs correctas. Sin cambios.
- **articulos-interes/:** Artículos con @graph (WebPage, Article, BreadcrumbList, etc.); URLs correctas. Sin cambios.
- **zoopedia/:** Corregidos BreadcrumbList (fichas/ → zoopedia/) y todos los @id/url del JSON-LD para que usen la URL real de la página (.html y variante -en/-fr correcta).

---

## Páginas sin JSON-LD (esperado)

Los índices de sección (zoopedia/index.html, index-en, index-fr; articulos-interes/index*.html; articles/index*.html) no incluyen JSON-LD tipo Article; solo cabecera y listados. Es aceptable. Las páginas de contenido (fichas, artículos) sí llevan JSON-LD.

---

## Conclusión

**Auditoría Técnica 3 (JSON-LD): COMPLETADA.**

- **Errores críticos corregidos:** BreadcrumbList con /fichas/; @id en zoopedia EN/FR apuntando a la versión ES; formato de URL en @id (barra final vs .html) unificado con la canonical.
- **Dominio y calidad:** Ninguna referencia a zoovet-travel.com ni .pe; JSON-LD con zoovettravel.com y rutas actuales.

---

## Siguiente ítem recomendado: Auditoría Técnica 4 — Enlaces internos

- Revisar **enlaces internos** en todo el proyecto: rotos (404), relativos vs absolutos, consistencia entre idiomas (que un enlace "Artículos" en ES/EN/FR lleve al índice correcto en cada idioma).
- Comprobar **enlaces a la raíz**: uso de `../index.html` vs `/` o `index.html` y coherencia con la canonical de la raíz (`https://zoovettravel.com/`).
- Detectar enlaces a rutas antiguas (/fichas/, dominio con guion, etc.) en texto o en atributos `href`.
