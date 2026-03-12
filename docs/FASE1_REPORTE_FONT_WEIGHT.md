# FASE 1 — Reporte de análisis: font-weight y Google Fonts

**Fecha:** 2025  
**Alcance:** Todos los HTML del sitio (landing, articles index, artículos científicos).  
**Objetivo:** Identificar pesos de fuente realmente usados vs. pesos cargados; no eliminar nada hasta confirmación.

---

## 1. Resumen por tipo de página

| Grupo de archivos | Fuente(s) cargadas | Pesos cargados | Pesos realmente usados | ¿Pesos cargados sin uso? |
|------------------|--------------------|----------------|------------------------|----------------------------|
| **index.html, index-en.html, index-fr.html** | Montserrat | 300, 400, 600, 700 | 300, 400, 500, 600, 700 | No. Pero **500 se usa y NO está cargado** (síntesis del navegador). |
| **articles/index.html, index-en.html, index-fr.html** | Montserrat | 400, 600, 700 | 400, 600, 700 | No. |
| **zoovet_article_v2*.html, zoovet_article2_*.html** (6 archivos) | IBM Plex Sans + Source Serif 4 | IBM: 400, 600, 700; Source Serif: 400, 600 (normal), 400 (italic) | IBM: 400, 600, 700; Source Serif: 400 (normal), 400 (italic) | **Sí: Source Serif 4 peso 600 (normal) está cargado y no se usa.** |

---

## 2. Detalle por grupo

### 2.1 Landing (index.html, index-en.html, index-fr.html)

**Google Fonts cargado:**
```text
Montserrat:wght@300;400;600;700
```

**Uso real (clases Tailwind / contexto):**

| Peso | Equivalente Tailwind | Dónde se usa |
|------|----------------------|--------------|
| **300** | `font-light` | Logo "ZOOVET" en header; h2 del hero (subtítulo bajo el título principal). |
| **400** | `font-normal` | Texto "Clic para ver" / "Click to view" / "Cliquer pour afficher" en `<summary>`. |
| **500** | `font-medium` | Trust badges (Protocolos Médicos…, Gestión Directa SENASA, Monitoreo…); lista de especialidades (Dermatología, Nutrición, etc.). |
| **600** | `font-semibold` | Botones idioma (ES, EN, FR); botones hero (Ver Servicios / Cotizar Exportación); enlaces "Ver artículos"; nav principal; labels Contacto (Teléfonos, Correo, Horario); títulos de sección (Servicios Médicos, Exportación…); footer (Servicios Médicos, Exportación, Contacto). |
| **700** | `font-bold` | Logo "TRAVEL" en header; h1 hero "ZOOVET TRAVEL"; h2 "Quiénes somos" y "Artículos Científicos en Medicina Veterinaria Aplicada al Transporte Internacional de Mascotas"; footer "ZOOVET TRAVEL". |

**Conclusión landing:**
- **Pesos cargados:** 300, 400, 600, 700. **Todos se usan.**
- **Peso usado pero no cargado:** **500** (`font-medium`). El navegador lo sintetiza a partir de 400/600. Si en Fase 2 se quiere igualar 100% el aspecto sin síntesis, habría que añadir `Montserrat:wght@500` o sustituir `font-medium` por 400/600 según criterio de diseño.

---

### 2.2 Índice de artículos (articles/index.html, index-en.html, index-fr.html)

**Google Fonts cargado:**
```text
Montserrat:wght@400;600;700
```

**Uso real:**

| Peso | Clase / contexto |
|------|-------------------|
| **400** | Body por defecto (sin clase de peso). |
| **600** | `font-semibold`: botones idioma, títulos de tarjetas de artículo, enlace "← Volver al inicio". |
| **700** | `font-bold`: logo "ZOOVET TRAVEL", h1 "Artículos Científicos en Medicina Veterinaria Aplicada al Transporte Internacional de Mascotas" / "Scientific Articles in Applied Veterinary Medicine for International Pet Transport" / "Articles scientifiques en médecine vétérinaire appliquée au transport international d'animaux de compagnie". |

**Conclusión articles index:**
- **Pesos cargados:** 400, 600, 700. **Todos se usan.** No hay pesos cargados sin uso. No se usa 300 ni 500.

---

### 2.3 Artículos científicos (zoovet_article_v2.html, zoovet_article_v2-en.html, zoovet_article_v2_FR.html, zoovet_article2_ES.html, zoovet_article2_EN.html, zoovet_article2_FR.html)

**Google Fonts cargado:**
```text
IBM+Plex+Sans:wght@400;600;700
Source+Serif+4:ital,wght@0,400;0,600;1,400
```
Es decir: IBM Plex Sans 400, 600, 700; Source Serif 4 normal 400, normal 600, italic 400.

**Uso real:**

| Fuente | Peso | Dónde |
|--------|------|--------|
| **Source Serif 4** | 400 (normal) | `body`, párrafos, texto general. |
| **Source Serif 4** | 400 (italic) | `.subtitle`, `.affiliation`, `.abstract-block`, citas, etc. |
| **Source Serif 4** | **600** | **No hay ninguna regla que aplique font-weight: 600 a un elemento con font-family Source Serif 4.** |
| **IBM Plex Sans** | 400 | Por defecto donde la familia es IBM Plex (p. ej. algunos bloques). |
| **IBM Plex Sans** | 600 | `.tech-value`, `.lang-switcher a`, tablas (thead th, caption), enlace "← Volver a Artículos…". |
| **IBM Plex Sans** | 700 | h1, h2, h3, h4, `.authors`, `.fact-title`, `.warn-title`, `.recall-title`, `.fc-label`, numeración de referencias, logo "ZOOVET TRAVEL" en header del artículo. |

**Conclusión artículos:**
- **IBM Plex Sans:** 400, 600, 700 cargados y usados.
- **Source Serif 4:** 400 (normal) y 400 (italic) usados. **El peso 600 (normal) de Source Serif 4 está cargado pero no se usa en ningún selector.**

---

## 3. Respuestas directas al mandato

### 3.1 Pesos utilizados realmente (por familia)

- **Montserrat (landing):** 300, 400, 500, 600, 700 (500 vía Tailwind; no cargado).  
- **Montserrat (articles index):** 400, 600, 700.  
- **IBM Plex Sans (artículos):** 400, 600, 700.  
- **Source Serif 4 (artículos):** 400 (normal), 400 (italic).  

### 3.2 Pesos cargados desde Google Fonts

- **Montserrat (landing):** 300, 400, 600, 700.  
- **Montserrat (articles index):** 400, 600, 700.  
- **IBM Plex Sans:** 400, 600, 700.  
- **Source Serif 4:** 400 (normal), **600 (normal)**, 400 (italic).  

### 3.3 ¿Pesos cargados que NO se usan?

| Archivo(s) | Familia | Peso cargado sin uso | Recomendación (solo informe; no aplicado) |
|------------|---------|----------------------|------------------------------------------|
| zoovet_article_*.html, zoovet_article2_*.html | Source Serif 4 | **600 (normal)** | En Fase 2, al generar CSS estático, se puede quitar `0,600` de la URL de Source Serif 4 para reducir peso de fuente. |

**Nota:** En landing, el peso **500** de Montserrat **sí se usa** (clase `font-medium`) pero **no está cargado**; el navegador lo sintetiza. No es un peso “cargado sin uso”, sino “usado sin cargar”.

---

## 4. Checklist de confirmación antes de Fase 2

- [ ] **Eliminar peso 600 de Source Serif 4** en los 6 HTML de artículos (quitar `0,600` de la URL de Google Fonts y, si se genera CSS estático, no definir font-weight: 600 para Source Serif 4).  
- [ ] **Montserrat 500:** Decidir si en Fase 2 se añade peso 500 a la URL de Montserrat en landing o se reemplaza `font-medium` por 400/600 para no cargar 500.  
- [ ] No se ha eliminado ningún peso en esta fase; se espera tu confirmación sobre los ítems anteriores.

---

*Fin del reporte Fase 1. No se ha modificado ningún archivo.*
