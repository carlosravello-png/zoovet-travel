# zoovet-travel — reglas del repositorio

Sitio: **zoovettravel.com** — exportación internacional de mascotas. Trilingüe ES/EN/FR (Atlas en 6 idiomas: es/en/fr/pt/de/it). HTML estático en GitHub Pages tras Cloudflare.
Fundador y propietario: **Carlos E. Ravello Joo**. Cofundadora y revisora: **Dra. Jessica Y. Camacho García** (CMVP 12434).

Estas reglas son obligatorias para cualquier agente que trabaje en este repo.

---

## 1. LICENCIA — CC BY 4.0 en TODA página (regla dura desde 12-jul-2026)

Todo el sitio está bajo **CC BY 4.0 con atribución obligatoria**. **Ninguna página se publica sin licencia: si falta, la página NO está terminada.** Entra en el checklist de creación igual que el `canonical` o el `hreflang`.

Las **5 mutaciones** que lleva cada página nueva:

**1. En el `<head>`, justo después del `<link rel="canonical">`:**

```html
<link rel="license" href="https://creativecommons.org/licenses/by/4.0/">
```

**2. Pie visible con el texto duro**, enlazando a `/licencia.html`, `/licencia-en.html` o `/licencia-fr.html` **según el idioma del archivo** (pt/de/it → EN). Texto ES — **no suavizar en EN/FR**:

> © 2026 Zoovet Travel. Contenido bajo **CC BY 4.0**: puedes copiarlo, traducirlo y publicarlo, incluso con fines comerciales. **La cita es obligatoria.** Sin atribución, la licencia se revoca de forma automática (CC BY 4.0, §6.a) y el uso pasa a ser una infracción de derechos de autor: solicitamos la retirada del contenido y su desindexación. · Diseño y propiedad: Carlos Ravello Joo

**3. En el nodo principal del JSON-LD** (`DefinedTerm`, `Article`/`NewsArticle`/`BlogPosting`, `WebPage`, `CollectionPage`, `Dataset`, `SoftwareApplication`, `Product`…):

```json
"license": "https://creativecommons.org/licenses/by/4.0/",
"copyrightNotice": "© 2026 Zoovet Travel — CC BY 4.0",
"creditText": "Zoovet Travel (C. E. Ravello Joo & J. Y. Camacho García, CMVP 12434)"
```

**4. PROHIBIDO** que aparezca "Todos los derechos reservados" / "All rights reserved" / "Tous droits réservés" fuera de las excepciones de abajo.

**5. PROHIBIDA** cualquier otra licencia CC (`by-nc-nd`, `by-nc`, `by-sa`). **Solo CC BY 4.0.**

### Excepciones tasadas (lo que NO se licencia)

- **Fotos de `/historias/`** → todos los derechos reservados. `ImageObject.license` apunta a `uso-de-imagenes*.html`.
- **Código fuente** de planners / calculadoras / kennels (el *contenido* de esas páginas sí es CC BY).
- **Marca y logo** Zoovet Travel.
- **Los hechos** (fechas, requisitos normativos) no son licenciables: solo la expresión. Se declara explícitamente en `licencia*.html` y en `llms.txt`.
- `licencia*.html` y `uso-de-imagenes*.html` son los **únicos** archivos donde "derechos reservados" es legítimo.

### QA de licencia antes de cada deploy

NUL bytes · cierra `</html>` · **un solo** `rel="license"` y dentro del `<head>` · URL correcta · bloque visible en el pie · enlace al idioma correcto · sin bloque duplicado · sin contradicción ("derechos reservados") · sin licencia CC incompatible · excepción de fotos presente en `/historias/` · JSON-LD parseable con `license` + `creditText` · `<footer>` cuadrado.

⚠️ **Falso negativo conocido:** el regex `"license":"` **no** casa con `"license": "` (con espacio). Contempla ambos.

---

## 2. Verificación total

Nada inventado ni de memoria. Cada dato regulatorio (requisitos, fechas, IDs, DOIs) se verifica **en vivo** contra la fuente primaria, con **URL + fecha explícita** en el contenido ("El 5 de diciembre de 2025 esto cambió: …"). Sin fuente verificada, el dato **no existe**: se marca como pendiente y se pregunta. Aquí se juega lo legal y la reputación.

## 3. Integridad de archivos

- El bug recurrente de este repo es el **truncado**: siempre verificar que el archivo **cierra `</html>`** después de editarlo.
- **Nada de scripts masivos ciegos.** Lotes pequeños con validación (10 → 15 → 20…), 0 errores antes de subir la cuota.
- La verdad del filesystem es `git show HEAD:archivo`. Las lecturas de bash tras una edición pueden venir stale.
- **Nunca `git add -A`**: hay basura sin trackear (`_backup_*`, `_draft-*`, `_template_*`, `original_index.html`, `PREVIEW_*`). Usar `git add -u` + rutas explícitas.

## 4. Schema

- Editar **solo** el bloque `<script type="application/ld+json">`. Nunca el HTML, CSS ni el texto visible.
- Identidades canónicas (un solo `@id` por persona en todo el sitio): Carlos (`carlosravello.com/#person`), Jessica (`jessica-camacho.com/#person`), Víctor Camacho Paz (CMVP 3103, ORCID 0009-0005-8096-9317).
- Autoría por sección: Zoopedia / glosario / articles regulatorios → Carlos autor + Jessica `reviewedBy`. Articles médicos / articulos-interes → Jessica (a veces + Víctor).
- Google solo soporta 3 tipos de artículo: `Article`, `NewsArticle`, `BlogPosting`.
- Sin reseñas falsas ni `aggregateRating` sin reseñas reales.

## 5. Trilingüe y cableado

- Nunca tocar un idioma sin aplicar ES/EN/FR por igual (Atlas: 6 idiomas).
- Toda página nueva del Atlas lleva **card + `ItemList`** en los 6 índices, enlazando a su idioma.
- El `sitemap.xml` **no** se toca incrementalmente: se actualiza **una vez al final del lote**, con cada idioma como `<loc>` separado. Además: `sitemap-recientes.xml`, `feed.xml`, `llms.txt`.
- **"IPATA" = 0** en entregables públicos → usar "agente de carga certificado".
- Los `.js` de las herramientas (calculadora de kennels, planificador) son **intocables**.

## 6. Meta descriptions

Clickeables: dolor + urgencia + solución. **Sin Perú** (el sitio es global). **Sin jerga ni siglas** (GACC, RNATT, AQS…) — el usuario no las conoce.

## 7. Modo de trabajo

Conversar primero, nunca actuar por instinto. Ejecutar solo con acuerdo explícito. Confirmar cada push.
