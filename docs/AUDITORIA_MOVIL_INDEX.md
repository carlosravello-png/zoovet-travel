# Auditoría y optimización móvil — index.html

**Principio:** Solo corregir lo que falla. No tocar lo que funciona.

**Nota:** La auditoría se ha realizado por análisis del código y estructura (Tailwind, media queries, dimensiones). La verificación visual en Chrome DevTools con los 4 viewports (375, 390, 412, 360px) debe completarse manualmente para confirmar.

---

## FASE 0 — TABLA DE AUDITORÍA INICIAL (index.html)

| # | Problema | ¿Existe? | Elemento causante / Notas |
|---|----------|----------|----------------------------|
| 1 | **Scroll horizontal** | Por confirmar en dispositivo | No hay en el código un elemento con ancho fijo >100vw. Contenedores usan `max-w-6xl`, `w-full`, `px-4`. La barra de 7 ítems está oculta en móvil. Si aparece scroll, inspeccionar Trust badges o tablas. |
| 2 | **Barra de navegación 7 ítems** | No aplica en 375–412px | La barra tiene `display: none` en `max-width: 767px` (clase `.nav-bar-desktop`). En los 4 tamaños móviles se muestra el menú hamburguesa, no la barra. |
| 3 | **Hero: texto legible, CTAs ≥44px, apilado** | Posible: altura táctil justa | Botones hero usan `py-2.5 sm:py-3` (~40px). Recomendación: asegurar min-height 44px en móvil. Texto y apilado en columna ya correctos; hero con min-height 360px y hero-inner. |
| 4 | **Grid 3 columnas de fotos (~299)** | Sí, imágenes pequeñas a 375px | `grid grid-cols-3 gap-4` sin breakpoint: a 375px cada imagen ~117px. Valor visual limitado. Propuesta: `grid-cols-2` en móvil. |
| 5 | **Galería historias (historia-01 a 06)** | No | `grid-cols-2 lg:grid-cols-3`; en móvil 2 columnas. No hay carrusel; scroll es el de la página. Navegación con dedo = scroll vertical normal. |
| 6 | **Contacto: área táctil ≥44px** | Posible | En `#contacto` los enlaces son `block` o inline. `tel:` y enlaces WhatsApp no tienen `min-height` explícito. Footer ya tiene `footer a { min-height: 44px }` en móvil; la sección Contacto no. |
| 7 | **Mapa / iframe** | No | No hay iframe de mapa; solo enlace "Ver en Google Maps". |
| 8 | **Footer: iconos sociales ≥44px** | No | Ya tienen `min-w-[44px] min-h-[44px]` y `p-3`. Correcto. |
| 9 | **Tipografía <14px en body** | Sí | Trust badges: `text-[10px]`. Barra de 7 ítems tiene `text-[9px]` pero está oculta en móvil. En móvil visible, texto muy pequeño solo en Trust badges. |
| 10 | **Formulario / inputs font-size 16px** | No aplica | No hay formulario ni inputs en index.html. |

---

## FASE 1 — CORRECCIONES APLICADAS (solo lo que falla)

Se aplicarán únicamente:

1. **Hero CTAs:** Área táctil mínima 44px en móvil (clase o estilo solo en breakpoint móvil).
2. **Trust badges:** Aumentar tamaño de fuente en móvil a ≥14px (o al menos 12px) solo en el breakpoint.
3. **Contacto:** Aumentar área táctil de enlaces (tel + WhatsApp) a mínimo 44px en móvil.
4. **Grid de 3 fotos (experiencia):** Pasar a 2 columnas en móvil para mejorar valor visual.
5. **Scroll horizontal:** No se añade `overflow-x: hidden` al body (podría afectar al drawer). Si tras pruebas aparece overflow, se tratará el elemento concreto.

No se toca: JS del drawer, safe-area footer, hreflang/canonical/JSON-LD, orden de secciones, estilos desktop sin breakpoint.

---

## LISTA DE CORRECCIONES APLICADAS (Fase 1)

| # | Elemento exacto | Corrección |
|---|------------------|------------|
| 1 | Contenedor de los 3 botones CTA del hero | Añadida clase `hero-cta`. En `@media (max-width: 767px)` regla `.hero-cta a { min-height: 44px; display: inline-flex; align-items: center; justify-content: center; }` para área táctil ≥44px. |
| 2 | Sección Trust Badges | Añadida clase `trust-badges` a la section. En móvil `.trust-badges span { font-size: 0.875rem; }` (14px) para legibilidad. |
| 3 | Sección #contacto | En `@media (max-width: 767px)` regla `#contacto a { min-height: 44px; display: inline-flex; align-items: center; padding: 0.5rem 0; }` para tel y WhatsApp. |
| 4 | Grid de 3 fotos (experiencia exp-01/02/03) | Cambio de `grid-cols-3` a `grid-cols-2 sm:grid-cols-3` para 2 columnas en móvil y mejor tamaño de imagen. |

**No modificado:** barra de 7 ítems (oculta en móvil), galería historias (ya 2 cols), footer (ya 44px), mapa (no hay iframe), formularios (no hay), JS del drawer, canonical/hreflang/JSON-LD.

---

## FASE 2 — OTROS ARCHIVOS HTML (articles, articulos-interes, zoopedia)

**Sistema:** index.html usa Tailwind CDN. Los artículos y zoopedia usan Tailwind + clases propias (Montserrat, zoovet-navy, etc.).

**Revisión por carpeta (muestra):**

- **articles/** (ej. `zoovet_art6_microchip-ES.html`): Estructura de una columna, breadcrumb, lang-switcher y enlaces en bloque. No hay grid de 7 ítems; no hay hero con 3 CTAs. Tipografía base suficiente. Enlaces de navegación con padding adecuado. **Conclusión:** Sin cambios solicitados para esta auditoría; media queries existentes coherentes con diseño.
- **articulos-interes/** (ej. `articulo_certificado_zoosanitario_senasa_trujillo.html`): Layout similar, breadcrumb + contenido. Sin elementos que requieran corrección móvil adicional para los 10 puntos de esta auditoría.
- **zoopedia/** (ej. `eeuu.html`): Ficha por destino, listas y enlaces. Sin barra de 7 ítems ni hero tipo index. **Conclusión:** No se aplican correcciones en esta fase; si en una revisión visual se detectan problemas (scroll horizontal o área táctil), conviene tratarlos en un ciclo aparte.

---

## FASE 3 — TABLA DE VERIFICACIÓN FINAL

Verificar manualmente en Chrome DevTools (simulación móvil) en **375px, 390px, 412px, 360px**:

| Comprobación | 375px | 390px | 412px | 360px |
|--------------|-------|-------|-------|-------|
| No hay scroll horizontal | ☐ | ☐ | ☐ | ☐ |
| Elementos táctiles ≥44px (hero CTAs, contacto, footer) | ☐ | ☐ | ☐ | ☐ |
| No hay texto body &lt;14px (Trust badges ahora 14px en móvil) | ☐ | ☐ | ☐ | ☐ |
| Nav drawer abre y cierra correctamente | ☐ | ☐ | ☐ | ☐ |
| Hero completo sin cortes (3 botones visibles) | ☐ | ☐ | ☐ | ☐ |
| Contactos (tel, WhatsApp) tocables con dedo | ☐ | ☐ | ☐ | ☐ |
| Grid experiencia: 2 columnas en móvil | ☐ | ☐ | ☐ | ☐ |

---

## ARCHIVOS MODIFICADOS

1. **index.html** — Estilos en `@media (max-width: 767px)`: hero-cta, #contacto, .trust-badges; clase `hero-cta` en el div de botones del hero; clase `trust-badges` en la section de sellos; grid experiencia `grid-cols-2 sm:grid-cols-3`.
2. **docs/AUDITORIA_MOVIL_INDEX.md** — Creado: auditoría, correcciones, fases 2 y 3, listado de archivos.
