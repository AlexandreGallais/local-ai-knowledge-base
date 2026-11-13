---
id: catalog-tanks-mechanical
title: "Equipment catalog: more tanks, and mechanical drive parts"
topic: synoptics
summary: "Cards of the silo, the two-stage accumulator, the two-compartment tank, the twin tank, the tank cylinder, the propeller thrust direction, the gear wheel and the clutch, with the readings still to confirm."
checked: 2026-11-13
sources: [S3, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19, S20, S33, S34, S35]
license: MIT, written for this base; facts summarized from the sources below
---

# Equipment catalog: more tanks, and mechanical drive parts

Contents: Tanks · Propulsion and mechanical parts · Sources

The set `tank` is that of `fluid-common.md`. Roles: P parameter, C command, M measured, D diagnostic,
X computed by the model. "To confirm" means no public source defines the term: confirm the meaning with
the user before you use the card.

## Tanks

### Silo (silo)

- Symbol: a tall vessel with a conical bottom.
- Subtypes: by stored material.
- Real working: a store for bulk solids such as grain, coal or cement. Grain and cement leave by air slides or screws; the material can bridge or form a rat-hole; a mobile cement silo is weighed to know what is left. [S33]
- States: `empty`, `low`, `normal`, `high`, `full`; bridging fault.
- Properties: `levelPercent`, `capacityM3`, `hasHighLevelAlarm`, `hasLowLevelAlarm` of the set `tank`; `contentMassKg` (number, kg, M); `isFilling`, `isDischarging` (boolean, M); `hasBridgingFault` (boolean, D).
- Model: reading of this base. Mass balance; level = mass / (bulk density × area); when bridged, no outflow although discharge is asked.

### Two-stage accumulator (accumulateur à deux étages)

- Symbol: the accumulator of `catalog-hydraulics.md` with two gas volumes. To confirm.
- Subtypes: `dualGasChamber`, `withGasBottle`.
- Real working: no source defines the term. A 2024 patent: an ordinary accumulator has one gas chamber and one precharge pressure, which limits it over a wide pressure range; with two gas chambers at two precharges, the low-pressure chamber compresses first, then the high-pressure one. Another reading: a gas bottle joined to the gas side adds gas volume. [S3] [S34] [S35]
- States: `empty`, `stage1`, `stage2`, `full`.
- Properties: `pressureBar` (number, bar, M); `stage1PrechargePressureBar`, `stage2PrechargePressureBar` (number, bar, P); `stage1GasVolumeL`, `stage2GasVolumeL` (number, L, P); `oilVolumeL` (number, L, X); `activeStage` (enum `none`, `stage1`, `stage2`; X); `hasLowPrechargeFault` (boolean, D).
- Model: reading of this base. Two gas springs on one oil pressure; each gas compresses only above its precharge; oil volume = sum of the gas volumes pushed out.

### Two-compartment tank (caisse à deux compartiments)

- Symbol: a rectangle split by a vertical line; one level line per compartment. To confirm.
- Subtypes: `isolated`, `linked` (by a valve or a weir).
- Real working: no public source found. Reading of this base: one shell split by a bulkhead into two volumes.
- States: per compartment, `empty`, `low`, `normal`, `high`.
- Properties: `compartments`: two objects, each with the set `tank` and a `compartmentId` (enum `a`, `b`); `isCrossoverOpen` (boolean, M).
- Model: two volume balances; when linked, the flow from one to the other is proportional to the root of the head difference.

### Twin tank (double caisse)

- Symbol: two rectangles side by side; one level line per tank. To confirm.
- Subtypes: `isolated`, `linked`.
- Real working: no public source found. Reading of this base: a pair of tanks drawn as one symbol, used one at a time or together.
- States: per tank, `empty`, `low`, `normal`, `high`.
- Properties: `tanks`: two objects, each with the set `tank` and a `compartmentId` (enum `a`, `b`); `isCrossoverOpen` (boolean, M); `selectedTank` (enum `a`, `b`, `both`; C or M).
- Model: two volume balances; the selected tank feeds the outlet.

### Tank cylinder (vérin de caisse)

- Symbol: the hydraulic cylinder of `catalog-hydraulics.md` on the tank. To confirm.
- Subtypes: first reading, pressurizing piston; second reading, a cylinder that moves a tank part (use the hydraulic cylinder card); third reading, a tank whose volume a cylinder changes.
- Real working: the term was not found. A naval manual describes a reservoir split by a floating piston, pushed by a cylinder fed from system pressure, and an air reservoir whose piston rod shows the fluid quantity. [S3]
- States: those of the hydraulic cylinder.
- Properties: first reading, those of the hydraulic cylinder; `reservoirPressureBar`, `pressurizingPressureBar` (number, bar, M); `fluidQuantityPercent` (number, %, X).
- Model: reading of this base. Reservoir pressure = pilot pressure × area ratio; rod position = fluid volume / piston area.

## Propulsion and mechanical parts

### Propeller thrust direction (sens de l'hélice)

- Symbol: no public symbol found. A propeller with an ahead or astern arrow, or three boxes `AHEAD`, `0`, `ASTERN`.
- Subtypes: `directionSource` `shaftRotation` (fixed pitch), `pitch` (controllable pitch).
- Real working: SOLAS asks for propeller pitch indicators, covered by ISO 22555:2022; the code on alerts lists propeller speed, direction and pitch indicators on the bridge. Classic engine orders are ahead, astern and stop. A controllable pitch propeller gives astern thrust by a negative pitch without reversing; a fixed pitch propeller needs a reverse gear or a reversible engine. "Propeller step" likely translates "pas de l'hélice", which is "propeller pitch"; the meaning wanted here is the thrust direction. [S17] [S18] [S19] [S20]
- States: `ahead`, `neutral`, `astern`, `unknown`.
- Properties: `thrustDirection` (enum above; X or M); `commandedThrustDirection` (enum; C); `directionSource` (enum, P); `neutralDeadbandPercent` (number, %, P).
- Model: reading of this base. Fixed pitch: the sign of `shaftSpeedRpm` outside a dead band; controllable pitch: the sign of `pitchPercent` outside a dead band, shaft turning; `neutral` inside the band or shaft stopped. `neutral` covers `stopped` and `zeroPitch` of `catalog-propulsion.md`.

### Gear wheel (roue dentée)

- Symbol: a toothed circle; a pair for a stage. ISO 14617-7 covers basic mechanical parts; not read.
- Subtypes: `gearType` `spur`, `helical`, `bevel`, `worm`.
- Real working: a rotating part that passes motion or torque by its teeth meshed with another's. The torque ratio equals the tooth count ratio, the speed ratio is its inverse; two wheels on parallel shafts turn opposite ways. "Cog" is a tooth and, by extension, the whole wheel. [S16]
- States: `stopped`, `rotatingForward`, `rotatingReverse`.
- Properties: `toothCount` (integer, P); `gearType` (enum, P); `speedRpm` (number, rpm, M or X); `rotationDirection` (enum `forward`, `reverse`, `none`; X); `isMeshed` (boolean, M, for a sliding wheel).
- Model: two meshed wheels: `n2 = −n1 × z1 / z2`, `T2 = T1 × z2 / z1`, losses ignored. [S16]

### Clutch (embrayage)

- Symbol: no public symbol found. Two plates face to face on the shaft line (disc), two toothed halves (dog), two half-tori face to face (fluid coupling).
- Subtypes: `clutchType` `multiDisc` (embrayage à disques), `dog` (embrayage à verrou, to confirm), `fluidCoupling` (embrayage hydromécanique, to confirm).
- Real working: a clutch separates an output shaft from a turning input shaft; it is engaged, slipping or disengaged. On board, it separates the engine from the shaft line. Multi-disc: oil pressure on a piston clamps the discs; low oil gives slip, heat and wear; two disc packs and a three-position valve give ahead, astern and neutral. Dog: teeth in mesh, no friction and no slip, but a shock if speeds differ; synchronizing toothed clutches replaced friction clutches on some frigates. Fluid coupling: oil carries power from a pump wheel to a turbine wheel, no torque at equal speeds; the fill level sets the torque; slight slip, about 97 % efficiency. [S9] [S10] [S11] [S12] [S13] [S14] [S15]
- States: `disengaged`, `engaging`, `engaged`, `slipping`, `disengaging`, `unknown`; clutch fault.
- Properties: `clutchType` (enum, P); `isEngageCommanded` (boolean, C); `isEngaged` (boolean, M); `clutchState` (enum above; X); `inputSpeedRpm`, `outputSpeedRpm` (number, rpm, M); `slipPercent` (number, %, X); `controlPressureBar` (number, bar, M); `oilTemperatureDegC` (number, °C, M); `fillPercent` (number, %, C or M, fluid coupling); `isSynchronized` (boolean, X, dog); `engageTimeS` (number, s, P); `hasLowControlPressureAlarm`, `hasClutchFault` (boolean, D).
- Model: reading of this base. Disc: transmissible torque proportional to `controlPressureBar`; engaged when it beats the demanded torque, else slipping. Dog: engaging allowed only under a speed difference limit; then output = input. Fluid coupling: output = input × (1 − slip) when full, no torque when empty. The reduction gear of `catalog-propulsion.md` then points to this clutch instead of repeating `isClutchEngaged`.

## Sources

- [S3] US Navy, "Fluid Power", NAVEDTRA 14105A, chapter 9 "Reservoirs, Strainers, Filters, and Accumulators".
- [S9] US Navy, "Fireman", page "Clutches and reverse gears".
- [S10] Wikipedia, "Dog clutch", CC BY-SA 4.0.
- [S11] Wikipedia, "Fluid coupling", CC BY-SA 4.0.
- [S12] Wikipedia, "Clutch", CC BY-SA 4.0.
- [S13] M. Leduc, 2002, "Power to the water! Part one: The clutch", dieselduck.
- [S14] US Department of Defense, 1991, MIL-C-18087, catalogue page.
- [S15] SSS Gears Limited, "Background and History" (marine), maker source.
- [S16] Wikipedia, "Gear", CC BY-SA 4.0.
- [S17] Wikipedia, "Engine order telegraph", CC BY-SA 4.0.
- [S18] Wikipedia, "Variable-pitch propeller (marine)", CC BY-SA 4.0.
- [S19] ISO, 2022, ISO 22555 "Propeller pitch indicators", catalogue page.
- [S20] IMO, resolution A.1021(26), "Code on Alerts and Indicators, 2009".
- [S33] Wikipedia, "Silo", CC BY-SA 4.0.
- [S34] Wikipedia, "Hydraulic accumulator", CC BY-SA 4.0.
- [S35] Deere & Company, 2024, patent US 12,031,556 B2, "Dual gas pressure accumulator system".
