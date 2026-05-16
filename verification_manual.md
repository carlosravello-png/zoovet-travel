| Archivo / comprobación | Estado | Nota |
|------------------------|--------|------|
| `zoopedia/index.html` L7 | ✅ | `<meta name="description" content="Evita rechazos en aduana: ..."/>` — texto plano, sin `<a` ni `&lt;` dentro de `content`. |
| `zoopedia/index-en.html` L7 | ✅ | `<meta name="description" content="Avoid customs rejection: ..."/>` — texto plano. |
| `zoopedia/index-fr.html` L7 | ✅ | `<meta name="description" content="Évitez les refus douaniers : ..."/>` — texto plano. |
| `about.html` | ✅ | `</body>` L748, `</html>` L749; bloque WhatsApp L724-729 con `<svg>` y `<path d="...">` completo. |
| `cargo.html` | ✅ | `</body>` L748, `</html>` L749; WhatsApp L725-729 con `<path d=...>`. |
| `kennels.html` | ✅ | `</body>` L1792, `</html>` L1793; WhatsApp L1790 con `<path d="...">` en el mismo `<a class="whatsapp-float">`. |
| `index-fr.html` | ✅ | Búsqueda: `searchInput.addEventListener('input', ...)` cerrado con `});` en L1518; `</body></html>` en L1537. |
| `favn-es.html` — sin `alemania` en `href` | ✅ | No aparece `href` a `/zoopedia/alemania.html`. Varios enlaces usan `href="/zoopedia/eeuu.html"` (p. ej. L1066, L1546). |
| `glosario/hipobaria.html` — EE.UU. | ✅ | L242: `<a href="/zoopedia/eeuu.html" ...>` (no rutas `estados-unidos*.html`). |
| `articles/zoovet_art13_cdc-dmrvv-EN.html` | ✅ | L163 `href="../index-en.html"`; L164 `href="index-en.html"` — guión, no punto. |
