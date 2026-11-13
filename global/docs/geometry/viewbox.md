---
id: viewbox
title: "SVG geometry: viewbox and screen coordinates"
topic: geometry
summary: "The matrix of a viewBox and preserveAspectRatio, and a pointer position turned into user units."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S2, S5]
license: MIT, written for this base; facts from the sources below
---

# SVG geometry: viewbox and screen coordinates

Contents: viewBoxMatrix · clientToUserPoint · Sources

The browser gives the full matrix with `getScreenCTM()`. These functions do the same computation without a DOM, for tests and for the server.

Conventions: user units, y axis down, angles in degrees from the +x axis, clockwise on screen. Compare results with a tolerance.

## viewBoxMatrix

Formula: sx = vp.width / vb.width; sy = vp.height / vb.height; meet: both = min; slice: both = max; tx = vp.x - vb.x*sx; ty = vp.y - vb.y*sy; mid adds half the free space, max adds all of it

Example: `viewBoxMatrix({x:0,y:0,width:100,height:50}, {x:0,y:0,width:200,height:200}, { alignX: 'mid', alignY: 'mid', fit: 'meet' })` gives `[2,0,0,2,0,50]`.

Pitfall: viewBox width or height <= 0: throws `RangeError` (SVG: negative is an error, zero disables rendering). `none` ignores the alignment and scales each axis apart.

Kit: `viewBoxMatrix(viewBox: Rect, viewport: Rect, aspect: AspectRatio): Matrix` in `kit/geometry/view-box-matrix.ts`.

Sources: [S2]

## clientToUserPoint

Formula: applyMatrixToPoint(invertMatrix(screenMatrix), clientPoint)

Example: `clientToUserPoint([2,0,0,2,0,50], {x:100,y:100})` gives `{'x':50,'y':25}`.

Pitfall: The matrix comes from `element.getScreenCTM()`; it is `null` when the element is not in the document. The inverse does not exist when a scale is 0.

Kit: `clientToUserPoint(screenMatrix: Matrix, clientPoint: Point): Point` in `kit/geometry/client-to-user-point.ts`.

Sources: [S5]

## Sources

- [S2] W3C, 2026, "Coordinate Systems, Transformations and Units", <https://www.w3.org/TR/SVG2/coords.html>.
- [S5] W3C, 2026, "Basic Data Types and Interfaces", <https://www.w3.org/TR/SVG2/types.html>.
