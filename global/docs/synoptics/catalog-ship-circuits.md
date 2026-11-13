---
id: catalog-ship-circuits
title: Ship fluid circuits and submarine tanks catalog
topic: synoptics
summary: Five surface ship circuits and four public submarine ballast, trim and air cards, with properties and simple models.
tool: none
version: "none"
checked: 2026-11-13
sources: [S3, S15, S16, S17, S18, S19, S20, S21, S22, S52]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Ship fluid circuits and submarine tanks catalog

Contents: 1. Fuel and lube oil · 2. Cooling, bilge and ballast · 3. Submarine tanks · 4. Submarine air · Sources

The circuits are built from `catalog-ship-equipment.md` and the valve catalogs. Roles and shared sets: `docs/synoptics/fluid-common.md`. Potable water and steam have no public source in this base yet, except the steam trap.

## 1. Fuel and lube oil circuits (ship circuits catalog)

### Fuel oil system

French: circuit combustible.

- Role: receive, store, transfer and treat fuel, and feed the engines. [S21]
- Flow path: transfer from heated storage tanks through strainers to settling tanks; treatment through heater, purifier, clarifier and service tank; supply through feed pumps and flow meter, booster pumps, heaters, viscosity controller and final filter to the engine. [S21]
- Properties: `serviceTankLevelPercent` (number, %, M); `fuelSupplyPressureBar` (number, bar, M); `fuelTemperatureDegC` (number, °C, M); `fuelViscosityCst` (number, cSt, M); `hasLowFuelPressureAlarm` (boolean, D).
- Model: tank levels by volume balance; temperatures by first-order delay; supply pressure present when a pump runs and the path is open.

### Lubricating oil system

French: circuit d'huile de graissage.

- Role: feed oil to the engine bearings and cooling oil to the pistons. [S22]
- Flow path: sump tank, pump (two, one on standby), thermostatic valve and cooler, full-flow duplex filter, bearings and pistons, crankcase, back to the tank; in parallel a cleaning centrifuge and a make-up from a storage tank. [S22]
- Properties: `lubeOilPressureBar` (number, bar, M); `lubeOilTemperatureDegC` (number, °C, M); `sumpLevelPercent` (number, %, M); `filterDifferentialPressureBar` (number, bar, M); `hasLowLubeOilPressureAlarm` (boolean, D); `isStandbyPumpRunning` (boolean, M).
- Model: pressure from the running pump and the filter clogging; the standby pump starts under a pressure threshold; the thermostatic valve sets the temperature.

## 2. Cooling, bilge and ballast circuits (ship circuits catalog)

### Central cooling water system

French: refroidissement eau de mer et eau douce.

- Role: send the heat of engines and auxiliaries to the sea without sea water in the machines. [S20]
- Flow path: three subsystems: sea water (sea chest [S19], central cooler, overboard), low temperature fresh water (oil, charge air and jacket water coolers), high temperature fresh water (jackets, cylinder heads, exhaust valves); a fresh water generator uses the jacket water heat. [S20]
- Properties: `seaWaterInletTemperatureDegC`, `lowTemperatureWaterDegC`, `highTemperatureWaterDegC` (number, °C, M); `seaWaterPressureBar` (number, bar, M); `expansionTankLevelPercent` (number, %, M); `hasHighTemperatureWaterAlarm` (boolean, D).
- Model: each exchanger uses the effectiveness law; each fresh water loop warms with the engine load and cools with the exchange.

### Bilge system

French: assèchement.

- Role: remove the water that gathers at the lowest point of the ship, oily from machinery leaks, and treat it before discharge. [S18]
- Flow path: bilge wells, bilge pump or eductor [S15], oily water separator, oil content monitor, overboard or back to a tank, sludge tank. [S18]
- Properties: `bilgeWellLevelPercent` (number, %, M); `hasBilgeHighLevelAlarm` (boolean, D); `isOverboardValveOpen` (boolean, M); `sludgeTankLevelPercent` (number, %, M).
- Model: well level by volume balance with a set leak flow; alarm above a threshold.

### Ballast system

French: ballastage.

- Role: lower the center of gravity, correct trim and list, increase draft, spread hull loads; ballast water treatment by filtration and ultraviolet light, with a management plan and record book required since 2017. [S17]
- Flow path: sea chest, pumps, double-bottom and side ballast tanks, overboard; the public source gives neither piping nor valves. [S17]
- Properties: per tank, `levelPercent` (number, %, M) and `volumeM3` (number, m³, X); `ballastOperation` (enum `idle`, `filling`, `emptying`, `transferring`; C); `isTreatmentUnitRunning` (boolean, M).
- Model: volume balance per tank; pump flow shared between the tanks whose valve is open.

## 3. Submarine tanks (public level only)

Sources: a 1946 navy manual on "fleet type" submarines and two encyclopedia articles. Values are historical and describe no current vessel. [S16] [S17] [S52]

### Main ballast tank (ballast)

- Symbol: no public standard of its own; ASTM F1000 has a submarine figure limited to acoustic quieting parts [S3]. Proposed shape: a tank with a level line, a vent at the top and an opening at the bottom.
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: main ballast tanks are outside the pressure hull; full of water they cancel the positive buoyancy, empty they give it back; to dive, the vents at the top open, air goes out and water enters from below; to surface, the vents close and compressed air drives the water out from below. [S16] [S17]
- States: `empty`, `flooding`, `flooded`, `blowing`.
- Properties: `waterFillPercent` (number, %, X or M); `ballastState` (enum, X); plus the properties of its vent valve and its blow valve.
- Model: vent open, `waterFillPercent` rises to 100; vent closed and blow open, it falls to 0; else it holds. Two rate parameters.

### Vent valve (purge)

- Symbol: the hydraulically operated valve of `catalog-actuated-valves.md`.
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: vents are hydraulically operated valves with a hand back-up; emergency vents exist on most tanks; most main ballast tanks flood through free openings without a valve; other tanks have flood valves near the keel. [S16] Opening the vents lets water into the tank. [S52]
- States: `closed`, `opening`, `open`, `closing`, plus `hasPositionFault`.
- Properties: set `onOffValve`; `isHandOperated` (boolean, M); `isHydraulicPressureAvailable` (boolean, M).
- Model: a ramp over `travelTimeS`; no motion without hydraulic pressure, except by hand.

### Trim and depth control tanks (caisse d'assiette et régleur)

- Symbol: tank, pump and valve manifold cards.
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: forward and aft trim tanks balance the boat lengthwise by moving water between them; central tanks fine-tune weight against buoyancy; in the 1946 manual these variable tanks have no direct sea connection: water goes through a trim manifold and service air empties them. [S52] [S17] [S16]
- States: per tank `low`, `normal`, `high`; per operation `idle`, `pumpingForward`, `pumpingAft`, `flooding`, `pumpingToSea`.
- Properties: set `tank` per tank; `trimOperation` (enum; C); `transferFlowRateM3PerH` (number, m³/h, M); `transferredVolumeM3` (number, m³, X).
- Model: volume balance per tank; the pump flow leaves the source tank and joins the destination tank.

## 4. Submarine air (public level only)

### HP air bank and blowing (air haute pression et chasse)

- Symbol: the air flask card of `catalog-compressed-air.md` and a valve for the blow valve.
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a compressed air reserve, refilled by compressors, empties the ballast tanks to surface [S52]. In the 1946 manual: a 600 psi manifold (about 41 bar) blows the main ballast tanks; a 10 psi low pressure blower (about 0.7 bar) finishes on the surface; 3,000 psi air (about 207 bar) blows special tanks; 225 psi service air (about 15.5 bar) empties variable tanks. [S16]
- States: blow valve `closed`, `open`; air bank `low`, `normal`, `full`.
- Properties: `airBankPressureBar` (number, bar, M); `isBlowValveOpenCommanded` (boolean, C); `isBlowValveOpen` (boolean, M); `isBlowing` (boolean, X); `hasLowAirPressureAlarm` (boolean, D).
- Model: blowing lowers the bank pressure in proportion to the water volume blown out (ideal gas); no effect when the bank pressure is under the depth pressure.

## Sources

- [S3] ASTM International, "F1000-21 Standard Practice for Piping System Drawing Symbols", 2021, <https://store.astm.org/f1000-21.html>, read 2026-11-12, all rights reserved, cited by reference.
- [S15] US Navy, "Pumps, Valves, and Piping", NAVEDTRA 14104A, chapter 9, <https://www.cedengineering.com/userfiles/Overview,%20Installation%20and%20Maintenance%20of%20Pumps,%20Valves%20and%20Piping.pdf>, read 2026-11-12, US government work, summarized.
- [S16] US Navy, Bureau of Naval Personnel, "The Fleet Type Submarine", 1946, chapter 4 "Tank Arrangements", <https://maritime.org/doc/fleetsub/chap4.php>, read 2026-11-12, US government work, summarized.
- [S17] Wikipedia, "Ballast tank", <https://en.wikipedia.org/wiki/Ballast_tank>, read 2026-11-12, CC BY-SA, summarized.
- [S18] Wikipedia, "Oily water separator (marine)", <https://en.wikipedia.org/wiki/Oily_water_separator_(marine)>, read 2026-11-12, CC BY-SA, summarized.
- [S19] Wikipedia, "Sea chest (nautical)", <https://en.wikipedia.org/wiki/Sea_chest_(nautical)>, read 2026-11-12, CC BY-SA, summarized.
- [S20] Wärtsilä, "Encyclopedia of Marine and Energy Technology, Central Cooling Water System", <https://www.wartsila.com/encyclopedia/term/central-cooling-water-system>, read 2026-11-12, all rights reserved, summarized.
- [S21] Wärtsilä, "Encyclopedia of Marine and Energy Technology, Fuel oil system", <https://www.wartsila.com/encyclopedia/term/fuel-oil-system>, read 2026-11-12, all rights reserved, summarized.
- [S22] Wärtsilä, "Encyclopedia of Marine and Energy Technology, Main engine lubricating oil system", <https://www.wartsila.com/encyclopedia/term/main-engine-lubricating-oil-system>, read 2026-11-12, all rights reserved, summarized.
- [S52] Wikipédia, "Sous-marin", <https://fr.wikipedia.org/wiki/Sous-marin>, read 2026-11-12, CC BY-SA, summarized.
