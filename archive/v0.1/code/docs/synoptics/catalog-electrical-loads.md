---
id: synoptics-catalog-electrical-loads
title: Electrical storage, loads and power functions catalog
topic: synoptics
summary: Battery, charger, motor and starter, shore connection, load shedding and synchronizing, with properties and simple model.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S6, S11, S12, S14, S16, S19, S20, S21, S22, S62, S68]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Electrical storage, loads and power functions catalog

Contents: 1. Storage · 2. Loads and shore · 3. Power functions · Sources

Symbols come from IEC 60617, a paid database: "usual shape" is an analysis to check on the standard. Generation, switchboards and switching devices are in `catalog-electrical-power.md`. Every card also takes the common inputs of `symbol-property-naming.md`.

## 1. Storage (electrical catalog)

### Storage battery (batterie d'accumulateurs)

- Symbol: IEC 60617; usual shape, alternate long and short lines; fire plan symbol IMO 2.35. [S1]
- Real working: the state of charge is the usable capacity left, 0 to 100 %; it is not measured directly but estimated from the voltage or by integrating the current, which drifts and is reset when the charger sees full charge. [S22]
- States: `charging`, `discharging`, `floating`, `depleted`.
- Properties: `voltageV` (number, V, M); `currentA` (number, A, M, positive when discharging); `stateOfChargePercent` (number, %, M); `capacityAh` (number, Ah, P); `temperatureDegC` (number, °C, M); `isCharging` (boolean, M); `timeRemainingS` (number, s, M); `hasLowVoltageAlarm` (boolean, D).
- Model: `SoC = SoC0 − (1 / capacity) × ∫ I dt`; voltage = function of the state of charge minus the inner drop `R × I`. Public names: Signal K `electrical.batteries.*`, IEC 61850 ZBAT. [S2] [S6]

### Battery charger (chargeur de batterie)

- Symbol: IEC 60617; usual shape, the rectifier symbol linked to the battery.
- Real working: a rectifier that turns AC into DC to charge the battery [S62]; a public data model gives it a charging mode, a voltage setpoint and a current setpoint [S2].
- States: `off`, `bulk`, `absorption`, `float`, plus `hasChargerFault`.
- Properties: `isOn` (boolean, M); `chargingMode` (enum, M); `outputVoltageV`, `voltageSetpointV` (number, V, M and C); `outputCurrentA`, `currentLimitA` (number, A, M and C); `hasSupplyFault`, `hasChargerFault` (boolean, D).
- Model: constant current up to the voltage setpoint, then constant voltage.

## 2. Loads and shore (electrical catalog)

### Motor and starter (moteur et démarreur)

- Symbol: IEC 60617; usual shape, a circle marked "M"; the starter is a rectangle or the contactor with its thermal relay.
- Real working: an induction motor turns slightly slower than its field, a slip of about 0.5 to 5 %; 4 poles at 50 Hz give a 1,500 rpm field; direct-on-line start draws 6 to 7 times rated current, reduced by star-delta, autotransformer, soft starter or drive [S19]; the starter joins a contactor and protections (overload, undervoltage) [S14].
- States: `stopped`, `starting`, `running`, plus `isOverloadTripped`.
- Properties: `isStartCommanded`, `isStopCommanded` (boolean, C); `isRunning`, `isOverloadTripped` (boolean, M); `speedRpm` (number, rpm, M); `currentA` (number, A, M); `ratedCurrentA` (number, A, P); `startingMethod` (enum `directOnLine`, `starDelta`, `autotransformer`, `softStarter`, `variableFrequencyDrive`; P); `startCount` (integer, M); `runTimeH` (number, h, M).
- Model: current 6 to 7 × rated during the start time, then proportional to load; speed first-order to `(1 − slip) × field speed`; trips on a lasting overload. Public name: IEC 61850 ZMOT. [S6]

### Shore connection (prise de quai)

- Symbol: IEC 60617; usual shape, a socket and plug with their breaker.
- Real working: shore power feeds the ship at berth with engines stopped, through a suitable cable; large installations convert the voltage and frequency of the grid; IEC/ISO/IEEE 80005-1 covers ships over 1 MVA. [S20]
- States: `disconnected`, `connected`, `supplying`.
- Properties: `isCableConnected`, `isShoreSupplyAvailable`, `isShoreBreakerClosed`, `isPhaseSequenceCorrect` (boolean, M); `shoreVoltageV` (number, V, M); `shoreFrequencyHz` (number, Hz, M); `shorePowerKw` (number, kW, M).
- Model: an external source of unlimited power; interlocked with the ship generators (no lasting parallel run, to confirm on the simulated ship).
- Pitfall: on a fire plan, "international shore connection" (IMO 2.14) is the fire main coupling, "raccord international de jonction avec la terre", not the electrical shore connection. [S1] [S68]

## 3. Power functions (electrical catalog)

### Load shedding (délestage)

- Symbol: a function, with no symbol of its own; on a synoptic, a mark on the non-essential feeders.
- Real working: preferential trips disconnect non-essential consumers on overload, to avoid the main breaker trip and a blackout; loads go in steps at 5, 10 and 15 seconds (air conditioning, ventilation, galley); the power management system sheds load in two steps when consumption exceeds production. [S12] [S11]
- States: `inactive`, `stage1`, `stage2`, `stage3`.
- Properties: `isLoadSheddingActive` (boolean, M); `sheddingStage` (integer, M); `overloadThresholdPercent` (number, %, P); `stageDelayS` (number, s, P); `sheddingGroup` (integer, P); `isNonEssential` (boolean, P); `isResetCommanded` (boolean, C).
- Model: when the load of a set stays above the threshold for the delay of a step, open the feeders of that shedding group.

### Synchronizing (couplage)

- Symbol: a function; usual shape on a synoptic, a synchronism indicator near the generator breaker.
- Real working: before closing a set on a live busbar, voltage, frequency, phase sequence and phase angle must match; a synchroscope shows whether the set runs fast or slow; a synchro-check relay blocks closing outside the window; an automatic synchronizer does it alone [S16]; closing out of phase gives a high current and can damage the set [S21].
- States: `idle`, `synchronizing`, `synchronized`, plus `hasSyncFailure`.
- Properties: `isSyncCommanded` (boolean, C); `isAutoSyncActive`, `isSynchronized` (boolean, M); `voltageDifferenceV` (number, V, M); `frequencyDifferenceHz` (number, Hz, M); `phaseAngleDeg` (number, °, M); `hasSyncFailure` (boolean, D).
- Model: the phase angle integrates the frequency gap, `dφ/dt = 360 × Δf`; closing allowed when the voltage, frequency and angle gaps are inside their windows.

## Sources

- [S1] International Maritime Organization, "Resolution A.952(23), Graphical symbols for shipboard fire control plans", 2004, <https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/A.23_Res.952.pdf>, read 2026-11-12, summarized.
- [S2] Signal K, "Signal K Specification 1.7.0, Appendix A: Keys Reference (Vessel)", <https://signalk.org/specification/1.7.0/doc/vesselsBranch.html>, read 2026-11-12, Apache 2.0, summarized.
- [S6] IEC, "IEC 61850-7-4 edition 2.0", bilingual table of contents, <https://assets.vde-verlag.de/iec-normen/preview-pdf/info_iec61850-7-4%7Bed2.0%7Db.pdf>, read 2026-11-12, all rights reserved, cited by reference.
- [S11] Wikipedia, "Power management system", <https://en.wikipedia.org/wiki/Power_management_system>, read 2026-11-12, CC BY-SA, summarized.
- [S12] Marine Insight, "Preferential Trips on Ship: Construction and Working", <https://www.marineinsight.com/marine-safety/preferential-trips-on-ship-construction-and-working/>, read 2026-11-12, summarized.
- [S14] Wikipedia, "Contactor", <https://en.wikipedia.org/wiki/Contactor>, read 2026-11-12, CC BY-SA, summarized.
- [S16] Wikipedia, "Synchronization (alternating current)", <https://en.wikipedia.org/wiki/Synchronization_(alternating_current)>, read 2026-11-12, CC BY-SA, summarized.
- [S19] Wikipedia, "Induction motor", <https://en.wikipedia.org/wiki/Induction_motor>, read 2026-11-12, CC BY-SA, summarized.
- [S20] Wikipedia, "Shore power", <https://en.wikipedia.org/wiki/Shore_power>, read 2026-11-12, CC BY-SA, summarized.
- [S21] Wikipedia, "Diesel generator", <https://en.wikipedia.org/wiki/Diesel_generator>, read 2026-11-12, CC BY-SA, summarized.
- [S22] Wikipedia, "State of charge", <https://en.wikipedia.org/wiki/State_of_charge>, read 2026-11-12, CC BY-SA, summarized.
- [S62] Wikipedia, "Power electronics", <https://en.wikipedia.org/wiki/Power_electronics>, read 2026-11-12, CC BY-SA, summarized.
- [S68] French Ministry for the Sea, "Division 221", edition of 2023-07-26, <https://mer.gouv.fr/sites/default/files/2023-08/d221_%2826-07-23%29.pdf>, read 2026-11-12, summarized.
