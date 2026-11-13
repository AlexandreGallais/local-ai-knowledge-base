---
id: t05
title: "A flow rate written for a display"
project: ts-lib
size: small
proof: src/format-flow.proof.spec.ts
test: npx --no -- vitest run src/format-flow.proof.spec.ts
---

# T05 · A flow rate written for a display

## Request

Add the function `formatFlow(m3PerH, unit)` in `src/format-flow.ts`, next to `formatPressure`. It writes a flow rate given in cubic metres per hour in the unit asked, `'m3/h'` or `'L/min'`, with two decimals and the unit after a space, as `"1.50 m3/h"`. One m3/h is 1000 / 60 L/min. Put the type of the unit in its own file, as `PressureUnit`. Write its documentation and its test.

## Proof of success

The format and lint passes end with 0 errors, the project compiles, and the proof test passes: `formatFlow(1.5, 'm3/h')` is `"1.50 m3/h"` and `formatFlow(0.6, 'L/min')` is `"10.00 L/min"`.
