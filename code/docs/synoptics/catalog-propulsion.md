---
id: synoptics-catalog-propulsion
title: Propulsion and steering catalog
topic: synoptics
summary: Engines, turbines, propulsion motor, shaft, gear, propellers, steering gear, bow thruster and a public submarine plant card.
tool: none
version: "none"
checked: 2026-11-13
sources: [S2, S6, S11, S21, S23, S24, S41, S42, S43, S44, S45, S46, S47, S48, S49, S51, S62, S68]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Propulsion and steering catalog

Contents: 1. Prime movers · 2. Drive train · 3. Propellers · 4. Steering and thruster · 5. Submarine plant · Sources

No public standard of propulsion symbols was found: every "usual shape" is an analysis, to fit to the legend of the project. The model equations come from an open-access article on a patrol vessel with two diesels, gears and controllable-pitch propellers; check them in the article before reuse. [S23] Every card also takes the common inputs of `symbol-property-naming.md`.

## 1. Prime movers (propulsion catalog)

### Diesel engine (moteur diesel)

- Symbol: usual shape, a rectangle with the machine name, linked to the shaft.
- Real working: large merchant ships have a slow two-stroke diesel coupled to the propeller; medium-speed four-stroke diesels drive through a gear, often several of them [S41]; a governor meters fuel to hold speed [S21]; in the published model the governor is a PI controller on the speed error and the fuel is capped by charge air pressure and speed [S23].
- States: `stopped`, `starting`, `running`, `loaded`, `stopping`, `shutdown`.
- Properties: `isStartCommanded`, `isStopCommanded` (boolean, C); `speedRpm`, `speedSetpointRpm` (number, rpm, M and C); `fuelIndexPercent`, `loadPercent` (number, %, M); `torqueKnm` (number, kN·m, M); `lubeOilPressureBar`, `chargeAirPressureBar` (number, bar, M); `coolantTemperatureDegC`, `exhaustTemperatureDegC` (number, °C, M); `isShutdownActive` (boolean, M); `hasOverspeedFault` (boolean, D).
- Model: PI governor, capped fuel, engine torque, shaft equation (shaft line card); temperatures and pressures first-order toward a value set by the load. Public names: Signal K `propulsion.*`. [S2]

### Gas turbine (turbine à gaz)

- Symbol: usual shape, a trapezoid linked to the shaft or to an alternator.
- Real working: common on warships, often with diesels for cruising [S41]; lighter and smaller than a diesel of the same power, efficient only near full power [S45]; in combined diesel and gas, the diesel cruises (about 20 knots) and the turbine gives high speed (about 30 knots) [S48].
- States: `stopped`, `starting`, `idle`, `loaded`, `coolingDown`, plus `isTripped`.
- Properties: `isStartCommanded`, `isStopCommanded` (boolean, C); `speedRpm` (number, rpm, M); `powerKw` (number, kW, M); `powerSetpointPercent` (number, %, C); `exhaustTemperatureDegC` (number, °C, M); `lubeOilPressureBar` (number, bar, M); `isTripped` (boolean, M).
- Model: timed start sequence; torque first-order toward the demand; exhaust temperature set by the load.

### Steam turbine (turbine à vapeur)

- Symbol: usual shape, a trapezoid with steam inlet and outlet to the condenser.
- Real working: mostly replaced since about 1960, still used on nuclear ships and some LNG carriers [S41]; steam expands in the turbine, sea water condenses it, and the water returns to the steam generator; the turbine drives the propeller through a gear, or an alternator for propulsion motors (turbo-electric) [S47] [S41].
- States: `stopped`, `warmingUp`, `running`, plus `isTripped`.
- Properties: `speedRpm` (number, rpm, M); `throttlePositionPercent`, `throttleSetpointPercent` (number, %, M and C); `steamPressureBar`, `condenserPressureBar` (number, bar, M); `steamTemperatureDegC` (number, °C, M); `isTripped` (boolean, M).
- Model: power = throttle opening × steam pressure, with a first-order delay.

### Propulsion motor (moteur électrique de propulsion)

- Symbol: usual shape, a circle marked "M" on the shaft line, fed by its converter.
- Real working: in integrated electric propulsion, gas turbines or diesel sets make three-phase power for the propeller motors; the electric transmission replaces clutches and gears and frees the engine layout; the ship is quieter, the machines being decoupled from the hull [S45]; a drive sets the motor speed [S62].
- States: `stopped`, `ready`, `running`, `limited`, plus `hasMotorFault`.
- Properties: `isConverterReady` (boolean, M); `speedRpm`, `speedSetpointRpm` (number, rpm, M and C); `torqueKnm` (number, kN·m, M); `powerKw` (number, kW, M); `currentA` (number, A, M); `windingTemperatureDegC` (number, °C, M); `direction` (enum `ahead`, `astern`; M); `hasMotorFault` (boolean, D).
- Model: speed control with a torque limit; power = torque × speed, a load of the main switchboard. Public names: IEC 61850 ZMOT, ZCON. [S6]

## 2. Drive train (propulsion catalog)

### Shaft line (ligne d'arbres)

- Symbol: usual shape, an axis line from the machine to the propeller, bearings marked.
- Real working: the shaft carries the power to the propeller; the thrust bearing passes the propeller thrust to the hull. [S41]
- States: `stopped`, `turning`, `locked`.
- Properties: `shaftSpeedRpm` (number, rpm, M); `shaftTorqueKnm` (number, kN·m, M); `shaftPowerKw` (number, kW, M); `thrustN` (number, N, M); `thrustBearingTemperatureDegC` (number, °C, M); `isShaftLocked`, `isBrakeApplied` (boolean, M); `inertiaKgM2` (number, kg·m², P).
- Model: `2π × J × dn/dt = gear output torque − line losses − propeller torque`, J the total inertia at the shaft, engine, gear, line, propeller and entrained water [S23]; a public library has the same component [S24].

### Reduction gear (réducteur)

- Symbol: usual shape, a rectangle with two gear wheels between machine and shaft.
- Real working: it lowers the shaft speed for medium or high speed engines [S41]; in combined plants, multi-ratio gears serve diesel alone or diesel with turbine, about 7.7 and 5.3 in one published case [S48]; the published model removes a loss torque that depends on speed and torque [S23].
- States: `disengaged`, `engaging`, `engaged`.
- Properties: `gearRatio` (number, P); `inputSpeedRpm`, `outputSpeedRpm` (number, rpm, M); `isClutchEngaged` (boolean, M); `isClutchEngageCommanded` (boolean, C); `lubeOilPressureBar` (number, bar, M); `lubeOilTemperatureDegC` (number, °C, M); `hasLowOilPressureAlarm` (boolean, D).
- Model: output speed = input speed / ratio; output torque = input torque × ratio − losses. Public names: Signal K `propulsion.*.transmission`. [S2]

## 3. Propellers (propulsion catalog)

### Fixed-pitch propeller (hélice à pas fixe)

- Symbol: usual shape, two spindle-shaped blades at the end of the shaft.
- Real working: fixed blades: cheaper, sturdier and more efficient than a controllable-pitch propeller at one speed and load [S42]; going astern needs reversing the shaft.
- States: `stopped`, `ahead`, `astern`.
- Properties: `speedRpm` (number, rpm, M); `thrustN` (number, N, M); `torqueKnm` (number, kN·m, M); `diameterM` (number, m, P); `pitchRatio` (number, P).
- Model: thrust and torque = coefficient × ½ × density × speed² × disk area, coefficients from open-water curves by advance angle. [S23]

### Controllable-pitch propeller (hélice à pas variable)

- Symbol: usual shape, a propeller with a curved arrow on one blade.
- Real working: the blades turn on their axis to change pitch; a negative pitch gives astern without reversing the shaft; on large ships a hydraulic system sets the blades; pitch is set to absorb the available engine power at any speed. [S42]
- States: `ahead`, `zeroPitch`, `astern`, plus `hasPitchFault`.
- Properties: `pitchPercent`, `pitchSetpointPercent` (number, −100 to 100 %, M and C); `isPitchPumpRunning` (boolean, M); `pitchOilPressureBar` (number, bar, M); `pitchTimeConstantS` (number, s, P); `hasPitchFault` (boolean, D).
- Model: `d pitch / dt = (setpoint − pitch) / τ` with rate limits; published case τ = 1.67 s, pitch decrease limited to 10 % per second; thrust and torque depend on pitch and speed. [S23]

## 4. Steering and thruster (propulsion catalog)

### Steering gear (appareil à gouverner)

- Symbol: usual shape, a rudder seen from above with a graduated sector.
- Real working: hydraulic rams fed by electric pumps turn the rudder; a position feedback stops the motion at the ordered angle [S43]; the main gear must move the rudder from 35° one side to 35° the other, and from 35° to 30° the other side in 28 seconds at most; the auxiliary gear from 15° to 15° in 60 seconds at most [S51].
- States: `stopped`, `followUp`, `nonFollowUp`, `local`, plus `hasHydraulicFault`.
- Properties: `rudderAngleDeg`, `rudderAngleSetpointDeg` (number, °, M and C); `steeringMode` (enum, M); `isPowerUnit1Running`, `isPowerUnit2Running` (boolean, M); `isPowerUnit1StartCommanded`, `isPowerUnit2StartCommanded` (boolean, C); `hydraulicPressureBar` (number, bar, M); `rudderRateDegPerS` (number, °/s, P); `hasPowerFailure`, `hasHydraulicFault` (boolean, D).
- Model: the angle joins the setpoint at constant rate, stops at ±35°; 65° in 28 s gives at least 2.3° per second with the main gear (analysis); no motion with no pump running. French official terms: [S68].

### Bow thruster (propulseur d'étrave)

- Symbol: hull mark, a cross in a circle above the waterline over the thruster [S44]; on a synoptic, a propeller in a transverse tunnel.
- Real working: a propeller in a transverse tunnel below the waterline pushes water to one side to turn the ship at berth; mostly electric; less effective when the ship moves ahead [S44]; the power management system can block the start of a large consumer [S11].
- States: `stopped`, `ready`, `running`, plus `hasOverloadFault`.
- Properties: `isStartCommanded`, `isStopCommanded` (boolean, C); `isRunning`, `isReady`, `isStartBlocked` (boolean, M); `thrustPercent`, `thrustSetpointPercent` (number, −100 to 100 %, positive to starboard, M and C); `motorPowerKw` (number, kW, M); `motorCurrentA` (number, A, M); `hasOverloadFault` (boolean, D).
- Model: thrust first-order toward the setpoint, times a factor that falls with ship speed; a large electrical load on the switchboard.

## 5. Submarine plant (public level only)

### Submarine propulsion plant (propulsion d'un sous-marin)

- Symbol: no public symbol; reuse the generator set, battery, propulsion motor and shaft line cards.
- Real working: diesel-electric, the diesels run surfaced or snorkeling to charge the batteries; submerged, a battery-fed motor drives the propeller; the snorkel is a retractable tube that brings air to the diesels at periscope depth [S46]; air-independent propulsion (Stirling engine, fuel cell, closed-cycle diesel or steam turbine with stored oxygen) recharges the batteries or feeds the motor [S49]; nuclear, a pressurized water reactor heats a primary loop, a steam generator feeds turbines that drive the propeller through a gear or make power for propulsion motors [S47]. Most submarines have one propeller, some a pump-jet [S46].
- States: `surfaceDiesel`, `snorkeling`, `battery`, `airIndependent`.
- Properties: `propulsionMode` (enum, M); `isSnorkelRaised`, `isSnorkelValveOpen`, `isChargingBattery`, `isAirIndependentPlantRunning` (boolean, M); `batteryStateOfChargePercent` (number, %, M); `mainMotorSpeedRpm`, `mainMotorSpeedSetpointRpm` (number, rpm, M and C); `airIndependentPowerKw` (number, kW, M).
- Model: energy balance on the battery (charge by diesels or the air-independent source, discharge by the motor and ship services); a state machine on the propulsion mode; no figures, they are not public.

## Sources

- [S2] Signal K, "Signal K Specification 1.7.0, Appendix A: Keys Reference (Vessel)", <https://signalk.org/specification/1.7.0/doc/vesselsBranch.html>, read 2026-11-12, Apache 2.0, summarized.
- [S6] IEC, "IEC 61850-7-4 edition 2.0", bilingual table of contents, <https://assets.vde-verlag.de/iec-normen/preview-pdf/info_iec61850-7-4%7Bed2.0%7Db.pdf>, read 2026-11-12, all rights reserved, cited by reference.
- [S11] Wikipedia, "Power management system", <https://en.wikipedia.org/wiki/Power_management_system>, read 2026-11-12, CC BY-SA, summarized.
- [S21] Wikipedia, "Diesel generator", <https://en.wikipedia.org/wiki/Diesel_generator>, read 2026-11-12, CC BY-SA, summarized.
- [S23] Geertsma, Negenborn, Visser, Loonstijn, Hopman, "Pitch control for ships with diesel mechanical and hybrid propulsion", Applied Energy 206, 2017, <https://pure.tudelft.nl/ws/files/32473737/1_s2.0_S0306261917313855_main.pdf>, read 2026-11-12, CC BY 4.0, summarized.
- [S24] Modelica Association, "Modelica.Mechanics.Rotational.Components.Inertia", Modelica Standard Library 4.1.0, <https://build.openmodelica.org/Documentation/Modelica.Mechanics.Rotational.Components.Inertia.html>, read 2026-11-12, summarized.
- [S41] Wikipedia, "Marine propulsion", <https://en.wikipedia.org/wiki/Marine_propulsion>, read 2026-11-12, CC BY-SA, summarized.
- [S42] Wikipedia, "Variable-pitch propeller (marine)", <https://en.wikipedia.org/wiki/Variable-pitch_propeller_(marine)>, read 2026-11-12, CC BY-SA, summarized.
- [S43] Wikipedia, "Steering engine", <https://en.wikipedia.org/wiki/Steering_engine>, read 2026-11-12, CC BY-SA, summarized.
- [S44] Wikipedia, "Manoeuvring thruster", <https://en.wikipedia.org/wiki/Manoeuvring_thruster>, read 2026-11-12, CC BY-SA, summarized.
- [S45] Wikipedia, "Integrated electric propulsion", <https://en.wikipedia.org/wiki/Integrated_electric_propulsion>, read 2026-11-12, CC BY-SA, summarized.
- [S46] Wikipedia, "Submarine", <https://en.wikipedia.org/wiki/Submarine>, read 2026-11-12, CC BY-SA, summarized.
- [S47] Wikipedia, "Nuclear marine propulsion", <https://en.wikipedia.org/wiki/Nuclear_marine_propulsion>, read 2026-11-12, CC BY-SA, summarized.
- [S48] Wikipedia, "Combined diesel and gas", <https://en.wikipedia.org/wiki/Combined_diesel_and_gas>, read 2026-11-12, CC BY-SA, summarized.
- [S49] Wikipedia, "Air-independent propulsion", <https://en.wikipedia.org/wiki/Air-independent_propulsion>, read 2026-11-12, CC BY-SA, summarized.
- [S51] IACS, "Unified Interpretation SC246, Rev.1, Steering gear test", 2015, <https://turkloydu.org/pdf-files/iacs-karar-ve-csr-degisimleri/iacs-es-yorumlari/UI_SC246_Rev1_TR_EN.pdf>, read 2026-11-12, summarized.
- [S62] Wikipedia, "Power electronics", <https://en.wikipedia.org/wiki/Power_electronics>, read 2026-11-12, CC BY-SA, summarized.
- [S68] French Ministry for the Sea, "Division 221", edition of 2023-07-26, <https://mer.gouv.fr/sites/default/files/2023-08/d221_%2826-07-23%29.pdf>, read 2026-11-12, summarized.
