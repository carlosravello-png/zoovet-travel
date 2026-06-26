# Verificación EE.UU. (entrada de mascotas) — pasada en vivo de Claude

> Ejecución del PROMPT MAESTRO para {DESTINO}=Estados Unidos.
> Verificado EN VIVO con Claude in Chrome contra fuentes oficiales (CDC). Fecha de verificación: **24 jun 2026**.
> Esta es la pasada de Claude. Falta cotejar con Grok y Perplexity. La fuente primaria es el árbitro.
> Estado: ✅ verificado en fuente oficial · ⏳ pendiente · ⚠️ conflicto/nota.

---

## A. Marco regulatorio vigente
- **Perros:** marco CDC de importación de perros, **vigente desde el 1 de agosto de 2024**. Los requisitos dependen del riesgo de rabia canina del país donde estuvo el perro en los últimos 6 meses. Fuente: https://www.cdc.gov/importation/dogs/index.html · verif. 24 jun 2026. `✅`
- **Aplica a perros, NO a gatos.** El marco CDC de perros es específico de perros. **Gatos:** sin requisito federal de vacuna antirrábica del CDC; pueden aplicar reglas de USDA/estado/aerolínea. ⏳ **PENDIENTE verificar** página CDC de gatos antes de publicar el detalle felino. `⏳`
- Además del CDC, aplican regulaciones de **USDA-APHIS** y del **estado de destino**. `✅` (CDC lo indica)

## B. Clasificación por país de ORIGEN — el binario
Fuente única: **CDC, "High-Risk Countries for Dog Rabies"**, https://www.cdc.gov/importation/dogs/high-risk-countries.html · página act. **15 abr 2026** · verif. 24 jun 2026. `✅`
Regla: si el país **está** en la lista → DIFÍCIL (protocolo completo). Si **no está** → FÁCIL (bajo riesgo / libre).

**DIFÍCIL (alto riesgo) — orígenes con tránsito real:** Perú, Brasil, Colombia, Ecuador, Bolivia, Venezuela, Guyana, Surinam, China (excl. Hong Kong/Macao/Taiwán), India, Filipinas, Tailandia, Vietnam, Indonesia, Malasia, Sudáfrica, Marruecos, Egipto, Emiratos Árabes Unidos, Catar, Arabia (no en lista—ver nota), Rusia, Ucrania, Turquía, Israel, Kazajistán, Nepal, Sri Lanka, Cuba, Rep. Dominicana, Guatemala, Honduras, El Salvador, Belice.
**FÁCIL (no en lista):** Argentina, Chile, Uruguay, Paraguay, México, Canadá, toda Europa occidental (España, Francia, Italia, Alemania, Reino Unido, Portugal, Países Bajos, Bélgica, Suiza, Irlanda…), Japón, Corea del Sur, Australia, Nueva Zelanda, Singapur, Hong Kong, Taiwán.

> ⚠️ **Nota crítica de contraste (oro para la guía):** **Uruguay y Paraguay entran FÁCIL a EE.UU. pero son alto riesgo para la UE (necesitan RNATT).** Argentina, Chile y México: fáciles para ambos. Perú, Brasil, Colombia, Ecuador, Bolivia, Venezuela: difíciles para ambos. La clasificación EE.UU. ≠ UE — error común que el AIO promedia mal.
> ⚠️ Arabia Saudí: confirmar en lista (no apareció textual en el barrido; reverificar celda). `⏳`

## C. Requisitos por especie
**Todos los perros (fácil y difícil):** parecer sanos · **mínimo 6 meses de edad** · **microchip ISO** (implantado ANTES de la vacuna antirrábica) · **CDC Dog Import Form** (recibo). Fuente: páginas CDC dogs · verif. 24 jun 2026. `✅`

**Perros de país de ALTO RIESGO con vacuna extranjera** (camino Perú/Brasil/LatAm). Fuente: https://www.cdc.gov/importation/dogs/foreign-vaccinated-high-risk-countries.html · act. 22 jul 2024 · verif. 24 jun 2026. `✅`
1. **Certification of Foreign Rabies Vaccination and Microchip form** — la llena el veterinario y la **endosa un veterinario oficial del gobierno** del país de salida. Se completa **≤30 días antes** del viaje; **válida 30 días**; un solo uso. `✅`
2. **Reporte de titulación serológica de rabia válido** de un **laboratorio aprobado por el CDC** (ver §E). `✅`
3. **Reserva en una instalación de cuidado animal registrada por el CDC (ACF)** — incluye examen + revacunación; **si NO hay titer válido, + cuarentena de 28 días** (acortable si se cumplen criterios). `✅`
4. **Itinerario que llegue por aire al aeropuerto donde está la ACF** (ver §D). Sin vuelos domésticos hasta completar servicios. `✅`
5. **Microchip** legible (antes de la vacuna). · Sano. · **≥6 meses.** · Documentos en inglés o traducción certificada. · **CDC Dog Import Form** (gratis). `✅`
- **Vacuna antirrábica:** primera dosis a las **≥12 semanas (84 días)**; administrada **≥28 días antes** de entrar; para alto riesgo, dosis antes de las 12 semanas **no se aceptan**. `✅`
- **Serología:** muestra extraída **≥30 días después** de la primera vacuna válida **y ≥28 días antes** de la entrada. Resultado válido **de por vida** si no hay lapso de vacunación y el lab sigue aprobado. `✅`

**Gatos:** ⏳ PENDIENTE (verificar página CDC de gatos; no asumir).

## D. Puntos de entrada autorizados (perros de alto riesgo)
**Solo estos 6 aeropuertos** (los únicos con ACF registrada). Fuente: https://www.cdc.gov/importation/dogs/approved-care-facilities.html · act. 8 may 2024 · verif. 24 jun 2026. `✅`
- **Atlanta (ATL)** — Dandie Scottie Kennel
- **Los Ángeles (LAX)** — Kennel Club LAX; Rue's Kennels @ LAX
- **Miami (MIA)** — Pet Limo
- **Nueva York (JFK)** — The ARK Pet Oasis · ⚠️ debe aterrizar en **JFK, no Newark ni LaGuardia**
- **Filadelfia (PHL)** — Gateway Animal Care Center
- **Washington DC (IAD)** — Pender Pet Retreat

## E. Laboratorios aprobados (serología)
Fuente: https://www.cdc.gov/importation/dogs/approved-labs.html · lista act. **12 ene 2026** (pág. 16 ene 2026) · verif. 24 jun 2026. `✅`
- **En EE.UU.:** Auburn University (College of Vet Medicine), **Kansas State University (KSVDL)**, University of Missouri (Vet Med Diagnostic Lab), DoD Food Analysis & Diagnostic Lab (solo personal DoD).
- **No hay laboratorio aprobado por el CDC en Perú** → la muestra debe ir a un lab aprobado fuera del país (p. ej. en Brasil: Núcleo de Pesquisas em Raiva/ICB-USP, **TECSA**, **TECPAR**; o a EE.UU.). `✅`
- ⚠️ **Transición:** labs retirados el 12 ene 2026 (Tabla 2) solo se aceptan si la muestra se extrajo **≤12 ene 2026** Y el perro entra **≤12 jul 2026**. Después, solo Tabla 1. (Relevante hoy: la fecha de corte 12 jul 2026 está a la vuelta.)

## F. Instalaciones ACF y COSTOS
- **Qué incluye la reserva:** examen + revacunación con vacuna antirrábica de licencia estadounidense; **+ 28 días de cuarentena si no hay titer válido**. `✅`
- **Costos:** el CDC **NO publica** tarifas — "todos los costos en la ACF son responsabilidad del importador; contacte a la instalación". `✅` (fuente CDC)
- ⏳ **PENDIENTE — barrido de costos por instalación** (su propia fuente publicada): ARK JFK, Kennel Club LAX, Rue's LAX, Pet Limo MIA, Gateway PHL, Pender IAD, Dandie Scottie ATL. **No inventar cifras** — extraer de cada operador o marcar "cotización por caso". (Siguiente pasada en vivo.)

## G. Agencias gubernamentales
- **CDC** — Importation (entrada / rabia). Dominio: cdc.gov/importation. Página perros: https://www.cdc.gov/importation/dogs/index.html `✅`
- **USDA-APHIS** — exportación/endoso y fines comerciales. aphis.usda.gov/pet-travel `✅`
- **CBP** (Customs and Border Protection) — control en el puerto de entrada. `✅`
- Regulaciones del **estado de destino** además de las federales. `✅`

## H. Costos oficiales de trámite
- **CDC Dog Import Form: GRATIS.** `✅` (fuente CDC)
- Certification of Foreign Rabies Vaccination form: costo = preguntar al veterinario (no publicado). `⏳`
- Serología: tarifa = según laboratorio (no publicada por CDC). `⏳`
- ACF: responsabilidad del importador (§F). `⏳`

---

## Dolores AIO-invulnerables priorizados (el hueso que se queda en el click)
1. **"¿Mi país entra fácil o difícil a EE.UU. con mi perro?"** — el binario con la **lista exacta** y el giro latinoamericano (Uruguay/Paraguay FÁCIL; Perú/Brasil/Colombia DIFÍCIL). El AIO lo promedia mal. *Moat: requiere la lista oficial cruzada.*
2. **"¿Por qué aeropuerto DEBO entrar?"** — solo 6 ACF; **JFK sí, Newark/LaGuardia no**. Operativo y exacto; el AIO no lo lista bien.
3. **"¿Cuánto cuesta la ACF / la cuarentena de 28 días?"** — costeado, por instalación; el AIO no tiene la cifra.
4. **"Si en mi país no hay lab aprobado, ¿a dónde mando la sangre?"** — Perú→fuera; labs exactos. Operativo.
5. **"El reloj exacto"** — microchip→vacuna→(≥30 días)→muestra→(≥28 días antes)→entrada. Un día mal = cuarentena. Alta ansiedad.
6. **"¿Y si no tengo el titer?"** — 28 días de cuarentena a tu costo. El miedo concreto.
7. **"¿Esto aplica a mi gato?"** — el matiz perros-sí / gatos-distinto (pendiente verificar) que casi nadie aclara.

## Meta descriptions sugeridas (ES, 140–160, al dolor verificable)
1. «¿Tu perro entra fácil o difícil a EE.UU.? Lista oficial CDC 2026, los 6 únicos aeropuertos autorizados y cómo evitar la cuarentena de 28 días.» *(respaldo: lista alto riesgo + ACF)*
2. «Llevar tu perro a EE.UU. desde un país de alto riesgo: solo 6 aeropuertos con instalación CDC, serología obligatoria o 28 días de cuarentena a tu costo. Guía 2026.» *(respaldo: foreign-vaccinated + ACF)*
3. «Importar tu perro a EE.UU. 2026: microchip, formulario CDC gratuito, y el reloj exacto de la serología que evita la cuarentena. Verificado vs CDC.» *(respaldo: requisitos + serología)*
4. «¿Vienes de Perú, Brasil o Colombia con tu perro a EE.UU.? Necesitas titulación en lab aprobado (no hay en Perú) y reserva en aeropuerto CDC. Guía verificada.» *(respaldo: labs + alto riesgo)*

## ACTUALIZACIÓN POST-COTEJO (24 jun 2026) — Grok + Perplexity + Claude vs CDC/APHIS

### Nuevo requisito verificado: GUSANO BARRENADOR (New World Screwworm / NWS) — USDA-APHIS
- Lo aportó Grok; **confirmado en fuente primaria** (lo había omitido mi 1ª pasada): perros de **países afectados por NWS** (incl. los que regresan) requieren un **certificado de salud firmado por un veterinario oficial del gobierno** del país de salida que (a) **confirme inspección de NWS dentro de los 5 días previos al viaje** y (b) confirme que el perro **no tiene infestación**. Fuentes: https://www.aphis.usda.gov/pet-travel/another-country-to-us-import/dogs/disease-status (act. 21 ene 2026) + PDF APHIS-26-006 "NWS: What You Need to Know" (feb 2026) https://www.aphis.usda.gov/sites/default/files/nws-traveler-guidance-cats-dogs.pdf · verif. 24 jun 2026. `✅`
- **México afectado desde el 22 nov 2024.** Sudamérica = zona endémica de NWS (Perú/Brasil/Colombia/Ecuador/Bolivia/Venezuela, etc.). ⏳ **Lista exacta de países afectados** = pendiente de la página de regiones APHIS (no asumir; alta probabilidad de que los orígenes sudamericanos estén dentro).
- **Gatos:** son susceptibles a NWS y **pueden ser rechazados si presentan signos**; el PDF cubre perros y gatos, pero el **requisito explícito del certificado de 5 días está redactado para PERROS**. ⚠️ No sobre-afirmar el certificado para gatos sin verificar.
- ✅ Confirmado que el "5 días" de Grok era correcto.

### GATOS — verificado (CDC), antes ⏳, ahora ✅
- **CDC NO exige prueba de vacuna antirrábica para gatos** (la recomienda). **No hay CDC Dog Import Form para gatos.** Deben **aparecer sanos**; sujetos a inspección; pueden ser rechazados si hay evidencia de enfermedad zoonótica. Fuente: https://www.cdc.gov/importation/bringing-an-animal-into-the-us/index.html · verif. 24 jun 2026. `✅`
- **Hawái y Guam:** cuarentena local obligatoria para TODOS los gatos (incluso desde el territorio continental de EE.UU.). `✅`
- Microchip para gatos: no exigido por CDC federal (puede pedirlo la aerolínea). + Screwworm (arriba) si vienen de zona afectada.

### Umbral de serología — aclaración
- El "**0,5 UI/mL**" que puso Grok es el estándar internacional FAVN/RFFIT, **pero las páginas del CDC que leí dicen "passing result / valid titer", no publican el número.** Regla: citar "**titer válido/aprobado de un lab aprobado por el CDC**"; si se usa el 0,5 UI/mL, atribuirlo al **estándar del laboratorio/WOAH**, no al CDC. ⚠️

### COSTOS — FUERA DE ALCANCE (regla nueva de Carlos, 24 jun)
- **El cluster NO publica costos/precios.** Se eliminan §F (costos ACF) y §H (costos de trámite) como datos publicables. Que el operador/viajero averigüe el dinero. (Esto, de paso, neutraliza la mayor fuente de alucinación: Grok inventó "$1,400 ARK / $3,900 Pender" **sin URL** — no se publican.)

### Veredicto del cotejo (Grok / Perplexity / Claude-vivo vs CDC-APHIS = árbitro)
- **Núcleo:** las 3 coinciden y CDC confirma. Firme.
- **Mi pasada en vivo = la más fiel en operativa:** la lista de ACF de Grok estaba mezclada (MIA/LAX/ATL mal, omitió PHL). La oficial del CDC (mi lista) manda.
- **Grok aportó valor real:** screwworm (verificado) + cita del Federal Register (Final Rule **2024-09676**, 13 may 2024, primaria — incorporada).
- **Grok metió ruido (descartado):** costos sin fuente; "AWB obligatorio en cabina" (fuente secundaria, no CDC); "gatos 16 semanas" (regla de aerolínea Delta, no CDC).
- **Conflicto resuelto:** México = FÁCIL (no está en la lista CDC de alto riesgo), no "difícil".
- ⏳ Resta: lista exacta de países NWS-afectados (APHIS regiones) · confirmar Arabia Saudí en lista alto riesgo.
