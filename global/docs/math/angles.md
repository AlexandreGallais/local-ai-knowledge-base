---
id: angles
title: "Angles"
topic: math
summary: "Degrees and radians, normalizing, the shortest turn, interpolating an angle, atan2, results near zero and one."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S9, S20, S33, S34, S35]
license: MIT, written for this base; facts from the sources below
---

# Angles

Contents: Degrees and radians · Normalize an angle · Shortest path between two angles · Interpolate an angle · Angle of a vector with atan2 · Results near zero and near one · Sources

## 1. Degrees and radians

Formula: radians = degrees * PI / 180. degrees = radians * 180 / PI.

Example: `degreesToRadians(180)` gives `3.141592653589793`. `radiansToDegrees(Math.PI / 2)` gives `90`.

Pitfall: `Math.sin`, `Math.cos` and `Math.atan2` work in radians. `Math.sin(degreesToRadians(30))` gives `0.49999999999999994`, not `0.5`: compare with a tolerance.

Kit: `degreesToRadians` in `kit/math/degrees-to-radians.ts`. , `radiansToDegrees`. Sources: [S33] [E]

## 2. Normalize an angle

Formula: [0, 360): modulo(angle, 360). [-180, 180): modulo(angle + 180, 360) - 180.

Example: `normalizeAngleDegrees(-90)` gives `270`. `normalizeAngleSignedDegrees(190)` gives `-170`.

Pitfall: `-90 % 360` gives `-90`. Use `modulo`, not `%`.

Kit: `normalizeAngleDegrees` in `kit/math/normalize-angle-degrees.ts`. , `normalizeAngleSignedDegrees`. Sources: [S9] [E]

## 3. Shortest path between two angles

Formula: delta = normalize(to) - normalize(from). If delta > 180, subtract 360. If delta < -180, add 360.

Example: `shortestAngleDeltaDegrees(350, 10)` gives `20`. `shortestAngleDeltaDegrees(10, 350)` gives `-20`.

Pitfall: `10 - 350` gives `-340`: the needle turns the long way.

Kit: `shortestAngleDeltaDegrees` in `kit/math/shortest-angle-delta-degrees.ts`. Sources: [S35] [E]

## 4. Interpolate an angle

Formula: normalize(from + shortestDelta(from, to) * t).

Example: `lerpAngleDegrees(350, 10, 0.5)` gives `0`.

Pitfall: `lerp(350, 10, 0.5)` gives `180`: the opposite direction.

Kit: `lerpAngleDegrees` in `kit/math/lerp-angle-degrees.ts`. Sources: [S35] [E]

## 5. Angle of a vector with atan2

Formula: angle = atan2(deltaY, deltaX). The result goes from -PI to PI.

Example: `angleOfVectorDegrees(0, 1)` gives `90`. `angleOfVectorDegrees(-1, 0)` gives `180`. `angleOfVectorDegrees(5, 5)` gives `45`.

Pitfall: `Math.atan2` takes y first. `Math.atan(1 / -1)` gives `-0.7853981633974483`, but `Math.atan2(1, -1)` gives `2.356194490192345`: `Math.atan` loses the quadrant.

Kit: `angleOfVectorDegrees` in `kit/math/angle-of-vector-degrees.ts`. Sources: [S34] [E]

## 6. Results near zero and near one

Formula: clamp the argument to [-1, 1] before `Math.acos` and `Math.asin`; clamp to 0 or more before `Math.sqrt`.

Example: `Math.cos(Math.PI / 2)` gives `6.123233995736766e-17`. `Math.acos(1.0000000000000002)` gives `NaN`.

Pitfall: A rounding error of one bit turns a valid angle into `NaN`.

Sources: [S20] [E]

## Sources

- [S9] MDN, 2025, "Remainder (%)", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder>.
- [S20] Dawson B., 2012, "Comparing Floating Point Numbers, 2012 Edition", <https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/>.
- [S33] NIST, 2016, "NIST Guide to the SI (SP 811), Appendix B.8 : Factors for Units Listed Alphabetically", <https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8>.
- [S34] MDN, 2025, "Math.atan2()", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2>.
- [S35] MDN, 2026, "<hue-interpolation-method>", <https://developer.mozilla.org/en-US/docs/Web/CSS/hue-interpolation-method>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
