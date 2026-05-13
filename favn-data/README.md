# Zoovet Travel — FAVN Case Repository

**Veterinaria Zoovet · Trujillo, Perú · zoovettravel.com**

---

## About this dataset

This repository contains **44 documented FAVN test results** processed by Veterinaria Zoovet through the Kansas State Veterinary Diagnostic Laboratory (KSVDL) between 2019 and 2026.

It is the only publicly accessible, structured FAVN case dataset from a Latin American veterinary operator in existence.

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
| Total case entries | 44 |
| Unique animals | 42 |
| PASS (≥ 0.5 IU/mL) | 39 |
| FAIL (< 0.5 IU/mL) | 5 |
| FAIL → PASS documented re-tests | 2 (DARKY, ALMA) |
| Years covered | 2019 – 2026 |
| Laboratory | KSVDL (Manhattan, Kansas, USA) |
| Destinations | Spain, Italy, United States, Germany, France, Portugal, Sweden |

---

## Documented FAIL → PASS recovery cases

### DARKY (cases R22-047695 → R22-061578)
- **Species:** Dog, Mixed Breed · **Microchip:** 991003001930072
- **First test (R22-047695):** Single vaccination (February 2, 2022), no booster. Serum drawn 5 months post-vaccination. Result: **0.22 IU/mL — FAIL**
- **Re-test (R22-061578):** Booster vaccination added. Result: **0.87 IU/mL — PASS**
- **Clinical lesson:** Single vaccination without booster yields insufficient titer at 5 months. Booster corrects this in the same animal.

### ALMA (cases R22-061576 → R22-072736)
- **Species:** Dog, Mixed Breed · **Microchip:** 991003001930075
- **First test (R22-061576):** Result: **< 0.20 IU/mL — FAIL** · Destination: Italy
- **Re-test (R22-072736):** After booster vaccination. Result: **1.15 IU/mL — PASS**
- **Clinical lesson:** Titer recovered from < 0.20 to 1.15 IU/mL — a > 5× increase. Confirms that a low initial titer does not indicate permanent biological failure to respond.

---

## Data structure (`index.json`)

Each case object contains:

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
  "veterinarian": "Jessica Ysabel Camacho García, MV"
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
4. OIE/WOAH Terrestrial Manual — Chapter on Rabies (current edition).
5. KSVDL FAVN Protocol: https://www.ksvdl.org/laboratories/rabies-laboratory/favn-test/

---

*Dataset maintained by Veterinaria Zoovet. Last updated: 2026. ATON (R26-013079) re-test result pending.*
