---
title: "SVGFEMorphologyElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfemorphologyelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEMorphologyElement

The **`SVGFEMorphologyElement`** interface corresponds to the `<feMorphology>` element.

## Static properties

- `SVG_MORPHOLOGY_OPERATOR_UNKNOWN` (0)
    The type is not one of predefined types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type.
- `SVG_MORPHOLOGY_OPERATOR_ERODE` (1)
    Corresponds to the value `erode`.
- `SVG_MORPHOLOGY_OPERATOR_DILATE` (2)
    Corresponds to the value `dilate`.

## Instance properties

_This interface also inherits properties from its parent interface, `SVGElement`._

- `SVGFEMorphologyElement.height` (read-only)
    An `SVGAnimatedLength` corresponding to the `height` attribute of the given element.
- `SVGFEMorphologyElement.in1` (read-only)
    An `SVGAnimatedString` corresponding to the `in` attribute of the given element.
- `SVGFEMorphologyElement.operator` (read-only)
    An `SVGAnimatedEnumeration` corresponding to the `operator` attribute of the given element. It takes one of the `SVG_MORPHOLOGY_OPERATOR_*` constants defined on this interface.
- `SVGFEMorphologyElement.radiusX` (read-only)
    An `SVGAnimatedNumber` corresponding to the X component of the `radius` attribute of the given element.
- `SVGFEMorphologyElement.radiusY` (read-only)
    An `SVGAnimatedNumber` corresponding to the Y component of the `radius` attribute of the given element.
- `SVGFEMorphologyElement.result` (read-only)
    An `SVGAnimatedString` corresponding to the `result` attribute of the given element.
- `SVGFEMorphologyElement.width` (read-only)
    An `SVGAnimatedLength` corresponding to the `width` attribute of the given element.
- `SVGFEMorphologyElement.x` (read-only)
    An `SVGAnimatedLength` corresponding to the `x` attribute of the given element.
- `SVGFEMorphologyElement.y` (read-only)
    An `SVGAnimatedLength` corresponding to the `y` attribute of the given element.

## Instance methods

_This interface does not provide any specific methods, but implements those of its parent, `SVGElement`._

## See also

- `<feMorphology>`
