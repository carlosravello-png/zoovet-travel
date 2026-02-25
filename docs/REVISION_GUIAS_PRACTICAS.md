# Revisión Guías Prácticas — Alt text SEO e integridad

**Fecha:** Febrero 2026  
**Alcance:** Solo sección *Guías Prácticas para Viajar y Exportar Mascotas Internacionalmente* (`articulos-interes/`). Zoopedia no incluida.

---

## 1. Imágenes y alt text

| Comprobación | Estado |
|--------------|--------|
| **52 imágenes** en `images/guias/` (guia-*-01.jpg, guia-*-02.jpg por artículo) | ✅ Todas presentes |
| **78 páginas** de artículo (26 × ES/EN/FR) con 2 figuras cada una | ✅ Correcto |
| **Alt vacío** (`alt=""`) | ✅ Ninguno |
| **Ruta** `../images/guias/guia-*.jpg` | ✅ Consistente |
| **Alt por idioma** (ES en .html, EN en -EN.html, FR en -FR.html) | ✅ Descriptivos y orientados a SEO (palabras clave, tema del artículo) |

Los alt actuales son breves, descriptivos y con términos relevantes para búsqueda (transporte internacional, mascotas, vuelo, documento, etc.). No se ha cambiado ningún alt por estar ya alineados con el spec y SEO.

---

## 2. Correcciones realizadas

### Francés — terminología de aviación
- **gatosbodegaavion-FR.html:** "cabane" / "cave" sustituidos por **cabine** / **soute** (cabina de pasajeros / bodega de carga) en título, meta, H1, breadcrumb, cuerpo y schema.
- **transportindeal-FR.html:** "cages de cave" → **cages de soute**.
- **articulo_golden_labrador_cabina_bodega-FR.html:** "finissent en cave" → **finissent en soute**.

### Espacio después de enlaces
En varios artículos EN/FR el texto que seguía a `</a>` iba pegado (sin espacio). Añadido espacio en:
- articulo_certificado_zoosanitario_senasa_trujillo-FR.html, -EN.html
- llevar_mascota_japon_proceso_que_pocos_intentan-FR.html, -EN.html
- requisitos_mascota_reino_unido_desde_latinoamerica_editorial_v2-EN.html, -FR.html
- como_viajar_perro_espana_desde_peru_requisitos_final_v2-FR.html, -EN.html
- articulo_rechazo_aduana_mascota-EN.html, -FR.html
- llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2-EN.html, -FR.html

### Enlace a artículo en idioma correcto
- **como_viajar_perro_espana_desde_peru_requisitos_final_v2-FR.html:** enlace a `zoovet_article_v2.html` sustituido por **zoovet_article_v2_FR.html**.

---

## 3. Índices y enlaces internos

| Comprobación | Estado |
|--------------|--------|
| **index.html** (ES): 26 enlaces a artículos .html | ✅ |
| **index-en.html**: 26 enlaces a artículos -EN.html | ✅ |
| **index-fr.html**: 26 enlaces a artículos -FR.html | ✅ (asumido mismo patrón) |
| Enlaces **../articles/zoovet_art*.html** (serie técnica) | ✅ Destinos existen en `articles/` |

---

## 4. Resumen

- **Alt text:** Revisados; todos con alt descriptivo y orientado a SEO; sin cambios de contenido.
- **Imágenes:** 52 archivos en `images/guias/`; todas las referencias en los 78 HTML son correctas.
- **Francés:** Corregidos cabane/cave → cabine/soute y espacio tras `</a>` donde faltaba.
- **Enlaces:** Corregido 1 enlace FR a artículo en francés; resto coherente con la estructura del sitio.

Si en el futuro añades más artículos a esta sección, conviene: (1) añadir las 2 imágenes con nombres `guia-[slug]-01.jpg` y `guia-[slug]-02.jpg` en `images/guias/`, (2) insertar las figuras con alt en ES/EN/FR según `docs/GUIA_IMAGENES_ESPEC.md`, y (3) actualizar los tres índices (index.html, index-en.html, index-fr.html).
