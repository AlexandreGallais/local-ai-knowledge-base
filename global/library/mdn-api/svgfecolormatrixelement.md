---
title: "SVGFEColorMatrixElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfecolormatrixelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEColorMatrixElement

The **`SVGFEColorMatrixElement`** interface corresponds to the `<feColorMatrix>` element.

## Static properties

- `SVG_FECOLORMATRIX_TYPE_UNKNOWN` (0)
    The type is not one of predefined types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type.
- `SVG_FECOLORMATRIX_TYPE_MATRIX` (1)
    Corresponds to the value `matrix`.
- `SVG_FECOLORMATRIX_TYPE_SATURATE` (2)
    Corresponds to the value `saturate`.
- `SVG_FECOLORMATRIX_TYPE_HUEROTATE` (3)
    Corresponds to the value `hueRotate`.
- `SVG_FECOLORMATRIX_TYPE_LUMINANCETOALPHA` (4)
    Corresponds to the value `luminanceToAlpha`.

## Instance properties

_This interface also inherits properties from its parent interface, `SVGElement`._

- `SVGFEColorMatrixElement.height` (read-only)
    An `SVGAnimatedLength` corresponding to the `height` attribute of the given element.
- `SVGFEColorMatrixElement.in1` (read-only)
    An `SVGAnimatedString` corresponding to the `in` attribute of the given element.
- `SVGFEColorMatrixElement.result` (read-only)
    An `SVGAnimatedString` corresponding to the `result` attribute of the given element.
- `SVGFEColorMatrixElement.type` (read-only)
    An `SVGAnimatedEnumeration` corresponding to the `type` attribute of the given element. It takes one of the `SVG_FECOLORMATRIX_TYPE_*` constants defined on this interface.
- `SVGFEColorMatrixElement.values` (read-only)
    An `SVGAnimatedNumberList` corresponding to the `values` attribute of the given element.
- `SVGFEColorMatrixElement.width` (read-only)
    An `SVGAnimatedLength` corresponding to the `width` attribute of the given element.
- `SVGFEColorMatrixElement.x` (read-only)
    An `SVGAnimatedLength` corresponding to the `x` attribute of the given element.
- `SVGFEColorMatrixElement.y` (read-only)
    An `SVGAnimatedLength` corresponding to the `y` attribute of the given element.

## Instance methods

_This interface does not provide any specific methods, but implements those of its parent, `SVGElement`_.

## See also

- `<feColorMatrix>`
