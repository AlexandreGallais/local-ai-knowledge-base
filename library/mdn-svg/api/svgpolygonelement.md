---
title: "SVGPolygonElement"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgpolygonelement/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGPolygonElement

The **`SVGPolygonElement`** interface provides access to the properties of `<polygon>` elements, as well as methods to manipulate them.

## Instance properties

_This interface also inherits properties from its parent, `SVGGeometryElement`._

- `SVGPolygonElement.animatedPoints` (read-only)
    An `SVGPointList` representing the animated value of the element's `points` attribute. If the `points` attribute is not being animated, it contains the same value as the `points` property.
- `SVGPolygonElement.points` (read-only)
    An `SVGPointList` representing the base (i.e., static) value of the element's `points` attribute. Modifications via the `SVGPointList` object are reflected in the `points` attribute, and vice versa.

## Instance methods

_This interface doesn't implement any specific methods, but inherits methods from its parent, `SVGGeometryElement`._

## See also

- `<polygon>`
