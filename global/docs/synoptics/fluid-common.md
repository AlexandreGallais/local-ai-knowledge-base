---
id: fluid-common
title: Fluid equipment property sets
topic: synoptics
summary: The seven shared property sets of fluid equipment, their roles, and the rules that derive valve and drive states.
tool: none
version: "none"
checked: 2026-11-13
sources: [S11, S28, S30, S33, S37, S43, S44, S45]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Fluid equipment property sets

Contents: 1. Roles · 2. Shared sets · 3. Derived states · Sources

The names follow `docs/synoptics/symbol-property-naming.md`. The catalog cards (`catalog-*.md`) list only what they add to these sets.

## 1. Roles of a property (fluid equipment)

Every property has one role. The public models all keep what is commanded apart from what is measured. [S43] [S44]

| Role | Letter | Example |
| --- | --- | --- |
| Parameter of the model | P | `travelTimeS`, `kvM3PerH` |
| Command or setpoint | C | `isOpenCommanded`, `commandedPositionPercent`, `outletPressureSetpointBar` |
| Measured or feedback | M | `isOpen`, `actualPositionPercent`, `flowRateM3PerH` |
| Fault or alarm | D | `hasPositionFault`, `hasHighLevelAlarm` |
| Derived by the model | X | `positionState`, `runState` |

Parameters, commands and setpoints go into the model; it gives the measures and the faults. The symbol shows only measures, faults and derived states.

## 2. The seven shared sets (fluid equipment)

| Set | Properties |
| --- | --- |
| `identity` | `tagName`, `description`, `systemCode` (string, P) [S45] |
| `controlMode` | `controlMode` (enum `auto`, `manual`; M); `controlLocation` (enum `remote`, `local`; M); `isInterlocked` (boolean, M) [S43] |
| `onOffValve` | `isOpenCommanded` (boolean, C); `isOpen`, `isClosed` (boolean, M, limit switches); `positionState` (enum, X); `hasPositionFault` (boolean, D); `travelTimeS` (number, s, P); `failPosition` (enum `open`, `closed`, `inPlace`; P) [S43] [S30] [S28] |
| `modulatingValve` | `commandedPositionPercent` (number, %, C); `actualPositionPercent` (number, %, M); `hasPositionFault` (boolean, D); `kvM3PerH` (number, m³/h, P); `travelTimeS` (number, s, P); `failPosition` (enum, P) [S43] [S28] [S33] |
| `drive` | `isRunCommanded` (boolean, C); `isRunning` (boolean, M); `commandedSpeedRpm`, `actualSpeedRpm` (number, rpm, C and M); `runState` (enum, X); `hasTripFault`, `hasStartFault` (boolean, D); `startTimeS` (number, s, P) [S43] |
| `tank` | `levelPercent` (number, %, M); `levelM` (number, m, M); `volumeM3` (number, m³, X); `capacityM3` (number, m³, P); `temperatureDegC` (number, °C, M); `hasHighLevelAlarm`, `hasLowLevelAlarm` (boolean, D) [S11] [S37] |
| `processPoint` | `inletPressureBar`, `outletPressureBar`, `differentialPressureBar` (number, bar, M); `flowRateM3PerH` (number, m³/h, M); `temperatureDegC` (number, °C, M) [S45] [S44] |

Every symbol also carries the common inputs of the naming document: `health`, `quality`, alarm priority and state.

A motorized valve gives way to its position when power fails; a spring-return valve goes to its fail position: hence `failPosition`. [S30]

## 3. Derived states (valve and drive)

These rules derive the states from the commands and the feedbacks; they follow the monitoring of a public data model. [S43]

- `positionState`: only closed feedback true, `closed`; only open feedback true, `open`; no feedback and an open order, `opening`; no feedback and a close order, `closing`; both feedbacks true, `unknown` with `hasPositionFault`.
- `hasPositionFault`: the feedback does not match the order after `travelTimeS`.
- `runState`: run order without feedback, `starting`; run feedback, `running`; order removed with feedback still true, `stopping`; no order and no feedback, `stopped`. A trip sets `hasTripFault`.
- `hasStartFault`: no run feedback after `startTimeS`.
- A hand valve without sensor has no order and no feedback: it keeps only `isOpen`, set by the operator or the instructor.

## Sources

- [S11] US Navy, "Fluid Power", NAVEDTRA 14105A, chapter 9, <https://engineeringlibrary.org/reference/hydraulic-reservoirs-strainers-filters-accumulators-navy>, read 2026-11-12, US government work, summarized.
- [S28] Wikipedia, "Control valve", <https://en.wikipedia.org/wiki/Control_valve>, read 2026-11-12, CC BY-SA, summarized.
- [S30] Wikipedia, "Valve actuator", <https://en.wikipedia.org/wiki/Valve_actuator>, read 2026-11-12, CC BY-SA, summarized.
- [S33] Modelica Association, "Modelica.Fluid User's Guide, Valve characteristics", <https://doc.modelica.org/om/Modelica.Fluid.UsersGuide.ComponentDefinition.ValveCharacteristics.html>, read 2026-11-12, summarized.
- [S37] Modelica Association, "Modelica.Fluid.Vessels.OpenTank", <https://doc.modelica.org/om/Modelica.Fluid.Vessels.OpenTank.html>, read 2026-11-12, summarized.
- [S43] Beckhoff Automation, "TF8400 TwinCAT 3 MTP Runtime", version 1.1.1, <https://download.beckhoff.com/download/Document/automation/twincat3/TF8400_TC3_MTP_Runtime_EN.pdf>, read 2026-11-12, all rights reserved, summarized.
- [S44] Project Haystack, "Points", <https://project-haystack.org/doc/docHaystack/Points>, read 2026-11-12, AFL 3.0, summarized.
- [S45] OPC Foundation, "OPC 40223, OPC UA for Pumps and Vacuum Pumps", section 1, <https://reference.opcfoundation.org/specs/OPC-40223/1>, read 2026-11-12, summarized.
