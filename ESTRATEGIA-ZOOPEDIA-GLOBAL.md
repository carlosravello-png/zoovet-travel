# Estrategia — Zoopedia Global (2 en 1: cazar leads + cazar banners)

> Documento maestro de estrategia para zoovettravel.com
> Fecha: 24 de junio de 2026 · Autor: Carlos Ravello + Cowork (Claude Opus)
> Estado: PLAN ACORDADO. No toca el sitio en vivo. Es el plano de construcción.
> Regla de oro del proyecto: **conversar y acordar antes de ejecutar; nada por instinto.**

---

## 0. Resumen en una frase

Construir una **Zoopedia Global** nueva —origen-agnóstica, en 4 idiomas (ES/EN/FR/pt-BR)— que **no reemplaza** la zoopedia peruana actual, organizada con un **eje distinto** (clasificación/elegibilidad, no procedimiento) para no canibalizar, con **dos capas fusionadas (2 en 1)**: un *Larousse* de referencia que **caza banners** (autoridad + tráfico + cita en IA) y una *Hub* de recomendaciones que **caza leads** (motor origen→destino + captura), desplegada **por olas de calidad verificada**, sin inundar el sitio.

---

## 1. Punto de partida (lo que ya sabemos, con datos)

### 1.1 El sitio crece fuerte, pero el CTR lo come el AI Overview
- 92 días (23 mar – 22 jun 2026): **358.733 impresiones, 1.673 clics, CTR 0,47%**, posición media ~7,8.
- Crecimiento real: clics 366 → 1.307 entre 1ª y 2ª mitad; impresiones 89k → 270k.
- **Escritorio 0,21% CTR vs móvil 2,16%** (10x). **EE.UU.: 146k impresiones, 0,09% CTR** — el AI Overview se queda el clic.
- Diagnóstico: el problema **no es de impresiones, es de CTR**, y la causa raíz es el AI Overview en escritorio/EE.UU./inglés.

### 1.2 El plan de CTR/AIO ya está ejecutado y FUNCIONA
- Meta descriptions "imán" + bloque `.aio-answer` citable tras el H1 + `FAQPage` schema → ejecutado en todas las fichas críticas.
- **Prueba ciega (24 jun, Google incógnito):** zoovettravel.com **citado dentro del AI Overview**:
  - China → **citado [1] + enlace azul #1** (Google levantó su redacción casi literal). Dominante.
  - UE (perro) → citado 4 veces.
  - España → citado, pero petittravelers.com lidera. Contestado.
  - Gato a Europa (query **sin** origen) → **ausente**. ← evidencia del techo.

### 1.3 El hallazgo que define esta estrategia: "desde Perú" es moat Y techo
- Las queries **con** "from Peru" → citado, a menudo #1. Es el moat.
- Las queries **genéricas sin origen** (mundiales) → ausente; o peor, rankea con muchas impresiones mundiales pero el snippet "from Peru" **repele al clicker no-peruano** → mata el CTR global. Es el techo.
- Para el negocio Perú, "desde Perú" está bien. Para el **hub mundial**, es el límite. La salida no es cirugía de metas, es **arquitectura**: capturar global y **enrutar** por origen.

### 1.4 Brasil: el hueco está vacío (revisado en vivo, pt-BR)
- "requisitos para levar cachorro para a Europa do Brasil" → rankean **blogs de viaje y aerolíneas** (Euro Dicas, Apure Guria, Quase Nômade —de 2019—, Azul, LATAM, Air France) + gov.br. **Ningún sitio técnico/veterinario.**
- "quais países exigem teste de titulação de raiva" (la pregunta binaria) → **laboratorios** que venden el examen + PDFs de gov.br desactualizados. **Nadie posee la tabla de clasificación.**
- **No apareció AI Overview** (con asterisco: testeado desde IP Perú; un brasileño podría ver otra cosa). El campo orgánico está flojo pase lo que pase.
- El sitio **no tiene ni una página en portugués** hoy. Brasil ya da 9.622 impresiones a sus páginas ES/EN.

### 1.5 Google NO trata a Zoovet como sitio nuevo (el riesgo de volumen es bajo)
- **343 páginas indexadas** / 40 sin indexar. 168 URLs de glosario absorbidas **en una noche, en una sola pasada de sitemap**.
- Crawleo intenso y favorable. → soltar el cluster nuevo **no** es un riesgo de indexación. El único riesgo real es **dato equivocado**, y la velocidad de indexación lo **amplifica** (un error se publica y se cita en horas).

### 1.6 Viento a favor GEO (no solo Google)
- AI Crawl Control (24h): **ChatGPT-User 1.84k requests**, OpenAI 1.9k, Anthropic (Claude-SearchBot) +77,78%, Bing +50%, Google 51.
- Zoovet **ya alimenta respuestas de ChatGPT**, no solo el AIO de Google. El cluster mundial **multiplica esa superficie de cita**.
- ⚠️ **Revisar:** Perplexity 0 y Common Crawl (CCBot) 0 requests permitidos. Si están **bloqueados** en Cloudflare, se cierran puertas de cita que queremos abiertas. Acción: confirmar que los crawlers de IA que queremos que nos citen **no estén bloqueados**.

### 1.7 Prueba viva de demanda fuera de Perú
- Ayer escribió una viajera **Polonia → China**. Es exactamente el lead origen→destino, origen no-peruano, que el hub está diseñado para cazar. La demanda no es teórica.

---

## 2. El Norte estratégico (el porqué de todo)

Cada decisión debe reforzar una de las 3 entidades y, por ellas, construir la empresa:
1. **Carlos Ravello** (`carlosravello.com/#person`) — autor/fundador.
2. **Dra. Jessica Camacho García** (`jessica-camacho.com/#person`) — revisión médica/fundadora.
3. **Zoovet Travel** (`zoovettravel.com/#organization`) — la empresa, hacia su propio Knowledge Panel.

**Meta de negocio (doble):**
- **Negocio activo en Perú:** captar y atender clientes de exportación con origen Perú (lo que se hace hoy).
- **Negocio pasivo mundial:** ingresos mientras duermes vía SEO + GEO + CTR + CTA → **banners por URL** en el contenido global y **leads** enrutados a una futura red de vets partner.
- **Hub mundial (Sudamérica primero):** captar el cliente Paraguay→Francia, Colombia→USA, Polonia→China… y, sin perder jamás Perú, vender ese lead a una veterinaria eficiente.
- **Aquí y ahora:** que la **marca Zoovet Travel sea conocida en el mundo.**

---

## 3. La decisión: Zoopedia Global (nombre a confirmar)

### 3.1 Qué es y qué NO es
- **Es** un cluster nuevo, origen-agnóstico, en 4 idiomas, con eje de **clasificación/elegibilidad**.
- **NO es** un reemplazo de la zoopedia peruana (esa rankea, se queda intacta como recomendación nacional).
- **NO es** una traducción ni una versión "sin Perú" de las fichas (eso sería duplicado).

### 3.2 El eje que las separa (anti-canibalización, lo más importante)
| | Zoopedia Perú (actual) | Zoopedia Global (nueva) |
|---|---|---|
| Eje | **Procedimiento** | **Clasificación / elegibilidad** |
| Pregunta que responde | "¿Cómo llevo mi mascota a X **desde Perú**?" | "¿**Mi país** necesita la prueba, sí o no? ¿está listado?" |
| Forma | Calendario, pasos, SENASA, D1/D15/D30 | Tablas de clasificación país × destino, binario |
| Intención de búsqueda | Procedimental, alta intención Perú | Informacional/elegibilidad, mundial |
| Idiomas | ES/EN/FR | ES/EN/FR/**pt-BR** |
| Se toca? | **NO** (intacta) | Nueva |

Como la intención y la forma son distintas, **no es contenido duplicado**: Google las trata como piezas complementarias. La Global **enlaza hacia abajo** a las fichas Perú → les pasa autoridad → les sube posición (palanca de CTR).

### 3.3 Por qué hreflang protege a Perú
El sitio ya usa hreflang (`es/en/fr/x-default`). Sumando **pt-BR con hreflang recíproco**, Google sirve cada idioma a su audiencia: el peruano sigue recibiendo la versión ES "desde Perú", el brasileño la pt-BR. **No se reemplazan; viven en SERPs de idiomas distintos.** Riesgo de "desaparecer de Perú" = bajo y evitable.

---

## 4. Arquitectura 2 en 1 (la clave del documento)

La Zoopedia Global fusiona dos capas en cada página:

### 4.1 Capa A — El "Larousse" (caza BANNERS)
Corpus enciclopédico de referencia/clasificación. Su trabajo: **autoridad + tráfico mundial + carnada de cita en IA (AIO y ChatGPT)**.
- **Página madre:** "Clasificación mundial: qué países necesitan la prueba de anticuerpos para viajar con mascota (2026)" — tabla maestra país × destino × ¿listado/exento o no?
- **Páginas hijas por destino-elegibilidad:** una por destino, cubriendo **todos los orígenes**:
  - UE — listados vs no listados (quién necesita el RNATT) bajo Reglamento 2026/636.
  - EE.UU. — clasificación CDC (alto riesgo de rabia canina o no).
  - China — GACC designado / no designado.
  - Reino Unido, Australia, Nueva Zelanda, Japón, Canadá, Singapur… (por olas).
- Monetización: **banners por URL** aquí. El visitante mundial de hoy (no-Perú) no es un lead que Zoovet pueda atender todavía → monetizarlo con banner es lo correcto.

### 4.2 Capa B — La "Hub" (caza LEADS)
Motor de recomendación / enrutado origen→destino. Su trabajo: **convertir al visitante en lead** y mandarlo a quien lo pueda atender.
- **Decisión:** el usuario elige **origen + destino** → recibe el binario (¿necesita prueba?) + regla clave + enlace a la ficha profunda + **CTA**.
- **Enrutado del lead por origen:**
  - Origen **Perú / andino cercano** → **Zoovet directo** (WhatsApp, servicio que ya existe).
  - Origen **lejano** (Polonia, etc.) → captura de contacto ahora; **vet partner + comisión** cuando exista la red.
- Aquí convierte el lead Polonia→China.

### 4.3 Cómo se fusionan (el "2 en 1" real)
Cada página hija de destino **educa (Larousse) y captura (Hub) a la vez**: arriba el bloque citable + la tabla de clasificación (gana cita en IA y tráfico → banners), y embebido el widget/CTA de enrutado por origen (gana el lead). Una sola URL trabaja para los dos objetivos.

### 4.4 Mapa de monetización (cada cosa en su sitio)
- **Banners:** en el Larousse / páginas globales. **NUNCA** sobre el CTA de lead de las fichas de conversión Perú.
- **Leads:** vía la Hub (Perú directo; resto → captura/partner).
- Regla dura: el banner no debe tapar ni competir con el CTA del lead de alto valor.

---

## 5. Idiomas y prioridad Brasil

- Idiomas del cluster: **ES, EN, FR y pt-BR (nuevo).**
- **pt-BR es prioridad** porque el hueco está vacío (sección 1.4) y Brasil son ~215M de personas.
- ⚠️ **Cambio de método:** la regla actual es "trilingüe ES/EN/FR". Este cluster introduce **pt-BR como 4º idioma**. Hay que actualizar la regla a "cuadrilingüe" para el cluster global (a confirmar y anotar en el método).
- pt-BR **no es traducción del ES**: los hechos de origen de Brasil difieren (Brasil **sí tiene labs aprobados** por la UE en casa — Tecsa, Tecpar; trámite **MAPA/Vigiagro/CVI**, no SENASA). Contenido genuinamente nuevo.

---

## 6. Protocolo de datos: TRIPLE VERIFICACIÓN (no negociable)

Una tabla mundial = cientos de afirmaciones verificables. Una celda mal = error justo donde el rigor es el activo (trampa Argentina/Chile/México: están en categoría OPUESTA a Perú/Brasil/Colombia para la UE).

1. **Claude redacta prompts fuertes y específicos** para **Grok** y **Perplexity** (ambas con búsqueda en vivo) → listan el dato de forma independiente.
2. Las dos IAs devuelven listas.
3. **Cruce Grok vs Perplexity:** coincidencia = prior fuerte (no prueba); **discrepancia = bandera roja** → revisión manual profunda de esa celda.
4. **Claude verifica TODO contra la FUENTE PRIMARIA oficial** (anexo real en EUR-Lex, lista CDC, GACC, SENASA…), abriendo y leyendo la fuente, **y re-verifica lo que trajeron las IAs** (nunca pegar a ciegas).

**Reglas duras:**
- La **fuente primaria es el único árbitro final.** Las IAs aceleran y triangulan, **no sustituyen**. Sin fuente verificada + fecha → el dato NO existe (se marca pendiente).
- Las dos IAs pueden coincidir y estar **ambas mal** (fuente stale, norma superada: citan 577/2013 en vez de 2026/636, o malatribuyen una URL). Por eso la re-verificación **lee el anexo real, no el resumen de la IA**.
- Toda celda publicada lleva **URL + fecha de verificación + "sujeto a cambios"**.

---

## 7. Reglas duras del método (heredadas, aplican a todo)

1. **Verificación total.** Nada inventado. Todo dato regulatorio en vivo, con URL + fecha explícita en el contenido.
2. **Solo el bloque seguro al editar fichas existentes.** El cluster nuevo es contenido nuevo, pero las fichas Perú **no se tocan** salvo enlaces.
3. **Fuente de verdad del filesystem:** herramienta Read y `git show HEAD:archivo` (el mount de bash da lecturas stale).
4. **Identidades canónicas:** un `@id` por persona (Carlos `carlosravello.com/#person`, Jessica `jessica-camacho.com/#person`). Autoría por sección.
5. **IPATA = 0** en entregables públicos → "agente de carga certificado".
6. **Integridad:** cada archivo cierra `</html>` + JSON-LD válido tras cada cambio (bug de truncado conocido).
7. **Idiomas en paralelo:** nunca publicar un idioma sin los demás (ahora 4).
8. **Honestidad comercial:** sin reseñas falsas; no prometer servicios que aún no se pueden cumplir (origen no-Perú = captura/partner, no promesa de servicio directo).

---

## 8. Estructura técnica propuesta (a afinar)

- **Home del cluster:** `/zoopedia-global/` (o el nombre que se decida) con su `index` en 4 idiomas.
- **Páginas hijas:** `/zoopedia-global/ue-elegibilidad.html`, `.../eeuu-clasificacion-cdc.html`, `.../china-gacc.html`, + `-en/-fr/-pt`.
- **Schema por página:** `TechArticle` o `Article` + `FAQPage` + `BreadcrumbList` + `Organization` + (donde aplique) `Dataset`/`Table`. Autor Carlos, revisión Jessica.
- **hreflang recíproco** entre las 4 versiones + `x-default`.
- **Enlace interno** desde cada página hija → la ficha Perú profunda correspondiente (pasa autoridad).
- **Integración al publicar:** sitemap.xml + feed correspondiente + llms.txt + cards en home/sección.
- **CSS:** usar `assets/tailwind.css` precompilado (clases existentes) o estilo inline; no romper `.js` de herramientas.

---

## 9. Roadmap por olas (sin inundar)

Estructura y publicación a toda velocidad; **dato verificado por celda = la única compuerta lenta.**

- **Ola 0 — Cimientos:** decidir nombre + URL; diseñar plantilla de página madre + widget de enrutado; definir columnas de la tabla de clasificación; montar el pipeline de triple verificación; revisar bloqueo de crawlers en Cloudflare. Boceto de la madre aprobado por Carlos.
- **Ola 1 — UE + China (4 idiomas):**
  - UE = más tráfico + norma fresca (2026/636).
  - China = lead Polonia→China probado + ya eres #1 citado ahí.
  - Cada página: triple-verificada, 2 en 1, publicada, medida.
- **Ola 2 — EE.UU. (CDC) + Reino Unido.** EE.UU. = 44% de impresiones, lead premium.
- **Ola 3 — Australia, Nueva Zelanda, Japón, Canadá, Singapur…**
- **Ola N — Página madre completa** (tabla mundial consolidada) cuando haya suficientes hijas.

Cada ola se mide antes de lanzar la siguiente.

---

## 10. KPIs y medición

- **Tráfico:** impresiones/clics del cluster global (filtro por carpeta en GSC).
- **CTR:** por página, comparando 28 días antes/después de cada ola.
- **Cita en IA:** revisión manual (prueba ciega) en Google AIO **y** en ChatGPT/Perplexity por query objetivo.
- **Leads:** número y origen (rastrear especialmente **no-Perú**, como Polonia→China).
- **Banners:** inventario listo + RPM por geo cuando se active.
- **Palanca:** subida de posición de las fichas Perú por el enlazado interno.

---

## 11. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Canibalización mismo idioma (global-EN vs ficha-EN) | Eje distinto (clasificación vs procedimiento) + enlazado interno + hreflang |
| "Desaparecer de Perú" | hreflang recíproco + no tocar fichas Perú (riesgo bajo, ya argumentado) |
| Dato regulatorio equivocado a escala | **Triple verificación** + URL/fecha/"sujeto a cambios" por celda |
| Contenido fino/duplicado ignorado por Google | Calidad por olas + eje y hechos de origen genuinamente distintos |
| Banner daña la confianza/conversión | Banners solo en global; CTA de lead limpio en fichas Perú |
| Red de vets partner aún no existe | Capturar contacto ahora, monetizar lead vía partner después; no prometer servicio que no se cumple |
| Crawlers de IA bloqueados (Perplexity/CCBot) | Revisar y abrir en Cloudflare los crawlers que queremos que nos citen |

---

## 12. Decisiones abiertas (para Carlos)

1. **Nombre del cluster:** "Zoopedia Global" / "Atlas Zoovet" / "Mapa Mundial de Exportación de Mascotas" / "Zoovet World Pet Travel Atlas". (Recomendación: "Zoopedia Global" — claro, hereda la marca Zoopedia, escala.)
2. **URL base:** `/zoopedia-global/` u otra.
3. **Ola 1:** ¿UE + China juntas, o solo UE primero?
4. **Banners:** ¿AdSense, red display, o venta directa? ¿Cuándo se activa?
5. **Red de vets partner:** ¿cuándo arranca el reclutamiento (define cuándo el enrutado deja de ser captura y pasa a venta de lead)?
6. **Método:** confirmar el paso a **cuadrilingüe** (sumar pt-BR) para el cluster global.

---

## 13. Próximo paso conversado

Aprobar (o ajustar) este documento → definir **Ola 0** (nombre + URL + boceto de la página madre + columnas de la tabla) → redactar el **primer par de prompts de triple verificación** (UE, listados/no listados 2026/636) → verificar → construir la primera página hija 2-en-1 en los 4 idiomas.

**Nada se construye en el sitio hasta acordarlo.**
