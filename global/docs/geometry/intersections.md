---
id: intersections
title: "SVG geometry: intersections"
topic: geometry
summary: "Lines, segments and circles that cross, closest point and distance to a segment."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S18, S20]
license: MIT, written for this base; facts from the sources below
---

# SVG geometry: intersections

Contents: intersectLines · intersectSegments · closestPointOnSegment · distancePointToSegment · intersectLineCircle · intersectSegmentCircle · intersectCircles · Sources

Exact comparison with 0 is used below. On measured values, compare with a tolerance.

Conventions: user units, y axis down, angles in degrees from the +x axis, clockwise on screen. Compare results with a tolerance.

## intersectLines

Formula: den = (y4-y3)(x2-x1) - (x4-x3)(y2-y1); ua = ((x4-x3)(y1-y3) - (y4-y3)(x1-x3)) / den; ub = ((x2-x1)(y1-y3) - (y2-y1)(x1-x3)) / den; point = p1 + ua*(p2 - p1)

Example: `intersectLines({ start: {x:0,y:0}, end: {x:10,y:10} }, { start: {x:0,y:10}, end: {x:10,y:0} })` gives `{'kind':'point','point':{'x':5,'y':5},'ua':0.5,'ub':0.5}`.

Pitfall: den = 0: `parallel`; den = 0 and both numerators 0: `coincident`. The lines are infinite: ua and ub can be outside [0, 1].

Kit: `intersectLines(a: Segment, b: Segment): LineIntersection` in `kit/geometry/intersect-lines.ts`.

Sources: [S18]

## intersectSegments

Formula: intersectLines, kept only when 0 <= ua <= 1 and 0 <= ub <= 1

Example: `intersectSegments({ start: {x:0,y:0}, end: {x:10,y:10} }, { start: {x:0,y:10}, end: {x:10,y:0} })` gives `{'x':5,'y':5}`.

Pitfall: Parallel or coincident segments give `null`, even when they overlap. End points count as crossing.

Kit: `intersectSegments(a: Segment, b: Segment): null | Point` in `kit/geometry/intersect-segments.ts`.

Sources: [S18]

## closestPointOnSegment

Formula: u = ((p - a) . (b - a)) / |b - a|^2, clamped to [0, 1]; point = a + u*(b - a)

Example: `closestPointOnSegment({x:5,y:5},{x:0,y:0},{x:10,y:0})` gives `{'x':5,'y':0}`.

Pitfall: a = b: returns a. Without the clamp, the point is on the infinite line.

Kit: `closestPointOnSegment(p: Point, a: Point, b: Point): Point` in `kit/geometry/closest-point-on-segment.ts`.

Sources: [S18]

## distancePointToSegment

Formula: distance(p, closestPointOnSegment(p, a, b))

Example: `distancePointToSegment({x:5,y:5},{x:0,y:0},{x:10,y:0})` gives `5`.

Pitfall: Use it to test a click near a line.

Kit: `distancePointToSegment(p: Point, a: Point, b: Point): number` in `kit/geometry/distance-point-to-segment.ts`.

Sources: [S18]

## intersectLineCircle

Formula: a = |p2 - p1|^2; b = 2*((p2 - p1) . (p1 - c)); c = |p1 - c|^2 - r^2; u = (-b +- sqrt(b^2 - 4ac)) / 2a. Returns the u values, smallest first.

Example: `intersectLineCircle({ start: {x:-10,y:0}, end: {x:10,y:0} }, { center: {x:0,y:0}, radius: 5 })` gives `[0.25,0.75]`.

Pitfall: b^2 - 4ac < 0: no value. = 0: one value (tangent). p1 = p2: throws `RangeError`.

Kit: `intersectLineCircle(line: Segment, circle: Circle): readonly number[]` in `kit/geometry/intersect-line-circle.ts`.

Sources: [S20]

## intersectSegmentCircle

Formula: the points of intersectLineCircle whose u is in [0, 1]

Example: `intersectSegmentCircle({ start: {x:-10,y:0}, end: {x:10,y:0} }, { center: {x:0,y:0}, radius: 5 })` gives `[{'x':-5,'y':0},{'x':5,'y':0}]`.

Pitfall: A segment fully inside the circle gives no point.

Kit: `intersectSegmentCircle(segment: Segment, circle: Circle): readonly Point[]` in `kit/geometry/intersect-segment-circle.ts`.

Sources: [S20]

## intersectCircles

Formula: d = |c1 - c0|; a = (r0^2 - r1^2 + d^2) / 2d; h = sqrt(r0^2 - a^2); p2 = c0 + a*(c1 - c0)/d; points = p2 +- h*(perpendicular of (c1 - c0))/d

Example: `intersectCircles({ center: {x:0,y:0}, radius: 5 }, { center: {x:8,y:0}, radius: 5 })` gives `{'kind':'points','points':[{'x':4,'y':-3},{'x':4,'y':3}]}`.

Pitfall: d > r0 + r1: `separate`. d < |r0 - r1|: `contained`. d = 0 and r0 = r1: `coincident`. Tangent circles: one point.

Kit: `intersectCircles(a: Circle, b: Circle): CircleIntersection` in `kit/geometry/intersect-circles.ts`.

Sources: [S20]

## Sources

- [S18] P. Bourke, 1988-1989, "Points, lines, and planes", <https://paulbourke.net/geometry/pointlineplane/>.
- [S20] P. Bourke, 1990-1997, "Circles and spheres", <https://paulbourke.net/geometry/circlesphere/>.
