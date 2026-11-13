---
id: path-builders
title: "SVG geometry: path builders"
topic: geometry
summary: "The d attribute of a polyline and of a rounded rectangle."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S3, S9]
license: MIT, written for this base; facts from the sources below
---

# SVG geometry: path builders

Contents: polylinePath · roundedRectPath · Sources

These functions return the value of the `d` attribute. Every number goes through `formatNumber`.

Conventions: user units, y axis down, angles in degrees from the +x axis, clockwise on screen. Compare results with a tolerance.

## polylinePath

Formula: `M x y L x y ...`, with ` Z` when closed

Example: `polylinePath([{x:0,y:0},{x:10,y:0},{x:10,y:10}], true)` gives `'M 0 0 L 10 0 L 10 10 Z'`.

Pitfall: Fewer than two points: throws `RangeError`. After `Z` the current point is the start point of the subpath.

Kit: `polylinePath(points: readonly Point[], isClosed: boolean): string` in `kit/geometry/polyline-path.ts`.

Sources: [S3] [S9]

## roundedRectPath

Formula: four lines and four quarter arcs, sweep flag 1 (clockwise on screen)

Example: `roundedRectPath({x:0,y:0,width:40,height:20},5)` gives `'M 5 0 H 35 A 5 5 0 0 1 40 5 V 15 A 5 5 0 0 1 35 20 H 5 A 5 5 0 0 1 0 15 V 5 A 5 5 0 0 1 5 0 Z'`.

Pitfall: The radius is capped at half the smaller side. Radius <= 0: a plain rectangle.

Kit: `roundedRectPath(rect: Rect, cornerRadius: number): string` in `kit/geometry/rounded-rect-path.ts`.

Sources: [S3]

## Sources

- [S3] W3C, 2026, "Paths", <https://www.w3.org/TR/SVG2/paths.html>.
- [S9] MDN, page modifiée le 27 août 2026, "d", <https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d>.
