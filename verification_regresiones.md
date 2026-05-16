### C12 — enlaces internos `.html` a archivos inexistentes

El check **C12** sigue en **FAIL** con **5** combinaciones (origen `href` → ruta resuelta), típicamente plantillas o destinos pendientes:

1. `articles/zoovet_art16_sag-chile-ES.html` → `../glosario/desparasitacion.html` (no existe `glosario/desparasitacion.html`).
2. `glosario/_template_termino.html` → placeholders `{SLUG}.html`, `{SLUG}-en.html`, `{SLUG}-fr.html` (intencionalmente no son archivos reales).
3. `zoopedia/index-en.html` → `favn-en.html` relativo (se resuelve a `zoopedia/favn-en.html`, que no existe en disco; el favn real está en la raíz como `favn-en.html`).

### HTML inválido detectado en lectura manual (no cubierto por A1–A3)

- **`favn-es.html` ~L1026**: dentro de un mismo `<p>` hay un `<a href="...zoovet_art15_mpi...">` que **no se cierra** antes de abrir otro `<a href="/zoopedia/union-europea.html">` — anidación / cierre incorrecto de `<a>` (inválido en HTML5).

### Nota editorial (no falla A4, pero afecta UX)

- En **`favn-es.html`** el texto visible **«Alemania»** enlaza con **`href="/zoopedia/eeuu.html"`** (p. ej. L1026 y L1546). No hay `href` a `alemania.html` (cumple A4), pero el rotulado del enlace es engañoso frente a la URL real.
