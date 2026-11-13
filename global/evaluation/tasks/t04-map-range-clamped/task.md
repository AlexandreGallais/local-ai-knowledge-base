---
id: t04
title: "A value of one range shown on another"
project: ts-pure-lib
size: small
proof: src/map-range-clamped.proof.spec.ts
test: npx --no vitest run src/map-range-clamped.proof.spec.ts
---

# T04 · A value of one range shown on another

## Request

Add the function `mapRangeClamped(value, input, output)` in `src/map-range-clamped.ts`, to draw a bargraph. `input` and `output` are ranges `{ start, end }`; `end` may be lower than `start`. It maps `value` from the input range to the output range, and keeps the result inside the output range. An input range whose start equals its end throws a `RangeError`. Write its documentation and its test.

## Proof of success

The format and lint passes end with 0 errors, the project compiles, and the proof test passes: 50 from 0–100 to 0–200 is 100; 150 gives 200; 25 from 0–100 to 200–0 is 150; an input range 5–5 throws a `RangeError`.
