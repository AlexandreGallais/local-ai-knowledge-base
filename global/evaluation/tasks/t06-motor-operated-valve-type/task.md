---
id: t06
title: "The properties of a motor-operated valve"
project: ts-lib
size: medium
proof: src/motor-operated-valve.proof.spec.ts
test: npx --no -- vitest run src/motor-operated-valve.proof.spec.ts
---

# T06 · The properties of a motor-operated valve

## Request

Write the TypeScript interface `MotorOperatedValveProperties` in `src/motor-operated-valve.ts`: the read-only properties a synoptic symbol needs for a motor-operated on-off valve. Give the open order, the two limit switches (open and closed), the derived position state, the travel time, the position fault, the torque fault, the power fault, and the control mode (auto or manual). Name each property after the naming convention of the synoptic symbols.

## Proof of success

The format and lint passes end with 0 errors, and the project compiles with the proof test, which checks the names and types: `isOpenCommanded`, `isOpen`, `isClosed` and `hasPositionFault` are booleans, `travelTimeS` is a number, `hasTorqueFault` and `hasPowerFault` are booleans, `controlMode` is `'auto' | 'manual'`, and `positionState` accepts `'opening'`.
