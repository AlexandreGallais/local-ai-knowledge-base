---
id: synoptics-catalog-ship-equipment
title: Ship fluid equipment catalog
topic: synoptics
summary: Ten common ship fluid components, from pumps to steam trap, with symbol, real working, states, properties and model.
tool: none
version: "none"
checked: 2026-11-13
sources: [S2, S3, S4, S7, S14, S15, S18, S19, S20, S21, S22, S35, S36, S37, S40, S46]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Ship fluid equipment catalog

Contents: 1. Pumps and eductor · 2. Tanks and exchangers · 3. Treatment · 4. Sea chest and trap · Sources

Symbol standards: ASTM F1000 for ship piping [S3]; ISO 14617-9, -11 and -12 for pumps, exchangers and separators [S2]; ISO 10628-2 for process devices [S4]. Cited, never copied. Roles and shared sets: `docs/synoptics/fluid-common.md`. The circuits built from these parts are in `catalog-ship-circuits.md`.

## 1. Pumps and eductor (ship equipment catalog)

### Centrifugal pump (pompe centrifuge)

- Symbol: a circle with a tangent discharge; the motor is a second circle beside it. [S3] [S2]
- Real working: an impeller throws the liquid outward; pressure drops at the eye and draws liquid in; the volute turns speed into pressure; a check valve at the discharge stops reverse flow; it must be primed, and poor priming often explains no flow. [S15]
- States: `stopped`, `starting`, `running`, `stopping`, plus `hasTripFault`.
- Properties: sets `drive` and `controlMode`; `suctionPressureBar`, `dischargePressureBar` (number, bar, M); `flowRateM3PerH` (number, m³/h, M); `isPrimed` (boolean, X); `hasLowSuctionPressureAlarm` (boolean, D).
- Model: head-flow curve at rated speed, scaled by the affinity laws [S35] [S36] [S40]; the operating point is where it meets the network curve `Δp = K × Q²`.

### Positive displacement pump (pompe volumétrique)

- Symbol: the pump circle with an inner mark for the type, gear or screw. [S3] [S2]
- Real working: each turn moves a fixed volume, so a relief valve must protect the circuit; it suits viscous liquids at low speed; screw pumps serve fuel, lube oil and hydraulics. [S15]
- States: `stopped`, `running`, plus `hasTripFault`.
- Properties: sets `drive` and `controlMode`; `flowRateM3PerH` (number, m³/h, M); `dischargePressureBar` (number, bar, M); `isRelieving` (boolean, X).
- Model: `Q = k × speed`, whatever the pressure; the network gives the pressure, capped by the relief valve.

### Eductor (éjecteur)

- Symbol: a converging then diverging nozzle body with a side suction. [S3]
- Real working: no moving part; a fast jet of sea water lowers the pressure in a chamber and the atmosphere pushes the water to remove into it; used to drain bilges and compartments. [S15]
- States: `off`, `running`.
- Properties: `motivePressureBar` (number, bar, M); `isMotiveFlowOn` (boolean, X); `suctionFlowRateM3PerH` (number, m³/h, X or M).
- Model: suction flow = `k × motive flow` while the motive pressure is above a threshold; else zero.

## 2. Tanks and exchangers (ship equipment catalog)

### Ship tank (caisse)

- Symbol: a rectangle with a level line. [S4]
- Real working: heavy fuel storage tanks have heating coils; settling tanks let water and solids drop; the service tank feeds the engine; the lube oil sump tank sits in the double bottom under the engine. [S21] [S22]
- States: `empty`, `low`, `normal`, `high`, `overflow`.
- Properties: set `tank`; `contentType` (enum `fuelOil`, `lubeOil`, `seaWater`, `freshWater`, `bilgeWater`, `sludge`; P); `isHeatingOn` (boolean, C or M).
- Model: `dV/dt = inflows − outflows`; `level = V / area`; bottom pressure = liquid height × density × g. [S14] [S37]

### Plate heat exchanger (échangeur à plaques)

- Symbol: a rectangle or a circle crossed by a broken line. [S3] [S2]
- Real working: the central cooler is one or two large titanium plate exchangers where sea water cools the fresh water of the inner circuits; the lube oil cooler works with a thermostatic valve. [S20] [S22]
- States: no discrete state; `fouled` when fouled.
- Properties: `hotInletTemperatureDegC`, `hotOutletTemperatureDegC`, `coldInletTemperatureDegC`, `coldOutletTemperatureDegC` (number, °C, M); `differentialPressureBar` (number, bar, M).
- Model: hot outlet = hot inlet − effectiveness × (hot inlet − cold inlet); effectiveness zero when the cold flow is zero.

### Fuel heater (réchauffeur)

- Symbol: the exchanger symbol; the navy list marks heat input with triangles. [S4] [S7]
- Real working: before purification, a thermostatic heater brings heavy fuel to about 80 °C; before the engine, heaters bring the fuel to temperature under a viscosity controller. [S21]
- States: `off`, `heating`.
- Properties: `outletTemperatureDegC` (number, °C, M); `temperatureSetpointDegC` (number, °C, C); `isHeatingOn` (boolean, M).
- Model: first-order delay of the outlet temperature toward the setpoint while heating.

## 3. Treatment (ship equipment catalog)

### Centrifugal purifier (séparateur centrifuge)

- Symbol: a stylized bowl on a vertical shaft. [S4] [S2]
- Real working: the purifier removes water and solids from fuel; a clarifier follows; clean fuel goes to the service tank; on lube oil, a centrifuge cleans the oil in a loop. [S21] [S22]
- States: `stopped`, `running`, plus `hasSeparatorFault`.
- Properties: set `drive`; `inletTemperatureDegC` (number, °C, M); `throughputM3PerH` (number, m³/h, M); `hasSeparatorFault` (boolean, D).
- Model: constant throughput while running; water content falls with running time.

### Oily water separator (séparateur d'eaux mazouteuses)

- Symbol: a vessel with two outlets: water to sea, oil to the sludge tank. [S4]
- Real working: it separates oil from bilge water, mostly by gravity, with a coalescing second stage; a monitor measures the oil content; at 15 ppm or less, overboard discharge is allowed; above, an alarm sounds and a three-way valve sends the water back to a tank. [S18]
- States: `stopped`, `dischargingOverboard`, `recirculating`, plus `hasHighOilContentAlarm`.
- Properties: `isRunning` (boolean, M); `oilContentPpm` (number, ppm, M); `hasHighOilContentAlarm` (boolean, D); `isDischargingOverboard` (boolean, X).
- Model: if `oilContentPpm > 15`, alarm and recirculation [S18]; else discharge; the oil content is a scenario parameter.

## 4. Sea chest and trap (ship equipment catalog)

### Sea chest (prise d'eau de mer)

- Symbol: a rectangular box on the hull line, with a grid. [S3]
- Real working: a recess of the hull that holds the suction reserve of raw water circuits, engine cooling included; removable grids close it; baffles reduce the effect of speed and sea state. [S19]
- States: `clear`, `blocked`.
- Properties: `seaWaterTemperatureDegC` (number, °C, M); `hasBlockageAlarm` (boolean, D); the hull valve is a separate valve object.
- Model: an infinite source at the hydrostatic pressure of its depth. [S14]

### Steam trap (purgeur de vapeur)

- Symbol: a small circle or square on the drain line; a public plant data model has a class for it. [S4] [S46]
- Real working: mechanical (float, bucket), thermostatic (bellows, bimetal) or orifice types; a strainer sits just before each trap. [S15]
- States: `closed`, `discharging`, plus `hasTrapFault`.
- Properties: `isDischarging` (boolean, X); `hasTrapFault` (boolean, D).
- Model: discharges condensate as soon as there is some; stays closed on steam.

## Sources

- [S2] Wikipedia, "ISO 14617", <https://en.wikipedia.org/wiki/ISO_14617>, read 2026-11-12, CC BY-SA, summarized.
- [S3] ASTM International, "F1000-21 Standard Practice for Piping System Drawing Symbols", 2021, <https://store.astm.org/f1000-21.html>, read 2026-11-12, all rights reserved, cited by reference.
- [S4] ISO, "ISO 10628-2:2012 Graphical symbols", <https://standards.iteh.ai/catalog/standards/iso/8bc45867-650c-4d1c-b32f-726b336223ba/iso-10628-2-2012>, read 2026-11-12, all rights reserved, cited by reference.
- [S7] US Navy, "Fluid Power", NAVEDTRA 14105A, appendix "Graphic Symbols for Fluid Power Diagrams", <https://engineeringlibrary.org/reference/hydraulics-graphic-symbols-for-fluid-power-diagrams-navy>, read 2026-11-12, US government work, summarized.
- [S14] Same, chapter 2 "Forces in Liquids", <https://engineeringlibrary.org/reference/hydraulics-forces-in-liquids-navy>, read 2026-11-12, summarized.
- [S15] US Navy, "Pumps, Valves, and Piping", NAVEDTRA 14104A, chapter 9, <https://www.cedengineering.com/userfiles/Overview,%20Installation%20and%20Maintenance%20of%20Pumps,%20Valves%20and%20Piping.pdf>, read 2026-11-12, US government work, summarized.
- [S18] Wikipedia, "Oily water separator (marine)", <https://en.wikipedia.org/wiki/Oily_water_separator_(marine)>, read 2026-11-12, CC BY-SA, summarized.
- [S19] Wikipedia, "Sea chest (nautical)", <https://en.wikipedia.org/wiki/Sea_chest_(nautical)>, read 2026-11-12, CC BY-SA, summarized.
- [S20] Wärtsilä, "Encyclopedia of Marine and Energy Technology, Central Cooling Water System", <https://www.wartsila.com/encyclopedia/term/central-cooling-water-system>, read 2026-11-12, all rights reserved, summarized.
- [S21] Wärtsilä, "Encyclopedia of Marine and Energy Technology, Fuel oil system", <https://www.wartsila.com/encyclopedia/term/fuel-oil-system>, read 2026-11-12, all rights reserved, summarized.
- [S22] Wärtsilä, "Encyclopedia of Marine and Energy Technology, Main engine lubricating oil system", <https://www.wartsila.com/encyclopedia/term/main-engine-lubricating-oil-system>, read 2026-11-12, all rights reserved, summarized.
- [S35] Modelica Association, "Modelica.Fluid.Machines.BaseClasses.PartialPump", <https://doc.modelica.org/om/Modelica.Fluid.Machines.BaseClasses.PartialPump.html>, read 2026-11-12, summarized.
- [S36] Modelica Association, "PumpCharacteristics", <https://doc.modelica.org/om/Modelica.Fluid.Machines.BaseClasses.PumpCharacteristics.html>, read 2026-11-12, summarized.
- [S37] Modelica Association, "Modelica.Fluid.Vessels.OpenTank", <https://doc.modelica.org/om/Modelica.Fluid.Vessels.OpenTank.html>, read 2026-11-12, summarized.
- [S40] Wikipedia, "Affinity laws", <https://en.wikipedia.org/wiki/Affinity_laws>, read 2026-11-12, CC BY-SA, summarized.
- [S46] AixCAPE, "OIMEL, dexpi package, Piping", <https://cdi.aixcape.org/oimel/OIMEL/domain/dexpi/Piping/InlinePrimaryElement/index.html>, read 2026-11-12, summarized.
