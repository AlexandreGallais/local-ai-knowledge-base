---
title: "SVGPolylineElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgpolylineelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGPolylineElement

The **`SVGPolylineElement`** interface provides access to the properties of `<polyline>` elements, as well as methods to manipulate them.

## Instance properties

_This interface also inherits properties from its parent, `SVGGeometryElement`._

- `SVGPolylineElement.animatedPoints` (read-only)
    An `SVGPointList` representing the animated value of the element's `points` attribute. If the `points` attribute is not being animated, it contains the same value as the `points` property.
- `SVGPolylineElement.points` (read-only)
    An `SVGPointList` representing the base (i.e., static) value of the element's `points` attribute. Modifications via the `SVGPointList` object are reflected in the `points` attribute, and vice versa.

## Instance methods

_This interface doesn't implement any specific methods, but inherits methods from its parent, `SVGGeometryElement`._

## See also

- `<polyline>`
