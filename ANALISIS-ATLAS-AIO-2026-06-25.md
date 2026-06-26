# Análisis de crecimiento y estrategia frente al AI Overview — Zoovet Travel
**Fecha:** 25 de junio de 2026 · **Periodo analizado:** 23 mar – 22 jun 2026 (92 días, Search Console) · **Sitio en línea desde:** 17 feb 2026

---

## 1. Resumen ejecutivo

En tres meses el sitio pasó de **3,3 a 37,2 clics/día** (≈ 14×), con cada mes casi **duplicando** al anterior. El crecimiento es real, sano y acelerado, y lo construyó la **Zoopedia + la autoría veterinaria colegiada (E-E-A-T)** — no el Atlas, que todavía no aparece en los datos porque acaba de desplegarse.

El techo está identificado y es cuantificable: el **AI Overview** se está comiendo el clic. La prueba no es una opinión, es el dato de dispositivo: **escritorio convierte al 0,21% y móvil al 2,16% — diez veces peor en escritorio**, que es donde el AIO pega más fuerte y donde está el **87% de tus impresiones**. No es un problema de contenido ni de posición; es estructural del SERP moderno.

Conclusión: el crecimiento en **alcance** (impresiones, países, consultas) seguirá fuerte. El crecimiento en **clics** depende de una sola palanca — dejar de pelear el clic de enlace azul que no se puede ganar, y pasar a **ser citado dentro del AIO** (GEO) y a explotar los canales donde sí conviertes (móvil, Perú/español, marca, intención transaccional).

---

## 2. Qué se construyó en este lote (jun 2026)

- **Atlas Zoovet Travel** — guía de importación clasificada por país de ORIGEN, una ficha interactiva por destino con tabla de 203 países en JS (por diseño, resistente a la compresión del AIO). **14 destinos × 6 idiomas = 84 fichas nuevas** + 6 índices: EE.UU. (CDC), UE (DG SANTE), China (GACC), Japón (AQS), Reino Unido (APHA), Australia (DAFF), Corea (APQA), Rusia (Rosselkhoznadzor), México (SENASICA), Perú (SENASA), Canadá (CFIA), Emiratos (MOCCAE), Brasil (MAPA), Chile (SAG).
- **Glosario** — 2 términos nuevos trilingües (MERCOSUR, Certificado Veterinário Internacional) + cards en su índice; **0 interlinks rotos** en todo el Atlas tras auditoría quirúrgica.
- **Stack de indexación** — `sitemap.xml` completo (430 URLs, las 14 fichas a 6/6 idiomas), nuevo **`sitemap-recientes.xml`** (75 URLs frescas) enlazado en `robots.txt`, `feed.xml` (RSS) con `lastBuildDate` al día + 4 items nuevos, y `llms.txt` con sección Atlas y línea de citación para las IAs.
- **Desbloqueo de Perplexity** en Cloudflare (de 2 a 34 *Allowed* en minutos) — acceso de crawlers de IA para alimentar la estrategia de citación.

Todo verificado en vivo (Chrome) y en código. JSON-LD por tipo, hreflang recíproco de 7 líneas por ficha, autoría/​revisión por entidad (Carlos / Dra. Jessica Camacho).

---

## 3. Estado actual (datos duros, 92 días)

| Métrica | Valor |
|---|---|
| Clics totales | **1.673** |
| Impresiones totales | **358.733** |
| CTR global | **0,47%** |
| Posición media | ~7,5 |
| Clics/día: primera vs última semana | 3,0 → **41,3** |

**Trayectoria mensual**

| Mes | Clics | Impresiones | Clics/día | MoM (clics/día) |
|---|---|---|---|---|
| Marzo (9 d) | 30 | 8.944 | 3,3 | — |
| Abril | 247 | 54.415 | 8,2 | ×2,47 |
| Mayo | 578 | 139.783 | 18,6 | ×2,26 |
| Junio (22 d) | 818 | 155.591 | 37,2 | ×1,99 |

**Lo que ya funciona (no es el Atlas):** las páginas top son todas `/zoopedia/`, `kennels` y `about`. La autoría rankea como **entidad**: *"jessica ysabel camacho garcía"* posición **2,94**, *"carlos eduardo ravello joo"* **3,03**, *"zoovet travel"* posición 3 (CTR 18%). Y rankeas en **página 1** para consultas regulatorias duras (moccae pet import permit, apha pet travel, china pet import requirements, apqa korea, delegated regulation EU 2026/131). Esa columna de autoridad colegiada + DOI es lo que sostiene a un sitio de 4 meses en esos términos.

---

## 4. Análisis estadístico del crecimiento

**Ajustes sobre la serie diaria de clics (n=92):**

- **Modelo lineal:** +0,449 clics/día, **R² = 0,732**.
- **Modelo exponencial (log-lineal):** crecimiento de **2,82%/día**, **R²(log) = 0,753**, equivalente a **duplicar cada ~25 días**.
- El exponencial ajusta marginalmente mejor, pero el factor mensual ya **decelera** (×2,47 → ×2,26 → ×1,99). Eso descarta un exponencial puro sostenido: el modelo honesto es de **crecimiento amortiguado (logístico)**, no de cohete infinito.

**Proyección de clics/mes** (junio normalizado a 30 días = **1.115 clics/mes** como base). Tres escenarios con factor inicial decreciente:

| Escenario | Supuesto | +3 meses | +6 meses | +12 meses |
|---|---|---|---|---|
| **Conservador** | factor ×1,35, decae rápido | ~1.800 | ~2.200 | ~2.400 |
| **Base (realista)** | factor ×1,55, decae moderado | **~2.800** | **~4.600** | **~6.900** |
| Optimista (techo teórico) | factor ×1,90, decae lento | 5.800 | 20.800 | *(no creíble)* |

> **Lectura honesta:** trabaja con el **escenario Base**. El conservador es el piso si la indexación del Atlas decepciona; el optimista asume que nada satura — y todo satura. La cifra de 12 meses del optimista (>100k) es una extrapolación matemática, **no una predicción**. Cualquier pronóstico a esta edad del sitio tiene barras de error amplias; la utilidad está en el **orden de magnitud y la dirección**, no en el decimal.

**Por qué el Base es plausible:** el Atlas aún no aporta tráfico (no está en los datos). Cuando indexe (lo que disparamos hoy con sitemap-recientes + RSS), añade superficie a miles de long-tails (`[país] pet import requirements` × 6 idiomas), lo que **re-acelera impresiones** y sostiene el clic en los segmentos que convierten.

---

## 5. El impuesto del AI Overview (la variable que pediste)

Tenías razón, y se mide. El CTR global de 0,47% **no es debilidad del contenido** — es el AIO interceptando el clic. La huella digital está en el corte por dispositivo:

| Dispositivo | Impresiones | Clics | CTR | % de impresiones |
|---|---|---|---|---|
| **Ordenador** | 311.577 | 656 | **0,21%** | **86,9%** |
| Móviles | 46.516 | 1.003 | **2,16%** | 13,0% |
| Tablet | 640 | 14 | 2,19% | 0,2% |

El escritorio convierte **10× peor** que el móvil. No hay explicación de contenido para eso: la misma página, el mismo usuario potencial. La diferencia es **dónde aparece el AI Overview** — domina la mitad superior del SERP de escritorio (sobre todo en inglés y en consultas informativas), empuja los enlaces azules hacia abajo y **responde la pregunta antes de que haya clic**. El 87% de tus impresiones vive justo en ese terreno.

**Cuantificación del clic perdido** (sobre las 358.733 impresiones):

| Si el CTR fuera… | Clics esperados | Capturas | Pierdes |
|---|---|---|---|
| 2% (posición 7-8 *sin* AIO) | 7.175 | **23%** | ~5.500 |
| 3,15% (tu tasa en Perú) | 11.300 | **15%** | ~9.600 |

Estás capturando entre el **15% y el 23%** del clic que ese volumen de impresiones rendiría en un SERP pre-AIO. El resto se lo queda el AIO. **Y tienes razón: ese clic no se puede pelear de frente.** Subir de posición 7 a 3 ayuda poco si el AIO sigue arriba; reescribir metas mejora el margen, no el problema estructural.

---

## 6. Estrategia: crecer DENTRO del AIO, no contra él

Si el clic de enlace azul en escritorio está perdido, hay tres frentes reales:

**(a) Ser la cita dentro del AIO (GEO).** El AIO se nutre de fuentes; el objetivo deja de ser "que hagan clic" y pasa a ser "que la respuesta de IA **te cite a ti**". Tus activos para esto ya están: autoría como entidad (Jess pos 2,94), datos primarios verificados con fecha, JSON-LD por tipo, las **tablas interactivas del Atlas** (203 países que el AIO no puede comprimir en dos líneas → te tiene que enlazar para el dato), y el `llms.txt` que guía a las IAs a citarte. El desbloqueo de **Perplexity** y el acceso de crawlers de IA alimentan exactamente esto.

**(b) Mover la mezcla hacia donde SÍ conviertes.** Móvil (2,16%), Perú/español (3,15% — 10× el internacional), marca, y consultas **transaccionales** mid-tail ("llevar mi perro a [país]", "exportar mascota desde Perú") en vez de puramente informativas. El AIO aprieta menos la intención transaccional y el móvil.

**(c) Capitalizar la autoridad ya ganada.** Las consultas de marca y de nombres (Carlos, Jessica) convierten arriba; los backlinks naturales (foros gringos, directorios, Reddit/Yahoo) compondrán confianza de dominio. Eso es base, no humo.

---

## 7. Pronóstico y qué vigilar

- **Impresiones:** muy probablemente crecimiento notable continúa (el Atlas añade superficie). Es la métrica que mejor responderá al lote nuevo.
- **Clics:** crecen en el escenario Base (~2.800/mes en 3 meses), pero la pendiente la decide el frente (a)/(b). Si el AIO citara y el móvil/transaccional crecieran, se acelera; si todo se queda en escritorio informativo, impresiones y clics se **divergen** (impresiones suben, clic se estanca).
- **Métricas clave a vigilar** en el próximo Excel (en 1-2 semanas, cuando el Atlas indexe): aparición de URLs `/atlas/` en "Páginas"; **CTR móvil vs escritorio** (si la brecha se cierra, ganamos terreno); CTR de Perú y de consultas transaccionales; y referidos de IA (Perplexity, ChatGPT) — la señal de que la jugada GEO prende.

---

## 8. Metodología y límites

Datos: exportación oficial de Google Search Console (Web, 3 meses, hasta 22 jun 2026). Regresiones lineal y log-lineal por mínimos cuadrados sobre la serie diaria; factores MoM sobre clics/día normalizados; proyección por crecimiento amortiguado con tres juegos de supuestos explícitos. **Límites:** 92 días es una serie corta; el sitio es joven y pre-estacional; el efecto del Atlas aún no está medido (es prospectivo); los benchmarks de CTR (2% en posición 7-8) son referencias de industria, no de tu nicho exacto. Tómese como **orden de magnitud y dirección estratégica**, no como predicción puntual.

---

*Documento interno · Zoovet Travel · Carlos Eduardo Ravello Joo · Revisión clínica: Dra. Jessica Ysabel Camacho García (CMVP 12434) · 25 jun 2026.*
