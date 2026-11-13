---
id: test-calculations
title: "Test a calculation"
topic: math
summary: "Tolerance in tests, expected values from a source, properties when no value is known, edge cases."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S11, S12, S32, S37]
license: MIT, written for this base; facts from the sources below
---

# Test a calculation

Contents: Compare with a tolerance in tests · Take expected values from a source · Test a property when no value is known · Test the edge cases · Sources

## 1. Compare with a tolerance in tests

Formula: assert that `isCloseTo(actual, expected, { absolute: 1e-9, relative: 1e-9 })` is true.

Example: with `node:assert`: `assert.ok(isCloseTo(actual, expected, { absolute: 1e-9, relative: 1e-9 }))`. With Vitest: `expect(actual).toBeCloseTo(expected, 9)`.

Pitfall: `node:assert` has no tolerance check. In Vitest, the default of `toBeCloseTo` is 2 digits: pass the digits.

Sources: [S37] [E]

## 2. Take expected values from a source

Formula: the expected value comes from a document or a worked example, never from the function under test.

Example: `lerp(20, 620, 0.8)` must give `500`. `mapRange(-10, { start: 10, end: 130 }, { start: 0, end: 960 })` must give `-160`. `variance([4, 7, 13, 16], 'sample')` must give `30`.

Pitfall: A test that copies the output of the function proves nothing.

Sources: [S11] [S12] [S32] [E]

## 3. Test a property when no value is known

Formula: check a rule that must always hold.

Example: `lerp(a, b, 0)` gives `a` and `lerp(a, b, 1)` gives `b`. Two smoothing steps of half the time give the same result as one step. A conversion there and back gives the start value within the tolerance.

Pitfall: A round trip is not exact: degrees to radians and back differs for 78 of the 361 whole degrees from 0 to 360.

Sources: [E]

## 4. Test the edge cases

Formula: one test for each: `NaN`, `Infinity`, `0`, `-0`, a negative value, an empty list, equal bounds, a very large value.

Example: `clamp(NaN, 0, 10)` gives `NaN`. `mean([])` throws `RangeError`. `inverseLerp(1, 1, 1)` throws `RangeError`.

Pitfall: A function that returns 0 for a wrong input hides the fault.

Sources: [E]

## Sources

- [S11] D3 (Observable), « d3-scale : Linear scales », "d3-scale : Linear scales", <https://d3js.org/d3-scale/linear>.
- [S12] D3 (Observable), « d3-interpolate : Value interpolation », "d3-interpolate : Value interpolation", <https://d3js.org/d3-interpolate/value>.
- [S32] Wikipédia (en), « Algorithms for calculating variance », "Algorithms for calculating variance", <https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance>.
- [S37] Vitest, « expect » (API), "expect", <https://vitest.dev/api/expect.html>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
