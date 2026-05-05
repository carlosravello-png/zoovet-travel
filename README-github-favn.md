# Zoovet Travel — Repositorio FAVN: Exámenes de Anticuerpos Antirrábicos

**Repositorio público de resultados FAVN procesados por Veterinaria Zoovet a través del Kansas State Veterinary Diagnostic Laboratory (KSVDL).**

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.19797479.svg)](https://doi.org/10.5281/zenodo.19797479)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0002--6837--5311-brightgreen)](https://orcid.org/0009-0002-6837-5311)

---

## Sobre este repositorio

Este repositorio contiene:
- **`index.json`** — Dataset estructurado de resultados FAVN (44 casos, 2019–2026)
- **PDFs originales** — Certificados de laboratorio KSVDL por año (R19–R26)

El dataset es la muestra documental activa del protocolo D1/D15/D30 Novibac Rabies diseñado y ejecutado por la Dra. Jessica Ysabel Camacho García, MV.

---

## Protocolo

| Día | Acción |
|-----|--------|
| D1  | Vacunación primaria — Novibac Rabies |
| D15 | Dosis de refuerzo |
| D30 | Extracción de sangre para prueba FAVN |

**Laboratorio:** Kansas State Veterinary Diagnostic Laboratory (KSVDL) — único laboratorio certificado OIE/WOAH en Norteamérica para serología de rabia en exportación de mascotas.

**Umbral aceptado:** ≥ 0.5 IU/mL (OIE/WOAH)

---

## Estadísticas de la muestra

- **44** resultados documentados (2019–2026)
- **39 PASS** — Tasa de seroconversión en primera extracción: **91,2%**
- **5 FAIL → PASS** — Tasa de recuperación post-refuerzo: **100%**
- **7 países de destino:** España, Italia, Francia, Alemania, Portugal, Suecia, Estados Unidos
- **42 animales únicos**

> La muestra supera el umbral N>30 que permite realizar inferencias estadísticas válidas bajo distribución normal (investigación clínica observacional longitudinal).

---

## Estructura del `index.json`

Cada caso contiene:

```json
{
  "id": 1,
  "case_id": "R19-058994",
  "microchip": "900079000687197",
  "animal_name": "DOMINIC",
  "species": "DOG",
  "breed": "PITBULL",
  "sex": "MALE",
  "age": "",
  "destination": "Spain",
  "favn_result_iu_ml": 3.46,
  "unit": "IU/mL",
  "result_status": "PASS",
  "serum_draw_date": "12/10/2019",
  "year": 2019,
  "lab": "KSVDL",
  "protocol": "Novibac Rabies D1/D15/D30",
  "submitting_clinic": "Veterinaria Zoovet",
  "veterinarian": "Jessica Ysabel Camacho García, MV"
}
```

---

## Autoría y atribución

**Responsable científica:** Dra. Jessica Ysabel Camacho García, MV  
ORCID: [0009-0002-6837-5311](https://orcid.org/0009-0002-6837-5311)  
Wikidata: [Q138881218](https://www.wikidata.org/wiki/Q138881218)  
CMP: 12434

**Gestión operativa y relación con KSVDL:** Carlos Eduardo Ravello Joo  
Director Comercial — Veterinaria Zoovet  
13 años de relación operativa con Kansas State Veterinary Diagnostic Laboratory

**Institución:** [Veterinaria Zoovet](https://zoovettravel.com) — Trujillo, La Libertad, Perú

---

## Cita formal

```
Camacho García, J.Y. et al. (2026). Zoovet Travel FAVN Case Repository —
Rabies antibody titer results, Trujillo Peru. Zenodo.
https://doi.org/10.5281/zenodo.19797479
```

---

## Recursos relacionados

- 📄 [Recurso técnico FAVN (ES)](https://zoovettravel.com/favn-es.html)
- 📄 [FAVN Technical Resource (EN)](https://zoovettravel.com/favn-en.html)
- 📄 [Ressource technique FAVN (FR)](https://zoovettravel.com/favn-fr.html)
- 🔬 [Dataset en Zenodo — DOI 10.5281/zenodo.19797479](https://doi.org/10.5281/zenodo.19797479)

---

## Licencia

[Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)

Puedes usar, compartir y adaptar este dataset citando a los autores.
