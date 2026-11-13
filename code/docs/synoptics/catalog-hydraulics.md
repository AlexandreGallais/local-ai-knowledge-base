---
id: synoptics-catalog-hydraulics
title: Hydraulic symbols catalog
topic: synoptics
summary: Fourteen hydraulic components with their ISO 1219-1 symbol, real working, states, property names and simple model.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S7, S8, S9, S10, S11, S12, S14, S32, S33, S34, S48, S49]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Hydraulic symbols catalog

Contents: 1. Pumps and motor · 2. Cylinder and valves · 3. Pressure and flow valves · 4. Storage and conditioning · 5. Servo valve and cooler · Sources

How to read a card: the symbol standard is ISO 1219-1 for the whole family, cited, never copied [S1]. A symbol shows ports, flow paths and function, never the construction; it is drawn at rest and can be rotated [S8]. Roles: P parameter, C command or setpoint, M measured, D fault, X derived. The property sets `drive`, `tank`, `onOffValve`, `modulatingValve` and `processPoint` are in `docs/synoptics/catalog-fluid-common.md`. A shape or a law without [Sn] is an analysis of the writer: check it on the standard the team owns.

## 1. Pumps and motor (hydraulic catalog)

### Fixed displacement pump (pompe à cylindrée fixe)

- Symbol: a circle with a filled triangle pointing outward, in the flow direction. [S49]
- Real working: the pump gives a flow; pressure comes only from the resistance downstream. It moves the same volume at each turn: gears, vanes, screws or pistons. [S10]
- States: `stopped`, `running`, plus `hasTripFault`.
- Properties: set `drive`; `displacementCm3` (number, cm³/rev, P); `flowRateLPerMin` (number, L/min, M); `outletPressureBar` (number, bar, M).
- Model: inputs speed and run order, output flow. `Q = displacement × n × volumetric efficiency`. The downstream network gives the pressure; the relief valve caps it.

### Variable displacement pump (pompe à cylindrée variable)

- Symbol: the pump symbol with an extra arrow across it for the adjustment. [S48]
- Real working: an inner part sets the volume per turn (swash plate angle, eccentricity). A pressure-compensated pump lowers its flow as the pressure nears its setting, down to zero. [S10]
- States: `stopped`, `running`, `standby` (pressure held, no flow), plus `hasTripFault`.
- Properties: set `drive`; `commandedDisplacementPercent`, `actualDisplacementPercent` (number, %, C and M); `pressureSetpointBar` (number, bar, C); `flowRateLPerMin` (number, L/min, M); `outletPressureBar` (number, bar, M).
- Model: `Q = x × maximum displacement × n`, with `x` from 0 to 1; with compensation, `x` falls to 0 as `p` reaches `pressureSetpointBar`.

### Hydraulic motor (moteur hydraulique)

- Symbol: a circle with a filled triangle pointing inward; two triangles for two directions of rotation. [S49]
- Real working: the motor turns a flow into rotation; its build is that of a pump. With a fixed displacement, speed follows the inlet flow and torque stays constant. [S12]
- States: `stopped`, `rotatingForward`, `rotatingReverse`, `stalled`.
- Properties: `actualSpeedRpm` (number, rpm, M); `rotationDirection` (enum `forward`, `reverse`, `none`; M); `inletPressureBar`, `outletPressureBar` (number, bar, M); `torqueNm` (number, N·m, X); `displacementCm3` (number, cm³/rev, P).
- Model: `n = Q / displacement`; `torque = Δp × displacement / (2π)`.

## 2. Cylinder and valves (hydraulic catalog)

### Hydraulic cylinder (vérin hydraulique)

- Symbol: a rectangle with a piston line; the return spring of a single-acting cylinder is shown. The same symbol serves in pneumatics. [S48] [S7]
- Real working: single-acting, the fluid pushes one way and a spring or gravity brings back; double-acting, the fluid acts on both sides, with a smaller area on the rod side, so a smaller force. [S12] [S14]
- States: `retracted`, `extending`, `extended`, `retracting`, `stopped`.
- Properties: `isExtended`, `isRetracted` (boolean, M); `actualPositionMm`, `commandedPositionMm` (number, mm, M and C); `capEndPressureBar`, `rodEndPressureBar` (number, bar, M); `strokeMm` (number, mm, P); `pistonAreaCm2`, `rodAreaCm2` (number, cm², P); `rodForceN` (number, N, X).
- Model: `F = p × A`, rod side area = piston area − rod area; `v = Q / A`; position = integral of `v`, bounded by 0 and `strokeMm`. [S14]

### Directional control valve (distributeur)

- Symbol: boxes side by side, one per position, with arrows for the paths; controls (solenoid, spring, lever) at the ends; drawn at rest; ports P, T, A, B. [S48] [S49] [S8]
- Real working: a spool slides in a body and lines up the ports. A four-port valve has two working positions and a center: it drives an actuator both ways. Manual, electric or pilot control. [S9]
- States: for a 4/3 valve, `center`, `positionA` (P to A, B to T), `positionB` (P to B, A to T), plus `hasSpoolFault`.
- Properties: `commandedSpoolPosition`, `actualSpoolPosition` (enum `center`, `a`, `b`; C and M); `isSolenoidAEnergized`, `isSolenoidBEnergized` (boolean, C); `centerType` (enum `closed`, `open`, `tandem`, `float`; P); `hasSpoolFault` (boolean, D).
- Model: each open path is an orifice, `Q = Kv × √(Δp / relative density)` [S33]; switching time ignored or a first-order delay.

### Check valve (clapet antiretour)

- Symbol: a ball on a V seat; a dashed pilot line for the pilot-operated version, "pilot to open" or "pilot to close". [S7]
- Real working: it opens in the free direction and closes in reverse, helped by a spring or gravity. [S9] A pilot pressure opens or closes the piloted version.
- States: `closed`, `open`, `pilotedOpen`.
- Properties: `isOpen` (boolean, X); `crackingPressureBar` (number, bar, P); `isPilotPressurized` (boolean, M, piloted version).
- Model: no flow if `Δp < crackingPressureBar` or if the flow is reversed; else an orifice. A public valve model has the same option. [S34]

## 3. Pressure and flow valves (hydraulic catalog)

### Pressure relief valve (limiteur de pression)

- Symbol: one box with a spring and an arrow offset from the line (closed at rest); the pilot line comes from the inlet. [S48]
- Real working: a spring holds the poppet closed; it lifts when the pressure passes the setting, sends fluid to return, and closes a little below the setting. A two-stage version chatters less. [S9]
- States: `closed`, `relieving`.
- Properties: `setPressureBar` (number, bar, P); `isRelieving` (boolean, X); `inletPressureBar` (number, bar, M).
- Model: `Q = K × max(0, p − setPressureBar)`. On the synoptic, the circuit pressure never passes the setting.

### Pressure reducing valve (réducteur de pression)

- Symbol: one box, a spring and an arrow in line with the flow (open at rest); the pilot line comes from the outlet.
- Real working: it holds a lower, steady outlet pressure whatever the inlet pressure or the load; spring, pilot or dome control. [S9]
- States: `regulating`, `fullyOpen` (inlet under the setting), `closed`.
- Properties: `outletPressureSetpointBar` (number, bar, C); `inletPressureBar`, `outletPressureBar` (number, bar, M).
- Model: `outlet pressure = min(inlet pressure, setpoint)`.

### Flow control valve (limiteur de débit)

- Symbol: a narrowing of the line; an arrow across it when adjustable; "pressure and temperature compensated" is a distinct symbol. [S48] [S7]
- Real working: a tapered needle enters a small seat and sets the flow finely, to slow a motion or protect an instrument. [S9]
- States: no discrete state; continuous opening.
- Properties: `openingPercent` (number, %, P or C); `flowRateLPerMin` (number, L/min, M).
- Model: `Q = Kv(opening) × √(Δp / relative density)` [S33]; compensated version: flow equal to its setting.

## 4. Storage and conditioning (hydraulic catalog)

### Accumulator (accumulateur)

- Symbol: a closed elongated shape split by a line between gas and fluid; bladder, piston and diaphragm types differ. [S48] [S7]
- Real working: it stores fluid under gas pressure, holds pressure during slow leaks, damps shocks, gives peak flow and backs up the supply. The gas, often nitrogen, is precharged. [S11]
- States: `empty`, `charging`, `charged`, `discharging`.
- Properties: `pressureBar` (number, bar, M); `prechargePressureBar` (number, bar, P); `gasVolumeL` (number, L, P); `oilVolumeL` (number, L, X); `hasLowPrechargeFault` (boolean, D).
- Model: gas `p × V^n = constant`, `n = 1` when slow, about 1.4 when fast; fluid volume = total volume − gas volume.

### Filter and strainer (filtre et crépine)

- Symbol: a diamond, the shape of conditioning devices, with lines across it for a filter. [S49] [S7]
- Real working: a strainer stops coarse particles, often at the pump suction; clogged, it starves the pump. A filter stops fine particles; a bypass valve opens when the element clogs; an indicator follows the differential pressure. [S11]
- States: `clean`, `clogging`, `bypassing`.
- Properties: `differentialPressureBar` (number, bar, M); `hasCloggedAlarm` (boolean, D); `isBypassing` (boolean, M); `cloggingPercent` (number, %, P, for fault injection).
- Model: `Δp = K(clogging) × Q²`; bypass open above a `Δp` threshold.

### Reservoir (réservoir hydraulique)

- Symbol: the standard tells an open reservoir from a closed one, vented or not [S48]; the exact shape is to check on the standard or the legend of the project.
- Real working: it keeps the fluid reserve, sheds heat, lets dirt settle and air escape; it has a vent, a level gauge and baffles; it is pressurized when the atmosphere cannot feed the pump. [S11]
- States: `low`, `normal`, `high`.
- Properties: set `tank`; `isPressurized` (boolean, P).
- Model: `dV/dt = inflow − outflow`; `level = V / area`.

## 5. Servo valve and cooler (hydraulic catalog)

### Servo valve (servovalve)

- Symbol: the directional valve symbol with two parallel lines along the boxes: continuously variable position. [S7]
- Real working: the spool moves in proportion to an electric signal and varies the flow from zero to maximum; a first stage (torque motor, flapper nozzle, jet) drives the second-stage spool; it often works in a closed loop. [S32] A proportional valve works alike (analysis).
- States: `null`, `flowingToA`, `flowingToB`, plus `hasValveFault`.
- Properties: `commandedSpoolPositionPercent`, `actualSpoolPositionPercent` (number, −100 to 100 %, C and M); `hasValveFault` (boolean, D).
- Model: `Q = Kv × u × √(Δp / relative density)` with `u` from −1 to 1 [S33]; first-order delay on `u`.

### Hydraulic oil cooler (refroidisseur d'huile)

- Symbol: a diamond with triangles: inside for heat removed, outside for the coolant, liquid or gas. [S49] [S7]
- Real working: it sends to water or air the heat that the circuit losses give to the oil (analysis from the name and the symbol).
- States: no discrete state.
- Properties: `inletTemperatureDegC`, `outletTemperatureDegC` (number, °C, M); `coolantFlowRateM3PerH` (number, m³/h, M).
- Model: first-order delay toward a target temperature; no exchange when the coolant flow is zero.

## Sources

- [S1] ISO, "ISO 1219-1:2012 Fluid power systems and components, Graphical symbols and circuit diagrams, Part 1", catalog page, <https://www.boutique.afnor.org/en-gb/standard/iso-121912012/fluid-power-systems-and-components-graphic-symbols-and-circuit-diagrams-par/xs104720/120728>, read 2026-11-12, all rights reserved, cited by reference.
- [S7] US Navy, "Fluid Power", NAVEDTRA 14105A, appendix "Graphic Symbols for Fluid Power Diagrams", <https://engineeringlibrary.org/reference/hydraulics-graphic-symbols-for-fluid-power-diagrams-navy>, read 2026-11-12, US government work, summarized.
- [S8] Same, chapter 12 "Basic Diagrams and Systems", <https://engineeringlibrary.org/reference/hydraulics-basic-diagrams-and-systems-navy>, read 2026-11-12, summarized.
- [S9] Same, chapter 6 "Valves", <https://engineeringlibrary.org/reference/hydraulic-valves-navy>, read 2026-11-12, summarized.
- [S10] Same, chapter 4 "Pumps", <https://engineeringlibrary.org/reference/hydraulic-pumps-navy>, read 2026-11-12, summarized.
- [S11] Same, chapter 9 "Reservoirs, Strainers, Filters, and Accumulators", <https://engineeringlibrary.org/reference/hydraulic-reservoirs-strainers-filters-accumulators-navy>, read 2026-11-12, summarized.
- [S12] Same, chapter 10 "Actuators", <https://engineeringlibrary.org/reference/hydraulic-actuators-navy>, read 2026-11-12, summarized.
- [S14] Same, chapter 2 "Forces in Liquids", <https://engineeringlibrary.org/reference/hydraulics-forces-in-liquids-navy>, read 2026-11-12, summarized.
- [S32] Wikipedia, "Electrohydraulic servo valve", <https://en.wikipedia.org/wiki/Electrohydraulic_servo_valve>, read 2026-11-12, CC BY-SA, summarized.
- [S33] Modelica Association, "Modelica.Fluid User's Guide, Valve characteristics", <https://doc.modelica.org/om/Modelica.Fluid.UsersGuide.ComponentDefinition.ValveCharacteristics.html>, read 2026-11-12, summarized.
- [S34] Modelica Association, "Modelica.Fluid.Valves", Modelica Standard Library 4.0.0, <https://doc.modelica.org/Modelica%204.0.0/Resources/helpDymola/Modelica_Fluid_Valves.html>, read 2026-11-12, summarized.
- [S48] STAUFF, "Correctly reading circuit symbols according to DIN ISO 1219", 2025-08-19, <https://stauff.co.uk/en/blog/products/correctly-reading-circuit-symbols-according-to-din-iso-1219>, read 2026-11-12, summarized.
- [S49] Carr Lane Manufacturing, "Hydraulic Symbols and How to Read Them", <https://www.carrlane.com/engineering-resources/technical-information/power-workholding/design-information/hydraulic-symbols-and-diagrams>, read 2026-11-12, summarized.
