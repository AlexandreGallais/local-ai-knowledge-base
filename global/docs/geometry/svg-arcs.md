---
id: svg-arcs
title: "SVG geometry: svg arcs"
topic: geometry
summary: "Numbers for SVG attributes, arc and sector paths, the endpoint and center forms of the SVG arc command, a point on an ellipse."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S3, S4]
license: MIT, written for this base; facts from the sources below
---

# SVG geometry: svg arcs

Contents: formatNumber · describeArc · describeSector · arcEndpointToCenter · pointOnEllipse · arcCenterToEndpoint · Sources

The path command is `A rx ry x-axis-rotation large-arc-flag sweep-flag x y`. It gives the two end points, not the centre.

Conventions: user units, y axis down, angles in degrees from the +x axis, clockwise on screen. Compare results with a tolerance.

## formatNumber

Formula: round to `decimals` places, then `String`

Example: `formatNumber(6.123e-16, 3)` gives `'0'`.

Pitfall: NaN or Infinity: throws `RangeError`. -0 is written `0`. `String(1e-7)` is `1e-7`: rounding first avoids it.

Kit: `formatNumber(value: number, decimals: number): string` in `kit/geometry/format-number.ts`.

Sources: [E]

## describeArc

Formula: sweep = end - start; large-arc-flag = |sweep| > 180 ? 1 : 0; sweep-flag = sweep > 0 ? 1 : 0; `M start A r r 0 large sweep end`

Example: `describeArc({ center: {x:100,y:100}, radius: 50, startAngleDegrees: 0, endAngleDegrees: 90 })` gives `'M 150 100 A 50 50 0 0 1 100 150'`.

Pitfall: sweep = 0: throws `RangeError`. |sweep| >= 360: two half arcs, because an arc whose two end points are equal is not drawn.

Kit: `describeArc(arc: Arc): string` in `kit/geometry/describe-arc.ts`.

Sources: [S3] [S4]

## describeSector

Formula: describeArc(...) + ` L center Z`

Example: `describeSector({ center: {x:0,y:0}, radius: 10, startAngleDegrees: 0, endAngleDegrees: 90 })` gives `'M 10 0 A 10 10 0 0 1 0 10 L 0 0 Z'`.

Pitfall: Same as describeArc.

Kit: `describeSector(arc: Arc): string` in `kit/geometry/describe-sector.ts`.

Sources: [S3]

## arcEndpointToCenter

Formula: SVG 2, B.2.4 and B.2.5. (1) x1p, y1p = rotate(-phi) of half the chord. (2) L = x1p^2/rx^2 + y1p^2/ry^2; if L > 1, multiply rx and ry by sqrt(L). (3) cxp, cyp = +-sqrt((rx^2*ry^2 - rx^2*y1p^2 - ry^2*x1p^2) / (rx^2*y1p^2 + ry^2*x1p^2)) * (rx*y1p/ry, -ry*x1p/rx), sign + when largeArc != sweep. (4) centre = rotate(phi) of (cxp, cyp) + chord middle. (5) start angle and sweep by signed angles; sweep < 0 when the sweep flag is 0.

Example: `arcEndpointToCenter({x1:0,y1:0,rx:10,ry:10,rotationDegrees:0,largeArc:false,sweep:true,x2:10,y2:10})` gives `{'kind':'arc','cx':0,'cy':10,'rx':10,'ry':10,'rotationDegrees':0,'startAngleDegrees':-90,'sweepAngleDegrees':90}`.

Pitfall: Equal end points: `omitted`. rx = 0 or ry = 0: `line`. Negative radius: absolute value. Radii too small: scaled up. Clamp the square root argument at 0.

Kit: `arcEndpointToCenter(arc: EndpointArc): ArcConversion` in `kit/geometry/arc-endpoint-to-center.ts`.

Sources: [S4]

## pointOnEllipse

Formula: x = rx*cos(t)*cos(phi) - ry*sin(t)*sin(phi) + cx; y = rx*cos(t)*sin(phi) + ry*sin(t)*cos(phi) + cy

Example: `pointOnEllipse({ cx: 0, cy: 0, rx: 20, ry: 10, rotationDegrees: 0 }, 90)` gives `{'x':0,'y':10}`.

Pitfall: t is the angle before the stretch and the rotation: it is not the visual angle when rx != ry.

Kit: `pointOnEllipse(ellipse: Ellipse, angleDegrees: number): Point` in `kit/geometry/point-on-ellipse.ts`.

Sources: [S4]

## arcCenterToEndpoint

Formula: start = pointOnEllipse(start angle); end = pointOnEllipse(start + sweep); largeArc = |sweep| > 180; sweep flag = sweep > 0

Example: `arcCenterToEndpoint({cx:0,cy:10,rx:10,ry:10,rotationDegrees:0,startAngleDegrees:-90,sweepAngleDegrees:90})` gives `{'x1':0,'y1':0,'rx':10,'ry':10,'rotationDegrees':0,'largeArc':false,'sweep':true,'x2':10,'y2':10}`.

Pitfall: |sweep| >= 360 cannot be written as one arc.

Kit: `arcCenterToEndpoint(arc: CenterArc): EndpointArc` in `kit/geometry/arc-center-to-endpoint.ts`.

Sources: [S4]

## Sources

- [S3] W3C, 2026, "Paths", <https://www.w3.org/TR/SVG2/paths.html>.
- [S4] W3C, 2026, "Appendix B: Implementation Notes", <https://www.w3.org/TR/SVG2/implnote.html>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
