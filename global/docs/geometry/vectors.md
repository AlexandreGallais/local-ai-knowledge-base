---
id: vectors
title: "SVG geometry: vectors and distances"
topic: geometry
summary: "Add, subtract, scale, dot and cross products, length, normal vector, distance, midpoint, interpolation, with the kit functions."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S17]
license: MIT, written for this base; facts from the sources below
---

# SVG geometry: vectors and distances

Contents: addVectors · subtractVectors · scaleVector · dotProduct · crossProduct · vectorLength · normalizeVector · perpendicularVector · distanceBetween · midpoint · interpolatePoints · Sources

A vector and a point share the type `Point`. All functions return a new object.

Conventions: user units, y axis down, angles in degrees from the +x axis, clockwise on screen. Compare results with a tolerance.

## addVectors

Formula: (a.x + b.x, a.y + b.y)

Example: `addVectors({x:1,y:2},{x:3,y:-5})` gives `{'x':4,'y':-3}`.

Pitfall: none special; compare the result with a tolerance, never with ===.

Kit: `addVectors(a: Point, b: Point): Point` in `kit/geometry/add-vectors.ts`.

Sources: [E]

## subtractVectors

Formula: (a.x - b.x, a.y - b.y). The vector from b to a.

Example: `subtractVectors({x:4,y:6},{x:1,y:2})` gives `{'x':3,'y':4}`.

Pitfall: Order matters: `subtractVectors(to, from)`.

Kit: `subtractVectors(a: Point, b: Point): Point` in `kit/geometry/subtract-vectors.ts`.

Sources: [E]

## scaleVector

Formula: (v.x * factor, v.y * factor)

Example: `scaleVector({x:3,y:4},2)` gives `{'x':6,'y':8}`.

Pitfall: A negative factor reverses the vector.

Kit: `scaleVector(v: Point, factor: number): Point` in `kit/geometry/scale-vector.ts`.

Sources: [E]

## dotProduct

Formula: a.x*b.x + a.y*b.y = |a|*|b|*cos(angle)

Example: `dotProduct({x:1,y:2},{x:3,y:4})` gives `11`.

Pitfall: 0 when the vectors are perpendicular.

Kit: `dotProduct(a: Point, b: Point): number` in `kit/geometry/dot-product.ts`.

Sources: [E]

## crossProduct

Formula: a.x*b.y - a.y*b.x = |a|*|b|*sin(angle)

Example: `crossProduct({x:1,y:0},{x:0,y:1})` gives `1`.

Pitfall: 0 when the vectors are parallel. With y down, a positive value means b is clockwise from a on screen.

Kit: `crossProduct(a: Point, b: Point): number` in `kit/geometry/cross-product.ts`.

Sources: [E]

## vectorLength

Formula: sqrt(v.x^2 + v.y^2), with `Math.hypot`

Example: `vectorLength({x:3,y:4})` gives `5`.

Pitfall: Never negative.

Kit: `vectorLength(v: Point): number` in `kit/geometry/vector-length.ts`.

Sources: [E]

## normalizeVector

Formula: v / |v|

Example: `normalizeVector({x:3,y:4})` gives `{'x':0.6,'y':0.8}`.

Pitfall: Zero vector: throws `RangeError`. Never return NaN.

Kit: `normalizeVector(v: Point): Point` in `kit/geometry/normalize-vector.ts`.

Sources: [E]

## perpendicularVector

Formula: (-v.y, v.x): v turned by +90 degrees

Example: `perpendicularVector({x:1,y:0})` gives `{'x':0,'y':1}`.

Pitfall: With y down, +90 degrees is clockwise on screen.

Kit: `perpendicularVector(v: Point): Point` in `kit/geometry/perpendicular-vector.ts`.

Sources: [S17]

## distanceBetween

Formula: sqrt((b.x-a.x)^2 + (b.y-a.y)^2)

Example: `distanceBetween({x:1,y:1},{x:4,y:5})` gives `5`.

Pitfall: 0 for the same point.

Kit: `distanceBetween(a: Point, b: Point): number` in `kit/geometry/distance-between.ts`.

Sources: [E]

## midpoint

Formula: ((a.x+b.x)/2, (a.y+b.y)/2)

Example: `midpoint({x:0,y:0},{x:10,y:4})` gives `{'x':5,'y':2}`.

Pitfall: none special; compare the result with a tolerance, never with ===.

Kit: `midpoint(a: Point, b: Point): Point` in `kit/geometry/midpoint.ts`.

Sources: [E]

## interpolatePoints

Formula: a + (b - a) * t

Example: `interpolatePoints({x:0,y:0},{x:10,y:20},0.25)` gives `{'x':2.5,'y':5}`.

Pitfall: t = 0 gives a, t = 1 gives b. t outside [0, 1] extrapolates: clamp first if that is not wanted.

Kit: `interpolatePoints(a: Point, b: Point, t: number): Point` in `kit/geometry/interpolate-points.ts`.

Sources: [S17]

## Sources

- [S17] M. « Pomax » Kamermans, 2011-2020 (page mise à jour le 30 octobre 2026), "Pomax", <https://pomax.github.io/bezierinfo/>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
