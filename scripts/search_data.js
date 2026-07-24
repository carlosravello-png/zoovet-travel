// Base de datos de Búsqueda — actualizada el 24-07-2026 (717 páginas)
const rawSearchData = [
 {
  "title": "No existe una lista única de laboratorios antirrábicos: cada autoridad tiene la suya",
  "url": "journal/laboratorios-serologia-sin-consenso-2026.html",
  "category": "Journal",
  "keywords": "La prueba de sangre de tu perro puede valer para un país y no valer para otro. Comprobamos las cuatro listas oficiales de laboratorios de serología antirrábica —Estados Unidos, Japón, Unión Europea y Reino Unido— y no coinciden. Biobest, laboratorio aprobado, revocado, caducado.",
  "lang": "es"
 },
 {
  "title": "There is no single list of rabies serology laboratories: every authority keeps its own",
  "url": "journal/laboratorios-serologia-sin-consenso-2026-en.html",
  "category": "Journal",
  "keywords": "Your dog's blood test may count for one country and not for another. We checked the four official lists of rabies serology laboratories —United States, Japan, European Union and United Kingdom— and they do not match. Biobest: approved, revoked, expired, unlisted.",
  "lang": "en"
 },
 {
  "title": "Il n'existe pas de liste unique des laboratoires de sérologie antirabique : chaque autorité a la sienne",
  "url": "journal/laboratorios-serologia-sin-consenso-2026-fr.html",
  "category": "Journal",
  "keywords": "La prise de sang de votre chien peut valoir pour un pays et pas pour un autre. Nous avons vérifié les quatre listes officielles de laboratoires de sérologie antirabique —États-Unis, Japon, Union européenne et Royaume-Uni— et elles ne concordent pas. Biobest.",
  "lang": "fr"
 },
 {
  "title": "About Zoovet Travel — Veterinary Clinic Specialized in International Pet Export | Trujillo, Peru",
  "url": "about-en.html",
  "category": "Sobre nosotros",
  "keywords": "Zoovet Travel: veterinary clinic specialized in international pet export, founded in 2013 in Trujillo, Peru. CMVP-certified team, SENASA protocols, rabies serology and over 12 years of experience.",
  "lang": "en"
 },
 {
  "title": "À propos de Zoovet Travel — Clinique Vétérinaire Spécialisée en Exportation Internationale d'Animaux | Trujill",
  "url": "about-fr.html",
  "category": "Sobre nosotros",
  "keywords": "Zoovet Travel : clinique vétérinaire spécialisée en exportation internationale d'animaux, fondée en 2013 à Trujillo, Pérou. Équipe CMVP, protocoles SENASA, sérologie de la rage et plus de 12 ans d'expérience.",
  "lang": "fr"
 },
 {
  "title": "Sobre Zoovet Travel — Clínica Veterinaria Especializada en Exportación Internacional | Trujillo, Perú",
  "url": "about.html",
  "category": "Sobre nosotros",
  "keywords": "Zoovet Travel: clínica veterinaria especializada en exportación internacional de mascotas, fundada en 2013 en Trujillo, Perú. Equipo CMVP, protocolos SENASA, serología de rabia y más de 12 años de trayectoria.",
  "lang": "es"
 },
 {
  "title": "Directory of airlines with a pet cargo (live animals / AVI) program",
  "url": "aerolineas-carga-mascotas-en.html",
  "category": "Servicios",
  "keywords": "Which airlines move your pet as cargo (live animals / AVI) and how do you book? 24 airlines verified on their official cargo sites: via agent, direct booking, or restricted program.",
  "lang": "en"
 },
 {
  "title": "Annuaire des compagnies avec programme de fret d'animaux (vivants / AVI)",
  "url": "aerolineas-carga-mascotas-fr.html",
  "category": "Servicios",
  "keywords": "Quelles compagnies transportent votre animal en fret (animaux vivants / AVI) et comment réserver ? 24 compagnies vérifiées sur leurs sites officiels : via agent, réservation directe ou programme restreint.",
  "lang": "fr"
 },
 {
  "title": "Directorio de aerolíneas con programa de carga de mascotas (AVI)",
  "url": "aerolineas-carga-mascotas.html",
  "category": "Servicios",
  "keywords": "¿Qué aerolíneas transportan tu mascota como carga (AVI) y cómo se reserva? 24 aerolíneas verificadas en sus webs oficiales: vía agente, reserva directa o programa restringido.",
  "lang": "es"
 },
 {
  "title": "Scientific Articles in Applied Veterinary Medicine for International Pet Transport",
  "url": "articles/index-en.html",
  "category": "Serie técnica",
  "keywords": "Scientific Articles in Applied Veterinary Medicine for International Pet Transport",
  "lang": "en"
 },
 {
  "title": "Articles scientifiques en médecine vétérinaire appliquée au transport international d'animaux de compagnie",
  "url": "articles/index-fr.html",
  "category": "Serie técnica",
  "keywords": "Articles scientifiques en médecine vétérinaire appliquée au transport international d'animaux de compagnie",
  "lang": "fr"
 },
 {
  "title": "Artículos Científicos en Medicina Veterinaria Aplicada al Transporte Internacional de Mascotas",
  "url": "articles/index.html",
  "category": "Serie técnica",
  "keywords": "Artículos Científicos en Medicina Veterinaria Aplicada al Transporte Internacional de Mascotas",
  "lang": "es"
 },
 {
  "title": "Pourquoi les pays retiennent votre animal à l'aéroport — Zoovet Travel Connaissance Ouverte",
  "url": "articles/zoovet-connaissance-ouverte-transport-animaux-FR.html",
  "category": "Serie técnica",
  "keywords": "Zoovet Travel a déposé ses connaissances techniques dans des dépôts en accès ouvert — 10 articles avec DOI permanents et en croissance sur le transport international d'animaux, vérifiables sur Zenodo et OSF. CC BY 4.0.",
  "lang": "fr"
 },
 {
  "title": "Por qué los países retienen a tu mascota en el aeropuerto — Zoovet Travel Conocimiento Abierto",
  "url": "articles/zoovet-conocimiento-abierto-transporte-mascotas-ES.html",
  "category": "Serie técnica",
  "keywords": "60–70% de las retenciones son documentales, no sanitarias. Un perro → 18 personas en profilaxis → USD 270.000. Lo que debes saber antes del vuelo.",
  "lang": "es"
 },
 {
  "title": "Why Countries Detain Your Pet at the Airport — Zoovet Travel Open Knowledge",
  "url": "articles/zoovet-open-knowledge-pet-transport-EN.html",
  "category": "Serie técnica",
  "keywords": "Zoovet Travel has deposited its technical knowledge in open-access repositories — 10 articles with permanent DOIs and growing on international pet transport, verifiable on Zenodo and OSF. CC BY 4.0.",
  "lang": "en"
 },
 {
  "title": "The health certificate in international movement of dogs and cats: clinical examination, health traceability a",
  "url": "articles/zoovet_art10_certificado-salud-EN.html",
  "category": "Serie técnica",
  "keywords": "International veterinary health certificate for dogs and cats: clinical examination, health traceability, document validity.",
  "lang": "en"
 },
 {
  "title": "El certificado de salud en el movimiento internacional de perros y gatos: examen clínico, trazabilidad sanitar",
  "url": "articles/zoovet_art10_certificado-salud-ES.html",
  "category": "Serie técnica",
  "keywords": "Certificado de salud veterinario internacional para perros y gatos: examen clínico, trazabilidad sanitaria, validez documental.",
  "lang": "es"
 },
 {
  "title": "Le certificat de santé dans le déplacement international de chiens et chats : examen clinique, traçabilité san",
  "url": "articles/zoovet_art10_certificado-salud-FR.html",
  "category": "Serie técnica",
  "keywords": "Certificat de santé vétérinaire international pour chiens et chats : examen clinique, traçabilité sanitaire, validité documentaire.",
  "lang": "fr"
 },
 {
  "title": "Quarantine in International Dog and Cat Importation: Epidemiological Basis, Regulatory Models and Critical Fai",
  "url": "articles/zoovet_art11_cuarentena-EN.html",
  "category": "Serie técnica",
  "keywords": "Quarantine in international dog and cat importation: epidemiological basis, regulatory models (Australia/NZ, EU/UK, USA), CDC Dog Import Rule, DAFF.",
  "lang": "en"
 },
 {
  "title": "Cuarentena en la Importación Internacional de Perros y Gatos: Fundamento Epidemiológico, Modelos Regulatorios ",
  "url": "articles/zoovet_art11_cuarentena-ES.html",
  "category": "Serie técnica",
  "keywords": "Cuarentena en la importación internacional de perros y gatos: fundamento epidemiológico, modelos regulatorios (Australia/NZ, UE/UK, EE.UU.).",
  "lang": "es"
 },
 {
  "title": "Quarantaine dans l'Importation Internationale de Chiens et Chats : Fondement Épidémiologique, Modèles Réglemen",
  "url": "articles/zoovet_art11_cuarentena-FR.html",
  "category": "Serie técnica",
  "keywords": "Quarantaine dans l'importation internationale de chiens et chats : fondement épidémiologique, modèles réglementaires (Australie/NZ, UE/UK, USA).",
  "lang": "fr"
 },
 {
  "title": "Pet Travel Dossier: Document Chain & Errors",
  "url": "articles/zoovet_art12_expediente-EN.html",
  "category": "Serie técnica",
  "keywords": "Pet export dossier: complete documentary chain, error taxonomy by reversibility, SENASA Peru procedure, CZE, veterinary export certification.",
  "lang": "en"
 },
 {
  "title": "El Expediente de Exportación de Mascotas: Cadena Documental Completa, Taxonomía del Error y Reversibilidad | Z",
  "url": "articles/zoovet_art12_expediente-ES.html",
  "category": "Serie técnica",
  "keywords": "Expediente de exportación de mascotas: cadena documental completa, taxonomía del error por reversibilidad, procedimiento SENASA Perú, CZE.",
  "lang": "es"
 },
 {
  "title": "Le Dossier d'Exportation d'Animaux de Compagnie : Chaîne Documentaire Complète, Taxonomie de l'Erreur et Réver",
  "url": "articles/zoovet_art12_expediente-FR.html",
  "category": "Serie técnica",
  "keywords": "Dossier d'exportation d'animaux de compagnie : chaîne documentaire complète, taxonomie de l'erreur par réversibilité, procédure SENASA Pérou.",
  "lang": "fr"
 },
 {
  "title": "CDC and dog importation to the United States: analysis of the 2024 Interim Final Rule and the DogBot system | ",
  "url": "articles/zoovet_art13_cdc-dmrvv-EN.html",
  "category": "Serie técnica",
  "keywords": "Technical analysis of the CDC 2024 Interim Final Rule for dog importation into the United States, the DogBot system, DMRVV risk classification and the full protocol from Peru.",
  "lang": "en"
 },
 {
  "title": "CDC e importación de perros a Estados Unidos: análisis de la regla provisional de 2024 y el sistema DogBot | Z",
  "url": "articles/zoovet_art13_cdc-dmrvv-ES.html",
  "category": "Serie técnica",
  "keywords": "Análisis técnico de la Interim Final Rule del CDC 2024 para importación de perros a EE.UU., el sistema DogBot, clasificación por riesgo de rabia canina y protocolo desde Perú.",
  "lang": "es"
 },
 {
  "title": "CDC et importation de chiens aux États-Unis: analyse de la règle provisoire de 2024 et du système DogBot | Zoo",
  "url": "articles/zoovet_art13_cdc-dmrvv-FR.html",
  "category": "Serie técnica",
  "keywords": "Analyse technique de la règle provisoire CDC 2024 pour l'importation de chiens aux États-Unis, le système DogBot, la classification DMRVV et le protocole complet depuis le Pérou.",
  "lang": "fr"
 },
 {
  "title": "APHA post-Brexit and the Animal Health Certificate: analysis of the new UK pet importation regime | Zoovet Tra",
  "url": "articles/zoovet_art14_apha-post-brexit-EN.html",
  "category": "Serie técnica",
  "keywords": "Technical analysis of the post-Brexit Animal Health Certificate (AHC) issued by APHA/DEFRA for pet importation into the United Kingdom from Peru: requirements, timelines, authorized ports of entry and common errors.",
  "lang": "en"
 },
 {
  "title": "APHA post-Brexit y el Animal Health Certificate: análisis del nuevo régimen de importación de mascotas al Rein",
  "url": "articles/zoovet_art14_apha-post-brexit-ES.html",
  "category": "Serie técnica",
  "keywords": "Análisis técnico del Animal Health Certificate (AHC) post-Brexit emitido por APHA/DEFRA para importación de mascotas al Reino Unido desde Perú: requisitos, plazos, puertos autorizados y errores frecuentes.",
  "lang": "es"
 },
 {
  "title": "APHA post-Brexit et l'Animal Health Certificate: analyse du nouveau régime d'importation d'animaux au Royaume-",
  "url": "articles/zoovet_art14_apha-post-brexit-FR.html",
  "category": "Serie técnica",
  "keywords": "Analyse technique de l'Animal Health Certificate (AHC) post-Brexit émis par APHA/DEFRA pour l'importation d'animaux de compagnie au Royaume-Uni depuis le Pérou: exigences, délais, ports autorisés et erreurs fréquentes.",
  "lang": "fr"
 },
 {
  "title": "MPI New Zealand: the world's strictest biosecurity system and quarantine requirements for pets | Zoovet Travel",
  "url": "articles/zoovet_art15_mpi-nueva-zelanda-EN.html",
  "category": "Serie técnica",
  "keywords": "Technical analysis of New Zealand's MPI biosecurity system for importing dogs and cats from Peru: country group classification, full protocol, mandatory post-arrival quarantine, RFFIT requirements and critical errors.",
  "lang": "en"
 },
 {
  "title": "MPI Nueva Zelanda: el sistema de bioseguridad más estricto del mundo y los requisitos de cuarentena para masco",
  "url": "articles/zoovet_art15_mpi-nueva-zelanda-ES.html",
  "category": "Serie técnica",
  "keywords": "Análisis técnico del sistema de bioseguridad MPI de Nueva Zelanda para importación de perros y gatos desde Perú: clasificación de países, protocolo completo, cuarentena, requisitos RFFIT y errores críticos.",
  "lang": "es"
 },
 {
  "title": "MPI Nouvelle-Zélande: le système de biosécurité le plus strict au monde et les exigences de quarantaine pour a",
  "url": "articles/zoovet_art15_mpi-nueva-zelanda-FR.html",
  "category": "Serie técnica",
  "keywords": "Analyse technique du système de biosécurité MPI de Nouvelle-Zélande pour l'importation de chiens et chats depuis le Pérou: classification des pays, protocole complet, quarantaine, RFFIT et erreurs critiques.",
  "lang": "fr"
 },
 {
  "title": "SAG Chile and pet importation: the most regulated Latin American destination | Zoovet Travel Technical Series ",
  "url": "articles/zoovet_art16_sag-chile-EN.html",
  "category": "Serie técnica",
  "keywords": "Technical guide for SAG Chile requirements to import dogs and cats from Peru: microchip, vaccination, SENASA health certificate, anti-parasitic treatments, and border procedure.",
  "lang": "en"
 },
 {
  "title": "SAG Chile y la importación de mascotas: el destino latinoamericano más regulado | Zoovet Travel Serie Técnica ",
  "url": "articles/zoovet_art16_sag-chile-ES.html",
  "category": "Serie técnica",
  "keywords": "Guía técnica de requisitos SAG Chile para importar perros y gatos desde Perú: microchip, vacunación, certificado sanitario SENASA, tratamientos antiparasitarios y procedimiento en frontera.",
  "lang": "es"
 },
 {
  "title": "SAG Chili et l'importation d'animaux de compagnie: la destination latino-américaine la plus réglementée | Zoov",
  "url": "articles/zoovet_art16_sag-chile-FR.html",
  "category": "Serie técnica",
  "keywords": "Guide technique des exigences SAG Chili pour importer des chiens et chats depuis le Pérou: micropuce, vaccination, certificat sanitaire SENASA, traitements antiparasitaires et procédure frontalière.",
  "lang": "fr"
 },
 {
  "title": "Regulation (EU) 576/2013: The European Framework for Non-Commercial Movement of Pet Animals — Technical Analys",
  "url": "articles/zoovet_art17_reglamento-ue-576-EN.html",
  "category": "Serie técnica",
  "keywords": "Technical analysis of EU Regulation 576/2013 for pet exports from Peru to the EU: RFFIT, third-country official certificate, full protocol, Member State variations and critical errors.",
  "lang": "en"
 },
 {
  "title": "Reglamento (UE) 576/2013: el marco europeo para el desplazamiento no comercial de animales de compañía — análi",
  "url": "articles/zoovet_art17_reglamento-ue-576-ES.html",
  "category": "Serie técnica",
  "keywords": "Análisis técnico del Reglamento (UE) 576/2013 para exportación de mascotas desde Perú a la UE: RFFIT, certificado oficial, protocolo completo, variaciones por Estado Miembro y errores frecuentes.",
  "lang": "es"
 },
 {
  "title": "Règlement (UE) 576/2013: Le cadre européen pour le mouvement non commercial d'animaux de compagnie — Analyse t",
  "url": "articles/zoovet_art17_reglamento-ue-576-FR.html",
  "category": "Serie técnica",
  "keywords": "Analyse technique du Règlement (UE) 576/2013 pour l'exportation d'animaux de compagnie depuis le Pérou vers l'UE: RFFIT, certificat officiel pays tiers, protocole complet, variations par État Membre et erreurs critiques.",
  "lang": "fr"
 },
 {
  "title": "Rabies Antibody Reconversion Following D1/D15/D30 Protocol in a Weimaraner with Primary FAVN Failure: Case Rep",
  "url": "articles/zoovet_art18_aton-favn-EN.html",
  "category": "Serie técnica",
  "keywords": "First openly published FAVN failure/reconversion case report with verified KSVDL identifiers from Latin America. Weimaraner primary failure 0.22 IU/mL reconverted to ≥3.46 IU/mL via Novibac Rabies D1/D15/D30. Open access",
  "lang": "en"
 },
 {
  "title": "Reconversión Serológica Post-Protocolo D1/D15/D30 en Weimaraner con Fallo Primario FAVN: Reporte de Caso y Aná",
  "url": "articles/zoovet_art18_aton-favn-ES.html",
  "category": "Serie técnica",
  "keywords": "Primer reporte de caso FAVN fallo/reconversión publicado en acceso abierto con identificadores KSVDL verificables desde América Latina. Weimaraner fallo primario 0.22 UI/mL reconvertido a ≥3.46 UI/mL con Novibac Rabies D",
  "lang": "es"
 },
 {
  "title": "Reconversion Sérologique Post-Protocole D1/J15/J30 chez un Braque de Weimar présentant un Échec Primaire au Te",
  "url": "articles/zoovet_art18_aton-favn-FR.html",
  "category": "Serie técnica",
  "keywords": "Premier rapport de cas FAVN échec/reconversion publié en libre accès avec identifiants KSVDL vérifiables depuis l'Amérique latine. Braque de Weimar échec primaire 0,22 UI/mL reconverti à ≥3,46 UI/mL avec Novibac Rabies D",
  "lang": "fr"
 },
 {
  "title": "Antiparasitic Interventions Required for International Dog Movements: Biological Basis and Comparative Regulat",
  "url": "articles/zoovet_art4_desparasitacionEN.html",
  "category": "Serie técnica",
  "keywords": "Comparative regulatory analysis of antiparasitic treatment requirements for international dog entry:",
  "lang": "en"
 },
 {
  "title": "Intervenciones antiparasitarias en movimientos internacionales de perros: fundamentos biológicos y criterios r",
  "url": "articles/zoovet_art4_desparasitacionES.html",
  "category": "Serie técnica",
  "keywords": "Análisis regulatorio comparado de los requisitos de tratamiento antiparasitario exigidos para el ingreso internacional de perros:",
  "lang": "es"
 },
 {
  "title": "Interventions antiparasitaires exigées pour les mouvements internationaux de chiens : fondement biologique et ",
  "url": "articles/zoovet_art4_desparasitacionFR.html",
  "category": "Serie técnica",
  "keywords": "Analyse réglementaire comparée des exigences de traitement antiparasitaire pour l'entrée internationale des chiens :",
  "lang": "fr"
 },
 {
  "title": "The Gut–Brain Axis in Dogs and Cats During International Transport: Neuroendocrine Integration, Microbiota and",
  "url": "articles/zoovet_art5_estres-metabolico-EN.html",
  "category": "Serie técnica",
  "keywords": "Integrated mechanistic review of the gut-brain axis in dogs and cats during international transport:",
  "lang": "en"
 },
 {
  "title": "El eje intestino–cerebro en perros y gatos durante transporte internacional: integración neuroendocrina, micro",
  "url": "articles/zoovet_art5_estres-metabolico-ES.html",
  "category": "Serie técnica",
  "keywords": "Revisión mecanística integrada del eje intestino–cerebro en perros y gatos durante transporte internacional:",
  "lang": "es"
 },
 {
  "title": "L'axe intestin–cerveau chez le chien et le chat lors du transport international : intégration neuroendocrinien",
  "url": "articles/zoovet_art5_estres-metabolico-FR.html",
  "category": "Serie técnica",
  "keywords": "Revue mécanistique intégrée de l'axe intestin–cerveau chez le chien et le chat lors du transport international :",
  "lang": "fr"
 },
 {
  "title": "Animal Identification Microchip: Technological Basis, International Regulatory Framework and Sanitary Traceabi",
  "url": "articles/zoovet_art6_microchip-EN.html",
  "category": "Serie técnica",
  "keywords": "Technical and regulatory analysis of the animal identification microchip: ISO 11784/11785, EU Reg.",
  "lang": "en"
 },
 {
  "title": "Microchip de identificación animal: fundamento tecnológico, marco regulatorio internacional y trazabilidad san",
  "url": "articles/zoovet_art6_microchip-ES.html",
  "category": "Serie técnica",
  "keywords": "Análisis técnico-regulatorio del microchip RFID en identificación animal: estándares ISO 11784/11785, Reglamento (UE) 576/2013, DAFF/MPI.",
  "lang": "es"
 },
 {
  "title": "Puce d'identification animale : fondement technologique, cadre réglementaire international et traçabilité sani",
  "url": "articles/zoovet_art6_microchip-FR.html",
  "category": "Serie técnica",
  "keywords": "Analyse technique et réglementaire de la puce d'identification animale : ISO 11784/11785, Règlement UE 576/2013, DAFF/MPI, biocompatibilité.",
  "lang": "fr"
 },
 {
  "title": "Circadian desynchronization and transport stress in dogs and cats: the phenomenon commonly known as «jet lag» ",
  "url": "articles/zoovet_art7_jetlag-EN.html",
  "category": "Serie técnica",
  "keywords": "Circadian desynchronization and transport stress in dogs and cats: review of canine and feline chronobiology, HPA/SAM axes.",
  "lang": "en"
 },
 {
  "title": "Desincronización circadiana y estrés de transporte en perros y gatos: el fenómeno conocido como «jet lag» | Zo",
  "url": "articles/zoovet_art7_jetlag-ES.html",
  "category": "Serie técnica",
  "keywords": "Desincronización circadiana y estrés de transporte en perros y gatos: revisión de cronobiología canina y felina, ejes HPA/SAM.",
  "lang": "es"
 },
 {
  "title": "Désynchronisation circadienne et stress du transport chez le chien et le chat : le phénomène communément appel",
  "url": "articles/zoovet_art7_jetlag-FR.html",
  "category": "Serie técnica",
  "keywords": "Désynchronisation circadienne et stress du transport chez le chien et le chat : revue de la chronobiologie canine et féline, axes HPA/SAM.",
  "lang": "fr"
 },
 {
  "title": "Hypobaric physiology in air transport of dogs and cats: pressurization, oxygen and physiological response in c",
  "url": "articles/zoovet_art8_hipobaria-EN.html",
  "category": "Serie técnica",
  "keywords": "How cabin pressure and low humidity affect dogs on flights: oxygen drop, respiratory stress and risks for flat-faced breeds. Vet guide — Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "Fisiología hipobárica en el transporte aéreo de perros y gatos: presurización, oxígeno y respuesta fisiológica",
  "url": "articles/zoovet_art8_hipobaria-ES.html",
  "category": "Serie técnica",
  "keywords": "Fisiología hipobárica en transporte aéreo de perros y gatos: presurización, presión parcial de oxígeno, respuesta fisiológica en vuelo comercial.",
  "lang": "es"
 },
 {
  "title": "Physiologie hypobare dans le transport aérien du chien et du chat : pressurisation, oxygène et réponse physiol",
  "url": "articles/zoovet_art8_hipobaria-FR.html",
  "category": "Serie técnica",
  "keywords": "Physiologie hypobare dans le transport aérien du chien et du chat : pressurisation, pression partielle inspirée en O₂.",
  "lang": "fr"
 },
 {
  "title": "Vaccination certificates in dogs and cats: immunological basis, health validity and international regulatory f",
  "url": "articles/zoovet_art9_certificados-vacunacion-EN.html",
  "category": "Serie técnica",
  "keywords": "Vaccination certificates in dogs and cats: immunological basis, health validity, international regulatory framework.",
  "lang": "en"
 },
 {
  "title": "Certificados de vacunación en perros y gatos: fundamento inmunológico, validez sanitaria y marco regulatorio i",
  "url": "articles/zoovet_art9_certificados-vacunacion-ES.html",
  "category": "Serie técnica",
  "keywords": "Certificados de vacunación en perros y gatos: fundamento inmunológico, validez sanitaria, marco regulatorio internacional.",
  "lang": "es"
 },
 {
  "title": "Certificats de vaccination chez le chien et le chat : fondement immunologique, validité sanitaire et cadre rég",
  "url": "articles/zoovet_art9_certificados-vacunacion-FR.html",
  "category": "Serie técnica",
  "keywords": "Certificats de vaccination chez le chien et le chat : fondement immunologique, validité sanitaire, cadre réglementaire international.",
  "lang": "fr"
 },
 {
  "title": "Technical Description of the Humoral Immune Response Following Rabies Vaccination and Methodological Basis of ",
  "url": "articles/zoovet_article2_EN.html",
  "category": "Serie técnica",
  "keywords": "Technical descriptive review of the humoral immune response following rabies vaccination in companion animals and the methodological basis of rabies virus.",
  "lang": "en"
 },
 {
  "title": "Descripción Técnica de la Respuesta Humoral Post-Vacunación Antirrábica y Fundamentos Metodológicos de las Pru",
  "url": "articles/zoovet_article2_ES.html",
  "category": "Serie técnica",
  "keywords": "FAVN y RFFIT: qué miden, qué significa ≥0,5 UI/mL y qué pasa cuando la vacuna falla. La prueba que determina si tu mascota puede cruzar la frontera o no.",
  "lang": "es"
 },
 {
  "title": "Description technique de la réponse immune humorale post-vaccination antirabique et bases méthodologiques des ",
  "url": "articles/zoovet_article2_FR.html",
  "category": "Serie técnica",
  "keywords": "Revue technique descriptive de la réponse immune humorale post-vaccination antirabique et des bases méthodologiques de la quantification des anticorps.",
  "lang": "fr"
 },
 {
  "title": "Air transport of brachycephalic dogs: physiological risks, risk factors and regulatory framework | Zoovet Trav",
  "url": "articles/zoovet_article3_braquicefalos_EN.html",
  "category": "Serie técnica",
  "keywords": "Can a Pug or French Bulldog fly? BOAS, low cabin oxygen and overheating make the cargo hold dangerous — airlines ban hold but allow cabin. Vet guide.",
  "lang": "en"
 },
 {
  "title": "Transporte aéreo de perros braquicéfalos: riesgos fisiológicos, factores de riesgo y marco regulatorio | Zoove",
  "url": "articles/zoovet_article3_braquicefalos_ES.html",
  "category": "Serie técnica",
  "keywords": "¿Puede volar un Pug o Bulldog Francés? BOAS, hipoxia de cabina y sobrecalentamiento hacen peligrosa la bodega: por qué se prohíbe la carga. Guía veterinaria.",
  "lang": "es"
 },
 {
  "title": "Transport aérien des chiens brachycéphales : risques physiologiques, facteurs de risque et cadre réglementaire",
  "url": "articles/zoovet_article3_braquicefalos_FR.html",
  "category": "Serie técnica",
  "keywords": "Un Carlin ou Bouledogue Français peut-il voler ? BOAS, hypoxie en cabine et surchauffe rendent la soute dangereuse : la soute est interdite. Guide vétérinaire.",
  "lang": "fr"
 },
 {
  "title": "Immunological and Regulatory Basis of the 30-Day Post-Primary Rabies Vaccination Interval Prior to Serology Sa",
  "url": "articles/zoovet_article_v2-en.html",
  "category": "Serie técnica",
  "keywords": "Technical-regulatory review that establishes the basis for sampling ≥30 days after primary rabies vaccination:",
  "lang": "en"
 },
 {
  "title": "Serología antirrábica y ventana de 30 días tras primovacunación: fundamento inmunológico y regulatorio para vi",
  "url": "articles/zoovet_article_v2.html",
  "category": "Serie técnica",
  "keywords": "30 días post-vacuna es ley, no sugerencia: UE, CDC, APHA, Australia y Japón lo exigen. El día 21 no basta. Un error de fecha reinicia todo el protocolo.",
  "lang": "es"
 },
 {
  "title": "Titrage des anticorps antirabiques et fenêtre de 30 jours post-primovaccination — Base immunologique et réglem",
  "url": "articles/zoovet_article_v2_FR.html",
  "category": "Serie técnica",
  "keywords": "Revue technique-réglementaire établissant les bases du prélèvement ≥30 jours après primovaccination antirabique :",
  "lang": "fr"
 },
 {
  "title": "Feeding before and during flight: fasting, water and errors that cause vomiting",
  "url": "articulos-interes/articulo_alimentacion_antes_durante_vuelo-EN.html",
  "category": "Guías",
  "keywords": "Clinical guide for feeding dogs and cats before and during a flight: food and water windows, what to avoid.",
  "lang": "en"
 },
 {
  "title": "Alimentation avant et pendant le vol : jeûne, eau et erreurs à l'origine des vomissements",
  "url": "articulos-interes/articulo_alimentacion_antes_durante_vuelo-FR.html",
  "category": "Guías",
  "keywords": "Guide clinique pour alimenter chiens et chats avant et pendant un vol : fenêtres alimentation et eau, à éviter, et gestion des escales sans décompensation.",
  "lang": "fr"
 },
 {
  "title": "Alimentación antes y durante el vuelo: ayuno, agua y errores que causan vómitos",
  "url": "articulos-interes/articulo_alimentacion_antes_durante_vuelo.html",
  "category": "Guías",
  "keywords": "Guía clínica para alimentar a perros y gatos antes y durante un vuelo: ventanas de comida y agua, qué evitar, y cómo manejar escalas sin descompensaciones.",
  "lang": "es"
 },
 {
  "title": "Senasa CA07 Guide in Trujillo to issue the CZE for export",
  "url": "articulos-interes/articulo_certificado_zoosanitario_senasa_trujillo-EN.html",
  "category": "Guías",
  "keywords": "Technical guide to process the Senasa zoosanitary certificate (CZE) in Trujillo, Peru: CA07 sequence, microchip, vaccines, CMVP certificate.",
  "lang": "en"
 },
 {
  "title": "Guide Senasa CA07 à Trujillo pour délivrer le CZE pour l'exportation",
  "url": "articulos-interes/articulo_certificado_zoosanitario_senasa_trujillo-FR.html",
  "category": "Guías",
  "keywords": "Guide technique pour le traitement du certificat zoosanitaire Senasa (CZE) à Trujillo, Pérou : séquence CA07, puce électronique, vaccins, certificat CMVP.",
  "lang": "fr"
 },
 {
  "title": "Guía Senasa CA07 en Trujillo para emitir el CZE de exportación",
  "url": "articulos-interes/articulo_certificado_zoosanitario_senasa_trujillo.html",
  "category": "Guías",
  "keywords": "Guía técnica para tramitar el certificado zoosanitario Senasa (CZE) en Trujillo, Perú: secuencia CA07, microchip, vacunas, certificado CMVP.",
  "lang": "es"
 },
 {
  "title": "How long before starting a trip with a pet: real chronology and critical deadlines",
  "url": "articulos-interes/articulo_cuanto_tiempo_antes_viaje_mascota-EN.html",
  "category": "Guías",
  "keywords": "Technical planning of the international trip with a pet from Trujillo, Peru: microchip, rabies vaccine, RNATT, CZE and windows of 21, 30 and 10 days.",
  "lang": "en"
 },
 {
  "title": "Combien de temps avant de commencer un voyage avec un animal de compagnie : chronologie réelle et délais criti",
  "url": "articulos-interes/articulo_cuanto_tiempo_antes_viaje_mascota-FR.html",
  "category": "Guías",
  "keywords": "Planification technique du voyage international avec un animal de compagnie de Trujillo, Pérou :",
  "lang": "fr"
 },
 {
  "title": "Cuánto tiempo antes empezar viaje con mascota: cronología real y plazos críticos",
  "url": "articulos-interes/articulo_cuanto_tiempo_antes_viaje_mascota.html",
  "category": "Guías",
  "keywords": "Planificación técnica del viaje internacional con mascota desde Trujillo, Perú: microchip, vacuna antirrábica, RNATT, CZE y ventanas de 21, 30 y 10 días.",
  "lang": "es"
 },
 {
  "title": "Cabin or hold in golden and labrador dogs: real criteria for flying",
  "url": "articulos-interes/articulo_golden_labrador_cabina_bodega-EN.html",
  "category": "Guías",
  "keywords": "Real criteria to decide a cabin or warehouse in Golden and Labrador: container size, pressurization, stress.",
  "lang": "en"
 },
 {
  "title": "Cabine ou soute chez les chiens golden et labrador : de vrais critères pour voler",
  "url": "articulos-interes/articulo_golden_labrador_cabina_bodega-FR.html",
  "category": "Guías",
  "keywords": "De vrais critères pour décider d'une cabine ou d'un entrepôt à Golden et Labrador : taille du conteneur, pressurisation, stress.",
  "lang": "fr"
 },
 {
  "title": "Cabina o bodega en perros golden y labrador: criterios reales para volar",
  "url": "articulos-interes/articulo_golden_labrador_cabina_bodega.html",
  "category": "Guías",
  "keywords": "Criterios reales para decidir cabina o bodega en golden y labrador: tamaño del contenedor, presurización, estrés.",
  "lang": "es"
 },
 {
  "title": "Pet Rejected at Customs: What Happens Next",
  "url": "articulos-interes/articulo_rechazo_aduana_mascota-EN.html",
  "category": "Guías",
  "keywords": "What happens to a dog or cat if it is rejected at customs: who decides, retention, quarantine, re-dispatch and documentary failures that activate sanitary.",
  "lang": "en"
 },
 {
  "title": "Je suis refusé à la douane avec mon animal : rétention, quarantaine et réexpédition",
  "url": "articulos-interes/articulo_rechazo_aduana_mascota-FR.html",
  "category": "Guías",
  "keywords": "Qu'arrive-t-il à un chien ou un chat s'il est rejeté à la douane : qui décide, rétention, quarantaine.",
  "lang": "fr"
 },
 {
  "title": "Me rechazan en la aduana con mi mascota: retención, cuarentena y reexpedición",
  "url": "articulos-interes/articulo_rechazo_aduana_mascota.html",
  "category": "Guías",
  "keywords": "Qué ocurre con un perro o gato si lo rechazan en aduana: quién decide, retención, cuarentena, reexpedición y fallos documentales que activan medidas.",
  "lang": "es"
 },
 {
  "title": "Rabies vaccine for travel: real deadlines, 21 days, 30 days and sequencing errors",
  "url": "articulos-interes/articulo_vacuna_antirrabica_para_viajar-EN.html",
  "category": "Guías",
  "keywords": "Technical chronology of the rabies vaccine for traveling from Trujillo, Peru: 21 days of EU validity, 30 days for RNATT.",
  "lang": "en"
 },
 {
  "title": "Vaccin antirabique pour voyager : délais réels, 21 jours, 30 jours et erreurs de séquençage",
  "url": "articulos-interes/articulo_vacuna_antirrabica_para_viajar-FR.html",
  "category": "Guías",
  "keywords": "Chronologie technique du vaccin antirabique pour voyager depuis Trujillo, Pérou : 21 jours de validité UE, 30 jours pour RNATT.",
  "lang": "fr"
 },
 {
  "title": "Vacuna antirrábica para viajar: plazos reales, 21 días, 30 días y errores de secuencia",
  "url": "articulos-interes/articulo_vacuna_antirrabica_para_viajar.html",
  "category": "Guías",
  "keywords": "Vacuna antirrábica para viajar desde Trujillo, Perú: 21 días validez UE, 30 días para RNATT, microchip previo y errores que reinician protocolos.",
  "lang": "es"
 },
 {
  "title": "FAVN Failure and Reconversion in a Weimaraner: D1/D15/D30 Case Report (KSVDL, 2026) | Zoovet Travel Technical ",
  "url": "articulos-interes/aton-favn-reconversion-weimaraner-EN.html",
  "category": "Guías",
  "keywords": "Will your pet pass the FAVN test? Don't leave your trip to chance. Proprietary protocol backed by 13 years of international pet export. Book with Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "Fallo FAVN y Reconversión en Weimaraner: Reporte de Caso D1/D15/D30 (KSVDL, 2026) | Serie Técnica Zoovet Trave",
  "url": "articulos-interes/aton-favn-reconversion-weimaraner-ES.html",
  "category": "Guías",
  "keywords": "¿Tu mascota va a pasar el FAVN? No dejes el viaje al azar. Protocolo propio con 13 años de operación en exportación internacional. Gestiona tu trámite con Zoovet Travel.",
  "lang": "es"
 },
 {
  "title": "Échec FAVN et Reconversion chez un Braque de Weimar : Rapport de Cas D1/J15/J30 (KSVDL, 2026) | Série Techniqu",
  "url": "articulos-interes/aton-favn-reconversion-weimaraner-FR.html",
  "category": "Guías",
  "keywords": "Votre animal passera-t-il le test FAVN ? Ne laissez pas votre voyage au hasard. Protocole exclusif, 13 ans d'exportation. Voyagez avec Zoovet Travel.",
  "lang": "fr"
 },
 {
  "title": "Can my French bulldog fly? What you should know before buying the ticket",
  "url": "articulos-interes/bulldog_frances-EN.html",
  "category": "Guías",
  "keywords": "Can French bulldogs fly? Most airlines ban them in cargo. Cabin hypoxia, BOAS and overheating risks explained. Vet guide — Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "Mon bouledogue français peut-il voler ? Ce qu'il faut savoir avant d'acheter le billet",
  "url": "articulos-interes/bulldog_frances-FR.html",
  "category": "Guías",
  "keywords": "Analyse médicale sur les risques du transport aérien chez les bouledogues français. Hypoxie, thermorégulation et restrictions aériennes expliquées par le.",
  "lang": "fr"
 },
 {
  "title": "¿Puede volar mi bulldog francés? Lo que debes saber antes de comprar el pasaje",
  "url": "articulos-interes/bulldog_frances.html",
  "category": "Guías",
  "keywords": "Análisis médico sobre los riesgos de transporte aéreo en bulldog francés. Hipoxia, termorregulación y restricciones de aerolíneas explicadas por la Dra.",
  "lang": "es"
 },
 {
  "title": "Dog to Spain from Peru: step-by-step requirements",
  "url": "articulos-interes/como_viajar_perro_espana_desde_peru_requisitos_final_v2-EN.html",
  "category": "Guías",
  "keywords": "How to travel with your dog to Spain from Peru: microchip, rabies vaccine, 0.5 UI/mL serology, 3-month wait and official certificate with official.",
  "lang": "en"
 },
 {
  "title": "Chien vers l'Espagne depuis le Pérou : exigences étape par étape",
  "url": "articulos-interes/como_viajar_perro_espana_desde_peru_requisitos_final_v2-FR.html",
  "category": "Guías",
  "keywords": "Comment voyager avec votre chien en Espagne depuis le Pérou : micropuce, vaccin contre la rage, sérologie 0,5 UI/mL.",
  "lang": "fr"
 },
 {
  "title": "Perro a España desde Perú: requisitos paso a paso",
  "url": "articulos-interes/como_viajar_perro_espana_desde_peru_requisitos_final_v2.html",
  "category": "Guías",
  "keywords": "Cómo viajar con tu perro a España desde Perú: microchip ISO, vacuna antirrábica, serología RNATT con espera de 3 meses y certificado SENASA oficial.",
  "lang": "es"
 },
 {
  "title": "Where to process the pet travel certificate in Trujillo",
  "url": "articulos-interes/dondetramitarentrujillo-EN.html",
  "category": "Guías",
  "keywords": "Technical guide by Dr Jessica Camacho on official offices and procedures to process the pet export certificate in Trujillo, Peru.",
  "lang": "en"
 },
 {
  "title": "Où faire délivrer le certificat de voyage pour animal à Trujillo",
  "url": "articulos-interes/dondetramitarentrujillo-FR.html",
  "category": "Guías",
  "keywords": "Guide technique de la Dre Jessica Camacho sur les lieux et démarches pour faire délivrer le certificat d'exportation pour animal à Trujillo, Pérou.",
  "lang": "fr"
 },
 {
  "title": "Dónde tramitar el certificado de viaje para mascotas en Trujillo",
  "url": "articulos-interes/dondetramitarentrujillo.html",
  "category": "Guías",
  "keywords": "Guía técnica de la Dra. Jessica Camacho sobre las entidades y sedes oficiales para gestionar la exportación de mascotas en Trujillo, Perú.",
  "lang": "es"
 },
 {
  "title": "Cats in cabin vs. winery: when each option applies",
  "url": "articulos-interes/gatosbodegaavion-EN.html",
  "category": "Guías",
  "keywords": "Technical analysis by Dr. Jessica Camacho on the transportation of felines. Risks of lipidosis, hypobaria and criteria for choosing between cabin or hold.",
  "lang": "en"
 },
 {
  "title": "Chats en cabine ou en soute : quand chaque option s'applique",
  "url": "articulos-interes/gatosbodegaavion-FR.html",
  "category": "Guías",
  "keywords": "Analyse technique par Dr Jessica Camacho sur le transport des félins. Risques de lipidose, d'hypobarie et critères de choix entre cabine ou soute.",
  "lang": "fr"
 },
 {
  "title": "Gatos en cabina vs. bodega: cuándo aplica cada opción",
  "url": "articulos-interes/gatosbodegaavion.html",
  "category": "Guías",
  "keywords": "Análisis técnico de la Dra. Jessica Camacho sobre el transporte de felinos. Riesgos de lipidosis, hipobaria y criterios para elegir entre cabina o bodega.",
  "lang": "es"
 },
 {
  "title": "Practical Guides for International Pet Travel and Export",
  "url": "articulos-interes/index-en.html",
  "category": "Guías",
  "keywords": "Practical Guides for International Pet Travel and Export",
  "lang": "en"
 },
 {
  "title": "Guides pratiques pour voyager et exporter des animaux à l'international",
  "url": "articulos-interes/index-fr.html",
  "category": "Guías",
  "keywords": "Guides pratiques pour voyager et exporter des animaux à l'international",
  "lang": "fr"
 },
 {
  "title": "Guías Prácticas para Viajar y Exportar Mascotas Internacionalmente",
  "url": "articulos-interes/index.html",
  "category": "Guías",
  "keywords": "Guías Prácticas para Viajar y Exportar Mascotas Internacionalmente",
  "lang": "es"
 },
 {
  "title": "Taking your cat to the United States from Peru: 2026 guide",
  "url": "articulos-interes/llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2-EN.html",
  "category": "Guías",
  "keywords": "How to take your cat to the United States from Peru in 2026: what federal income requires, what states and airlines may require.",
  "lang": "en"
 },
 {
  "title": "Emmener son chat aux Etats-Unis depuis le Pérou : guide 2026",
  "url": "articulos-interes/llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2-FR.html",
  "category": "Guías",
  "keywords": "Comment emmener son chat aux États-Unis depuis le Pérou en 2026 : quels sont les revenus fédéraux requis.",
  "lang": "fr"
 },
 {
  "title": "Llevar tu gato a Estados Unidos desde Perú: guía 2026",
  "url": "articulos-interes/llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2.html",
  "category": "Guías",
  "keywords": "Cómo llevar tu gato a Estados Unidos desde Perú en 2026: requisitos CDC, RNATT, microchip ISO y certificados SENASA. Guía editorial paso a paso.",
  "lang": "es"
 },
 {
  "title": "Bringing your pet to Japan: requirements and calendar",
  "url": "articulos-interes/llevar_mascota_japon_proceso_que_pocos_intentan-EN.html",
  "category": "Guías",
  "keywords": "Taking your pet to Japan requires a microchip, two rabies vaccines, serology, a 180-day wait and 40 days' prior notice to AQS.",
  "lang": "en"
 },
 {
  "title": "Amener son animal de compagnie au Japon : exigences et calendrier",
  "url": "articulos-interes/llevar_mascota_japon_proceso_que_pocos_intentan-FR.html",
  "category": "Guías",
  "keywords": "Emmener votre animal de compagnie au Japon nécessite une puce électronique, deux vaccins contre la rage, une sérologie.",
  "lang": "fr"
 },
 {
  "title": "Llevar tu mascota a Japón: requisitos y calendario",
  "url": "articulos-interes/llevar_mascota_japon_proceso_que_pocos_intentan.html",
  "category": "Guías",
  "keywords": "Llevar tu mascota a Japón desde Perú: microchip ISO, RNATT obligatorio, espera 180 días y cuarentena de 12 horas. El proceso más exigente de Asia.",
  "lang": "es"
 },
 {
  "title": "Is it safe for my pet to travel in the aircraft hold? Risks and technical realities",
  "url": "articulos-interes/mascotabodega-EN.html",
  "category": "Guías",
  "keywords": "Medical-veterinary analysis on hold safety in international flights. Hypoxia, temperature and metabolic stress explained by Dr Jessica Camacho.",
  "lang": "en"
 },
 {
  "title": "Est-il sûr que mon animal voyage en soute ? Risques et réalités techniques",
  "url": "articulos-interes/mascotabodega-FR.html",
  "category": "Guías",
  "keywords": "Analyse médico-vétérinaire sur la sécurité de la soute en vols internationaux. Hypoxie, température et stress métabolique expliqués par la Dre Jessica.",
  "lang": "fr"
 },
 {
  "title": "¿Es seguro que mi mascota viaje en bodega? Riesgos y realidades técnicas",
  "url": "articulos-interes/mascotabodega.html",
  "category": "Guías",
  "keywords": "Análisis médico-veterinario sobre la seguridad de la bodega en vuelos internacionales. Hipoxia, temperatura y estrés metabólico explicados por la Dra.",
  "lang": "es"
 },
 {
  "title": "What happens if you take your pet without papers: real cases and consequences",
  "url": "articulos-interes/mascotasinpapeles-EN.html",
  "category": "Guías",
  "keywords": "Technical analysis by Dr. Jessica Camacho on the legal and health consequences of traveling with pets without regulatory documentation.",
  "lang": "en"
 },
 {
  "title": "Que se passe-t-il si vous emmenez votre animal sans papiers : cas réels et conséquences",
  "url": "articulos-interes/mascotasinpapeles-FR.html",
  "category": "Guías",
  "keywords": "Analyse technique du Dr Jessica Camacho sur les conséquences juridiques et sanitaires du voyage avec des animaux de compagnie sans documents.",
  "lang": "fr"
 },
 {
  "title": "Qué pasa si llevas a tu mascota sin papeles: casos reales y consecuencias",
  "url": "articulos-interes/mascotasinpapeles.html",
  "category": "Guías",
  "keywords": "Análisis técnico de la Dra. Jessica Camacho sobre las consecuencias legales y sanitarias de viajar con mascotas sin la documentación reglamentaria.",
  "lang": "es"
 },
 {
  "title": "Is Mexico Low-Risk or High-Risk for Dog Rabies? CDC Classification 2026",
  "url": "articulos-interes/mexico-cdc-dog-rabies-classification-2026.html",
  "category": "Guías",
  "keywords": "Mexico is NOT on the CDC high-risk dog-rabies list (2026): no FAVN, no quarantine, any US port. The detail that stops dogs at the border: APHIS screwworm cert.",
  "lang": "en"
 },
 {
  "title": "¿Es México bajo riesgo o alto riesgo de rabia canina? Clasificación CDC 2026",
  "url": "articulos-interes/mexico-clasificacion-cdc-rabia-canina-2026.html",
  "category": "Guías",
  "keywords": "México NO está en la lista CDC de alto riesgo de rabia (2026): sin FAVN ni cuarentena, cualquier puerto de EE.UU. El freno en frontera: cert. gusano barrenador.",
  "lang": "es"
 },
 {
  "title": "Le Mexique est-il à faible risque ou haut risque de rage canine ? Classification CDC 2026",
  "url": "articulos-interes/mexique-classification-cdc-rage-canine-2026.html",
  "category": "Guías",
  "keywords": "Le Mexique n'est PAS sur la liste CDC haut risque rage (2026) : sans FAVN ni quarantaine, tout port US. Ce qui bloque en douane : certificat anti-lucilie APHIS.",
  "lang": "fr"
 },
 {
  "title": "How to prepare your dog for a long flight without him suffering",
  "url": "articulos-interes/prepararatuperro-EN.html",
  "category": "Guías",
  "keywords": "Dr. Jessica Camacho's technical guide on the physiological and metabolic preparation of dogs for long-haul international flights.",
  "lang": "en"
 },
 {
  "title": "Comment préparer votre chien à un long vol sans qu'il souffre",
  "url": "articulos-interes/prepararatuperro-FR.html",
  "category": "Guías",
  "keywords": "Guide technique du Dr Jessica Camacho sur la préparation physiologique et métabolique des chiens aux vols internationaux long-courriers.",
  "lang": "fr"
 },
 {
  "title": "Cómo preparar a tu perro para un vuelo largo sin que sufra",
  "url": "articulos-interes/prepararatuperro.html",
  "category": "Guías",
  "keywords": "Guía técnica de la Dra. Jessica Camacho sobre la preparación fisiológica y metabólica de perros para vuelos internacionales de larga distancia.",
  "lang": "es"
 },
 {
  "title": "What is the international microchip and how do you process it in Peru?",
  "url": "articulos-interes/queeselmicrochipdondelotramitas-EN.html",
  "category": "Guías",
  "keywords": "Technical guide on the ISO 11784/11785 FDX-B compliant microchip transponder for pets in Peru. International requirements.",
  "lang": "en"
 },
 {
  "title": "Qu'est-ce que la puce électronique internationale et comment la traiter au Pérou ?",
  "url": "articulos-interes/queeselmicrochipdondelotramitas-FR.html",
  "category": "Guías",
  "keywords": "Guide technique sur la transpondeur conforme ISO 11784/11785 FDX-B pour animaux de compagnie au Pérou.",
  "lang": "fr"
 },
 {
  "title": "¿Qué es el microchip internacional y cómo lo tramitas en Perú?",
  "url": "articulos-interes/queeselmicrochipdondelotramitas.html",
  "category": "Guías",
  "keywords": "Guía técnica sobre el microchip ISO para mascotas en Perú. Requisitos internacionales, estándares FDX-B y el procedimiento correcto de implantación en.",
  "lang": "es"
 },
 {
  "title": "Requirements to bring your pet to the United Kingdom",
  "url": "articulos-interes/requisitos_mascota_reino_unido_desde_latinoamerica_editorial_v2-EN.html",
  "category": "Guías",
  "keywords": "Requirements to bring your pet to the United Kingdom from Latin America: microchip, rabies, serology, deadlines and travel document according to GOV.UK.",
  "lang": "en"
 },
 {
  "title": "Conditions requises pour amener votre animal de compagnie au Royaume-Uni",
  "url": "articulos-interes/requisitos_mascota_reino_unido_desde_latinoamerica_editorial_v2-FR.html",
  "category": "Guías",
  "keywords": "Conditions requises pour amener votre animal de compagnie au Royaume-Uni depuis l'Amérique latine :",
  "lang": "fr"
 },
 {
  "title": "Requisitos para llevar tu mascota al Reino Unido",
  "url": "articulos-interes/requisitos_mascota_reino_unido_desde_latinoamerica_editorial_v2.html",
  "category": "Guías",
  "keywords": "Requisitos para llevar tu mascota al Reino Unido desde Latinoamérica: microchip ISO, RNATT 3 meses, certificado APHA y tratamiento antiparasitario.",
  "lang": "es"
 },
 {
  "title": "Rabies Titer Test (RNATT): What It Is and When Your Dog Needs It",
  "url": "articulos-interes/rnattviajes-EN.html",
  "category": "Guías",
  "keywords": "Technical analysis by Dr. Jessica Camacho on the RNATT, the anti-rabies serological titer. Requirements for the European Union.",
  "lang": "en"
 },
 {
  "title": "Le RNATT : quel est le titre sérologique de la rage et quand votre chien en a-t-il besoin ?",
  "url": "articulos-interes/rnattviajes-FR.html",
  "category": "Guías",
  "keywords": "Analyse technique du Dr Jessica Camacho sur le RNATT, le titre sérologique antirabique. Exigences pour l'Union européenne.",
  "lang": "fr"
 },
 {
  "title": "El RNATT: qué es el título serológico antirrábico y cuándo lo necesita tu perro",
  "url": "articulos-interes/rnattviajes.html",
  "category": "Guías",
  "keywords": "Análisis técnico de la Dra. Jessica Camacho sobre el RNATT, el título serológico antirrábico. Requisitos para la Unión Europea.",
  "lang": "es"
 },
 {
  "title": "Signs of stress in your pet during travel and what to do",
  "url": "articulos-interes/streesmascotas-EN.html",
  "category": "Guías",
  "keywords": "Clinical analysis by Dr Jessica Camacho on signs of stress in your pet during travel and technical intervention protocols for international flights.",
  "lang": "en"
 },
 {
  "title": "Signes de stress chez votre animal pendant le voyage et que faire",
  "url": "articulos-interes/streesmascotas-FR.html",
  "category": "Guías",
  "keywords": "Analyse clinique de la Dre Jessica Camacho sur les signes de stress chez votre animal pendant le voyage et protocoles d'intervention technique pour les.",
  "lang": "fr"
 },
 {
  "title": "Señales de estrés en tu mascota durante el viaje y qué hacer",
  "url": "articulos-interes/streesmascotas.html",
  "category": "Guías",
  "keywords": "Análisis clínico de la Dra. Jessica Camacho sobre las señales de estrés en tu mascota durante el viaje y protocolos de intervención técnica para vuelos.",
  "lang": "es"
 },
 {
  "title": "The ideal carrier for traveling by plane: measurements, materials and frequent errors",
  "url": "articulos-interes/transportindeal-EN.html",
  "category": "Guías",
  "keywords": "Technical guide by Dr. Jessica Camacho on the ideal carrier for traveling by plane: measurements.",
  "lang": "en"
 },
 {
  "title": "Le transporteur idéal pour voyager en avion : mesures, matériaux et erreurs fréquentes",
  "url": "articulos-interes/transportindeal-FR.html",
  "category": "Guías",
  "keywords": "Guide technique du Dr Jessica Camacho sur le transporteur idéal pour voyager en avion : mesures.",
  "lang": "fr"
 },
 {
  "title": "El transportín ideal para viajar en avión: medidas, materiales y errores frecuentes",
  "url": "articulos-interes/transportindeal.html",
  "category": "Guías",
  "keywords": "Guía técnica de la Dra. Jessica Camacho sobre el transportín ideal para viajar en avión: medidas, materiales y errores frecuentes según normativa IATA.",
  "lang": "es"
 },
 {
  "title": "Veterinarians specialised in international travel in Trujillo, Peru: selection criteria",
  "url": "articulos-interes/veterimariosntrujillo-EN.html",
  "category": "Guías",
  "keywords": "Technical guide by Dr Jessica Camacho on the importance of veterinarians specialised in international travel in Trujillo.",
  "lang": "en"
 },
 {
  "title": "Vétérinaires spécialisés en voyages internationaux à Trujillo, Pérou : critères de sélection",
  "url": "articulos-interes/veterimariosntrujillo-FR.html",
  "category": "Guías",
  "keywords": "Guide technique de la Dre Jessica Camacho sur l'importance des vétérinaires spécialisés en voyages internationaux à Trujillo.",
  "lang": "fr"
 },
 {
  "title": "Veterinarios especializados en viajes internacionales en Trujillo- peru: Criterios de Selección",
  "url": "articulos-interes/veterimariosntrujillo.html",
  "category": "Guías",
  "keywords": "Guía técnica de la Dra. Jessica Camacho sobre la importancia de contar con veterinarios especializados en viajes internacionales en Trujillo- peru para.",
  "lang": "es"
 },
 {
  "title": "Traveling with a dog to Chile, Argentina or Colombia: is it really easy?",
  "url": "articulos-interes/viaja-chile-argentina-EN.html",
  "category": "Guías",
  "keywords": "Technical analysis on the export of pets to South American countries. SENASA requirements, health certificates and health risk management.",
  "lang": "en"
 },
 {
  "title": "Voyager avec un chien au Chili, en Argentine ou en Colombie : est-ce vraiment facile ?",
  "url": "articulos-interes/viaja-chile-argentina-FR.html",
  "category": "Guías",
  "keywords": "Analyse technique sur l'exportation d'animaux de compagnie vers les pays d'Amérique du Sud. Exigences du SENASA.",
  "lang": "fr"
 },
 {
  "title": "Viajar con perro a Chile, Argentina o Colombia: ¿es realmente sencillo?",
  "url": "articulos-interes/viaja-chile-argentina.html",
  "category": "Guías",
  "keywords": "Análisis técnico sobre la exportación de mascotas a países de Sudamérica. Requisitos de SENASA, certificados de salud y gestión de riesgos sanitarios.",
  "lang": "es"
 },
 {
  "title": "Traveling with pets to Australia: the most strict process",
  "url": "articulos-interes/viajar_mascotas_australia_proceso_mas_estricto_editorial-EN.html",
  "category": "Guías",
  "keywords": "Traveling with pets to Australia requires 180 days after RNATT, permission, approved country and quarantine in Mickleham.",
  "lang": "en"
 },
 {
  "title": "Voyager avec des animaux en Australie : la procédure la plus stricte",
  "url": "articulos-interes/viajar_mascotas_australia_proceso_mas_estricto_editorial-FR.html",
  "category": "Guías",
  "keywords": "Voyager avec des animaux de compagnie en Australie nécessite 180 jours après RNATT, autorisation, pays approuvé et quarantaine à Mickleham.",
  "lang": "fr"
 },
 {
  "title": "Viajar con mascotas a Australia: el proceso más estricto",
  "url": "articulos-interes/viajar_mascotas_australia_proceso_mas_estricto_editorial.html",
  "category": "Guías",
  "keywords": "Viajar con mascotas a Australia desde Perú: 180 días tras RNATT, permiso DAFF, país intermediario aprobado y cuarentena obligatoria en Mickleham.",
  "lang": "es"
 },
 {
  "title": "Traveling with a Pug by plane: real risks and how to reduce them",
  "url": "articulos-interes/viajarconpug-EN.html",
  "category": "Guías",
  "keywords": "Can pugs fly safely? Cabin hypoxia, BOAS, kennel cough and respiratory risks at altitude. What airlines allow and vet recommendations — Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "Voyager avec un Carlin en avion : les risques réels et comment les réduire",
  "url": "articulos-interes/viajarconpug-FR.html",
  "category": "Guías",
  "keywords": "Analyse médico-vétérinaire sur les dangers du transport aérien chez les chiens Carlin. BOAS (syndrome obstructif des voies aériennes chez les.",
  "lang": "fr"
 },
 {
  "title": "Viajar con un Pug en avión: riesgos reales y cómo reducirlos",
  "url": "articulos-interes/viajarconpug.html",
  "category": "Guías",
  "keywords": "Análisis médico-veterinario sobre los peligros del transporte aéreo en perros Pug. BOAS (síndrome obstructivo de vías aéreas en braquicéfalos).",
  "lang": "es"
 },
 {
  "title": "Traveling with a senior dog: what changes after 8 years",
  "url": "articulos-interes/viajeanimalgeriatrico-EN.html",
  "category": "Guías",
  "keywords": "Technical analysis by Dr. Jessica Camacho on the physiological and logistical risks of air transport in dogs over 8 years of age from Trujillo.",
  "lang": "en"
 },
 {
  "title": "Voyager avec un chien senior : ce qui change après 8 ans",
  "url": "articulos-interes/viajeanimalgeriatrico-FR.html",
  "category": "Guías",
  "keywords": "Analyse technique du Dr Jessica Camacho sur les risques physiologiques et logistiques du transport aérien chez les chiens de plus de 8 ans de Trujillo.",
  "lang": "fr"
 },
 {
  "title": "Viajar con un perro senior: lo que cambia después de los 8 años",
  "url": "articulos-interes/viajeanimalgeriatrico.html",
  "category": "Guías",
  "keywords": "Análisis técnico de la Dra. Jessica Camacho sobre los riesgos fisiológicos y logísticos del transporte aéreo en perros mayores de 8 años desde Trujillo.",
  "lang": "es"
 },
 {
  "title": "How to move with pets to Canada: everything that no one tells you",
  "url": "articulos-interes/zoovet_canada_exportacion-EN.html",
  "category": "Guías",
  "keywords": "Technical guide for the export of dogs and cats from Peru to Canada. Microchip requirements, rabies vaccination compliant with international movement.",
  "lang": "en"
 },
 {
  "title": "Comment déménager avec des animaux de compagnie au Canada : tout ce que personne ne vous dit",
  "url": "articulos-interes/zoovet_canada_exportacion-FR.html",
  "category": "Guías",
  "keywords": "Guide technique pour l'exportation de chiens et chats du Pérou vers le Canada. Exigences en matière de micropuces.",
  "lang": "fr"
 },
 {
  "title": "Cómo mudarse con mascotas a Canadá: todo lo que nadie te explica",
  "url": "articulos-interes/zoovet_canada_exportacion.html",
  "category": "Guías",
  "keywords": "Guía técnica para la exportación de perros y gatos de Perú a Canadá. Requisitos de microchip, vacunación antirrábica y gestión de riesgos logísticos.",
  "lang": "es"
 },
 {
  "title": "Mit dem Haustier nach Deutschland einreisen 2026: verbotene Rassen + Regel nach Land",
  "url": "atlas/alemania-de.html",
  "category": "Atlas",
  "keywords": "Bringen Sie Ihren Hund oder Ihre Katze nach Deutschland? Deutschland VERBIETET die Einfuhr von 4 Rassen (Pitbull, Staffordshire…) und der Zoll beschlagnahmt sie. Die Regel ändert sich je nach Land, dazu Listenhunde je Bu",
  "lang": "de"
 },
 {
  "title": "Entering Germany with your pet 2026: banned breeds + rule by country",
  "url": "atlas/alemania-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to Germany? Germany BANS the import of 4 breeds (Pitbull, Staffordshire…) and the Zoll seizes them. The rule changes by your country, plus Listenhunde by state, registration and dog tax. Verified w",
  "lang": "en"
 },
 {
  "title": "Entrer en Allemagne avec votre animal 2026 : races interdites + règle par pays",
  "url": "atlas/alemania-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat en Allemagne ? L'Allemagne INTERDIT d'importer 4 races (Pitbull, Staffordshire…) et le Zoll les saisit. La règle change selon votre pays, plus les Listenhunde par état, l'enregistrement e",
  "lang": "fr"
 },
 {
  "title": "Entrare in Germania con il tuo animale 2026: razze vietate + regola per paese",
  "url": "atlas/alemania-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto in Germania? La Germania VIETA l'importazione di 4 razze (Pitbull, Staffordshire…) e il Zoll le sequestra. La regola cambia in base al tuo paese, più Listenhunde per stato, registrazione e tassa",
  "lang": "it"
 },
 {
  "title": "Entrar na Alemanha com seu pet 2026: raças proibidas + regra por país",
  "url": "atlas/alemania-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato à Alemanha? A Alemanha PROÍBE importar 4 raças (Pitbull, Staffordshire…) e o Zoll as apreende. A regra muda conforme o seu país, mais Listenhunde por estado, registro e imposto sobre o cão. Veri",
  "lang": "pt"
 },
 {
  "title": "Entrar a Alemania con tu mascota 2026: razas prohibidas + regla por país",
  "url": "atlas/alemania.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a Alemania? Alemania PROHÍBE importar 4 razas (Pitbull, Staffordshire…) y el Zoll las incauta. La regla cambia según tu país, más Listenhunde por estado, registro e impuesto al perro. Verificado c",
  "lang": "es"
 },
 {
  "title": "Mit Ihrem Haustier nach Andorra einreisen 2026: Regel nach Land + kein Flughafen",
  "url": "atlas/andorra-de.html",
  "category": "Atlas",
  "keywords": "Mit Hund oder Katze nach Andorra? Kein Flughafen — Einreise über Spanien oder Frankreich. Prüfen Sie, ob Ihr Land einen Bluttest braucht, plus Hunderassen mit Sonderregeln. 2026.",
  "lang": "de"
 },
 {
  "title": "Enter Andorra with your pet 2026: rule by country + it has no airport",
  "url": "atlas/andorra-en.html",
  "category": "Atlas",
  "keywords": "Off to Andorra with your dog or cat? It has no airport — you enter via Spain or France. See if your country needs a blood test, plus the dog breeds with special rules. 2026.",
  "lang": "en"
 },
 {
  "title": "Entrer en Andorre avec votre animal 2026 : règle par pays + pas d'aéroport",
  "url": "atlas/andorra-fr.html",
  "category": "Atlas",
  "keywords": "En Andorre avec votre chien ou chat ? Pas d'aéroport : on entre par l'Espagne ou la France. Voyez si votre pays exige une prise de sang et les races à règles spéciales. 2026.",
  "lang": "fr"
 },
 {
  "title": "Entrare in Andorra con il tuo animale 2026: regola per paese + non ha aeroporto",
  "url": "atlas/andorra-it.html",
  "category": "Atlas",
  "keywords": "In Andorra con cane o gatto? Niente aeroporto: si entra da Spagna o Francia. Scopri se il tuo Paese richiede l'esame del sangue e le razze con regole speciali. 2026.",
  "lang": "it"
 },
 {
  "title": "Entrar em Andorra com seu pet 2026: regra por país + não tem aeroporto",
  "url": "atlas/andorra-pt.html",
  "category": "Atlas",
  "keywords": "Vai a Andorra com seu cão ou gato? Não tem aeroporto: entra-se pela Espanha ou França. Veja se seu país exige exame de sangue e as raças com regras especiais. 2026.",
  "lang": "pt"
 },
 {
  "title": "Entrar a Andorra con tu mascota 2026: regla por país + no tiene aeropuerto",
  "url": "atlas/andorra.html",
  "category": "Atlas",
  "keywords": "¿Vas a Andorra con tu perro o gato? No tiene aeropuerto: se entra por España o Francia. Mira si tu país necesita prueba de sangre y las razas de perro con reglas especiales. 2026.",
  "lang": "es"
 },
 {
  "title": "Requisitos para entrar a Turquía con tu mascota 2026: país por país",
  "url": "atlas/turquia.html",
  "category": "Atlas",
  "keywords": "¿Vas a Turquía con tu perro o gato? El país europeo sin lista: análisis de sangre en laboratorio de la UE y 3 meses de espera para todos. Mira si tu país tiene lab UE o si la muestra viaja. 234 países. 2026.",
  "lang": "es"
 },
 {
  "title": "Requirements to enter Turkey with your pet 2026: country by country",
  "url": "atlas/turquia-en.html",
  "category": "Atlas",
  "keywords": "Off to Turkey with your dog or cat? The European country with no list: an EU-lab blood test and a 3-month wait for everyone. See if your country has an EU lab or the sample travels. 234 countries. 2026.",
  "lang": "en"
 },
 {
  "title": "Conditions pour entrer en Turquie avec votre animal 2026 : pays par pays",
  "url": "atlas/turquia-fr.html",
  "category": "Atlas",
  "keywords": "Vous partez en Turquie avec votre chien ou chat ? Le pays européen sans liste : analyse de sang en laboratoire de l'UE et 3 mois d'attente pour tous. Voyez si votre pays a un labo UE ou si l'échantillon voyage. 234 pays. 2026.",
  "lang": "fr"
 },
 {
  "title": "Requisitos para entrar na Turquia com seu pet 2026: país por país",
  "url": "atlas/turquia-pt.html",
  "category": "Atlas",
  "keywords": "Vai para a Turquia com seu cão ou gato? O país europeu sem lista: exame de sangue em laboratório da UE e 3 meses de espera para todos. Veja se seu país tem lab UE ou se a amostra viaja. 234 países. 2026.",
  "lang": "pt"
 },
 {
  "title": "Einreise in die Türkei mit Haustier 2026: Land für Land",
  "url": "atlas/turquia-de.html",
  "category": "Atlas",
  "keywords": "Mit Hund oder Katze in die Türkei? Das europäische Land ohne Liste: Bluttest im EU-Labor und 3 Monate Wartezeit für alle. Sehen Sie, ob Ihr Land ein EU-Labor hat oder die Probe reist. 234 Länder. 2026.",
  "lang": "de"
 },
 {
  "title": "Requisiti per entrare in Turchia con il tuo animale 2026: paese per paese",
  "url": "atlas/turquia-it.html",
  "category": "Atlas",
  "keywords": "Vai in Turchia con il tuo cane o gatto? Il paese europeo senza elenco: analisi del sangue in laboratorio UE e 3 mesi di attesa per tutti. Guarda se il tuo paese ha un lab UE o se il campione viaggia. 234 Paesi. 2026.",
  "lang": "it"
 },
 {
  "title": "Einreisebestimmungen für Australien mit Haustier 2026: Einstufung nach Land",
  "url": "atlas/australia-de.html",
  "category": "Atlas",
  "keywords": "Bringen Sie Ihren Hund oder Ihre Katze nach Australien? Je nach Land verlangt das DAFF Genehmigung, Bluttest und Quarantäne in Mickleham oder den Umweg über ein Drittland. Sehen Sie Ihres nach.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter Australia with your pet 2026: classification by country",
  "url": "atlas/australia-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to Australia? Depending on your country, the DAFF requires a permit, a blood test and quarantine in Mickleham, or routing first through a third country. Check yours.",
  "lang": "en"
 },
 {
  "title": "Conditions d'entrée en Australie avec votre animal 2026 : classification par pays",
  "url": "atlas/australia-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat en Australie ? Selon votre pays, le DAFF exige permis, test sanguin et quarantaine à Mickleham, ou un passage par un pays tiers. Voyez le vôtre.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare in Australia con il tuo animale 2026: classificazione per paese",
  "url": "atlas/australia-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto in Australia? A seconda del paese, il DAFF richiede permesso, esame del sangue e quarantena a Mickleham, o il passaggio prima da un paese terzo. Guarda il tuo.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar na Austrália com seu pet 2026: classificação por país",
  "url": "atlas/australia-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato para a Austrália? Conforme seu país, o DAFF exige permissão, exame de sangue e quarentena em Mickleham, ou passar antes por um terceiro país. Veja o seu.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a Australia con tu mascota 2026: clasificación por país",
  "url": "atlas/australia.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a Australia? Según tu país, el DAFF pide permiso, prueba de sangre y cuarentena en Mickleham, o pasar antes por un tercer país. Mira el tuyo.",
  "lang": "es"
 },
 {
  "title": "Voraussetzungen für die Einreise nach Brasilien mit deinem Haustier 2026: CVI, MAPA und ohne Quarantäne",
  "url": "atlas/brasil-de.html",
  "category": "Atlas",
  "keywords": "Nimmst du deinen Hund oder deine Katze nach Brasilien mit? Das MAPA verlangt ein CVI mit Tollwutimpfung und Entwurmung, aber keinen Bluttest und keine Quarantäne, und der Mikrochip ist optional. Geprüfter Leitfaden.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter Brazil with your pet 2026: CVI, MAPA and no quarantine",
  "url": "atlas/brasil-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to Brazil? MAPA requires a CVI with rabies vaccination and antiparasitic treatment, but no blood test and no quarantine, and the microchip is optional. Verified guide.",
  "lang": "en"
 },
 {
  "title": "Conditions d'entrée au Brésil avec votre animal 2026 : CVI, MAPA et sans quarantaine",
  "url": "atlas/brasil-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat au Brésil ? Le MAPA exige un CVI avec vaccin antirabique et antiparasitaire, mais sans test sanguin ni quarantaine, et la puce est facultative. Guide vérifié.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare in Brasile con il tuo animale 2026: CVI, MAPA e senza quarantena",
  "url": "atlas/brasil-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto in Brasile? Il MAPA richiede il CVI con vaccino antirabbico e antiparassitario, ma senza esame del sangue né quarantena, e il microchip è facoltativo. Guida verificata.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar no Brasil com seu pet 2026: CVI, MAPA e sem quarentena",
  "url": "atlas/brasil-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato ao Brasil? O MAPA exige CVI com vacina antirrábica e antiparasitário, mas sem exame de sangue nem quarentena, e o microchip é opcional. Guia verificado.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a Brasil con tu mascota 2026: CVI, MAPA y sin cuarentena",
  "url": "atlas/brasil.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a Brasil? El MAPA pide CVI con vacuna antirrábica y antiparasitario, pero sin prueba de sangre ni cuarentena, y el microchip es opcional. Guía verificada.",
  "lang": "es"
 },
 {
  "title": "Einreise nach Kanada mit Haustier 2026: Einstufung nach Herkunftsland",
  "url": "atlas/canada-de.html",
  "category": "Atlas",
  "keywords": "Reist du mit Hund oder Katze nach Kanada? Nur 9 Länder gelten für die CFIA als tollwutfrei; alle anderen brauchen einen Impfnachweis auf Englisch oder Französisch. Keine Quarantäne. Prüfe deins.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter Canada with your pet 2026: classification by country",
  "url": "atlas/canada-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to Canada? Only 9 countries are rabies-free for the CFIA; everyone else needs a rabies vaccination certificate in English or French. No quarantine. Check yours.",
  "lang": "en"
 },
 {
  "title": "Conditions d'entrée au Canada avec votre animal 2026 : classement par pays",
  "url": "atlas/canada-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat au Canada ? Seuls 9 pays sont indemnes de rage pour l'ACIA ; les autres exigent un certificat de vaccination en anglais ou en français. Sans quarantaine. Trouvez le vôtre.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare in Canada con il tuo animale 2026: classificazione per paese",
  "url": "atlas/canada-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto in Canada? Solo 9 paesi sono indenni da rabbia per la CFIA; gli altri necessitano del certificato di vaccino in inglese o francese. Senza quarantena. Trova il tuo.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar no Canadá com seu animal 2026: classificação por país",
  "url": "atlas/canada-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato ao Canadá? Só 9 países são livres de raiva para a CFIA; o resto precisa de certificado de vacina em inglês ou francês. Sem quarentena. Veja o seu.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a Canadá con tu mascota 2026: clasificación por país",
  "url": "atlas/canada.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a Canadá? Solo 9 países son libres de rabia para la CFIA; el resto necesita certificado de vacuna en inglés o francés. Sin cuarentena. Mira el tuyo.",
  "lang": "es"
 },
 {
  "title": "Voraussetzungen für die Einreise nach Chile mit deinem Haustier 2026: SAG, Entwurmung 5–30 Tage und keine Quar",
  "url": "atlas/chile-de.html",
  "category": "Atlas",
  "keywords": "Reist du mit deinem Hund oder deiner Katze nach Chile? Der SAG verlangt CZI und Tollwutimpfung, die Entwurmung genau zwischen 5 und 30 Tagen vorher und 10 Tage häusliche Absonderung. Kein Bluttest.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter Chile with your pet 2026: SAG, antiparasitic 5-30 days and no quarantine",
  "url": "atlas/chile-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to Chile? The SAG requires a CZI and rabies vaccine, the antiparasitic treatment exactly between 5 and 30 days before, and 10 days of home confinement. No blood test.",
  "lang": "en"
 },
 {
  "title": "Conditions pour entrer au Chili avec votre animal 2026 : SAG, antiparasitaire 5-30 jours et sans quarantaine",
  "url": "atlas/chile-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat au Chili ? Le SAG exige le CZI et le vaccin antirabique, l'antiparasitaire précisément entre 5 et 30 jours avant, et 10 jours de confinement à domicile. Sans test sanguin.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare in Cile con il tuo animale 2026: SAG, antiparassitario 5-30 giorni e senza quarantena",
  "url": "atlas/chile-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto in Cile? Il SAG richiede CZI e vaccino antirabbico, l'antiparassitario esattamente tra 5 e 30 giorni prima, e 10 giorni di confinamento a casa. Senza esame del sangue.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar no Chile com seu pet 2026: SAG, antiparasitário 5-30 dias e sem quarentena",
  "url": "atlas/chile-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato ao Chile? O SAG exige CZI e vacina antirrábica, o antiparasitário exato entre 5 e 30 dias antes, e 10 dias de confinamento em casa. Sem exame de sangue.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a Chile con tu mascota 2026: SAG, antiparasitario 5-30 días y sin cuarentena",
  "url": "atlas/chile.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a Chile? El SAG pide CZI y vacuna antirrábica, el antiparasitario justo entre 5 y 30 días antes, y 10 días de confinamiento en casa. Sin prueba de sangre.",
  "lang": "es"
 },
 {
  "title": "Einreisebestimmungen für China mit Haustier 2026: Einstufung nach Land",
  "url": "atlas/china-de.html",
  "category": "Atlas",
  "keywords": "Mit Hund oder Katze nach China? Beim chinesischen Zoll (GACC) reisen manche Länder leicht ein, andere riskieren 30 Tage Quarantäne. Prüfen Sie hier Ihr Land.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter China with your pet 2026: classification by country",
  "url": "atlas/china-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to China? With China's customs (GACC), some countries enter easily and others risk a 30-day quarantine. Check here whether yours is easy or hard.",
  "lang": "en"
 },
 {
  "title": "Conditions d'entrée en Chine avec votre animal 2026 : classement par pays",
  "url": "atlas/china-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat en Chine ? Avec la douane chinoise (GACC), certains pays entrent facilement et d'autres risquent 30 jours de quarantaine. Vérifiez le vôtre ici.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare in Cina con il tuo animale 2026: classificazione per paese",
  "url": "atlas/china-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto in Cina? Con la dogana cinese (GACC), alcuni Paesi entrano facile e altri rischiano 30 giorni di quarantena. Controlla qui il tuo.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar na China com seu pet 2026: classificação por país",
  "url": "atlas/china-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato à China? Com a alfândega da China (GACC), uns países entram fácil e outros arriscam 30 dias de quarentena. Veja aqui se o seu é fácil ou difícil.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a China con tu mascota 2026: clasificación por país",
  "url": "atlas/china.html",
  "category": "Atlas",
  "keywords": "¿Viajas a China con tu perro o gato? Con la aduana china (GACC) unos países entran fácil y otros arriesgan 30 días de cuarentena. Mira aquí si el tuyo es fácil o difícil.",
  "lang": "es"
 },
 {
  "title": "Einreisebestimmungen für Südkorea mit Haustier 2026: Einstufung nach Land",
  "url": "atlas/corea-del-sur-de.html",
  "category": "Atlas",
  "keywords": "Reisen Sie mit Hund oder Katze nach Südkorea? Je nach Land verlangt APQA einen Tollwut-Bluttest oder lässt Sie noch am selben Tag einreisen. Finden Sie Ihr Land in der offiziellen Liste.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter South Korea with your pet 2026: classification by country",
  "url": "atlas/corea-del-sur-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to South Korea? Depending on your country, APQA requires a rabies blood test or lets you leave the same day. Find yours on the official list.",
  "lang": "en"
 },
 {
  "title": "Conditions d'entrée en Corée du Sud avec votre animal 2026 : classement par pays",
  "url": "atlas/corea-del-sur-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat en Corée du Sud ? Selon votre pays, l'APQA exige une prise de sang antirabique ou vous laisse sortir le jour même. Cherchez le vôtre dans la liste officielle.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare in Corea del Sud con il tuo animale 2026: classificazione per paese",
  "url": "atlas/corea-del-sur-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto in Corea del Sud? A seconda del paese, l'APQA chiede l'esame del sangue antirabbico o ti lascia uscire lo stesso giorno. Cerca il tuo nell'elenco ufficiale.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar na Coreia do Sul com seu pet 2026: classificação por país",
  "url": "atlas/corea-del-sur-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato à Coreia do Sul? Conforme seu país, a APQA exige exame de sangue antirrábico ou libera no mesmo dia. Procure o seu na lista oficial.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a Corea del Sur con tu mascota 2026: clasificación por país",
  "url": "atlas/corea-del-sur.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a Corea del Sur? Según tu país, APQA pide prueba de sangre antirrábica o te deja salir el mismo día. Busca el tuyo en la lista oficial.",
  "lang": "es"
 },
 {
  "title": "Voraussetzungen für die Einreise in die Vereinigten Arabischen Emirate mit deinem Haustier 2026: MOCCAE-Genehm",
  "url": "atlas/emiratos-arabes-unidos-de.html",
  "category": "Atlas",
  "keywords": "Nimmst du deinen Hund oder deine Katze in die Emirate mit? Du brauchst eine vorherige MOCCAE-Genehmigung und je nach Land einen Tollwut-Bluttest. Nur ~50 Länder kommen ohne ihn rein. Prüfe dein Land.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter the United Arab Emirates with your pet 2026: MOCCAE permit and country classification",
  "url": "atlas/emiratos-arabes-unidos-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to the Emirates? You need a prior MOCCAE permit and, depending on your country, a rabies blood test. Only ~50 countries enter without it. Check yours.",
  "lang": "en"
 },
 {
  "title": "Conditions d'entrée aux Émirats arabes unis avec votre animal 2026 : permis MOCCAE et classification par pays",
  "url": "atlas/emiratos-arabes-unidos-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat aux Émirats ? Il vous faut un permis préalable du MOCCAE et, selon votre pays, une prise de sang antirabique. Seuls ~50 pays entrent sans elle. Vérifiez le vôtre.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare negli Emirati Arabi Uniti con il tuo animale 2026: permesso MOCCAE e classificazione per",
  "url": "atlas/emiratos-arabes-unidos-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto negli Emirati? Ti serve il permesso preventivo del MOCCAE e, a seconda del paese, l'esame del sangue antirabbico. Solo ~50 paesi entrano senza. Verifica il tuo.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar nos Emirados Árabes Unidos com seu animal 2026: permissão MOCCAE e classificação por pa",
  "url": "atlas/emiratos-arabes-unidos-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato aos Emirados? Você precisa de permissão prévia do MOCCAE e, conforme seu país, exame de sangue antirrábico. Só ~50 países entram sem ele. Verifique o seu.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a Emiratos Árabes Unidos con tu mascota 2026: permiso MOCCAE y clasificación por país",
  "url": "atlas/emiratos-arabes-unidos.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a los Emiratos? Necesitas permiso previo de MOCCAE y, según tu país, prueba de sangre antirrábica. Solo ~50 países entran sin ella. Verifica el tuyo.",
  "lang": "es"
 },
 {
  "title": "Mit Ihrem Haustier nach Spanien einreisen 2026: Regel nach Land + PPP-Rassen",
  "url": "atlas/espana-de.html",
  "category": "Atlas",
  "keywords": "Bringen Sie Ihren Hund oder Ihre Katze nach Spanien? Die Regel ändert sich je nach Land: Tollwut-Bluttest oder direkte Einreise. Außerdem: gefährliche Rassen (PPP), die 23 Einreiseflughäfen und die Registrierung. Geprüft",
  "lang": "de"
 },
 {
  "title": "Enter Spain with your pet 2026: rule by country + dangerous breeds (PPP)",
  "url": "atlas/espana-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to Spain? The rule changes with your country: rabies blood test or direct entry. Plus: dangerous breeds (PPP), the 23 entry airports and how to register it. Verified with the MAPA.",
  "lang": "en"
 },
 {
  "title": "Entrer en Espagne avec votre animal 2026 : règle par pays + races dangereuses (PPP)",
  "url": "atlas/espana-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat en Espagne ? La règle change selon votre pays : prise de sang antirabique ou entrée directe. En plus : races dangereuses (PPP), les 23 aéroports d'entrée et comment l'enregistrer. Vérifié",
  "lang": "fr"
 },
 {
  "title": "Entrare in Spagna con il tuo animale 2026: regola per paese + razze PPP",
  "url": "atlas/espana-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto in Spagna? La regola cambia in base al tuo paese: test del sangue antirabbico o ingresso diretto. Inoltre: razze pericolose (PPP), i 23 aeroporti di ingresso e come registrarlo. Verificato con i",
  "lang": "it"
 },
 {
  "title": "Entrar na Espanha com seu pet 2026: regra por país + raças PPP",
  "url": "atlas/espana-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato à Espanha? A regra muda conforme o seu país: teste de sangue antirrábico ou entrada direta. Além disso: raças perigosas (PPP), os 23 aeroportos de entrada e como registrar. Verificado com o MAPA",
  "lang": "pt"
 },
 {
  "title": "Entrar a España con tu mascota 2026: regla por país + razas PPP",
  "url": "atlas/espana.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a España? La regla cambia según tu país: prueba de sangre antirrábica o entrada directa. Además: razas peligrosas (PPP), los 23 aeropuertos de entrada y cómo registrarlo. Verificado con el MAPA.",
  "lang": "es"
 },
 {
  "title": "Anforderungen für die Einreise in die USA mit Ihrem Haustier 2026: Länderklassifizierung",
  "url": "atlas/estados-unidos-de.html",
  "category": "Atlas",
  "keywords": "Mit Hund oder Katze in die USA? Die CDC-Regeln ändern sich je nach Land: manche reisen leicht ein, andere riskieren Quarantäne. Prüfen Sie hier Ihr Land.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter the US with your pet 2026: classification by country",
  "url": "atlas/estados-unidos-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to the US? The CDC rules change by country: some enter easily, others risk quarantine. Check here whether yours is easy or hard.",
  "lang": "en"
 },
 {
  "title": "Conditions d'entrée aux États-Unis avec votre animal 2026 : classement par pays",
  "url": "atlas/estados-unidos-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat aux États-Unis ? Les règles du CDC changent selon le pays : certains entrent facilement, d'autres risquent la quarantaine. Vérifiez le vôtre ici.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare negli USA con il tuo animale 2026: classificazione per Paese",
  "url": "atlas/estados-unidos-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto negli USA? Le regole del CDC cambiano in base al Paese: alcuni entrano facile, altri rischiano la quarantena. Controlla qui il tuo.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar nos EUA com seu pet 2026: classificação por país",
  "url": "atlas/estados-unidos-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato aos EUA? As regras do CDC mudam conforme o país: uns entram fácil, outros arriscam quarentena. Veja aqui se o seu é fácil ou difícil.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a EE.UU. con tu mascota 2026: clasificación por país",
  "url": "atlas/estados-unidos.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a EE.UU.? Las reglas del CDC cambian según tu país: unos entran fácil y otros arriesgan cuarentena. Mira aquí si el tuyo es fácil o difícil.",
  "lang": "es"
 },
 {
  "title": "Einreise nach Frankreich mit Ihrem Haustier 2026: Hunde catégorie 1/2 + Regel nach Land",
  "url": "atlas/francia-de.html",
  "category": "Atlas",
  "keywords": "Reisen Sie mit Ihrem Hund oder Ihrer Katze nach Frankreich? Frankreich stuft gefährliche Hunde in 2 Kategorien ein: die catégorie 1 darf NICHT eingeführt werden (je nach Stammbaum), die catégorie 2 verlangt Erlaubnis und",
  "lang": "de"
 },
 {
  "title": "Enter France with your pet 2026: catégorie 1/2 dogs + rule by country",
  "url": "atlas/francia-en.html",
  "category": "Atlas",
  "keywords": "Bringing your dog or cat to France? France classifies dangerous dogs into 2 categories: catégorie 1 is BANNED from import (it depends on the pedigree), catégorie 2 requires a permit and insurance. The rule changes depend",
  "lang": "en"
 },
 {
  "title": "Entrer en France avec votre animal 2026 : chiens catégorie 1/2 + règle par pays",
  "url": "atlas/francia-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat en France ? La France classe les chiens dangereux en 2 catégories : la catégorie 1 est INTERDITE d'importation (selon le pedigree), la catégorie 2 exige un permis et une assurance. La règ",
  "lang": "fr"
 },
 {
  "title": "Entrare in Francia con il tuo animale 2026: cani catégorie 1/2 + regola per paese",
  "url": "atlas/francia-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto in Francia? La Francia classifica i cani pericolosi in 2 categorie: la catégorie 1 è VIETATA all'importazione (secondo il pedigree), la catégorie 2 richiede permesso e assicurazione. La regola c",
  "lang": "it"
 },
 {
  "title": "Entrar na França com seu pet 2026: cães catégorie 1/2 + regra por país",
  "url": "atlas/francia-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato à França? A França classifica os cães perigosos em 2 categorias: a catégorie 1 é PROIBIDA de importar (conforme o pedigree), a catégorie 2 exige permissão e seguro. A regra muda conforme o seu p",
  "lang": "pt"
 },
 {
  "title": "Entrar a Francia con tu mascota 2026: perros catégorie 1/2 + regla por país",
  "url": "atlas/francia.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a Francia? Francia clasifica los perros peligrosos en 2 categorías: la catégorie 1 está PROHIBIDA de importar (según el pedigrí), la catégorie 2 exige permiso y seguro. La regla cambia según tu pa",
  "lang": "es"
 },
 {
  "title": "Atlas Zoovet Travel: Einreisebestimmungen für Hunde und Katzen, Land für Land",
  "url": "atlas/index-de.html",
  "category": "Atlas",
  "keywords": "Die geprüfte Übersicht der Einreisebestimmungen für deinen Hund oder deine Katze, Land für Land: was jedes Zielland je nach Herkunftsland verlangt. Amtliche Quellen und tierärztliche Prüfung.",
  "lang": "de"
 },
 {
  "title": "Atlas Zoovet Travel: requirements for traveling with dogs and cats, country by country",
  "url": "atlas/index-en.html",
  "category": "Atlas",
  "keywords": "The verified map of requirements for traveling with your dog or cat, country by country: what each destination demands based on your country of origin. Official sources and veterinary review.",
  "lang": "en"
 },
 {
  "title": "Atlas Zoovet Travel : conditions pour voyager avec un chien ou un chat, pays par pays",
  "url": "atlas/index-fr.html",
  "category": "Atlas",
  "keywords": "La carte vérifiée des conditions pour voyager avec votre chien ou votre chat, pays par pays : ce qu'exige chaque destination selon votre pays d'origine. Sources officielles et révision vétérinaire.",
  "lang": "fr"
 },
 {
  "title": "Atlas Zoovet Travel: requisiti per viaggiare con cani e gatti, paese per paese",
  "url": "atlas/index-it.html",
  "category": "Atlas",
  "keywords": "La mappa verificata dei requisiti per viaggiare con il tuo cane o gatto, paese per paese: cosa richiede ogni destinazione in base al tuo paese di origine. Fonti ufficiali e revisione veterinaria.",
  "lang": "it"
 },
 {
  "title": "Atlas Zoovet Travel: requisitos para viajar com cães e gatos, país por país",
  "url": "atlas/index-pt.html",
  "category": "Atlas",
  "keywords": "O mapa verificado dos requisitos para viajar com seu cão ou gato, país por país: o que cada destino exige conforme o seu país de origem. Fontes oficiais e revisão veterinária.",
  "lang": "pt"
 },
 {
  "title": "Atlas Zoovet Travel: requisitos para viajar con perros y gatos, país por país",
  "url": "atlas/index.html",
  "category": "Atlas",
  "keywords": "El mapa verificado de requisitos para viajar con tu perro o gato, país por país: qué exige cada destino según tu país de origen. Fuentes oficiales y revisión veterinaria.",
  "lang": "es"
 },
 {
  "title": "Mit Ihrem Haustier nach Italien einreisen 2026: Regel nach Land + Rassen (ohne Liste)",
  "url": "atlas/italia-de.html",
  "category": "Atlas",
  "keywords": "Bringen Sie Ihren Hund oder Ihre Katze nach Italien? Die Regel ändert sich je nach Land: Tollwut-Bluttest oder direkte Einreise. Und anders als Spanien verbietet Italien keine Rasse. Benannte Flughäfen, Registrierung und",
  "lang": "de"
 },
 {
  "title": "Enter Italy with your pet 2026: rule by country + breeds (no list)",
  "url": "atlas/italia-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to Italy? The rule changes by your country: rabies blood test or direct entry. And unlike Spain, Italy bans no breed. Designated airports, registration and authority. Verified with the Ministero de",
  "lang": "en"
 },
 {
  "title": "Entrer en Italie avec votre animal 2026 : règle par pays + races (sans liste)",
  "url": "atlas/italia-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat en Italie ? La règle change selon votre pays : prise de sang antirabique ou entrée directe. Et contrairement à l'Espagne, l'Italie n'interdit aucune race. Aéroports désignés, enregistreme",
  "lang": "fr"
 },
 {
  "title": "Entrare in Italia con il tuo animale 2026: regola per paese + razze (nessuna lista)",
  "url": "atlas/italia-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto in Italia? La regola cambia in base al tuo paese: test del sangue antirabbico o ingresso diretto. E a differenza della Spagna, l'Italia non vieta nessuna razza. Aeroporti designati, registrazion",
  "lang": "it"
 },
 {
  "title": "Entrar na Itália com seu pet 2026: regra por país + raças (sem lista)",
  "url": "atlas/italia-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato à Itália? A regra muda conforme o seu país: teste de sangue antirrábico ou entrada direta. E, ao contrário da Espanha, a Itália não proíbe nenhuma raça. Aeroportos designados, registro e autorid",
  "lang": "pt"
 },
 {
  "title": "Entrar a Italia con tu mascota 2026: regla por país + razas (sin lista)",
  "url": "atlas/italia.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a Italia? La regla cambia según tu país: prueba de sangre antirrábica o entrada directa. Y a diferencia de España, Italia no prohíbe ninguna raza. Aeropuertos designados, registro y autoridad. Ver",
  "lang": "es"
 },
 {
  "title": "Einreise nach Japan mit Haustier 2026: Einstufung nach Herkunftsland",
  "url": "atlas/japon-de.html",
  "category": "Atlas",
  "keywords": "Mit Hund oder Katze nach Japan? Je nach Land drohen 180 Tage Wartezeit und Quarantäne. Prüfe hier, ob deins einfach oder schwierig ist, und fang rechtzeitig an.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter Japan with your pet 2026: country-by-country classification",
  "url": "atlas/japon-en.html",
  "category": "Atlas",
  "keywords": "Flying to Japan with your dog or cat? Depending on your country there may be a 180-day wait and quarantine. Check if yours is easy or hard and start in time.",
  "lang": "en"
 },
 {
  "title": "Conditions d'entrée au Japon avec votre animal 2026 : classement par pays",
  "url": "atlas/japon-fr.html",
  "category": "Atlas",
  "keywords": "Vous partez au Japon avec votre chien ou chat ? Selon votre pays, l'attente peut atteindre 180 jours, voire une quarantaine. Voyez si le vôtre est facile et anticipez.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare in Giappone con il tuo animale 2026: classificazione per Paese",
  "url": "atlas/japon-it.html",
  "category": "Atlas",
  "keywords": "Viaggi in Giappone con cane o gatto? In base al tuo Paese puoi rischiare 180 giorni di attesa e quarantena. Scopri qui se il tuo è facile o difficile e parti in tempo.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar no Japão com seu pet 2026: classificação por país",
  "url": "atlas/japon-pt.html",
  "category": "Atlas",
  "keywords": "Vai ao Japão com seu cão ou gato? Dependendo do seu país, pode haver 180 dias de espera e quarentena. Veja aqui se o seu é fácil ou difícil e comece a tempo.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a Japón con tu mascota 2026: clasificación por país",
  "url": "atlas/japon.html",
  "category": "Atlas",
  "keywords": "¿Viajas a Japón con tu perro o gato? Según tu país puede haber 180 días de espera y cuarentena. Mira aquí si el tuyo es fácil o difícil y empieza a tiempo.",
  "lang": "es"
 },
 {
  "title": "Einreisebestimmungen für Haustiere nach Mexiko 2026: Einstufung nach Herkunftsland",
  "url": "atlas/mexico-de.html",
  "category": "Atlas",
  "keywords": "Bringen Sie Ihren Hund oder Ihre Katze nach Mexiko? Aus den USA und Kanada nur Inspektion; aus dem Rest der Welt ein Gesundheitszeugnis mit 15 Tagen Gültigkeit. SENASICA: keine Quarantäne, kein Bluttest.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter Mexico with your pet 2026: classification by country",
  "url": "atlas/mexico-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to Mexico? From the USA and Canada it's inspection only; from everywhere else, a 15-day health certificate. SENASICA: no quarantine, no blood test.",
  "lang": "en"
 },
 {
  "title": "Conditions pour entrer au Mexique avec votre animal 2026 : classification par pays",
  "url": "atlas/mexico-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat au Mexique ? Depuis les États-Unis et le Canada, simple inspection ; pour le reste, un certificat de santé de 15 jours. SENASICA : ni quarantaine ni test sanguin.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare in Messico con il tuo animale 2026: classificazione per paese",
  "url": "atlas/mexico-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto in Messico? Da USA e Canada solo ispezione; dal resto, un certificato di salute di 15 giorni. SENASICA: niente quarantena né esame del sangue.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar no México com seu pet 2026: classificação por país",
  "url": "atlas/mexico-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato ao México? Vindo dos EUA e do Canadá há apenas inspeção; do resto, um certificado de saúde de 15 dias. SENASICA: sem quarentena nem exame de sangue.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a México con tu mascota 2026: clasificación por país",
  "url": "atlas/mexico.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a México? Desde EE.UU. y Canadá solo hay inspección; del resto, un certificado de salud de 15 días. SENASICA: sin cuarentena ni prueba de sangre.",
  "lang": "es"
 },
 {
  "title": "Haustier nach Neuseeland 2026: MPI-Regeln",
  "url": "atlas/nueva-zelanda-de.html",
  "category": "Atlas",
  "keywords": "Hund oder Katze nach Neuseeland: fast kein Land reist direkt ein. MPI-Regeln (Biosecurity NZ), Quarantäne und verbotene Rassen, Land für Land. Stand 1.7.2026.",
  "lang": "de"
 },
 {
  "title": "Pet to New Zealand 2026: MPI rules",
  "url": "atlas/nueva-zelanda-en.html",
  "category": "Atlas",
  "keywords": "Dog or cat to New Zealand: almost no country enters directly. MPI (Biosecurity NZ) rules, quarantine and banned breeds, country by country. As of 1 Jul 2026.",
  "lang": "en"
 },
 {
  "title": "Animal en Nouvelle-Zélande 2026 : règles du MPI",
  "url": "atlas/nueva-zelanda-fr.html",
  "category": "Atlas",
  "keywords": "Chien ou chat en Nouvelle-Zélande : presque aucun pays n'entre directement. Règles du MPI (Biosecurity NZ), quarantaine et races interdites. Au 1 juil. 2026.",
  "lang": "fr"
 },
 {
  "title": "Animale in Nuova Zelanda 2026: regole del MPI",
  "url": "atlas/nueva-zelanda-it.html",
  "category": "Atlas",
  "keywords": "Cane o gatto in Nuova Zelanda: quasi nessun paese entra diretto. Regole del MPI (Biosecurity NZ), quarantena e razze vietate, paese per paese. 1 lug 2026.",
  "lang": "it"
 },
 {
  "title": "Pet para a Nova Zelândia 2026: regras do MPI",
  "url": "atlas/nueva-zelanda-pt.html",
  "category": "Atlas",
  "keywords": "Cão ou gato para a Nova Zelândia: quase nenhum país entra direto. Regras do MPI (Biosecurity NZ), quarentena e raças proibidas, país a país. 1 jul 2026.",
  "lang": "pt"
 },
 {
  "title": "Mascota a Nueva Zelanda 2026: reglas del MPI",
  "url": "atlas/nueva-zelanda.html",
  "category": "Atlas",
  "keywords": "Perro o gato a Nueva Zelanda: casi ningún país entra directo. Reglas del MPI (Biosecurity NZ), cuarentena y razas prohibidas, país por país. Al 1 jul 2026.",
  "lang": "es"
 },
 {
  "title": "Voraussetzungen für die Einreise nach Peru mit Ihrem Haustier 2026: SENASA-Verfahren nach Land",
  "url": "atlas/peru-de.html",
  "category": "Atlas",
  "keywords": "Bringen Sie Ihren Hund oder Ihre Katze nach Peru? SENASA verlangt von allen dasselbe: vollständige Impfung, Gesundheitszeugnis und Entwurmung. Kein Bluttest, keine Quarantäne. Sehen Sie sich das Verfahren an.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter Peru with your pet 2026: SENASA process by country",
  "url": "atlas/peru-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to Peru? SENASA asks the same of everyone: full vaccination, health certificate and deworming. No blood test, no quarantine. See the process.",
  "lang": "en"
 },
 {
  "title": "Conditions pour entrer au Pérou avec votre animal 2026 : la démarche SENASA par pays",
  "url": "atlas/peru-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat au Pérou ? Le SENASA exige la même chose de tous : vaccination complète, certificat de santé et vermifugation. Sans prise de sang ni quarantaine. Voyez la démarche.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare in Perù con il tuo animale 2026: procedura SENASA per paese",
  "url": "atlas/peru-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto in Perù? Il SENASA chiede lo stesso a tutti: vaccinazione completa, certificato sanitario e sverminazione. Senza esame del sangue né quarantena. Guarda la procedura.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar no Peru com seu pet 2026: trâmite SENASA por país",
  "url": "atlas/peru-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato ao Peru? O SENASA pede o mesmo de todos: vacinação completa, atestado de saúde e vermifugação. Sem exame de sangue nem quarentena. Veja o trâmite.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a Perú con tu mascota 2026: trámite SENASA por país",
  "url": "atlas/peru.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a Perú? SENASA pide lo mismo a todos: vacunación completa, certificado de salud y desparasitación. Sin prueba de sangre ni cuarentena. Mira el trámite.",
  "lang": "es"
 },
 {
  "title": "Mit Haustier ins Vereinigte Königreich 2026: Einstufung nach Land",
  "url": "atlas/reino-unido-de.html",
  "category": "Atlas",
  "keywords": "Mit Hund oder Katze ins Vereinigte Königreich? Die APHA-Regeln ändern sich je nach Land: manche reisen leicht ein, andere mit Bluttest und Monaten Wartezeit. Prüfen Sie hier Ihr Land.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter the United Kingdom with your pet 2026: classification by country",
  "url": "atlas/reino-unido-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to the UK? APHA's rules change by country: some enter easily, others need a blood test and months of waiting. Check yours here.",
  "lang": "en"
 },
 {
  "title": "Conditions d'entrée au Royaume-Uni avec votre animal 2026 : classement par pays",
  "url": "atlas/reino-unido-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat au Royaume-Uni ? Les règles de l'APHA changent selon le pays : certains entrent facilement, d'autres avec test sanguin et des mois d'attente. Vérifiez le vôtre ici.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare nel Regno Unito con il tuo animale 2026: classificazione per Paese",
  "url": "atlas/reino-unido-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto nel Regno Unito? Le regole dell'APHA cambiano in base al Paese: alcuni entrano facile, altri con esame del sangue e mesi di attesa. Controlla qui il tuo.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar no Reino Unido com seu pet 2026: classificação por país",
  "url": "atlas/reino-unido-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato ao Reino Unido? As regras da APHA mudam conforme o país: uns entram fácil, outros com exame de sangue e meses de espera. Veja aqui o seu.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a Reino Unido con tu mascota 2026: clasificación por país",
  "url": "atlas/reino-unido.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a Reino Unido? Las reglas de APHA cambian según tu país: unos entran fácil y otros con prueba de sangre y meses de espera. Mira aquí el tuyo.",
  "lang": "es"
 },
 {
  "title": "Einreise nach Russland mit Ihrem Haustier 2026: Klassifizierung nach Land",
  "url": "atlas/rusia-de.html",
  "category": "Atlas",
  "keywords": "Reisen Sie mit Hund oder Katze nach Russland? Anders als die EU verlangt Rosselkhoznadzor von KEINEM Land einen Bluttest. Sehen Sie den echten Ablauf, ohne Quarantäne und ohne Monate Wartezeit.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter Russia with your pet 2026: classification by country",
  "url": "atlas/rusia-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to Russia? Unlike the EU, Rosselkhoznadzor does NOT require a blood test from any country. See the real process, with no quarantine or months of waiting.",
  "lang": "en"
 },
 {
  "title": "Exigences pour entrer en Russie avec votre animal 2026 : classement par pays",
  "url": "atlas/rusia-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat en Russie ? Contrairement à l'UE, Rosselkhoznadzor n'exige de prise de sang d'AUCUN pays. Découvrez le vrai processus, sans quarantaine ni mois d'attente.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare in Russia con il tuo animale 2026: classificazione per paese",
  "url": "atlas/rusia-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto in Russia? A differenza dell'UE, Rosselkhoznadzor NON chiede l'esame del sangue a nessun paese. Scopri il processo reale, senza quarantena né mesi di attesa.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar na Rússia com seu pet 2026: classificação por país",
  "url": "atlas/rusia-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato para a Rússia? Ao contrário da UE, o Rosselkhoznadzor NÃO exige exame de sangue de nenhum país. Veja o processo real, sem quarentena nem meses de espera.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a Rusia con tu mascota 2026: clasificación por país",
  "url": "atlas/rusia.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a Rusia? A diferencia de la UE, Rosselkhoznadzor NO pide prueba de sangre a ningún país. Mira el proceso real, sin cuarentena ni meses de espera.",
  "lang": "es"
 },
 {
  "title": "Haustier nach Singapur 2026: AVS-Schedule-Regeln",
  "url": "atlas/singapur-de.html",
  "category": "Atlas",
  "keywords": "Zoovet Travel Atlas: Hund oder Katze nach Singapur laut AVS (NParks). Einstufung nach Schedule, 30 Tage Quarantäne und verbotene Rassen.",
  "lang": "de"
 },
 {
  "title": "Pet to Singapore 2026: AVS Schedule rules",
  "url": "atlas/singapur-en.html",
  "category": "Atlas",
  "keywords": "Zoovet Travel Atlas: take your dog or cat to Singapore per the AVS (NParks). Classification by Schedule, 30-day quarantine and banned breeds.",
  "lang": "en"
 },
 {
  "title": "Animal à Singapour 2026 : règles Schedule de l'AVS",
  "url": "atlas/singapur-fr.html",
  "category": "Atlas",
  "keywords": "Atlas Zoovet Travel : emmenez votre chien ou chat à Singapour selon l'AVS (NParks). Classement par Schedule, quarantaine de 30 jours et races interdites.",
  "lang": "fr"
 },
 {
  "title": "Animale a Singapore 2026: regole Schedule dell'AVS",
  "url": "atlas/singapur-it.html",
  "category": "Atlas",
  "keywords": "Atlas Zoovet Travel: porta il tuo cane o gatto a Singapore secondo l'AVS (NParks). Classificazione per Schedule, quarantena di 30 giorni e razze vietate.",
  "lang": "it"
 },
 {
  "title": "Pet para Singapura 2026: regras Schedule do AVS",
  "url": "atlas/singapur-pt.html",
  "category": "Atlas",
  "keywords": "Atlas Zoovet Travel: leve seu cão ou gato para Singapura conforme o AVS (NParks). Classificação por Schedule, quarentena de 30 dias e raças proibidas.",
  "lang": "pt"
 },
 {
  "title": "Mascota a Singapur 2026: reglas del AVS",
  "url": "atlas/singapur.html",
  "category": "Atlas",
  "keywords": "Atlas de Zoovet Travel: entra a Singapur con tu perro o gato según el AVS (NParks): clasificación por Schedule, cuarentena de 30 días y razas prohibidas.",
  "lang": "es"
 },
 {
  "title": "Voraussetzungen für die Einreise in die Europäische Union mit Ihrem Haustier 2026: Einstufung nach Land",
  "url": "atlas/union-europea-de.html",
  "category": "Atlas",
  "keywords": "Reisen Sie mit Ihrem Hund oder Ihrer Katze in die Europäische Union? Je nach Land verlangt die EU einen Tollwut-Bluttest und 3 Monate Wartezeit – oder Sie reisen direkt ein. Finden Sie Ihr Land hier.",
  "lang": "de"
 },
 {
  "title": "Requirements to enter the European Union with your pet 2026: classification by country",
  "url": "atlas/union-europea-en.html",
  "category": "Atlas",
  "keywords": "Taking your dog or cat to the European Union? Depending on your country, the EU requires a rabies blood test and a 3-month wait, or you enter directly. Find yours here.",
  "lang": "en"
 },
 {
  "title": "Conditions pour entrer dans l'Union européenne avec votre animal 2026 : classification par pays",
  "url": "atlas/union-europea-fr.html",
  "category": "Atlas",
  "keywords": "Vous emmenez votre chien ou chat dans l'Union européenne ? Selon votre pays, l'UE exige une prise de sang antirabique et 3 mois d'attente, ou vous entrez directement. Cherchez le vôtre ici.",
  "lang": "fr"
 },
 {
  "title": "Requisiti per entrare nell'Unione Europea con il tuo animale 2026: classificazione per paese",
  "url": "atlas/union-europea-it.html",
  "category": "Atlas",
  "keywords": "Porti il tuo cane o gatto nell'Unione Europea? In base al tuo paese, l'UE richiede il test del sangue antirabbico e 3 mesi di attesa, oppure entri direttamente. Cerca il tuo qui.",
  "lang": "it"
 },
 {
  "title": "Requisitos para entrar na União Europeia com seu pet 2026: classificação por país",
  "url": "atlas/union-europea-pt.html",
  "category": "Atlas",
  "keywords": "Vai levar seu cão ou gato à União Europeia? Dependendo do seu país, a UE exige teste de sangue antirrábico e 3 meses de espera, ou você entra direto. Procure o seu aqui.",
  "lang": "pt"
 },
 {
  "title": "Requisitos para entrar a la Unión Europea con tu mascota 2026: clasificación por país",
  "url": "atlas/union-europea.html",
  "category": "Atlas",
  "keywords": "¿Llevas tu perro o gato a la Unión Europea? Según tu país, la UE pide prueba de sangre antirrábica y 3 meses de espera, o entras directo. Busca el tuyo aquí.",
  "lang": "es"
 },
 {
  "title": "Export Your Pet from Peru: International Veterinary Cargo",
  "url": "cargo-en.html",
  "category": "Servicios",
  "keywords": "International pet air cargo from Peru: IATA kennel, AWB LATAM/Iberia/Air France, SENASA CZE 5-day window, broker coordination at destination. No Lima needed.",
  "lang": "en"
 },
 {
  "title": "Exporter son Animal depuis le Pérou — Fret Vétérinaire",
  "url": "cargo-fr.html",
  "category": "Servicios",
  "keywords": "Cargo aérien animaux depuis le Pérou : kennel IATA, LTA LATAM/Iberia/Air France, CZE SENASA 5 jours, coordination agent destination. Sans aller à Lima.",
  "lang": "fr"
 },
 {
  "title": "Exportar Mascotas desde Perú: Cargo Internacional Veterinario",
  "url": "cargo.html",
  "category": "Servicios",
  "keywords": "Tu mascota no puede salir del Perú sin SENASA ni FAVN. Lo gestionamos: médicos colegiados CMVP 12434, 13 años exportando a Europa, EE.UU. y Asia. Cobertura nacional.",
  "lang": "es"
 },
 {
  "title": "World Directory of Pet Export Authorities",
  "url": "directorio-exportacion-mascotas-en.html",
  "category": "Servicios",
  "keywords": "Which authority issues your pet's export certificate by country? 49 countries with offices, systems and verified official sources.",
  "lang": "en"
 },
 {
  "title": "Annuaire mondial des autorités d'exportation d'animaux de compagnie",
  "url": "directorio-exportacion-mascotas-fr.html",
  "category": "Servicios",
  "keywords": "Quelle autorité délivre le certificat d'exportation de votre animal, par pays ? 49 pays avec bureaux, systèmes et sources officielles vérifiées.",
  "lang": "fr"
 },
 {
  "title": "Directorio mundial de autoridades de exportación de mascotas",
  "url": "directorio-exportacion-mascotas.html",
  "category": "Servicios",
  "keywords": "¿Qué autoridad emite el certificado de exportación de tu mascota por país? 49 países con oficinas, sistemas y fuentes oficiales verificadas.",
  "lang": "es"
 },
 {
  "title": "Exporting Pets from Peru: Requirements by Destination 2026",
  "url": "exportacion-mascotas-peru-en.html",
  "category": "Servicios",
  "keywords": "Your pet can't leave Peru without SENASA clearance and FAVN rabies serology. We handle it all: English-speaking vets, 13 years exporting pets from Peru.",
  "lang": "en"
 },
 {
  "title": "Exporter un animal de compagnie depuis le Pérou : exigences par destination 2026",
  "url": "exportacion-mascotas-peru-fr.html",
  "category": "Servicios",
  "keywords": "Votre animal ne peut pas quitter le Pérou sans SENASA ni sérologie antirabique FAVN. Nous le gérons : vétérinaires en français, 13 ans d'expérience.",
  "lang": "fr"
 },
 {
  "title": "Exportación de Mascotas desde Perú: Requisitos por Destino 2026",
  "url": "exportacion-mascotas-peru.html",
  "category": "Servicios",
  "keywords": "Tu mascota no puede salir del Perú sin SENASA ni serología antirrábica FAVN. Nosotros lo gestionamos: médicos colegiados, 13 años exportando mascotas.",
  "lang": "es"
 },
 {
  "title": "International Pet Export Requirements: Rabies Serology FAVN by Destination",
  "url": "exportar-perro-requisitos-en.html",
  "category": "Servicios",
  "keywords": "FAVN/RNATT requirements by destination: US CDC 2024, EU Reg. 576/2013, UK DEFRA post-Brexit, Japan AQS. Legal frameworks, timelines, and consequences. Zoovet Travel, Peru.",
  "lang": "en"
 },
 {
  "title": "Conditions d'exportation internationale d'animaux de compagnie : sérologie FAVN par destination",
  "url": "exportar-perro-requisitos-fr.html",
  "category": "Servicios",
  "keywords": "FAVN/RNATT par destination : États-Unis CDC 2024, UE Règl. 576/2013, Royaume-Uni DEFRA post-Brexit, Japon AQS. Cadres légaux, délais, conséquences. Zoovet Travel, Pérou.",
  "lang": "fr"
 },
 {
  "title": "Requisitos Internacionales para Exportar Mascotas: FAVN, CDC, UE, UK y Japón",
  "url": "exportar-perro-requisitos.html",
  "category": "Servicios",
  "keywords": "FAVN por destino: EE.UU. CDC 2024, UE Reg. 576/2013, Reino Unido y Japón. Marcos legales vigentes, secuencias y consecuencias. Zoovet Travel, Perú.",
  "lang": "es"
 },
 {
  "title": "Rabies Titer Test & Serology for Pet Travel from Peru: FAVN, KSVDL Protocol & Complete Guide 2026",
  "url": "favn-en.html",
  "category": "Servicios",
  "keywords": "FAVN from Peru: 91% seroconversion D1/D15/D30 · 13 years KSVDL · CMVP 12434 + CMVP 3103 zoonosis specialist · 421 human rabies cases Peru. The definitive guide.",
  "lang": "en"
 },
 {
  "title": "Serología de Rabia para Mascotas en Perú: Prueba FAVN, KSVDL y Protocolo Completo 2026",
  "url": "favn-es.html",
  "category": "Servicios",
  "keywords": "FAVN desde Perú: 91% seroconversión D1/D15/D30 · 13 años KSVDL · CMVP 12434 + CMVP 3103 zoonosis · 421 casos rabia humana Perú. Guía definitiva.",
  "lang": "es"
 },
 {
  "title": "Sérologie Rage Animaux au Pérou : Test FAVN, Protocole KSVDL et Guide Complet 2026",
  "url": "favn-fr.html",
  "category": "Servicios",
  "keywords": "FAVN depuis le Pérou : 91% séroconversion J1/J15/J30 · 13 ans KSVDL · CMVP 12434 + CMVP 3103 zoonoses · 421 cas rage humaine Pérou. Le guide définitif.",
  "lang": "fr"
 },
 {
  "title": "ACF: what the CDC-registered facility is and why your dog needs a reservation | Zoovet Travel Glossary",
  "url": "glosario/acf-en.html",
  "category": "Glosario",
  "keywords": "What a CDC-registered Animal Care Facility (ACF) is, the 7 facilities operating at 6 U.S. airports with their contact details, and why a reservation is mandatory before your dog flies. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "ACF : ce qu'est l'établissement enregistré par le CDC et pourquoi votre chien doit réserver | Glossaire Zoovet",
  "url": "glosario/acf-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est une ACF (établissement de soins animaliers enregistré par le CDC), les 7 établissements habilités dans 6 aéroports des États-Unis avec leurs contacts, et pourquoi la réservation est obligatoire avant le vol. Vé",
  "lang": "fr"
 },
 {
  "title": "ACF: qué es la instalación registrada por el CDC y por qué tu perro necesita reserva | Glosario Zoovet Travel",
  "url": "glosario/acf.html",
  "category": "Glosario",
  "keywords": "Qué es una ACF (CDC-registered Animal Care Facility), las 7 instalaciones habilitadas en 6 aeropuertos de EE.UU. con sus contactos, y por qué la reserva es obligatoria antes de volar. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "APHA United Kingdom: GB Pet Travel Scheme and post-Brexit FAVN requirements | Zoovet Travel Glossary",
  "url": "glosario/apha-en.html",
  "category": "Glosario",
  "keywords": "What APHA is, how the GB Pet Travel Scheme works, and what it requires to import pets from Peru to the United Kingdom.",
  "lang": "en"
 },
 {
  "title": "APHA Royaume-Uni : GB Pet Travel Scheme et exigences FAVN post-Brexit | Glossaire Zoovet Travel",
  "url": "glosario/apha-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est l'APHA, comment fonctionne le GB Pet Travel Scheme et ce qu'il faut pour importer des animaux depuis le Pérou au Royaume-Uni.",
  "lang": "fr"
 },
 {
  "title": "APHA Reino Unido: GB Pet Travel Scheme y requisitos FAVN post-Brexit | Glosario Zoovet Travel",
  "url": "glosario/apha.html",
  "category": "Glosario",
  "keywords": "Qué es la APHA, cómo funciona el GB Pet Travel Scheme y qué exige para importar mascotas desde Perú al Reino Unido.",
  "lang": "es"
 },
 {
  "title": "APQA South Korea: quarantine and FAVN for pet export from Peru | Zoovet Travel Glossary",
  "url": "glosario/apqa-en.html",
  "category": "Glosario",
  "keywords": "What South Korea's APQA is, what quarantine it requires for pets from Peru, and why FAVN reduces the time from 180 to 7 days.",
  "lang": "en"
 },
 {
  "title": "APQA Corée du Sud : quarantaine et FAVN pour l'exportation d'animaux depuis le Pérou | Glossaire Zoovet Travel",
  "url": "glosario/apqa-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est l'APQA de Corée du Sud, quelle quarantaine elle exige pour les animaux du Pérou et pourquoi le FAVN réduit la durée de 180 à 7 jours.",
  "lang": "fr"
 },
 {
  "title": "APQA Corea del Sur: cuarentena y FAVN para exportar mascotas desde Perú | Glosario Zoovet Travel",
  "url": "glosario/apqa.html",
  "category": "Glosario",
  "keywords": "Qué es la APQA de Corea del Sur, qué cuarentena exige para mascotas de Perú y por qué el FAVN reduce el tiempo de 180 a 7 días.",
  "lang": "es"
 },
 {
  "title": "AQS Japan: what the Animal Quarantine Service is and what it demands of your pet | Zoovet Travel Glossary",
  "url": "glosario/aqs-japon-en.html",
  "category": "Glosario",
  "keywords": "Japan's animal quarantine service is the strictest in the developed world: two rabies shots, a 180-day wait and 40 days' advance notice. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "AQS Japon : ce qu'est l'Animal Quarantine Service et ce qu'il exige de votre animal | Glossaire Zoovet Travel",
  "url": "glosario/aqs-japon-fr.html",
  "category": "Glosario",
  "keywords": "Le service de quarantaine animale japonais est le plus exigeant du monde développé : double vaccination, 180 jours d'attente et préavis de 40 jours. Vérifié le 11 juillet 2026.",
  "lang": "fr"
 },
 {
  "title": "AQS Japón: qué es el Animal Quarantine Service y qué exige a tu mascota | Glosario Zoovet Travel",
  "url": "glosario/aqs-japon.html",
  "category": "Glosario",
  "keywords": "El servicio de cuarentena animal japonés es el más exigente del mundo desarrollado: doble vacuna, 180 días de espera y aviso con 40 días de antelación. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "CDC Dog Import Form: what it is, when to file it and why it expires in a day | Zoovet Travel Glossary",
  "url": "glosario/cdc-dog-import-form-en.html",
  "category": "Glosario",
  "keywords": "The form every dog needs to enter the United States: free, online, one per animal, with photo and microchip. The receipt is valid only for the arrival date declared on it. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "CDC Dog Import Form : ce que c'est, quand le remplir et pourquoi il expire en un jour | Glossaire Zoovet Trave",
  "url": "glosario/cdc-dog-import-form-fr.html",
  "category": "Glosario",
  "keywords": "Le formulaire que tout chien doit avoir pour entrer aux États-Unis : gratuit, en ligne, un par animal, avec photo et puce. Le reçu n'est valable que pour la date d'arrivée déclarée. Vérifié le 11 juillet 2026.",
  "lang": "fr"
 },
 {
  "title": "CDC Dog Import Form: qué es, cuándo se llena y por qué caduca en un día | Glosario Zoovet Travel",
  "url": "glosario/cdc-dog-import-form.html",
  "category": "Glosario",
  "keywords": "El formulario que todo perro necesita para entrar a Estados Unidos: gratuito, online, uno por animal, con foto y microchip. Su recibo vale solo para la fecha de llegada indicada. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "CDC pet import to USA from Peru: 2024 Final Rule | Zoovet Travel Glossary",
  "url": "glosario/cdc-importacion-en.html",
  "category": "Glosario",
  "keywords": "What CDC Final Rule 89 FR 38450 is, why it classifies Peru as DMRVV, and what it requires to import dogs to the USA since August 2024.",
  "lang": "en"
 },
 {
  "title": "CDC importation d'animaux aux États-Unis depuis le Pérou : Règle Finale 2024 | Glossaire Zoovet Travel",
  "url": "glosario/cdc-importacion-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est la Règle Finale CDC 89 FR 38450, pourquoi elle classe le Pérou comme DMRVV et ce qu'elle exige pour importer des chiens aux États-Unis depuis août 2024.",
  "lang": "fr"
 },
 {
  "title": "CDC importación de mascotas a EE. UU. desde Perú: Regla Final 2024 | Glosario Zoovet Travel",
  "url": "glosario/cdc-importacion.html",
  "category": "Glosario",
  "keywords": "Qué es la Regla Final CDC 89 FR 38450, por qué clasifica a Perú como DMRVV y qué requisitos exige para importar perros a EE. UU. desde agosto 2024.",
  "lang": "es"
 },
 {
  "title": "CDC Certification of Foreign Rabies Vaccination: who signs it and how long it lasts | Zoovet Travel Glossary",
  "url": "glosario/certificacion-vacunacion-antirrabica-extranjera-en.html",
  "category": "Glosario",
  "keywords": "The CDC form your veterinarian fills in and an official government veterinarian must endorse (in Peru, SENASA). Valid for 30 days from signature, and good for one entry only. Verified 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Certification de vaccination antirabique étrangère du CDC : qui la signe et combien de temps elle dure | Gloss",
  "url": "glosario/certificacion-vacunacion-antirrabica-extranjera-fr.html",
  "category": "Glosario",
  "keywords": "Le formulaire du CDC que remplit le vétérinaire et qu'un vétérinaire officiel du gouvernement doit viser (au Pérou, le SENASA). Valable 30 jours à compter de la signature et pour une seule entrée. Vérifié le 11 juillet 2",
  "lang": "fr"
 },
 {
  "title": "Certificación de vacunación antirrábica extranjera del CDC: quién la firma y cuánto dura | Glosario Zoovet Tra",
  "url": "glosario/certificacion-vacunacion-antirrabica-extranjera.html",
  "category": "Glosario",
  "keywords": "El formulario del CDC que completa el veterinario y endosa un veterinario oficial del gobierno (en Perú, SENASA). Válido 30 días desde la firma y para una sola entrada. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "SENASA Export Health Certificate: how to obtain it | Zoovet Travel Glossary",
  "url": "glosario/certificado-sanitario-exportacion-en.html",
  "category": "Glosario",
  "keywords": "What the SENASA Export Health Certificate is, when it is issued, its 10-day validity, and what information it must contain to be accepted internationally.",
  "lang": "en"
 },
 {
  "title": "Certificat Sanitaire d'Exportation SENASA : comment l'obtenir | Glossaire Zoovet Travel",
  "url": "glosario/certificado-sanitario-exportacion-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est le Certificat Sanitaire d'Exportation SENASA, quand il est délivré, sa validité de 10 jours et les informations qu'il doit contenir pour être accepté internationalement.",
  "lang": "fr"
 },
 {
  "title": "Certificado Sanitario de Exportación SENASA: cómo obtenerlo | Glosario Zoovet Travel",
  "url": "glosario/certificado-sanitario-exportacion.html",
  "category": "Glosario",
  "keywords": "Qué es el Certificado Sanitario de Exportación de SENASA, cuándo se emite, su validez de 10 días y qué información debe contener para que sea aceptado internacionalmente.",
  "lang": "es"
 },
 {
  "title": "International Veterinary Certificate (CVI) MERCOSUR: what it is | Zoovet Travel Glossary",
  "url": "glosario/certificado-veterinario-internacional-en.html",
  "category": "Glosario",
  "keywords": "What the International Veterinary Certificate (CVI) MERCOSUR model is, what it certifies, its 60-day validity, and why it is not the same as the US USDA CVI.",
  "lang": "en"
 },
 {
  "title": "Certificat Vétérinaire International (CVI) MERCOSUR : qu'est-ce que c'est | Glossaire Zoovet Travel",
  "url": "glosario/certificado-veterinario-internacional-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est le Certificat Vétérinaire International (CVI) modèle MERCOSUR, ce qu'il certifie, sa validité de 60 jours et pourquoi il n'est pas le CVI des États-Unis du USDA.",
  "lang": "fr"
 },
 {
  "title": "Certificado Veterinário Internacional (CVI) MERCOSUR: qué es | Glosario Zoovet Travel",
  "url": "glosario/certificado-veterinario-internacional.html",
  "category": "Glosario",
  "keywords": "Qué es el Certificado Veterinário Internacional (CVI) modelo MERCOSUR, qué certifica, su validez de 60 días y por qué no es lo mismo que el CVI de EE. UU. del USDA.",
  "lang": "es"
 },
 {
  "title": "CFIA Canada: FAVN requirements and certificate for pet export from Peru | Zoovet Travel Glossary",
  "url": "glosario/cfia-en.html",
  "category": "Glosario",
  "keywords": "What Canada's CFIA is, what it requires for pets from Peru, and how to manage the bilingual certificate for the Canadian border.",
  "lang": "en"
 },
 {
  "title": "ACIA Canada : exigences FAVN et certificat pour l'exportation d'animaux depuis le Pérou | Glossaire Zoovet Tra",
  "url": "glosario/cfia-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est l'ACIA du Canada, ce qu'elle exige pour les animaux du Pérou et comment gérer le certificat bilingue pour la frontière canadienne.",
  "lang": "fr"
 },
 {
  "title": "CFIA Canadá: requisitos FAVN y certificado para exportar mascotas desde Perú | Glosario Zoovet Travel",
  "url": "glosario/cfia.html",
  "category": "Glosario",
  "keywords": "Qué es la CFIA de Canadá, qué exige para mascotas de Perú y cómo gestionar el certificado bilingüe para la frontera canadiense.",
  "lang": "es"
 },
 {
  "title": "Detention quarantine in Japan: up to 180 days, and the owner pays for everything | Zoovet Travel Glossary",
  "url": "glosario/cuarentena-de-retencion-en.html",
  "category": "Glosario",
  "keywords": "Dogs and cats that fail to meet Japan's requirements are held for up to 180 days in an AQS facility. The importer pays for care and feeding. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Quarantaine de rétention au Japon : jusqu'à 180 jours, et le propriétaire paie tout | Glossaire Zoovet Travel",
  "url": "glosario/cuarentena-de-retencion-fr.html",
  "category": "Glosario",
  "keywords": "Les chiens et les chats qui ne respectent pas les exigences japonaises sont retenus jusqu'à 180 jours dans une installation de l'AQS. L'importateur paie les soins et l'alimentation. Vérifié le 11 juillet 2026.",
  "lang": "fr"
 },
 {
  "title": "Cuarentena de retención en Japón: hasta 180 días, y el dueño paga todo | Glosario Zoovet Travel",
  "url": "glosario/cuarentena-de-retencion.html",
  "category": "Glosario",
  "keywords": "Los perros y gatos que no cumplen los requisitos japoneses quedan retenidos hasta 180 días en una instalación del AQS. El importador paga el cuidado y la alimentación. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "Animal quarantine in pet export: models, timelines and how to avoid it | Zoovet Travel Glossary",
  "url": "glosario/cuarentena-en.html",
  "category": "Glosario",
  "keywords": "Operational definition of animal quarantine for pet export: Australia model, CDC/ACF, EU. Real timelines and errors that trigger it. By Carlos Ravello Joo · Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "Quarantaine animale pour l'exportation d'animaux de compagnie : modèles, délais et comment l'éviter | Glossair",
  "url": "glosario/cuarentena-fr.html",
  "category": "Glosario",
  "keywords": "Définition opérationnelle de la quarantaine animale : modèle australien, CDC/ACF, UE. Délais réels et erreurs qui la déclenchent. Par Carlos Ravello Joo · Zoovet Travel.",
  "lang": "fr"
 },
 {
  "title": "Cuarentena animal en exportación de mascotas: modelos, plazos y cómo evitarla | Glosario Zoovet Travel",
  "url": "glosario/cuarentena.html",
  "category": "Glosario",
  "keywords": "Definición operativa de cuarentena animal para exportación de mascotas: modelo Australia, CDC/ACF, UE. Plazos reales y errores que la desencadenan. Por Carlos Ravello Joo · Zoovet Travel.",
  "lang": "es"
 },
 {
  "title": "CVI (Certificate of Veterinary Inspection): USDA requirement for pet export to the US | Zoovet Travel Glossary",
  "url": "glosario/cvi-en.html",
  "category": "Glosario",
  "keywords": "What the CVI (Certificate of Veterinary Inspection) is, how it differs from the CSE, and why USDA endorsement is mandatory for bringing pets into the United States.",
  "lang": "en"
 },
 {
  "title": "CVI (Certificate of Veterinary Inspection) : exigence USDA pour l'exportation d'animaux vers les États-Unis | ",
  "url": "glosario/cvi-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est le CVI (Certificate of Veterinary Inspection), en quoi il diffère du CSE et pourquoi l'aval USDA est obligatoire pour amener des animaux aux États-Unis.",
  "lang": "fr"
 },
 {
  "title": "CVI (Certificate of Veterinary Inspection): requisito USDA para exportar mascotas a EE.UU. | Glosario Zoovet T",
  "url": "glosario/cvi.html",
  "category": "Glosario",
  "keywords": "Qué es el CVI (Certificate of Veterinary Inspection), cómo se diferencia del CSE y por qué el endorsement USDA es obligatorio para ingresar mascotas a Estados Unidos.",
  "lang": "es"
 },
 {
  "title": "DALRRD South Africa: 30-day quarantine and FAVN for pet export from Peru | Zoovet Travel Glossary",
  "url": "glosario/dalrrd-en.html",
  "category": "Glosario",
  "keywords": "What South Africa's DALRRD is, what 30-day quarantine it requires for pets from Peru, and why FAVN must be at least 90 days old.",
  "lang": "en"
 },
 {
  "title": "DALRRD Afrique du Sud : quarantaine 30 jours et FAVN pour l'exportation d'animaux depuis le Pérou | Glossaire ",
  "url": "glosario/dalrrd-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est le DALRRD d'Afrique du Sud, quelle quarantaine de 30 jours il exige pour les animaux du Pérou et pourquoi le FAVN doit avoir au moins 90 jours.",
  "lang": "fr"
 },
 {
  "title": "DALRRD Sudáfrica: cuarentena 30 días y FAVN para exportar mascotas desde Perú | Glosario Zoovet Travel",
  "url": "glosario/dalrrd.html",
  "category": "Glosario",
  "keywords": "Qué es el DALRRD de Sudáfrica, qué cuarentena de 30 días exige para mascotas de Perú y por qué el FAVN debe tener 90 días de antigüedad.",
  "lang": "es"
 },
 {
  "title": "Double rabies vaccination: why Japan rejects your puppy's shot | Zoovet Travel Glossary",
  "url": "glosario/doble-vacunacion-antirrabica-en.html",
  "category": "Glosario",
  "keywords": "Japan requires two rabies vaccinations, the first from 91 days of age — not 84 — and rejects RNA and live-virus vaccines. A shot that is valid across half the world is worthless there. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Double vaccination antirabique : pourquoi le Japon refuse le vaccin de votre chiot | Glossaire Zoovet Travel",
  "url": "glosario/doble-vacunacion-antirrabica-fr.html",
  "category": "Glosario",
  "keywords": "Le Japon exige deux vaccins antirabiques, le premier à partir de 91 jours d'âge — pas 84 — et refuse les vaccins à ARN et à virus vivant. Un vaccin valable dans la moitié du monde n'y vaut rien. Vérifié le 11 juillet 202",
  "lang": "fr"
 },
 {
  "title": "Doble vacunación antirrábica: por qué Japón rechaza la vacuna de tu cachorro | Glosario Zoovet Travel",
  "url": "glosario/doble-vacunacion-antirrabica.html",
  "category": "Glosario",
  "keywords": "Japón exige dos vacunas antirrábicas, la primera a partir de los 91 días de edad —no 84— y rechaza las vacunas de ARN y de virus vivo. Una vacuna válida en medio mundo no vale allí. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "Japan's 180 days: when the clock starts and why the antibody test lasts 2 years | Zoovet Travel Glossary",
  "url": "glosario/espera-180-dias-japon-en.html",
  "category": "Glosario",
  "keywords": "Japan requires a 180-day wait from the blood sampling date. The result is valid for 2 years, and if it lapses the wait does not start over. Almost nobody knows that second half. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Les 180 jours du Japon : à partir de quand on les compte et pourquoi le titrage dure 2 ans | Glossaire Zoovet ",
  "url": "glosario/espera-180-dias-japon-fr.html",
  "category": "Glosario",
  "keywords": "Le Japon exige 180 jours d'attente à compter du prélèvement sanguin. Le résultat vaut 2 ans, et s'il expire il ne faut pas refaire l'attente. Presque personne ne connaît cette seconde partie. Vérifié le 11 juillet 2026.",
  "lang": "fr"
 },
 {
  "title": "Los 180 días de Japón: desde cuándo se cuentan y por qué la titulación dura 2 años | Glosario Zoovet Travel",
  "url": "glosario/espera-180-dias-japon.html",
  "category": "Glosario",
  "keywords": "Japón exige 180 días de espera desde la extracción de sangre. El resultado vale 2 años, y si se vence no hay que repetir la espera. Casi nadie conoce esa segunda parte. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "FAVN: what it is, threshold and countries requiring it for pet export | Zoovet Travel Glossary",
  "url": "glosario/favn-en.html",
  "category": "Glosario",
  "keywords": "Operational definition of FAVN (Fluorescent Antibody Virus Neutralization): ≥0.5 IU/mL threshold, KSVDL laboratory, timelines and countries. By Carlos Ravello Joo · Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "FAVN : test de titrage des anticorps antirabiques pour l'exportation d'animaux | Glossaire Zoovet Travel",
  "url": "glosario/favn-fr.html",
  "category": "Glosario",
  "keywords": "Définition opérationnelle du FAVN (Fluorescent Antibody Virus Neutralization) : seuil ≥ 0,5 UI/mL, laboratoire KSVDL, délais et pays exigeants. Par Carlos Ravello Joo · Zoovet Travel.",
  "lang": "fr"
 },
 {
  "title": "FAVN: qué es, umbral y países que la exigen para exportar mascotas | Glosario Zoovet Travel",
  "url": "glosario/favn.html",
  "category": "Glosario",
  "keywords": "Definición operativa de FAVN (Fluorescent Antibody Virus Neutralization): umbral ≥ 0.5 IU/mL, laboratorio KSVDL, plazos y países. Por Carlos Ravello Joo · Zoovet Travel.",
  "lang": "es"
 },
 {
  "title": "Fit-to-fly: what is the pet flight fitness certificate | Zoovet Travel Glossary",
  "url": "glosario/fit-to-fly-en.html",
  "category": "Glosario",
  "keywords": "What the fit-to-fly is, how it differs from the CSE, and why it is mandatory for flying with your pet on international routes.",
  "lang": "en"
 },
 {
  "title": "Fit-to-fly : qu'est-ce que le certificat d'aptitude au vol pour les animaux | Glossaire Zoovet Travel",
  "url": "glosario/fit-to-fly-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est le fit-to-fly, en quoi il diffère du CSE et pourquoi il est obligatoire pour voyager avec votre animal sur des routes internationales.",
  "lang": "fr"
 },
 {
  "title": "Fit-to-fly: qué es el certificado de aptitud para vuelo de mascotas | Glosario Zoovet Travel",
  "url": "glosario/fit-to-fly.html",
  "category": "Glosario",
  "keywords": "Qué es el fit-to-fly, en qué se diferencia del CSE y por qué es obligatorio para volar con tu mascota en rutas internacionales.",
  "lang": "es"
 },
 {
  "title": "Form AC: Japan's certificate and why a crossing-out can cost 180 days | Zoovet Travel Glossary",
  "url": "glosario/form-ac-en.html",
  "category": "Glosario",
  "keywords": "Form AC is the official certificate Japan requires to import dogs and cats. A flaw in the paperwork —not in the animal— sends the pet into quarantine for up to 180 days. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Form AC : le certificat japonais et pourquoi une rature peut coûter 180 jours | Glossaire Zoovet Travel",
  "url": "glosario/form-ac-fr.html",
  "category": "Glosario",
  "keywords": "Le Form AC est le certificat officiel exigé par le Japon pour importer chiens et chats. Une irrégularité sur le papier —et non sur l'animal— envoie l'animal en quarantaine jusqu'à 180 jours. Vérifié le 11 juillet 2026.",
  "lang": "fr"
 },
 {
  "title": "Form AC: el certificado japonés y por qué un tachón puede costar 180 días | Glosario Zoovet Travel",
  "url": "glosario/form-ac.html",
  "category": "Glosario",
  "keywords": "El Form AC es el certificado oficial que Japón exige para importar perros y gatos. Una deficiencia en el papel —no en el animal— manda a la mascota a cuarentena hasta 180 días. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "GACC China: 30-day quarantine and pet import process from Peru | Zoovet Travel Glossary",
  "url": "glosario/gacc-en.html",
  "category": "Glosario",
  "keywords": "What China's GACC is, why it requires apostille on the SENASA certificate, and how to manage the 30-day quarantine to bring a pet to China.",
  "lang": "en"
 },
 {
  "title": "GACC Chine : quarantaine 30 jours et processus d'importation d'animaux depuis le Pérou | Glossaire Zoovet Trav",
  "url": "glosario/gacc-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est la GACC de Chine, pourquoi elle exige l'apostille sur le certificat SENASA et comment gérer la quarantaine de 30 jours pour amener un animal en Chine.",
  "lang": "fr"
 },
 {
  "title": "GACC China: cuarentena 30 días y proceso de importación de mascotas desde Perú | Glosario Zoovet Travel",
  "url": "glosario/gacc.html",
  "category": "Glosario",
  "keywords": "Qué es la GACC de China, por qué exige apostilla en el certificado SENASA y cómo gestionar la cuarentena de 30 días para llevar una mascota a China.",
  "lang": "es"
 },
 {
  "title": "Hypobaric conditions in flight: risks for pets in aircraft holds | Zoovet Travel Glossary",
  "url": "glosario/hipobaria-en.html",
  "category": "Glosario",
  "keywords": "What hypobaric conditions are in flight, why they affect brachycephalic breeds more, and how to assess the risk before flying with your pet.",
  "lang": "en"
 },
 {
  "title": "Hypobarie en vol : risque pour les animaux dans la soute d'un avion | Glossaire Zoovet Travel",
  "url": "glosario/hipobaria-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est l'hypobarie en vol, pourquoi elle affecte davantage les races brachycéphales et comment évaluer le risque avant de voler avec votre animal.",
  "lang": "fr"
 },
 {
  "title": "Hipobaria en vuelo: riesgo para mascotas en bodega de avión | Glosario Zoovet Travel",
  "url": "glosario/hipobaria.html",
  "category": "Glosario",
  "keywords": "Qué es la hipobaria en vuelo, por qué afecta más a las razas braquicéfalas y cómo evaluar el riesgo antes de volar con tu mascota.",
  "lang": "es"
 },
 {
  "title": "IATA LAR: pet air transport, containers and requirements | Zoovet Travel Glossary",
  "url": "glosario/iata-lar-en.html",
  "category": "Glosario",
  "keywords": "What IATA LAR is, how it determines pet container size, brachycephalic breed restrictions and mandatory documentation on every international flight.",
  "lang": "en"
 },
 {
  "title": "IATA LAR : transport aérien d'animaux, conteneurs et exigences | Glossaire Zoovet Travel",
  "url": "glosario/iata-lar-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est le IATA LAR, comment il détermine la taille du conteneur pour animaux, les restrictions pour les races brachycéphales et la documentation obligatoire sur chaque vol international.",
  "lang": "fr"
 },
 {
  "title": "IATA LAR: transporte aéreo de mascotas, contenedores y requisitos | Glosario Zoovet Travel",
  "url": "glosario/iata-lar.html",
  "category": "Glosario",
  "keywords": "Qué es el IATA LAR, cómo determina el tamaño del contenedor para mascotas, las restricciones para braquicéfalos y la documentación obligatoria en cada vuelo internacional.",
  "lang": "es"
 },
 {
  "title": "Import Health Standard (IHS): what it is and why New Zealand's new standard changes the timeline | Zoovet Trav",
  "url": "glosario/import-health-standard-en.html",
  "category": "Glosario",
  "keywords": "What an Import Health Standard is, how New Zealand's CATSDOGS.GEN works and why the new identity check six months before export moves the whole timeline forward. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Import Health Standard (IHS) : ce que c'est et pourquoi la nouvelle norme néo-zélandaise change le calendrier ",
  "url": "glosario/import-health-standard-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est un Import Health Standard, comment fonctionne le CATSDOGS.GEN néo-zélandais et pourquoi le nouveau contrôle d'identité six mois avant l'exportation avance tout le calendrier. Vérifié le 11 juillet 2026.",
  "lang": "fr"
 },
 {
  "title": "Import Health Standard (IHS): qué es y por qué el nuevo estándar de Nueva Zelanda cambia el calendario | Glosa",
  "url": "glosario/import-health-standard.html",
  "category": "Glosario",
  "keywords": "Qué es un Import Health Standard, cómo funciona el CATSDOGS.GEN de Nueva Zelanda y por qué el nuevo control de identidad seis meses antes de exportar adelanta todo el calendario. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "Pet export regulatory glossary",
  "url": "glosario/index-en.html",
  "category": "Glosario",
  "keywords": "Technical and regulatory definitions of key terms in international pet export from Peru: FAVN, ISO microchip, SENASA, quarantine, rabies serology.",
  "lang": "en"
 },
 {
  "title": "Glossaire réglementaire d'exportation d'animaux",
  "url": "glosario/index-fr.html",
  "category": "Glosario",
  "keywords": "Définitions techniques et réglementaires des termes clés de l'exportation internationale d'animaux de compagnie depuis le Pérou : FAVN, micropuce ISO, SENASA, quarantaine, sérologie antirabique.",
  "lang": "fr"
 },
 {
  "title": "Glosario regulatorio de exportación de mascotas",
  "url": "glosario/index.html",
  "category": "Glosario",
  "keywords": "Definiciones técnicas y regulatorias de los términos clave en exportación internacional de mascotas desde Perú: FAVN, microchip ISO, SENASA, cuarentena, serología antirrábica.",
  "lang": "es"
 },
 {
  "title": "KSVDL: the Kansas State laboratory that runs the FAVN, and why it is still approved | Zoovet Travel Glossary",
  "url": "glosario/ksvdl-en.html",
  "category": "Glosario",
  "keywords": "What the KSVDL is, why your dog's blood has to travel all the way to Kansas, how long it takes, and what it means for a laboratory to stay — or stop being — on the CDC approved list. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "KSVDL : le laboratoire de Kansas State qui réalise le FAVN, et pourquoi il reste approuvé | Glossaire Zoovet T",
  "url": "glosario/ksvdl-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est le KSVDL, pourquoi le sang de votre chien doit voyager jusqu'au Kansas, combien de temps cela prend et ce que signifie qu'un laboratoire reste — ou cesse d'être — sur la liste approuvée du CDC. Vérifié le 11 ju",
  "lang": "fr"
 },
 {
  "title": "KSVDL: el laboratorio de Kansas State que hace la FAVN, y por qué sigue aprobado | Glosario Zoovet Travel",
  "url": "glosario/ksvdl.html",
  "category": "Glosario",
  "keywords": "Qué es el KSVDL, por qué la sangre de los perros peruanos viaja a Kansas, cuánto demora y qué significa que un laboratorio siga —o deje de estar— en la lista aprobada del CDC. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "EU-designated laboratory: why the one that works for the United States will not do | Zoovet Travel Glossary",
  "url": "glosario/laboratorio-designado-ue-en.html",
  "category": "Glosario",
  "keywords": "The European Union keeps its own list of laboratories approved for rabies antibody titration. It does not match the CDC's, and a result that is valid for one bloc may be worthless for the other. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Laboratoire désigné par l'UE : pourquoi celui des États-Unis ne convient pas | Glossaire Zoovet Travel",
  "url": "glosario/laboratorio-designado-ue-fr.html",
  "category": "Glosario",
  "keywords": "L'Union européenne tient sa propre liste de laboratoires autorisés pour le titrage antirabique. Elle ne coïncide pas avec celle du CDC, et un résultat valable pour un bloc peut ne rien valoir pour l'autre. Vérifié le 11 ",
  "lang": "fr"
 },
 {
  "title": "Laboratorio designado por la UE: por qué no vale el mismo que para Estados Unidos | Glosario Zoovet Travel",
  "url": "glosario/laboratorio-designado-ue.html",
  "category": "Glosario",
  "keywords": "La Unión Europea mantiene su propia lista de laboratorios autorizados para la titulación antirrábica. No coincide con la del CDC, y un resultado válido para un bloque puede no serlo para el otro. Verificado el 11 de juli",
  "lang": "es"
 },
 {
  "title": "Lapse in vaccination coverage: why a late booster voids your pet's rabies titration | Zoovet Travel Glossary",
  "url": "glosario/lapso-de-vacunacion-en.html",
  "category": "Glosario",
  "keywords": "If the rabies booster is given after the previous vaccine has expired, it stops being a booster: it is a new vaccine. And the titration test you already paid for stops counting. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Interruption de la couverture vaccinale : pourquoi un rappel tardif annule le titrage de votre animal | Glossa",
  "url": "glosario/lapso-de-vacunacion-fr.html",
  "category": "Glosario",
  "keywords": "Si le rappel antirabique est administré après l'expiration du vaccin précédent, ce n'est plus un rappel : c'est un nouveau vaccin. Et le titrage que vous avez déjà payé cesse d'être valable. Vérifié le 11 juillet 2026.",
  "lang": "fr"
 },
 {
  "title": "Lapso de vacunación: por qué un refuerzo tardío anula la titulación de tu mascota | Glosario Zoovet Travel",
  "url": "glosario/lapso-de-vacunacion.html",
  "category": "Glosario",
  "keywords": "Si el refuerzo antirrábico se aplica después de que caduque la vacuna anterior, deja de ser refuerzo: es una vacuna nueva. Y la titulación que ya pagaste deja de valer. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "MAPA Spain: FAVN, TRACES NT and requirements for pet export from Peru to Spain | Zoovet Travel Glossary",
  "url": "glosario/mapa-en.html",
  "category": "Glosario",
  "keywords": "What Spain's MAPA requires to import pets from Peru: FAVN, TRACES NT certificate, 3-month wait and BCP at Barajas.",
  "lang": "en"
 },
 {
  "title": "MAPA Espagne : FAVN, TRACES NT et exigences pour l'exportation d'animaux du Pérou vers l'Espagne | Glossaire Z",
  "url": "glosario/mapa-fr.html",
  "category": "Glosario",
  "keywords": "Ce que le MAPA espagnol exige pour importer des animaux depuis le Pérou : FAVN, certificat TRACES NT, attente de 3 mois et PCF à Barajas.",
  "lang": "fr"
 },
 {
  "title": "MAPA España: FAVN, TRACES NT y requisitos para exportar mascotas de Perú a España | Glosario Zoovet Travel",
  "url": "glosario/mapa.html",
  "category": "Glosario",
  "keywords": "Qué exige el MAPA de España para importar mascotas desde Perú: FAVN, certificado TRACES NT, 3 meses de espera y PCF en Barajas.",
  "lang": "es"
 },
 {
  "title": "MERCOSUR: requirements to travel with dogs and cats | Zoovet Travel Glossary",
  "url": "glosario/mercosur-en.html",
  "category": "Glosario",
  "keywords": "What MERCOSUR means for moving dogs and cats: harmonized animal-health requirements, the common International Veterinary Certificate (CVI) and its 60-day validity between Member States.",
  "lang": "en"
 },
 {
  "title": "MERCOSUR : exigences pour voyager avec chiens et chats | Glossaire Zoovet Travel",
  "url": "glosario/mercosur-fr.html",
  "category": "Glosario",
  "keywords": "Ce que le MERCOSUR signifie pour le déplacement des chiens et des chats : exigences zoosanitaires harmonisées, Certificat Vétérinaire International (CVI) commun et sa validité de 60 jours entre États Parties.",
  "lang": "fr"
 },
 {
  "title": "MERCOSUR: requisitos para viajar con perros y gatos | Glosario Zoovet Travel",
  "url": "glosario/mercosur.html",
  "category": "Glosario",
  "keywords": "Qué es el MERCOSUR para el movimiento de perros y gatos: requisitos zoosanitarios armonizados, el Certificado Veterinário Internacional (CVI) común y su validez de 60 días entre Estados Parte.",
  "lang": "es"
 },
 {
  "title": "ISO 11784/11785 microchip: mandatory identification for international pet export | Zoovet Travel Glossary",
  "url": "glosario/microchip-iso-en.html",
  "category": "Glosario",
  "keywords": "Regulatory definition of the ISO 11784/11785 microchip for pet export: FDX-B standard, EU Regulation 576/2013 and the rule of precedence over rabies vaccination. By Carlos Ravello Joo · Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "Puce ISO 11784/11785 : identification obligatoire pour l'exportation d'animaux | Glossaire Zoovet Travel",
  "url": "glosario/microchip-iso-fr.html",
  "category": "Glosario",
  "keywords": "Définition réglementaire de la puce ISO 11784/11785 pour l'exportation d'animaux : norme FDX-B, Règlement UE 576/2013 et règle de précédence sur le vaccin antirabique. Par Carlos Ravello Joo · Zoovet Travel.",
  "lang": "fr"
 },
 {
  "title": "Microchip ISO 11784/11785: identificación obligatoria para exportar mascotas | Glosario Zoovet Travel",
  "url": "glosario/microchip-iso.html",
  "category": "Glosario",
  "keywords": "Definición regulatoria del microchip ISO 11784/11785 para exportación de mascotas: estándar FDX-B, norma UE 576/2013 y regla de precedencia sobre la vacuna antirrábica. Por Carlos Ravello Joo · Zoovet Travel.",
  "lang": "es"
 },
 {
  "title": "Non-commercial movement: the 5-animal rule and what happens if there are more | Zoovet Travel Glossary",
  "url": "glosario/movimiento-no-comercial-en.html",
  "category": "Glosario",
  "keywords": "The European pet travel rules only apply to private journeys, with no sale and no change of ownership, and with a maximum of five animals. Cross that limit and the whole regime changes. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Mouvement non commercial : la règle des 5 animaux et ce qui se passe au-delà | Glossaire Zoovet Travel",
  "url": "glosario/movimiento-no-comercial-fr.html",
  "category": "Glosario",
  "keywords": "Les règles européennes de voyage avec animaux ne s'appliquent qu'aux déplacements privés, sans vente ni changement de propriétaire, et avec un maximum de cinq animaux. Au-delà, tout le régime change. Vérifié le 11 juille",
  "lang": "fr"
 },
 {
  "title": "Movimiento no comercial: la regla de los 5 animales y qué pasa si son más | Glosario Zoovet Travel",
  "url": "glosario/movimiento-no-comercial.html",
  "category": "Glosario",
  "keywords": "Las reglas europeas de viaje con mascotas solo se aplican a traslados privados, sin venta ni cambio de propiedad, y con un máximo de cinco animales. Superado ese límite, cambia el régimen entero. Verificado el 11 de juli",
  "lang": "es"
 },
 {
  "title": "MPI New Zealand: mandatory quarantine and FAVN for pet import | Zoovet Travel Glossary",
  "url": "glosario/mpi-en.html",
  "category": "Glosario",
  "keywords": "What New Zealand's MPI is, why it requires 10-day quarantine, and how to manage the FAVN process from Peru.",
  "lang": "en"
 },
 {
  "title": "MPI Nouvelle-Zélande : quarantaine obligatoire et FAVN pour importer des animaux | Glossaire Zoovet Travel",
  "url": "glosario/mpi-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est le MPI de Nouvelle-Zélande, pourquoi il exige une quarantaine de 10 jours et comment gérer le processus FAVN depuis le Pérou.",
  "lang": "fr"
 },
 {
  "title": "MPI Nueva Zelanda: cuarentena obligatoria y FAVN para importar mascotas | Glosario Zoovet Travel",
  "url": "glosario/mpi.html",
  "category": "Glosario",
  "keywords": "Qué es el MPI de Nueva Zelanda, por qué exige cuarentena de 10 días y cómo gestionar el proceso FAVN desde Perú.",
  "lang": "es"
 },
 {
  "title": "Advance notification to Japan: the 40 days that cancel trips over one form | Zoovet Travel Glossary",
  "url": "glosario/notificacion-previa-japon-en.html",
  "category": "Glosario",
  "keywords": "Japan's AQS requires notice of your pet's arrival at least 40 days beforehand. It is free and filed online — and filing it late is not accepted. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Notification préalable au Japon : les 40 jours qui annulent les voyages pour un formulaire | Glossaire Zoovet ",
  "url": "glosario/notificacion-previa-japon-fr.html",
  "category": "Glosario",
  "keywords": "L'AQS japonais exige d'être prévenu de l'arrivée de l'animal au moins 40 jours à l'avance. C'est gratuit et cela se fait en ligne — et une notification tardive n'est pas acceptée. Vérifié le 11 juillet 2026.",
  "lang": "fr"
 },
 {
  "title": "Notificación previa a Japón: los 40 días que cancelan viajes por un formulario | Glosario Zoovet Travel",
  "url": "glosario/notificacion-previa-japon.html",
  "category": "Glosario",
  "keywords": "El AQS japonés exige que se le notifique la llegada de la mascota al menos 40 días antes. Es gratis y se hace online — y presentarla tarde no se acepta. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "OIE/WOAH: the body that certifies FAVN and rabies laboratories | Zoovet Travel Glossary",
  "url": "glosario/oie-woah-en.html",
  "category": "Glosario",
  "keywords": "What OIE/WOAH is, why its laboratory certification is key for FAVN, and how it affects pet export from Peru.",
  "lang": "en"
 },
 {
  "title": "OIE/OMSA : l'organisme qui certifie le FAVN et les laboratoires antirabiques | Glossaire Zoovet Travel",
  "url": "glosario/oie-woah-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est l'OIE/OMSA, pourquoi sa certification de laboratoires est essentielle pour le FAVN, et comment elle affecte l'exportation d'animaux depuis le Pérou.",
  "lang": "fr"
 },
 {
  "title": "OIE/WOAH: el organismo que certifica el FAVN y los laboratorios de rabia | Glosario Zoovet Travel",
  "url": "glosario/oie-woah.html",
  "category": "Glosario",
  "keywords": "Qué es la OIE/WOAH, por qué su certificación de laboratorios es clave para el FAVN, y cómo afecta a la exportación de mascotas desde Perú.",
  "lang": "es"
 },
 {
  "title": "High-risk countries for dog rabies: the CDC list and what being on it means | Zoovet Travel Glossary",
  "url": "glosario/paises-alto-riesgo-rabia-canina-en.html",
  "category": "Glosario",
  "keywords": "The CDC's official list of high-risk countries for dog rabies: who is on it and what it forces on your dog — rabies serology titre, a booking at an approved arrival facility and up to 28 days of quarantine. Verified on 1",
  "lang": "en"
 },
 {
  "title": "Pays à haut risque de rage canine : la liste des CDC et ce qu'elle implique | Glossaire Zoovet Travel",
  "url": "glosario/paises-alto-riesgo-rabia-canina-fr.html",
  "category": "Glosario",
  "keywords": "La liste officielle des CDC des pays à haut risque de rage canine : qui y figure et ce que cela impose à votre chien — titrage antirabique, réservation dans un centre d'arrivée agréé et jusqu'à 28 jours de quarantaine. V",
  "lang": "fr"
 },
 {
  "title": "Países de alto riesgo de rabia canina: la lista del CDC y qué implica estar en ella | Glosario Zoovet Travel",
  "url": "glosario/paises-alto-riesgo-rabia-canina.html",
  "category": "Glosario",
  "keywords": "La lista oficial del CDC de países de alto riesgo de rabia canina —Perú incluido— y qué requisitos extra activa: titulación antirrábica, reserva en ACF y hasta 28 días de cuarentena. Verificada el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "European pet passport: who can hold one and what it will not do | Zoovet Travel Glossary",
  "url": "glosario/pasaporte-europeo-animales-compania-en.html",
  "category": "Glosario",
  "keywords": "The European pet passport is issued only to owners resident in the EU, and it works for moving around inside it. Anyone arriving from a third country needs a different document. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Passeport européen pour animaux de compagnie : qui peut l'avoir et à quoi il ne sert pas | Glossaire Zoovet Tr",
  "url": "glosario/pasaporte-europeo-animales-compania-fr.html",
  "category": "Glosario",
  "keywords": "Le passeport européen n'est délivré qu'aux propriétaires résidant dans l'UE et sert à circuler à l'intérieur de celle-ci. Qui arrive d'un pays tiers a besoin d'un autre document. Vérifié le 11 juillet 2026.",
  "lang": "fr"
 },
 {
  "title": "Pasaporte europeo para mascotas: quién puede tenerlo y para qué no sirve | Glosario Zoovet Travel",
  "url": "glosario/pasaporte-europeo-animales-compania.html",
  "category": "Glosario",
  "keywords": "El pasaporte europeo solo lo obtienen los residentes en la UE y sirve para moverse dentro de ella. Quien llega desde un tercer país necesita otro documento. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "The EU three-month waiting period: exactly when the clock starts | Zoovet Travel Glossary",
  "url": "glosario/periodo-espera-tres-meses-en.html",
  "category": "Glosario",
  "keywords": "The three months the European Union requires after the rabies antibody titration test are not counted from the result, but from the day the blood was drawn. The difference is weeks of travel. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Délai d'attente de trois mois de l'UE : à partir de quand se compte-t-il exactement | Glossaire Zoovet Travel",
  "url": "glosario/periodo-espera-tres-meses-fr.html",
  "category": "Glosario",
  "keywords": "Les trois mois exigés par l'Union européenne après le titrage des anticorps antirabiques ne se comptent pas à partir du résultat, mais du jour de la prise de sang. La différence se chiffre en semaines de voyage. Vérifié ",
  "lang": "fr"
 },
 {
  "title": "Periodo de espera de 3 meses de la UE: desde cuándo se cuenta exactamente | Glosario Zoovet Travel",
  "url": "glosario/periodo-espera-tres-meses.html",
  "category": "Glosario",
  "keywords": "Los 3 meses que la Unión Europea exige tras la titulación antirrábica no se cuentan desde el resultado, sino desde el día de la extracción de sangre. La diferencia son semanas de viaje. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "Foreign-vaccinated dog: what it means to the CDC and what it triggers | Zoovet Travel Glossary",
  "url": "glosario/perro-vacunado-en-el-extranjero-en.html",
  "category": "Glosario",
  "keywords": "A dog vaccinated outside the United States that has been in a high-risk country carries the heaviest file in the CDC system. What defines it and what it must produce, point by point. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Chien vacciné à l'étranger : ce que cela signifie pour le CDC et ce que cela déclenche | Glossaire Zoovet Trav",
  "url": "glosario/perro-vacunado-en-el-extranjero-fr.html",
  "category": "Glosario",
  "keywords": "Un chien vacciné hors des États-Unis ayant séjourné dans un pays à haut risque a le dossier le plus exigeant du système du CDC. Ce qui le définit et ce qu'on lui demande, point par point. Vérifié le 11 juillet 2026.",
  "lang": "fr"
 },
 {
  "title": "Perro vacunado en el extranjero: qué significa para el CDC y qué requisitos activa | Glosario Zoovet Travel",
  "url": "glosario/perro-vacunado-en-el-extranjero.html",
  "category": "Glosario",
  "keywords": "Un perro vacunado fuera de EE.UU. que estuvo en un país de alto riesgo tiene el expediente más exigente del sistema del CDC. Qué lo define y qué se le pide, punto por punto. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "Travellers' point of entry (TPE): where your pet must enter the EU | Zoovet Travel Glossary",
  "url": "glosario/punto-de-entrada-de-viajeros-en.html",
  "category": "Glosario",
  "keywords": "A pet arriving in the European Union from a third country may only enter through a designated point of entry, and there it must be presented to the competent authority. If the check fails, there are three outcomes. Verif",
  "lang": "en"
 },
 {
  "title": "Point d'entrée des voyageurs (TPE) : par où votre animal doit entrer dans l'UE | Glossaire Zoovet Travel",
  "url": "glosario/punto-de-entrada-de-viajeros-fr.html",
  "category": "Glosario",
  "keywords": "Un animal de compagnie qui arrive dans l'Union européenne depuis un pays tiers ne peut entrer que par un point d'entrée désigné, et il doit y être présenté à l'autorité compétente. Si le contrôle échoue, il existe trois ",
  "lang": "fr"
 },
 {
  "title": "Punto de entrada de viajeros (TPE): por dónde debe entrar tu mascota a la UE | Glosario Zoovet Travel",
  "url": "glosario/punto-de-entrada-de-viajeros.html",
  "category": "Glosario",
  "keywords": "Una mascota que llega a la Unión Europea desde un tercer país solo puede entrar por un punto de entrada designado, y allí debe presentarse ante la autoridad competente. Si falla el control, hay tres desenlaces. Verificad",
  "lang": "es"
 },
 {
  "title": "Rabies in pets: vaccination, SENASA protocol and export | Zoovet Travel Glossary",
  "url": "glosario/rabia-en.html",
  "category": "Glosario",
  "keywords": "What is rabies, how it affects pet export from Peru, valid vaccination protocol for SENASA, FAVN and high-standard destination countries.",
  "lang": "en"
 },
 {
  "title": "Rage chez les animaux : vaccination, protocole SENASA et exportation | Glossaire Zoovet Travel",
  "url": "glosario/rabia-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que la rage, comment elle affecte l'exportation d'animaux depuis le Pérou, protocole de vaccination valide pour SENASA, FAVN et pays à hautes normes.",
  "lang": "fr"
 },
 {
  "title": "Rabia en mascotas: vacunación, protocolo SENASA y exportación | Glosario Zoovet Travel",
  "url": "glosario/rabia.html",
  "category": "Glosario",
  "keywords": "Qué es la rabia, cómo afecta a la exportación de mascotas desde Perú, protocolo de vacunación válido para SENASA, FAVN y países destino de alto estándar.",
  "lang": "es"
 },
 {
  "title": "Japan's designated regions: the 6 territories with a fast track (and why yours probably isn't one) | Zoovet Tr",
  "url": "glosario/regiones-designadas-japon-en.html",
  "category": "Glosario",
  "keywords": "Japan recognises only six rabies-free regions. From those, entry is simple. From the rest of the world, the process takes a minimum of seven months. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Régions désignées du Japon : les 6 territoires en voie rapide (et pourquoi le vôtre n'en fait sans doute pas p",
  "url": "glosario/regiones-designadas-japon-fr.html",
  "category": "Glosario",
  "keywords": "Le Japon ne reconnaît que six régions indemnes de rage. Depuis celles-ci, l'entrée est simple. Depuis le reste du monde, la procédure dure au minimum sept mois. Vérifié le 11 juillet 2026.",
  "lang": "fr"
 },
 {
  "title": "Regiones designadas de Japón: los 6 territorios con vía rápida (y por qué el Perú no está) | Glosario Zoovet T",
  "url": "glosario/regiones-designadas-japon.html",
  "category": "Glosario",
  "keywords": "Japón solo reconoce seis regiones libres de rabia. Desde ellas, la entrada es simple. Desde el resto del mundo —incluido el Perú— el proceso mínimo es de siete meses. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "Regulation (EU) 2026/131: the new EU pet travel framework 2026 | Zoovet Travel Glossary",
  "url": "glosario/reglamento-ue-2026-131-en.html",
  "category": "Glosario",
  "keywords": "Commission Delegated Regulation (EU) 2026/131: the new EU pet entry framework since 22 Apr 2026, replacing 576/2013. Microchip, RNATT 0.5 IU/mL and the 3-month wait stay the same.",
  "lang": "en"
 },
 {
  "title": "Règlement (UE) 2026/131 : le nouveau cadre de voyage des animaux vers l'UE 2026 | Glossaire Zoovet Travel",
  "url": "glosario/reglamento-ue-2026-131-fr.html",
  "category": "Glosario",
  "keywords": "Règlement délégué (UE) 2026/131 : le nouveau cadre d'entrée des animaux dans l'UE depuis le 22 avr 2026, qui remplace le 576/2013. Micropuce, RNATT 0,5 UI/ml et délai de 3 mois inchangés.",
  "lang": "fr"
 },
 {
  "title": "Reglamento (UE) 2026/131: nuevo marco de viaje de mascotas a la UE 2026 | Glosario Zoovet Travel",
  "url": "glosario/reglamento-ue-2026-131.html",
  "category": "Glosario",
  "keywords": "Reglamento Delegado (UE) 2026/131: nuevo marco de entrada de mascotas a la UE desde el 22 abr 2026, sustituye al 576/2013. Microchip, RNATT 0,5 UI/mL y espera de 3 meses siguen igual.",
  "lang": "es"
 },
 {
  "title": "EU Regulation 576/2013: FAVN and microchip requirements for pet export to Europe | Zoovet Travel Glossary",
  "url": "glosario/reglamento-ue-576-2013-en.html",
  "category": "Glosario",
  "keywords": "Regulation (EU) 576/2013, superseded on 22 Apr 2026 by Regulation (EU) 2016/429 + Delegated 2026/131: FAVN, microchip and the 3-month wait from Peru.",
  "lang": "en"
 },
 {
  "title": "Règlement UE 576/2013 : exigences FAVN et micropuce pour l'exportation d'animaux vers l'Europe | Glossaire Zoo",
  "url": "glosario/reglamento-ue-576-2013-fr.html",
  "category": "Glosario",
  "keywords": "Le Règlement (UE) 576/2013, remplacé le 22 avr 2026 par le Règlement (UE) 2016/429 + délégué 2026/131 : FAVN, micropuce et attente de 3 mois depuis le Pérou.",
  "lang": "fr"
 },
 {
  "title": "Reglamento UE 576/2013: requisitos FAVN y microchip para exportar mascotas a Europa | Glosario Zoovet Travel",
  "url": "glosario/reglamento-ue-576-2013.html",
  "category": "Glosario",
  "keywords": "El Reglamento (UE) 576/2013, sustituido el 22 abr 2026 por el Reglamento (UE) 2016/429 + Delegado 2026/131: FAVN, microchip y espera de 3 meses desde Perú.",
  "lang": "es"
 },
 {
  "title": "RFFIT vs FAVN: differences for pet export | Zoovet Travel Glossary",
  "url": "glosario/rffit-en.html",
  "category": "Glosario",
  "keywords": "What RFFIT is, how it differs from FAVN/RNATT, and why using it instead of FAVN can completely invalidate the pet export process.",
  "lang": "en"
 },
 {
  "title": "RFFIT vs FAVN : différences pour l'exportation d'animaux | Glossaire Zoovet Travel",
  "url": "glosario/rffit-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que le RFFIT, en quoi il diffère du FAVN/RNATT et pourquoi l'utiliser à la place du FAVN peut invalider complètement le processus d'exportation d'animaux.",
  "lang": "fr"
 },
 {
  "title": "RFFIT vs FAVN: diferencias para exportación de mascotas | Glosario Zoovet Travel",
  "url": "glosario/rffit.html",
  "category": "Glosario",
  "keywords": "Qué es el RFFIT, en qué se diferencia del FAVN/RNATT y por qué usarlo en lugar del FAVN puede invalidar completamente el proceso de exportación de mascotas.",
  "lang": "es"
 },
 {
  "title": "SAG Chile: FAVN and health certificate requirements for pet export from Peru | Zoovet Travel Glossary",
  "url": "glosario/sag-en.html",
  "category": "Glosario",
  "keywords": "What Chile's SAG is, what documentation it requires for pets from Peru, and how to manage the Lima-Santiago route.",
  "lang": "en"
 },
 {
  "title": "SAG Chili : exigences FAVN et certificat sanitaire pour l'exportation d'animaux depuis le Pérou | Glossaire Zo",
  "url": "glosario/sag-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est le SAG du Chili, quels documents il exige pour les animaux depuis le Pérou et comment gérer la route Lima-Santiago.",
  "lang": "fr"
 },
 {
  "title": "SAG Chile: requisitos FAVN y certificado sanitario para exportar mascotas desde Perú | Glosario Zoovet Travel",
  "url": "glosario/sag.html",
  "category": "Glosario",
  "keywords": "Qué es el SAG de Chile, qué documentación exige para mascotas desde Perú y cómo gestionar la ruta Lima–Santiago.",
  "lang": "es"
 },
 {
  "title": "SENASA: zoosanitary certification for pet export from Peru | Zoovet Travel Glossary",
  "url": "glosario/senasa-en.html",
  "category": "Glosario",
  "keywords": "Operational definition of SENASA in pet export: what it certifies, timelines, TUPA CA07 and DS 051-2000-AG. By Carlos Ravello Joo · Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "SENASA : certification zoosanitaire pour l'exportation d'animaux de compagnie depuis le Pérou | Glossaire Zoov",
  "url": "glosario/senasa-fr.html",
  "category": "Glosario",
  "keywords": "Définition opérationnelle du SENASA dans l'exportation d'animaux : ce qu'il certifie, délais, TUPA CA07 et DS 051-2000-AG. Par Carlos Ravello Joo · Zoovet Travel.",
  "lang": "fr"
 },
 {
  "title": "SENASA: certificación zoosanitaria de exportación de mascotas desde Perú | Glosario Zoovet Travel",
  "url": "glosario/senasa.html",
  "category": "Glosario",
  "keywords": "Definición operativa de SENASA en exportación de mascotas: qué certifica, plazos, TUPA CA07 y DS 051-2000-AG. Por Carlos Ravello Joo · Zoovet Travel.",
  "lang": "es"
 },
 {
  "title": "SENASICA Mexico: no FAVN required for pet export from Peru | Zoovet Travel Glossary",
  "url": "glosario/senasica-en.html",
  "category": "Glosario",
  "keywords": "What Mexico's SENASICA is, why it does not require FAVN for pets from Peru, and what the real requirements are for the Lima-Mexico City route.",
  "lang": "en"
 },
 {
  "title": "SENASICA Mexique : pas de FAVN requis pour l'exportation d'animaux depuis le Pérou | Glossaire Zoovet Travel",
  "url": "glosario/senasica-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est le SENASICA du Mexique, pourquoi il n'exige pas de FAVN pour les animaux du Pérou et quelles sont les exigences réelles pour la route Lima-Mexico.",
  "lang": "fr"
 },
 {
  "title": "SENASICA México: requisitos sin FAVN para exportar mascotas desde Perú | Glosario Zoovet Travel",
  "url": "glosario/senasica.html",
  "category": "Glosario",
  "keywords": "Qué es el SENASICA de México, por qué no exige FAVN para mascotas de Perú y cuáles son los requisitos reales para la ruta Lima–Ciudad de México.",
  "lang": "es"
 },
 {
  "title": "Rabies serology: what it is, when it is done and which countries require it for pets | Zoovet Travel Glossary",
  "url": "glosario/serologia-antirrabica-en.html",
  "category": "Glosario",
  "keywords": "Operational definition of rabies serology for pet export: 0.5 IU/mL threshold, FAVN vs RFFIT, timelines and countries requiring it. By Carlos Ravello Joo · Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "Sérologie antirabique : définition, délais et pays l'exigeant pour les animaux de compagnie | Glossaire Zoovet",
  "url": "glosario/serologia-antirrabica-fr.html",
  "category": "Glosario",
  "keywords": "Définition opérationnelle de la sérologie antirabique pour l'exportation d'animaux : seuil 0,5 UI/mL, FAVN vs RFFIT, délais et pays exigeants. Par Carlos Ravello Joo · Zoovet Travel.",
  "lang": "fr"
 },
 {
  "title": "Serología antirrábica: qué es, cuándo se hace y qué países la exigen para mascotas | Glosario Zoovet Travel",
  "url": "glosario/serologia-antirrabica.html",
  "category": "Glosario",
  "keywords": "Definición operativa de serología antirrábica para exportación de mascotas: umbral 0.5 IU/mL, FAVN vs RFFIT, plazos y países que la exigen. Por Carlos Ravello Joo · Zoovet Travel.",
  "lang": "es"
 },
 {
  "title": "Tapeworm treatment: the 5 countries that require it and the 24-120 hour window | Zoovet Travel Glossary",
  "url": "glosario/tratamiento-antiequinococico-en.html",
  "category": "Glosario",
  "keywords": "Finland, Ireland, Malta, Norway and Northern Ireland require dogs to be treated against Echinococcus multilocularis between 24 and 120 hours before arrival. Not sooner, not later. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Traitement contre l'échinocoque : les 5 pays qui l'exigent et la fenêtre de 24-120 heures | Glossaire Zoovet T",
  "url": "glosario/tratamiento-antiequinococico-fr.html",
  "category": "Glosario",
  "keywords": "La Finlande, l'Irlande, Malte, la Norvège et l'Irlande du Nord exigent que le chien soit traité contre Echinococcus multilocularis entre 24 et 120 heures avant l'arrivée. Ni avant, ni après. Vérifié le 11 juillet 2026.",
  "lang": "fr"
 },
 {
  "title": "Tratamiento antiequinocócico: los 5 países que lo exigen y la ventana de 24-120 horas | Glosario Zoovet Travel",
  "url": "glosario/tratamiento-antiequinococico.html",
  "category": "Glosario",
  "keywords": "Finlandia, Irlanda, Malta, Noruega e Irlanda del Norte exigen desparasitar al perro contra Echinococcus multilocularis entre 24 y 120 horas antes de llegar. Ni antes ni después. Verificado el 11 de julio de 2026.",
  "lang": "es"
 },
 {
  "title": "USDA-APHIS: pet import to the USA from Peru | Zoovet Travel Glossary",
  "url": "glosario/usda-aphis-en.html",
  "category": "Glosario",
  "keywords": "What USDA-APHIS is, how it regulates dog imports from Peru (DMRVV country) and what documents it requires for US entry since August 2024.",
  "lang": "en"
 },
 {
  "title": "USDA-APHIS : importation d'animaux aux États-Unis depuis le Pérou | Glossaire Zoovet Travel",
  "url": "glosario/usda-aphis-fr.html",
  "category": "Glosario",
  "keywords": "Ce qu'est l'USDA-APHIS, comment il réglemente l'importation de chiens depuis le Pérou (pays DMRVV) et quels documents il exige pour l'entrée aux États-Unis depuis août 2024.",
  "lang": "fr"
 },
 {
  "title": "USDA-APHIS: importación de mascotas a EE. UU. desde Perú | Glosario Zoovet Travel",
  "url": "glosario/usda-aphis.html",
  "category": "Glosario",
  "keywords": "Qué es USDA-APHIS, cómo regula la importación de perros desde Perú (país DMRVV) y qué documentos exige para la entrada a EE. UU. desde agosto 2024.",
  "lang": "es"
 },
 {
  "title": "Obama flies cargo to the United States (and that's why he's now called Antonio)",
  "url": "historias/antonio-de-tumbes-a-estados-unidos-en.html",
  "category": "Historias",
  "keywords": "A dog named Obama, a cargo flight in the middle of the 2023 CDC storm, and a Christmas in the United States. A real pet-export case, told calmly by Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "Obama part en fret vers les États-Unis (et voilà pourquoi il s'appelle Antonio aujourd'hui)",
  "url": "historias/antonio-de-tumbes-a-estados-unidos-fr.html",
  "category": "Historias",
  "keywords": "Un chien nommé Obama, un vol de fret en pleine tempête de la CDC de 2023 et un Noël aux États-Unis. Un cas réel d'exportation d'animaux, raconté avec calme par Zoovet Travel.",
  "lang": "fr"
 },
 {
  "title": "Obama viaja por cargo a Estados Unidos (y por eso hoy se llama Antonio)",
  "url": "historias/antonio-de-tumbes-a-estados-unidos.html",
  "category": "Historias",
  "keywords": "Un perro llamado Obama, un vuelo de carga en plena tormenta CDC de 2023 y una Navidad en Estados Unidos. Un caso real de exportación de mascotas, contado en calma por Zoovet Travel.",
  "lang": "es"
 },
 {
  "title": "Travelling with my pet — real export stories",
  "url": "historias/index-en.html",
  "category": "Historias",
  "keywords": "True stories of families who travelled abroad with their pet, told calmly and with their owners' authorization. Real pet-export experiences from Peru with Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "Voyager avec mon animal — histoires réelles d'exportation",
  "url": "historias/index-fr.html",
  "category": "Historias",
  "keywords": "Des histoires véridiques de familles qui ont voyagé à l'étranger avec leur animal, racontées avec calme et avec l'autorisation de leurs maîtres. Expériences réelles d'exportation d'animaux depuis le Pérou avec Zoovet Tra",
  "lang": "fr"
 },
 {
  "title": "Viajes con mi mascota — historias reales de exportación",
  "url": "historias/index.html",
  "category": "Historias",
  "keywords": "Casos verdaderos de familias que viajaron con su mascota al extranjero, contados en calma y con la autorización de sus dueños. Experiencias reales de exportación de mascotas desde Perú con Zoovet Travel.",
  "lang": "es"
 },
 {
  "title": "Jacko flies cargo to Spain (and the European rules had just changed)",
  "url": "historias/jacko-de-trujillo-a-espana-en.html",
  "category": "Historias",
  "keywords": "A Labrador from Trujillo, his owner waiting in Spain and a European regulation that had just come into force. A real pet-export case by cargo to Madrid, told calmly by Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "Jacko part en fret vers l'Espagne (et la règle européenne venait de changer)",
  "url": "historias/jacko-de-trujillo-a-espana-fr.html",
  "category": "Historias",
  "keywords": "Un labrador de Trujillo, sa maîtresse qui l'attendait en Espagne et une réglementation européenne tout juste entrée en vigueur. Un cas réel d'exportation d'animal par fret vers Madrid, raconté avec calme par Zoovet Trave",
  "lang": "fr"
 },
 {
  "title": "Jacko viaja por cargo a España (y la norma europea acababa de cambiar)",
  "url": "historias/jacko-de-trujillo-a-espana.html",
  "category": "Historias",
  "keywords": "Un labrador de Trujillo, su dueña esperándolo en España y una normativa europea recién estrenada. Un caso real de exportación de mascotas por cargo a Madrid, contado en calma por Zoovet Travel.",
  "lang": "es"
 },
 {
  "title": "Julian Burns' four dogs: from Peru to a house in Boston",
  "url": "historias/julian-burns-cuatro-perros-de-peru-a-boston-en.html",
  "category": "Historias",
  "keywords": "The true story of Julian Burns, who rescued four street dogs and wouldn't leave any of them behind: how Osita, Travi, Sharkie and Darrow made it from the street to a house in Boston.",
  "lang": "en"
 },
 {
  "title": "Les quatre chiens de Julian Burns : du Pérou à une maison de Boston",
  "url": "historias/julian-burns-cuatro-perros-de-peru-a-boston-fr.html",
  "category": "Historias",
  "keywords": "L'histoire vraie de Julian Burns, qui a sauvé quatre chiens des rues sans en laisser aucun derrière lui : comment Osita, Travi, Sharkie et Darrow sont arrivés de la rue jusqu'à une maison de Boston.",
  "lang": "fr"
 },
 {
  "title": "Los cuatro perros de Julian Burns: del Perú a una casa en Boston",
  "url": "historias/julian-burns-cuatro-perros-de-peru-a-boston.html",
  "category": "Historias",
  "keywords": "La historia real de Julian Burns, que rescató a cuatro perros callejeros y no dejó a ninguno atrás: cómo Osita, Travi, Sharkie y Darrow llegaron desde la calle hasta una casa en Boston.",
  "lang": "es"
 },
 {
  "title": "Lola, from Lima to Madrid: the story of a mixed-breed dog that did travel",
  "url": "historias/lola-de-lima-a-madrid-en.html",
  "category": "Historias",
  "keywords": "Jorge came to Zoovet a month and a half past the deadline. Four months later, Lola —his mixed-breed dog— flew with him from Lima (Jorge Chávez) to Madrid-Barajas. A real pet-export case to Spain, told calmly.",
  "lang": "en"
 },
 {
  "title": "Lola, de Lima à Madrid : l'histoire d'un chien croisé qui a bel et bien voyagé",
  "url": "historias/lola-de-lima-a-madrid-fr.html",
  "category": "Historias",
  "keywords": "Jorge est arrivé chez Zoovet avec un mois et demi de retard sur le délai. Quatre mois plus tard, Lola —sa chienne croisée— a volé avec lui de Lima (Jorge Chávez) à Madrid-Barajas. Un cas réel d'exportation d'animaux vers",
  "lang": "fr"
 },
 {
  "title": "Lola, de Lima a Madrid: la historia de un perro mestizo que sí viajó",
  "url": "historias/lola-de-lima-a-madrid.html",
  "category": "Historias",
  "keywords": "Jorge llegó a Zoovet con el plazo vencido hacía mes y medio. Cuatro meses después, Lola —su perra mestiza— voló con él de Lima (Jorge Chávez) a Madrid-Barajas. Un caso real de exportación de mascotas a España, contado en",
  "lang": "es"
 },
 {
  "title": "Scarlett, Nala and Campanita: three cats from Colombia to the United States (via Peru)",
  "url": "historias/scarlett-nala-campanita-colombia-estados-unidos-en.html",
  "category": "Historias",
  "keywords": "Three cats their owner sent from Colombia to Peru just to fly with us to the United States. A real cat-export case, told calmly by Zoovet Travel — and why cats enter the US easily.",
  "lang": "en"
 },
 {
  "title": "Scarlett, Nala et Campanita : trois chattes de Colombie aux États-Unis (via le Pérou)",
  "url": "historias/scarlett-nala-campanita-colombia-estados-unidos-fr.html",
  "category": "Historias",
  "keywords": "Trois chattes que leur maîtresse a envoyées de Colombie au Pérou juste pour qu'elles voyagent avec nous aux États-Unis. Un cas réel d'exportation de chats, raconté avec calme par Zoovet Travel — et pourquoi les chats ent",
  "lang": "fr"
 },
 {
  "title": "Scarlett, Nala y Campanita: tres gatas de Colombia a Estados Unidos (vía Perú)",
  "url": "historias/scarlett-nala-campanita-colombia-estados-unidos.html",
  "category": "Historias",
  "keywords": "Tres gatas que viajaron de Colombia a Perú solo para volar con nosotros a Estados Unidos. Un caso real de exportación de gatos, contado en calma por Zoovet Travel — y por qué a EE.UU. los gatos entran fácil.",
  "lang": "es"
 },
 {
  "title": "Zoovet Travel: Pet Export, Rabies Serology and SENASA",
  "url": "index-en.html",
  "category": "Home",
  "keywords": "Zoovet Travel: Pet Export, Rabies Serology and SENASA",
  "lang": "en"
 },
 {
  "title": "Zoovet Travel : Exportation d'animaux, sérologie et SENASA",
  "url": "index-fr.html",
  "category": "Home",
  "keywords": "Centre médical vétérinaire avec 12 ans d'expérience en exportation internationale d'animaux. Sérologie antirabique, SENASA et gestion documentaire.",
  "lang": "fr"
 },
 {
  "title": "Zoovet Travel: Exportación de Mascotas, Serología y SENASA",
  "url": "index.html",
  "category": "Home",
  "keywords": "Zoovet Travel: Exportación de Mascotas, Serología y SENASA",
  "lang": "es"
 },
 {
  "title": "Your dog's rabies titre may stop counting: CDC removed laboratories and the deadline is 12 July | Zoovet Journ",
  "url": "journal/cdc-retira-laboratorios-favn-2026-en.html",
  "category": "Journal",
  "keywords": "The CDC removed several laboratories from its approved list in January 2026. If your dog's rabies blood test was done at one of them, the deadline to enter the United States is 12 July. And there is a rule almost nobody ",
  "lang": "en"
 },
 {
  "title": "Le titrage antirabique de votre chien peut cesser d'être valable : le CDC a retiré des laboratoires et le déla",
  "url": "journal/cdc-retira-laboratorios-favn-2026-fr.html",
  "category": "Journal",
  "keywords": "Le CDC a retiré plusieurs laboratoires de sa liste approuvée en janvier 2026. Si la prise de sang antirabique de votre chien y a été faite, le délai pour entrer aux États-Unis expire le 12 juillet. Et il existe une règle",
  "lang": "fr"
 },
 {
  "title": "Tu prueba de sangre antirrábica puede dejar de valer: el CDC retiró laboratorios y el plazo vence el 12 de jul",
  "url": "journal/cdc-retira-laboratorios-favn-2026.html",
  "category": "Journal",
  "keywords": "El CDC retiró varios laboratorios de su lista aprobada en enero de 2026. Si tu perro tiene la prueba de sangre hecha en uno de ellos, el plazo para entrar a Estados Unidos vence el 12 de julio. Y hay una regla que casi n",
  "lang": "es"
 },
 {
  "title": "Zoovet Journal — regulatory alerts and analysis on international pet travel",
  "url": "journal/index-en.html",
  "category": "Journal",
  "keywords": "When a rule changes, your trip changes. Regulatory alerts verified against the official source, and signed analysis on the international export of dogs and cats.",
  "lang": "en"
 },
 {
  "title": "Zoovet Journal — alertes réglementaires et analyses sur le voyage international des animaux",
  "url": "journal/index-fr.html",
  "category": "Journal",
  "keywords": "Quand une règle change, votre voyage change. Alertes réglementaires vérifiées auprès de la source officielle et analyses signées sur l'exportation internationale de chiens et de chats.",
  "lang": "fr"
 },
 {
  "title": "Zoovet Journal — alertas regulatorias y análisis sobre el viaje internacional de mascotas",
  "url": "journal/index.html",
  "category": "Journal",
  "keywords": "Cuando una norma cambia, tu viaje cambia. Alertas regulatorias verificadas contra la fuente oficial y análisis firmado sobre la exportación internacional de perros y gatos.",
  "lang": "es"
 },
 {
  "title": "\"900 202\" microchips and RNA vaccines: what Japan does not accept, and almost nobody explains | Zoovet Journal",
  "url": "journal/japon-microchips-900-vacunas-arn-2026-en.html",
  "category": "Journal",
  "keywords": "Japan does not accept microchips beginning with \"900 202\", warns of duplicate chips in seven other series, rejects RNA rabies vaccines and requires the first shot at 91 days — not at 84. Verified on 11 July 2026.",
  "lang": "en"
 },
 {
  "title": "Puces « 900 202 » et vaccins à ARN : ce que le Japon n'accepte pas et que presque personne n'explique | Zoovet",
  "url": "journal/japon-microchips-900-vacunas-arn-2026-fr.html",
  "category": "Journal",
  "keywords": "Le Japon n'accepte pas les puces électroniques commençant par « 900 202 », signale des puces dupliquées dans sept autres séries, refuse les vaccins antirabiques à ARN et exige le premier vaccin à 91 jours — et non à 84. ",
  "lang": "fr"
 },
 {
  "title": "Microchips «900 202» y vacunas de ARN: lo que Japón no acepta y casi nadie explica | Zoovet Journal",
  "url": "journal/japon-microchips-900-vacunas-arn-2026.html",
  "category": "Journal",
  "keywords": "Japón no acepta los microchips que empiezan por «900 202», advierte de chips duplicados en otras siete series, rechaza las vacunas antirrábicas de ARN y exige la primera vacuna a los 91 días — no a los 84. Verificado el ",
  "lang": "es"
 },
 {
  "title": "Japan revoked a laboratory for breaching its standards. The CDC still accepts it | Zoovet Journal",
  "url": "journal/japon-revoca-biobest-cdc-lo-mantiene-2026-en.html",
  "category": "Journal",
  "keywords": "Japan's Animal Quarantine Service removed Biobest Laboratories from its list of designated laboratories for violating the standards. The same laboratory is still on the CDC's approved list today. Two authorities, one lab",
  "lang": "en"
 },
 {
  "title": "Le Japon a révoqué un laboratoire pour non-respect de ses normes. Le CDC continue de l'accepter | Zoovet Journ",
  "url": "journal/japon-revoca-biobest-cdc-lo-mantiene-2026-fr.html",
  "category": "Journal",
  "keywords": "L'Animal Quarantine Service du Japon a retiré Biobest Laboratories de sa liste de laboratoires désignés pour violation des normes. Le même laboratoire figure aujourd'hui sur la liste approuvée du CDC. Deux autorités, un ",
  "lang": "fr"
 },
 {
  "title": "Japón revocó a un laboratorio por incumplir sus estándares. El CDC lo sigue aceptando | Zoovet Journal",
  "url": "journal/japon-revoca-biobest-cdc-lo-mantiene-2026.html",
  "category": "Journal",
  "keywords": "El Animal Quarantine Service de Japón retiró a Biobest Laboratories de su lista de laboratorios designados por violar los estándares. El mismo laboratorio sigue hoy en la lista aprobada del CDC. Dos autoridades, un labor",
  "lang": "es"
 },
 {
  "title": "New Zealand's new standard: if you travel after April 2027, your countdown starts on 1 October | Zoovet Journa",
  "url": "journal/nueva-zelanda-nuevo-estandar-2026-en.html",
  "category": "Journal",
  "keywords": "New Zealand's new Import Health Standard came into force on 1 July 2026 and introduces an official identity check that must be done six months before export. Anyone travelling from April 2027 has to start this October.",
  "lang": "en"
 },
 {
  "title": "Nouvelle-Zélande : nouveau standard — si vous voyagez après avril 2027, votre compte à rebours commence le 1er",
  "url": "journal/nueva-zelanda-nuevo-estandar-2026-fr.html",
  "category": "Journal",
  "keywords": "Le nouvel Import Health Standard néo-zélandais est entré en vigueur le 1er juillet 2026. Il introduit un contrôle d'identité officiel à réaliser six mois avant l'exportation. Qui voyage à partir d'avril 2027 doit commenc",
  "lang": "fr"
 },
 {
  "title": "Nueva Zelanda estrena estándar: si viajas después de abril de 2027, tu cuenta regresiva empieza el 1 de octubr",
  "url": "journal/nueva-zelanda-nuevo-estandar-2026.html",
  "category": "Journal",
  "keywords": "El nuevo Import Health Standard de Nueva Zelanda entró en vigor el 1 de julio de 2026 e introduce un control oficial de identidad que debe hacerse seis meses antes de la exportación. Quien viaje desde abril de 2027 tiene",
  "lang": "es"
 },
 {
  "title": "IATA Kennels for International Travel",
  "url": "kennels-en.html",
  "category": "Herramientas",
  "keywords": "Avoid your kennel being rejected at the airport: IATA LAR 2026 certified. Prices S/159.90 to S/1,299.90, shipping across Peru and free size calculator.",
  "lang": "en"
 },
 {
  "title": "Caisses de transport IATA pour vols internationaux",
  "url": "kennels-fr.html",
  "category": "Herramientas",
  "keywords": "Kennels certifiés IATA LAR 2026 pour voyager avec votre animal. L50 (S/159,90) à L120 (S/1 299,90). Prix 2026 actualisés. Conformes aux compagnies aériennes. Livraison dans tout le Pérou.",
  "lang": "fr"
 },
 {
  "title": "Kennels IATA para Viaje Internacional",
  "url": "kennels.html",
  "category": "Herramientas",
  "keywords": "Evita el rechazo del kennel en el aeropuerto: IATA certificado LAR 2026. Precios S/159.90 a S/1,299.90, envío a todo el Perú y calculadora gratis.",
  "lang": "es"
 },
 {
  "title": "Content licence and reuse",
  "url": "licencia-en.html",
  "category": "Sobre nosotros",
  "keywords": "Everything Zoovet Travel publishes — the glossary, the Atlas, the Zoopedia, the Journal and the articles — is released under Creative Commons CC BY 4.0. Copy it, translate it, adapt it, even commercially. Just credit us ",
  "lang": "en"
 },
 {
  "title": "Licence et réutilisation du contenu",
  "url": "licencia-fr.html",
  "category": "Sobre nosotros",
  "keywords": "Tout ce que publie Zoovet Travel — le glossaire, l'Atlas, la Zoopedia, le Journal et les articles — est diffusé sous licence Creative Commons CC BY 4.0. Copiez, traduisez, adaptez, même à des fins commerciales. Il suffit",
  "lang": "fr"
 },
 {
  "title": "Licencia y uso del contenido",
  "url": "licencia.html",
  "category": "Sobre nosotros",
  "keywords": "Todo el contenido de Zoovet Travel —glosario, Atlas, Zoopedia, Journal y artículos— se publica bajo Creative Commons CC BY 4.0. Puedes copiarlo, traducirlo y adaptarlo, incluso con fines comerciales. Solo tienes que cita",
  "lang": "es"
 },
 {
  "title": "Travel with your pet from Peru: will you make it?",
  "url": "pet-travel-planner/index.html",
  "category": "Herramientas",
  "keywords": "Find out free, in 2 minutes, how much time you need to travel with your dog or cat and whether you're still on time for your flight date.",
  "lang": "en"
 },
 {
  "title": "Pet Travel Requirements by Country from Peru 2026 · Zoovet Travel",
  "url": "pet-travel-planner/requirements-by-country/index.html",
  "category": "Herramientas",
  "keywords": "Official zoosanitary requirements to export pets from Peru to 20 destination countries. FAVN titer test, rabies vaccine, quarantine, minimum age and official sources. Verified data May 2026.",
  "lang": "en"
 },
 {
  "title": "Viajar con tu mascota desde Perú: ¿llegas a tiempo?",
  "url": "planificador-viaje-mascota/index.html",
  "category": "Herramientas",
  "keywords": "Descubre gratis, en 2 minutos, cuánto tiempo necesitas para viajar con tu perro o gato y si aún llegas a tiempo para tu fecha de vuelo.",
  "lang": "es"
 },
 {
  "title": "Requisitos por país para viajar con mascota desde Perú 2026 · Zoovet Travel",
  "url": "planificador-viaje-mascota/requisitos-por-pais/index.html",
  "category": "Herramientas",
  "keywords": "Tabla oficial de requisitos zoosanitarios para exportar mascotas desde Perú a 20 países destino. FAVN, vacuna antirrábica, cuarentena, edad mínima y fuentes oficiales. Datos verificados mayo 2026.",
  "lang": "es"
 },
 {
  "title": "Exigences par pays pour voyager avec un animal depuis le Pérou 2026 · Zoovet Travel",
  "url": "planificateur-voyage-animal/exigences-par-pays/index.html",
  "category": "Herramientas",
  "keywords": "Tableau officiel des exigences zoosanitaires pour exporter des animaux depuis le Pérou vers 20 pays de destination. Test FAVN, vaccin antirabique, quarantaine, âge minimum et sources officielles. Données vérifiées mai 20",
  "lang": "fr"
 },
 {
  "title": "Voyager avec votre animal depuis le Pérou : à temps ?",
  "url": "planificateur-voyage-animal/index.html",
  "category": "Herramientas",
  "keywords": "Découvrez gratuitement combien de temps il vous faut pour voyager avec votre chien ou chat et si vous êtes encore à temps pour votre vol.",
  "lang": "fr"
 },
 {
  "title": "Legal Responsibility of the Certifying Veterinarian in Pet Export — Zoovet Travel",
  "url": "responsabilidad-veterinario-en.html",
  "category": "Servicios",
  "keywords": "Complete analysis of the legal and professional liability of the accredited veterinarian who signs health certificates, FAVN reports and official documentation for exporting dogs and cats to the US, EU, UK and Japan. Reg",
  "lang": "en"
 },
 {
  "title": "Responsabilité Légale du Vétérinaire Certificateur dans l'Exportation d'Animaux — Zoovet Travel",
  "url": "responsabilidad-veterinario-fr.html",
  "category": "Servicios",
  "keywords": "Analyse complète de la responsabilité légale et professionnelle du vétérinaire accrédité qui signe les certificats de santé, les rapports FAVN et la documentation officielle pour l'exportation de chiens et chats vers les",
  "lang": "fr"
 },
 {
  "title": "Responsabilidad Legal del Veterinario en Exportación de Mascotas — Zoovet Travel",
  "url": "responsabilidad-veterinario.html",
  "category": "Servicios",
  "keywords": "Análisis de la responsabilidad legal del veterinario certificante en la exportación de perros y gatos: 42 CFR § 71.51, Regla Final 89 FR 38450, protocolo SENASA-VUCE-CZE en Perú, consecuencias profesionales y cadena docu",
  "lang": "es"
 },
 {
  "title": "Rabies Serology for Pets in Peru | Zoovet Travel Trujillo",
  "url": "serologia-rabia-mascotas-peru-en.html",
  "category": "Servicios",
  "keywords": "Rabies serology test in Peru: FAVN ≥0.5 IU/mL, KSVDL lab accredited OIE/WOAH. 3-month wait required. Zoovet Travel manages the full protocol from Peru.",
  "lang": "en"
 },
 {
  "title": "Sérologie Antirabique pour Animaux de Compagnie au Pérou | Zoovet Travel Trujillo",
  "url": "serologia-rabia-mascotas-peru-fr.html",
  "category": "Servicios",
  "keywords": "Sérologie antirabique au Pérou : FAVN ≥0,5 UI/ml, lab KSVDL accrédité OIE/WOAH. 3 mois d'attente requis. Zoovet Travel gère le protocole complet.",
  "lang": "fr"
 },
 {
  "title": "Serología Antirrábica para Mascotas en Perú | Zoovet Travel Trujillo",
  "url": "serologia-rabia-mascotas-peru.html",
  "category": "Servicios",
  "keywords": "Serología de rabia en Perú: 30 días post-vacuna, sin lab local. Un resultado bajo reinicia el protocolo completo. Zoovet Travel con KSVDL desde 2013.",
  "lang": "es"
 },
 {
  "title": "Traveling with my Pet from Peru | Complete SENASA Management",
  "url": "traveling-with-my-pet.html",
  "category": "Servicios",
  "keywords": "✈️ Traveling with your pet from Peru? We handle everything: ISO microchip, vaccines, FAVN serology, SENASA certificate, IATA kennel. Real cases. 12 years of experience. We coordinate throughout Peru.",
  "lang": "en"
 },
 {
  "title": "Image use and licensing",
  "url": "uso-de-imagenes-en.html",
  "category": "Sobre nosotros",
  "keywords": "Image use and licensing at Zoovet Travel: scientific figures and the real-story photographs, all under Creative Commons CC BY 4.0. How to attribute them and how to cite them academically.",
  "lang": "en"
 },
 {
  "title": "Utilisation et licence des images",
  "url": "uso-de-imagenes-fr.html",
  "category": "Sobre nosotros",
  "keywords": "Utilisation et licence des images chez Zoovet Travel : figures scientifiques et photographies des histoires réelles, sous licence Creative Commons CC BY 4.0. Comment les attribuer et les citer.",
  "lang": "fr"
 },
 {
  "title": "Uso y licencia de imágenes y figuras",
  "url": "uso-de-imagenes.html",
  "category": "Sobre nosotros",
  "keywords": "Uso y licencia de imágenes en Zoovet Travel: figuras científicas y fotografías de las historias reales bajo Creative Commons CC BY 4.0. Cómo atribuirlas y cómo citarlas académicamente.",
  "lang": "es"
 },
 {
  "title": "Viajar con mi Mascota desde Perú | Gestión Completa SENASA",
  "url": "viajar-con-mi-mascota.html",
  "category": "Servicios",
  "keywords": "✈️ ¿Viajas con tu mascota desde Perú? Gestionamos todo: microchip ISO, vacunas, serología FAVN, certificado SENASA, kennel IATA. Casos reales. 12 años de experiencia. Coordinamos en todo el Perú.",
  "lang": "es"
 },
 {
  "title": "Traveling to the US Without FAVN: Real Consequences, Costs and the 3 Blocking Points",
  "url": "viajar-sin-favn-eeuu-en.html",
  "category": "Servicios",
  "keywords": "What happens if your dog arrives in the US from a high-risk country without a valid rabies titer: mandatory ACF quarantine, real costs (USD 1,400–5,000+), 3 blocking checkpoints and how to avoid them. Zoovet Travel, Peru",
  "lang": "en"
 },
 {
  "title": "Voyager aux États-Unis sans FAVN : conséquences réelles, coûts et les 3 points de blocage",
  "url": "viajar-sin-favn-eeuu-fr.html",
  "category": "Servicios",
  "keywords": "Ce qui se passe si votre chien arrive aux États-Unis depuis un pays à haut risque sans titre d'anticorps valide : quarantaine obligatoire en ACF, coûts réels (1 400–5 000 USD+), 3 points de blocage. Zoovet Travel, Pérou.",
  "lang": "fr"
 },
 {
  "title": "Viajar a EE.UU. sin FAVN: consecuencias reales, costos y los 3 puntos de bloqueo",
  "url": "viajar-sin-favn-eeuu.html",
  "category": "Servicios",
  "keywords": "Qué ocurre si llegas a EE.UU. con tu perro sin FAVN válido: cuarentena obligatoria en ACF, costos reales (USD 1.400–5.000+), 3 checkpoints donde te pueden detener y cómo evitarlo. Zoovet Travel, Perú.",
  "lang": "es"
 },
 {
  "title": "Voyager avec mon Animal depuis le Pérou | Gestion Complète SENASA",
  "url": "voyager-avec-mon-animal.html",
  "category": "Servicios",
  "keywords": "✈️ Voyager avec votre animal depuis le Pérou ? Nous gérons tout : micropuce ISO, vaccins, sérologie FAVN, certificat SENASA, cage IATA. Cas réels. 12 ans d'expérience. Coordination dans tout le Pérou.",
  "lang": "fr"
 },
 {
  "title": "2026 Guide: Requirements for Travelling with Pets to Andorra",
  "url": "zoopedia/andorra-en.html",
  "category": "Zoopedia",
  "keywords": "Taking your dog or cat to Andorra? It has no airport — you enter via Spain or France. Avoid rejection at the border: the steps, timelines and breeds with special rules. 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Exigences pour voyager avec un animal en Andorre",
  "url": "zoopedia/andorra-fr.html",
  "category": "Zoopedia",
  "keywords": "Vous emmenez votre chien ou chat en Andorre ? Pas d'aéroport : on entre par l'Espagne ou la France. Évitez le refus à la frontière : étapes, délais et races à règles spéciales. Guide 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Andorra",
  "url": "zoopedia/andorra.html",
  "category": "Zoopedia",
  "keywords": "¿Llevas tu perro o gato a Andorra? No tiene aeropuerto: se entra por España o Francia. Evita el rechazo en frontera — los pasos, los plazos y las razas con reglas especiales. Guía 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: Requirements for Travelling with Pets to Turkey",
  "url": "zoopedia/turquia-en.html",
  "category": "Zoopedia",
  "keywords": "Taking your dog or cat to Turkey? The only European country with dog rabies: EU-approved-lab blood test, a 3-month wait and 6 banned breeds. Avoid rejection at the border. 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Exigences pour voyager avec un animal en Turquie",
  "url": "zoopedia/turquia-fr.html",
  "category": "Zoopedia",
  "keywords": "Vous emmenez votre chien ou chat en Turquie ? Seul pays européen à rage canine : analyse de sang en laboratoire agréé UE, 3 mois d'attente et 6 races interdites. Évitez le refus à la frontière. Guide 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Turquía",
  "url": "zoopedia/turquia.html",
  "category": "Zoopedia",
  "keywords": "¿Llevas tu perro o gato a Turquía? Único país europeo con rabia canina: análisis de sangre en laboratorio UE, 3 meses de espera y 6 razas vetadas. Evita el rechazo en frontera. Guía 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: Australia Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/australia-en.html",
  "category": "Zoopedia",
  "keywords": "Australia (DAFF): no direct entry — intermediate country + FAVN/RNATT + 12 months minimum. Ehrlichia positive = entry denied, no exceptions. Official 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal en Australie – Chiens et Chats",
  "url": "zoopedia/australia-fr.html",
  "category": "Zoopedia",
  "keywords": "Australie (DAFF) : pas d'entrée directe — pays intermédiaire + FAVN/RNATT + 12 mois minimum. Ehrlichia positif = entrée refusée sans exception. Guide officiel 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Australia",
  "url": "zoopedia/australia.html",
  "category": "Zoopedia",
  "keywords": "Australia (DAFF): sin entrada directa — país intermediario + FAVN/RNATT + 12 meses mínimo. Ehrlichia positivo = entrada denegada sin excepciones. Guía oficial 2026.",
  "lang": "es"
 },
 {
  "title": "MAPA Brazil Pet Import 2026: No Quarantine",
  "url": "zoopedia/brasil-en.html",
  "category": "Zoopedia",
  "keywords": "Brazil (MAPA/VIGIAGRO): no FAVN/RNATT, no quarantine — but the antiparasitic goes before the certificate, not the flight. Follow the exact model for 2026.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal au Brésil – Chiens et Chats",
  "url": "zoopedia/brasil-fr.html",
  "category": "Zoopedia",
  "keywords": "Brésil (MAPA/VIGIAGRO) : sans FAVN/RNATT, mais l'antiparasitaire passe avant le certificat, pas avant le vol — cette différence bloque les dossiers. Guide 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Brasil",
  "url": "zoopedia/brasil.html",
  "category": "Zoopedia",
  "keywords": "Brasil (MAPA/VIGIAGRO): sin FAVN/RNATT, pero el antiparasitario va antes del certificado, no del vuelo — esa diferencia cierra expedientes. Guía oficial 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: Canada Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/canada-en.html",
  "category": "Zoopedia",
  "keywords": "Canada (CFIA): no FAVN/RNATT, no quarantine. The certificate must be in English and state the vaccine's validity — Spanish only won't pass. Official 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal au Canada – Chiens et Chats",
  "url": "zoopedia/canada-fr.html",
  "category": "Zoopedia",
  "keywords": "Canada (CFIA) : sans FAVN/RNATT ni quarantaine. Le certificat doit être en anglais et préciser la validité du vaccin — en espagnol seul, il ne passe pas. Guide 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Canadá",
  "url": "zoopedia/canada.html",
  "category": "Zoopedia",
  "keywords": "Canadá (CFIA): sin FAVN/RNATT ni cuarentena. El certificado debe ir en inglés y especificar la vigencia de la vacuna — en español no pasa. Guía oficial 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: Chile Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/chile-en.html",
  "category": "Zoopedia",
  "keywords": "Chile: no RNATT, 10 days. More regulated than it looks — SAG requires antiparasitic treatment + CZE in strict window. Official SAG + SENASA 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal au Chili – Chiens et Chats",
  "url": "zoopedia/chile-fr.html",
  "category": "Zoopedia",
  "keywords": "Chili : sans RNATT, 10 jours. Plus réglementé qu'il n'y paraît — SAG exige antiparasitaire + déclaration numérique ingresoachile.cl. Guide SAG + SENASA 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Chile",
  "url": "zoopedia/chile.html",
  "category": "Zoopedia",
  "keywords": "Chile: sin RNATT, 10 días. Más regulado que parece — SAG exige desparasitación previa + CZE en ventana estricta. Guía oficial SAG + SENASA 2026.",
  "lang": "es"
 },
 {
  "title": "GACC China Pet Import 2026: Avoid Quarantine",
  "url": "zoopedia/china-en.html",
  "category": "Zoopedia",
  "keywords": "China (GACC): no post-FAVN/RNATT wait, but a mandatory import permit and entry only via Beijing, Shanghai or Guangzhou. Full 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal en Chine – Chiens et Chats",
  "url": "zoopedia/china-fr.html",
  "category": "Zoopedia",
  "keywords": "Chine (GACC) : sans attente post-FAVN/RNATT, mais permis d'importation obligatoire et entrée par Pékin, Shanghai ou Guangzhou. Guide officiel 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a China",
  "url": "zoopedia/china.html",
  "category": "Zoopedia",
  "keywords": "China (GACC): sin espera post-FAVN/RNATT, pero con permiso de importación obligatorio y entrada solo por Pekín, Shanghái o Guangzhou. Guía oficial 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: South Korea Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/corea-del-sur-en.html",
  "category": "Zoopedia",
  "keywords": "Asia's fastest route: 45 days, no post-RNATT wait. APQA + SENASA. Bring your dog or cat to South Korea with the official 2026 guide by Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal en Corée du Sud – Chiens et Chats",
  "url": "zoopedia/corea-del-sur-fr.html",
  "category": "Zoopedia",
  "keywords": "La voie la plus rapide d'Asie : 45 jours, sans attente post-RNATT. APQA + SENASA. Emmenez votre chien ou chat en Corée du Sud — guide officiel 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Corea del Sur",
  "url": "zoopedia/corea-del-sur.html",
  "category": "Zoopedia",
  "keywords": "El proceso más ágil de Asia: 45 días sin espera post-RNATT. APQA + SENASA. Lleva a tu perro o gato a Corea del Sur con la guía oficial 2026 de Zoovet Travel.",
  "lang": "es"
 },
 {
  "title": "MOCCAE UAE Pet Import 2026: Banned Breeds",
  "url": "zoopedia/eau-en.html",
  "category": "Zoopedia",
  "keywords": "UAE (MOCCAE): import permit + FAVN/RNATT with a 90-day wait. Banned breeds and pets only as cargo — never in the cabin. Official 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal aux Émirats Arabes Unis – Chiens et Chats",
  "url": "zoopedia/eau-fr.html",
  "category": "Zoopedia",
  "keywords": "EAU (MOCCAE) : permis d'importation + FAVN/RNATT avec 90 jours d'attente. Races interdites et transport uniquement en fret, jamais en cabine. Guide officiel 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Emiratos Árabes Unidos",
  "url": "zoopedia/eau.html",
  "category": "Zoopedia",
  "keywords": "Emiratos (MOCCAE): permiso de importación + FAVN/RNATT con 90 días de espera. Razas prohibidas y transporte solo como carga, nunca como equipaje. Guía oficial 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: USA Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/eeuu-en.html",
  "category": "Zoopedia",
  "keywords": "USA 2026: CDC Final Rule — RNATT if foreign vaccine, CDC form 2–15 days before arrival, Animal Care Facility reservation required. Avoid customs rejection.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal aux États-Unis – Chiens et Chats",
  "url": "zoopedia/eeuu-fr.html",
  "category": "Zoopedia",
  "keywords": "États-Unis 2026 : CDC Final Rule — RNATT si vaccin étranger, formulaire CDC 2–15 jours avant, réservation Animal Care Facility obligatoire. Évitez le refus.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a EE.UU.",
  "url": "zoopedia/eeuu.html",
  "category": "Zoopedia",
  "keywords": "EE.UU. 2026: CDC Final Rule — RNATT si vacuna extranjera, formulario CDC 2–15 días antes, reserva Animal Care Facility obligatoria. Evita rechazo en aduana.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: Spain Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/espana-en.html",
  "category": "Zoopedia",
  "keywords": "Spain (EU authority): FAVN/RNATT ≥0.5 IU/mL, 90-day wait post-vaccine at an accredited lab. One wrong date resets the whole process. Official 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal en Espagne – Chiens et Chats",
  "url": "zoopedia/espana-fr.html",
  "category": "Zoopedia",
  "keywords": "Espagne (autorité UE) : FAVN/RNATT ≥0,5 UI/ml + 90 jours d'attente en laboratoire accrédité. Une erreur de date réinitialise tout le protocole. Guide officiel 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a España",
  "url": "zoopedia/espana.html",
  "category": "Zoopedia",
  "keywords": "España (autoridad UE): FAVN/RNATT ≥0,5 UI/mL + 90 días de espera post-vacuna en laboratorio acreditado. Un solo error de fecha reinicia todo el proceso. Guía oficial 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: France Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/francia-en.html",
  "category": "Zoopedia",
  "keywords": "France follows EU regulations: mandatory RNATT, rabies vaccine and endorsed SENASA certificate. Traveling with your pet to France requires 6+ months of planning.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal en France – Chiens et Chats",
  "url": "zoopedia/francia-fr.html",
  "category": "Zoopedia",
  "keywords": "La France suit la réglementation UE : RNATT obligatoire, vaccin antirabique et certificat SENASA visé. Voyager avec votre animal en France demande 6+ mois de préparation.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Francia",
  "url": "zoopedia/francia.html",
  "category": "Zoopedia",
  "keywords": "Francia sigue la normativa UE: RNATT obligatorio, vacuna antirrábica y certificado SENASA visado. Viajar con tu mascota a Francia requiere 6+ meses de planificación.",
  "lang": "es"
 },
 {
  "title": "Zoopedia: Global Pet Travel Guide 2026",
  "url": "zoopedia/index-en.html",
  "category": "Zoopedia",
  "keywords": "Avoid customs rejection: vaccines, microchip, FAVN titer & health certificate per country for dogs & cats. Vet-verified, updated 2026 · Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "Zoopedia : Guide Global pour Voyager avec vos Animaux 2026",
  "url": "zoopedia/index-fr.html",
  "category": "Zoopedia",
  "keywords": "Évitez les refus douaniers : vaccins, micropuce, RNATT, certificat vétérinaire et quarantaine par pays. Guides vérifiés 2026 · Zoovet Travel.",
  "lang": "fr"
 },
 {
  "title": "Zoopedia: Guía Global para Viajar con Mascotas 2026",
  "url": "zoopedia/index.html",
  "category": "Zoopedia",
  "keywords": "Evita rechazos en aduana: vacunas, microchip, FAVN, SENASA y cuarentena para 20+ países. Guías por destino verificadas por veterinarios — Zoovet Travel 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: India Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/india-en.html",
  "category": "Zoopedia",
  "keywords": "India: no RNATT, 45-day process. Mandatory NOC from AQCS 15 days before the flight. Bring your pet to India with the official SENASA guide by Zoovet Travel.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal en Inde – Chiens et Chats",
  "url": "zoopedia/india-fr.html",
  "category": "Zoopedia",
  "keywords": "Inde sans RNATT : démarches en 45 jours. NOC AQCS obligatoire 15 jours avant le vol. Emmenez votre animal en Inde avec le guide officiel SENASA 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a India",
  "url": "zoopedia/india.html",
  "category": "Zoopedia",
  "keywords": "India sin RNATT: proceso en 45 días. NOC AQCS obligatorio 15 días antes del vuelo. Lleva a tu mascota a India con la guía oficial SENASA 2026 de Zoovet Travel.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: Italy Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/italia-en.html",
  "category": "Zoopedia",
  "keywords": "Italy (EU authority): FAVN/RNATT ≥0.5 IU/mL + 90-day wait. Sample sent to an accredited lab abroad. Certificate valid only 10 days. Official 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal en Italie – Chiens et Chats",
  "url": "zoopedia/italia-fr.html",
  "category": "Zoopedia",
  "keywords": "Italie (autorité UE) : FAVN/RNATT ≥0,5 UI/ml + 90 jours d'attente. Échantillon envoyé à un labo accrédité. Certificat valable 10 jours seulement. Guide officiel 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Italia",
  "url": "zoopedia/italia.html",
  "category": "Zoopedia",
  "keywords": "Italia (autoridad UE): FAVN/RNATT ≥0,5 UI/mL + 90 días de espera. Muestra a laboratorio acreditado en el exterior. Certificado válido solo 10 días. Guía oficial 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: Japan Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/japon-en.html",
  "category": "Zoopedia",
  "keywords": "The longest process: up to 6 months with AQS and mandatory quarantine on arrival in Japan. If you have your flight booked, start NOW. Full 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal au Japon – Chiens et Chats",
  "url": "zoopedia/japon-fr.html",
  "category": "Zoopedia",
  "keywords": "Le processus le plus long : jusqu'à 6 mois avec l'AQS et quarantaine obligatoire à l'arrivée au Japon. Si vous avez votre vol, commencez MAINTENANT. Guide 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Japón",
  "url": "zoopedia/japon.html",
  "category": "Zoopedia",
  "keywords": "El proceso más largo: hasta 6 meses con AQS y cuarentena obligatoria en Japón. Si tienes el vuelo reservado, empieza YA. Zoovet Travel gestiona cada etapa.",
  "lang": "es"
 },
 {
  "title": "Mexico: CDC Dog Rabies Risk 2026 & Pet Import Requirements",
  "url": "zoopedia/mexico-en.html",
  "category": "Zoopedia",
  "keywords": "Mexico NOT on CDC high-risk list — no FAVN for USA. But screwworm APHIS stops your dog at the border without certification within 5 days of travel. 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Mexique : Classification CDC Rage Canine 2026 et Conditions d'Importation d'Animaux",
  "url": "zoopedia/mexico-fr.html",
  "category": "Zoopedia",
  "keywords": "Mexique pas à haut risque CDC — sans FAVN pour USA. Mais l'APHIS bloque votre chien sans certificat ver du bouquet dans les 5 jours avant le départ. Guide 2026.",
  "lang": "fr"
 },
 {
  "title": "México: Clasificación CDC Rabia Canina 2026 y Requisitos de Importación de Mascotas",
  "url": "zoopedia/mexico.html",
  "category": "Zoopedia",
  "keywords": "México no es alto riesgo CDC — sin FAVN para EE.UU. El gusano barrenador APHIS frena tu perro si no hay certificación 5 días antes del viaje. Guía 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: New Zealand Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/nueva-zelanda-en.html",
  "category": "Zoopedia",
  "keywords": "New Zealand (MPI): no direct entry — intermediate country + FAVN/RNATT + 6 months + 10-day quarantine. Ehrlichia positive = entry denied. Official 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal en Nouvelle-Zélande – Chiens et Chats",
  "url": "zoopedia/nueva-zelanda-fr.html",
  "category": "Zoopedia",
  "keywords": "Nouvelle-Zélande (MPI) : pas d'entrée directe — pays intermédiaire + FAVN/RNATT + 6 mois + quarantaine 10 jours. Ehrlichia positif = entrée refusée. Guide officiel 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Nueva Zelanda",
  "url": "zoopedia/nueva-zelanda.html",
  "category": "Zoopedia",
  "keywords": "Nueva Zelanda (MPI): sin entrada directa — país intermediario + FAVN/RNATT + 6 meses + cuarentena 10 días. Ehrlichia positivo = entrada denegada. Guía oficial 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: Requirements to import your dog or cat to Peru | SENASA",
  "url": "zoopedia/peru-en.html",
  "category": "Zoopedia",
  "keywords": "Bringing your dog or cat to Peru? SENASA requires an official health certificate from the origin country, ISO microchip and rabies vaccine. No general quarantine, no RNATT. Official 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : exigences pour importer votre chien ou chat au Pérou | SENASA",
  "url": "zoopedia/peru-fr.html",
  "category": "Zoopedia",
  "keywords": "Vous emmenez votre chien ou chat au Pérou ? Le SENASA exige un certificat sanitaire du pays d'origine, une micropuce ISO et le vaccin antirabique. Sans quarantaine générale ni RNATT. Guide officiel 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para importar tu perro o gato a Perú | SENASA",
  "url": "zoopedia/peru.html",
  "category": "Zoopedia",
  "keywords": "¿Llevas tu perro o gato a Perú? SENASA exige certificado sanitario del país de origen, microchip ISO y vacuna antirrábica. Sin cuarentena general ni RNATT. Guía oficial 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: United Kingdom Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/reino-unido-en.html",
  "category": "Zoopedia",
  "keywords": "Post-Brexit UK: GB Pet Health Certificate (APHA), not EU model. Northern Ireland is different. RNATT + 3-month wait + Praziquantel. Official 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal au Royaume-Uni – Chiens et Chats",
  "url": "zoopedia/reino-unido-fr.html",
  "category": "Zoopedia",
  "keywords": "Post-Brexit : UK exige GB Pet Health Certificate (APHA), pas le modèle UE. Irlande du Nord : différent. RNATT + 3 mois + Praziquantel. Guide officiel 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Reino Unido",
  "url": "zoopedia/reino-unido.html",
  "category": "Zoopedia",
  "keywords": "Post-Brexit: UK exige GB Pet Health Certificate (APHA), no el UE. Irlanda del Norte es distinto. RNATT + 3 meses + Praziquantel. Guía oficial 2026.",
  "lang": "es"
 },
 {
  "title": "Rosselkhoznadzor Russia Pet Import 2026: 5-Day Rule",
  "url": "zoopedia/rusia-en.html",
  "category": "Zoopedia",
  "keywords": "Russia (FSVPS / Rosselkhoznadzor): no FAVN/RNATT, but the health certificate is valid only 5 days before you fly and the rabies vaccine only 1 year. Full 2026 steps.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal en Russie – Chiens et Chats",
  "url": "zoopedia/rusia-fr.html",
  "category": "Zoopedia",
  "keywords": "Russie (FSVPS) : sans FAVN/RNATT, la route la plus accessible d'Europe. Le CVI Form 5a valable seulement 5 jours + déclaration Canal Rouge. Guide officiel 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Rusia",
  "url": "zoopedia/rusia.html",
  "category": "Zoopedia",
  "keywords": "Rusia (FSVPS): sin FAVN/RNATT, la ruta más accesible de Europa. El CVI Form 5a vale solo 5 días antes de salir + declaración Canal Rojo. Guía oficial 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: Singapore Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/singapur-en.html",
  "category": "Zoopedia",
  "keywords": "Singapore Cat. D: RNATT 6 months old + 30-day quarantine + AQC reservation 30 days ahead. Most demanding in Asia. Official 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal à Singapour – Chiens et Chats",
  "url": "zoopedia/singapur-fr.html",
  "category": "Zoopedia",
  "keywords": "Singapour Cat. D : RNATT de 6 mois d'ancienneté + quarantaine 30 jours + réservation AQC 30 jours avant. Le plus exigeant d'Asie. Guide officiel 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Singapur",
  "url": "zoopedia/singapur.html",
  "category": "Zoopedia",
  "keywords": "Singapur Cat. D: RNATT con 6 meses de antigüedad + cuarentena 30 días + reserva AQC 30 días antes. El más exigente de Asia. Guía oficial 2026.",
  "lang": "es"
 },
 {
  "title": "2026 Guide: South Africa Pet Travel Requirements – Dogs & Cats",
  "url": "zoopedia/sudafrica-en.html",
  "category": "Zoopedia",
  "keywords": "75-90 day process, 14-day quarantine and prior DALRRD permit required. Bring your dog or cat to South Africa with our step-by-step official 2026 guide.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal en Afrique du Sud – Chiens et Chats",
  "url": "zoopedia/sudafrica-fr.html",
  "category": "Zoopedia",
  "keywords": "75 à 90 jours de démarches, quarantaine 14 jours et permis DALRRD préalable. Emmenez votre chien ou chat en Afrique du Sud avec notre guide officiel 2026.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Sudáfrica",
  "url": "zoopedia/sudafrica.html",
  "category": "Zoopedia",
  "keywords": "75-90 días de proceso, cuarentena 14 días y permiso DALRRD previo. Lleva a tu perro o gato a Sudáfrica con la guía oficial 2026 paso a paso de Zoovet Travel.",
  "lang": "es"
 },
 {
  "title": "DG SANTE EU Pet Import 2026: The 3-Month Wait",
  "url": "zoopedia/union-europea-en.html",
  "category": "Zoopedia",
  "keywords": "European Union (DG SANTE): 4+ months — FAVN/RNATT ≥0.5 IU/mL triggers a 3-month wait and one wrong date means quarantine. Full EU 2026 timeline.",
  "lang": "en"
 },
 {
  "title": "Guide 2026 : Voyager avec son animal dans l'Union Européenne – Chiens et Chats",
  "url": "zoopedia/union-europea-fr.html",
  "category": "Zoopedia",
  "keywords": "Union européenne (DG SANTE) : 4 mois min., FAVN/RNATT ≥0,5 UI/ml, 3 mois d'attente + exceptions Finlande, Irlande, Malte, Norvège. Une erreur = quarantaine.",
  "lang": "fr"
 },
 {
  "title": "Guía 2026: Requisitos para viajar con mascotas a Unión Europea",
  "url": "zoopedia/union-europea.html",
  "category": "Zoopedia",
  "keywords": "Unión Europea (DG SANTE): 4 meses mínimo, FAVN/RNATT ≥0,5 UI/mL, espera 3 meses + excepciones Finlandia, Irlanda, Malta y Noruega. Un error de fecha = cuarentena.",
  "lang": "es"
 },
 {
  "title": "Perros y gatos en la bodega del avión: qué dicen la IATA, la AVMA y los datos oficiales",
  "url": "articulos-interes/perros-y-gatos-en-la-bodega-del-avion.html",
  "category": "Guías",
  "keywords": "¿Tu mascota viaja en la bodega del avión? Va presurizada y climatizada, y el 99,99% llega sin incidentes según la IATA, la AVMA y el US DOT. Tabla verificada de aerolíneas con certificación CEIV Live Animals, riesgos de razas braquicéfalas y por qué no se seda.",
  "lang": "es"
 },
 {
  "title": "Dogs and Cats in the Airplane Cargo Hold: What IATA, the AVMA, and the Official Data Say",
  "url": "articulos-interes/perros-y-gatos-en-la-bodega-del-avion-en.html",
  "category": "Guías",
  "keywords": "Does your pet travel in the aircraft cargo hold? It is pressurized and climate-controlled, and 99.99% arrive with no incidents per IATA, the AVMA and the US DOT. Verified table of airlines with IATA CEIV Live Animals certification, brachycephalic breed risks and why you must not sedate.",
  "lang": "en"
 },
 {
  "title": "Chiens et chats en soute d'avion : ce que disent l'IATA, l'AVMA et les données officielles",
  "url": "articulos-interes/perros-y-gatos-en-la-bodega-del-avion-fr.html",
  "category": "Guías",
  "keywords": "Votre animal voyage en soute ? Elle est pressurisée et climatisée, et 99,99 % arrivent sans incident selon l'IATA, l'AVMA et le US DOT. Tableau vérifié des compagnies certifiées IATA CEIV Live Animals, risques des races brachycéphales et pourquoi ne pas sédater.",
  "lang": "fr"
 },
 {
  "title": "Cães e gatos no porão do avião: o que dizem a IATA, a AVMA e os dados oficiais",
  "url": "articulos-interes/perros-y-gatos-en-la-bodega-del-avion-pt.html",
  "category": "Guías",
  "keywords": "Seu pet viaja no porão do avião? É pressurizado e climatizado, e 99,99% chegam sem incidentes segundo a IATA, a AVMA e o US DOT. Tabela verificada de companhias com certificação IATA CEIV Live Animals, riscos das raças braquicefálicas e por que não sedar.",
  "lang": "pt"
 },
 {
  "title": "Hunde und Katzen im Frachtraum des Flugzeugs: Was IATA, AVMA und die offiziellen Daten sagen",
  "url": "articulos-interes/perros-y-gatos-en-la-bodega-del-avion-de.html",
  "category": "Guías",
  "keywords": "Reist Ihr Tier im Frachtraum? Er ist druckbelüftet und klimatisiert, und 99,99 % kommen ohne Zwischenfälle an, laut IATA, AVMA und US DOT. Geprüfte Tabelle der Airlines mit IATA CEIV Live Animals, Risiken kurznasiger Rassen und warum nicht sediert wird.",
  "lang": "de"
 },
 {
  "title": "Cani e gatti nella stiva dell'aereo: cosa dicono IATA, AVMA e i dati ufficiali",
  "url": "articulos-interes/perros-y-gatos-en-la-bodega-del-avion-it.html",
  "category": "Guías",
  "keywords": "Il tuo animale viaggia in stiva? È pressurizzata e climatizzata, e il 99,99% arriva senza incidenti secondo IATA, AVMA e US DOT. Tabella verificata delle compagnie con certificazione IATA CEIV Live Animals, rischi delle razze brachicefale e perché non sedare.",
  "lang": "it"
 },
 {
  "title": "La díada perro–propietario en el transporte aéreo en bodega: el humano como fuente del estrés",
  "url": "articles/zoovet_art19_separacion-diada-bodega-ES.html",
  "category": "Serie técnica",
  "keywords": "El riesgo físico en bodega es bajo (99,99% sin incidencias, US DOT 2025), pero el estrés del dueño se transmite al perro. Modelo de la díada acoplada, ansiedad por separación, quimioseñales de miedo, cortisol, sedación desaconsejada. Preprint con DOI.",
  "lang": "es"
 },
 {
  "title": "The dog–owner dyad in air transport in the cargo hold: the human as the source of stress",
  "url": "articles/zoovet_art19_separacion-diada-bodega-EN.html",
  "category": "Serie técnica",
  "keywords": "Observed physical risk in the hold is low (99.99% incident-free, US DOT 2025), yet the owner's stress transfers to the dog. Coupled-dyad model, separation anxiety, fear chemosignals, cortisol, sedation not advised. Preprint with DOI.",
  "lang": "en"
 },
 {
  "title": "La dyade chien–propriétaire dans le transport aérien en soute : l'humain comme source du stress",
  "url": "articles/zoovet_art19_separacion-diada-bodega-FR.html",
  "category": "Serie técnica",
  "keywords": "Le risque physique en soute est faible (99,99 % sans incident, US DOT 2025), mais le stress du propriétaire se transmet au chien. Modèle de la dyade couplée, anxiété de séparation, chimiosignaux de peur, cortisol, sédation déconseillée. Préprint avec DOI.",
  "lang": "fr"
 },
 {
  "title": "Pre-flight assessment for brachycephalic (short-nosed) breeds",
  "url": "servicios/braquicefalos-en.html",
  "category": "Servicios",
  "keywords": "Does your bulldog or pug need to fly and you fear for its breathing? We assess flight fitness with BOAS screening and clinical judgment. WhatsApp us.",
  "lang": "en"
 },
 {
  "title": "Évaluation avant le vol pour les races brachycéphales (au museau court)",
  "url": "servicios/braquicefalos-fr.html",
  "category": "Servicios",
  "keywords": "Votre bouledogue ou carlin doit voler et sa respiration vous inquiète ? Nous évaluons son aptitude au vol par dépistage BOAS. Écrivez-nous sur WhatsApp.",
  "lang": "fr"
 },
 {
  "title": "Evaluación pre-vuelo para razas braquicéfalas (hocico corto)",
  "url": "servicios/braquicefalos.html",
  "category": "Servicios",
  "keywords": "¿Tu bulldog o pug debe volar y temes por su respiración? Evaluamos su aptitud al vuelo con cribado BOAS y criterio clínico. Consúltanos por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Health and vaccination certificates for exporting pets",
  "url": "servicios/certificados-exportacion-en.html",
  "category": "Servicios",
  "keywords": "Trip near and your pet's certificates missing? We issue the health and vaccination certificate valid for SENASA and the destination. Message us today.",
  "lang": "en"
 },
 {
  "title": "Certificats de santé et de vaccination pour exporter vos animaux",
  "url": "servicios/certificados-exportacion-fr.html",
  "category": "Servicios",
  "keywords": "Voyage proche et certificats de votre animal manquants ? Nous délivrons le certificat de santé et de vaccination valable SENASA et destination. Écrivez-nous.",
  "lang": "fr"
 },
 {
  "title": "Certificados de salud y vacunación para exportar mascotas",
  "url": "servicios/certificados-exportacion.html",
  "category": "Servicios",
  "keywords": "¿Viaje encima y sin los certificados de tu mascota? Emitimos el certificado de salud y vacunación válido ante SENASA y el país destino. Escríbenos hoy.",
  "lang": "es"
 },
 {
  "title": "Pre-travel geriatric check-up for senior pets",
  "url": "servicios/chequeo-geriatrico-en.html",
  "category": "Servicios",
  "keywords": "Senior dog or cat traveling and you worry about its health? A full geriatric check-up confirms its real fitness before the flight. Book on WhatsApp.",
  "lang": "en"
 },
 {
  "title": "Bilan gériatrique avant le voyage pour animaux âgés",
  "url": "servicios/chequeo-geriatrico-fr.html",
  "category": "Servicios",
  "keywords": "Chien ou chat âgé qui voyage et sa santé vous inquiète ? Un bilan gériatrique complet confirme son aptitude avant le vol. Réservez sur WhatsApp.",
  "lang": "fr"
 },
 {
  "title": "Chequeo geriátrico antes del viaje para mascotas mayores",
  "url": "servicios/chequeo-geriatrico.html",
  "category": "Servicios",
  "keywords": "¿Tu perro o gato mayor va a viajar y te preocupa su salud? Chequeo geriátrico completo que confirma su aptitud real antes del vuelo. Agenda por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Veterinary consultation and clinical exam in Trujillo",
  "url": "servicios/consulta-examen-en.html",
  "category": "Servicios",
  "keywords": "Your pet isn't well and you don't know why? A full clinical consultation and exam to reach the right diagnosis, not guesswork. Book on WhatsApp.",
  "lang": "en"
 },
 {
  "title": "Consultation et examen clinique vétérinaire à Trujillo",
  "url": "servicios/consulta-examen-fr.html",
  "category": "Servicios",
  "keywords": "Votre animal ne va pas bien et vous ignorez pourquoi ? Consultation et examen clinique complets pour le bon diagnostic, sans deviner. Réservez sur WhatsApp.",
  "lang": "fr"
 },
 {
  "title": "Consulta y examen clínico veterinario en Trujillo",
  "url": "servicios/consulta-examen.html",
  "category": "Servicios",
  "keywords": "¿Tu mascota no está bien y no sabes por qué? Consulta y examen clínico completo para llegar al diagnóstico correcto, sin adivinar. Reserva por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Veterinary dermatology in Trujillo: allergies, otitis and skin",
  "url": "servicios/dermatologia-en.html",
  "category": "Servicios",
  "keywords": "Pet scratching nonstop and ear infections keep returning? We find the real cause of the allergy or skin issue and control flare-ups. WhatsApp us.",
  "lang": "en"
 },
 {
  "title": "Dermatologie vétérinaire à Trujillo : allergies, otites et peau",
  "url": "servicios/dermatologia-fr.html",
  "category": "Servicios",
  "keywords": "Votre animal se gratte sans cesse et les otites reviennent ? Nous trouvons la vraie cause de l'allergie ou de la peau et maîtrisons les poussées. Écrivez-nous.",
  "lang": "fr"
 },
 {
  "title": "Dermatología veterinaria en Trujillo: alergias, otitis y piel",
  "url": "servicios/dermatologia.html",
  "category": "Servicios",
  "keywords": "¿Tu mascota se rasca sin parar y las otitis vuelven? Hallamos la causa real de la alergia o la piel y controlamos los brotes con evidencia. Agenda hoy.",
  "lang": "es"
 },
 {
  "title": "Deworming for dogs and cats in Trujillo",
  "url": "servicios/desparasitacion-en.html",
  "category": "Servicios",
  "keywords": "Parasites that keep coming back, or a travel requirement? Documented internal and external deworming, tailored to the destination. Message us on WhatsApp.",
  "lang": "en"
 },
 {
  "title": "Vermifugation des chiens et des chats à Trujillo",
  "url": "servicios/desparasitacion-fr.html",
  "category": "Servicios",
  "keywords": "Parasites qui reviennent ou exigence de voyage ? Vermifugation interne et externe documentée, selon la destination et votre animal. Écrivez-nous sur WhatsApp.",
  "lang": "fr"
 },
 {
  "title": "Desparasitación de perros y gatos en Trujillo",
  "url": "servicios/desparasitacion.html",
  "category": "Servicios",
  "keywords": "¿Parásitos que vuelven o requisito para viajar? Desparasitación interna y externa documentada, según el destino y tu mascota. Escríbenos por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Veterinary ultrasound and cardiology in Trujillo: echocardiogram and ECG",
  "url": "servicios/ecografia-cardiologia-en.html",
  "category": "Servicios",
  "keywords": "Need to rule out a heart or abdominal problem in your pet? Ultrasound and cardiac assessment with a clear clinical read. Coordinate it on WhatsApp.",
  "lang": "en"
 },
 {
  "title": "Échographie et cardiologie vétérinaire à Trujillo : échocardiogramme et ECG",
  "url": "servicios/ecografia-cardiologia-fr.html",
  "category": "Servicios",
  "keywords": "Besoin d'écarter un problème cardiaque ou abdominal chez votre animal ? Échographie et bilan cardiaque avec lecture clinique claire. Coordonnez sur WhatsApp.",
  "lang": "fr"
 },
 {
  "title": "Ecografía y cardiología veterinaria en Trujillo: ecocardiograma y ECG",
  "url": "servicios/ecografia-cardiologia.html",
  "category": "Servicios",
  "keywords": "¿Necesitas descartar un problema de corazón o abdomen en tu mascota? Ecografía y evaluación cardiológica con lectura clínica clara. Coordina por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Veterinary endocrinology in Trujillo: diabetes, thyroid and Cushing",
  "url": "servicios/endocrinologia-en.html",
  "category": "Servicios",
  "keywords": "Excessive thirst, hair loss or weight changes with no cause? We confirm and control diabetes, thyroid or Cushing with follow-up. Message us on WhatsApp.",
  "lang": "en"
 },
 {
  "title": "Endocrinologie vétérinaire à Trujillo : diabète, thyroïde et Cushing",
  "url": "servicios/endocrinologia-fr.html",
  "category": "Servicios",
  "keywords": "Soif excessive, perte de poils ou de poids sans cause ? Nous confirmons et maîtrisons diabète, thyroïde ou Cushing avec suivi. Écrivez-nous sur WhatsApp.",
  "lang": "fr"
 },
 {
  "title": "Endocrinología veterinaria en Trujillo: diabetes, tiroides y Cushing",
  "url": "servicios/endocrinologia.html",
  "category": "Servicios",
  "keywords": "¿Sed excesiva, caída de pelo o cambios de peso sin causa? Confirmamos y controlamos diabetes, tiroides o Cushing con seguimiento. Consúltanos por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Feline evaluation for international travel",
  "url": "servicios/evaluacion-felina-en.html",
  "category": "Servicios",
  "keywords": "Is your cat traveling and needs leukemia or mycoplasma ruled out? A full feline evaluation before the flight, stress-free. Book on WhatsApp.",
  "lang": "en"
 },
 {
  "title": "Évaluation féline pour voyage international",
  "url": "servicios/evaluacion-felina-fr.html",
  "category": "Servicios",
  "keywords": "Votre chat voyage et il faut écarter leucémie ou mycoplasme ? Une évaluation féline complète avant le vol, sans stress. Réservez sur WhatsApp.",
  "lang": "fr"
 },
 {
  "title": "Evaluación felina para viaje internacional",
  "url": "servicios/evaluacion-felina.html",
  "category": "Servicios",
  "keywords": "¿Tu gato debe viajar y hay que descartar leucemia o micoplasma? Evaluación felina completa antes del vuelo y sin estrés para él. Agenda por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Veterinary services in Trujillo: consultations, vaccines and pet export",
  "url": "servicios/index-en.html",
  "category": "Servicios",
  "keywords": "Is your pet sick or traveling abroad? Consultations, clinical specialties and SENASA pet export in one place, backed by evidence. Message us on WhatsApp.",
  "lang": "en"
 },
 {
  "title": "Services vétérinaires à Trujillo : consultation, vaccins et exportation d'animaux de compagnie",
  "url": "servicios/index-fr.html",
  "category": "Servicios",
  "keywords": "Votre animal est malade ou part à l'étranger ? Consultations, spécialités cliniques et exportation SENASA au même endroit, avec preuves. Écrivez-nous.",
  "lang": "fr"
 },
 {
  "title": "Servicios veterinarios en Trujillo: consulta, vacunas y exportación de mascotas",
  "url": "servicios/index.html",
  "category": "Servicios",
  "keywords": "¿Tu mascota enferma o viaja al extranjero? Consulta, especialidades clínicas y exportación con SENASA en un mismo lugar y con evidencia. Agenda por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Veterinary internal medicine in Trujillo: clinical diagnosis",
  "url": "servicios/medicina-interna-en.html",
  "category": "Servicios",
  "keywords": "Symptoms that keep repeating and no clear diagnosis? We investigate the real cause with method and targeted tests, acute or chronic. Book on WhatsApp.",
  "lang": "en"
 },
 {
  "title": "Médecine interne vétérinaire à Trujillo : diagnostic clinique",
  "url": "servicios/medicina-interna-fr.html",
  "category": "Servicios",
  "keywords": "Symptômes qui se répètent sans diagnostic clair ? Nous cherchons la vraie cause avec méthode et examens ciblés, aigus ou chroniques. Réservez sur WhatsApp.",
  "lang": "fr"
 },
 {
  "title": "Medicina interna veterinaria en Trujillo: diagnóstico clínico",
  "url": "servicios/medicina-interna.html",
  "category": "Servicios",
  "keywords": "¿Síntomas que se repiten y ningún diagnóstico claro? Investigamos el origen real con método y pruebas dirigidas, agudos o crónicos. Agenda por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Preventive veterinary medicine in Trujillo: vaccines, deworming and check-ups",
  "url": "servicios/medicina-preventiva-en.html",
  "category": "Servicios",
  "keywords": "Want to stop your pet getting sick before it happens? A tailored prevention plan: vaccines up to date, parasite control and check-ups. Message us now.",
  "lang": "en"
 },
 {
  "title": "Médecine préventive vétérinaire à Trujillo : vaccins, vermifugation et bilans",
  "url": "servicios/medicina-preventiva-fr.html",
  "category": "Servicios",
  "keywords": "Éviter que votre animal tombe malade avant que cela n'arrive ? Plan de prévention sur mesure : vaccins à jour, antiparasitaire et bilans. Écrivez-nous.",
  "lang": "fr"
 },
 {
  "title": "Medicina preventiva veterinaria en Trujillo: vacunas, desparasitación y chequeos",
  "url": "servicios/medicina-preventiva.html",
  "category": "Servicios",
  "keywords": "¿Quieres evitar que tu mascota enferme antes de que ocurra? Plan preventivo a medida: vacunas al día, control parasitario y chequeos. Escríbenos ya.",
  "lang": "es"
 },
 {
  "title": "Pet microchip implantation",
  "url": "servicios/microchip-en.html",
  "category": "Servicios",
  "keywords": "Does your pet need ID to travel or by law? We implant and correctly register the ISO 11784/11785 microchip. Book on WhatsApp.",
  "lang": "en"
 },
 {
  "title": "Pose de puce électronique pour animaux",
  "url": "servicios/microchip-fr.html",
  "category": "Servicios",
  "keywords": "Votre animal a besoin d'une identification pour voyager ou par la loi ? Nous posons et enregistrons la puce ISO 11784/11785. Réservez sur WhatsApp.",
  "lang": "fr"
 },
 {
  "title": "Implantación de microchip para mascotas",
  "url": "servicios/microchip.html",
  "category": "Servicios",
  "keywords": "¿Tu mascota necesita identificación para viajar o por norma legal? Implantamos y registramos el microchip ISO 11784/11785. Agenda por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Veterinary nutrition in Trujillo: diets, obesity and chronic diseases",
  "url": "servicios/nutricion-en.html",
  "category": "Servicios",
  "keywords": "Overweight, gastritis or allergies that won't ease? We adjust your pet's diet with measurable, realistic goals. Ask for your assessment on WhatsApp.",
  "lang": "en"
 },
 {
  "title": "Nutrition vétérinaire à Trujillo : régimes, obésité et maladies chroniques",
  "url": "servicios/nutricion-fr.html",
  "category": "Servicios",
  "keywords": "Surpoids, gastrite ou allergies qui persistent ? Nous ajustons l'alimentation de votre animal avec des objectifs mesurables. Demandez votre bilan.",
  "lang": "fr"
 },
 {
  "title": "Nutrición veterinaria en Trujillo: dietas, obesidad y enfermedades crónicas",
  "url": "servicios/nutricion.html",
  "category": "Servicios",
  "keywords": "¿Sobrepeso, gastritis o alergias que no ceden? Ajustamos la dieta de tu mascota con objetivos medibles y realistas. Pide tu evaluación por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Veterinary ophthalmology in Trujillo: ulcers, glaucoma and cataracts",
  "url": "servicios/oftalmologia-en.html",
  "category": "Servicios",
  "keywords": "Red eye, tearing or your pet bumping into things? We treat ulcers, conjunctivitis, cataracts and glaucoma to protect its vision. Message us today.",
  "lang": "en"
 },
 {
  "title": "Ophtalmologie vétérinaire à Trujillo : ulcères, glaucome et cataractes",
  "url": "servicios/oftalmologia-fr.html",
  "category": "Servicios",
  "keywords": "Œil rouge, larmoiement ou votre animal se cogne ? Nous traitons ulcères, conjonctivite, cataracte et glaucome pour protéger sa vue. Écrivez-nous.",
  "lang": "fr"
 },
 {
  "title": "Oftalmología veterinaria en Trujillo: úlceras, glaucoma y cataratas",
  "url": "servicios/oftalmologia.html",
  "category": "Servicios",
  "keywords": "¿Ojo rojo, lagrimeo o tu mascota se golpea con todo? Atendemos úlceras, conjuntivitis, cataratas y glaucoma para cuidar su visión. Consúltanos hoy.",
  "lang": "es"
 },
 {
  "title": "Export package for puppies and kittens",
  "url": "servicios/paquete-cachorros-en.html",
  "category": "Servicios",
  "keywords": "Is your puppy traveling and you don't know where to start? A full pediatric package: serial tests, vaccines and paperwork. Book on WhatsApp.",
  "lang": "en"
 },
 {
  "title": "Forfait d'exportation pour chiots et chatons",
  "url": "servicios/paquete-cachorros-fr.html",
  "category": "Servicios",
  "keywords": "Votre chiot voyage et vous ne savez pas par où commencer ? Un forfait pédiatrique complet : analyses, vaccins et documents. Réservez sur WhatsApp.",
  "lang": "fr"
 },
 {
  "title": "Paquete de exportación para cachorros",
  "url": "servicios/paquete-cachorros.html",
  "category": "Servicios",
  "keywords": "¿Tu cachorro debe viajar y no sabes por dónde empezar? Paquete pediátrico completo: análisis seriados, vacunas y documentación. Agenda por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Rabies blood test (FAVN serology)",
  "url": "servicios/serologia-en.html",
  "category": "Servicios",
  "keywords": "Does your destination require the FAVN rabies serology and time is short? We coordinate the test with an EU-authorized lab. Message us on WhatsApp.",
  "lang": "en"
 },
 {
  "title": "Analyse de sang pour la rage (sérologie FAVN)",
  "url": "servicios/serologia-fr.html",
  "category": "Servicios",
  "keywords": "Votre destination exige la sérologie antirabique FAVN et le temps presse ? Nous coordonnons l'analyse avec un labo agréé UE. Écrivez-nous sur WhatsApp.",
  "lang": "fr"
 },
 {
  "title": "Análisis de sangre para la rabia (serología FAVN)",
  "url": "servicios/serologia.html",
  "category": "Servicios",
  "keywords": "¿Tu destino exige la serología antirrábica FAVN y el tiempo corre? Coordinamos el análisis con laboratorio autorizado por la UE. Escríbenos por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Dog and cat vaccination for travel",
  "url": "servicios/vacunacion-en.html",
  "category": "Servicios",
  "keywords": "What vaccines does your pet need to travel abroad? We give the rabies schedule with export-valid registration. Book on WhatsApp.",
  "lang": "en"
 },
 {
  "title": "Vaccination des chiens et chats pour voyager",
  "url": "servicios/vacunacion-fr.html",
  "category": "Servicios",
  "keywords": "Quels vaccins pour faire voyager votre animal à l'étranger ? Nous appliquons le schéma antirabique avec enregistrement valable export. Réservez.",
  "lang": "fr"
 },
 {
  "title": "Vacunación de perros y gatos para viajar",
  "url": "servicios/vacunacion.html",
  "category": "Servicios",
  "keywords": "¿Qué vacunas necesita tu mascota para viajar al extranjero? Aplicamos el esquema antirrábico con registro válido para exportación. Agenda por WhatsApp.",
  "lang": "es"
 },
 {
  "title": "Cataract in dogs and cats: causes, diagnosis and options",
  "url": "glosario/catarata-en.html",
  "category": "Glosario",
  "keywords": "What a cataract is in dogs and cats: a clouding of the lens that reduces vision, its causes (hereditary, senile, diabetic), how it differs from nuclear sclerosis, and ophthalmic diagnosis.",
  "lang": "en"
 },
 {
  "title": "Cataracte chez le chien et le chat : causes, diagnostic et options",
  "url": "glosario/catarata-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que la cataracte chez le chien et le chat : opacité du cristallin qui réduit la vision, ses causes (héréditaire, sénile, diabétique), la différence avec la sclérose nucléaire et le diagnostic ophtalmologique.",
  "lang": "fr"
 },
 {
  "title": "Catarata en perros y gatos: causas, diagnóstico y opciones",
  "url": "glosario/catarata.html",
  "category": "Glosario",
  "keywords": "Qué es la catarata en perros y gatos: opacidad del cristalino que reduce la visión, sus causas (hereditaria, senil, diabética), diferencia con la esclerosis nuclear y diagnóstico oftalmológico.",
  "lang": "es"
 },
 {
  "title": "Hyperadrenocorticism (Cushing's) in dogs: signs, diagnosis and control",
  "url": "glosario/cushing-hiperadrenocorticismo-en.html",
  "category": "Glosario",
  "keywords": "What hyperadrenocorticism (Cushing's syndrome) is in dogs: chronic cortisol excess, classic signs, why it often reaches dermatology first, diagnosis and control.",
  "lang": "en"
 },
 {
  "title": "Hyperadrénocorticisme (Cushing) chez le chien : signes, diagnostic et contrôle",
  "url": "glosario/cushing-hiperadrenocorticismo-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que l'hyperadrénocorticisme (syndrome de Cushing) chez le chien : excès chronique de cortisol, signes classiques, pourquoi il arrive souvent d'abord en dermatologie, diagnostic et contrôle.",
  "lang": "fr"
 },
 {
  "title": "Hiperadrenocorticismo (Cushing) en perros: signos, diagnóstico y control",
  "url": "glosario/cushing-hiperadrenocorticismo.html",
  "category": "Glosario",
  "keywords": "Qué es el hiperadrenocorticismo (síndrome de Cushing) en perros: exceso crónico de cortisol, signos clásicos, por qué llega a dermatología, diagnóstico y control.",
  "lang": "es"
 },
 {
  "title": "Demodicosis (demodectic mange) in dogs: causes, signs and diagnosis",
  "url": "glosario/demodicosis-en.html",
  "category": "Glosario",
  "keywords": "What demodicosis (demodectic mange) is in dogs: proliferation of the Demodex mite, localized and generalized forms, skin signs and diagnosis by deep skin scraping.",
  "lang": "en"
 },
 {
  "title": "Démodécie (gale démodécique) chez le chien : causes, signes et diagnostic",
  "url": "glosario/demodicosis-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que la démodécie (gale démodécique) chez le chien : prolifération de l'acarien Demodex, formes localisée et généralisée, signes cutanés et diagnostic par raclage profond.",
  "lang": "fr"
 },
 {
  "title": "Demodicosis (sarna demodécica) en perros: causas, signos y diagnóstico",
  "url": "glosario/demodicosis.html",
  "category": "Glosario",
  "keywords": "Qué es la demodicosis o sarna demodécica en perros: proliferación del ácaro Demodex, formas localizada y generalizada, signos cutáneos y diagnóstico por raspado profundo.",
  "lang": "es"
 },
 {
  "title": "Canine atopic dermatitis: chronic itch, diagnosis and management",
  "url": "glosario/dermatitis-atopica-canina-en.html",
  "category": "Glosario",
  "keywords": "What canine atopic dermatitis is, its signs (chronic itch, paw licking, recurrent otitis), why it requires diagnosis by exclusion and how its management is approached.",
  "lang": "en"
 },
 {
  "title": "Dermatite atopique canine : démangeaisons chroniques, diagnostic et prise en charge",
  "url": "glosario/dermatitis-atopica-canina-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que la dermatite atopique canine, ses signes (démangeaisons chroniques, léchage des pattes, otite récidivante), pourquoi elle exige un diagnostic d'exclusion et comment on la prend en charge.",
  "lang": "fr"
 },
 {
  "title": "Dermatitis atópica canina: picazón crónica, diagnóstico y manejo",
  "url": "glosario/dermatitis-atopica-canina.html",
  "category": "Glosario",
  "keywords": "Qué es la dermatitis atópica canina, sus signos (picazón crónica, lamido de patas, otitis recurrente), por qué requiere diagnóstico por descarte y cómo se aborda su manejo.",
  "lang": "es"
 },
 {
  "title": "Diabetes mellitus in dogs and cats: signs, diagnosis and control",
  "url": "glosario/diabetes-mellitus-en.html",
  "category": "Glosario",
  "keywords": "What diabetes mellitus is in dogs and cats: signs (increased urination, thirst and appetite with weight loss), diagnosis (blood glucose, glucosuria, fructosamine) and periodic control.",
  "lang": "en"
 },
 {
  "title": "Diabète sucré chez le chien et le chat : signes, diagnostic et contrôle",
  "url": "glosario/diabetes-mellitus-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que le diabète sucré chez le chien et le chat : signes (mictions, soif et appétit accrus avec perte de poids), diagnostic (glycémie, glucosurie, fructosamine) et contrôle périodique.",
  "lang": "fr"
 },
 {
  "title": "Diabetes mellitus en perros y gatos: signos, diagnóstico y control",
  "url": "glosario/diabetes-mellitus.html",
  "category": "Glosario",
  "keywords": "Qué es la diabetes mellitus en perros y gatos: signos (poliuria, polidipsia, polifagia con pérdida de peso), diagnóstico (glucemia, glucosuria, fructosamina) y control periódico.",
  "lang": "es"
 },
 {
  "title": "Veterinary echocardiography: what it evaluates and when it is indicated",
  "url": "glosario/ecocardiograma-en.html",
  "category": "Glosario",
  "keywords": "What a veterinary echocardiography is, what it evaluates (cardiac structure and function, valves, contractility and flow with Doppler), when it is indicated, and how it differs from the electrocardiogram (ECG).",
  "lang": "en"
 },
 {
  "title": "Échocardiographie vétérinaire : ce qu'elle évalue et quand elle est indiquée",
  "url": "glosario/ecocardiograma-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que l'échocardiographie vétérinaire, ce qu'elle évalue (structure et fonction cardiaques, valves, contractilité et flux au Doppler), quand elle est indiquée et en quoi elle diffère de l'électrocardiogramme (ECG).",
  "lang": "fr"
 },
 {
  "title": "Ecocardiograma veterinario: qué evalúa y cuándo se indica",
  "url": "glosario/ecocardiograma.html",
  "category": "Glosario",
  "keywords": "Qué es el ecocardiograma veterinario, qué evalúa (estructura y función cardíaca, válvulas, contractilidad y flujo con Doppler), cuándo se indica y en qué se diferencia del electrocardiograma (ECG).",
  "lang": "es"
 },
 {
  "title": "Veterinary electrocardiography (ECG): what it measures and when it is indicated",
  "url": "glosario/electrocardiograma-en.html",
  "category": "Glosario",
  "keywords": "What veterinary electrocardiography (ECG) is, what it measures, what it detects and when it is indicated. Difference between ECG and echocardiography in cardiac assessment of pets.",
  "lang": "en"
 },
 {
  "title": "Électrocardiographie (ECG) vétérinaire : ce qu'elle mesure et quand elle est indiquée",
  "url": "glosario/electrocardiograma-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que l'électrocardiographie (ECG) vétérinaire, ce qu'elle mesure, ce qu'elle détecte et quand elle est indiquée. Différence entre l'ECG et l'échocardiographie dans l'évaluation cardiaque des animaux.",
  "lang": "fr"
 },
 {
  "title": "Electrocardiograma (ECG) veterinario: qué mide y cuándo se indica",
  "url": "glosario/electrocardiograma.html",
  "category": "Glosario",
  "keywords": "Qué es el electrocardiograma (ECG) veterinario, qué mide, qué detecta y cuándo se indica. Diferencia entre ECG y ecocardiograma en la evaluación cardiológica de mascotas.",
  "lang": "es"
 },
 {
  "title": "Giardiasis in dogs and cats: transmission, diarrhea and diagnosis",
  "url": "glosario/giardiasis-en.html",
  "category": "Glosario",
  "keywords": "What giardiasis is in dogs and cats, how it spreads through Giardia cysts, signs such as intermittent diarrhea, diagnosis and relevance to deworming.",
  "lang": "en"
 },
 {
  "title": "Giardiose chez le chien et le chat : contagion, diarrhée et diagnostic",
  "url": "glosario/giardiasis-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que la giardiose chez le chien et le chat, comment elle se transmet par les kystes de Giardia, signes comme la diarrhée intermittente, diagnostic et lien avec la vermifugation.",
  "lang": "fr"
 },
 {
  "title": "Giardiasis en perros y gatos: contagio, diarrea y diagnóstico",
  "url": "glosario/giardiasis.html",
  "category": "Glosario",
  "keywords": "Qué es la giardiasis en perros y gatos, cómo se contagia por quistes de Giardia, signos como diarrea intermitente, diagnóstico y relevancia en la desparasitación.",
  "lang": "es"
 },
 {
  "title": "Glaucoma in dogs and cats: intraocular pressure, emergency and treatment",
  "url": "glosario/glaucoma-en.html",
  "category": "Glosario",
  "keywords": "What glaucoma is in dogs and cats: raised intraocular pressure that damages the optic nerve. Signs, why it is an emergency, tonometry and treatment.",
  "lang": "en"
 },
 {
  "title": "Glaucome chez le chien et le chat : pression intraoculaire, urgence et traitement",
  "url": "glosario/glaucoma-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que le glaucome chez le chien et le chat : hausse de la pression intraoculaire qui lèse le nerf optique. Signes, urgence, tonométrie et traitement.",
  "lang": "fr"
 },
 {
  "title": "Glaucoma en perros y gatos: presión intraocular, urgencia y tratamiento",
  "url": "glosario/glaucoma.html",
  "category": "Glosario",
  "keywords": "Qué es el glaucoma en perros y gatos: aumento de la presión intraocular que daña el nervio óptico. Signos, por qué es una urgencia, tonometría y tratamiento.",
  "lang": "es"
 },
 {
  "title": "Complete blood count (CBC) in pets: what it measures and what it is for",
  "url": "glosario/hemograma-en.html",
  "category": "Glosario",
  "keywords": "What the veterinary complete blood count (CBC) measures: red series, white series and platelets, what it reveals (anemia, infection, clotting) and how the sample is taken.",
  "lang": "en"
 },
 {
  "title": "Hémogramme (numération formule sanguine) vétérinaire : ce qu'il mesure et à quoi il sert",
  "url": "glosario/hemograma-fr.html",
  "category": "Glosario",
  "keywords": "Ce que mesure l'hémogramme (numération formule sanguine) vétérinaire : lignée rouge, lignée blanche et plaquettes, ce qu'il révèle (anémie, infection, coagulation) et comment le prélèvement se fait.",
  "lang": "fr"
 },
 {
  "title": "Hemograma (biometría hemática) veterinario: qué mide y para qué sirve",
  "url": "glosario/hemograma.html",
  "category": "Glosario",
  "keywords": "Qué es el hemograma (biometría hemática) veterinario: qué mide en serie roja, blanca y plaquetas, qué informa (anemia, infección, coagulación) y cómo se toma la muestra.",
  "lang": "es"
 },
 {
  "title": "Canine hypothyroidism: signs, diagnosis and the euthyroid sick confounder",
  "url": "glosario/hipotiroidismo-canino-en.html",
  "category": "Glosario",
  "keywords": "What canine hypothyroidism is, its signs (lethargy, weight gain, skin and coat disease), diagnosis with total T4, TSH and free T4, and the confounder of euthyroid sick syndrome (NTIS).",
  "lang": "en"
 },
 {
  "title": "Hypothyroïdie canine : signes, diagnostic et le confusant de l'euthyroïdien malade",
  "url": "glosario/hipotiroidismo-canino-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que l'hypothyroïdie canine, ses signes (léthargie, prise de poids, dermatopathies), le diagnostic par T4 totale, TSH et T4 libre, et le confusant du syndrome de l'euthyroïdien malade (NTIS).",
  "lang": "fr"
 },
 {
  "title": "Hipotiroidismo canino: signos, diagnóstico y el confusor del eutiroideo enfermo",
  "url": "glosario/hipotiroidismo-canino.html",
  "category": "Glosario",
  "keywords": "Qué es el hipotiroidismo canino, sus signos (letargia, aumento de peso, dermatopatías), diagnóstico con T4 total, TSH y T4 libre, y el confusor del síndrome del eutiroideo enfermo (NTIS).",
  "lang": "es"
 },
 {
  "title": "Leptospirosis in dogs: transmission, zoonosis, signs and prevention",
  "url": "glosario/leptospirosis-en.html",
  "category": "Glosario",
  "keywords": "What leptospirosis in dogs is: a bacterial infection caused by Leptospira, a zoonosis transmissible to people, spread through urine and contaminated water, its signs, diagnosis and prevention by vaccination and hygiene.",
  "lang": "en"
 },
 {
  "title": "Leptospirose chez le chien : contagion, zoonose, signes et prévention",
  "url": "glosario/leptospirosis-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que la leptospirose chez le chien : une infection bactérienne à Leptospira, une zoonose transmissible à l'humain, transmise par l'urine et l'eau contaminée, ses signes, le diagnostic et la prévention par la vaccination et l'hygiène.",
  "lang": "fr"
 },
 {
  "title": "Leptospirosis en perros: contagio, zoonosis, signos y prevención",
  "url": "glosario/leptospirosis.html",
  "category": "Glosario",
  "keywords": "Qué es la leptospirosis en perros: infección bacteriana por Leptospira, zoonosis transmisible a personas, contagio por orina y agua contaminada, signos, diagnóstico y prevención por vacunación e higiene.",
  "lang": "es"
 },
 {
  "title": "Feline leukemia (FeLV): contagion, diagnosis and its relevance in travel",
  "url": "glosario/leucemia-felina-en.html",
  "category": "Glosario",
  "keywords": "What feline leukemia (FeLV) is, how it spreads between cats, its consequences and why many destinations and pre-flight evaluations ask to rule it out before travel.",
  "lang": "en"
 },
 {
  "title": "Leucémie féline (FeLV) : contagion, diagnostic et sa pertinence en voyage",
  "url": "glosario/leucemia-felina-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que la leucémie féline (FeLV), comment elle se transmet entre chats, ses conséquences et pourquoi de nombreuses destinations et évaluations prévol demandent de l'écarter avant le voyage.",
  "lang": "fr"
 },
 {
  "title": "Leucemia felina (FeLV): contagio, diagnóstico y su relevancia en viajes",
  "url": "glosario/leucemia-felina.html",
  "category": "Glosario",
  "keywords": "Qué es la leucemia felina (FeLV), cómo se contagia entre gatos, qué consecuencias tiene y por qué muchos destinos y evaluaciones prevuelo piden descartarla antes de viajar.",
  "lang": "es"
 },
 {
  "title": "Feline hemotropic mycoplasmosis (infectious anemia): transmission, signs and diagnosis",
  "url": "glosario/micoplasmosis-hemotropica-en.html",
  "category": "Glosario",
  "keywords": "What feline hemotropic mycoplasmosis (feline infectious anemia) is: bacteria that parasitize red blood cells, transmission, signs, hemolytic anemia and PCR diagnosis in the feline evaluation.",
  "lang": "en"
 },
 {
  "title": "Mycoplasmose hémotrope féline (anémie infectieuse) : transmission, signes et diagnostic",
  "url": "glosario/micoplasmosis-hemotropica-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que la mycoplasmose hémotrope féline (anémie infectieuse féline) : bactéries qui parasitent les érythrocytes, transmission, signes, anémie hémolytique et diagnostic par PCR dans l'évaluation féline.",
  "lang": "fr"
 },
 {
  "title": "Micoplasmosis hemotrópica felina (anemia infecciosa): contagio, signos y diagnóstico",
  "url": "glosario/micoplasmosis-hemotropica.html",
  "category": "Glosario",
  "keywords": "Qué es la micoplasmosis hemotrópica felina (anemia infecciosa felina): bacterias que parasitan los eritrocitos, contagio, signos, anemia hemolítica y diagnóstico por PCR en la evaluación felina.",
  "lang": "es"
 },
 {
  "title": "Canine distemper: signs, phases and prevention through vaccination",
  "url": "glosario/moquillo-canino-en.html",
  "category": "Glosario",
  "keywords": "What canine distemper is: a highly contagious systemic viral infection caused by a Morbillivirus (CDV), its multisystemic signs, severity in puppies and prevention through core vaccination.",
  "lang": "en"
 },
 {
  "title": "Maladie de Carré (distemper) : signes, phases et prévention par la vaccination",
  "url": "glosario/moquillo-canino-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que la maladie de Carré (distemper) : une infection virale systémique très contagieuse due à un Morbillivirus (CDV), ses signes multisystémiques, sa gravité chez le chiot et sa prévention par la vaccination essentielle.",
  "lang": "fr"
 },
 {
  "title": "Moquillo canino (distemper): signos, fases y prevención por vacunación",
  "url": "glosario/moquillo-canino.html",
  "category": "Glosario",
  "keywords": "Qué es el moquillo canino (distemper): infección viral sistémica por Morbillivirus (CDV), signos multisistémicos, gravedad en cachorros y prevención por vacunación de núcleo.",
  "lang": "es"
 },
 {
  "title": "Otitis externa in dogs and cats: causes, signs and why it recurs",
  "url": "glosario/otitis-externa-en.html",
  "category": "Glosario",
  "keywords": "What otitis externa is in dogs and cats, its primary causes (allergy, foreign bodies, mites), perpetuating factors and why it recurs when the underlying cause is not treated.",
  "lang": "en"
 },
 {
  "title": "Otite externe chez le chien et le chat : causes, signes et pourquoi elle récidive",
  "url": "glosario/otitis-externa-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que l'otite externe chez le chien et le chat, ses causes primaires (allergie, corps étrangers, acariens), les facteurs perpétuants et pourquoi elle récidive si la cause n'est pas traitée.",
  "lang": "fr"
 },
 {
  "title": "Otitis externa en perros y gatos: causas, signos y por qué recurre",
  "url": "glosario/otitis-externa.html",
  "category": "Glosario",
  "keywords": "Qué es la otitis externa en perros y gatos, sus causas primarias (alergia, cuerpos extraños, ácaros), los factores perpetuantes y por qué recurre si no se trata la causa.",
  "lang": "es"
 },
 {
  "title": "Feline panleukopenia: contagion, signs, prevention by vaccination",
  "url": "glosario/panleucopenia-felina-en.html",
  "category": "Glosario",
  "keywords": "What feline panleukopenia is: feline parvovirus infection, highly contagious, clinical signs, severity in kittens, diagnosis and prevention by core vaccination.",
  "lang": "en"
 },
 {
  "title": "Panleucopénie féline : contagion, signes, prévention par vaccination",
  "url": "glosario/panleucopenia-felina-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que la panleucopénie féline : infection par le parvovirus félin, très contagieuse, signes, gravité chez les chatons, diagnostic et prévention par vaccination.",
  "lang": "fr"
 },
 {
  "title": "Panleucopenia felina: contagio, signos, prevención por vacunación",
  "url": "glosario/panleucopenia-felina.html",
  "category": "Glosario",
  "keywords": "Qué es la panleucopenia felina: infección por parvovirus felino, muy contagiosa, signos, gravedad en gatitos, diagnóstico y prevención por vacunación de núcleo.",
  "lang": "es"
 },
 {
  "title": "Canine parvovirus: symptoms, vaccine prevention and care",
  "url": "glosario/parvovirosis-canina-en.html",
  "category": "Glosario",
  "keywords": "What canine parvovirus infection is: symptoms (vomiting and bloody diarrhea), why it is an emergency, diagnosis by fecal antigen test and prevention through puppy vaccination.",
  "lang": "en"
 },
 {
  "title": "Parvovirose canine : symptômes, prévention par la vaccination et soins",
  "url": "glosario/parvovirosis-canina-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que la parvovirose canine : symptômes (vomissements et diarrhée sanglante), pourquoi c'est une urgence, diagnostic par test antigénique dans les selles et prévention par la vaccination des chiots.",
  "lang": "fr"
 },
 {
  "title": "Parvovirosis canina: síntomas, prevención por vacunación y cuidados",
  "url": "glosario/parvovirosis-canina.html",
  "category": "Glosario",
  "keywords": "Qué es la parvovirosis canina: síntomas (vómito y diarrea con sangre), por qué es una urgencia, diagnóstico por test de antígeno en heces y prevención por vacunación en cachorros.",
  "lang": "es"
 },
 {
  "title": "Brachycephalic syndrome (BOAS): what it is, flight risk and assessment",
  "url": "glosario/sindrome-braquicefalico-en.html",
  "category": "Glosario",
  "keywords": "What brachycephalic obstructive airway syndrome (BOAS) is, why it is critical for the air transport of snub-nosed breeds, and how flight fitness is assessed before export.",
  "lang": "en"
 },
 {
  "title": "Syndrome brachycéphale (BOAS) : définition, risque en vol et évaluation",
  "url": "glosario/sindrome-braquicefalico-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce que le syndrome obstructif des voies respiratoires brachycéphales (BOAS), pourquoi il est critique pour le transport aérien des races à museau court et comment évaluer l'aptitude au vol avant l'exportation.",
  "lang": "fr"
 },
 {
  "title": "Síndrome braquicefálico (BOAS): qué es, riesgo en vuelo y evaluación",
  "url": "glosario/sindrome-braquicefalico.html",
  "category": "Glosario",
  "keywords": "Qué es el síndrome braquicefálico (BOAS), por qué es crítico en el transporte aéreo de razas de hocico corto y cómo se evalúa la aptitud para volar antes de la exportación.",
  "lang": "es"
 },
 {
  "title": "Corneal ulcer in dogs and cats: emergency, signs and diagnosis",
  "url": "glosario/ulcera-corneal-en.html",
  "category": "Glosario",
  "keywords": "What is a corneal ulcer in dogs and cats, why it is an ophthalmic emergency, warning signs (blepharospasm, tearing, red eye) and diagnosis with fluorescein stain.",
  "lang": "en"
 },
 {
  "title": "Ulcère cornéen chez le chien et le chat : urgence, signes et diagnostic",
  "url": "glosario/ulcera-corneal-fr.html",
  "category": "Glosario",
  "keywords": "Qu'est-ce qu'un ulcère cornéen chez le chien et le chat, pourquoi c'est une urgence ophtalmologique, signes d'alerte (blépharospasme, larmoiement, œil rouge) et diagnostic à la fluorescéine.",
  "lang": "fr"
 },
 {
  "title": "Úlcera corneal en perros y gatos: urgencia, signos y diagnóstico",
  "url": "glosario/ulcera-corneal.html",
  "category": "Glosario",
  "keywords": "Qué es la úlcera corneal en perros y gatos, por qué es una urgencia oftalmológica, signos de alarma (blefaroespasmo, lagrimeo, ojo rojo) y diagnóstico con tinción de fluoresceína.",
  "lang": "es"
 }
];

// Filtramos la base de datos automáticamente según el idioma de la página anfitriona
(function() {
  const currentLang = (document.documentElement.lang || 'es').split('-')[0].toLowerCase();
  window.searchData = rawSearchData.filter(item => item.lang === currentLang || item.lang === 'any');
})();
