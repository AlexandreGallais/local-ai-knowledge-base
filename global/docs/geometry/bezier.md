---
id: bezier
title: "SVG geometry: bezier curves"
topic: geometry
summary: "Points, tangents, split, bounding box and length of Bezier curves, and an arc as cubic curves."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S17]
license: MIT, written for this base; facts from the sources below
---

# SVG geometry: bezier curves

Contents: quadraticBezierPoint · cubicBezierPoint · cubicBezierDerivative · cubicBezierTangentAngle · splitCubicBezier · quadraticToCubic · cubicBezierBoundingBox · cubicBezierLength · circularArcToCubic · Sources

The tests use the cubic curve P0 (0, 0), P1 (0, 10), P2 (10, 10), P3 (10, 0): the path `M 0 0 C 0 10 10 10 10 0`.

Conventions: user units, y axis down, angles in degrees from the +x axis, clockwise on screen. Compare results with a tolerance.

## quadraticBezierPoint

Formula: (1-t)^2*p0 + 2*(1-t)*t*p1 + t^2*p2

Example: `quadraticBezierPoint({ p0: {x:0,y:0}, p1: {x:5,y:10}, p2: {x:10,y:0} }, 0.5)` gives `{'x':5,'y':5}`.

Pitfall: t = 0 gives p0, t = 1 gives p2. The curve does not pass through p1.

Kit: `quadraticBezierPoint(curve: QuadraticBezier, t: number): Point` in `kit/geometry/quadratic-bezier-point.ts`.

Sources: [S17]

## cubicBezierPoint

Formula: (1-t)^3*p0 + 3*(1-t)^2*t*p1 + 3*(1-t)*t^2*p2 + t^3*p3

Example: `cubicBezierPoint({ p0: P0, p1: P1, p2: P2, p3: P3 }, 0.5)` gives `{'x':5,'y':7.5}`.

Pitfall: t is not a distance: t = 0.5 is not the middle of the length in general.

Kit: `cubicBezierPoint(curve: CubicBezier, t: number): Point` in `kit/geometry/cubic-bezier-point.ts`.

Sources: [S17]

## cubicBezierDerivative

Formula: 3*(1-t)^2*(p1-p0) + 6*(1-t)*t*(p2-p1) + 3*t^2*(p3-p2)

Example: `cubicBezierDerivative({ p0: P0, p1: P1, p2: P2, p3: P3 }, 0)` gives `{'x':0,'y':30}`.

Pitfall: The zero vector when p0 = p1 at t = 0 (or p2 = p3 at t = 1): the tangent then needs the next control point.

Kit: `cubicBezierDerivative(curve: CubicBezier, t: number): Point` in `kit/geometry/cubic-bezier-derivative.ts`.

Sources: [S17]

## cubicBezierTangentAngle

Formula: angleOfVector(cubicBezierDerivative(...))

Example: `cubicBezierTangentAngle({ p0: P0, p1: P1, p2: P2, p3: P3 }, 0)` gives `90`.

Pitfall: Use it to turn an arrow head or a flow marker along a pipe.

Kit: `cubicBezierTangentAngle(curve: CubicBezier, t: number): number` in `kit/geometry/cubic-bezier-tangent-angle.ts`.

Sources: [S17]

## splitCubicBezier

Formula: de Casteljau: interpolate the 4 points at t, then the 3 results, then the 2. Left = first point of each level, right = last point of each level.

Example: `splitCubicBezier({ p0: P0, p1: P1, p2: P2, p3: P3 }, 0.5)` gives `[[{'x':0,'y':0},{'x':0,'y':5},{'x':2.5,'y':7.5},{'x':5,'y':7.5}],[{'x':5,'y':7.5},{'x':7.5,'y':7.5},{'x':10,'y':5},{'x': ...`.

Pitfall: The two halves share the split point.

Kit: `splitCubicBezier(curve: CubicBezier, t: number): readonly [ CubicBezier, CubicBezier, ]` in `kit/geometry/split-cubic-bezier.ts`.

Sources: [S17]

## quadraticToCubic

Formula: [p0, p0 + 2/3*(p1 - p0), p2 + 2/3*(p1 - p2), p2]

Example: `quadraticToCubic({ p0: {x:0,y:0}, p1: {x:6,y:12}, p2: {x:12,y:0} })` gives `[{'x':0,'y':0},{'x':4,'y':8},{'x':8,'y':8},{'x':12,'y':0}]`.

Pitfall: The curve is the same, exactly.

Kit: `quadraticToCubic(curve: QuadraticBezier): CubicBezier` in `kit/geometry/quadratic-to-cubic.ts`.

Sources: [S17]

## cubicBezierBoundingBox

Formula: per axis, the roots in (0, 1) of a*t^2 + b*t + c with a = 3*(-p0 + 3*p1 - 3*p2 + p3), b = 6*(p0 - 2*p1 + p2), c = 3*(p1 - p0); box of the curve at these t and at 0 and 1

Example: `cubicBezierBoundingBox({ p0: P0, p1: P1, p2: P2, p3: P3 })` gives `{'x':0,'y':0,'width':10,'height':7.5}`.

Pitfall: The box of the control points is larger: here its height is 10, the curve reaches 7.5. a = 0: the equation is linear.

Kit: `cubicBezierBoundingBox(curve: CubicBezier): Rect` in `kit/geometry/cubic-bezier-bounding-box.ts`.

Sources: [S17]

## cubicBezierLength

Formula: integral over [0, 1] of |derivative(t)|, by Gauss-Legendre quadrature: 0.5 * sum(w_i * |derivative(0.5*x_i + 0.5)|)

Example: `cubicBezierLength({ p0: P0, p1: P1, p2: P2, p3: P3 })` gives `20`.

Pitfall: No exact formula for a cubic. Test with a tolerance of 1e-6. A browser gives 20.000004 for this curve with `getTotalLength()`.

Kit: `cubicBezierLength(curve: CubicBezier): number` in `kit/geometry/cubic-bezier-length.ts`.

Sources: [S17]

## circularArcToCubic

Formula: k = 4/3 * tan(sweep / 4); control 1 = start + k*r*(tangent at start); control 2 = end - k*r*(tangent at end)

Example: `circularArcToCubic({ center: {x:0,y:0}, radius: 10, startAngleDegrees: 0, endAngleDegrees: 90 })` gives `[{'x':10,'y':0},{'x':10,'y':5.522847498},{'x':5.522847498,'y':10},{'x':0,'y':10}]`.

Pitfall: |sweep| > 90: throws `RangeError`; split the arc first. A quarter circle has k = 0.5522847498. The result is an approximation.

Kit: `circularArcToCubic(arc: Arc): CubicBezier` in `kit/geometry/circular-arc-to-cubic.ts`.

Sources: [S17]

## Sources

- [S17] M. « Pomax » Kamermans, 2011-2020 (page mise à jour le 30 octobre 2026), "Pomax", <https://pomax.github.io/bezierinfo/>.
