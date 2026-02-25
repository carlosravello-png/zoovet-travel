# SITEMAP_FINAL_LOG — zoovettravel.com

**Dominio:** https://zoovettravel.com  
**Fecha y hora de generación:** 2026-02-25

---

## 1. Total URLs incluidas por sección

| Sección | Entradas \<url\> en sitemap | Tipo |
|--------|-----------------------------|------|
| Raíz (index) | 1 | Índice con trailing slash |
| articles/ (índice) | 1 | Índice con trailing slash |
| zoopedia/ (índice) | 1 | Índice con trailing slash |
| articulos-interes/ (índice) | 1 | Índice con trailing slash |
| articles/ (artículos científicos) | 12 | Páginas individuales |
| zoopedia/ (fichas destino) | 19 | Páginas individuales |
| articulos-interes/ (guías) | 27 | Páginas individuales |
| **TOTAL** | **62** | |

Cada entrada \<url\> representa un *grupo* de idiomas (ES + EN + FR). No se listan las URLs de idioma por separado; se declaran en los `xhtml:link` dentro de cada \<url\>.

---

## 2. Total grupos ES+EN+FR completos

**62 grupos.** Todos los grupos incluidos en el sitemap tienen las tres versiones de idioma (ES, EN, FR) y corresponden a archivos existentes en el repositorio:

- 4 índices (raíz, articles/, zoopedia/, articulos-interes/)
- 12 artículos científicos en `articles/`
- 19 destinos en `zoopedia/`
- 27 guías en `articulos-interes/`

---

## 3. Total grupos con idiomas faltantes

**0.** No hay grupos con idiomas faltantes. Todos los archivos HTML revisados declaran canonical y hreflang (es, en, fr, x-default) y existen las tres versiones (ES, EN, FR) para cada tema en el repo.

---

## 4. Anomalías de canonical detectadas durante la lectura

- **Ninguna.** En todos los archivos revisados:
  - La URL canónica usa `https://zoovettravel.com` (sin guion: zoovettravel.com).
  - Los índices de sección usan trailing slash en canonical (e.g. `https://zoovettravel.com/articles/`).
  - Los archivos individuales no usan trailing slash.
  - `x-default` apunta siempre a la URL española del grupo.
  - No se encontraron referencias a `http://` ni a `zoovet-travel.com` en canonical/hreflang.

---

## 5. Confirmación: ninguna URL del sitemap bloqueada por robots.txt

- **Allow:** `/`, `/articles/`, `/articulos-interes/`, `/zoopedia/`
- **Disallow:** solo `/docs/` y `/.github/`

Todas las URLs incluidas en el sitemap pertenecen a contenido público (raíz, articles/, articulos-interes/, zoopedia/) y **no están bloqueadas** por robots.txt. La línea `Sitemap:` apunta a `https://zoovettravel.com/sitemap.xml`.

---

## 6. Verificaciones realizadas (PASO 4)

| Verificación | Resultado |
|--------------|-----------|
| 4.1 Ninguna URL con http:// | Cumplido: solo https:// |
| 4.1 Ninguna URL con zoovet-travel.com | Cumplido: solo zoovettravel.com |
| 4.1 Sin URLs duplicadas | Cumplido: una entrada \<url\> por grupo canónico ES |
| 4.1 Solo URLs que existen en el repo | Cumplido: todas referencian archivos .html existentes |
| 4.2 xhtml:link solo para versiones existentes | Cumplido: los 62 grupos tienen ES+EN+FR en repo |
| 4.3 robots.txt no bloquea contenido público | Cumplido |
| 4.4 Sitemap: https://zoovettravel.com/sitemap.xml | Cumplido |

---

## 7. Robots.txt en subcarpetas

No existía ningún `robots.txt` en subcarpetas antes de esta generación. No se ha creado ninguno adicional; solo se mantiene el `/robots.txt` en la raíz del repositorio.

---

*Generado tras recorrido completo de todos los archivos HTML del repositorio y generación de sitemap.xml y robots.txt definitivos para zoovettravel.com.*
