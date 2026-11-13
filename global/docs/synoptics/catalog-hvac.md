---
id: catalog-hvac
title: Ventilation and air conditioning catalog
topic: synoptics
summary: Seven ventilation and air conditioning components, fan to fan coil, with symbol, real working, states, properties and model.
tool: none
version: "none"
checked: 2026-11-13
sources: [S2, S3, S6, S23, S24, S25, S26, S27, S40]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Ventilation and air conditioning catalog

Contents: 1. Fan and dampers · 2. Chilled water · 3. Air units · Sources

Symbol standards: ASTM F856 for shipboard heating, ventilation and air conditioning [S6]; ISO 14617-8 for dampers and -9 for fans [S2]. The ship piping standard ASTM F1000 leaves ventilation out [S3]. Air flow in m³/h, air pressure in pascals. Roles and shared sets: `docs/synoptics/fluid-common.md`. Submarine ventilation has no public source in this base.

## 1. Fan and dampers (ventilation catalog)

### Fan (ventilateur)

- Symbol: a circle with a stylized propeller, or a circle with a tangent outlet for a centrifugal fan. [S6] [S2]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: it moves air in the ducts; in an air handling unit it is the supply fan, sometimes with a return fan; a variable speed drive sets the air flow. [S25]
- States: `stopped`, `starting`, `running`, `stopping`, plus `hasTripFault`.
- Properties: sets `drive` and `controlMode`; `airFlowRateM3PerH` (number, m³/h, M); `differentialPressurePa` (number, Pa, M).
- Model: pressure-flow curve at rated speed, scaled by the affinity laws: flow as speed, pressure as its square, power as its cube [S40]; network `Δp = K × Q²`.

### Damper (registre)

- Symbol: an oblique line in the duct, or parallel blades; the actuator is drawn above. [S6] [S2]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a valve or plate that stops or sets the air flow in a duct; by hand, or by an electric or pneumatic actuator from a controller; on-off or intermediate, some report their position; with a return spring it takes a set position when power fails. [S26]
- States: `closed`, `opening`, `open`, `closing`, `intermediate`, plus `hasPositionFault`.
- Properties: set `onOffValve` for on-off, set `modulatingValve` without `kvM3PerH` for control.
- Model: variable resistance `Δp = K(position) × Q²`; zero flow when closed; a ramp over `travelTimeS`.

### Fire damper (clapet coupe-feu)

- Symbol: the damper symbol marked as a fire damper by a letter or a thick line on the wall it crosses. [S6]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: it sits where a duct crosses a fire wall; a fusible element holds it open; heat melts the element and a spring closes it; a fire detection signal can close it too; it is tripped by hand to test it and reset by hand through a hatch; a smoke damper blocks smoke, a combination damper does both. [S27] [S26]
- States: `open`, `closed`, `trippedThermal`, plus `hasPositionFault`.
- Properties: `isOpen`, `isClosed` (boolean, M); `isCloseCommanded` (boolean, C); `isThermallyTripped` (boolean, M); `isResetRequired` (boolean, X); `hasPositionFault` (boolean, D).
- Model: open at start; closed on a close order or when the local temperature passes a threshold; after a thermal trip, closed until reset by hand.

## 2. Chilled water (ventilation catalog)

### Chiller (groupe froid)

- Symbol: an assembly rectangle with compressor, condenser and evaporator; four connections, chilled water supply and return, condenser water supply and return. [S6]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: it removes heat from a liquid, mostly water, by a vapor compression or absorption cycle; in compression, the expansion valve splits high and low pressure sides and meters the refrigerant, the evaporator absorbs heat, the compressor draws and compresses the vapor, the condenser makes it liquid again, a receiver stores the liquid; chilled water about 7 °C supply and 12 °C return; air or water cooled condenser. [S24] [S23]
- States: `stopped`, `starting`, `running`, plus `hasChillerFault`.
- Properties: sets `drive` and `controlMode`; `chilledWaterSetpointDegC` (number, °C, C); `chilledWaterSupplyTemperatureDegC`, `chilledWaterReturnTemperatureDegC` (number, °C, M); `capacityPercent` (number, %, M); `hasChillerFault`, `hasNoFlowFault` (boolean, D).
- Model: running, the supply temperature moves toward the setpoint with a first-order delay while the load stays under the capacity; stopped, it rises toward the return temperature; safety stop without water flow. [S24]

### Cooling and heating coil (batterie froide et batterie chaude)

- Symbol: a rectangle crossed by a diagonal in the duct, with a control valve on its water supply. [S6]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: the coil heats or cools the air with hot water, steam, chilled water or a direct expansion refrigerant; the cooling coil also dries the air; a motorized valve sets the water flow. [S25] [S24]
- States: those of its valve.
- Properties: valve, set `modulatingValve`; coil, `airInletTemperatureDegC`, `airOutletTemperatureDegC` (number, °C, M); `waterFlowRateM3PerH` (number, m³/h, M).
- Model: air outlet = air inlet − effectiveness × valve opening × (air inlet − water inlet); the same form for heating.

## 3. Air units (ventilation catalog)

### Air handling unit (centrale de traitement d'air)

- Symbol: a large rectangle crossed by the duct, with in order the damper, filter, coil and fan symbols. [S6]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a casing that conditions and moves air: mixing box and dampers (return, outside and exhaust air), filters, heating and cooling coils, humidifier, supply fan, sometimes heat recovery and silencers; control by drives, damper actuators, motorized coil valves and sensors; the filter pressure loss tells when to change them. [S25]
- States: `stopped`, `running`, plus `hasFilterCloggedAlarm`.
- Properties: one fan object, damper objects and valve objects; `supplyAirTemperatureDegC`, `returnAirTemperatureDegC` (number, °C, M); `supplyAirTemperatureSetpointDegC` (number, °C, C); `filterDifferentialPressurePa` (number, Pa, M); `hasFilterCloggedAlarm` (boolean, D); `outsideAirDamperPositionPercent` (number, %, M).
- Model: supply temperature = mix of return and outside air by damper position, then the coils by their valve opening, with a first-order delay.

### Fan coil unit (ventilo-convecteur)

- Symbol: a small local rectangle with a fan and a coil. [S6]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a small local unit with a filter, a coil and a fan, fed with chilled water from the chiller. [S25] [S24]
- States: `off`, `running`.
- Properties: `isRunCommanded`, `isRunning` (boolean, C and M); `fanSpeedLevel` (enum `off`, `low`, `medium`, `high`; C); `roomTemperatureDegC` (number, °C, M); `roomTemperatureSetpointDegC` (number, °C, C).
- Model: the room temperature moves toward the setpoint while the unit runs and chilled water is there.

## Sources

- [S2] Wikipedia, "ISO 14617", <https://en.wikipedia.org/wiki/ISO_14617>, read 2026-11-12, CC BY-SA, summarized.
- [S3] ASTM International, "F1000-21 Standard Practice for Piping System Drawing Symbols", 2021, <https://store.astm.org/f1000-21.html>, read 2026-11-12, all rights reserved, cited by reference.
- [S6] ASTM International, "F856-97(2022) Standard Practice for Mechanical Symbols, Shipboard, Heating, Ventilation, and Air Conditioning", <https://store.astm.org/f0856-97r22.html>, read 2026-11-12, all rights reserved, cited by reference.
- [S23] US Navy, "Fireman", NAVEDTRA 14104, chapter 10, page on refrigeration, <https://tpub.com/fireman/91.htm>, read 2026-11-12, US government work, summarized.
- [S24] Wikipedia, "Chiller", <https://en.wikipedia.org/wiki/Chiller>, read 2026-11-12, CC BY-SA, summarized.
- [S25] Wikipedia, "Air handler", <https://en.wikipedia.org/wiki/Air_handler>, read 2026-11-12, CC BY-SA, summarized.
- [S26] Wikipedia, "Damper (flow)", <https://en.wikipedia.org/wiki/Damper_(flow)>, read 2026-11-12, CC BY-SA, summarized.
- [S27] Wikipedia, "Fire damper", <https://en.wikipedia.org/wiki/Fire_damper>, read 2026-11-12, CC BY-SA, summarized.
- [S40] Wikipedia, "Affinity laws", <https://en.wikipedia.org/wiki/Affinity_laws>, read 2026-11-12, CC BY-SA, summarized.
