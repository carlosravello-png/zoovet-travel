# Plantilla para artículos científicos — Zoovet Travel

Todos los artículos en `articles/` deben incluir esta estructura para consistencia con el sitio.

## 1. Header con cambio de idioma (obligatorio)

```html
<header class="site-header" role="banner">
  <div class="site-header-inner">
    <div>
      <a href="../index.html" class="site-logo">ZOOVET TRAVEL</a>
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="../index.html">Inicio</a> / <a href="./index.html">Artículos Científicos</a> / <span>[Título corto]</span>
      </nav>
    </div>
    <div class="lang-switcher">
      <a href="./index.html" aria-label="Español">ES</a>
      <a href="./index-en.html" aria-label="English">EN</a>
    </div>
  </div>
</header>
```

Para versión en inglés del artículo (`*-en.html`):
- `Inicio` → `href="../index-en.html"` y texto "Home"
- `Artículos Científicos` → `href="./index-en.html"` y texto "Scientific Articles"

## 2. Rutas correctas

- **Home (ES):** `../index.html`
- **Home (EN):** `../index-en.html`
- **Índice artículos (ES):** `./index.html`
- **Índice artículos (EN):** `./index-en.html`
- **Imágenes:** `./images/nombre-imagen.ext`

## 3. Enlace de vuelta

Antes del footer del artículo:
```html
<p style="margin-top: 2rem;">
  <a href="./index.html" style="color: var(--accent); font-weight: 600;">← Volver a Artículos Científicos</a>
</p>
```

Versión EN: "← Back to Scientific Articles" y `href="./index-en.html"`

## 4. Convención de archivos

- **Artículo en español:** `nombre-articulo.html` (ej. `zoovet_article_v2.html`)
- **Artículo en inglés:** `nombre-articulo-en.html` (si existe versión separada)

Si el artículo es bilingüe (mismo contenido), un solo archivo basta; los botones ES/EN llevan al índice en ese idioma.
