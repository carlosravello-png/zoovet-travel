# REPORTE PATCH V4.1 — Artículos de Interés (78 archivos)

**Ubicación:** Este documento se conserva en `docs/` junto con las auditorías técnicas (AUDITORIA_TECNICA_1 a 5). Describe el historial de cambios en la sección articulos-interes (enlaces, estética, traducción V5/V6).

---

## Conteo final

| Idioma | Cantidad | Observación |
|--------|----------|-------------|
| ES     | 26       | Canonical, hreflang, JSON-LD, breadcrumb «Artículos de interés», estética Artículos Científicos |
| EN     | 26       | Misma estética; scope/footer/breadcrumb/hero en inglés; enlaces a `../articles/...-EN.html` cuando existen |
| FR     | 26       | Misma estética; scope/footer/breadcrumb/hero en francés; enlaces a `../articles/...-FR.html` cuando existen |
| **Total** | **78** | |

---

## a) Cambios de enlaces (26 ES) — corrección 404

Desde `articulos-interes/`, cualquier enlace interno que apuntaba a la serie técnica en `articles/` se corrigió así:

- **Regla:** Si el destino existe en `articles/` (nombre exacto en `zoovet_*.html`), el `href` se reemplaza por `../articles/<nombre>`. Si no existe, el enlace se elimina y se deja solo el texto (sin `<a>`). Cero 404.

### Antes → Después (ejemplos aplicados)

| Antes (origen en articulos-interes) | Después (destino existe en articles/) |
|------------------------------------|--------------------------------------|
| `zoovet_art5_estres-metabolico-ES.html` | `../articles/zoovet_art5_estres-metabolico-ES.html` |
| `zoovet_art8_hipobaria-ES.html` | `../articles/zoovet_art8_hipobaria-ES.html` |
| `zoovet_art10_certificado-salud-ES.html` | `../articles/zoovet_art10_certificado-salud-ES.html` |
| `zoovet_art11_cuarentena-ES.html` | `../articles/zoovet_art11_cuarentena-ES.html` |
| `zoovet_art12_expediente-ES.html` | `../articles/zoovet_art12_expediente-ES.html` |
| `zoovet_article3_braquicefalos_ES.html` | `../articles/zoovet_article3_braquicefalos_ES.html` |
| `uploaded:zoovet_article3_braquicefalos_ES.html` | `../articles/zoovet_article3_braquicefalos_ES.html` |

### Enlaces EN/FR (52 archivos)

En versiones EN y FR, los enlaces a la serie técnica apuntan al mismo idioma cuando el archivo existe en `articles/`:

- ES → `../articles/zoovet_art5_estres-metabolico-ES.html`  
- EN → `../articles/zoovet_art5_estres-metabolico-EN.html`  
- FR → `../articles/zoovet_art5_estres-metabolico-FR.html`  

Caso especial: `zoovet_article_v2.html` (sin sufijo -ES) → EN: `../articles/zoovet_article_v2-en.html`, FR: `../articles/zoovet_article_v2_FR.html`.

---

## b) Enlaces omitidos (texto plano, sin link)

Se dejó solo texto (sin `<a>`) cuando el archivo destino **no existe** en `articles/`. No se creó enlace a rutas inexistentes.

- Los archivos en `articles/` son los listados por `zoovet_*.html` (p. ej. zoovet_art4_desparasitacionES/EN/FR, zoovet_art5, zoovet_art6, zoovet_art7, zoovet_art8, zoovet_art9, zoovet_art10, zoovet_art11, zoovet_art12, zoovet_article2_ES/EN/FR, zoovet_article3_braquicefalos_ES/EN/FR, zoovet_article_v2, zoovet_article_v2-en, zoovet_article_v2_FR).
- Cualquier otro nombre que hubiera aparecido en un `href` y no esté en esa lista se trató como omitido: el enlace se sustituyó por el texto visible del enlace.

---

## c) Sanitización y duplicados

- Se eliminaron **solo** los fences \`\`\`html y \`\`\` al inicio/fin en los ES; no se alteró el HTML interno ni el bloque `<style>`.
- Se eliminaron del contenido extraído: bloques duplicados de `<script type="application/ld+json">`, `<footer>` y repeticiones de hero/scope-box para que cada página tenga un único footer y un único JSON-LD.
- Sec-label en `<h2>`: un solo «Sección N» por encabezado; se eliminaron sec-label duplicados cuando el archivo fuente ya los traía.

---

## d) Estética

- Los 78 archivos replican la estética de **Artículos Científicos** (referencia: `articles/zoovet_art10_certificado-salud-ES.html`): mismo `<head>`, meta, bloque `<style>`, tipografías Libre Baskerville + DM Sans, colores, hero, scope-box, h2 con sec-label, footer.
- Sin JS, sin tracking, sin librerías ni frameworks. Un solo H1 por página. `<strong>` según directiva.

---

## e) Scripts utilizados

- `build_es_cientifico.py`: aplica estética científica a los 26 ES, sanitiza fences, corrige enlaces a `../articles/` y evita duplicados.
- `build_en_fr_cientifico.py`: genera los 52 archivos EN y FR a partir de los 26 ES; scope/footer/breadcrumb/hero en EN/FR; enlaces a `../articles/...-EN.html` o `-FR.html` solo cuando el archivo existe.

---

## Validación

- Hreflang: es, en, fr, x-default en todos los artículos; canonical por idioma.
- JSON-LD: un solo bloque por página; Article, BreadcrumbList (Inicio / Home / Accueil → Artículos de interés / Articles of Interest / Articles d'intérêt → título), Organization, WebSite, Person (author).
- Enlaces internos a la serie técnica: sin 404; destinos solo cuando el archivo existe en `articles/`.

---

## V5 — Reconstrucción profesional EN/FR (Corrección crítica)

### Alcance

- **52 archivos EN y FR** reconstruidos por completo desde los 26 ES, con traducción real y completa (no parcheo).
- Estética idéntica a Artículos Científicos; CSS y estructura HTML intactos; sin JS nuevo.

### Reglas aplicadas

1. **Traducción completa:** Todo texto visible en inglés (EN) o francés (FR): H1, hero lead, breadcrumb, meta title, meta description, OG/twitter, JSON-LD headline, CTA y cuerpo. Cero español en EN/FR.
2. **Terminología veterinaria/regulatoria:** EN según UK GOV, CDC, EU Reg 576/2013, RNATT, certificados oficiales, microchip ISO 11784/11785. FR con equivalentes formales (vaccination antirabique conforme, titrage sérologique RNATT, certificat vétérinaire officiel d'exportation, visa SENASA, transpondeur ISO).
3. **Metadata:** Un solo `<title>` por página (`Short Title | Zoovet Travel`); OG/twitter/JSON-LD en el idioma del archivo; headline e inLanguage correctos en JSON-LD.
4. **Validación automática:** Detección de palabras frecuentes en español en EN/FR; generación solo si no hay violaciones.

### Scripts y módulos

- `build_en_fr_v5.py`: genera los 52 EN/FR desde el diccionario de traducciones; metadata limpia; JSON-LD en idioma correcto; `fix_links_in_body()` para enlaces a `../articles/` en -EN.html/-FR.html.
- `translations_v5.py`: TRANSLATIONS (2 artículos base).
- `TRANSLATIONS_NEW_ENTRIES.py`: entradas adicionales (veterimariosntrujillo, mascotabodega, dondetramitarentrujillo, articulo_vacuna_antirrabica_para_viajar).
- `TRANSLATIONS_BATCH2.py`: 20 artículos restantes con EN/FR profesional.

### Resultado

**LANGUAGE CONSISTENCY PASSED.**

- 0 frases en español en archivos EN y FR.
- 1 solo H1 por página.
- Sin duplicación en `<title>`.
- Canonical y hreflang correctos.
- JSON-LD sin texto en idioma incorrecto.
- Sin JS agregado; sin CSS modificado.

---

## V6 — Traducción 1:1 (PROHIBIDO resumir). Triple validación

### Alcance

- **Traducción 1:1 del HTML ES:** EN y FR deben contener el 100% del contenido del ES (mismos bloques, mismos párrafos, mismas secciones). CERO resúmenes.
- **Regla 7 — JSON-LD:** Un solo `<title>`; headline sin duplicaciones; coherencia entre title, meta description, og:title, og:description, JSON-LD headline; inLanguage correcto ("en"/"fr"); 1 Article, 1 BreadcrumbList, 1 Organization.
- **Regla 8 — Triple repase de control:** Pasada 1 (conteo H2, p, ul, CTA; no-summary; idioma puro); Pasada 2 (metadata completa; JSON-LD limpio; canonical y hreflang); Pasada 3 (sin duplicaciones de título/Zoovet Travel; sin español residual; enlaces internos válidos).

### Script y lógica

- **`build_en_fr_v6.py`:**
  - **Modo híbrido:** Si TRANSLATIONS tiene cuerpo con **misma estructura** que el ES (mismo conteo H2, p, ul, CTA), genera EN/FR desde el dict con head/JSON-LD V6 (sin API).
  - **Modo traducción:** Si no hay cuerpo 1:1 en el dict, parsea el HTML ES (BeautifulSoup), extrae el body entre scope-box y footer, traduce nodo a nodo (deep_translator) y genera EN/FR con triple validación.
  - **`--dict-only`:** Genera solo los artículos cuyo cuerpo en el dict coincide 1:1 con el ES; el resto se lista como pendiente de traducción o de añadir cuerpo completo al dict.

### Validación de conteos (NO SUMMARY)

- Para cada par ES vs EN/FR: mismo conteo de H2, párrafos `<p>`, listas `<ul>` y bloques CTA.
- Informe de conteos: `V6_counts_report.txt` (H2, p, ul, CTA por slug en ES, EN, FR).

### Cierre V6 — 52 archivos completos

- **26 EN + 26 FR** generados: 5 desde dict 1:1 (TRANSLATIONS), 21 desde traducción nodo a nodo (deep_translator) preservando estructura 1:1.
- **Regla 9 — Diccionario terminológico:** Aplicado tras traducción sobre title, meta description, og:title, og:description, H1, H2, body y JSON-LD headline. Términos forzados EN/FR (Official Veterinary Export Certificate, rabies vaccination compliant…, ISO 11784/11785 FDX-B…; certificat vétérinaire officiel d'exportation, vaccination antirabique conforme…, transpondeur ISO…). **TERMINOLOGY NORMALIZED.**
- **Fixes aplicados en pipeline:** Placeholders `{kw}` reemplazados por keyword real por idioma (SLUG_KEYWORD). Espacios correctos alrededor de `<a>` (ej. "in<a" → "in <a"). En FR, sec-label unificado a "Section N" (no "Article N").
- **HOTFIX V6.1 (ES):** En los 26 ES, `<title>` con "| Zoovet Travel" una sola vez; JSON-LD Article.headline sin repeticiones; placeholder `{kw}` eliminado (articulo_alimentacion_antes_durante_vuelo: "alimentación antes y durante el vuelo"). Script: `fix_es_title_headline.py`.

### Validación

- **TRIPLE VALIDATION PASSED (26/26).** Los 52 EN/FR pasan: Pasada 1 (conteos H2, p, ul, CTA idénticos a ES; no-summary; idioma puro); Pasada 2 (metadata completa; JSON-LD limpio; canonical y hreflang); Pasada 3 (sin duplicaciones de título; sin español residual; enlaces internos válidos).
- **V6_counts_report.txt:** Conteos ES/EN/FR por slug para los 26 artículos; todos 1:1 (NO SUMMARY).
