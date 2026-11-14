---
title: "SVGAnimatedLengthList: animVal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatedlengthlist/animval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
