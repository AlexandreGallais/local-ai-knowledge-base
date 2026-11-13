---
id: synoptics-catalog-electrical-power
title: Electrical generation and distribution catalog
topic: synoptics
summary: Generator set to converter, nine electrical cards with symbol, real working, states, property names and simple model.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S3, S6, S10, S11, S13, S14, S15, S17, S18, S21, S25, S61, S62, S63, S66, S67, S68, S69]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Electrical generation and distribution catalog

Contents: 1. Symbols · 2. Generation · 3. Switchboards · 4. Switching devices · 5. Transformer and converter · Sources

## 1. Symbols of the electrical catalog

- Electrical symbols come from IEC 60617, a paid database: no symbol was read for this base. "Usual shape" is an analysis: check it on the standard before drawing.
- In IEC practice a circuit breaker is a switching contact with one or more qualifier signs; the exact shape depends on the diagram type and the legend of the project. The old IEEE/ANSI 315-1975 is inactive but still in old drawings. [S69]
- On a fire control plan, the emergency generator, emergency battery and emergency switchboard have IMO symbols 2.34 to 2.36. [S1]
- Every card also takes the common inputs of `symbol-property-naming.md` (`health`, `controlLocation`, alarm priority and state). Switching devices use `switchPosition` with four values, as in IEC 61850. [S10]

## 2. Generation (electrical catalog)

### Generator set (groupe électrogène)

- Symbol: IEC 60617; usual shape, a circle marked "G" linked to its prime mover; fire plan symbol IMO 2.34. [S1]
- Real working: a diesel engine drives an alternator; a governor holds speed, so frequency; with 4 to 5 % droop, power follows the gap between speed and setpoint, and sets with the same droop share load by their rating; the power management system starts a second set when the first reaches 80 % of its capacity. [S21] [S17] [S11]
- States: `stopped`, `starting`, `running`, `connected`, `stopping`, plus `hasTripFault`.
- Properties: `isStartCommanded`, `isStopCommanded` (boolean, C); `isRunning` (boolean, M); `speedRpm`, `speedSetpointRpm` (number, rpm, M and C); `activePowerKw` (number, kW, M); `loadPercent` (number, %, M); `droopPercent` (number, %, P); `runTimeH` (number, h, M); `hasStartFault`, `hasOverspeedFault` (boolean, D); `startPriority` (integer, C).
- Model: start is a delay; speed is a first-order move to the setpoint; `P = Pn × (f0 − f) / (droop × fn)`; motion `J dω/dt = Tm − Te`. [S18] Public names: Signal K `propulsion.*`, IEC 61850 ZGEN. [S2] [S6]

### Alternator (alternateur)

- Symbol: IEC 60617; usual shape, a circle marked "G" with the alternating current sign.
- Real working: a rotating field induces an alternating voltage in the stator; frequency depends on speed and poles (2 poles at 3,000 rpm give 50 Hz); the automatic voltage regulator sets the excitation to hold voltage and to share reactive power. [S63]
- States: `deExcited`, `excited`, `regulating`, plus `hasAvrFault`.
- Properties: `voltageV`, `voltageSetpointV` (number, V, M and C); `currentA`, `excitationCurrentA` (number, A, M); `frequencyHz` (number, Hz, M); `activePowerKw` (number, kW, M); `reactivePowerKvar` (number, kvar, M); `powerFactorRatio` (number, 0 to 1, M); `windingTemperatureDegC` (number, °C, M); `hasAvrFault` (boolean, D).
- Model: voltage is a first-order move to the setpoint, with a dip at a load step; frequency = poles × rpm / 120. Public names: Signal K `electrical.ac.*`, IEC 61850 MMXU. [S2] [S6]

## 3. Switchboards (electrical catalog)

### Main switchboard (tableau principal)

- Symbol: IEC 60617; on a single-line diagram, a thick busbar line with the feeders on it.
- Real working: it takes the main generator sets and distributes power; rules ask for two main sets at least and a switchboard placed so that a casualty hits only its own space; the power management system starts and stops sets, synchronizes, shares load, sheds load, restores after a blackout and blocks large consumers. [S25] [S11]
- States: `dead`, `energized`, `overloaded`.
- Properties: `isEnergized` (boolean, M); `busVoltageV` (number, V, M); `busFrequencyHz` (number, Hz, M); `totalLoadKw`, `availablePowerKw` (number, kW, M); `isBusTieClosed` (boolean, M); `hasEarthFault`, `hasBlackout` (boolean, D).
- Model: power produced = power consumed; no closed source on the busbar, zero voltage (blackout).

### Emergency switchboard and emergency source (tableau de secours et source de secours)

- Symbol: fire plan symbols IMO 2.34 (generator), 2.35 (battery), 2.36 (switchboard) [S1]; IEC 60617 on the electrical diagram.
- Real working: the emergency source is independent, above the bulkhead deck, outside machinery spaces: a battery or a set with its own fuel, starting automatically on new ships; a transitional battery holds half an hour for emergency lighting, watertight doors and alarms [S25]. One secondary course gives 45 seconds at most to take the required services (single source). [S66]
- States: `fedFromMain`, `blackout`, `emergencyStarting`, `fedFromEmergency`.
- Properties: `supplyState` (enum, M); `isFedFromMain`, `isFedFromEmergency`, `isInterconnectorClosed`, `isTransitionalSourceActive` (boolean, M); `emergencyStartDelayS` (number, s, P); `busVoltageV` (number, V, M); `hasEmergencyStartFault` (boolean, D).
- Model: loss of main supply, start delay, emergency breaker closes, emergency services fed. French official terms: [S68].

## 4. Switching devices (electrical catalog)

### Circuit breaker (disjoncteur)

- Symbol: IEC 60617, a switching contact with a qualifier sign [S69]; usual shape, an oblique open contact with a cross at its end.
- Real working: it cuts the current on overcurrent and can be reset, unlike a fuse; a bimetal reacts to long overloads, a solenoid to high currents; a spring or air parts the contacts and the arc is quenched in air, oil, SF6 or vacuum; after a fault trip it must be reset before closing. [S13]
- States: `switchPosition` `intermediate`, `open`, `closed`, `bad` (bad only when the auxiliary contacts disagree), plus `isTripped`. [S10]
- Properties: `switchPosition` (enum, M); `isClosed`, `isTripped`, `isCloseBlocked` (boolean, M); `isCloseCommanded`, `isOpenCommanded`, `isResetCommanded` (boolean, C); `tripCause` (enum `overload`, `shortCircuit`, `undervoltage`, `external`; M); `currentA` (number, A, M); `ratedCurrentA` (number, A, P); `isNormallyOpen` (boolean, P); `operationCount` (integer, M).
- Model: ideal switch with an operating delay; trips when the current passes a threshold for a time; stays tripped until reset. Public names: IEC 61850 XCBR and CSWI, CIM `Switch.normalOpen`. [S6] [S10] [S67]

### Contactor (contacteur)

- Symbol: IEC 60617; usual shape, a contact with a half circle and a rectangular coil.
- Real working: a switch driven by a coil, for heavy currents (motors, lighting, heating), not made to cut a short circuit; the coil pulls a core that closes the contacts, a spring opens them; with an overload relay it makes a motor starter. [S14]
- States: `open`, `closed`, plus `hasWeldedContactFault`.
- Properties: `isClosed`, `isCoilEnergized`, `isAuxiliaryContactClosed` (boolean, M); `isCloseCommanded` (boolean, C); `hasWeldedContactFault` (boolean, D); `operationCount` (integer, M).
- Model: follows the command with a short delay; opens when the control voltage disappears.

### Disconnector (sectionneur)

- Symbol: IEC 60617; usual shape, a contact with a short perpendicular line at its end.
- Real working: it isolates a circuit visibly for maintenance; it cannot quench an arc and opens only after another device has cut the current; often paired with an earthing switch, with interlocks on the order of operations. [S15]
- States: `switchPosition` `open`, `closed`, `intermediate`, `bad`, plus `isEarthed`.
- Properties: `switchPosition` (enum, M); `isClosed`, `isEarthed`, `isLocked`, `isOperationAllowed` (boolean, M); `isCloseCommanded`, `isOpenCommanded` (boolean, C); `hasInterlockViolation` (boolean, D).
- Model: a slow ideal switch; the operation is refused, or raises a fault, while the linked breaker is closed. Public names: IEC 61850 XSWI and CILO. [S6]

## 5. Transformer and converter (electrical catalog)

### Power transformer (transformateur de puissance)

- Symbol: IEC 60617; usual shape, two overlapping circles or two windings face to face.
- Real working: a varying current in one winding makes a flux in the core that induces a voltage in the other; the voltage ratio equals the turns ratio; copper and iron losses, a high inrush current at energizing, galvanic isolation. [S61]
- States: `deEnergized`, `energized`, `overloaded`.
- Properties: `isEnergized` (boolean, M); `primaryVoltageV`, `secondaryVoltageV` (number, V, M); `turnsRatio` (number, P); `loadPercent` (number, %, M); `windingTemperatureDegC` (number, °C, M); `tapPosition` (integer, M); `hasOvertemperatureFault` (boolean, D).
- Model: `V2 = V1 × N2 / N1`; constant efficiency; inrush ignored or a short peak. Public names: IEC 61850 YPTR, YLTC. [S6]

### Power converter (convertisseur)

- Symbol: IEC 60617; usual shape, a square crossed by a diagonal, with the input sign on one side and the output sign on the other.
- Real working: rectifier (AC to DC), inverter (DC to AC), chopper (DC to DC), AC to AC converter changing voltage or frequency; a drive sets the speed of an induction motor; switching injects harmonics to filter. [S62]
- States: `off`, `starting`, `running`, `currentLimited`, plus `hasConverterFault`.
- Properties: `converterType` (enum `rectifier`, `inverter`, `dcDc`, `frequencyConverter`; P); `isStartCommanded`, `isStopCommanded` (boolean, C); `isRunning` (boolean, M); `inputVoltageV`, `outputVoltageV` (number, V, M); `outputFrequencyHz`, `outputFrequencySetpointHz` (number, Hz, M and C); `outputCurrentA` (number, A, M); `loadPercent` (number, %, M); `hasConverterFault` (boolean, D).
- Model: output = setpoint through a ramp; constant efficiency; current limit. Public names: IEC 61850 ZCON, Signal K `electrical.inverters.*`. [S6] [S2]

## Sources

- [S1] International Maritime Organization, "Resolution A.952(23), Graphical symbols for shipboard fire control plans", 2004, <https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/A.23_Res.952.pdf>, read 2026-11-12, summarized.
- [S2] Signal K, "Signal K Specification 1.7.0, Appendix A: Keys Reference (Vessel)", <https://signalk.org/specification/1.7.0/doc/vesselsBranch.html>, read 2026-11-12, Apache 2.0, summarized.
- [S3] DNV, "DNV naming rule" (ISO 19848 annex C), <https://docs.vista.dnv.com/docs/standards/dnv-naming-rule>, read 2026-11-12, summarized.
- [S6] IEC, "IEC 61850-7-4 edition 2.0", bilingual table of contents, <https://assets.vde-verlag.de/iec-normen/preview-pdf/info_iec61850-7-4%7Bed2.0%7Db.pdf>, read 2026-11-12, all rights reserved, cited by reference.
- [S10] ABB, "IEC 61850 server, Introduction", <https://help.plc.abb.com/iec_61850_server_introduction.html>, read 2026-11-12, manufacturer source, summarized.
- [S11] Wikipedia, "Power management system", <https://en.wikipedia.org/wiki/Power_management_system>, read 2026-11-12, CC BY-SA, summarized.
- [S13] Wikipedia, "Circuit breaker", <https://en.wikipedia.org/wiki/Circuit_breaker>, read 2026-11-12, CC BY-SA, summarized.
- [S14] Wikipedia, "Contactor", <https://en.wikipedia.org/wiki/Contactor>, read 2026-11-12, CC BY-SA, summarized.
- [S15] Wikipedia, "Disconnector", <https://en.wikipedia.org/wiki/Disconnector>, read 2026-11-12, CC BY-SA, summarized.
- [S17] Wikipedia, "Droop speed control", <https://en.wikipedia.org/wiki/Droop_speed_control>, read 2026-11-12, CC BY-SA, summarized.
- [S18] Wikipedia, "Swing equation", <https://en.wikipedia.org/wiki/Swing_equation>, read 2026-11-12, CC BY-SA, summarized.
- [S21] Wikipedia, "Diesel generator", <https://en.wikipedia.org/wiki/Diesel_generator>, read 2026-11-12, CC BY-SA, summarized.
- [S25] Danish Maritime Authority, "Notice D, Chapter II-1 D, Electrical installations", 2002, <https://admin.dma.dk/Media/637743811292870911/DII1D-01102002.pdf>, read 2026-11-12, summarized.
- [S61] Wikipedia, "Transformer", <https://en.wikipedia.org/wiki/Transformer>, read 2026-11-12, CC BY-SA, summarized.
- [S62] Wikipedia, "Power electronics", <https://en.wikipedia.org/wiki/Power_electronics>, read 2026-11-12, CC BY-SA, summarized.
- [S63] Wikipedia, "Alternator", <https://en.wikipedia.org/wiki/Alternator>, read 2026-11-12, CC BY-SA, summarized.
- [S66] SAMK, "General classification requirements", course page on the emergency source, <https://samkmoodle.samk.fi/mod/page/view.php?id=22189>, read 2026-11-12, secondary source, summarized.
- [S67] Electric Power Research Institute, "Common Information Model Primer", chapter 5, <https://msites.epri.com/rd/research/062333/common-information-model-primer/chapter-5-uml-for-cim>, read 2026-11-12, summarized.
- [S68] French Ministry for the Sea, "Division 221", edition of 2023-07-26, <https://mer.gouv.fr/sites/default/files/2023-08/d221_%2826-07-23%29.pdf>, read 2026-11-12, summarized.
- [S69] VIOX Electric, "Circuit Breaker Symbols: IEC and ANSI Reference Guide", <https://viox.com/complete-guide-to-circuit-breaker-symbols/>, read 2026-11-12, manufacturer source, summarized.
