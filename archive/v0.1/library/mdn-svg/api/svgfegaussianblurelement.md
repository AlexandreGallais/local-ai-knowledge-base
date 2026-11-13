---
title: "SVGFEGaussianBlurElement"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfegaussianblurelement/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEGaussianBlurElement

The **`SVGFEGaussianBlurElement`** interface corresponds to the `<feGaussianBlur>` element.

## Instance properties

_This interface also inherits properties from its parent interface, `SVGElement`._

- `SVGFEGaussianBlurElement.edgeMode` (read-only)
    An `SVGAnimatedEnumeration` that determines what color values to use when the blur needs to sample pixels beyond the edge of the input image. It reflects the `edgeMode` attribute of the given `<feGaussianBlur>` element.
- `SVGFEGaussianBlurElement.height` (read-only)
    An `SVGAnimatedLength` corresponding to the `height` attribute of the given element.
- `SVGFEGaussianBlurElement.in1` (read-only)
    An `SVGAnimatedString` corresponding to the `in` attribute of the given element.
- `SVGFEGaussianBlurElement.result` (read-only)
    An `SVGAnimatedString` corresponding to the `result` attribute of the given element.
- `SVGFEGaussianBlurElement.stdDeviationX` (read-only)
    An `SVGAnimatedNumber` corresponding to the (possibly automatically computed) X component of the `stdDeviation` attribute of the given element.
- `SVGFEGaussianBlurElement.stdDeviationY` (read-only)
    An `SVGAnimatedNumber` corresponding to the (possibly automatically computed) Y component of the `stdDeviation` attribute of the given element.
- `SVGFEGaussianBlurElement.width` (read-only)
    An `SVGAnimatedLength` corresponding to the `width` attribute of the given element.
- `SVGFEGaussianBlurElement.x` (read-only)
    An `SVGAnimatedLength` corresponding to the `x` attribute of the given element.
- `SVGFEGaussianBlurElement.y` (read-only)
    An `SVGAnimatedLength` corresponding to the `y` attribute of the given element.

## Instance methods

_This interface also inherits methods of its parent, `SVGElement`._

- `SVGFEGaussianBlurElement.setStdDeviation()`
    Sets the values for the `stdDeviation` attribute.

## See also

- `<feGaussianBlur>`
