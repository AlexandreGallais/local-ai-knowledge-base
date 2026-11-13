---
title: "SVGAnimatedLengthList: baseVal property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedlengthlist/baseval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedLengthList: baseVal property

The **`baseVal`** read-only property of the `SVGAnimatedLengthList` interface represents the base (non-animated) value of an animatable attribute that accepts a list of `<length>`, `<percentage>`, or `<number>` values.

Some SVG attributes, like the `x`, `y`, `dx`, and `dy` attributes of the `<tspan>` and `<text>` elements, accept a list of length, percentages, or numbers as a value. This property reflects the attribute value, in its non-animated state, as a live `SVGLengthList` object.

## Value

An `SVGLengthList` object representing the base value of the attribute.

## See also

- `<length>`
- `<percentage>`
- `<number>`
- `SVGLengthList`
