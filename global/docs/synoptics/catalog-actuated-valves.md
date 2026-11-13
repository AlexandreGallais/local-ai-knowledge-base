---
id: catalog-actuated-valves
title: Actuated valves and piping parts catalog
topic: synoptics
summary: Motor, hydraulic, solenoid and control valves, three-way valve, strainers and manifold, with properties and simple model.
tool: none
version: "none"
checked: 2026-11-13
sources: [S3, S5, S15, S16, S18, S22, S28, S29, S30, S33, S34, S50]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Actuated valves and piping parts catalog

Contents: 1. Motor and hydraulic valves · 2. Solenoid and control valves · 3. Piping parts · Sources

Symbols: ASTM F1000, figure of valve accessories [S3], and ISA-5.1 for the actuator and instrument marks [S5]; cited, never copied. The valve body follows `catalog-piping-valves.md`. A motorized valve stays in place without power; a spring-return valve goes to its fail position: set `failPosition` on each valve. [S30]

## 1. Motor and hydraulic valves (actuated valves catalog)

### Motor-operated valve (vanne motorisée)

- Symbol: the valve symbol topped by a circle or a box; a letter marks the electric drive. [S3] [S5] [S50]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a motor drives the stem through a self-locking worm gear, so the valve does not drift; limit switches give the end positions; torque switches protect a blocked valve; a transmitter can return the position; without power it stays in place; remote operation with a position indicator. [S30] [S15]
- States: `closed`, `opening`, `open`, `closing`, `stopped`, plus `hasPositionFault`.
- Properties: sets `onOffValve` and `controlMode`; `actualPositionPercent` (number, %, M, with a transmitter); `hasTorqueFault`, `hasPowerFault` (boolean, D).
- Model: open, close or stop order; the position moves by `100 / travelTimeS` % per second while the order lasts; limit switches at 100 % and 0 %; without power, the position freezes.

### Hydraulically operated valve (vanne à commande hydraulique)

- Symbol: the valve symbol topped by a piston actuator; a letter marks the hydraulic drive. [S3] [S50]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: fluid pressure pushes a piston that moves the valve; a fail-safe position can be set. Public example: the ballast vent valves of a 1946 submarine are hydraulically operated, with a hand back-up. [S30] [S16]
- States: `closed`, `opening`, `open`, `closing`, plus `hasPositionFault`.
- Properties: sets `onOffValve` and `controlMode`; `isHydraulicPressureAvailable` (boolean, M); `isHandOperated` (boolean, M).
- Model: a ramp as the motor-operated valve; no motion without hydraulic pressure, except by hand; on pressure loss, it goes to `failPosition`.

## 2. Solenoid and control valves (actuated valves catalog)

### Solenoid valve (électrovanne)

- Symbol: the valve symbol topped by a box with the coil letter. [S3] [S5]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a coil pulls a plunger that opens or closes the passage; a spring returns it. Direct acting: simple, fast, power hungry. Pilot operated: the coil opens a small port and line pressure moves the diaphragm, which needs enough pressure difference. [S29]
- States: `deenergized`, `energized`, plus `hasCoilFault`.
- Properties: `isEnergized` (boolean, C); `isOpen` (boolean, X or M); `normalPosition` (enum `normallyClosed`, `normallyOpen`; P); `hasCoilFault` (boolean, D).
- Model: on or off, no travel time; back to `normalPosition` when power fails. [S29]

### Control valve and positioner (vanne de régulation et positionneur)

- Symbol: the valve symbol topped by a diaphragm actuator (half disk); the positioner is a small box next to the actuator. [S5] [S3]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: its opening follows the signal of a controller, acting on flow, so on pressure, temperature or level; the positioner compares the stem position with the command and corrects it despite friction and wear; a spring sends it open or closed when air fails; signals 4 to 20 mA or 3 to 15 psi. [S28]
- States: `closed`, `modulating`, `open`, `failSafe`, plus `hasPositionerFault`.
- Properties: sets `modulatingValve` and `controlMode`; `hasPositionerFault`, `hasAirSupplyFault` (boolean, D).
- Model: the position follows the command with a rise time [S34]; `Q = Kv × f(position) × √(Δp / relative density)` [S33]; on air loss, it goes to `failPosition`.

## 3. Piping parts (actuated valves catalog)

### Three-way valve (vanne trois voies)

- Symbol: the two-way valve with one more triangle: three triangles pointing to a common center. [S3] [S50]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: it splits or mixes two flows; the thermostatic valve of a lube oil circuit sets the temperature through the cooler [S22]; the three-way valve of an oily water separator sends off-spec water back to the tank [S18].
- States: `positionA`, `positionB`, `mixing`.
- Properties: `commandedPositionPercent`, `actualPositionPercent` (number, % toward port A, C and M); or `commandedPath`, `actualPath` (enum `a`, `b`) for an on-off version.
- Model: two coupled valves, opening `x` toward A and `1 − x` toward B; a thermostatic `x` follows the gap between measured and set temperature.

### Simplex and duplex strainer (filtre simple et filtre double)

- Symbol: a filter body with a dashed basket; two bodies and a change-over valve for the duplex. [S3]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: simplex, one element in a sump, cleaned by turning it against scrapers; duplex, two elements, one cleaned while the other stays in service. [S15]
- States: `clean`, `clogging`; duplex: element A or B in service.
- Properties: `differentialPressureBar` (number, bar, M); `hasCloggedAlarm` (boolean, D); `activeElement` (enum `a`, `b`; M, duplex).
- Model: `Δp = K(clogging) × Q²` on the element in service.

### Valve manifold (collecteur de vannes)

- Symbol: a row of valves on a common body. [S3]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: it takes suction from several sources and discharges to several destinations, for example to transfer fuel between tanks; suction valves are often stop-check valves, so that pumps do not lose their prime. [S15]
- States: those of each valve.
- Properties: one valve object per way (set `onOffValve`); `selectedSource`, `selectedDestination` (string, X).
- Model: one common node at one pressure; each way is an on-off valve.

## Sources

- [S3] ASTM International, "F1000-21 Standard Practice for Piping System Drawing Symbols", 2021, <https://store.astm.org/f1000-21.html>, read 2026-11-12, all rights reserved, cited by reference.
- [S5] International Society of Automation, "ANSI/ISA-5.1-2024, Instrumentation and Control, Symbols and Identification", <https://isa.org/standards-and-publications/isa-standards/isa-5-standard>, read 2026-11-12, all rights reserved, cited by reference.
- [S15] US Navy, "Pumps, Valves, and Piping", NAVEDTRA 14104A, chapter 9, <https://www.cedengineering.com/userfiles/Overview,%20Installation%20and%20Maintenance%20of%20Pumps,%20Valves%20and%20Piping.pdf>, read 2026-11-12, US government work, summarized.
- [S16] US Navy, Bureau of Naval Personnel, "The Fleet Type Submarine", 1946, chapter 4 "Tank Arrangements", <https://maritime.org/doc/fleetsub/chap4.php>, read 2026-11-12, US government work, summarized.
- [S18] Wikipedia, "Oily water separator (marine)", <https://en.wikipedia.org/wiki/Oily_water_separator_(marine)>, read 2026-11-12, CC BY-SA, summarized.
- [S22] Wärtsilä, "Encyclopedia of Marine and Energy Technology, Main engine lubricating oil system", <https://www.wartsila.com/encyclopedia/term/main-engine-lubricating-oil-system>, read 2026-11-12, all rights reserved, summarized.
- [S28] Wikipedia, "Control valve", <https://en.wikipedia.org/wiki/Control_valve>, read 2026-11-12, CC BY-SA, summarized.
- [S29] Wikipedia, "Solenoid valve", <https://en.wikipedia.org/wiki/Solenoid_valve>, read 2026-11-12, CC BY-SA, summarized.
- [S30] Wikipedia, "Valve actuator", <https://en.wikipedia.org/wiki/Valve_actuator>, read 2026-11-12, CC BY-SA, summarized.
- [S33] Modelica Association, "Modelica.Fluid User's Guide, Valve characteristics", <https://doc.modelica.org/om/Modelica.Fluid.UsersGuide.ComponentDefinition.ValveCharacteristics.html>, read 2026-11-12, summarized.
- [S34] Modelica Association, "Modelica.Fluid.Valves", Modelica Standard Library 4.0.0, <https://doc.modelica.org/Modelica%204.0.0/Resources/helpDymola/Modelica_Fluid_Valves.html>, read 2026-11-12, summarized.
- [S50] Tameson, "Valve Symbols in Process and Instrumentation Diagrams", <https://tameson.com/pages/valve-symbols-pid>, read 2026-11-12, summarized.
