# Zoovet Travel — FAVN Case Repository

**Veterinaria Zoovet · Trujillo, Perú · zoovettravel.com**

---

## About this dataset

This repository contains **49 documented FAVN test results** processed by Veterinaria Zoovet through the Kansas State Veterinary Diagnostic Laboratory (KSVDL) between 2019 and 2026.

It constitutes, to the authors' knowledge and at the time of writing, one of the most complete publicly accessible, structured FAVN case datasets from a Latin American veterinary operator.

**Responsible veterinarian:** Jessica Ysabel Camacho García, MV  
**ORCID:** [0009-0002-6837-5311](https://orcid.org/0009-0002-6837-5311)  
**Wikidata:** [Q138881218](https://www.wikidata.org/wiki/Q138881218)  
**Submitting clinic:** Veterinaria Zoovet · Calle Cuba 241, Urb. El Recreo, Trujillo, La Libertad, Perú  
**Laboratory:** Kansas State Veterinary Diagnostic Laboratory (KSVDL) · OIE/WOAH-approved

---

## Vaccination protocol (Novibac Rabies D1/D15/D30)

All cases from 2024 onward were processed under the Zoovet Travel standard protocol:

| Day | Action |
|-----|--------|
| Day 1 | Primary vaccination — Novibac Rabies |
| Day 15 | Booster dose — anamnestic response window |
| Day 30 | Blood extraction for FAVN serology |

**Rationale:** The booster at Day 15 falls within the immunological window where memory B cells are fully primed. Blood extraction at Day 30 (15 days post-booster) captures the peak of the anamnestic response, maximizing the probability of achieving ≥ 0.5 IU/mL on first extraction.

---

## Dataset summary

| Metric | Value |
|--------|-------|
| Total case entries | 49 |
| Unique animals | 47 |
| PASS (≥ 0.5 IU/mL) | 46 |
| FAIL (< 0.5 IU/mL) | 3 |
| FAIL → PASS documented re-tests | 1 (ATON) |
| Years covered | 2019 – 2026 |
| Species | Dogs, Cats |
| Titre range | 0.20 – 6.01 IU/mL |
| Laboratory | KSVDL (Manhattan, Kansas, USA) |
| Destinations | Spain, Italy, United States, Germany, France, Portugal, Sweden |

---

## Documented FAIL → PASS recovery case

### ATON (cases R26-013079 → R26-030347)
- **Species:** Dog, Weimaraner · **Microchip:** 725093200213835
- **First test (R26-013079):** Under D1/D15/D30 protocol. Serum drawn February 4, 2026. Result: **0.22 IU/mL — FAIL**
- **Re-test (R26-030347):** Post-booster re-vaccination and extended serological window. Serum drawn April 4, 2026. Result: **≥ 3.46 IU/mL — PASS**
- **Delta:** 15.73× titer increase between extractions (58 days apart)
- **Clinical lesson:** Initial serological failure under a standard protocol does not indicate permanent biological inability to respond. A structured booster intervention produced a robust anamnestic response, confirming adequate immunological memory.

---

## Data structure (`index.json`)

Each case object contains core clinical fields plus a full **Dublin Core 15-element metadata block** for semantic interoperability and open data standards compliance.

```json
{
  "id": 1,
  "case_id": "R24-072480",
  "microchip": "900255202373259",
  "animal_name": "YING YANG",
  "species": "DOG",
  "breed": "SCHNAUZER",
  "sex": "MALE",
  "age": "7Y 4M",
  "destination": "Spain",
  "favn_result_iu_ml": 0.5,
  "unit": "IU/mL",
  "result_status": "PASS",
  "serum_draw_date": "07/20/2024",
  "year": 2024,
  "lab": "KSVDL",
  "protocol": "Novibac Rabies D1/D15/D30",
  "submitting_clinic": "Veterinaria Zoovet",
  "veterinarian": "Jessica Ysabel Camacho García, MV",
  "dublin_core": {
    "dc:title": "FAVN Serology Report — YING YANG · R24-072480 · PASS",
    "dc:creator": "Jessica Ysabel Camacho García, MV",
    "dc:subject": "FAVN; rabies neutralizing antibody titer; KSVDL; PASS; dog",
    "dc:description": "Dog, Schnauzer, Male, 7Y 4M. Result 0.5 IU/mL — at EU threshold of 0.50 IU/mL. PASS.",
    "dc:publisher": "Veterinaria Zoovet Travel · Calle Cuba 241, Trujillo, Perú",
    "dc:contributor": "",
    "dc:date": "2024-07-20",
    "dc:type": "Dataset; Laboratory Result; Clinical Record",
    "dc:format": "application/json; application/pdf",
    "dc:identifier": "R24-072480",
    "dc:source": "Kansas State Veterinary Diagnostic Laboratory (KSVDL)",
    "dc:language": "en",
    "dc:relation": "https://zenodo.org/records/19797479",
    "dc:coverage": "Trujillo, La Libertad, Perú — Destination: Spain",
    "dc:rights": "CC BY 4.0"
  }
}
```

---

## Scientific context

The FAVN (Fluorescent Antibody Virus Neutralization) test measures rabies virus neutralizing antibodies (RVNA) in blood serum. The internationally accepted threshold is **≥ 0.5 IU/mL**, established by OIE/WOAH Terrestrial Manual.

KSVDL is the only OIE/WOAH-approved laboratory in North America for FAVN testing for the general public and is EU-certified for rabies serology in pet travel.

**Key references:**
1. Wallace RM et al. (2017). Risk factors for inadequate antibody response to primary rabies vaccination in dogs. PMC5552338.
2. Langedijk AC et al. (2018). Rabies Antibody Response After Booster Immunization. DOI: 10.1093/cid/ciy518.
3. Moore SM et al. (2021). Challenges in rabies serology. PMC8402924.
4. Belanger JM et al. (2025). Factors associated with adequate rabies virus neutralizing antibody titers in dogs tested at a USDA-approved laboratory. *Preventive Veterinary Medicine*.
5. Chuquista-Alcarraz RP et al. (2023). Evaluación de la respuesta serológica a la vacuna antirrábica en caninos domésticos en Lima, Perú. *Revista de Investigaciones Veterinarias del Perú*.
6. McElhinney LM et al. (2026). Evaluation of rabies antibody responses in dogs vaccinated under accelerated immunisation protocols. *Vaccine*.
7. OIE/WOAH Terrestrial Manual — Chapter on Rabies (current edition). Chapter 8.14.
8. European Parliament. Regulation (EU) No 576/2013 on the non-commercial movement of pet animals.
9. KSVDL FAVN Protocol: https://www.ksvdl.org/laboratories/rabies-laboratory/favn-test/

---

## Version changelog

### Version 2 (May 2026)
- **Records added:** 8 new cases from March–April 2026 batch (R26-030347 through R26-030354); R26-030348 documented as two sub-reports covering two animals
- **Records corrected:** 4 records removed due to data integrity issues identified post-publication
- **Net total:** 49 records (41 validated from v1 + 8 new)
- **Dublin Core metadata:** All 49 records now carry a full 15-element Dublin Core block
- **FAIL→PASS documentation:** Revised to reflect the single validated case pair: ATON (R26-013079 / R26-030347)
- **PASS rate:** 93.9% (46/49)

### Version 1 (April 2026)
- Initial public release: 44 records, 2019–2025

---

*Dataset maintained by Veterinaria Zoovet. Last updated: May 2026.*
