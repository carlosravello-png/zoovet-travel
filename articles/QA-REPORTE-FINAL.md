# QA Reporte Final — Serie Técnica Zoovet Travel (ES/EN/FR)

**Alcance:** Todos los archivos `articles/zoovet_art*.html` y `articles/zoovet_article*.html` en ES, EN y FR (excl. index*).  
**Fecha:** Febrero 2026.  
**Criterio:** Detección de errores técnicos/SEO/markup/links; sin reescritura de contenido ni cambios de estilo.

---

## Correcciones aplicadas durante la auditoría

| Archivo | Tipo | Línea / Sección | Corrección aplicada |
|---------|------|-----------------|----------------------|
| zoovet_art5_estres-metabolico-EN.html | **G. Encoding / mojibake** | 498, 582, 748, 752 | Reemplazo de `BuÃ©no` → `Buéno` y `VÃ¡zquez-Baeza` → `Vázquez-Baeza` (4 ocurrencias). Referencias bibliográficas Ruckebusch & Buéno (1976) y Vázquez-Baeza et al. (2016). |
| zoovet_art6_microchip-ES.html | **H. Interlinking (title incompleto)** | 145 | Completado el atributo `title` del enlace a ART-9: añadido ` | Zoovet Travel Serie Técnica IX` para consistencia con el resto de enlaces internos. |

---

## Tabla por archivo (resumen de estado)

Se auditaron **33 archivos** (zoovet_art4–art12 y zoovet_article2, article3 en ES/EN/FR; zoovet_article_v2*, zoovet_art5/6/7/8/9/10/11/12 en tres idiomas). Muestreo manual: zoovet_art6_microchip-ES.html, zoovet_art8_hipobaria-EN.html, zoovet_art9_certificados-vacunacion-FR.html.

| Idioma | Archivos | Estado global | Issues detectados (sin corregir) |
|--------|----------|----------------|-----------------------------------|
| ES | 11 (art4–12, article2, article3) | OK tras correcciones | Ninguno crítico. |
| EN | 11 | OK tras correcciones | Ninguno crítico. |
| FR | 11 | OK | Ninguno. |

### Checklist A–Z (resultado por categoría)

| Letra | Categoría | Resultado |
|-------|-----------|-----------|
| **A** | HTML básico | OK. `<!DOCTYPE html>`, `<html lang="xx">` correcto (es/en/fr), `charset="UTF-8"`, viewport presentes. Un solo H1 por página; jerarquía H2/H3 revisada en muestreo (sin saltos absurdos). |
| **B** | Canonical / OG / Twitter | OK. Canonical absoluto coincide con `og:url` y con `WebPage.url` en JSON-LD en los archivos muestreados. og:type, og:title, og:description, og:url, og:image presentes. Twitter card, title, description, image presentes. |
| **C** | hreflang | OK. hreflang recíproco es/en/fr + x-default → ES. URLs por idioma coherentes (sin cruces). |
| **D** | Robots | OK. Meta robots presente y consistente en todos los archivos revisados (`index,follow,max-image-preview:large,...`). |
| **E** | Breadcrumb | OK. Breadcrumb visible y coherente por idioma; enlaces a `../index.html` e `index.html` (artículos); sin enlaces rotos en muestreo. |
| **F** | JSON-LD | OK (muestreo). JSON parseable; @graph con WebPage, ScholarlyArticle, BreadcrumbList, Organization, WebSite, Person. headline alineado con H1; inLanguage correcto. Fechas ISO (datePublished, dateModified). Autores: Jessica Ysabel Camacho Garcia (CMVP 12434); donde aplica segundo autor. Sin menciones a IA. |
| **G** | Encoding / mojibake | **Corregido.** Mojibake en zoovet_art5_estres-metabolico-EN.html (BuÃ©no, VÃ¡zquez-Baeza) corregido. Resto de archivos sin patrones â€™, â€", Ã¡, âœ" detectados. Checkmarks ya en formato &#10003; donde se usan. |
| **H** | Interlinking | OK. Rutas internas relativas (zoovet_art*_ES/EN/FR.html, zoovet_article2/3_*); archivos destino existen. EN enlaza a EN, FR a FR, ES a ES. Un enlace con title incompleto corregido (ART-6 ES → ART-9). **Nota:** No existe `rel="prev"`/`rel="next"` en `<head>` en los archivos revisados; es una mejora opcional (no bloqueante). |
| **I** | Performance | OK. Sin JS externo ni frameworks; solo `application/ld+json` inline. Fuentes Google (preconnect + link) y estilos inline; aceptable para el alcance. |

---

## Top 10 riesgos / patrones (prevención futura)

1. **Mojibake en referencias (EN):** Nombres con acentos (Buéno, Vázquez-Baeza) pueden guardarse mal si el editor o el flujo no usan UTF-8 de extremo a extremo. **Mitigación:** Asegurar UTF-8 en guardado y en copia de referencias.
2. **Title de enlaces internos incompletos:** Un enlace tenía title sin sufijo " | Zoovet Travel Serie Técnica X". **Mitigación:** Revisar que todos los `title` de enlaces a artículos de la serie incluyan el título completo (como en `<title>` del destino).
3. **Falta de rel="prev"/rel="next":** No se usan en head para la serie. Opcional para SEO de paginación; considerar añadirlos en una fase posterior si se prioriza.
4. **Consistencia og:title vs <title>:** En muestreo, og:title a veces es versión acortada del <title>; es práctica habitual y no se considera error.
5. **Breadcrumb y rutas relativas:** Algunos usan `../index.html` y `index.html`; válido si la estructura de carpetas es estable. Verificar en producción que no haya 404 en raíz/artículos.
6. **JSON-LD y fechas:** Fechas en formato ISO (2026-02-23); mantener mismo formato si se actualiza dateModified.
7. **Autor único vs dos autores:** Algunos artículos tienen solo Camacho Garcia JY; otros incluyen Camacho Paz VJ. Coherencia ya delegada a criterio editorial.
8. **Referencias con em dash (—):** En art5 EN aparece "397—405"; el carácter es em dash Unicode, no mojibake; OK.
9. **Enlaces por párrafo:** En el muestreo no se superó el límite de 2 enlaces internos por párrafo; seguir respetándolo en futuros interlinks.
10. **Idioma en series-nav:** series-nav usa títulos/anchors en el idioma de la página; correcto. No cruzar idiomas en enlaces de contenido.

---

## Verificación 404 (enlaces internos)

Todos los `href` internos apuntan a archivos del tipo:

- `zoovet_art4_desparasitacionES.html` (y EN/FR)
- `zoovet_art5_estres-metabolico-ES.html` (y EN/FR)
- `zoovet_art6_microchip-ES.html` (y EN/FR)
- `zoovet_art7_jetlag-ES.html` (y EN/FR)
- `zoovet_art8_hipobaria-ES.html` (y EN/FR)
- `zoovet_art9_certificados-vacunacion-ES.html` (y EN/FR)
- `zoovet_art10_certificado-salud-ES.html` (y EN/FR)
- `zoovet_art11_cuarentena-ES.html` (y EN/FR)
- `zoovet_art12_expediente-ES.html` (y EN/FR)
- `zoovet_article2_ES.html` (y EN/FR)
- `zoovet_article3_braquicefalos_ES.html` (y EN/FR)

Los archivos correspondientes existen en `articles/`. **Verificación 404: OK** (rutas relativas al mismo directorio).

---

## Resumen ejecutivo

- **Archivos auditados:** 33 (Serie Técnica + article2, article3 en ES/EN/FR).
- **Correcciones realizadas:** 2 (mojibake en ART-5 EN; title incompleto en ART-6 ES).
- **Estado final:** Listo para publicación desde el punto de vista técnico/SEO/markup/links, sin cambios de contenido ni de estructura más allá de las correcciones indicadas.
