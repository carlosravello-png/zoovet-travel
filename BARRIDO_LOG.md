# BARRIDO QUIRÚRGICO PRE-LANZAMIENTO — zoovettravel.com

**Dominio:** https://zoovettravel.com (sin guión)  
**Fecha del barrido:** 2026-02-24

---

## 1. MAPA DE RELACIONES TEMÁTICAS (para validación del propietario)

### Nivel 1 — articles/ (padres, 12 artículos temáticos)

| Tema | Archivos ES / EN / FR | Contenido central |
|------|----------------------|-------------------|
| Art 1 | zoovet_article_v2, zoovet_article_v2-en, zoovet_article_v2_FR | Serología antirrábica, ventana 30 días, fundamento inmunológico y regulatorio |
| Art 2 | zoovet_article2_ES, zoovet_article2_EN, zoovet_article2_FR | Respuesta humoral post-vacunación antirrábica, RFFIT/FAVN |
| Art 3 | zoovet_article3_braquicefalos_ES/EN/FR | Transporte aéreo de braquicéfalos, BOAS, marco regulatorio |
| Art 4 | zoovet_art4_desparasitacionES/EN/FR | Desparasitación, ventana 24–120 h, normativa UE/UK/AU/NZ |
| Art 5 | zoovet_art5_estres-metabolico-ES/EN/FR | Estrés metabólico, eje intestino–cerebro, psicobióticos |
| Art 6 | zoovet_art6_microchip-ES/EN/FR | Microchip ISO 11784/11785, trazabilidad, Reg. UE 576/2013 |
| Art 7 | zoovet_art7_jetlag-ES/EN/FR | Jet lag, ritmos circadianos en viaje |
| Art 8 | zoovet_art8_hipobaria-ES/EN/FR | Hipobaria, condiciones en bodega de avión |
| Art 9 | zoovet_art9_certificados-vacunacion-ES/EN/FR | Certificados de vacunación, validez para viaje |
| Art 10 | zoovet_art10_certificado-salud-ES/EN/FR | Certificado de salud, ventana de validez |
| Art 11 | zoovet_art11_cuarentena-ES/EN/FR | Cuarentena, requisitos por país |
| Art 12 | zoovet_art12_expediente-ES/EN/FR | Expediente completo, cadena documental, taxonomía del error |

**Índices:** articles/index.html (ES), index-en.html (EN), index-fr.html (FR).

### Nivel 2 — articulos-interes/ (hijos, 26 guías temáticas)

Guías por tema (cada una puede tener ES, EN, FR): certificado zoosanitario SENASA Trujillo, cuánto tiempo antes del viaje, vacuna antirrábica para viajar, rechazo en aduana, golden/labrador cabina o bodega, viajar con pug, bulldog francés, mascota en bodega, gatos en bodega, mascotas sin papeles, viaje animal geriátrico, estrés en mascotas, RNATT y viajes, veterinarios en Trujillo, dónde tramitar en Trujillo, qué es el microchip y dónde tramitarlo, transporte en vuelo, viajar Chile/Argentina, Canadá exportación, España desde Perú, gato a EE.UU. desde Perú, Reino Unido desde Latinoamérica, Japón (proceso estricto), Australia (proceso más estricto), alimentación antes/durante vuelo.

**Relación temática con nivel 1:** La guía «certificado zoosanitario SENASA Trujillo» se vincula a Art 10 (certificado de salud), Art 12 (expediente). Otras guías por destino se vinculan a fichas Zoopedia del mismo destino (España, EE.UU., Reino Unido, Japón, Australia, Canadá, Chile, etc.).

### Nivel 3 — zoopedia/ (19 destinos)

Fichas por país/región: eeuu, japon, eau, espana, union-europea, francia, reino-unido, italia, australia, nueva-zelanda, canada, chile, brasil, china, corea-del-sur, india, rusia, singapur, sudafrica. Cada destino tiene .html (ES), -en.html (EN), -fr.html (FR).

**Relación temática con nivel 1:** EE.UU. (microchip, certificado, RNATT) → Art 6, Art 10, Art 2/Art 1; destinos con cuarentena → Art 11; certificado de salud por destino → Art 10; desparasitación → Art 4.

---

## 2. ERRORES TÉCNICOS ENCONTRADOS Y CORREGIDOS

| Archivo | Problema | Corrección |
|---------|----------|------------|
| articles/zoovet_article2_EN.html | Lang-switcher sin enlace EN (solo ES y FR) | Añadido enlace a zoovet_article2_EN.html con class="active" |
| articles/zoovet_article3_braquicefalos_EN.html | Lang-switcher sin enlace EN (solo ES y FR) | Añadido enlace a zoovet_article3_braquicefalos_EN.html con class="active" |
| articles/zoovet_art4_desparasitacionFR.html | Lang-switcher sin enlace FR; breadcrumb posición 2 apuntaba a index.html | Añadido enlace FR con class="active"; breadcrumb posición 2 cambiado a index-fr.html |

**Verificación dominio:** No se encontraron ocurrencias de `zoovet-travel.com` ni `http://zoovettravel` en el repositorio. Todos los canonical y hreflang revisados usan `https://zoovettravel.com`.

---

## 3. NODOS PERSON (EEAT) EN ARTÍCULOS CIENTÍFICOS

- **articles/:** Todos los artículos científicos revisados tienen `@type: ScholarlyArticle` (o `["ScholarlyArticle","Article"]` en article_v2). Los nodos Person en JSON-LD incluyen name, jobTitle y hasCredential (CMVP). No se añadieron ni modificaron datos de autor; los existentes se consideran completos para este barrido.

---

## 4. ERRORES DE IDIOMA EN UI CORREGIDOS

- **articles/zoovet_art4_desparasitacionFR.html:** El breadcrumb visual en posición 2 enlazaba a `index.html` (índice ES). Corregido a `index-fr.html` para que el índice en la miga de pan corresponda al idioma del archivo (FR).

---

## 5. ERRORES EDITORIALES DETECTADOS (sin corregir, para revisión del propietario)

- Ninguno registrado en este barrido. No se ha revisado el contenido editorial de los cuerpos de texto; solo metadatos, breadcrumbs, lang-switcher y enlaces internos.

---

## 6. ENLACES INTERNOS AÑADIDOS EN ESTE BARRIDO

| Archivo origen | Anchor text | Archivo destino |
|----------------|-------------|-----------------|
| articulos-interes/articulo_certificado_zoosanitario_senasa_trujillo.html | certificado de salud | ../articles/zoovet_art10_certificado-salud-ES.html |
| zoopedia/eeuu.html | ISO 11784/11785 | ../articles/zoovet_art6_microchip-ES.html |

**Nota:** La guía del certificado zoosanitario ya contenía un enlace a `zoovet_art12_expediente-ES.html` (expediente de exportación). No se duplicó. El interlinking entre artículos (nivel 1) ya está documentado en `articles/INTERLINKING-REPORTE.md`; en este barrido solo se añadieron enlaces cruzados entre niveles (guía → artículo, ficha → artículo).

---

## 7. SITEMAP.XML

- **Estado:** No existe `sitemap.xml` en el repositorio.
- **URLs que deberían incluirse en un futuro sitemap:** Todas las URLs canónicas de index (raíz, articles/, articulos-interes/, zoopedia/), más cada artículo, guía y ficha en sus variantes ES/EN/FR según corresponda. Lista completa derivable de los archivos HTML en las tres carpetas.

---

## 8. ANOMALÍAS QUE REQUIEREN REVISIÓN MANUAL

1. **articulos-interes/ — x-default e índice ES:** En index-en e index-fr, el hreflang `x-default` y el `hreflang="es"` apuntan a `https://zoovettravel.com/articulos-interes/` (sin `index.html`). Si el servidor no sirve `index.html` por defecto en esa ruta, podría haber 404 en la versión ES desde el selector de idioma. Confirmar comportamiento en producción.

2. **articles/ — índice ES:** El canonical del índice en español es `https://zoovettravel.com/articles/`. Verificar que el servidor resuelva `/articles/` a `index.html`.

3. **Consistencia breadcrumb JSON-LD en articulos-interes:** En algunos archivos el nombre del ítem 2 del breadcrumb es "Artículos de interés" y en otros "Guías Prácticas para Viajar y Exportar Mascotas…". Validar si se desea unificar el nombre de la sección en el JSON-LD.

---

## 9. RESUMEN EJECUTIVO

- **Archivos revisados:** Estructura de canonical, hreflang, lang, JSON-LD y breadcrumb en muestras de articles/, articulos-interes/ y zoopedia/; búsqueda global de dominio incorrecto.
- **Correcciones aplicadas:** 3 (lang-switcher EN/FR en 3 archivos, breadcrumb índice FR en 1 archivo).
- **Enlaces internos añadidos:** 2 (1 desde guía → artículo científico, 1 desde ficha Zoopedia → artículo científico).
- **Contenido editorial:** No modificado.
- **Dominio:** Sin guión; todas las URLs canónicas y hreflang usan `https://zoovettravel.com`.
