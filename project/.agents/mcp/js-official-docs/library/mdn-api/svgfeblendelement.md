---
title: "SVGFEBlendElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeblendelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEBlendElement

The **`SVGFEBlendElement`** interface corresponds to the `<feBlend>` element.

## Static properties

- `SVG_FEBLEND_MODE_UNKNOWN` (0)
    The type is not one of predefined types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type.
- `SVG_FEBLEND_MODE_NORMAL` (1)
    Corresponds to the value `normal`.
- `SVG_FEBLEND_MODE_MULTIPLY` (2)
    Corresponds to the value `multiply`.
- `SVG_FEBLEND_MODE_SCREEN` (3)
    Corresponds to the value `screen`.
- `SVG_FEBLEND_MODE_DARKEN` (4)
    Corresponds to the value `darken`.
- `SVG_FEBLEND_MODE_LIGHTEN` (5)
    Corresponds to the value `lighten`.

## Instance properties

_This interface also inherits properties from its parent interface, `SVGElement`._

- `SVGFEBlendElement.height` (read-only)
    An `SVGAnimatedLength` corresponding to the `height` attribute of the given element.
- `SVGFEBlendElement.in1` (read-only)
    An `SVGAnimatedString` corresponding to the `in` attribute of the given element.
- `SVGFEBlendElement.in2` (read-only)
    An `SVGAnimatedString` corresponding to the `in2` attribute of the given element.
- `SVGFEBlendElement.mode` (read-only)
    An `SVGAnimatedEnumeration` corresponding to the `mode` attribute of the given element. It takes one of the `SVG_FEBLEND_MODE_*` constants defined on this interface.
- `SVGFEBlendElement.result` (read-only)
    An `SVGAnimatedString` corresponding to the `result` attribute of the given element.
- `SVGFEBlendElement.width` (read-only)
    An `SVGAnimatedLength` corresponding to the `width` attribute of the given element.
- `SVGFEBlendElement.x` (read-only)
    An `SVGAnimatedLength` corresponding to the `x` attribute of the given element.
- `SVGFEBlendElement.y` (read-only)
    An `SVGAnimatedLength` corresponding to the `y` attribute of the given element.

## Instance methods

_This interface does not provide any specific methods, but implements those of its parent, `SVGElement`._

## See also

- `<feBlend>`
