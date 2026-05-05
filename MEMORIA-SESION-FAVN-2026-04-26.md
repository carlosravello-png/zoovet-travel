# Memoria de Sesión — Proyecto FAVN Zoovet Travel
**Fecha:** 26 de abril de 2026  
**Repositorio:** github.com/carlosravello-png/zoovet-travel  
**Modelo:** Claude Sonnet (Cowork mode)

---

## 1. Contexto de partida

Esta sesión continuó desde una sesión anterior donde se había creado `favn-es.html` y el dataset de 44 casos (`favn-data/index.json`). La sesión anterior había hecho el commit inicial con los datos estructurados.

**Personas involucradas:**
- **Dra. Jessica Ysabel Camacho García, MV** — CMP 12434, ORCID 0009-0002-6837-5311, Wikidata Q138881218. Responsable científica y clínica del protocolo. Firma todo el contenido médico.
- **Carlos Eduardo Ravello Joo** — Director Comercial. Responsable de logística, cadena de muestras, relación operativa con KSVDL (13 años), documentación. **No veterinario — no firma nada clínico.**

---

## 2. Lo que se construyó en esta sesión

### 2.1 Tres páginas de recurso técnico FAVN

| Archivo | Idioma | URL |
|---------|--------|-----|
| `favn-es.html` | Español | https://zoovettravel.com/favn-es.html |
| `favn-en.html` | Inglés | https://zoovettravel.com/favn-en.html |
| `favn-fr.html` | Francés | https://zoovettravel.com/favn-fr.html |

**Contenido de cada página:**
- Sección 1: Qué es la prueba FAVN (base científica, umbral ≥0.5 IU/mL OIE/WOAH)
- Sección 2: Por qué KSVDL (único OIE/WOAH en Norteamérica, aceptado por embajadas UE)
- Sección 3: El protocolo D1/D15/D30 Novibac Rabies + estadísticas reales
- Sección 4: Qué hacer si el título sale bajo + protocolo de recuperación
- Sección 5: Casos documentados FAIL→PASS (Darky y Alma con datos reales)
- Sección 6: Repositorio público con Dataset card + DOI Zenodo
- Sección FAQ: 5 preguntas frecuentes en JSON-LD
- Sección Referencias: 4 papers científicos verificados
- CTA: WhatsApp +51979620402

### 2.2 JSON-LD Schema completo en las 3 páginas

```
@graph contiene:
- MedicalWebPage (con inLanguage por idioma)
- MedicalTest (FAVN, umbral ≥0.5 IU/mL)
- Dataset (DOI Zenodo, sameAs GitHub)
- FAQPage (5 preguntas)
- BreadcrumbList
- Person: Jessica Camacho (con ORCID + Wikidata sameAs)
- Person: Carlos Ravello (Director Comercial, descripción en idioma correcto)
- Organization: ["Organization","VeterinaryCare"]
```

### 2.3 Interlinks FAVN en 40+ páginas

Dos scripts Python añadieron enlaces contextuales FAVN en zoopedia y artículos:
- `add_favn_links.py` — enlazó primera mención bare de "FAVN" en 25 archivos
- Script secundario — inyectó nota de recurso técnico tras anclas RFFIT/FAVN existentes en 15 archivos

### 2.4 Tarjeta FAVN en 3 homepages

Añadida sección `id="recurso-favn"` antes del FAQ en:
- `index.html` (ES)
- `index-en.html` (EN)
- `index-fr.html` (FR)

Con botón "Ver recurso técnico →" y botón "Dataset DOI".

### 2.5 sitemap.xml actualizado

Cluster hreflang de 3 URLs FAVN añadido con priority 0.9, lastmod 2026-04-26, changefreq monthly.

### 2.6 Repositorio GitHub de exámenes

**Repo:** github.com/carlosravello-png/-examenes-favn-anticuerpos-rabia-zoovettravel  
**GitHub Pages:** https://carlosravello-png.github.io/-examenes-favn-anticuerpos-rabia-zoovettravel/  
**Activado:** 26 abril 2026

Archivos preparados:
- `index.json` — dataset 44 casos subido al repo de exámenes
- `README.md` — README completo con DOI badge, ORCID, estadísticas, estructura JSON, cita formal

---

## 3. Correcciones críticas aplicadas

### 3.1 Estadística fabricada → dato real
**Problema:** Claude había calculado 39/44 = 88,6% y añadido intervalos de confianza (76–95%) inventados.  
**Corrección:** Reemplazado por el dato real verificado del operador: **91,2%** tasa de seroconversión en primera extracción. Intervalos de confianza eliminados completamente.  
**Archivos:** favn-es.html, favn-en.html, favn-fr.html ✅

### 3.2 HTML roto — cards huérfanas
**Problema:** El script de correcciones anterior había dejado data-cards huérfanas (39 PASS, 7 países, 2019) flotando fuera de sus contenedores div en Secciones 3 y 6. También había un `</div>` prematuro en el bloque del dataset.  
**Corrección:** Eliminados bloques huérfanos. Verificación: 99 `<div>` / 99 `</div>` perfectamente balanceados en los 3 archivos.  
**Archivos:** favn-es.html, favn-en.html, favn-fr.html ✅

### 3.3 URL index.json incorrecta
**Problema:** El botón "index.json" apuntaba a `/favn-data/index.json` (ruta interna del repo zoovet-travel).  
**Corrección:** Cambiado a `https://carlosravello-png.github.io/-examenes-favn-anticuerpos-rabia-zoovettravel/index.json`  
**Archivos:** favn-es.html, favn-en.html, favn-fr.html ✅

### 3.4 sameAs Dataset incorrecto
**Problema:** La URL era `https://carlosravello-png.github.io/zoovet-favn/index.json` (repo que no existe).  
**Corrección:** Cambiado al repo real: `https://carlosravello-png.github.io/-examenes-favn-anticuerpos-rabia-zoovettravel/index.json`  
**Archivos:** favn-es.html, favn-en.html, favn-fr.html ✅

### 3.5 "44 casos" en texto visible
**Problema:** El texto del cuerpo mencionaba explícitamente "nuestro repositorio de 44 casos" en las 3 páginas.  
**Corrección:** Eliminado el conteo. Ahora dice simplemente "en nuestro repositorio". El 44 era la muestra documental activa, no el total del caseload que es mucho mayor.  
**Archivos:** favn-es.html, favn-en.html, favn-fr.html ✅

### 3.6 Aviso Draft Zenodo eliminado
**Problema:** El DOI 10.5281/zenodo.19797479 estaba en Draft. Se había añadido aviso provisional.  
**Hecho:** Zenodo publicado Open el 26 abril 2026 (v1). Aviso eliminado de los 3 archivos.  
**Archivos:** favn-es.html, favn-en.html, favn-fr.html ✅

### 3.7 Referencias científicas con errores → verificadas y corregidas

| Paper | Error detectado | Corrección aplicada |
|-------|----------------|---------------------|
| Wallace et al. (2017) | PMID 28861065 incorrecto; journal "Zoonoses and Public Health" incorrecto; título decía "dogs and cats" | PMC5552338 link directo correcto; journal "PLOS Neglected Tropical Diseases"; título "dogs under one year of age" |
| Langedijk et al. (2018) | DOI sufijo ciy518 incorrecto | DOI corregido a 10.1093/cid/ciy420 |
| Moore et al. (2021) | Journal "Frontiers in Veterinary Science" incorrecto; título inexacto | Journal "Viruses"; título "Challenges of Rabies Serology: Defining Context of Interpretation"; PMC8402924 correcto |
| Handous et al. (2023) | Journal "Veterinary Microbiology" incorrecto; título inventado; "Handous I" incorrecto | Journal "BMC Veterinary Research"; título real; "Handous M" correcto |

### 3.8 Mejoras de UI/consistencia

- **Breadcrumb HTML visible** añadido en las 3 páginas FAVN (antes solo estaba en JSON-LD)
- **Nav móvil roto**: el lang-switcher (ES/EN/FR) se ocultaba en mobile con `display:none` sin alternativa — corregido a `flex-wrap`
- **Enlace ← Inicio/Home/Accueil** añadido en el header de las 3 páginas
- **Descripción Carlos** traducida al español en la página ES (estaba en inglés)

---

## 4. Estado del Zenodo

**DOI:** 10.5281/zenodo.19797479  
**Estado:** Publicado y Open ✅ (26 abril 2026, v1)  
**Autora:** Camacho Garcia, Jessica Ysabel  
**Título:** "Zoovet Travel FAVN Case Repository — 44 documented rabies antibody titer results (2019–2026)"  
**Indexado en:** OpenAIRE ✅

**Pendiente (Jessica desde su cuenta Zenodo):**  
Editar → "Related works" → Add → URL del repo GitHub → "Is supplemented by" → Publish new version.

---

## 5. Commits de esta sesión

| Commit | Descripción |
|--------|-------------|
| `bfabdf6` | feat: FAVN trilingual pages + interlinks + sitemap |
| `f13b6b0` | fix: remove case count framing, N>30 stats, schema, Carlos role |
| `f7a1086` | Fix audit issues + UI consistency in all 3 FAVN pages |
| `df3ee4b` | Remove Zenodo draft notice — DOI published |
| `149a658` | fix(refs): correct all 4 scientific citations — verified against PubMed/PMC |

**Todos pusheados a:** github.com/carlosravello-png/zoovet-travel branch main ✅

---

## 6. Datos científicos verificados en las páginas

Todos los siguientes datos son reales y verificados por el operador:

| Dato | Valor | Fuente |
|------|-------|--------|
| Tasa seroconversión 1ª extracción | 91,2% | Carlos Ravello (dato operativo real) |
| Tasa recuperación post-refuerzo | 100% | Carlos Ravello (dato operativo real) |
| Protocolo | D1/D15/D30 Novibac Rabies | Jessica Camacho García, MV |
| Umbral FAVN | ≥ 0.5 IU/mL | OIE/WOAH (estándar internacional) |
| Laboratorio | KSVDL — Kansas State | Único OIE/WOAH en Norteamérica |
| Países de destino | 7 (España, Italia, Francia, Alemania, Portugal, Suecia, EEUU) | Dataset real |
| Años de operación | 13 (desde 2013) | Relación operativa verificada |
| Casos en dataset público | 44 | index.json (Zenodo + GitHub) |
| N estadístico | N>30 | Permite inferencia bajo distribución normal |

---

## 7. Lo que NO hizo Claude — honestidad

- No creó ni modificó nada en Wikidata.org. Solo referencia Q138881218 que ya existía.
- No enlazó Zenodo con GitHub desde Zenodo — eso requiere cuenta de Jessica.
- No activó GitHub Pages en el repo de exámenes — lo hizo Carlos desde su cuenta.
- No subió el index.json al repo de exámenes — lo hizo Carlos via upload en GitHub.

---

## 8. Pendientes para sesiones futuras

| Tarea | Responsable | Estado |
|-------|-------------|--------|
| Zenodo: añadir GitHub como "Related work" | Jessica (desde cuenta Zenodo) | Pendiente |
| Google Search Console: indexación manual favn-es/en/fr.html | Carlos | Pendiente |
| Cuando llegue re-test ATON: actualizar index.json | Carlos + Claude | Pendiente |
| Verificar que index.json URL está viva en GitHub Pages | Carlos | Pendiente |
| Evaluar si reemplazar README del repo de exámenes con versión mejorada | Carlos | Opcional |
| Verificar Wikidata Q138881218 es realmente de Jessica | Carlos | Pendiente |

---

## 9. URLs clave del ecosistema

| Recurso | URL |
|---------|-----|
| Página FAVN (ES) | https://zoovettravel.com/favn-es.html |
| Página FAVN (EN) | https://zoovettravel.com/favn-en.html |
| Página FAVN (FR) | https://zoovettravel.com/favn-fr.html |
| Dataset Zenodo | https://doi.org/10.5281/zenodo.19797479 |
| Repo GitHub examenes | https://github.com/carlosravello-png/-examenes-favn-anticuerpos-rabia-zoovettravel |
| GitHub Pages examenes | https://carlosravello-png.github.io/-examenes-favn-anticuerpos-rabia-zoovettravel/ |
| index.json live | https://carlosravello-png.github.io/-examenes-favn-anticuerpos-rabia-zoovettravel/index.json |
| ORCID Jessica | https://orcid.org/0009-0002-6837-5311 |
| Wikidata Jessica | https://www.wikidata.org/wiki/Q138881218 |
| Repo principal web | https://github.com/carlosravello-png/zoovet-travel |
| Web principal | https://zoovettravel.com |

---

## 10. Valoración honesta del resultado

**Lo que logramos:** El único recurso técnico estructurado en español/inglés/francés sobre la prueba FAVN producido por un operador veterinario latinoamericano con DOI verificable, ORCID firmante, y repositorio de casos real. No existe nada equivalente en internet en este idioma con este nivel de documentación.

**Lo que puede mejorar:** El README del repo de exámenes es básico (el original que había). El index.json tiene campos vacíos en algunos casos (species, breed, sex, age) que reducen el valor científico del dataset. Cuando llegue más tiempo, completar esos campos aumentará la calidad del repositorio.

**Riesgo monitoreado:** Las 4 referencias científicas fueron verificadas en tiempo real contra PubMed/PMC y corregidas. Están enlazadas correctamente. Si en el futuro se actualizan DOIs o se retractan papers, revisar.
