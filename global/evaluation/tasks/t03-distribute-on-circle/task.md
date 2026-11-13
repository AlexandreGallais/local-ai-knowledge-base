---
id: t03
title: "Points at equal distance on a circle"
project: ts-pure-lib
size: medium
proof: src/distribute-on-circle.proof.spec.ts
test: npx --no -- vitest run src/distribute-on-circle.proof.spec.ts
---

# T03 · Points at equal distance on a circle

## Request

Add the function `distributeOnCircle(circle, count, startAngleDegrees)` in `src/distribute-on-circle.ts`, to place indicator lights around an SVG gauge. `circle` is `{ center: { x, y }, radius }`. It returns `count` points at equal distance on the circle, in order, each as `{ x, y, angleDegrees }`. The first point is at `startAngleDegrees`; angles are in degrees, 0 on +x, clockwise on screen (the SVG y axis points down). `count` must be an integer of 1 or more, else a `RangeError`. Write its documentation and its test.

## Proof of success

The format and lint passes end with 0 errors, the project compiles, and the proof test passes: 4 points on a circle of radius 10 around (0, 0), starting at -90 degrees, are (0, -10), (10, 0), (0, 10), (-10, 0); a count of 0 throws a `RangeError`.
