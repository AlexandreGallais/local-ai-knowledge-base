---
title: "SVGFEDisplacementMapElement"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfedisplacementmapelement/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEDisplacementMapElement

The **`SVGFEDisplacementMapElement`** interface corresponds to the `<feDisplacementMap>` element.

## Static properties

- `SVG_CHANNEL_UNKNOWN` (0)
    The type is not one of predefined types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type.
- `SVG_CHANNEL_R` (1)
    Corresponds to the value `R`.
- `SVG_CHANNEL_G` (2)
    Corresponds to the value `G`.
- `SVG_CHANNEL_B` (3)
    Corresponds to the value `B`.
- `SVG_CHANNEL_A` (4)
    Corresponds to the value `A`.

## Instance properties

_This interface also inherits properties from its parent interface, `SVGElement`._

- `SVGFEDisplacementMapElement.height` (read-only)
    An `SVGAnimatedLength` corresponding to the `height` attribute of the given element.
- `SVGFEDisplacementMapElement.in1` (read-only)
    An `SVGAnimatedString` corresponding to the `in` attribute of the given element.
- `SVGFEDisplacementMapElement.in2` (read-only)
    An `SVGAnimatedString` corresponding to the `in2` attribute of the given element.
- `SVGFEDisplacementMapElement.result` (read-only)
    An `SVGAnimatedString` corresponding to the `result` attribute of the given element.
- `SVGFEDisplacementMapElement.scale` (read-only)
    An `SVGAnimatedNumber` corresponding to the `scale` attribute of the given element.
- `SVGFEDisplacementMapElement.width` (read-only)
    An `SVGAnimatedLength` corresponding to the `width` attribute of the given element.
- `SVGFEDisplacementMapElement.x` (read-only)
    An `SVGAnimatedLength` corresponding to the `x` attribute of the given element.
- `SVGFEDisplacementMapElement.xChannelSelector` (read-only)
    An `SVGAnimatedEnumeration` corresponding to the `xChannelSelector` attribute of the given element. It takes one of the `SVG_CHANNEL_*` constants defined on this interface.
- `SVGFEDisplacementMapElement.y` (read-only)
    An `SVGAnimatedLength` corresponding to the `y` attribute of the given element.
- `SVGFEDisplacementMapElement.yChannelSelector` (read-only)
    An `SVGAnimatedEnumeration` corresponding to the `yChannelSelector` attribute of the given element. It takes one of the `SVG_CHANNEL_*` constants defined on this interface.

## Instance methods

_This interface does not provide any specific methods, but implements those of its parent, `SVGElement`._

## See also

- `<feDisplacementMap>`
