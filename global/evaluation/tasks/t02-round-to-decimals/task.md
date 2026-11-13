---
id: t02
title: "Rounding to decimals as a person expects it"
project: ts-pure-lib
size: small
proof: src/round-to-decimals.proof.spec.ts
test: npx --no vitest run src/round-to-decimals.proof.spec.ts
---

# T02 · Rounding to decimals as a person expects it

## Request

Add the function `roundToDecimals(value, decimals)` in `src/round-to-decimals.ts`. It rounds `value` to `decimals` decimals, a half away from zero, as a person expects: 1.005 with 2 decimals gives 1.01, and -2.5 with 0 decimals gives -3. `decimals` is an integer from 0 to 15; any other value throws a `RangeError`. Write its documentation and its test.

## Proof of success

The format and lint passes end with 0 errors, the project compiles, and the proof test passes: `roundToDecimals(1.005, 2)` is 1.01, `roundToDecimals(2.675, 2)` is 2.68, `roundToDecimals(-2.5, 0)` is -3, and decimals of 1.5 or 16 throw a `RangeError`.
