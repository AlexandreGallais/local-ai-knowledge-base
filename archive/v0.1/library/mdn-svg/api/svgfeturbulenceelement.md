---
title: "SVGFETurbulenceElement"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfeturbulenceelement/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFETurbulenceElement

The **`SVGFETurbulenceElement`** interface corresponds to the `<feTurbulence>` element.

## Static properties

- `SVG_TURBULENCE_TYPE_UNKNOWN` (0)
    The type is not one of predefined types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type.
- `SVG_TURBULENCE_TYPE_FRACTALNOISE` (1)
    Corresponds to the value `fractalNoise`.
- `SVG_TURBULENCE_TYPE_TURBULENCE` (2)
    Corresponds to the value `turbulence`.
- `SVG_STITCHTYPE_UNKNOWN` (0)
    The type is not one of predefined types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type.
- `SVG_STITCHTYPE_STITCH` (1)
    Corresponds to the value `stitch`.
- `SVG_STITCHTYPE_NOSTITCH` (2)
    Corresponds to the value `noStitch`.

## Instance properties

_This interface also inherits properties from its parent interface, `SVGElement`._

- `SVGFETurbulenceElement.baseFrequencyX` (read-only)
    An `SVGAnimatedNumber` corresponding to the X component of the `baseFrequency` attribute of the given element.
- `SVGFETurbulenceElement.baseFrequencyY` (read-only)
    An `SVGAnimatedNumber` corresponding to the Y component of the `baseFrequency` attribute of the given element.
- `SVGFETurbulenceElement.height` (read-only)
    An `SVGAnimatedLength` corresponding to the `height` attribute of the given element.
- `SVGFETurbulenceElement.numOctaves` (read-only)
    An `SVGAnimatedInteger` corresponding to the `numOctaves` attribute of the given element.
- `SVGFETurbulenceElement.result` (read-only)
    An `SVGAnimatedString` corresponding to the `result` attribute of the given element.
- `SVGFETurbulenceElement.seed` (read-only)
    An `SVGAnimatedNumber` corresponding to the `seed` attribute of the given element.
- `SVGFETurbulenceElement.stitchTiles` (read-only)
    An `SVGAnimatedEnumeration` corresponding to the `stitchTiles` attribute of the given element. It takes one of the `SVG_STITCHTYPE_*` constants defined on this interface.
- `SVGFETurbulenceElement.type` (read-only)
    An `SVGAnimatedEnumeration` corresponding to the `type` attribute of the given element. It takes one of the `SVG_TURBULENCE_TYPE_*` constants defined on this interface.
- `SVGFETurbulenceElement.width` (read-only)
    An `SVGAnimatedLength` corresponding to the `width` attribute of the given element.
- `SVGFETurbulenceElement.x` (read-only)
    An `SVGAnimatedLength` corresponding to the `x` attribute of the given element.
- `SVGFETurbulenceElement.y` (read-only)
    An `SVGAnimatedLength` corresponding to the `y` attribute of the given element.

## Instance methods

_This interface does not provide any specific methods, but implements those of its parent, `SVGElement`._

## See also

- `<feTurbulence>`
