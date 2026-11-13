---
id: catalog-console-levers
title: "Console catalog: levers and equipment commands"
topic: synoptics
summary: "Cards of the joystick, the analog joystick, the throttle lever, the pump command, the two-valve command and the turning gear command: subtypes, states, properties, events, model."
checked: 2026-11-13
sources: [S3, S9, S10, S14, S16, S17, S18, S19, S20, S25, S27, S30]
license: MIT, written for this base; facts summarized from the sources below
---

# Console catalog: levers and equipment commands

Contents: Levers · Equipment commands · Sources

Common sets, roles and front sides: `console-common.md`. The sets `drive` and `onOffValve` are those of
`fluid-common.md`.

## Levers

### Joystick (joystick)

- Symbol: code name `joystick`; a handle in a gate, its directions marked.
- Subtypes: 2 or 4 directions; stay put or spring return to the centre. [S16] [S17]
- Real working: the deflection is sensed by contacts only, with no continuous signal. [S18]
- States: `center`, `up`, `down`, `left`, `right`. Fault: contact.
- Properties: sets `panelDevice` and `contact`; `direction` (enum above; C, R and W); `directionCount` (integer, 2 or 4, P, R); `returnMode` (enum `stayPut`, `springReturnToCenter`; P, R).
- Events: `directionChanged`.
- Model: one direction at a time; back to the centre on release with spring return.

### Analog joystick (joystick analogique)

- Symbol: code name `analogJoystick`; a handle in a square, round or cross gate, its position as a dot.
- Subtypes: Hall effect (contactless) or potentiometer; 2 axes, or 3 with a twisting grip; spring return, friction hold or detents; doubled outputs for critical uses. [S18]
- Real working: each axis gives a signal proportional to the deflection: voltage, current loop or bus. The Web Gamepad API gives an axis from -1 to 1. [S18] [S30]
- States: centred or deflected. Fault: signals that disagree between doubled outputs.
- Properties: set `panelDevice`; `xDeflectionPercent`, `yDeflectionPercent`, `zRotationPercent` (number, %, from -100 to 100, C, R and W); `axisCount` (integer, 1 to 3, P, R); `isCentered` (boolean, M, R); `centeringMode` (enum `springReturn`, `frictionHold`, `detent`; P, R); `gateShape` (enum `square`, `round`, `plus`, `slot`; P, R); `hasSignalFault` (boolean, D, R).
- Events: `deflectionChanged`.
- Model: sample at the model step; a dead zone around the centre.

### Throttle lever (levier de puissance)

- Symbol: code name `throttleLever`; a lever over a scale from astern to ahead, the detents marked, the acknowledged order shown beside it.
- Subtypes: combined lever, order telegraph and speed setting; order telegraph alone, with handle, dial and repeater pointer. [S19] [S20]
- Real working: a public product has eleven detents shown by diodes: five ahead, stop, five astern; the lever also sets between two detents. On an order telegraph, the bridge sends the order and the engine room acknowledges it by putting its handle on the same position, which stops the bell. The lever moves the way the ship goes. One station has control at a time, each station shows it, and the transfer is acknowledged. An alarm signals a rotation the wrong way. [S10] [S14] [S19] [S20]
- States: current order; acknowledged order; in control or not; locked. Fault: signal, wrong way.
- Properties: set `panelDevice`; `leverPositionPercent` (number, %, from -100 astern to 100 ahead, C, R and W); `telegraphOrder` (enum of 11 values from `emergencyAstern` to `navigationFullAhead`, with `stop`; C, R); `acknowledgedTelegraphOrder` (same enum; M, R); `subTelegraphMode` (enum `finishedWithEngine`, `standBy`, `atSea`; C, R); `detentPositionsPercent` (number[], %, P, R); `isInControl` (boolean, M, R); `isLeverLocked` (boolean, M, R); `hasWrongWayAlarm`, `hasSignalFault` (boolean, D, R).
- Events: `leverMoved`.
- Model: the model rounds to the nearest detent for `telegraphOrder`; a lever out of control has no effect.

## Equipment commands

The rules ask that the operator sees the effect of an order, that each station shows which one has
control, and that a remote valve shows its real position or its limit switches. [S14] A faceplate is the
view that monitors or operates one loop, one device or one sequence. [S27]

### Pump control (commande de pompe)

- Symbol: code name `pumpControl`; a start and a stop button with a run light, or a two-position selector or key.
- Subtypes: two buttons with a light; a two-position selector or key.
- Real working: start button white, grey, black or green, never red; stop button black, grey or white, red allowed, never green. The light shows the real run, not the order. [S3] [S9] [S14]
- States: those of `runState`; local or remote; in control or not.
- Properties: set `panelDevice`; `isRunCommanded` (boolean, C, R and W); `runState` (enum of the set `drive`; X, R); `controlMode`, `controlLocation` (enums of the naming document; M, R); `isInControl` (boolean, M, R); `hasTripFault`, `hasStartFault` (boolean, D, R).
- Events: `commandRequested` with `start` or `stop`.
- Model: the rules of `runState` of the set `drive`.

### Two-valve control (commande de deux vannes)

- Symbol: code name `twoValveControl`; one control with the two valve symbols and their positions.
- Subtypes: two valves moved together, or in opposition (changeover); the exact meaning is to confirm with the user.
- Real working: no public source found. Reading of this base: one control that orders two on-off valves and shows the position of each.
- States: position of each valve; order and feedback that disagree.
- Properties: set `panelDevice`; `isFirstValveOpenCommanded`, `isSecondValveOpenCommanded` (boolean, C, R and W); `firstValvePositionState`, `secondValvePositionState` (enum `positionState`; X, R); `hasFirstValvePositionFault`, `hasSecondValvePositionFault` (boolean, D, R); `controlMode`, `controlLocation` (enums; M, R); `isInControl` (boolean, M, R).
- Events: `commandRequested` with `open` or `close`.
- Model: twice the set `onOffValve`.

### Turning gear control (commande de vireur)

- Symbol: code name `turningGearControl`; engage and run commands, the engagement state and the shaft speed.
- Subtypes: engaged by lever; automatic command. [S25]
- Real working: the turning gear turns the shaft line slowly, for even cooling, for inspection and to keep the oil film; an electric motor drives the gearbox through a coupling or a clutch; a lock can hold the shaft. [S25]
- States: `disengaged`, `engaging`, `engaged`, `disengaging`, `unknown`; running or stopped.
- Properties: set `panelDevice`; `isEngageCommanded` (boolean, C, R and W); `engagementState` (enum above; X, R); `isRunCommanded` (boolean, C, R and W); `runState` (enum; X, R); `shaftSpeedRpm` (number, rpm, M, R); `hasEngagementFault`, `hasTripFault` (boolean, D, R); `controlMode`, `controlLocation` (enums; M, R); `isInControl` (boolean, M, R).
- Events: `commandRequested` with `engage`, `disengage`, `start`, `stop`.
- Model: while the turning gear is engaged, the main engine must not start (reading of this base, to check against the equipment).

## Sources

- [S3] Schneider Electric, FAQ FA28043 on button colours under IEC 60204-1.
- [S9] Federal Aviation Administration, 2003, "Human Factors Design Standard", chapter 6.
- [S10] IMO, 2000, MSC/Circ.982, guidelines on ergonomic criteria for bridge equipment and layout.
- [S14] Bureau Veritas, 2026, NR467, part C, chapter 3.
- [S16] Schneider Electric, 2024, catalogue "Easy Harmony XB2".
- [S17] Schneider Electric, catalogue "Harmony XB4".
- [S18] MEGATRON Elektronik, "Guide for Joysticks".
- [S19] Kongsberg Maritime, 2013, "AutoChief 600 Lever Telegraph Unit (LTU11)".
- [S20] Wikipedia, "Engine order telegraph", CC BY-SA 4.0.
- [S25] Wikipedia, "Jacking gear", CC BY-SA 4.0.
- [S27] IEC, 2024, IEC 63303 ed. 1.0, sample.
- [S30] W3C, "Gamepad", editor's draft.
