# Resumen de interlinking editorial — Zoopedia
**Fecha:** 2026-04-30
**Branch:** seo-fix-2026-04-30
**Total enlaces añadidos:** 744 enlaces en 60 archivos (20 países × 3 idiomas)

## Metodología aplicada

- Anchors descriptivos en el idioma del artículo, sobre texto editorial existente.
- No se inventa contenido nuevo.
- Máximo 2 enlaces internos por párrafo (regla heredada de INTERLINKING-REPORTE.md).
- Máximo 2 enlaces al mismo destino por archivo.
- Máximo 1 enlace por categoría técnica (microchip, vacuna, cuarentena, etc.).
- Zonas EXCLUIDAS: `<head>`, `<title>`, `<script>`, `<style>`, `<a>` (no anidamos), `<h1-h6>`, `<table>`, comentarios HTML, JSON-LD.

## Tipos de enlace insertados

### Enlaces a articles/ (técnicos)
- `microchip ISO` / `microchip` → `articles/zoovet_art6_microchip-{ES|EN|FR}.html`
- `RNATT` → `favn-{es|en|fr}.html`
- `vacuna antirrábica` / `rabies vaccination` / `vaccination antirabique` → `articles/zoovet_art9_certificados-vacunacion-{ES|EN|FR}.html`
- `certificado de salud` / `health certificate` / `certificat de santé` → `articles/zoovet_art10_certificado-salud-{ES|EN|FR}.html`
- `cuarentena` / `quarantine` / `quarantaine` → `articles/zoovet_art11_cuarentena-{ES|EN|FR}.html`
- `expediente sanitario` / `export dossier` / `dossier d'exportation` → `articles/zoovet_art12_expediente-{ES|EN|FR}.html`
- `tratamientos antiparasitarios` / `antiparasitic treatment` / `traitement antiparasitaire` → `articles/zoovet_art4_desparasitacion{ES|EN|FR}.html`
- `razas braquicéfalas` / `brachycephalic breeds` / `races brachycéphales` → `articles/zoovet_article3_braquicefalos_{ES|EN|FR}.html`
- `jet lag` / `desincronización circadiana` / `circadian desynchronization` / `désynchronisation circadienne` → `articles/zoovet_art7_jetlag-{ES|EN|FR}.html`

### Cross-links entre fichas zoopedia
Cuando una ficha menciona otro país, se enlaza a la ficha de ese país en el mismo idioma. Solo el primer match relevante. Países cubiertos:
Australia, Brasil, Canadá, Chile, China, Corea del Sur, EAU, Estados Unidos, España, Francia, India, Italia, Japón, México, Nueva Zelanda, Reino Unido, Rusia, Singapur, Sudáfrica, Unión Europea.

### Cross-links a articulos-interes/ por país
Solo si la ficha es del país correspondiente:
- `eeuu*.html` → `llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2-{ES|EN|FR}.html`
- `japon*.html` → `llevar_mascota_japon_proceso_que_pocos_intentan-{ES|EN|FR}.html`
- `reino-unido*.html` → `requisitos_mascota_reino_unido_desde_latinoamerica_editorial_v2-{ES|EN|FR}.html`
- `chile*.html` → `viaja-chile-argentina-{ES|EN|FR}.html`
- `espana*.html` → `como_viajar_perro_espana_desde_peru_requisitos_final_v2-{ES|EN|FR}.html`
- `australia*.html` → `viajar_mascotas_australia_proceso_mas_estricto_editorial-{ES|EN|FR}.html`
- `canada*.html` → `zoovet_canada_exportacion-{ES|EN|FR}.html`

## Validaciones pasadas

| Verificación | Resultado |
|---|---|
| Bloque `<head>` bit-exact preservado | ✓ 60/60 |
| Canonical sin cambios | ✓ 60/60 |
| Hreflang sin cambios | ✓ 60/60 |
| Tamaño igual o mayor | ✓ 60/60 |
| Enlaces internos rotos | ✓ 0 |
| JSON-LD válido | ✓ 53/60 |
| JSON-LD bit-exact preservado | ✓ 60/60 |

> **Nota:** los 7 archivos con JSON-LD inválido (`eeuu*`, `francia-en`, `mexico*`) ya estaban inválidos en main por HTML embebido en el array `keywords`. Esos quedan pendientes para el siguiente commit (limpieza JSON-LD), preservados bit-exact.

## Distribución por archivo

Promedio: 12.4 enlaces. Rango: 6–16.
Archivos con menos enlaces (texto más corto o ya con enlaces previos): `eeuu*` (6–8), `mexico*` (8–9), `rusia*` (11–12).
Archivos con más enlaces: `australia*` (15–16), `reino-unido*` (15), `singapur*` (13–15), `union-europea*` (13–15).

## Archivos modificados (60 archivos zoopedia + 1 script + 1 log)

Ver listado completo en `docs/INTERLINKS_ZOOPEDIA_LOG_2026-04-30.json`.

## Archivos NO tocados (preservados intactos)

- `zoopedia/index.html`, `index-en.html`, `index-fr.html` (cambios pendientes del usuario, WhatsApp float).
- `about*.html`, `kennels*.html`, `indexnow-payload.json` (cambios pendientes del usuario).
- Ningún otro archivo del proyecto.
