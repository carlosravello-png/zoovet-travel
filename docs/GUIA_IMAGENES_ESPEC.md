# Imágenes Guías Prácticas — Especificación y metadatos

## Medida única (todas las imágenes)

| Especificación | Valor |
|----------------|--------|
| **Dimensiones** | **1200 × 800 px** (ancho × alto) |
| **Proporción** | 3:2 |
| **Uso** | Móvil, tablet, laptop y desktop (responsive; el CSS limitará ancho max en contenido) |
| **Formato** | JPG (calidad 82–85) o WebP (calidad 85) para buen peso y LightSpeed |
| **Carpeta** | `images/guias/` (ruta en HTML desde articulos-interes: `../images/guias/`) |

Una sola medida para no trabajar doble: 1200 px de ancho cubre bien hasta pantallas grandes y en móvil se redimensiona sin perder nitidez si subes calidad alta y comprimida.

---

## Dónde van las 2 fotos (estética tipo suizo / Montecarlo)

- **Imagen 1 (lead):** Justo **después del hero** y **antes del scope-box**. Una sola imagen ancla, ancho completo, que define el tema del artículo. Limpio, sin saturar.
- **Imagen 2:** **Después del primer bloque H2** (después de la “Sección 1” y sus párrafos), **antes del segundo H2**. Rompe el texto y da ritmo sin cortar en mitad de una idea.

En el HTML:  
- Img 1 → después de `</section>` del hero, antes de `<div class="scope-box">`.  
- Img 2 → después del primer `</h2>` y sus `<p>`, antes del segundo `<h2>`.

---

## Lista de archivos y alt texts (2 por artículo × 26 = 52 imágenes)

Sube cada foto con **exactamente** el nombre indicado en **Nombre de archivo** a `images/guias/`.  
Cuando estén en esa carpeta, se insertarán en el HTML con estos alt (ya preparados por idioma).

---

### 1. articulo_alimentacion_antes_durante_vuelo

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-articulo-alimentacion-antes-durante-vuelo-01.jpg` | Tras hero, antes scope-box | Alimentación de perro o gato antes del vuelo: ventanas de comida y agua para evitar vómitos en transporte internacional | Feeding dog or cat before flight: food and water windows to avoid vomiting during international pet transport | Alimentation du chien ou du chat avant le vol : fenêtres repas et eau pour éviter les vomissements en transport international |
| 2 | `guia-articulo-alimentacion-antes-durante-vuelo-02.jpg` | Tras Sección 1, antes Sección 2 | Por qué comer de más antes de volar causa problemas digestivos en mascotas | Why overfeeding before flight causes digestive issues in pets | Pourquoi trop manger avant le vol provoque des troubles digestifs chez les animaux |

---

### 2. streesmascotas

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-streesmascotas-01.jpg` | Tras hero, antes scope-box | Señales de estrés en mascota durante viaje: identificación y manejo en vuelos internacionales | Signs of stress in pet during travel: identification and handling on international flights | Signes de stress chez l'animal en voyage : identification et prise en charge en vol international |
| 2 | `guia-streesmascotas-02.jpg` | Tras Sección 1, antes Sección 2 | Estrés en perro o gato durante el transporte: protocolos de intervención técnica | Stress in dog or cat during transport: technical intervention protocols | Stress du chien ou du chat pendant le transport : protocoles d'intervention technique |

---

### 3. veterimariosntrujillo

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-veterimariosntrujillo-01.jpg` | Tras hero, antes scope-box | Veterinarios especializados en viajes internacionales en Trujillo, Perú: criterios de selección | Veterinarians specialized in international pet travel in Trujillo, Peru: selection criteria | Vétérinaires spécialisés en voyages internationaux à Trujillo, Pérou : critères de sélection |
| 2 | `guia-veterimariosntrujillo-02.jpg` | Tras Sección 1, antes Sección 2 | Exportación de mascotas desde Trujillo: importancia del veterinario con experiencia en documentación | Pet export from Trujillo: importance of veterinarian with documentation experience | Exportation d'animaux depuis Trujillo : importance du vétérinaire expérimenté en documentation |

---

### 4. mascotabodega

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-mascotabodega-01.jpg` | Tras hero, antes scope-box | Mascota en bodega de avión: riesgos y realidades técnicas del transporte en vuelos internacionales | Pet in aircraft hold: risks and technical realities of transport on international flights | Animal en soute d'avion : risques et réalités techniques du transport en vols internationaux |
| 2 | `guia-mascotabodega-02.jpg` | Tras Sección 1, antes Sección 2 | Seguridad de la bodega para perros y gatos: hipoxia, temperatura y estrés metabólico | Safety of aircraft hold for dogs and cats: hypoxia, temperature and metabolic stress | Sécurité de la soute pour chiens et chats : hypoxie, température et stress métabolique |

---

### 5. dondetramitarentrujillo

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-dondetramitarentrujillo-01.jpg` | Tras hero, antes scope-box | Dónde tramitar certificado de viaje para mascotas en Trujillo, Perú: entidades y sedes oficiales | Where to process pet travel certificate in Trujillo, Peru: official entities and offices | Où faire délivrer le certificat de voyage pour animaux à Trujillo, Pérou : organismes et sièges officiels |
| 2 | `guia-dondetramitarentrujillo-02.jpg` | Tras Sección 1, antes Sección 2 | Exportación de mascotas en Trujillo: gestión del certificado zoosanitario y SENASA | Pet export in Trujillo: zoosanitary certificate and SENASA processing | Exportation d'animaux à Trujillo : délivrance du certificat zoosanitaire et SENASA |

---

### 6. mascotasinpapeles

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-mascotasinpapeles-01.jpg` | Tras hero, antes scope-box | Consecuencias de viajar con mascota sin papeles: retención, cuarentena y deportación | Consequences of travelling with pet without papers: detention, quarantine and deportation | Conséquences de voyager avec un animal sans papiers : rétention, quarantaine et déportation |
| 2 | `guia-mascotasinpapeles-02.jpg` | Tras Sección 1, antes Sección 2 | Documentación reglamentaria para exportar perros y gatos: requisitos por país | Regulatory documentation to export dogs and cats: requirements by country | Documentation réglementaire pour exporter chiens et chats : exigences par pays |

---

### 7. viaja-chile-argentina

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-viaja-chile-argentina-01.jpg` | Tras hero, antes scope-box | Viajar con perro a Chile, Argentina o Colombia: requisitos SENASA y certificados de salud | Travelling with dog to Chile, Argentina or Colombia: SENASA requirements and health certificates | Voyager avec un chien au Chili, en Argentine ou en Colombie : exigences SENASA et certificats de santé |
| 2 | `guia-viaja-chile-argentina-02.jpg` | Tras Sección 1, antes Sección 2 | Exportación de mascotas a Sudamérica: gestión de riesgos sanitarios y documentación | Pet export to South America: health risk management and documentation | Exportation d'animaux vers l'Amérique du Sud : gestion des risques sanitaires et documentation |

---

### 8. viajar_mascotas_australia_proceso_mas_estricto_editorial

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-viajar-mascotas-australia-01.jpg` | Tras hero, antes scope-box | Viajar con mascotas a Australia: proceso estricto, RNATT, país intermediario y cuarentena Mickleham | Travelling with pets to Australia: strict process, RNATT, intermediate country and Mickleham quarantine | Voyager avec des animaux en Australie : processus strict, RNATT, pays intermédiaire et quarantaine Mickleham |
| 2 | `guia-viajar-mascotas-australia-02.jpg` | Tras Sección 1, antes Sección 2 | Requisitos DAFF para importar perros y gatos a Australia desde Perú | DAFF requirements to import dogs and cats to Australia from Peru | Exigences DAFF pour importer chiens et chats en Australie depuis le Pérou |

---

### 9. llevar_mascota_japon_proceso_que_pocos_intentan

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-llevar-mascota-japon-01.jpg` | Tras hero, antes scope-box | Llevar mascota a Japón: microchip, vacunas, serología, 180 días de espera y aviso AQS | Taking pet to Japan: microchip, vaccines, serology, 180-day wait and AQS notice | Emmener un animal au Japon : puce, vaccins, sérologie, 180 jours d'attente et préavis AQS |
| 2 | `guia-llevar-mascota-japon-02.jpg` | Tras Sección 1, antes Sección 2 | Calendario y requisitos AQS para importar perros y gatos a Japón desde Latinoamérica | AQS calendar and requirements to import dogs and cats to Japan from Latin America | Calendrier et exigences AQS pour importer chiens et chats au Japon depuis l'Amérique latine |

---

### 10. articulo_rechazo_aduana_mascota

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-articulo-rechazo-aduana-mascota-01.jpg` | Tras hero, antes scope-box | Rechazo en aduana con mascota: retención, cuarentena y reexpedición por fallos documentales | Customs rejection with pet: detention, quarantine and re-export due to documentation failures | Refus en douane avec animal : rétention, quarantaine et réexpédition pour défaut de documents |
| 2 | `guia-articulo-rechazo-aduana-mascota-02.jpg` | Tras Sección 1, antes Sección 2 | Consecuencias sanitarias y legales cuando rechazan perro o gato en frontera | Health and legal consequences when dog or cat is rejected at border | Conséquences sanitaires et légales du refus d'un chien ou chat à la frontière |

---

### 11. articulo_cuanto_tiempo_antes_viaje_mascota

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-articulo-cuanto-tiempo-antes-viaje-mascota-01.jpg` | Tras hero, antes scope-box | Cuánto tiempo antes empezar viaje con mascota: microchip, RNATT, CZE y plazos críticos | How long before starting trip with pet: microchip, RNATT, CZE and critical deadlines | Combien de temps avant de commencer un voyage avec un animal : puce, RNATT, CZE et délais critiques |
| 2 | `guia-articulo-cuanto-tiempo-antes-viaje-mascota-02.jpg` | Tras Sección 1, antes Sección 2 | Cronología real para exportar mascota desde Perú: ventanas de 21, 30 y 10 días | Real timeline to export pet from Peru: 21-, 30- and 10-day windows | Chronologie réelle pour exporter un animal depuis le Pérou : fenêtres de 21, 30 et 10 jours |

---

### 12. articulo_certificado_zoosanitario_senasa_trujillo

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-articulo-certificado-zoosanitario-senasa-trujillo-01.jpg` | Tras hero, antes scope-box | Guía Senasa CA07 en Trujillo para emitir CZE de exportación de mascotas | Senasa CA07 guide in Trujillo to issue CZE for pet export | Guide Senasa CA07 à Trujillo pour délivrer le CZE d'exportation d'animaux |
| 2 | `guia-articulo-certificado-zoosanitario-senasa-trujillo-02.jpg` | Tras Sección 1, antes Sección 2 | Secuencia CA07: microchip, vacunas, certificado CMVP, desparasitación e inspección | CA07 sequence: microchip, vaccines, CMVP certificate, deworming and inspection | Séquence CA07 : puce, vaccins, certificat CMVP, déparasitage et inspection |

---

### 13. gatosbodegaavion

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-gatosbodegaavion-01.jpg` | Tras hero, antes scope-box | Gatos en cabina vs bodega: cuándo aplica cada opción en transporte aéreo internacional | Cats in cabin vs hold: when each option applies in international air transport | Chats en cabine ou en soute : quand choisir chaque option en transport aérien international |
| 2 | `guia-gatosbodegaavion-02.jpg` | Tras Sección 1, antes Sección 2 | Riesgos de lipidosis e hipobaria en gatos durante vuelo: criterios técnicos | Lipidosis and hypobaria risks in cats during flight: technical criteria | Risques de lipidose et d'hypobarie chez le chat en vol : critères techniques |

---

### 14. transportindeal

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-transportindeal-01.jpg` | Tras hero, antes scope-box | Transportín ideal para viajar en avión con mascota: medidas, materiales y normativa IATA | Ideal pet carrier for air travel: dimensions, materials and IATA regulations | Transport idéal pour voyager en avion avec un animal : dimensions, matériaux et normes IATA |
| 2 | `guia-transportindeal-02.jpg` | Tras Sección 1, antes Sección 2 | Errores frecuentes en transportín para perros y gatos en vuelos internacionales | Common mistakes in carrier for dogs and cats on international flights | Erreurs fréquentes du transport pour chiens et chats en vols internationaux |

---

### 15. viajarconpug

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-viajarconpug-01.jpg` | Tras hero, antes scope-box | Viajar con Pug en avión: riesgos BOAS, hipoxia y manejo para vuelos seguros | Travelling with Pug by plane: BOAS risks, hypoxia and handling for safe flights | Voyager avec un carlin en avion : risques BOAS, hypoxie et prise en charge pour vols sûrs |
| 2 | `guia-viajarconpug-02.jpg` | Tras Sección 1, antes Sección 2 | Síndrome obstructivo de vías aéreas en braquicéfalos: transporte aéreo | Brachycephalic obstructive airway syndrome: air transport | Syndrome obstructif des voies aériennes chez les brachycéphales : transport aérien |

---

### 16. prepararatuperro

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-prepararatuperro-01.jpg` | Tras hero, antes scope-box | Cómo preparar a tu perro para un vuelo largo: preparación fisiológica y metabólica | How to prepare your dog for a long flight: physiological and metabolic preparation | Comment préparer son chien à un long vol : préparation physiologique et métabolique |
| 2 | `guia-prepararatuperro-02.jpg` | Tras Sección 1, antes Sección 2 | Perro en vuelo internacional de larga distancia: protocolo previo al viaje | Dog on long-haul international flight: pre-travel protocol | Chien en vol international long-courrier : protocole avant le voyage |

---

### 17. llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-llevar-gato-estados-unidos-desde-peru-01.jpg` | Tras hero, antes scope-box | Llevar gato a Estados Unidos desde Perú 2026: requisitos federales y expediente SENASA | Taking cat to United States from Peru 2026: federal requirements and SENASA file | Emmener un chat aux États-Unis depuis le Pérou 2026 : exigences fédérales et dossier SENASA |
| 2 | `guia-llevar-gato-estados-unidos-desde-peru-02.jpg` | Tras Sección 1, antes Sección 2 | Ingreso de gatos a EE.UU.: qué exigen estados y aerolíneas además del federal | Cat entry to USA: what states and airlines require in addition to federal | Entrée des chats aux États-Unis : exigences des États et compagnies en plus du fédéral |

---

### 18. viajeanimalgeriatrico

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-viajeanimalgeriatrico-01.jpg` | Tras hero, antes scope-box | Viajar con perro senior: riesgos fisiológicos y logísticos después de los 8 años | Travelling with senior dog: physiological and logistical risks after 8 years | Voyager avec un chien senior : risques physiologiques et logistiques après 8 ans |
| 2 | `guia-viajeanimalgeriatrico-02.jpg` | Tras Sección 1, antes Sección 2 | Transporte aéreo de perros mayores: evaluación previa y manejo desde Trujillo | Air transport of older dogs: pre-assessment and handling from Trujillo | Transport aérien des chiens âgés : évaluation préalable et prise en charge depuis Trujillo |

---

### 19. requisitos_mascota_reino_unido_desde_latinoamerica_editorial_v2

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-requisitos-mascota-reino-unido-01.jpg` | Tras hero, antes scope-box | Requisitos para llevar mascota al Reino Unido desde Latinoamérica: microchip, rabia, serología | Requirements to bring pet to United Kingdom from Latin America: microchip, rabies, serology | Exigences pour emmener un animal au Royaume-Uni depuis l'Amérique latine : puce, rage, sérologie |
| 2 | `guia-requisitos-mascota-reino-unido-02.jpg` | Tras Sección 1, antes Sección 2 | Documento de viaje GOV.UK y plazos para entrada de perros y gatos a Gran Bretaña | GOV.UK pet travel document and deadlines for dog and cat entry to Great Britain | Document de voyage GOV.UK et délais pour l'entrée des chiens et chats en Grande-Bretagne |

---

### 20. zoovet_canada_exportacion

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-zoovet-canada-exportacion-01.jpg` | Tras hero, antes scope-box | Cómo mudarse con mascotas a Canadá desde Perú: microchip, vacunación y gestión logística | How to move with pets to Canada from Peru: microchip, vaccination and logistics | Comment s'installer au Canada avec des animaux depuis le Pérou : puce, vaccination et logistique |
| 2 | `guia-zoovet-canada-exportacion-02.jpg` | Tras Sección 1, antes Sección 2 | Exportación de perros y gatos de Perú a Canadá: requisitos CFIA y certificado bilingüe | Export of dogs and cats from Peru to Canada: CFIA requirements and bilingual certificate | Exportation de chiens et chats du Pérou vers le Canada : exigences ACIA et certificat bilingue |

---

### 21. bulldog_frances

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-bulldog-frances-01.jpg` | Tras hero, antes scope-box | ¿Puede volar mi bulldog francés? Riesgos de hipoxia y termorregulación en avión | Can my French bulldog fly? Hypoxia and thermoregulation risks on plane | Mon bouledogue français peut-il voler ? Risques d'hypoxie et de thermorégulation en avion |
| 2 | `guia-bulldog-frances-02.jpg` | Tras Sección 1, antes Sección 2 | Restricciones de aerolíneas para perros braquicéfalos: criterio médico previo al pasaje | Airline restrictions for brachycephalic dogs: medical assessment before booking | Restrictions des compagnies pour chiens brachycéphales : avis médical avant le billet |

---

### 22. como_viajar_perro_espana_desde_peru_requisitos_final_v2

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-como-viajar-perro-espana-desde-peru-01.jpg` | Tras hero, antes scope-box | Perro a España desde Perú: microchip, vacuna antirrábica, serología 0,5 UI/mL y endoso SENASA | Dog to Spain from Peru: microchip, rabies vaccine, 0.5 UI/mL serology and SENASA endorsement | Chien en Espagne depuis le Pérou : puce, vaccin antirabique, sérologie 0,5 UI/mL et visa SENASA |
| 2 | `guia-como-viajar-perro-espana-desde-peru-02.jpg` | Tras Sección 1, antes Sección 2 | Requisitos paso a paso para viajar con perro a España: espera 3 meses y certificado oficial | Step-by-step requirements to travel with dog to Spain: 3-month wait and official certificate | Exigences pas à pas pour voyager avec un chien en Espagne : attente 3 mois et certificat officiel |

---

### 23. queeselmicrochipdondelotramitas

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-queeselmicrochipdondelotramitas-01.jpg` | Tras hero, antes scope-box | Microchip internacional para mascotas en Perú: estándar ISO FDX-B e implantación en Trujillo | International microchip for pets in Peru: ISO FDX-B standard and implantation in Trujillo | Puce internationale pour animaux au Pérou : norme ISO FDX-B et implantation à Trujillo |
| 2 | `guia-queeselmicrochipdondelotramitas-02.jpg` | Tras Sección 1, antes Sección 2 | Requisitos internacionales de identificación con microchip en perros y gatos | International microchip identification requirements for dogs and cats | Exigences internationales d'identification par puce chez le chien et le chat |

---

### 24. rnattviajes

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-rnattviajes-01.jpg` | Tras hero, antes scope-box | RNATT título serológico antirrábico: cuándo lo necesita tu perro para UE y otros países | RNATT rabies serological titre: when your dog needs it for EU and other countries | RNATT titre sérique antirabique : quand votre chien en a besoin pour l'UE et autres pays |
| 2 | `guia-rnattviajes-02.jpg` | Tras Sección 1, antes Sección 2 | Plazos de 30 días y umbral 0,5 UI/mL para viaje internacional con mascota | 30-day deadlines and 0.5 UI/mL threshold for international pet travel | Délais de 30 jours et seuil 0,5 UI/mL pour le voyage international avec animal |

---

### 25. articulo_golden_labrador_cabina_bodega

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-articulo-golden-labrador-cabina-bodega-01.jpg` | Tras hero, antes scope-box | Cabina o bodega en golden y labrador: criterios reales de tamaño, presurización y documentación | Cabin or hold for golden and labrador: real criteria for size, pressurization and documentation | Cabine ou soute pour golden et labrador : critères réels de taille, pressurisation et documents |
| 2 | `guia-articulo-golden-labrador-cabina-bodega-02.jpg` | Tras Sección 1, antes Sección 2 | Puntos críticos antes de comprar pasaje para perros grandes: contenedor y estrés | Critical points before buying ticket for large dogs: container and stress | Points critiques avant d'acheter le billet pour grands chiens : conteneur et stress |

---

### 26. articulo_vacuna_antirrabica_para_viajar

| # | Nombre de archivo | Posición | Alt ES | Alt EN | Alt FR |
|---|-------------------|----------|--------|--------|--------|
| 1 | `guia-articulo-vacuna-antirrabica-para-viajar-01.jpg` | Tras hero, antes scope-box | Vacuna antirrábica para viajar: plazos 21 días UE, 30 días RNATT y microchip previo | Rabies vaccine for travel: 21-day EU validity, 30-day RNATT and microchip first | Vaccin antirabique pour voyager : 21 jours UE, 30 jours RNATT et puce avant |
| 2 | `guia-articulo-vacuna-antirrabica-para-viajar-02.jpg` | Tras Sección 1, antes Sección 2 | Errores de secuencia en vacunación antirrábica que reinician protocolos de exportación | Sequence errors in rabies vaccination that reset export protocols | Erreurs de séquence dans la vaccination antirabique qui réinitialisent les protocoles d'export |

---

## Resumen para ti

- **52 archivos** en total, nombres exactos como en la tabla.
- **Carpeta:** `images/guias/` (ya existe; sube ahí las fotos).
- **Tamaño:** 1200 × 800 px para todos.
- **Estado:** Las etiquetas `<figure>` e `<img>` con `alt` por idioma (ES/EN/FR) ya están insertadas en los **78 HTML** (26 artículos × 3 idiomas). Solo falta subir las 52 imágenes con los nombres indicados.

---

## Lista plana de los 52 nombres de archivo (para nombrar las fotos)

```
guia-articulo-alimentacion-antes-durante-vuelo-01.jpg
guia-articulo-alimentacion-antes-durante-vuelo-02.jpg
guia-streesmascotas-01.jpg
guia-streesmascotas-02.jpg
guia-veterimariosntrujillo-01.jpg
guia-veterimariosntrujillo-02.jpg
guia-mascotabodega-01.jpg
guia-mascotabodega-02.jpg
guia-dondetramitarentrujillo-01.jpg
guia-dondetramitarentrujillo-02.jpg
guia-mascotasinpapeles-01.jpg
guia-mascotasinpapeles-02.jpg
guia-viaja-chile-argentina-01.jpg
guia-viaja-chile-argentina-02.jpg
guia-viajar-mascotas-australia-01.jpg
guia-viajar-mascotas-australia-02.jpg
guia-llevar-mascota-japon-01.jpg
guia-llevar-mascota-japon-02.jpg
guia-articulo-rechazo-aduana-mascota-01.jpg
guia-articulo-rechazo-aduana-mascota-02.jpg
guia-articulo-cuanto-tiempo-antes-viaje-mascota-01.jpg
guia-articulo-cuanto-tiempo-antes-viaje-mascota-02.jpg
guia-articulo-certificado-zoosanitario-senasa-trujillo-01.jpg
guia-articulo-certificado-zoosanitario-senasa-trujillo-02.jpg
guia-gatosbodegaavion-01.jpg
guia-gatosbodegaavion-02.jpg
guia-transportindeal-01.jpg
guia-transportindeal-02.jpg
guia-viajarconpug-01.jpg
guia-viajarconpug-02.jpg
guia-prepararatuperro-01.jpg
guia-prepararatuperro-02.jpg
guia-llevar-gato-estados-unidos-desde-peru-01.jpg
guia-llevar-gato-estados-unidos-desde-peru-02.jpg
guia-viajeanimalgeriatrico-01.jpg
guia-viajeanimalgeriatrico-02.jpg
guia-requisitos-mascota-reino-unido-01.jpg
guia-requisitos-mascota-reino-unido-02.jpg
guia-zoovet-canada-exportacion-01.jpg
guia-zoovet-canada-exportacion-02.jpg
guia-bulldog-frances-01.jpg
guia-bulldog-frances-02.jpg
guia-como-viajar-perro-espana-desde-peru-01.jpg
guia-como-viajar-perro-espana-desde-peru-02.jpg
guia-queeselmicrochipdondelotramitas-01.jpg
guia-queeselmicrochipdondelotramitas-02.jpg
guia-rnattviajes-01.jpg
guia-rnattviajes-02.jpg
guia-articulo-golden-labrador-cabina-bodega-01.jpg
guia-articulo-golden-labrador-cabina-bodega-02.jpg
guia-articulo-vacuna-antirrabica-para-viajar-01.jpg
guia-articulo-vacuna-antirrabica-para-viajar-02.jpg
```

Para reinsertar o corregir en el futuro (por si añades más artículos), puedes ejecutar desde la raíz del repo:  
`python scripts/insert-guia-images.py` (o `node scripts/insert-guia-images.js` si tienes Node). Los scripts omiten archivos que ya contienen `guia-img`.

---

## Home — «Historias que ya cruzaron fronteras» (solo fotos, sin texto debajo)

Sección antes del footer en `index.html` / `index-en.html` / `index-fr.html`. Solo imágenes en grid; sin captions.

### Estructura visual recomendada

- **Cantidad de fotos:** **6**. Dos filas en desktop, una lectura clara, sin scroll infinito y sin quedar vacío ni recargado.
- **Grid:** 3 columnas (desktop) → 2 (tablet) → 1 (móvil). Misma estructura en los tres idiomas.

```
Desktop (≈ 1024px+):
┌─────────┬─────────┬─────────┐
│ foto 1  │ foto 2  │ foto 3  │
├─────────┼─────────┼─────────┤
│ foto 4  │ foto 5  │ foto 6  │
└─────────┴─────────┴─────────┘

Tablet (≈ 768–1023px):
┌─────────┬─────────┐
│ foto 1  │ foto 2  │
├─────────┼─────────┤
│ foto 3  │ foto 4  │
├─────────┼─────────┤
│ foto 5  │ foto 6  │
└─────────┴─────────┘

Móvil:
┌─────────┐
│ foto 1  │
├─────────┤
│ foto 2  │
│  ...    │
│ foto 6  │
└─────────┘
```

### Especificación por imagen

| Especificación | Valor |
|----------------|--------|
| **Cantidad** | **6** fotos |
| **Dimensiones** | **1200 × 800 px** (ancho × alto) |
| **Proporción** | **3:2** (el CSS usa `aspect-[3/2]` + `object-cover`) |
| **Formato** | **WebP** (calidad 85). Buena nitidez y poco peso. |
| **Peso máximo por imagen** | **≈ 150–200 KB** (evita scroll lento y mantiene elegancia) |
| **Carpeta** | `images/historias/` |
| **Nombres de archivo** | `historia-01.webp` … `historia-06.webp` |

Con 6 fotos a 1200×800 y ~150–200 KB cada una, la sección entra en poco más de una ventana en desktop (dos filas) y en móvil son 6 bloques seguidos sin sensación de galería infinita. Menos de 6 queda escueto; más de 6 empieza a alargar y pierde el cierre elegante antes del footer.

### Alt texts por idioma (ya aplicados en index / index-en / index-fr)

| Archivo | Alt ES | Alt EN | Alt FR |
|---------|--------|--------|--------|
| historia-01.webp | Perro o gato exportado por Zoovet Travel a destino internacional. | Dog or cat exported by Zoovet Travel to international destination. | Chien ou chat exporté par Zoovet Travel vers une destination internationale. |
| historia-02.webp | Mascota exportada con gestión integral y protocolo veterinario. | Pet exported with full logistics and veterinary protocol. | Animal exporté avec logistique complète et protocole vétérinaire. |
| historia-03.webp | Caso de exportación internacional de mascota desde Perú. | International pet export case from Peru. | Cas d'exportation internationale d'animal depuis le Pérou. |
| historia-04.webp | Mascota tras completar proceso de exportación internacional. | Pet after completing international export process. | Animal après exportation internationale. |
| historia-05.webp | Ejemplo de mascota enviada a país de destino. | Example of pet shipped to destination country. | Exemple d'animal envoyé vers le pays de destination. |
| historia-06.webp | Mascota exportada con medicina veterinaria especializada. | Pet exported with specialized veterinary care. | Animal exporté avec médecine vétérinaire spécialisée. |
