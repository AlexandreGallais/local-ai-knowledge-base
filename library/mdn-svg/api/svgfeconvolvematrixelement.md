---
title: "SVGFEConvolveMatrixElement"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfeconvolvematrixelement/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEConvolveMatrixElement

The **`SVGFEConvolveMatrixElement`** interface corresponds to the `<feConvolveMatrix>` element.

## Static properties

- `SVG_EDGEMODE_UNKNOWN` (0)
    The type is not one of predefined types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type.
- `SVG_EDGEMODE_DUPLICATE` (1)
    Corresponds to the value `duplicate`.
- `SVG_EDGEMODE_WRAP` (2)
    Corresponds to the value `wrap`.
- `SVG_EDGEMODE_NONE` (3)
    Corresponds to the value `none`.

## Instance properties

_This interface also inherits properties from its parent interface, `SVGElement`._

- `SVGFEConvolveMatrixElement.bias` (read-only)
    An `SVGAnimatedNumber` corresponding to the `bias` attribute of the given element.
- `SVGFEConvolveMatrixElement.divisor` (read-only)
    An `SVGAnimatedNumber` corresponding to the `divisor` attribute of the given element.
- `SVGFEConvolveMatrixElement.edgeMode` (read-only)
    An `SVGAnimatedEnumeration` corresponding to the `edgeMode` attribute of the given element. Takes one of the `SVG_EDGEMODE_*` constants defined on this interface.
- `SVGFEConvolveMatrixElement.height` (read-only)
    An `SVGAnimatedLength` corresponding to the `height` attribute of the given element.
- `SVGFEConvolveMatrixElement.in1` (read-only)
    An `SVGAnimatedString` corresponding to the `in` attribute of the given element.
- `SVGFEConvolveMatrixElement.kernelMatrix` (read-only)
    An `SVGAnimatedNumberList` corresponding to the `kernelMatrix` attribute of the given element.
- `SVGFEConvolveMatrixElement.kernelUnitLengthX` (read-only)
    An `SVGAnimatedNumber` corresponding to the `kernelUnitLength` attribute of the given element.
- `SVGFEConvolveMatrixElement.kernelUnitLengthY` (read-only)
    An `SVGAnimatedNumber` corresponding to the `kernelUnitLength` attribute of the given element.
- `SVGFEConvolveMatrixElement.orderX` (read-only)
    An `SVGAnimatedInteger` corresponding to the `order` attribute of the given element.
- `SVGFEConvolveMatrixElement.orderY` (read-only)
    An `SVGAnimatedInteger` corresponding to the `order` attribute of the given element.
- `SVGFEConvolveMatrixElement.preserveAlpha` (read-only)
    An `SVGAnimatedBoolean` corresponding to the `preserveAlpha` attribute of the given element.
- `SVGFEConvolveMatrixElement.result` (read-only)
    An `SVGAnimatedString` corresponding to the `result` attribute of the given element.
- `SVGFEConvolveMatrixElement.targetX` (read-only)
    An `SVGAnimatedInteger` corresponding to the `targetX` attribute of the given element.
- `SVGFEConvolveMatrixElement.targetY` (read-only)
    An `SVGAnimatedInteger` corresponding to the `targetY` attribute of the given element.
- `SVGFEConvolveMatrixElement.width` (read-only)
    An `SVGAnimatedLength` corresponding to the `width` attribute of the given element.
- `SVGFEConvolveMatrixElement.x` (read-only)
    An `SVGAnimatedLength` corresponding to the `x` attribute of the given element.
- `SVGFEConvolveMatrixElement.y` (read-only)
    An `SVGAnimatedLength` corresponding to the `y` attribute of the given element.

## Instance methods

_This interface does not provide any specific methods, but implements those of its parent, `SVGElement`._

## See also

- `<feConvolveMatrix>`
