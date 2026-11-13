---
id: t01
title: "A linear interpolation function"
project: ts-pure-lib
size: small
proof: src/lerp.proof.spec.ts
test: npx --no vitest run src/lerp.proof.spec.ts
---

# T01 · A linear interpolation function

## Request

Add the function `lerp(start, end, t)` in `src/lerp.ts`. It returns the value between `start` and `end` at the position `t`: `t` = 0 gives `start`, `t` = 1 gives `end`, and a `t` outside 0 to 1 extrapolates. Write its documentation and its test.

## Proof of success

The format and lint passes of the profile end with 0 errors, the project compiles, and the proof test passes: `lerp(10, 20, 0.25)` is 12.5, `lerp(0, 10, 1.5)` is 15, `lerp(-4, 4, 0.5)` is 0.
