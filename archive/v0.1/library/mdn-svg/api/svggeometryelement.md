---
title: "SVGGeometryElement"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svggeometryelement/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGGeometryElement

The `SVGGeometryElement` interface represents SVG elements whose rendering is defined by geometry with an equivalent path, and which can be filled and stroked. This includes paths and the basic shapes.

## Instance properties

_This interface also inherits properties from its parent, `SVGGraphicsElement`._

- `SVGGeometryElement.pathLength` (read-only)
    This property reflects the `pathLength` attribute.

## Instance methods

_This interface also inherits methods from its parent, `SVGGraphicsElement`._

- `SVGGeometryElement.isPointInFill()`
    Determines whether a given point is within the fill shape of an element. Normal hit testing rules apply; the value of the `pointer-events` property on the element determines whether a point is considered to be within the fill.
- `SVGGeometryElement.isPointInStroke()`
    Determines whether a given point is within the stroke shape of an element. Normal hit testing rules apply; the value of the `pointer-events` property on the element determines whether a point is considered to be within the stroke.
- `SVGGeometryElement.getTotalLength()`
    Returns the user agent's computed value for the total length of the path in user units.
- `SVGGeometryElement.getPointAtLength()`
    Returns the point at a given distance along the path.
