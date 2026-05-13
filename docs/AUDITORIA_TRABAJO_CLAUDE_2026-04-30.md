# Auditoría de trabajo Claude — Sesión 2026-04-30
**Para:** otra instancia de Claude / revisor humano
**Objetivo:** verificar que no se rompió nada del SEO crítico en producción
**Sitio:** zoovettravel.com (DA 2.6, top 3 nacional Perú, trilingüe ES/EN/FR)

---

## Contexto

Sitio estático HTML trilingüe con JSON-LD complejo (Schema.org `@graph` con `TechArticle`, `FAQPage`, `BreadcrumbList`, `Organization`, sameAs a Wikidata/gob.pe/CDC/MAFF/Rosselkhoznadzor). Está posicionando bien — cualquier cambio invasivo es riesgo. La instrucción explícita del propietario fue **no tocar el JSON-LD a nivel de @graph, schemas, sameAs, DOIs, etc.** Solo correcciones quirúrgicas localizadas.

---

## Trabajo realizado en orden cronológico

### Pieza 1 — Diagnóstico (sin cambios, solo análisis)
Se detectaron 3 problemas que afectaban indexación:
1. **Interlinking editorial mínimo** en fichas zoopedia: cada ficha recibía solo 3-4 enlaces internos únicos (índice de sección + selector de idioma). 87 de 213 páginas eran cuasi-huérfanas. Esto explica el patrón "Rastreado, no indexado" que GSC reporta.
2. **6 URLs físicamente existentes pero ausentes del sitemap.xml**: `cargo.html`, `cargo-en.html`, `cargo-fr.html`, `mexico-cdc-dog-rabies-classification-2026.html`, `mexico-clasificacion-cdc-rabia-canina-2026.html`, `mexique-classification-cdc-rage-canine-2026.html`.
3. **HTML inválido embebido**: 3 archivos con `<a href>` dentro de `<title>` (HTML inválido) y 10 archivos con `<a href>` dentro del array `keywords` del JSON-LD (JSON inválido).

Diagnóstico secundario detectado pero NO atacado en esta sesión:
- 192/207 URLs en sitemap con `lastmod = 2026-03-27` (publicación masiva en bloque, mala señal para sitios DA bajo).
- 3 entradas de `articles/zoovet_art4_desparasitacion*` en sitemap sin hreflang (bug histórico pre-existente).
- Inconsistencia de nomenclatura URLs (`-en` vs `_EN` vs `EN`). NO se tocan nombres por preservar posicionamiento existente.

---

### Pieza 2 — Interlinking editorial trilingüe en zoopedia
**Commit:** `bec913f` (merge de branch `seo-fix-2026-04-30` a `main`)
**Push:** confirmado en `origin/main`
**Archivos modificados:** 60 (20 países × 3 idiomas)
**Enlaces nuevos:** 744

#### Países afectados (20)
australia, brasil, canada, chile, china, corea-del-sur, eau, eeuu, espana, francia, india, italia, japon, mexico, nueva-zelanda, reino-unido, rusia, singapur, sudafrica, union-europea.

#### Reglas aplicadas (heredadas de `articles/INTERLINKING-REPORTE.md` y `docs/INTERLINKS_KENNELS_LOG.md`)
- **Solo enlaza sobre texto editorial existente.** No se inventa contenido. Si el término no aparece en el cuerpo del artículo, no se enlaza.
- **Anchor en el idioma del artículo** (descriptivo, no genérico).
- **Máximo 2 enlaces internos por párrafo** (`<p>`, `<li>`, `<div class="caso">`, `<summary>`).
- **Máximo 2 enlaces al mismo destino por archivo.**
- **Máximo 1 enlace por categoría técnica** (microchip, vacuna, RNATT, cuarentena, etc.) por archivo.
- **Zonas EXCLUIDAS** del reemplazo: `<head>`, `<title>`, `<script>`, `<style>`, `<a>` (no anidamos), `<h1-h6>`, `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`, `<th>`, comentarios HTML `<!-- -->`.
- **Cada enlace nuevo apunta a archivo del mismo idioma** (ES → ES, EN → EN, FR → FR).

#### Tipos de enlace insertados
1. **Técnicos** (a `articles/`): microchip ISO/microchip, RNATT, vacuna antirrábica, certificado de salud, cuarentena, expediente sanitario, tratamientos antiparasitarios, razas braquicéfalas, jet lag/desincronización circadiana.
2. **Cross-país** (a otra ficha zoopedia del mismo idioma): cuando una ficha menciona otro país, se enlaza a su ficha.
3. **Artículo práctico por país** (a `articulos-interes/`): solo en la ficha del país correspondiente. Aplica a 7 países: USA, Japón, UK, Chile, España, Australia, Canadá.

#### Cómo se ejecutó
- Script: `scripts/interlink_zoopedia.py` (Python 3, regex puro, sin BeautifulSoup para evitar reformateo del HTML).
- Estrategia: identificar zonas excluidas con regex multiline, buscar primer match seguro fuera de esas zonas, insertar `<a href="..." class="text-[#0C789E] underline">TEXTO</a>` reemplazando solo el rango `[start:end]` del match.
- Log JSON con cada enlace: `docs/INTERLINKS_ZOOPEDIA_LOG_2026-04-30.json` (744 entradas).
- Resumen humano: `docs/RESUMEN_INTERLINKING_ZOOPEDIA_2026-04-30.md`.

#### Validaciones que pasaron antes del push
- ✓ Bloque `<head>` byte-a-byte preservado en los 60 archivos.
- ✓ Canonical sin cambios en los 60.
- ✓ Hreflang sin cambios en los 60.
- ✓ JSON-LD bit-exact preservado en los 60 (los 7 con JSON-LD pre-inválido siguen igual de inválidos, no fueron empeorados).
- ✓ `<title>` sin alteración en los 60.
- ✓ Meta description, keywords, robots, OG, Twitter sin cambios.
- ✓ H1, H2, H3 sin cambios.
- ✓ Tablas sin cambios.
- ✓ 0 enlaces rotos (cada `href` apunta a archivo existente).
- ✓ Tamaño de cada archivo ≥ original (no se perdió contenido).

---

### Pieza 3 — Añadir 6 URLs faltantes a sitemap.xml
**Commit:** posterior a `bec913f` (lo hizo el usuario tras correr los comandos)
**Push:** confirmado, GSC reportó "Correcto, 213 páginas descubiertas"
**Archivo modificado:** solo `sitemap.xml`
**URLs nuevas:** 6

#### URLs añadidas
1. `https://zoovettravel.com/cargo.html` (priority 0.85, lastmod 2026-04-30)
2. `https://zoovettravel.com/cargo-en.html` (priority 0.85, lastmod 2026-04-30)
3. `https://zoovettravel.com/cargo-fr.html` (priority 0.85, lastmod 2026-04-30)
4. `https://zoovettravel.com/articulos-interes/mexico-clasificacion-cdc-rabia-canina-2026.html` (priority 0.8, lastmod 2026-04-30)
5. `https://zoovettravel.com/articulos-interes/mexico-cdc-dog-rabies-classification-2026.html` (priority 0.8, lastmod 2026-04-30)
6. `https://zoovettravel.com/articulos-interes/mexique-classification-cdc-rage-canine-2026.html` (priority 0.8, lastmod 2026-04-30)

#### Validaciones que pasaron antes del push
- ✓ XML válido (parseable por `xml.etree.ElementTree`).
- ✓ Inserción bit-exact: el archivo original es prefijo + sufijo idéntico al nuevo. Solo se añadieron 4110 bytes en la posición justo antes de `</urlset>`.
- ✓ 0 entradas existentes alteradas.
- ✓ Cada nueva URL apunta a archivo físicamente existente.
- ✓ Cada nueva URL tiene 4 hreflang (`es`, `en`, `fr`, `x-default`).
- ✓ Total `<url>`: 207 → 213.
- ✓ Antes de añadir, las 6 páginas se auditaron individualmente: canonical correcto, hreflang completo, robots `index,follow`, contenido sustancial (3500-5200 palabras).

---

### Pieza 4 — Limpieza HTML embebido en `<title>` y JSON-LD `keywords`
**Commit:** PENDIENTE de push al momento de generar este documento
**Archivos modificados:** 13
**Cambio por archivo:** -93 bytes exactos (eliminación de un wrapper `<a>` específico)

#### Patrón eliminado en cada archivo
```
<a href="/favn-XX.html" style="font-weight:600;color:#b45309;text-decoration:underline;">FAVN</a>
```
(donde `XX` es `es`, `en` o `fr`)

#### Patrón resultante
```
FAVN
```
(texto plano que conserva la palabra "FAVN" donde estaba el enlace)

#### Archivos modificados (13)

**3 con `<a>` dentro de `<title>` (rompía el title HTML):**
1. `articles/zoovet_article2_ES.html`
2. `articles/zoovet_article2_EN.html`
3. `articles/zoovet_article2_FR.html`

**10 con `<a>` dentro del array `keywords` del JSON-LD (rompía el parser JSON):**
4. `articulos-interes/mexico-cdc-dog-rabies-classification-2026.html`
5. `articulos-interes/mexico-clasificacion-cdc-rabia-canina-2026.html`
6. `articulos-interes/mexique-classification-cdc-rage-canine-2026.html`
7. `zoopedia/eeuu.html`
8. `zoopedia/eeuu-en.html`
9. `zoopedia/eeuu-fr.html`
10. `zoopedia/francia-en.html`
11. `zoopedia/mexico.html`
12. `zoopedia/mexico-en.html`
13. `zoopedia/mexico-fr.html`

#### Cómo se ejecutó
- Reemplazo de string exacto (no regex): `str.replace(patrón, "FAVN")`.
- Aplicado a 3 variantes según idioma del enlace (`/favn-es.html`, `/favn-en.html`, `/favn-fr.html`).
- Sin tocar nada más del archivo.

#### Validaciones que pasaron localmente
- ✓ JSON-LD ahora **válido** (parsea con `json.loads`) en los 10 archivos. Antes: inválido. Después: válido.
- ✓ `<title>` sin tags HTML residuales en los 3 archivos.
- ✓ Diff bit-exact: cada archivo cambió exactamente -93 bytes, en una sola posición.
- ✓ Canonical, hreflang, OG, Twitter, meta description, meta keywords, meta robots: **idénticos al original**.
- ✓ Resto del JSON-LD (`@context`, `@graph`, `@type`, `@id`, `headline`, `description`, `datePublished`, `dateModified`, `inLanguage`, `author`, `publisher`, `mainEntityOfPage`, `about`, `sameAs`, `isPartOf`, `image`, `Question`/`Answer`, `BreadcrumbList`, `Organization`, `ContactPoint`): **bit-exact preservado**.

---

## Cómo auditar todo el trabajo

### Auditoría general (un solo comando)
Ejecutar el script `scripts/auditar_trabajo_2026-04-30.py` (ver más abajo). Imprime un reporte con todas las verificaciones.

### Auditoría manual paso a paso

#### A. Verificar JSON-LD válido en todo el sitio (debería estarlo ahora)
```bash
python3 -c "
import re, json, glob
total, broken = 0, []
for f in glob.glob('**/*.html', recursive=True):
    if '.git/' in f: continue
    with open(f, 'r', encoding='utf-8') as fh: c = fh.read()
    for m in re.finditer(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', c, re.DOTALL|re.IGNORECASE):
        total += 1
        try: json.loads(m.group(1))
        except Exception as e: broken.append((f, str(e)[:100]))
print(f'Total bloques JSON-LD: {total}')
print(f'Inválidos: {len(broken)}')
for f, e in broken: print(f'  {f}: {e}')
"
```
**Esperado:** 0 bloques inválidos (después del último push).

#### B. Verificar JSON-LD bit-exact preservado en los 60 zoopedia (interlinking)
Compara contra el commit anterior al merge de interlinking (`9388b3e`):
```bash
python3 -c "
import re, subprocess, glob
ROOT = '.'
for f in sorted(glob.glob('zoopedia/*.html')):
    if f.endswith(('index.html','index-en.html','index-fr.html')): continue
    cur = open(f).read()
    orig = subprocess.check_output(['git','show','9388b3e:'+f]).decode()
    cur_jsonld = re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', cur, re.DOTALL|re.IGNORECASE)
    orig_jsonld = re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', orig, re.DOTALL|re.IGNORECASE)
    if cur_jsonld != orig_jsonld:
        print(f'CAMBIÓ: {f}')
"
```
**Esperado:** 0 archivos zoopedia con JSON-LD modificado en el commit de interlinking. Si aparece alguno, ahí hay un bug.

> **Nota importante para el auditor**: el commit de **limpieza** (Pieza 4) sí toca JSON-LD en 10 archivos zoopedia/articulos-interes (eliminando el `<a>` de `keywords`). Esa es la única modificación legítima a JSON-LD. Para auditar esa pieza:

#### C. Verificar que la limpieza solo eliminó el patrón `<a href="/favn-XX.html"...>FAVN</a>` y nada más
```bash
python3 << 'EOF'
import re, subprocess
PATRONES = [
    '<a href="/favn-es.html" style="font-weight:600;color:#b45309;text-decoration:underline;">FAVN</a>',
    '<a href="/favn-en.html" style="font-weight:600;color:#b45309;text-decoration:underline;">FAVN</a>',
    '<a href="/favn-fr.html" style="font-weight:600;color:#b45309;text-decoration:underline;">FAVN</a>',
]
ARCHIVOS_TITLE = [
    'articles/zoovet_article2_ES.html',
    'articles/zoovet_article2_EN.html',
    'articles/zoovet_article2_FR.html',
]
ARCHIVOS_JSONLD = [
    'articulos-interes/mexico-cdc-dog-rabies-classification-2026.html',
    'articulos-interes/mexico-clasificacion-cdc-rabia-canina-2026.html',
    'articulos-interes/mexique-classification-cdc-rage-canine-2026.html',
    'zoopedia/eeuu.html', 'zoopedia/eeuu-en.html', 'zoopedia/eeuu-fr.html',
    'zoopedia/francia-en.html',
    'zoopedia/mexico.html', 'zoopedia/mexico-en.html', 'zoopedia/mexico-fr.html',
]
# Comparar cada archivo contra el commit ANTES del de limpieza (HEAD~1)
for f in ARCHIVOS_TITLE + ARCHIVOS_JSONLD:
    cur = open(f).read()
    orig = subprocess.check_output(['git','show','HEAD~1:'+f]).decode()
    # Aplicar el reemplazo virtual
    expected = orig
    for p in PATRONES:
        expected = expected.replace(p, 'FAVN')
    if expected == cur:
        print(f'OK   {f}: solo se eliminó el patrón')
    else:
        print(f'BAD  {f}: hay otras diferencias además del patrón eliminado')
EOF
```
**Esperado:** los 13 archivos como `OK`. Si alguno sale `BAD`, hay un cambio adicional no documentado.

#### D. Verificar que canonical, hreflang, OG, Twitter no cambiaron en NINGÚN archivo modificado
```bash
python3 << 'EOF'
import re, subprocess, glob
# Conjunto completo de archivos modificados hoy (60 zoopedia + 13 limpieza, con superposición en los 7 con JSON-LD)
MODIFIED = set(subprocess.check_output(['git','log','--since=2026-04-30','--name-only','--pretty=format:']).decode().split())
MODIFIED = [f for f in MODIFIED if f.endswith('.html')]

problems = []
for f in MODIFIED:
    if not f.startswith(('zoopedia/','articles/','articulos-interes/')): continue
    try:
        cur = open(f).read()
        orig = subprocess.check_output(['git','show','9388b3e:'+f], stderr=subprocess.DEVNULL).decode()
    except: continue
    # canonical
    co = re.findall(r'<link[^>]+rel="canonical"[^>]+>', orig)
    cc = re.findall(r'<link[^>]+rel="canonical"[^>]+>', cur)
    if co != cc: problems.append(f'{f}: canonical')
    # hreflang
    ho = re.findall(r'<link[^>]+hreflang="[^"]+"[^>]+>', orig)
    hc = re.findall(r'<link[^>]+hreflang="[^"]+"[^>]+>', cur)
    if ho != hc: problems.append(f'{f}: hreflang')
    # og: y twitter:
    og_o = re.findall(r'<meta[^>]+property="og:[^"]+"[^>]*>', orig)
    og_c = re.findall(r'<meta[^>]+property="og:[^"]+"[^>]*>', cur)
    if og_o != og_c: problems.append(f'{f}: og')
    tw_o = re.findall(r'<meta[^>]+name="twitter:[^"]+"[^>]*>', orig)
    tw_c = re.findall(r'<meta[^>]+name="twitter:[^"]+"[^>]*>', cur)
    if tw_o != tw_c: problems.append(f'{f}: twitter')
print(f'Archivos auditados: {len(MODIFIED)}')
print(f'Problemas detectados: {len(problems)}')
for p in problems: print(' ', p)
EOF
```
**Esperado:** 0 problemas. Cualquier cambio en canonical/hreflang/OG/Twitter es bandera roja.

#### E. Auditoría específica para JSON-LD: verificar que el `@graph` está intacto (excepto el patrón limpiado)
Para cada uno de los 10 archivos de la Pieza 4, verificar que cada nodo del `@graph` siga igual:

```bash
python3 << 'EOF'
import re, json, subprocess
ARCHIVOS = [
    'articulos-interes/mexico-cdc-dog-rabies-classification-2026.html',
    'articulos-interes/mexico-clasificacion-cdc-rabia-canina-2026.html',
    'articulos-interes/mexique-classification-cdc-rage-canine-2026.html',
    'zoopedia/eeuu.html', 'zoopedia/eeuu-en.html', 'zoopedia/eeuu-fr.html',
    'zoopedia/francia-en.html',
    'zoopedia/mexico.html', 'zoopedia/mexico-en.html', 'zoopedia/mexico-fr.html',
]

# CAMPOS QUE DEBEN PRESERVARSE BIT-EXACT en cada nodo del @graph:
# - @type, @id, @context
# - headline, description, name (excepto si tenían el patrón limpiado dentro)
# - datePublished, dateModified, inLanguage
# - author (incluyendo Person, jobTitle, worksFor)
# - publisher (incluyendo Organization, logo)
# - sameAs (Wikidata, gob.pe, fsvps.gov.ru, cdc.gov, etc.) — CRÍTICO
# - mainEntityOfPage
# - about[]
# - isPartOf
# - image
# - keywords (excepto strings que tenían el patrón limpiado)
# - itemListElement (BreadcrumbList)
# - mainEntity (FAQPage Question/Answer)
# - contactPoint (Organization)

PATRONES = [
    '<a href="/favn-es.html" style="font-weight:600;color:#b45309;text-decoration:underline;">FAVN</a>',
    '<a href="/favn-en.html" style="font-weight:600;color:#b45309;text-decoration:underline;">FAVN</a>',
    '<a href="/favn-fr.html" style="font-weight:600;color:#b45309;text-decoration:underline;">FAVN</a>',
]

problems = []
for f in ARCHIVOS:
    # Versión actual
    cur = open(f).read()
    cur_blocks = re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', cur, re.DOTALL|re.IGNORECASE)
    
    # Versión "esperada": aplicar el patrón al HEAD~1 (el commit anterior)
    try:
        orig = subprocess.check_output(['git','show','HEAD~1:'+f], stderr=subprocess.DEVNULL).decode()
    except:
        problems.append(f'{f}: no se puede leer HEAD~1')
        continue
    expected = orig
    for p in PATRONES:
        expected = expected.replace(p, 'FAVN')
    expected_blocks = re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', expected, re.DOTALL|re.IGNORECASE)
    
    if cur_blocks != expected_blocks:
        problems.append(f'{f}: JSON-LD no coincide con la transformación esperada')
        continue
    
    # Verificar que el JSON-LD actual parsea
    for blk in cur_blocks:
        try:
            data = json.loads(blk)
        except Exception as e:
            problems.append(f'{f}: JSON-LD inválido: {str(e)[:80]}')
            continue
        # Verificar que tiene @graph y los nodos esperados
        if '@graph' in data:
            types = [n.get('@type') for n in data['@graph']]
            if 'Organization' not in types:
                problems.append(f'{f}: falta Organization en @graph')

print(f'Archivos auditados: {len(ARCHIVOS)}')
print(f'Problemas: {len(problems)}')
for p in problems: print(' ', p)
EOF
```
**Esperado:** 0 problemas. JSON-LD válido y estructura preservada en los 10.

#### F. Sitemap: verificar inserción bit-exact
```bash
python3 << 'EOF'
import subprocess
cur = open('sitemap.xml').read()
# El sitemap antes de añadir las 6 URLs estaba en el commit `bec913f` o anterior (depende de cuándo se hizo el commit del sitemap)
# Si el commit del sitemap fue el inmediatamente posterior a bec913f, usar HEAD~1 o HEAD~2 según corresponda
import sys
# Buscar el commit que añadió las URLs en sitemap.xml
log = subprocess.check_output(['git','log','--pretty=format:%H %s','--','sitemap.xml']).decode()
print('Commits que tocaron sitemap.xml:')
print(log[:500])
EOF
```
Luego comparar el sitemap actual contra el commit inmediatamente anterior al de las 6 URLs:
```bash
git diff <hash_anterior> HEAD -- sitemap.xml | head -80
```
**Esperado:** solo líneas añadidas (`>`), 0 líneas eliminadas (`<`). El XML debe seguir parseando.

#### G. Verificar que el interlinking no rompió ningún archivo
```bash
python3 << 'EOF'
import re, glob
problems = []
for f in glob.glob('zoopedia/*.html'):
    if any(f.endswith(x) for x in ('index.html','index-en.html','index-fr.html')): continue
    c = open(f).read()
    # 1. Cada <a> tiene cierre </a>
    open_a = len(re.findall(r'<a\b', c))
    close_a = len(re.findall(r'</a>', c))
    if open_a != close_a:
        problems.append(f'{f}: open={open_a} close={close_a}')
    # 2. No hay <a> anidado
    for m in re.finditer(r'<a\b[^>]*>([^<]*<a)', c):
        problems.append(f'{f}: <a> anidado en posición {m.start()}')
    # 3. Cada href interno apunta a archivo existente
    for m in re.finditer(r'<a[^>]+href="((?!http|#|mailto|tel|javascript)[^"]+)"', c):
        from urllib.parse import urlparse
        from pathlib import Path
        href = m.group(1)
        target = (Path(f).parent / urlparse(href).path).resolve()
        if not target.exists():
            problems.append(f'{f}: enlace roto → {href}')
print(f'Problemas: {len(problems)}')
for p in problems[:30]: print(' ', p)
EOF
```
**Esperado:** 0 problemas.

---

## Cosas críticas a NO romper (lista de control para el auditor)

Si la auditoría encuentra cualquiera de estas cosas alteradas en los archivos modificados, **es un bug que requiere revert**:

### En el `<head>` de cada archivo modificado
- `<link rel="canonical" href="...">` — debe apuntar al propio archivo
- `<link rel="alternate" hreflang="es|en|fr|x-default" href="...">` — los 4 deben estar
- `<meta name="robots" content="index,follow,...">` — index,follow debe estar
- `<meta name="description">`, `<meta name="keywords">` — contenido idéntico al original
- `<meta property="og:type|og:title|og:description|og:url|og:image">` — todos idénticos
- `<meta name="twitter:card|twitter:title|twitter:description|twitter:image">` — todos idénticos
- `<title>` — solo cambia en los 3 archivos `zoovet_article2_*` (eliminación del `<a>`); en los demás, idéntico

### En el JSON-LD de cada archivo modificado
- `@context: "https://schema.org"`
- `@graph` con todos sus nodos (TechArticle, FAQPage, BreadcrumbList, Organization)
- `@type` y `@id` de cada nodo
- `headline`, `description`, `image`, `datePublished`, `dateModified`, `inLanguage`
- `author` completo (Person, jobTitle, worksFor)
- `publisher` completo (Organization, logo)
- `mainEntityOfPage`
- `about[]` con todos sus `Thing` y sus `sameAs` (Wikidata, gob.pe, fsvps.gov.ru, cdc.gov, etc.) — **NUNCA tocar los sameAs**
- `keywords[]` — solo se tocó la string que contenía `<a href="/favn-XX.html"...>FAVN</a>`, ahora dice `FAVN` plano. Las demás strings del array, idénticas.
- `isPartOf`
- En `FAQPage`: cada `Question` y `Answer` con texto íntegro
- En `BreadcrumbList`: cada `ListItem` con `position`, `name`, `item`
- En `Organization`: `contactPoint[]` completo con teléfonos, áreas, idiomas

### En el body editorial de cada archivo modificado
- H1, H2, H3, H4, H5, H6 — idénticos
- Tablas (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`, `<th>`) — idénticas
- Texto editorial — idéntico, salvo que se le insertó `<a href>...</a>` envolviendo palabras existentes (no se cambió ninguna palabra)
- URLs externas (a `https://fsvps.gov.ru/`, `https://www.gob.pe/senasa`, `https://www.cdc.gov/`, etc.) — idénticas
- Estructura de `<section>`, `<article>`, `<div class="caso">`, `<div class="bloque-...">`, `<div class="alerta-...">` — idéntica

---

## Lo que NO se hizo en esta sesión (para evitar confusiones)

- **No se tocaron nombres de archivo.** Toda URL existente sigue apuntando al mismo archivo.
- **No se tocaron robots.txt, ni .htaccess.**
- **No se modificaron páginas raíz** (`index.html`, `about.html`, `cargo.html`, `kennels.html`, etc.) salvo:
   - Las 3 `zoovet_article2_*.html` en `articles/` (limpieza title)
   - Páginas en `articulos-interes/`, `zoopedia/` y `articles/` modificadas según pieza
- **No se ejecutó interlinking en `articles/` ni en `articulos-interes/`.** Solo en `zoopedia/`.
- **No se redistribuyó `lastmod` en sitemap** por fechas reales (sigue 192 URLs con misma fecha).
- **No se tocaron los 3 entries de `zoovet_art4_desparasitacion*` en sitemap** que carecen de hreflang (bug histórico, dejado como está).
- **No se tocó ningún sameAs, DOI, ni referencia Wikidata** — instrucción explícita del propietario.

---

## Archivos que el propietario tenía pendientes en working directory (NO TOCADOS)

Antes de la sesión, había 10 archivos modificados sin commitear (botón flotante WhatsApp + nav serología):
- `about.html`, `about-en.html`, `about-fr.html`
- `kennels.html`, `kennels-en.html`, `kennels-fr.html`
- `zoopedia/index.html`, `zoopedia/index-en.html`, `zoopedia/index-fr.html`
- `indexnow-payload.json`

**Importante:** durante el trabajo de interlinking, mi script restauró los 3 `zoopedia/index*.html` desde HEAD para empezar limpio. Esto borró los cambios pendientes del propietario en esos 3 archivos, que él recuperó manualmente desde el Timeline de Cursor antes del push. Los demás 7 archivos del WhatsApp float fueron commiteados por el propietario en el mismo merge.

---

## Resumen final

| Pieza | Archivos | Líneas + | Líneas - | Estado |
|---|---|---|---|---|
| Interlinking zoopedia | 60 | +584 | −584 (sustituciones) | ✓ Pushed |
| Sitemap +6 URLs | 1 | +60 | −0 | ✓ Pushed |
| Limpieza JSON-LD/title | 13 | +13 | −13 (1 línea por archivo) | ⏳ Pending push |
| **Total** | **74 únicos** | | | |

Si el auditor encuentra cualquier discrepancia con lo descrito en este documento, **detener despliegues y consultar antes de revertir**. La política del propietario es preservar SEO actual a toda costa.
