---
id: catalog-pumps-valves-piping
title: "Equipment catalog: more pumps, valves and piping parts"
topic: synoptics
summary: "Cards of the multi-speed centrifugal pump, the attached pump, the two-way, four-way and isolation valves, the bypass damper, the pipe, the suction inlet, the reducer, the heat exchanger, the heater and the sprinkler head."
checked: 2026-11-13
sources: [S1, S2, S4, S5, S6, S7, S8, S22, S23, S24, S25, S26, S27, S28, S29, S30, S31, S32]
license: MIT, written for this base; facts summarized from the sources below
---

# Equipment catalog: more pumps, valves and piping parts

Contents: Pumps · Valves · Piping parts · Sources

These cards complete the fluid catalogs. The sets `drive`, `controlMode`, `processPoint`, `onOffValve`,
`modulatingValve` and `tank` are those of `fluid-common.md`. Roles: P parameter, C command, M measured,
D diagnostic, X computed by the model. Laws: `fluid-model-laws.md`. Where a source is missing, the card
says "reading of this base".

## Pumps

### Multi-speed centrifugal pump (pompe centrifuge à plusieurs vitesses)

- Symbol: the centrifugal pump of `catalog-ship-equipment.md`; write the step as text near it (`LOW`, `MED`, `HIGH`), never by colour alone.
- Subtypes: `speedStepCount` 1, 2 or 3.
- Real working: the speed of an induction motor depends on its pole count. A pole-changing motor rewires its winding to change speed; the Dahlander connection gives two speeds in a 1 to 2 ratio. Three speeds need a Dahlander winding plus a separate winding. Each speed has its contactors, interlocked by normally closed contacts. A public naval example: lube oil pumps with a stop-slow-fast local selector. [S5] [S7] [S8]
- States: `runState`, plus the step `none`, `low`, `medium`, `high`.
- Properties: sets `drive` and `controlMode`, properties of the centrifugal pump; `speedStepCount` (integer, P); `commandedSpeedStep`, `actualSpeedStep` (enum `none`, `low`, `medium`, `high`; C and M); `lowStepSpeedRpm`, `mediumStepSpeedRpm`, `highStepSpeedRpm` (number, rpm, P); `hasSpeedChangeFault` (boolean, D).
- Model: the speed reaches the step speed by a first-order lag; the curve follows the affinity laws. Reading of this base: a step change goes through a short dead time.

### Attached pump (pompe attelée)

- Symbol: the pump circle without a motor circle, joined by a mechanical link line to the shaft or gear that drives it. The public naval symbol list has no shaft coupling symbol. [S4]
- Subtypes: `pumpType` `centrifugal` or `positiveDisplacement`; with or without a disconnect coupling.
- Real working: a pump driven by the shaft, the gear or the engine, not by its own motor. A public plant has three lube oil pumps per engine room: two motor-driven, one driven by the main reduction gear, engaged by a lever on its coupling. Its flow follows the shaft speed; a relief valve returns the excess. The motor pumps feed when the shaft is stopped and help at low speed. A small boat engine drives its fresh water pump the same way. Also called shaft-driven or engine-driven pump. [S5] [S6]
- States: `stopped` (shaft stopped), `running`, `disengaged`.
- Properties: set `processPoint`; `pumpType` (enum, P); `driveShaftSpeedRpm` (number, rpm, M); `driveRatio` (number, P); `hasDisconnectCoupling` (boolean, P); `isCouplingEngaged` (boolean, M); `isCouplingEngageCommanded` (boolean, C); `actualSpeedRpm` (number, rpm, X); `flowRateM3PerH` (number, m³/h, M); `dischargePressureBar` (number, bar, M); `isRelieving` (boolean, X). No `isRunCommanded`: the pump has no run order.
- Model: pump speed = `driveRatio` × shaft speed when engaged, else zero. Positive displacement: `Q = k × speed`. Centrifugal: curve scaled by the affinity laws. The standby motor pump starts below a pressure limit.

## Valves

### Two-way valve (vanne 2 voies)

- Symbol: two triangles point to point; the actuator above; `NO` or `NC` as text. [S23]
- Subtypes: by body and by actuator.
- Real working: two ports, an inlet and an outlet; the closing member opens or shuts the way. Bodies and actuators: `catalog-piping-valves.md` and `catalog-actuated-valves.md`. [S2]
- States: those of `positionState`.
- Properties: set `onOffValve` or `modulatingValve`; `portCount` (integer, P, 2); `valveBodyType` (enum `gate`, `globe`, `ball`, `butterfly`, `needle`, `plug`; P); `actuatorType` (enum `manual`, `electric`, `hydraulic`, `pneumatic`, `solenoid`; P).
- Model: the model of its body.

### Four-way valve (vanne 4 voies)

- Symbol: in piping, the valve symbol with one more triangle than the three-way valve; in hydraulics, boxes side by side, two or three positions. [S4] [S23]
- Subtypes: `rotaryPlug` for piping; the spool version is the 4/2 or 4/3 directional control valve of `catalog-hydraulics.md`.
- Real working: a body with four ports. In the rotary form, a plug with two passages joins neighbouring ports two by two: two flow positions and often a closed centre. It reverses the flow in part of a circuit. In hydraulics: pressure in, return and two work ports drive an actuator both ways; at neutral the fluid stays locked in the actuator. [S1] [S2]
- States: `positionA`, `positionB`, `center`; position fault.
- Properties: `commandedPath`, `actualPath` (enum `a`, `b`, `center`, `unknown`; C and M); `hasCenterPosition` (boolean, P); `travelTimeS` (number, s, P); `hasPositionFault` (boolean, D).
- Model: reading of this base. In `a`, passages 1–2 and 3–4; in `b`, passages 1–4 and 2–3; in the centre, no flow. Each passage is an orifice of the Kv law.

### Isolation valve (vanne d'isolement)

- Symbol: that of its body, with `NO` or `NC` as text, and `LO` or `LC` when locked. [S22] [S23]
- Subtypes: `single`, `doubleBlock`, `doubleBlockAndBleed`.
- Real working: a function, not a build. It stops the fluid towards a place, for maintenance or safety, fully open or closed. Gate and ball valves seal well, globe and butterfly less. Hazardous lines put two in series with a bleed between. Critical valves are locked open or closed. Naval manuals say "stop valve". [S2] [S22]
- States: `open`, `closed`, `opening`, `closing`; locked.
- Properties: set `onOffValve`; `normalPosition` (enum `normallyOpen`, `normallyClosed`; P); `isolationArrangement` (enum of the subtypes; P); `lockState` (enum `unlocked`, `lockedOpen`, `lockedClosed`; M); `isBleedOpen` (boolean, M).
- Model: on-off; a locked valve refuses commands.

### Bypass damper (registre de dérivation)

- Symbol: the damper of `catalog-hvac.md`, on a duct that joins supply to return. ISO 14617-8 covers valves and dampers; not read. [S24]
- Subtypes: `barometric`, `motorized`.
- Real working: a bypass duct joins supply to return, after the coil and before the zone dampers. An automatic damper opens when zone dampers close, to lower the supply pressure, and stays shut when all zones are open. The barometric type is held shut by an adjustable weight. [S24]
- States: `closed`, `modulating`, `open`; position fault.
- Properties: set `modulatingValve` without `kvM3PerH`; `bypassDamperType` (enum, P); `supplyStaticPressurePa` (number, Pa, M); `staticPressureSetpointPa` (number, Pa, C); `bypassAirFlowRateM3PerH` (number, m³/h, X).
- Model: reading of this base. Opening proportional to the gap between supply pressure and setpoint, from 0 to 100; bypass flow = `K(position) × √Δp`.

## Piping parts

### Pipe (tuyau)

- Symbol: a line, thick for a main line, thin for a secondary one, an arrowhead for the direction; insulated, jacketed and flexible variants; two crossing lines that do not join get a break or a bridge. In hydraulics: work, pilot and drain lines. [S4] [S23]
- Subtypes: `lineType` `main`, `secondary`, `pilot`, `drain`, `flexible`, `insulated`, `jacketed`.
- Real working: a tube that carries a fluid, named by a nominal size (NPS or DN) and a wall schedule. The pressure loss grows with length, falls with diameter and follows the square of the velocity in turbulent flow. [S25] [S26]
- States: `empty`, `pressurized`, `flowing`.
- Properties: `contentType` (enum of the ship tank, P); `lineType` (enum, P); `nominalDiameterMm` (number, mm, P); `lengthM` (number, m, P); `isFlowing` (boolean, X); `flowDirection` (enum `forward`, `reverse`, `none`; X); `flowRateM3PerH` (number, m³/h, X); `pressureBar` (number, bar, X or M).
- Model: level 1, the pipe flows when an open path joins a source to a sink. Level 2, `Δp = K × Q²`, with no stored mass or energy, like a public static pipe model. [S27]

### Suction inlet (aspiration)

- Symbol: the end of a pipe in the tank or the well, with a strainer mark; follow the project legend.
- Subtypes: `bilgeSuction`, `emergencyBilgeSuction`, `tankSuction`; the sea chest has its own card.
- Real working: in a public rule, each bilge suction leaves a manifold through a stop-check valve and carries a strainer whose open area is at least three times the pipe area; a mud box or basket strainer sits between manifold and pump. A clogged strainer starves the pump. [S30]
- States: `submerged`, `uncovered`, `blocked`.
- Properties: `suctionType` (enum, P); `isSubmerged` (boolean, X); `isBlocked` (boolean, X); `cloggingPercent` (number, %, P, to inject a fault); `suctionHeightM` (number, m, P).
- Model: reading of this base. A node at the pressure of the tank bottom; no flow and a lost prime when the level falls below `suctionHeightM`; `Δp = K(clogging) × Q²`.

### Reducer (réduction)

- Symbol: a trapezium between two lines of different sizes, symmetric for concentric, one straight side for eccentric.
- Subtypes: `concentric`, `eccentric`.
- Real working: a fitting between two pipe sizes; mounted the other way it is an increaser. At a pump suction, put an eccentric one, flat side up on a horizontal liquid line, so air does not gather. A 2014 study argues a well-shaped concentric one gives a steadier inlet flow and still passes air. [S28] [S29]
- States: none.
- Properties: `reducerType` (enum, P); `inletDiameterMm`, `outletDiameterMm` (number, mm, P); `flatSidePosition` (enum `top`, `bottom`, `none`; P).
- Model: passive; a fixed loss coefficient added to the line.

### Heat exchanger (échangeur de chaleur)

- Symbol: the plate heat exchanger of `catalog-ship-equipment.md`; ISO 14617-11 covers heat exchange devices, not read.
- Subtypes: `exchangerType` `plate`, `shellAndTube`, `plateAndShell`, `doublePipe`, `finnedTube`; `flowArrangement` `parallel`, `counter`, `cross`.
- Real working: counter-flow is the most efficient; shell and tube serves high pressures and temperatures; fouling shows as a falling heat transfer coefficient. [S32]
- States: those of the plate heat exchanger.
- Properties: those of the plate heat exchanger; `exchangerType`, `flowArrangement` (enum, P); `foulingPercent` (number, %, P, to inject a fault).
- Model: the plate heat exchanger model, its transfer coefficient lowered by `foulingPercent`.

### Heater (réchauffeur de fluide)

- Symbol: the fuel heater of `catalog-ship-equipment.md`. The naval hydraulic symbol list marks with triangles whether heat goes in or out and whether the medium is liquid or gas. [S4]
- Subtypes: `heatingMedium` `steam`, `electric`, `hotWater`, `thermalOil`.
- Real working: the fuel heater card, for any heated fluid.
- States: those of the fuel heater.
- Properties: those of the fuel heater; `heatedFluid` (enum of `contentType`, P); `heatingMedium` (enum, P).
- Model: the fuel heater model.

### Sprinkler head (tête de sprinkleur)

- Symbol: a small circle on the line; the fire plan symbols of `catalog-fire-extinguishing.md` mark the section valve and the protected space.
- Subtypes: `sprinklerType` `glassBulb`, `fusibleLink`, `open`; `responseType` `standard`, `quick`.
- Real working: the head sprays water when a set temperature is passed; a glass bulb or a two-part fusible link holds it shut; each head opens on its own; open heads, with no sensing element, serve deluge systems only. Ordinary class 57 to 77 °C, orange or red bulb. A quick response head has a response time index of 50 or less. [S31]
- States: `closed`, `open`.
- Properties: `sprinklerType`, `responseType` (enum, P); `ratingDegC` (number, °C, P); `responseTimeS` (number, s, P); `isOpen` (boolean, X).
- Model: the element temperature follows the space with a first-order lag; the head opens, and stays open, at `ratingDegC`. Reading of this base: flow = `k × √pressure`.

## Sources

- [S1] Wikipedia, "Four-way valve", CC BY-SA 4.0.
- [S2] US Navy, "Fluid Power", NAVEDTRA 14105A, chapter 6 "Valves".
- [S4] US Navy, "Fluid Power", appendix "Graphic Symbols for Fluid Power Diagrams".
- [S5] US Navy, "Gas Turbine Systems Technician (Electrical/Mechanical) 3", volume 1, page 8-14.
- [S6] US Navy, Surface Warfare Officers School, "Small Boat Engines".
- [S7] Wikipedia, "Dahlander pole changing motor", CC BY-SA 4.0.
- [S8] Electrical Engineering Portal, pole-changing motor diagrams.
- [S22] Wikipedia, "Isolation valve", CC BY-SA 4.0.
- [S23] Tameson, "Valve Symbols in Process and Instrumentation Diagrams".
- [S24] Energy Code Ace, "F1.3 Identifying Zonally Controlled Systems in the Field", 2022.
- [S25] Wikipedia, "Pipe (fluid conveyance)", CC BY-SA 4.0.
- [S26] Wikipedia, "Darcy–Weisbach equation", CC BY-SA 4.0.
- [S27] Modelica Association, "Modelica.Fluid.Pipes.StaticPipe".
- [S28] Wikipedia, "Eccentric reducer", CC BY-SA 4.0.
- [S29] R. M. Mahaffey, S. J. van Vuuren, 2014, "Review of pump suction reducer selection", Journal of the South African Institution of Civil Engineering, 56(3).
- [S30] United States, 46 CFR 56.50-50 "Bilge and ballast piping".
- [S31] Wikipedia, "Fire sprinkler", CC BY-SA 4.0.
- [S32] Wikipedia, "Heat exchanger", CC BY-SA 4.0.
