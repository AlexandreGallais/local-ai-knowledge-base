---
title: "SVGFECompositeElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfecompositeelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFECompositeElement

The **`SVGFECompositeElement`** interface corresponds to the `<feComposite>` element.

## Static properties

- `SVG_FECOMPOSITE_OPERATOR_UNKNOWN` (0)
    The type is not one of predefined types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type.
- `SVG_FECOMPOSITE_OPERATOR_OVER` (1)
    Corresponds to the value `over`.
- `SVG_FECOMPOSITE_OPERATOR_IN` (2)
    Corresponds to the value `in`.
- `SVG_FECOMPOSITE_OPERATOR_OUT` (3)
    Corresponds to the value `out`.
- `SVG_FECOMPOSITE_OPERATOR_ATOP` (4)
    Corresponds to the value `atop`.
- `SVG_FECOMPOSITE_OPERATOR_XOR` (5)
    Corresponds to the value `xor`.
- `SVG_FECOMPOSITE_OPERATOR_ARITHMETIC` (6)
    Corresponds to the value `arithmetic`.

## Instance properties

_This interface also inherits properties from its parent interface, `SVGElement`._

- `SVGFECompositeElement.height` (read-only)
    An `SVGAnimatedLength` corresponding to the `height` attribute of the given element.
- `SVGFECompositeElement.in1` (read-only)
    An `SVGAnimatedString` corresponding to the `in` attribute of the given element.
- `SVGFECompositeElement.in2` (read-only)
    An `SVGAnimatedString` corresponding to the `in2` attribute of the given element.
- `SVGFECompositeElement.operator` (read-only)
    An `SVGAnimatedEnumeration` corresponding to the `operator` attribute of the given element.
- `SVGFECompositeElement.k1` (read-only)
    An `SVGAnimatedNumber` corresponding to the `k1` attribute of the given element.
- `SVGFECompositeElement.k2` (read-only)
    An `SVGAnimatedNumber` corresponding to the `k2` attribute of the given element.
- `SVGFECompositeElement.k3` (read-only)
    An `SVGAnimatedNumber` corresponding to the `k3` attribute of the given element.
- `SVGFECompositeElement.k4` (read-only)
    An `SVGAnimatedNumber` corresponding to the `k4` attribute of the given element.
- `SVGFECompositeElement.result` (read-only)
    An `SVGAnimatedString` corresponding to the `result` attribute of the given element.
- `SVGFECompositeElement.width` (read-only)
    An `SVGAnimatedLength` corresponding to the `width` attribute of the given element.
- `SVGFECompositeElement.x` (read-only)
    An `SVGAnimatedLength` corresponding to the `x` attribute of the given element.
- `SVGFECompositeElement.y` (read-only)
    An `SVGAnimatedLength` corresponding to the `y` attribute of the given element.

## Instance methods

_This interface does not provide any specific methods, but implements those of its parent, `SVGElement`._

## See also

- `<feComposite>`
