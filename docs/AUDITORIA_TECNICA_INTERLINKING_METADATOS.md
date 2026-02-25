# Auditoría técnica — Interlinking, metadatos y navegación

**Alcance:** Solo cambios recientes de interlinking, metadatos y navegación. Sin modificación de contenido editorial.  
**Dominio:** https://zoovettravel.com  
**Fecha:** 2026-02-24

---

## 1. Link check (enlaces internos)

**Método:** Verificación de que cada destino de enlace interno (entre `articles/`, `articulos-interes/`, `zoopedia/` y raíz) existe como archivo en el repositorio. No se han ejecutado peticiones HTTP en vivo (no se puede garantizar 200/301 en producción desde el repo).

### 1.1 Enlaces desde articulos-interes/ a articles/

| Origen | Destino | ¿Existe en repo? |
|--------|----------|-------------------|
| Varios (guías) | ../articles/zoovet_art6_microchip-ES.html, zoovet_art6_microchip-FR.html, zoovet_art6_microchip-EN.html | ✅ |
| Varios | ../articles/zoovet_art10_certificado-salud-ES.html, -EN, -FR | ✅ |
| Varios | ../articles/zoovet_art12_expediente-ES.html, -EN, -FR | ✅ |
| Varios | ../articles/zoovet_article3_braquicefalos_ES.html, _EN, _FR | ✅ |
| Varios | ../articles/zoovet_art5_estres-metabolico-ES/EN/FR | ✅ |
| Varios | ../articles/zoovet_article_v2_FR.html, zoovet_art9_*, zoovet_art11_*, zoovet_art8_* | ✅ |

**Resultado:** ✅ **Correcto** — Todos los destinos a `articles/` referenciados desde guías existen en el repo.

### 1.2 Enlaces desde articles/ (internos y a raíz)

Enlaces relativos entre artículos (zoovet_article3_braquicefalos_ES/EN/FR, zoovet_art6_microchip-ES, zoovet_art10_certificado-salud-ES, etc.) y a `../index.html`, `./index.html`, `./index-fr.html`, `./index-en.html`: todos los archivos existen. ✅ **Correcto**

### 1.3 Enlaces desde zoopedia/ a articles/ y raíz

- `zoopedia/eeuu.html` → `../articles/zoovet_art6_microchip-ES.html` (añadido en barrido): archivo existe. ✅  
- Enlaces a `../index.html`, `../index-en.html`, `../index-fr.html`: existen en raíz. ✅

### 1.4 Índices articulos-interes/ (enlaces a guías)

Los tres índices (index.html, index-en.html, index-fr.html) enlazan a guías con rutas relativas tipo `./articulo_*.html`, `./streesmascotas.html`, etc. Todos los nombres coinciden con archivos existentes en el listado del repo. ✅ **Correcto**

### 1.5 Posibles 404 o 301 en producción (no verificables solo con repo)

- **URL con trailing slash:** En `articulos-interes/` y `articles/`, el canonical e hreflang de la versión ES del **índice** usan `https://zoovettravel.com/articulos-interes/` y `https://zoovettravel.com/articles/` (con barra final). Si el servidor no asocia esa ruta a `index.html` (p. ej. sin `DirectoryIndex` o sin regla de reescritura), esa URL podría devolver **404**. Afecta a indexación y hreflang.  
- **Recomendación:** Confirmar en servidor que `/articulos-interes/` y `/articles/` devuelven 200 y sirven el `index.html` correspondiente (o redirigen de forma canónica a una única URL).

---

## 2. Hreflang y x-default (articulos-interes/)

### 2.1 Cobertura

- **78 archivos** con bloques `rel="alternate"` hreflang en `articulos-interes/` (guías en ES/EN/FR).
- Los **3 índices** (index.html, index-en.html, index-fr.html) tienen su propio set: es → `articulos-interes/`, en → `articulos-interes/index-en.html`, fr → `articulos-interes/index-fr.html`, x-default → `articulos-interes/`.

### 2.2 ¿Todas las URLs declaradas existen?

Sí. Cada URL en hreflang (ej. `articulo_certificado_zoosanitario_senasa_trujillo.html`, `-EN.html`, `-FR.html`) corresponde a un archivo presente en el repositorio. No se declaran variantes inexistentes. ✅ **Correcto**

### 2.3 ¿Son canónicas?

Cada página declara `rel="canonical"` a su propia URL (o a la versión con trailing slash en el índice ES). No hay canonicals cruzados entre distintas páginas. ✅ **Correcto**

### 2.4 Sets incompletos

En las guías con tres idiomas revisadas, cada una declara es, en, fr y x-default. No se detectaron sets con idiomas faltantes en archivos que sí tienen versión EN/FR en el repo. ✅ **Correcto**

### 2.5 x-default

- **Índices:** x-default apunta a `https://zoovettravel.com/articulos-interes/` (ES). Coherente con política “x-default = ES”. ✅  
- **Guías:** x-default apunta a la versión ES de la guía (misma URL que hreflang="es"). ✅  

**Riesgo:** Si en producción `https://zoovettravel.com/articulos-interes/` no responde 200 (véase 1.5), los usuarios/motores que sigan x-default podrían recibir 404. ⚠️ **Riesgo menor** (depende de configuración de servidor).

---

## 3. rel="canonical"

### 3.1 Trailing slash

- **articulos-interes/index.html:** canonical = `https://zoovettravel.com/articulos-interes/` (con barra).  
- **articulos-interes/index-en.html:** canonical = `https://zoovettravel.com/articulos-interes/index-en.html` (sin barra).  
- **articulos-interes/index-fr.html:** canonical = `https://zoovettravel.com/articulos-interes/index-fr.html` (sin barra).  
- Resto de páginas (guías, articles, zoopedia): canonical sin trailing slash, salvo los índices ES que usan `.../articles/` y `.../articulos-interes/`.

Inconsistencia controlada: solo los índices en español usan URL con barra como canonical. ✅ Aceptable si el servidor trata esa URL como canónica.

### 3.2 Canonicals cruzados

No. Cada HTML canonicaliza a su propia URL (o a la forma elegida para el índice ES). ✅ **Correcto**

### 3.3 Páginas apuntando a otra por error

No detectado. ✅ **Correcto**

### 3.4 Dominio

No aparece `zoovet-travel.com` ni `http://` en los canonicales revisados. Dominio único: `https://zoovettravel.com`. ✅ **Correcto**

---

## 4. Breadcrumbs (articulos-interes/)

### 4.1 URL del índice (posición 2) en BreadcrumbList JSON-LD

- **Páginas ES:** En los ejemplos revisados, el ítem posición 2 apunta a `https://zoovettravel.com/articulos-interes/` (trailing slash). Coherente con canonical del índice ES. ✅  
- **Páginas EN:** Posición 2 apunta a `https://zoovettravel.com/articulos-interes/index-en.html`. ✅  
- **Páginas FR:** Posición 2 apunta a `https://zoovettravel.com/articulos-interes/index-fr.html`. ✅  

Por idioma, la URL del índice en el breadcrumb es consistente y correcta.

### 4.2 Nombre del ítem (posición 2)

- En **ES** se usa tanto **“Artículos de interés”** como el título largo **“Guías Prácticas para Viajar y Exportar Mascotas Internacionalmente”** (en breadcrumb visual del índice y en algún contexto).
- En **EN:** “Practical Guides for International Pet Travel and Export” (visual) vs “Articles of Interest” (JSON-LD en al menos mascotabodega-EN).
- En **FR:** “Guides pratiques pour voyager et exporter des animaux à l'international” (visual).

Hay **variación del nombre** de la sección entre “Artículos de interés” / “Articles of Interest” y el título largo de la sección. No hay un único nombre unificado por idioma en todo el sitio. ⚠️ **Riesgo menor** — Puede afectar a la presentación de rich results (breadcrumbs) y a la coherencia de señales; no invalida técnicamente el breadcrumb.

### 4.3 Duplicaciones

No se detectan breadcrumbs duplicados ni URLs repetidas de forma errónea en la misma página.

---

## 5. Resumen por severidad

### ✅ Correcto

- Enlaces internos (articulos-interes → articles, zoopedia → articles, articles internos): destinos existen en repo.
- Hreflang en articulos-interes: URLs declaradas existen; sets es/en/fr + x-default completos en archivos con 3 idiomas; x-default apunta a ES.
- Canonical: cada página apunta a sí misma; dominio único https://zoovettravel.com; sin canonicals cruzados.
- Breadcrumb: URL del índice en posición 2 correcta por idioma (articulos-interes/, index-en.html, index-fr.html).

### ⚠️ Riesgo menor

- **Trailing slash en producción:** Las URLs `https://zoovettravel.com/articulos-interes/` y `https://zoovettravel.com/articles/` deben responder 200 (o redirigir de forma canónica). Si no, hreflang y canonical del índice ES pueden generar 404 y dañar indexación/rastreo.
- **Nombre del breadcrumb (articulos-interes):** Uso mixto de “Artículos de interés” vs título largo de la sección según idioma; conviene unificar un único nombre por idioma para consistencia y rich results.

### ❌ Error crítico

- **Ninguno** detectado en el análisis estático del repositorio (enlaces, hreflang, canonical, breadcrumb). Los únicos riesgos que podrían ser críticos dependen del **comportamiento en servidor** (respuesta real de `/articulos-interes/` y `/articles/`).

---

## 6. Conclusión

- **A nivel de código y metadatos en el repo:** Enlaces internos, hreflang, canonical y breadcrumbs están correctos; no hay 404 evidentes por rutas inexistentes, ni canonicals cruzados, ni x-default mal apuntado.
- **Condición para considerar “LISTO PARA MERGE” desde el punto de vista técnico del repo:** Sí, **si en producción se confirma** que:
  1. `https://zoovettravel.com/articulos-interes/` y `https://zoovettravel.com/articles/` responden **200** (o redirigen de forma canónica al mismo recurso que index.html), y  
  2. No hay redirecciones 301 encadenadas que rompan hreflang o canonical.

Si eso está garantizado en el servidor, entonces:

**LISTO PARA MERGE** desde el punto de vista de interlinking, metadatos y navegación auditados.

Si no se ha comprobado lo anterior en el servidor, conviene hacer una comprobación rápida con peticiones HTTP (curl o similar) a esas dos URLs antes de dar por cerrado el merge.
