---
title: "SVGAnimatedLengthList: animVal property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedlengthlist/animval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedLengthList: animVal property

The **`animVal`** read-only property of the `SVGAnimatedLengthList` interface represents the animated value of an attribute that accepts a list of `<length>`, `<percentage>`, or `<number>` values.

Some SVG attributes, like the `x`, `y`, `dx`, and `dy` attributes of the `<tspan>` and `<text>` elements, accept a list of length, percentages, or numbers as a value. This property provides access to the current animated state of the attribute as a live `SVGLengthList` object.

## Value

An `SVGLengthList` object representing the animated value of the attribute.

## See also

- `<length>`
- `<percentage>`
- `<number>`
- `SVGLengthList`
