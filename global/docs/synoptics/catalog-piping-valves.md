---
id: catalog-piping-valves
title: Piping valves catalog
topic: synoptics
summary: Eight hand and self-acting piping valves with symbol, real working, states, property names and simple model.
tool: none
version: "none"
checked: 2026-11-13
sources: [S2, S3, S4, S9, S15, S31, S33, S34, S50]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Piping valves catalog

Contents: 1. Symbol shape · 2. Isolation valves · 3. Fine and check valves · 4. Pressure valves · Sources

Actuated valves (motor, hydraulic, solenoid, control) and the three-way valve, strainers and manifold are in `catalog-actuated-valves.md`. Roles and shared sets: `docs/synoptics/fluid-common.md`. Laws: `docs/synoptics/fluid-model-laws.md`.

## 1. Symbol shape (piping valves)

- Standards, cited by reference: ASTM F1000 for ship piping [S3], ISO 14617-8 [S2], ISO 10628-2 [S4].
- A two-way valve is two triangles point to point; a three-way valve adds one triangle. [S50]
- An actuator is marked by a letter; project rule: draw the actuator above the valve. [S50]
- Write `NO` or `NC` as text for the normal state. Never use the fill as the only state code. [S50]
- The mark of each valve type changes between standards: follow the legend of the project.

## 2. Isolation valves (piping catalog)

### Gate valve (vanne à opercule)

- Symbol: two triangles point to point, with no mark or a vertical line at the center. [S3] [S2] [S50]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a wedge gate lifts out of the flow and leaves an opening almost equal to the pipe; used open or closed, never to throttle; handwheel. [S9] [S15]
- States: `closed`, `opening`, `open`, `closing`, plus `hasPositionFault`.
- Properties: set `onOffValve`; a hand valve without sensor keeps only `isOpen` (boolean, M), set by the operator or the instructor.
- Model: open, a small pressure loss proportional to flow; closed, zero flow or a set leak. [S34]

### Globe valve (robinet à soupape)

- Symbol: two triangles point to point with a filled disk at the center. [S3] [S2] [S50]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a disk closes on a seat and its position sets the flow; the most common stop valve on board, known by its inner build, not its outside. [S9] [S15]
- States: `closed`, `opening`, `open`, `closing`, `intermediate`.
- Properties: set `onOffValve` when it isolates, set `modulatingValve` when it throttles.
- Model: `Q = Kv × f(opening) × √(Δp / relative density)`. [S33]

### Ball valve (vanne à boisseau sphérique)

- Symbol: two triangles point to point with a circle at the center. [S3] [S2] [S50]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a bored ball turns a quarter turn, open or closed in 90 degrees; large sizes have a gearbox, easier but slower. [S9] [S15]
- States: `closed`, `opening`, `open`, `closing`.
- Properties: set `onOffValve`.
- Model: on or off, as the gate valve. [S34]

### Butterfly valve (vanne papillon)

- Symbol: a line with a tilted disk, or two triangles point to point with an oblique line. [S3] [S2] [S50]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a disk turns 90 degrees on a shaft; light, compact, fast, it can throttle; lever, or air, electric or hydraulic actuator on large sizes. [S9] [S15]
- States: `closed`, `opening`, `open`, `closing`, `intermediate`.
- Properties: set `onOffValve` or `modulatingValve`.
- Model: on or off [S34], or the Kv law when it throttles [S33].

## 3. Fine and check valves (piping catalog)

### Needle valve (vanne à pointeau)

- Symbol: two triangles point to point with an arrowhead at the center. [S3] [S50]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a long tapered point enters a small seat for a very fine flow setting; it protects delicate gauges and slows an end of travel. [S9]
- States: continuous opening.
- Properties: `openingPercent` (number, %, P or C).
- Model: `Q = Kv(opening) × √(Δp / relative density)`. [S33]

### Swing and lift check valve (clapet à battant et à levée)

- Symbol: two triangles point to point, one filled, or an arrow for the free direction. [S3] [S4] [S50]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: it passes one way and closes the other, with no command. Swing type: horizontal lines, low resistance. Lift type: where flow often reverses, no slam, more resistance. A stop-check valve isolates or checks, by the stem position. [S9] [S15]
- States: `closed`, `open`; stop-check valve also `shut`.
- Properties: `isOpen` (boolean, X); `crackingPressureBar` (number, bar, P); `isStemClosed` (boolean, C or M, stop-check valve).
- Model: zero flow in reverse; else an orifice. [S34]

## 4. Pressure valves (piping catalog)

### Safety and relief valve (soupape de sûreté et de décharge)

- Symbol: an angle valve with a spring above it. [S3] [S4]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a safety valve (gas, steam) pops fully open; a relief valve (liquid) opens with the overpressure; it lifts at a preset pressure and reseats when pressure falls; pilot and vacuum versions exist. [S31] [S15]
- States: `closed`, `lifted`.
- Properties: `setPressureBar` (number, bar, P); `isLifted` (boolean, M or X); `hasLiftedAlarm` (boolean, D).
- Model: safety valve, on or off with hysteresis; relief valve, `Q = K × max(0, p − setPressureBar)`.

### Pressure reducing valve (détendeur)

- Symbol: two triangles point to point with a diaphragm above, linked downstream. [S3] [S50]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: it holds a steady outlet pressure; the spring type opens fully if its diaphragm breaks. [S15] [S9]
- States: `regulating`, `fullyOpen`, `closed`, plus `hasDiaphragmFault`.
- Properties: `outletPressureSetpointBar` (number, bar, C); `inletPressureBar`, `outletPressureBar` (number, bar, M); `hasDiaphragmFault` (boolean, D).
- Model: `outlet pressure = min(inlet pressure, setpoint)`; with a diaphragm fault, outlet = inlet.

## Sources

- [S2] Wikipedia, "ISO 14617", <https://en.wikipedia.org/wiki/ISO_14617>, read 2026-11-12, CC BY-SA, summarized.
- [S3] ASTM International, "F1000-21 Standard Practice for Piping System Drawing Symbols", 2021, <https://store.astm.org/f1000-21.html>, read 2026-11-12, all rights reserved, cited by reference.
- [S4] ISO, "ISO 10628-2:2012 Diagrams for the chemical and petrochemical industry, Part 2: Graphical symbols", <https://standards.iteh.ai/catalog/standards/iso/8bc45867-650c-4d1c-b32f-726b336223ba/iso-10628-2-2012>, read 2026-11-12, all rights reserved, cited by reference.
- [S9] US Navy, "Fluid Power", NAVEDTRA 14105A, chapter 6 "Valves", <https://engineeringlibrary.org/reference/hydraulic-valves-navy>, read 2026-11-12, US government work, summarized.
- [S15] US Navy, "Pumps, Valves, and Piping", NAVEDTRA 14104A, chapter 9, <https://www.cedengineering.com/userfiles/Overview,%20Installation%20and%20Maintenance%20of%20Pumps,%20Valves%20and%20Piping.pdf>, read 2026-11-12, US government work, summarized.
- [S31] Wikipedia, "Safety valve", <https://en.wikipedia.org/wiki/Safety_valve>, read 2026-11-12, CC BY-SA, summarized.
- [S33] Modelica Association, "Modelica.Fluid User's Guide, Valve characteristics", <https://doc.modelica.org/om/Modelica.Fluid.UsersGuide.ComponentDefinition.ValveCharacteristics.html>, read 2026-11-12, summarized.
- [S34] Modelica Association, "Modelica.Fluid.Valves", Modelica Standard Library 4.0.0, <https://doc.modelica.org/Modelica%204.0.0/Resources/helpDymola/Modelica_Fluid_Valves.html>, read 2026-11-12, summarized.
- [S50] Tameson, "Valve Symbols in Process and Instrumentation Diagrams", <https://tameson.com/pages/valve-symbols-pid>, read 2026-11-12, summarized.
