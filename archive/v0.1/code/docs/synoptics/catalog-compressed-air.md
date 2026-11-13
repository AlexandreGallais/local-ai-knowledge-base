---
id: synoptics-catalog-compressed-air
title: Compressed air symbols catalog
topic: synoptics
summary: Six compressed air components with pressure levels, symbol, real working, states, property names and simple model.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S3, S7, S9, S11, S13, S29, S48, S49]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Compressed air symbols catalog

Contents: 1. Pressure levels · 2. Production and storage · 3. Treatment · 4. Pressure and control · Sources

Symbol standards: ISO 1219-1 for pneumatic components [S1]; ISO 14617 for compressors [S2]; ASTM F1000 for ship piping, air flasks included [S3]. Cited, never copied. Roles and shared sets: `docs/synoptics/fluid-common.md`. A pneumatic cylinder uses the hydraulic cylinder card; the safety valve of an air receiver is in `catalog-piping-valves.md`; submarine air is in `catalog-ship-systems.md`.

## 1. Pressure levels (ship compressed air)

| Network | Nominal pressure | Use |
| --- | --- | --- |
| High pressure (HP) | 3,000 or 5,000 psi, about 207 or 345 bar | Above 1,000 psi; starting diesel engines and gas turbines |
| Medium pressure (MP) | 151 to 1,000 psi, about 10 to 69 bar | From an MP compressor or by reducing HP air |
| Low pressure (LP) | 150 psi and less, about 10 bar | The widest network on board |

Values of one navy, converted by the writer (1 psi ≈ 0.069 bar): a use, not a rule. Each project has its own. [S13]

## 2. Production and storage (compressed air catalog)

### Air compressor (compresseur d'air)

- Symbol: a circle with a triangle pointing outward, as a pump; an open triangle for air. [S1] [S2] [S49]
- Real working: it gives the air volume and pressure asked; a receiver in line smooths its pulses and lets it run unloaded when demand is low; coolers between stages and at the outlet remove some water. [S13] [S11]
- States: `stopped`, `loaded`, `unloaded`, plus `hasTripFault`.
- Properties: set `drive`; `isLoaded` (boolean, M); `dischargePressureBar` (number, bar, M); `dischargeTemperatureDegC` (number, °C, M); `cutInPressureBar`, `cutOutPressureBar` (number, bar, P).
- Model: constant flow when loaded, zero when unloaded; loads under `cutInPressureBar`, unloads above `cutOutPressureBar`.

### Air receiver and HP air flask (réservoir d'air et bouteille d'air haute pression)

- Symbol: ASTM F1000, figure of miscellaneous components, which covers flasks: a closed elongated shape. [S3]
- Real working: the receiver stores air for demand peaks; HP flasks add a high-pressure, high-flow reserve; receivers and flasks have low-point drains for water. [S13] [S11]
- States: `empty`, `low`, `normal`, `full`.
- Properties: `pressureBar` (number, bar, M); `volumeL` (number, L, P); `temperatureDegC` (number, °C, M); `hasLowPressureAlarm` (boolean, D); `isDrainOpen` (boolean, M).
- Model: ideal gas, `dp/dt = (mass inflow − mass outflow) × R × T / V`.

## 3. Treatment (compressed air catalog)

### Air dryer (sécheur d'air)

- Symbol: the diamond of conditioning devices; the navy list has a chemical dryer symbol. [S1] [S49] [S7]
- Real working: a refrigerated dryer passes air over a cold coil where water and oil condense; a desiccant dryer has two towers, one drying while the other regenerates with a reverse flow of hot dry air. Moisture corrodes, thins lubricants and freezes in cold weather. [S11] [S13]
- States: `stopped`, `drying`, `regenerating`, plus `hasDryerFault`.
- Properties: `isRunning` (boolean, M); `activeTower` (enum `a`, `b`; M, desiccant dryer); `outletDewPointDegC` (number, °C, M); `hasDryerFault` (boolean, D).
- Model: first-order delay of the outlet dew point toward a target; towers switch on a timer.

### Moisture separator and air filter (séparateur d'eau et filtre à air)

- Symbol: the diamond, with a mesh or a line for the element and a drain at the bottom. [S1] [S49]
- Real working: the separator removes liquid water; the filter stops solids (screens, porous elements, swirl chambers); low-point drains open at intervals. [S11] [S13]
- States: `clean`, `clogging`; drain `open` or `closed`.
- Properties: `differentialPressureBar` (number, bar, M); `hasCloggedAlarm` (boolean, D); `isDrainOpen` (boolean, M or C).
- Model: `Δp = K(clogging) × Q²`.

## 4. Pressure and control (compressed air catalog)

### Air pressure reducing station (poste de détente d'air)

- Symbol: ISO 1219-1 for the reducing valve (one box, spring, arrow in line, pilot from the outlet) [S1]; ASTM F1000 for its place in a piping diagram [S3].
- Real working: reducing stations lower HP air to a usable level; MP air can come from an HP flask bank through them; the valve holds a steady outlet pressure. [S13] [S9]
- States: `regulating`, `fullyOpen`, `closed`.
- Properties: `outletPressureSetpointBar` (number, bar, C); `inletPressureBar`, `outletPressureBar` (number, bar, M).
- Model: `outlet pressure = min(inlet pressure, setpoint)`.

### Pneumatic solenoid valve (électrovanne pneumatique)

- Symbol: boxes side by side with flow arrows, the coil at one end and the spring at the other; the navy list has an electric coil symbol. [S48] [S7]
- Real working: current in a coil pulls a plunger that opens or closes the passage; a spring returns it when the current stops; normally closed or normally open; direct or pilot-operated; a three-way valve links a port to supply or exhaust. [S29]
- States: `deenergized`, `energized`, plus `hasCoilFault`.
- Properties: `isEnergized` (boolean, C); `isOpen` (boolean, X or M); `normalPosition` (enum `normallyClosed`, `normallyOpen`; P); `hasCoilFault` (boolean, D).
- Model: on or off; response 5 to 150 ms by type, negligible on a synoptic; back to `normalPosition` when power fails. [S29]

## Sources

- [S1] ISO, "ISO 1219-1:2012 Fluid power systems and components, Graphical symbols and circuit diagrams, Part 1", catalog page, <https://www.boutique.afnor.org/en-gb/standard/iso-121912012/fluid-power-systems-and-components-graphic-symbols-and-circuit-diagrams-par/xs104720/120728>, read 2026-11-12, all rights reserved, cited by reference.
- [S2] Wikipedia, "ISO 14617", <https://en.wikipedia.org/wiki/ISO_14617>, read 2026-11-12, CC BY-SA, summarized.
- [S3] ASTM International, "F1000-21 Standard Practice for Piping System Drawing Symbols", 2021, <https://store.astm.org/f1000-21.html>, read 2026-11-12, all rights reserved, cited by reference.
- [S7] US Navy, "Fluid Power", NAVEDTRA 14105A, appendix "Graphic Symbols for Fluid Power Diagrams", <https://engineeringlibrary.org/reference/hydraulics-graphic-symbols-for-fluid-power-diagrams-navy>, read 2026-11-12, US government work, summarized.
- [S9] Same, chapter 6 "Valves", <https://engineeringlibrary.org/reference/hydraulic-valves-navy>, read 2026-11-12, summarized.
- [S11] Same, chapter 9, <https://engineeringlibrary.org/reference/hydraulic-reservoirs-strainers-filters-accumulators-navy>, read 2026-11-12, summarized.
- [S13] Same, chapter 11 "Pneumatics", <https://engineeringlibrary.org/reference/pneumatics-navy>, read 2026-11-12, summarized.
- [S29] Wikipedia, "Solenoid valve", <https://en.wikipedia.org/wiki/Solenoid_valve>, read 2026-11-12, CC BY-SA, summarized.
- [S48] STAUFF, "Correctly reading circuit symbols according to DIN ISO 1219", 2025-08-19, <https://stauff.co.uk/en/blog/products/correctly-reading-circuit-symbols-according-to-din-iso-1219>, read 2026-11-12, summarized.
- [S49] Carr Lane Manufacturing, "Hydraulic Symbols and How to Read Them", <https://www.carrlane.com/engineering-resources/technical-information/power-workholding/design-information/hydraulic-symbols-and-diagrams>, read 2026-11-12, summarized.
