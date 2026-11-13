---
id: angles
title: "SVG geometry: angles"
topic: geometry
summary: "Degrees and radians, direction of a vector or between two points, signed angle between two vectors, in SVG coordinates."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S4]
license: MIT, written for this base; facts from the sources below
---

# SVG geometry: angles

Contents: degreesToRadians · radiansToDegrees · normalizeAngle · shortestAngleDelta · angleOfVector · angleBetweenPoints · signedAngleBetweenVectors · Sources

Angles are in degrees, as in the SVG `transform` attribute. 0 is the +x axis. Positive is clockwise on screen, because y points down. `Math.sin`, `Math.cos` and `Math.atan2` use radians: convert inside the function, never in the caller.

Conventions: user units, y axis down, angles in degrees from the +x axis, clockwise on screen. Compare results with a tolerance.

## degreesToRadians

Formula: degrees * PI / 180

Example: `degreesToRadians(180)` gives `3.141592654`.

Pitfall: none special; compare the result with a tolerance, never with ===.

Kit: `degreesToRadians(...): number` in `kit/geometry/../math/degrees-to-radians.ts`.

Sources: [E]

## radiansToDegrees

Formula: radians * 180 / PI

Example: `radiansToDegrees(Math.PI / 6)` gives `30`.

Pitfall: none special; compare the result with a tolerance, never with ===.

Kit: `radiansToDegrees(...): number` in `kit/geometry/../math/radians-to-degrees.ts`.

Sources: [E]

## normalizeAngle

Formula: ((degrees % 360) + 360) % 360, in [0, 360)

Example: `normalizeAngle(-90)` gives `270`.

Pitfall: The `%` operator keeps the sign of the left operand: `-90 % 360` is `-90`. Return 0, never -0.

Kit: `normalizeAngleDegrees` in `kit/math/normalize-angle-degrees.ts`.

Sources: [E]

## shortestAngleDelta

Formula: d = normalizeAngle(to - from); d > 180 ? d - 360 : d, in (-180, 180]

Example: `shortestAngleDelta(350, 10)` gives `20`.

Pitfall: Opposite angles give +180, never -180.

Kit: `shortestAngleDeltaDegrees` in `kit/math/shortest-angle-delta-degrees.ts`.

Sources: [E]

## angleOfVector

Formula: atan2(v.y, v.x) in degrees, in (-180, 180]

Example: `angleOfVector({x:0,y:5})` gives `90`.

Pitfall: The argument order of `Math.atan2` is (y, x). The zero vector gives 0.

Kit: `angleOfVector(v: Point): number` in `kit/geometry/angle-of-vector.ts`.

Sources: [E]

## angleBetweenPoints

Formula: atan2(to.y - from.y, to.x - from.x) in degrees

Example: `angleBetweenPoints({x:10,y:10},{x:10,y:30})` gives `90`.

Pitfall: Same point: 0. An element below another is at +90, not -90.

Kit: `angleBetweenPoints(from: Point, to: Point): number` in `kit/geometry/angle-between-points.ts`.

Sources: [E]

## signedAngleBetweenVectors

Formula: atan2(cross(u, v), dot(u, v)) in degrees. Same value as sign(cross) * acos(dot / (|u|*|v|)), without the division.

Example: `signedAngleBetweenVectors({x:1,y:0},{x:0,y:1})` gives `90`.

Pitfall: A zero vector gives 0.

Kit: `signedAngleBetweenVectors(u: Point, v: Point): number` in `kit/geometry/signed-angle-between-vectors.ts`.

Sources: [S4]

## Sources

- [S4] W3C, 2026, "Appendix B: Implementation Notes", <https://www.w3.org/TR/SVG2/implnote.html>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
