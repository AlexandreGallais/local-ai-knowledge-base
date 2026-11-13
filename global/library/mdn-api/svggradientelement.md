---
title: "SVGGradientElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svggradientelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGGradientElement

The **`SVGGradient`** interface is a base interface used by `SVGLinearGradientElement` and `SVGRadialGradientElement`.

## Static properties

- `SVG_SPREADMETHOD_UNKNOWN` (0)
    The type is not one of predefined types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type.
- `SVG_SPREADMETHOD_PAD` (1)
    Corresponds to value `pad`.
- `SVG_SPREADMETHOD_REFLECT` (2)
    Corresponds to value `reflect`.
- `SVG_SPREADMETHOD_REPEAT` (3)
    Corresponds to value `repeat`.

## Instance properties

_This interface also inherits properties from its parent, `SVGElement`._

- `SVGGradientElement.href` (read-only)
    An `SVGAnimatedString` corresponding to the `href` or `xlink:href` attribute of the given element.
- `SVGGradientElement.gradientUnits` (read-only)
    An `SVGAnimatedEnumeration` corresponding to the `gradientUnits` attribute on the given element. This property takes one of the constants defined in `SVGUnitTypes`.
- `SVGGradientElement.gradientTransform` (read-only)
    An `SVGAnimatedTransformList` corresponding to the `gradientTransform` attribute on the given element.
- `SVGGradientElement.spreadMethod` (read-only)
    An `SVGAnimatedEnumeration` corresponding to the `spreadMethod` attribute on the given element. One of the spread method types defined on this interface.

## Instance methods

_This interface does not provide any specific methods, but implements those of its parent, `SVGElement`._
