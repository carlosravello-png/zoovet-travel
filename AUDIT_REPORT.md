# AUDIT_REPORT — HTML estático (solo lectura)

Generado por `audit_html.py`. **Ningún archivo `.html` fue modificado** por esta auditoría.

### Móvil vs escritorio (texto HTML visible)

El fallo de fragmentos tipo `...Perú.">` proviene de **HTML inválido en el `<head>`** (p. ej. meta `description` con comillas/atributos rotos). El motor HTML5 de cualquier navegador puede mostrar el remanente como nodo de texto en el body; **no es un problema exclusivo de CSS móvil**.

Archivos HTML auditados: **320**. Páginas en `zoopedia/`: **63** (con hallazgos críticos en esta pasada: **3**).

## PROBLEMA CRÍTICO: texto HTML visible

- `google65c09db8e18af7da.html` — Sin etiqueta </head> (minúsculas) detectada.
- `google65c09db8e18af7da.html` — Sin etiqueta <body> detectada.
- `original_index.html` — Sin etiqueta </head> (minúsculas) detectada.
- `original_index.html` — Sin etiqueta <body> detectada.
- `zoopedia/index-en.html` — L7: meta description corrupta (HTML embebido en atributo). Fragmento: '<meta content="Complete requirements to travel with dogs and cats to destinations worldwide. Vaccines, &lt;a href=" glosario="" microchip-iso-en.html"="" name="description"/>microchip, rabies titer, health certificates. '
- `zoopedia/index-fr.html` — L7: meta description corrupta (HTML embebido en atributo). Fragmento: '<meta content="Exigences complètes pour voyager avec chiens et chats vers des destinations du monde entier. Vaccins, micropuce, &lt;a href=" favn-fr.html"="" glosario="" name="description"/>RNATT, certificats. Guides vér'
- `zoopedia/index.html` — L7: meta description corrupta (HTML embebido en atributo). Fragmento: '<meta content="Guías completas de requisitos para viajar con mascotas a destinos de todo el mundo. Vacunas, &lt;a href=" glosario="" microchip-iso.html"="" name="description"/>microchip, <a href="/glosario/favn.html">RNA'

## Archivos truncados

- `about-en.html` — Falta </body>, Falta </html>
- `about-fr.html` — Falta </body>, Falta </html>
- `about.html` — Falta </body>, Falta </html>
- `cargo-en.html` — Falta </body>, Falta </html>
- `cargo-fr.html` — Falta </body>, Falta </html>
- `cargo.html` — Falta </body>, Falta </html>
- `google65c09db8e18af7da.html` — Falta </body>, Falta </html>, Falta </head>
- `original_index.html` — Falta </body>, Falta </html>, Falta </head>

## <a> anidados

- `about-en.html` L274: '<a href="https://www.linkedin.com/in/victor-jesus-camacho-paz" target="_blank" rel="noopener norefer'
- `about-fr.html` L274: '<a href="https://www.linkedin.com/in/victor-jesus-camacho-paz" target="_blank" rel="noopener norefer'
- `about.html` L274: '<a href="https://www.linkedin.com/in/victor-jesus-camacho-paz" target="_blank" rel="noopener norefer'
- `articles/zoovet_art10_certificado-salud-EN.html` L81: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a>, <a href="/artic'
- `articles/zoovet_art10_certificado-salud-EN.html` L294: '<a href="/glosario/cuarentena-en.html">quarantine</a></a> and requirements for 22 countries. Red/amb'
- `articles/zoovet_art10_certificado-salud-ES.html` L81: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a>, <a href="/artic'
- `articles/zoovet_art10_certificado-salud-ES.html` L338: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `articles/zoovet_art10_certificado-salud-FR.html` L81: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a>, <a href="/artic'
- `articles/zoovet_art10_certificado-salud-FR.html` L329: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `articles/zoovet_art11_cuarentena-EN.html` L116: '<a href="zoovet_art9_certificados-vacunacion-EN.html" title="Vaccination certificates in dogs and ca'
- `articles/zoovet_art11_cuarentena-ES.html` L83: '<a href="/glosario/rabia-en.html">rabies</a>-free country protection, animal import quarantine regul'
- `articles/zoovet_art11_cuarentena-FR.html` L61: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a></span>   <h1>Qua'
- `articles/zoovet_art12_expediente-EN.html` L297: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a>. EUR-Lex. https:'
- `articles/zoovet_art12_expediente-ES.html` L356: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `articles/zoovet_art12_expediente-FR.html` L297: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a>. EUR-Lex. https:'
- `articles/zoovet_art14_apha-post-brexit-EN.html` L113: '<a href="zoovet_art15_mpi-nueva-zelanda-ES.html">MPI New Zealand: extreme biosecurity</a></div></nav'
- `articles/zoovet_art15_mpi-nueva-zelanda-EN.html` L120: '<a class="whatsapp-float" href="https://wa.me/51979620402?text=Hello%2C%20I%20would%20like%20more%20'
- `articles/zoovet_art15_mpi-nueva-zelanda-ES.html` L192: '<a class="whatsapp-float" href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20infor'
- `articles/zoovet_art15_mpi-nueva-zelanda-FR.html` L94: '<a href="zoovet_art16_sag-chile-ES.html">SAG Chili</a>: exigences importation animaux</a></div></nav'
- `articles/zoovet_art16_sag-chile-EN.html` L96: '<a href="zoovet_art17_reglamento-ue-576-ES.html">EU Regulation 576/2013</a>: the European framework<'
- `articles/zoovet_art17_reglamento-ue-576-ES.html` L174: '<a class="whatsapp-float" href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20infor'
- `articles/zoovet_art4_desparasitacionES.html` L227: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a> del Parlamento E'
- `articles/zoovet_art4_desparasitacionES.html` L307: '<a href="zoovet_art9_certificados-vacunacion-ES.html" title="Certificados de vacunación en perros y '
- `articles/zoovet_art4_desparasitacionES.html` L449: '<a href="zoovet_art12_expediente-ES.html" title="El Expediente de Exportación de Mascotas: Cadena Do'
- `articles/zoovet_art6_microchip-EN.html` L78: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a>), United Kingdom'
- `articles/zoovet_art6_microchip-EN.html` L219: '<a href="/glosario/cuarentena-en.html">quarantine</a></a> at border facility</td><td>Variable accord'
- `articles/zoovet_art6_microchip-ES.html` L78: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a>), normativa del '
- `articles/zoovet_art6_microchip-ES.html` L397: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `articles/zoovet_art6_microchip-FR.html` L78: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a>), réglementation'
- `articles/zoovet_art6_microchip-FR.html` L219: '<a href="/glosario/cuarentena-fr.html">quarantaine</a></a> possible en installation frontalière</td>'
- `articles/zoovet_art9_certificados-vacunacion-EN.html` L189: '<a href="/glosario/cuarentena-en.html">quarantine</a></a> on arrival. Sequence: microchip before rab'
- `articles/zoovet_art9_certificados-vacunacion-ES.html` L56: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a></span>   <span c'
- `articles/zoovet_art9_certificados-vacunacion-ES.html` L319: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `articles/zoovet_art9_certificados-vacunacion-FR.html` L189: '<a href="/glosario/cuarentena-fr.html">quarantaine</a></a> obligatoire à l\'arrivée. Séquence : puce '
- `articles/zoovet_article2_ES.html` L91: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a>, las disposicion'
- `articles/zoovet_article2_FR.html` L269: '<a href="/glosario/oie-woah-en.html">OIE/WOAH</a>.org</a></li>   <li>OMSA. (2024). <em>Manuel des te'
- `articles/zoovet_article_v2-en.html` L47: '<a href="/glosario/rabia-en.html">rabies</a> serology</a> 30 days</span>       </nav>     </div>    '
- `articles/zoovet_article_v2-en.html` L133: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a> and Implementing'
- `articles/zoovet_article_v2.html` L103: '<a href="/glosario/cdc-importacion-en.html">CDC</a>, 2024). La validez científica y operativa de est'
- `articulos-interes/articulo_certificado_zoosanitario_senasa_trujillo-EN.html` L153: '<a href="/glosario/fit-to-fly.html">fit-to-fly</a> evaluation</a>.   </div>     <h2><span class="sec'
- `articulos-interes/articulo_certificado_zoosanitario_senasa_trujillo-FR.html` L161: '<a href="/glosario/fit-to-fly.html">fit-to-fly</a></a>.   </div>     <h2><span class="sec-label">Sec'
- `articulos-interes/articulo_certificado_zoosanitario_senasa_trujillo.html` L142: '<a href="/glosario/fit-to-fly.html">fit-to-fly</a></a>.   </div>   <h2><span class="sec-label">Secci'
- `articulos-interes/articulo_cuanto_tiempo_antes_viaje_mascota-EN.html` L107: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento (UE) 576/2013</a></a> establishes 21 days'
- `articulos-interes/articulo_cuanto_tiempo_antes_viaje_mascota-FR.html` L111: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento (UE) 576/2013</a></a> fixe un délai de 21'
- `articulos-interes/articulo_golden_labrador_cabina_bodega.html` L136: '<a href="/glosario/hipobaria.html">hipobaria</a> y presión de       cabina</a>, y explicamos cómo el'
- `articulos-interes/articulo_vacuna_antirrabica_para_viajar-EN.html` L106: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento (UE) 576/2013</a></a> establishes that a '
- `articulos-interes/articulo_vacuna_antirrabica_para_viajar-EN.html` L252: '<a href="/glosario/cuarentena-en.html">quarantine</a></a> at the owner\'s expense, or repatriated. In'
- `articulos-interes/articulo_vacuna_antirrabica_para_viajar-FR.html` L112: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento (UE) 576/2013</a></a> établit qu\'une prim'
- `articulos-interes/articulo_vacuna_antirrabica_para_viajar-FR.html` L269: '<a href="/glosario/cuarentena-fr.html">quarantaine</a></a> obligatoire aux frais du propriétaire, ou'
- `articulos-interes/articulo_vacuna_antirrabica_para_viajar.html` L259: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `articulos-interes/como_viajar_perro_espana_desde_peru_requisitos_final_v2-EN.html` L127: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento (UE) 576/2013</a></a> and the associated '
- `articulos-interes/como_viajar_perro_espana_desde_peru_requisitos_final_v2-FR.html` L127: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento (UE) 576/2013</a></a> et les règlements d'
- `articulos-interes/como_viajar_perro_espana_desde_peru_requisitos_final_v2.html` L96: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento (UE) 576/2013</a></a> y los reglamentos d'
- `articulos-interes/llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2.html` L100: '<a href="/glosario/hipobaria.html">hipobaria</a> y presión de cabina</a>. </div> <h2><span class="se'
- `articulos-interes/mascotabodega-EN.html` L147: '<a href="/glosario/iata-lar.html">IATA LAR</a> regulations</a>, ensuring the animal can stand, turn '
- `articulos-interes/mascotabodega-FR.html` L154: '<a href="/glosario/iata-lar.html">IATA LAR</a></a>, en garantissant que l\'animal puisse se tenir    '
- `articulos-interes/mascotabodega.html` L118: '<a href="/glosario/hipobaria.html">hipobaria</a> y       presión de cabina</a>. Adicionalmente, anal'
- `articulos-interes/mascotabodega.html` L160: '<a href="/glosario/iata-lar.html">IATA LAR</a></a>, garantizando que el animal pueda ponerse de     '
- `articulos-interes/mascotasinpapeles-EN.html` L146: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento (UE) 576/2013</a></a>. What people do not'
- `articulos-interes/mascotasinpapeles-FR.html` L151: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento (UE) 576/2013</a></a>. Ce que l\'on n\'anti'
- `articulos-interes/mexique-classification-cdc-rage-canine-2026.html` L73: '<a href="/glosario/usda-aphis.html">USDA-APHIS</a>.gov</a>) avant tout voyage. </div>  <div class="a'
- `articulos-interes/prepararatuperro-EN.html` L178: '<a href="/glosario/iata-lar.html">IATA LAR</a> standards</a>, allowing the dog to stand, turn and li'
- `articulos-interes/prepararatuperro-FR.html` L187: '<a href="/glosario/iata-lar.html">IATA LAR</a></a>, permettant au chien de se tenir debout, de se   '
- `articulos-interes/prepararatuperro.html` L159: '<a href="/glosario/iata-lar.html">IATA LAR</a></a>, permitiendo que el perro se ponga de pie,     gi'
- `articulos-interes/queeselmicrochipdondelotramitas-EN.html` L128: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento (UE) 576/2013</a></a> and most internatio'
- `articulos-interes/queeselmicrochipdondelotramitas-FR.html` L132: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento (UE) 576/2013</a></a> et la plupart des r'
- `articulos-interes/rnattviajes-EN.html` L100: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento (UE) 576/2013</a></a>,     but the kineti'
- `articulos-interes/rnattviajes-EN.html` L145: '<a href="mexico-cdc-dog-rabies-classification-2026.html" class="text-[#0C789E] hover:underline">CDC '
- `articulos-interes/rnattviajes-FR.html` L107: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento (UE) 576/2013</a></a>, mais la cinétique '
- `articulos-interes/rnattviajes-FR.html` L153: '<a href="mexique-classification-cdc-rage-canine-2026.html" class="text-[#0C789E] hover:underline">cl'
- `articulos-interes/rnattviajes.html` L140: '<a href="mexico-clasificacion-cdc-rabia-canina-2026.html" class="text-[#0C789E] hover:underline">cla'
- `articulos-interes/veterimariosntrujillo-EN.html` L100: '<a href="/glosario/senasa-en.html">SENASA</a>, forcing protocol repetition and indefinite     postpo'
- `articulos-interes/viaja-chile-argentina-EN.html` L85: '<a href="../articles/zoovet_art12_expediente-EN.html">The Pet Export File: Complete Document Chain, '
- `articulos-interes/viaja-chile-argentina-FR.html` L201: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `articulos-interes/viaja-chile-argentina.html` L176: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `exportar-perro-requisitos.html` L231: '<a href="/glosario/senasa.html">SENASA</a></strong>               <span>Con resultado positivo, SENA'
- `favn-en.html` L513: '<a href="/glosario/cuarentena-en.html">quarantine</a></a> at destination) starts from the date the s'
- `favn-es.html` L693: '<a class="whatsapp-float" href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20infor'
- `favn-fr.html` L460: '<a href="/articulos-interes/articulo_cuanto_tiempo_antes_viaje_mascota-FR.html" style="color:#b45309'
- `glosario/apha-en.html` L102: '<a href="https://jessica-camacho.com" rel="author" target="_blank">View profile →</a>   </div> </div'
- `glosario/cdc-importacion.html` L47: '<a href="https://jessica-camacho.com" rel="author">Dra. Jessica Ysabel Camacho García, CMVP 12434</a'
- `glosario/certificado-sanitario-exportacion-en.html` L74: '<a href="/zoopedia/australia-en.html" target="_blank" rel="noopener">australia-en</a></td></tr> <tr>'
- `glosario/certificado-sanitario-exportacion-fr.html` L74: '<a href="/zoopedia/australia-fr.html" target="_blank" rel="noopener">australia-fr</a></td></tr> <tr>'
- `glosario/cfia-en.html` L47: '<a href="https://jessica-camacho.com" rel="author">Dra. Jessica Ysabel Camacho García, CMVP 12434</a'
- `glosario/cfia-fr.html` L47: '<a href="https://jessica-camacho.com" rel="author">Dra. Jessica Ysabel Camacho García, CMVP 12434</a'
- `glosario/cfia.html` L47: '<a href="https://jessica-camacho.com" rel="author">Dra. Jessica Ysabel Camacho García, CMVP 12434</a'
- `glosario/cuarentena.html` L71: '<a href="https://zoovettravel.com/zoopedia/australia.html" target="_blank" rel="noopener">australia<'
- `glosario/cvi.html` L47: '<a href="https://jessica-camacho.com" rel="author">Dra. Jessica Ysabel Camacho García, CMVP 12434</a'
- `glosario/dalrrd-en.html` L102: '<a href="https://jessica-camacho.com" rel="author" target="_blank">View profile →</a>   </div> </div'
- `glosario/dalrrd-fr.html` L102: '<a href="https://jessica-camacho.com" rel="author" target="_blank">Voir le profil →</a>   </div> </d'
- `glosario/dalrrd.html` L44: '<a href="/articles/zoovet_art15_mpi-nueva-zelanda-ES.html">cuarentena de 30 días en Johannesburgo pa'
- `glosario/favn-en.html` L73: '<a href="https://zoovettravel.com/zoopedia/italia.html" target="_blank" rel="noopener">italia</a></t'
- `glosario/favn-fr.html` L76: '<a href="https://zoovettravel.com/zoopedia/reino-unido.html" target="_blank" rel="noopener">reino-un'
- `glosario/favn.html` L77: '<a href="https://zoovettravel.com/zoopedia/australia.html" target="_blank" rel="noopener">australia<'
- `glosario/iata-lar-en.html` L72: '<a href="/zoopedia/eeuu-en.html" target="_blank" rel="noopener">eeuu-en</a></td></tr> <tr><td>EU</td'
- `glosario/iata-lar.html` L72: '<a href="/zoopedia/eeuu.html" target="_blank" rel="noopener">eeuu</a></td></tr> <tr><td>UE</td><td>✓'
- `glosario/microchip-iso.html` L90: '<a href="/zoopedia/reino-unido.html">Zoopedia: Reino Unido</a></div>  <!-- S9: REFERENCES --> <h2 cl'
- `glosario/mpi.html` L47: '<a href="https://jessica-camacho.com" rel="author">Dra. Jessica Ysabel Camacho García, CMVP 12434</a'
- `glosario/rabia-en.html` L75: '<a href="/zoopedia/reino-unido-en.html" target="_blank" rel="noopener">reino-unido-en</a></td></tr> '
- `glosario/rabia-fr.html` L75: '<a href="/zoopedia/reino-unido-fr.html" target="_blank" rel="noopener">reino-unido-fr</a></td></tr> '
- `glosario/rabia.html` L90: '<a href="/glosario/oie-woah.html">OIE/WOAH</a></div>  <!-- S9: REFERENCES --> <h2 class="section-tit'
- `glosario/rffit-en.html` L89: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento UE 576/2013</a></a></div>  <!-- S9: REFER'
- `glosario/rffit.html` L89: '<a href="/glosario/reglamento-ue-576-2013.html">Reglamento UE 576/2013</a></div>  <!-- S9: REFERENCE'
- `glosario/senasa-en.html` L90: '<a href="/zoopedia/chile.html">Zoopedia: Chile</a></div>  <!-- S9: REFERENCES --> <h2 class="section'
- `glosario/senasa.html` L90: '<a href="/zoopedia/chile.html">Zoopedia: Chile</a></div>  <!-- S9: REFERENCES --> <h2 class="section'
- `glosario/senasica.html` L71: '<a href="/zoopedia/mexico.html" target="_blank" rel="noopener">mexico</a></td></tr> </tbody></table>'
- `glosario/serologia-antirrabica-en.html` L78: '<a href="https://zoovettravel.com/zoopedia/brasil.html" target="_blank" rel="noopener">brasil</a></t'
- `glosario/serologia-antirrabica-fr.html` L78: '<a href="https://zoovettravel.com/zoopedia/brasil.html" target="_blank" rel="noopener">brasil</a></t'
- `glosario/serologia-antirrabica.html` L92: '<a href="/zoopedia/australia.html">Zoopedia: Australia</a></div>  <!-- S9: REFERENCES --> <h2 class='
- `glosario/usda-aphis.html` L47: '<a href="https://jessica-camacho.com" rel="author">Dra. Jessica Ysabel Camacho García, CMVP 12434</a'
- `index-en.html` L80: '<a href="/glosario/rabia-en.html">rabies</a> Serology FAVN</a> <a href="./traveling-with-my-pet.html'
- `index-fr.html` L695: '<a href="https://www.google.com/maps/search/?api=1&amp;query=Calle+Cuba+241,+Urb.+El+Recreo,+Trujill'
- `pet-travel-planner/requirements-by-country/index.html` L310: '<a class="whatsapp-float" href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20infor'
- `planificador-viaje-mascota/requisitos-por-pais/index.html` L65: '<a href="https://zoovettravel.com/zoopedia/nueva-zelanda.html" style="font-size:0.72rem;font-weight:'
- `serologia-rabia-mascotas-peru-en.html` L347: '<a href="./zoopedia/index.html" class="interlink-card p-5 block"><p class="text-[10px] font-bold tra'
- `serologia-rabia-mascotas-peru-fr.html` L283: '<a href="./about.html" class="text-[#0C789E] font-semibold hover:underline">Découvrir toute l\'équipe'
- `serologia-rabia-mascotas-peru.html` L341: '<a href="./about.html" class="text-[#0C789E] font-semibold hover:underline">Conoce al equipo complet'
- `zoopedia/australia-en.html` L86: '<a href="../articles/zoovet_art11_cuarentena-EN.html" class="text-[#0C789E] underline">quarantine</a'
- `zoopedia/australia-en.html` L252: '<a href="https://www.argentina.gob.ar/senasa" target="_blank"                   rel="noopener norefe'
- `zoopedia/australia-fr.html` L85: '<a href="../articles/zoovet_art11_cuarentena-FR.html" class="text-[#0C789E] underline">quarantaine</'
- `zoopedia/australia-fr.html` L594: '<a href="https://www.gov.br/agricultura" target="_blank"                   rel="noopener noreferrer"'
- `zoopedia/australia.html` L411: '<a href="italia.html" class="text-[#0C789E] underline">Italia</a>: requieren RNATT con umbral de 0,5'
- `zoopedia/australia.html` L787: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/brasil-en.html` L114: '<a href="../articles/zoovet_art11_cuarentena-EN.html" class="text-[#0C789E] underline">quarantine</a'
- `zoopedia/brasil-en.html` L360: '<a href="japon-en.html" class="text-[#0C789E] underline">Japan</a> must equally present valid rabies'
- `zoopedia/brasil-fr.html` L117: '<a href="../articles/zoovet_art11_cuarentena-FR.html" class="text-[#0C789E] underline">quarantaine</'
- `zoopedia/brasil-fr.html` L369: '<a href="japon-fr.html" class="text-[#0C789E] underline">Japon</a> doivent également présenter      '
- `zoopedia/brasil.html` L733: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/canada-en.html` L121: '<a href="../articles/zoovet_art11_cuarentena-EN.html" class="text-[#0C789E] underline">quarantine</a'
- `zoopedia/canada-en.html` L220: '<a href="https://www.argentina.gob.ar/senasa" target="_blank"                   rel="noopener norefe'
- `zoopedia/canada-en.html` L331: '<a href="/glosario/hipobaria-en.html">hypobaric conditions</a> physiology and cabin           pressu'
- `zoopedia/canada-fr.html` L123: '<a href="../articles/zoovet_art11_cuarentena-FR.html" class="text-[#0C789E] underline">quarantaine</'
- `zoopedia/canada-fr.html` L228: '<a href="https://www.argentina.gob.ar/senasa" target="_blank"                   rel="noopener norefe'
- `zoopedia/canada.html` L773: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/chile-en.html` L74: '<a href="/glosario/sag-en.html">SAG Chile</a></a>)<br>Official URL: <a           href="https://www.s'
- `zoopedia/chile-en.html` L120: '<a href="../articles/zoovet_art11_cuarentena-EN.html" class="text-[#0C789E] underline">quarantine</a'
- `zoopedia/chile-en.html` L307: '<a href="/glosario/hipobaria-en.html">hypobaric conditions</a> physiology and           pressurizati'
- `zoopedia/chile-fr.html` L137: '<a           href="https://www.sag.gob.cl/ambitos-de-accion/ingreso-de-perros-gatos-y-hurones-mascot'
- `zoopedia/chile-fr.html` L657: '<a href="../articles/zoovet_article3_braquicefalos_FR.html" class="text-[#0C789E] underline">races b'
- `zoopedia/chile.html` L732: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/china-en.html` L70: '<a href="/glosario/cuarentena-en.html">quarantine</a></a>. They require <a href="../articles/zoovet_'
- `zoopedia/china-en.html` L355: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/china-fr.html` L70: '<a href="/glosario/cuarentena-fr.html">quarantaine</a></a>. Exigence : <a href="../articles/zoovet_a'
- `zoopedia/china-fr.html` L355: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/china.html` L116: '<a href="/articles/zoovet_art16_sag-chile-ES.html">Chile</td><td><a href="/glosario/sag</a>.html">SA'
- `zoopedia/corea-del-sur-en.html` L84: '<a href="/glosario/cuarentena-en.html">quarantine</a></a>, with retention authority. South Korea all'
- `zoopedia/corea-del-sur-en.html` L112: '<a href="https://www.argentina.gob.ar/senasa" target="_blank" rel="noopener noreferrer">https://www.'
- `zoopedia/corea-del-sur-fr.html` L84: '<a href="../articles/zoovet_art11_cuarentena-FR.html" class="text-[#0C789E] underline">quarantaine</'
- `zoopedia/corea-del-sur-fr.html` L112: '<a href="https://www.argentina.gob.ar/senasa" target="_blank" rel="noopener noreferrer">https://www.'
- `zoopedia/corea-del-sur.html` L347: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/eau-en.html` L359: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/eau-fr.html` L359: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/eau.html` L359: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/eeuu-en.html` L115: '<a href="../articles/zoovet_art11_cuarentena-EN.html" class="text-[#0C789E] underline">quarantine</a'
- `zoopedia/eeuu-en.html` L647: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/eeuu-fr.html` L115: '<a href="../articles/zoovet_art11_cuarentena-FR.html" class="text-[#0C789E] underline">quarantaine</'
- `zoopedia/eeuu-fr.html` L663: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/eeuu.html` L236: '<a href="/articles/zoovet_art16_sag-chile-ES.html">Chile</td>               <td><a href="/glosario/s'
- `zoopedia/espana-en.html` L88: '<a href="/glosario/rabia-en.html">rabies</a> vaccination</a>. No <a href="../favn-en.html" class="te'
- `zoopedia/espana-en.html` L89: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a>.         </div> '
- `zoopedia/espana-en.html` L236: '<a href="https://www.argentina.gob.ar/senasa" target="_blank"                   rel="noopener norefe'
- `zoopedia/espana-fr.html` L88: '<a href="/glosario/reglamento-ue-576-2013-fr.html">Règlement (UE) 576/2013</a></a>.         </div>  '
- `zoopedia/espana-fr.html` L240: '<a href="https://www.argentina.gob.ar/senasa" target="_blank"                   rel="noopener norefe'
- `zoopedia/espana.html` L117: '<a href="union-europea.html" class="text-[#0C789E] underline">Unión Europea</a>,         permite la '
- `zoopedia/espana.html` L236: '<a href="https://www.argentina.gob.ar/senasa" target="_blank"                   rel="noopener norefe'
- `zoopedia/francia-en.html` L70: '<a href="/glosario/rabia-en.html">rabies</a> vaccination</a>. No <a href="../favn-en.html" class="te'
- `zoopedia/francia-en.html` L70: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a>.         </div> '
- `zoopedia/francia-en.html` L86: '<a href="../articles/zoovet_art11_cuarentena-EN.html" class="text-[#0C789E] underline">quarantine</a'
- `zoopedia/francia-en.html` L114: '<a href="https://www.argentina.gob.ar/senasa" target="_blank" rel="noopener noreferrer">https://www.'
- `zoopedia/francia-fr.html` L70: '<a href="/glosario/reglamento-ue-576-2013-fr.html">Règlement (UE) 576/2013</a></a>.         </div>  '
- `zoopedia/francia-fr.html` L86: '<a href="../articles/zoovet_art11_cuarentena-FR.html" class="text-[#0C789E] underline">quarantaine</'
- `zoopedia/francia-fr.html` L114: '<a href="https://www.argentina.gob.ar/senasa" target="_blank" rel="noopener noreferrer">https://www.'
- `zoopedia/francia.html` L349: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/india-en.html` L241: '<a href="https://www.gov.br/agricultura" target="_blank" rel="noopener noreferrer">https://www.gov.b'
- `zoopedia/india-fr.html` L241: '<a href="https://www.gov.br/agricultura" target="_blank" rel="noopener noreferrer">https://www.gov.b'
- `zoopedia/india.html` L241: '<a href="https://www.gov.br/agricultura" target="_blank" rel="noopener noreferrer">https://www.gov.b'
- `zoopedia/italia-en.html` L70: '<a href="/glosario/rabia-en.html">rabies</a> vaccination</a>. No <a href="../favn-en.html" class="te'
- `zoopedia/italia-en.html` L70: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a>.         </div> '
- `zoopedia/italia-en.html` L86: '<a href="../articles/zoovet_art11_cuarentena-EN.html" class="text-[#0C789E] underline">quarantine</a'
- `zoopedia/italia-en.html` L114: '<a href="https://www.argentina.gob.ar/senasa" target="_blank" rel="noopener noreferrer">https://www.'
- `zoopedia/italia-fr.html` L70: '<a href="/glosario/reglamento-ue-576-2013-fr.html">Règlement (UE) 576/2013</a></a>.         </div>  '
- `zoopedia/italia-fr.html` L86: '<a href="../articles/zoovet_art11_cuarentena-FR.html" class="text-[#0C789E] underline">quarantaine</'
- `zoopedia/italia-fr.html` L114: '<a href="https://www.argentina.gob.ar/senasa" target="_blank" rel="noopener noreferrer">https://www.'
- `zoopedia/italia.html` L348: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/japon-en.html` L111: '<a href="/glosario/cuarentena-en.html">quarantine</a></a>. Japan applies the strictest animal health'
- `zoopedia/japon-en.html` L644: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/japon-fr.html` L111: '<a href="../articles/zoovet_art11_cuarentena-FR.html" class="text-[#0C789E] underline">quarantaine</'
- `zoopedia/japon-fr.html` L221: '<a href="https://www.argentina.gob.ar/senasa" target="_blank"                   rel="noopener norefe'
- `zoopedia/japon.html` L649: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/mexico.html` L106: '<a href="https://www.cdc.gov/importation/dogs/high-risk-countries.html" target="_blank" rel="noopene'
- `zoopedia/nueva-zelanda-en.html` L88: '<a href="../articles/zoovet_art11_cuarentena-EN.html" class="text-[#0C789E] underline">quarantine</a'
- `zoopedia/nueva-zelanda-en.html` L156: '<a href="mexico-en.html" class="text-[#0C789E] underline">Mexico</a>, Chile</a>, Paraguay and Urugua'
- `zoopedia/nueva-zelanda-en.html` L343: '<a href="/glosario/hipobaria-en.html">hypobaric conditions</a> physiology and           pressurizati'
- `zoopedia/nueva-zelanda-fr.html` L90: '<a href="../articles/zoovet_art11_cuarentena-FR.html" class="text-[#0C789E] underline">quarantaine</'
- `zoopedia/nueva-zelanda-fr.html` L246: '<a href="/glosario/sag-fr.html">SAG Chili</a></a></td>               <td>Verify directly</td>       '
- `zoopedia/nueva-zelanda.html` L157: '<a href="mexico.html" class="text-[#0C789E] underline">México</a>, Chile</a>, Paraguay y Uruguay.   '
- `zoopedia/reino-unido-en.html` L87: '<a href="/glosario/rabia-en.html">rabies</a> vaccination</a> and ISO           <a href="/glosario/mi'
- `zoopedia/reino-unido-en.html` L134: '<a href="../articles/zoovet_art11_cuarentena-EN.html" class="text-[#0C789E] underline">quarantine</a'
- `zoopedia/reino-unido-en.html` L410: '<a           href="https://www.gov.uk/bring-pet-to-great-britain/listed-and-unlisted-countries" targ'
- `zoopedia/reino-unido-fr.html` L137: '<a href="../articles/zoovet_art11_cuarentena-FR.html" class="text-[#0C789E] underline">quarantaine</'
- `zoopedia/reino-unido-fr.html` L427: '<a           href="https://www.gob.pe/senasa" target="_blank" rel="noopener noreferrer"           cl'
- `zoopedia/reino-unido.html` L820: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/rusia-en.html` L349: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/rusia-fr.html` L349: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/rusia.html` L349: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'
- `zoopedia/singapur-en.html` L89: '<a href="/glosario/cuarentena-en.html">quarantine</a></a>. Verify specific conditions           dire'
- `zoopedia/singapur-en.html` L550: '<a href="https://www.gov.br/agricultura" target="_blank"                   rel="noopener noreferrer"'
- `zoopedia/singapur-fr.html` L89: '<a href="/glosario/cuarentena-fr.html">quarantaine</a></a> de routine. Vérifier           les condit'
- `zoopedia/singapur-fr.html` L568: '<a href="https://www.gov.br/agricultura" target="_blank"                   rel="noopener noreferrer"'
- `zoopedia/singapur.html` L235: '<a href="/articles/zoovet_art16_sag-chile-ES.html">Chile</td>               <td><a href="/glosario/s'
- `zoopedia/sudafrica-en.html` L550: '<a href="https://www.gov.br/agricultura" target="_blank"                   rel="noopener noreferrer"'
- `zoopedia/sudafrica-fr.html` L566: '<a href="https://www.gov.br/agricultura" target="_blank"                   rel="noopener noreferrer"'
- `zoopedia/sudafrica.html` L558: '<a href="https://www.gov.br/agricultura" target="_blank"                   rel="noopener noreferrer"'
- `zoopedia/union-europea-en.html` L89: '<a href="/glosario/reglamento-ue-576-2013-en.html">Regulation (EU) 576/2013</a></a>, intra-EU moveme'
- `zoopedia/union-europea-en.html` L126: '<a href="../articles/zoovet_art11_cuarentena-EN.html" class="text-[#0C789E] underline">quarantine</a'
- `zoopedia/union-europea-en.html` L251: '<a href="https://www.argentina.gob.ar/senasa" target="_blank"                   rel="noopener norefe'
- `zoopedia/union-europea-fr.html` L89: '<a href="/glosario/reglamento-ue-576-2013-fr.html">Règlement (UE) 576/2013</a></a>, mouvements intra'
- `zoopedia/union-europea-fr.html` L127: '<a href="../articles/zoovet_art11_cuarentena-FR.html" class="text-[#0C789E] underline">quarantaine</'
- `zoopedia/union-europea-fr.html` L260: '<a href="https://www.argentina.gob.ar/senasa" target="_blank"                   rel="noopener norefe'
- `zoopedia/union-europea.html` L1015: '<a href="https://wa.me/51979620402?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20l'

## WhatsApp ausente / roto

### Ausente

- `google65c09db8e18af7da.html`
- `original_index.html`
- `PREVIEW_SEO_ZOOPEDIA.html`

### Roto (float sin path SVG válido)

- `about-en.html` — whatsapp-float presente pero sin <svg> cercano
- `about-fr.html` — whatsapp-float presente pero sin <svg> cercano
- `about.html` — whatsapp-float presente pero sin <svg> cercano
- `articulos-interes/mexico-cdc-dog-rabies-classification-2026.html` — SVG del botón sin <path d=...>
- `articulos-interes/mexico-clasificacion-cdc-rabia-canina-2026.html` — SVG del botón sin <path d=...>
- `articulos-interes/mexique-classification-cdc-rage-canine-2026.html` — SVG del botón sin <path d=...>
- `cargo-en.html` — whatsapp-float presente pero sin <svg> cercano
- `cargo-fr.html` — whatsapp-float presente pero sin <svg> cercano
- `cargo.html` — whatsapp-float presente pero sin <svg> cercano
- `exportar-perro-requisitos-en.html` — whatsapp-float presente pero sin <svg> cercano
- `exportar-perro-requisitos-fr.html` — whatsapp-float presente pero sin <svg> cercano
- `exportar-perro-requisitos.html` — whatsapp-float presente pero sin <svg> cercano
- `responsabilidad-veterinario-en.html` — whatsapp-float presente pero sin <svg> cercano
- `responsabilidad-veterinario-fr.html` — whatsapp-float presente pero sin <svg> cercano
- `responsabilidad-veterinario.html` — whatsapp-float presente pero sin <svg> cercano
- `serologia-rabia-mascotas-peru-en.html` — whatsapp-float presente pero sin <svg> cercano
- `serologia-rabia-mascotas-peru-fr.html` — whatsapp-float presente pero sin <svg> cercano
- `serologia-rabia-mascotas-peru.html` — whatsapp-float presente pero sin <svg> cercano
- `traveling-with-my-pet.html` — whatsapp-float presente pero sin <svg> cercano
- `viajar-con-mi-mascota.html` — whatsapp-float presente pero sin <svg> cercano
- `viajar-sin-favn-eeuu-en.html` — whatsapp-float presente pero sin <svg> cercano
- `viajar-sin-favn-eeuu-fr.html` — whatsapp-float presente pero sin <svg> cercano
- `viajar-sin-favn-eeuu.html` — whatsapp-float presente pero sin <svg> cercano
- `voyager-avec-mon-animal.html` — whatsapp-float presente pero sin <svg> cercano

## JSON-LD ausente

- `google65c09db8e18af7da.html`
- `indexnow-submit.html`
- `original_index.html`
- `PREVIEW_SEO_ZOOPEDIA.html`

## Links internos rotos (href a .html inexistente)

- `articles/zoovet_art10_certificado-salud-ES.html` → `href='zoovet_art11_cuarentena</a>-ES.html'` (no existe `articles/zoovet_art11_cuarentena</a>-ES.html`)
- `articles/zoovet_art13_cdc-dmrvv-EN.html` → `href='../index.en.html'` (no existe `index.en.html`)
- `articles/zoovet_art13_cdc-dmrvv-EN.html` → `href='index.en.html'` (no existe `articles/index.en.html`)
- `articles/zoovet_art13_cdc-dmrvv-EN.html` → `href='../glosario/microchip-en.html'` (no existe `glosario/microchip-en.html`)
- `articles/zoovet_art13_cdc-dmrvv-ES.html` → `href='../glosario/microchip.html'` (no existe `glosario/microchip.html`)
- `articles/zoovet_art13_cdc-dmrvv-FR.html` → `href='../index.fr.html'` (no existe `index.fr.html`)
- `articles/zoovet_art13_cdc-dmrvv-FR.html` → `href='index.fr.html'` (no existe `articles/index.fr.html`)
- `articles/zoovet_art14_apha-post-brexit-EN.html` → `href='../index.en.html'` (no existe `index.en.html`)
- `articles/zoovet_art14_apha-post-brexit-EN.html` → `href='index.en.html'` (no existe `articles/index.en.html`)
- `articles/zoovet_art14_apha-post-brexit-FR.html` → `href='../index.fr.html'` (no existe `index.fr.html`)
- `articles/zoovet_art14_apha-post-brexit-FR.html` → `href='index.fr.html'` (no existe `articles/index.fr.html`)
- `articles/zoovet_art15_mpi-nueva-zelanda-EN.html` → `href='../index.en.html'` (no existe `index.en.html`)
- `articles/zoovet_art15_mpi-nueva-zelanda-EN.html` → `href='index.en.html'` (no existe `articles/index.en.html`)
- `articles/zoovet_art15_mpi-nueva-zelanda-EN.html` → `href='zoovet_art16_sag-chile</a>-ES.html'` (no existe `articles/zoovet_art16_sag-chile</a>-ES.html`)
- `articles/zoovet_art15_mpi-nueva-zelanda-ES.html` → `href='../glosario/microchip.html'` (no existe `glosario/microchip.html`)
- `articles/zoovet_art15_mpi-nueva-zelanda-ES.html` → `href='zoovet_art16_sag-chile</a>-ES.html'` (no existe `articles/zoovet_art16_sag-chile</a>-ES.html`)
- `articles/zoovet_art15_mpi-nueva-zelanda-FR.html` → `href='../index.fr.html'` (no existe `index.fr.html`)
- `articles/zoovet_art15_mpi-nueva-zelanda-FR.html` → `href='index.fr.html'` (no existe `articles/index.fr.html`)
- `articles/zoovet_art16_sag-chile-EN.html` → `href='../index.en.html'` (no existe `index.en.html`)
- `articles/zoovet_art16_sag-chile-EN.html` → `href='index.en.html'` (no existe `articles/index.en.html`)
- `articles/zoovet_art16_sag-chile-EN.html` → `href='../glosario/microchip-en.html'` (no existe `glosario/microchip-en.html`)
- `articles/zoovet_art16_sag-chile-ES.html` → `href='../glosario/microchip.html'` (no existe `glosario/microchip.html`)
- `articles/zoovet_art16_sag-chile-ES.html` → `href='../glosario/desparasitacion.html'` (no existe `glosario/desparasitacion.html`)
- `articles/zoovet_art16_sag-chile-FR.html` → `href='../index.fr.html'` (no existe `index.fr.html`)
- `articles/zoovet_art16_sag-chile-FR.html` → `href='index.fr.html'` (no existe `articles/index.fr.html`)
- `articles/zoovet_art16_sag-chile-FR.html` → `href='../glosario/microchip-fr.html'` (no existe `glosario/microchip-fr.html`)
- `articles/zoovet_art17_reglamento-ue-576-EN.html` → `href='../index.en.html'` (no existe `index.en.html`)
- `articles/zoovet_art17_reglamento-ue-576-EN.html` → `href='index.en.html'` (no existe `articles/index.en.html`)
- `articles/zoovet_art17_reglamento-ue-576-EN.html` → `href='../glosario/microchip-en.html'` (no existe `glosario/microchip-en.html`)
- `articles/zoovet_art17_reglamento-ue-576-ES.html` → `href='../glosario/microchip.html'` (no existe `glosario/microchip.html`)
- `articles/zoovet_art17_reglamento-ue-576-ES.html` → `href='zoovet_art16_sag-chile</a>-ES.html'` (no existe `articles/zoovet_art16_sag-chile</a>-ES.html`)
- `articles/zoovet_art17_reglamento-ue-576-FR.html` → `href='../index.fr.html'` (no existe `index.fr.html`)
- `articles/zoovet_art17_reglamento-ue-576-FR.html` → `href='index.fr.html'` (no existe `articles/index.fr.html`)
- `articles/zoovet_art17_reglamento-ue-576-FR.html` → `href='../glosario/microchip-fr.html'` (no existe `glosario/microchip-fr.html`)
- `articles/zoovet_art9_certificados-vacunacion-ES.html` → `href='/glosario/cuarentena</a>.html'` (no existe `glosario/cuarentena</a>.html`)
- `articulos-interes/articulo_vacuna_antirrabica_para_viajar.html` → `href='/glosario/cuarentena</a>.html'` (no existe `glosario/cuarentena</a>.html`)
- `articulos-interes/viaja-chile-argentina-FR.html` → `href='/glosario/sag</a>.html'` (no existe `glosario/sag</a>.html`)
- `articulos-interes/viaja-chile-argentina.html` → `href='/glosario/sag</a>.html'` (no existe `glosario/sag</a>.html`)
- `favn-en.html` → `href='/zoopedia/alemania.html'` (no existe `zoopedia/alemania.html`)
- `favn-es.html` → `href='/zoopedia/alemania.html'` (no existe `zoopedia/alemania.html`)
- `favn-es.html` → `href='/glosario/cuarentena</a>.html'` (no existe `glosario/cuarentena</a>.html`)
- `favn-fr.html` → `href='/zoopedia/alemania.html'` (no existe `zoopedia/alemania.html`)
- `glosario/_template_termino.html` → `href='{SLUG}.html'` (no existe `glosario/{SLUG}.html`)
- `glosario/_template_termino.html` → `href='{SLUG}-en.html'` (no existe `glosario/{SLUG}-en.html`)
- `glosario/_template_termino.html` → `href='{SLUG}-fr.html'` (no existe `glosario/{SLUG}-fr.html`)
- `glosario/cvi-en.html` → `href='/zoopedia/estados-unidos-en.html'` (no existe `zoopedia/estados-unidos-en.html`)
- `glosario/cvi-fr.html` → `href='/zoopedia/estados-unidos-fr.html'` (no existe `zoopedia/estados-unidos-fr.html`)
- `glosario/cvi.html` → `href='/zoopedia/estados-unidos.html'` (no existe `zoopedia/estados-unidos.html`)
- `glosario/fit-to-fly-en.html` → `href='/zoopedia/estados-unidos-en.html'` (no existe `zoopedia/estados-unidos-en.html`)
- `glosario/fit-to-fly-fr.html` → `href='/zoopedia/estados-unidos-fr.html'` (no existe `zoopedia/estados-unidos-fr.html`)
- `glosario/fit-to-fly.html` → `href='/zoopedia/estados-unidos.html'` (no existe `zoopedia/estados-unidos.html`)
- `glosario/hipobaria-en.html` → `href='/zoopedia/estados-unidos-en.html'` (no existe `zoopedia/estados-unidos-en.html`)
- `glosario/hipobaria-fr.html` → `href='/zoopedia/estados-unidos-fr.html'` (no existe `zoopedia/estados-unidos-fr.html`)
- `glosario/hipobaria.html` → `href='/zoopedia/estados-unidos.html'` (no existe `zoopedia/estados-unidos.html`)
- `zoopedia/brasil.html` → `href='../articles/zoovet_art11_cuarentena</a>-ES.html'` (no existe `articles/zoovet_art11_cuarentena</a>-ES.html`)
- `zoopedia/canada.html` → `href='../articles/zoovet_art11_cuarentena</a>-ES.html'` (no existe `articles/zoovet_art11_cuarentena</a>-ES.html`)
- `zoopedia/chile.html` → `href='../articles/zoovet_art11_cuarentena</a>-ES.html'` (no existe `articles/zoovet_art11_cuarentena</a>-ES.html`)
- `zoopedia/china-en.html` → `href='/glosario/sag</a>-en.html'` (no existe `glosario/sag</a>-en.html`)
- `zoopedia/china-fr.html` → `href='/glosario/sag</a>-fr.html'` (no existe `glosario/sag</a>-fr.html`)
- `zoopedia/china.html` → `href='/glosario/cuarentena</a>.html'` (no existe `glosario/cuarentena</a>.html`)
- `zoopedia/china.html` → `href='/glosario/sag</a>.html'` (no existe `glosario/sag</a>.html`)
- `zoopedia/corea-del-sur.html` → `href='../articles/zoovet_art11_cuarentena</a>-ES.html'` (no existe `articles/zoovet_art11_cuarentena</a>-ES.html`)
- `zoopedia/eau-en.html` → `href='/glosario/sag</a>-en.html'` (no existe `glosario/sag</a>-en.html`)
- `zoopedia/eau-fr.html` → `href='/glosario/sag</a>-fr.html'` (no existe `glosario/sag</a>-fr.html`)
- `zoopedia/eau.html` → `href='/glosario/sag</a>.html'` (no existe `glosario/sag</a>.html`)
- `zoopedia/eeuu-en.html` → `href='/glosario/sag</a>-en.html'` (no existe `glosario/sag</a>-en.html`)
- `zoopedia/eeuu-fr.html` → `href='/glosario/sag</a>-fr.html'` (no existe `glosario/sag</a>-fr.html`)
- `zoopedia/eeuu.html` → `href='../articles/zoovet_art11_cuarentena</a>-ES.html'` (no existe `articles/zoovet_art11_cuarentena</a>-ES.html`)
- `zoopedia/eeuu.html` → `href='/glosario/sag</a>.html'` (no existe `glosario/sag</a>.html`)
- `zoopedia/francia.html` → `href='../articles/zoovet_art11_cuarentena</a>-ES.html'` (no existe `articles/zoovet_art11_cuarentena</a>-ES.html`)
- `zoopedia/index-en.html` → `href='favn-en.html'` (no existe `zoopedia/favn-en.html`)
- `zoopedia/index-en.html` → `href='chile&lt;/a&gt;-en.html'` (no existe `zoopedia/chile&lt;/a&gt;-en.html`)
- `zoopedia/index-fr.html` → `href='favn-fr.html'` (no existe `zoopedia/favn-fr.html`)
- `zoopedia/italia.html` → `href='../articles/zoovet_art11_cuarentena</a>-ES.html'` (no existe `articles/zoovet_art11_cuarentena</a>-ES.html`)
- `zoopedia/japon-en.html` → `href='chile</a>-en.html'` (no existe `zoopedia/chile</a>-en.html`)
- `zoopedia/japon.html` → `href='../articles/zoovet_art11_cuarentena</a>-ES.html'` (no existe `articles/zoovet_art11_cuarentena</a>-ES.html`)
- `zoopedia/reino-unido.html` → `href='../articles/zoovet_art11_cuarentena</a>-ES.html'` (no existe `articles/zoovet_art11_cuarentena</a>-ES.html`)
- `zoopedia/rusia-en.html` → `href='/glosario/sag</a>-en.html'` (no existe `glosario/sag</a>-en.html`)
- `zoopedia/rusia-fr.html` → `href='/glosario/sag</a>-fr.html'` (no existe `glosario/sag</a>-fr.html`)
- `zoopedia/rusia.html` → `href='/glosario/sag</a>.html'` (no existe `glosario/sag</a>.html`)
- `zoopedia/singapur.html` → `href='/glosario/cuarentena</a>.html'` (no existe `glosario/cuarentena</a>.html`)
- `zoopedia/singapur.html` → `href='/glosario/sag</a>.html'` (no existe `glosario/sag</a>.html`)
- `zoopedia/union-europea.html` → `href='../articles/zoovet_art11_cuarentena</a>-ES.html'` (no existe `articles/zoovet_art11_cuarentena</a>-ES.html`)

## Inspección manual (tabla ✅/❌)

| Archivo | Estado | Nota |
|---------|--------|------|
| `zoopedia/index.html` | ❌ | </head> ≈L311; <body> ≈L312; </body> ≈L622; </html> ≈L622; WhatsApp: OK (whatsapp-float + path d=); Crítico: L7: meta description corrupta (HTML embebido en atributo). Fragmento: '<meta content="Guías completas de requisitos para viajar con mascotas a destinos de todo el mundo. Vacunas, &lt;a href=" glosario="" microchip-iso.html"="" name="description"/>microchip, <a href="/glosario/favn.html">RNA' |
| `zoopedia/index-en.html` | ❌ | </head> ≈L302; <body> ≈L303; </body> ≈L611; </html> ≈L611; WhatsApp: OK (whatsapp-float + path d=); Crítico: L7: meta description corrupta (HTML embebido en atributo). Fragmento: '<meta content="Complete requirements to travel with dogs and cats to destinations worldwide. Vaccines, &lt;a href=" glosario="" microchip-iso-en.html"="" name="description"/>microchip, rabies titer, health certificates. ' |
| `zoopedia/index-fr.html` | ❌ | </head> ≈L302; <body> ≈L303; </body> ≈L614; </html> ≈L614; WhatsApp: OK (whatsapp-float + path d=); Crítico: L7: meta description corrupta (HTML embebido en atributo). Fragmento: '<meta content="Exigences complètes pour voyager avec chiens et chats vers des destinations du monde entier. Vaccins, micropuce, &lt;a href=" favn-fr.html"="" glosario="" name="description"/>RNATT, certificats. Guides vér' |
| `glosario/index.html` | ✅ | </head> ≈L106; <body> ≈L107; </body> ≈L322; </html> ≈L323; WhatsApp: OK (whatsapp-float + path d=) |
| `glosario/index-en.html` | ✅ | </head> ≈L106; <body> ≈L107; </body> ≈L322; </html> ≈L323; WhatsApp: OK (whatsapp-float + path d=) |
| `glosario/index-fr.html` | ✅ | </head> ≈L106; <body> ≈L107; </body> ≈L322; </html> ≈L323; WhatsApp: OK (whatsapp-float + path d=) |
| `index.html` | ✅ | </head> ≈L502; <body> ≈L503; </body> ≈L1417; </html> ≈L1417; WhatsApp: OK (whatsapp-float + path d=) |
| `index-en.html` | ✅ | </head> ≈L499; <body> ≈L500; </body> ≈L1298; </html> ≈L1298; WhatsApp: OK (whatsapp-float + path d=) |
| `index-fr.html` | ✅ | </head> ≈L508; <body> ≈L510; </body> ≈L1537; </html> ≈L1537; WhatsApp: OK (whatsapp-float + path d=) |
| `kennels.html` | ✅ | </head> ≈L156; <body> ≈L157; </body> ≈L1791; </html> ≈L1792; WhatsApp: OK (whatsapp-float + path d=) |
| `kennels-en.html` | ✅ | </head> ≈L156; <body> ≈L157; </body> ≈L1851; </html> ≈L1852; WhatsApp: OK (whatsapp-float + path d=) |
| `kennels-fr.html` | ✅ | </head> ≈L156; <body> ≈L157; </body> ≈L1791; </html> ≈L1792; WhatsApp: OK (whatsapp-float + path d=) |

## Limitaciones del script

- Detección de `<a>` anidados equilibra etiquetas `<a>`…`</a>` tras quitar `<script>`/`<style>`; un `<a>` sin cerrar aguas arriba puede hacer que enlaces posteriores (p. ej. WhatsApp flotante) aparezcan como anidados.
- `href` solo se consideran enlaces locales si el atributo usa comillas simples o dobles consistentes con el regex.
- Rutas absolutas del sitio (`https://zoovettravel.com/...`) no se validan contra disco.
