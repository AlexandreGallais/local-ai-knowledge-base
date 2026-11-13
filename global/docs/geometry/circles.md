---
id: circles
title: "SVG geometry: polar coordinates, circle, objects on a circle"
topic: geometry
summary: "Polar coordinates, N points on a circle or an arc, chord and arc length, radius for a chord."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S4]
license: MIT, written for this base; facts from the sources below
---

# SVG geometry: polar coordinates, circle, objects on a circle

Contents: polarToCartesian · cartesianToPolar · distributeOnCircle · distributeOnArc · chordLength · arcLength · radiusForChord · Sources

A dial that starts at 12 o'clock uses a start angle of -90.

Conventions: user units, y axis down, angles in degrees from the +x axis, clockwise on screen. Compare results with a tolerance.

## polarToCartesian

Formula: x = cx + r*cos(a), y = cy + r*sin(a)

Example: `polarToCartesian({x:100,y:100},50,0)` gives `{'x':150,'y':100}`.

Pitfall: `Math.cos(Math.PI / 2)` is 6.1e-17, not 0: compare with a tolerance, round before writing to an attribute.

Kit: `polarToCartesian(center: Point, radius: number, angleDegrees: number): Point` in `kit/geometry/polar-to-cartesian.ts`.

Sources: [S4]

## cartesianToPolar

Formula: radius = distance(center, point); angle = atan2(dy, dx) in degrees

Example: `cartesianToPolar({x:100,y:100},{x:100,y:150})` gives `{'radius':50,'angleDegrees':90}`.

Pitfall: The point on the centre gives radius 0 and angle 0.

Kit: `cartesianToPolar(center: Point, point: Point): { angleDegrees: number; radius: number; }` in `kit/geometry/cartesian-to-polar.ts`.

Sources: [E]

## distributeOnCircle

Formula: step = 360 / count; angle_i = start + i*step; point_i = polarToCartesian(center, radius, angle_i)

Example: `distributeOnCircle({ center: {x:0,y:0}, radius: 10 }, 6, 0)` gives `[{'x':10,'y':0,'angleDegrees':0},{'x':5,'y':8.660254038,'angleDegrees':60},{'x':-5,'y':8.660254038,'angleDegrees':120},{ ...`.

Pitfall: count must be an integer >= 1, else `RangeError`. The last point is one step before the start: never divide by count - 1 on a full circle.

Kit: `distributeOnCircle(circle: Circle, count: number, startAngleDegrees: number): readonly PlacedPoint[]` in `kit/geometry/distribute-on-circle.ts`.

Sources: [E]

## distributeOnArc

Formula: step = (end - start) / (count - 1); the first point is on start, the last on end

Example: `distributeOnArc({ center: {x:0,y:0}, radius: 10, startAngleDegrees: -180, endAngleDegrees: 0 }, 5).map(p => p.angleDegrees)` gives `[-180,-135,-90,-45,0]`.

Pitfall: count = 1: one point at the middle angle. On an arc, divide by count - 1; on a full circle, by count.

Kit: `distributeOnArc(arc: Arc, count: number): readonly PlacedPoint[]` in `kit/geometry/distribute-on-arc.ts`.

Sources: [E]

## chordLength

Formula: 2 * r * sin(|angle| / 2)

Example: `chordLength(10, 60)` gives `10`.

Pitfall: The straight distance between two neighbours on a circle of N objects is chordLength(r, 360 / N).

Kit: `chordLength(radius: number, angleDegrees: number): number` in `kit/geometry/chord-length.ts`.

Sources: [E]

## arcLength

Formula: r * |angle in radians|

Example: `arcLength(10, 90)` gives `15.707963268`.

Pitfall: Use it for `stroke-dasharray` on a circle gauge.

Kit: `arcLength(radius: number, angleDegrees: number): number` in `kit/geometry/arc-length.ts`.

Sources: [E]

## radiusForChord

Formula: chord / (2 * sin(PI / count)): the radius on which count objects are `chord` apart

Example: `radiusForChord(6, 10)` gives `10`.

Pitfall: count must be an integer >= 2.

Kit: `radiusForChord(count: number, chord: number): number` in `kit/geometry/radius-for-chord.ts`.

Sources: [E]

## Sources

- [S4] W3C, 2026, "Appendix B: Implementation Notes", <https://www.w3.org/TR/SVG2/implnote.html>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
