---
title: "SVGTextPositioningElement: x property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtextpositioningelement/x/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGTextPositioningElement: x property

The **`x`** read-only property of the `SVGTextPositioningElement` interface describes the x-axis coordinate of the `SVGTextElement` or `SVGTSpanElement` as an `SVGAnimatedLengthList`. It reflects the `x` attribute's horizontal position of the individual text glyphs in the user coordinate system.

The attribute value is a list of `<length>`, `<percentage>`, or `<number>`. The numeric values in the `SVGAnimatedLengthList.baseVal` reflect the x-coordinates in the user coordinate system.

## Value

An `SVGAnimatedLengthList`.

## Examples

Given the following SVG:

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="20">Hello</text>
  <text x="50" y="50">World</text>
</svg>
```

We can access the computed values of the `x` attributes:

```js
const texts = document.querySelectorAll("text");

console.log(texts[0].x.baseVal[0].value); // output: 10
console.log(texts[1].x.baseVal[0].value); // output: 50
```

## See also

- `SVGTextPositioningElement.y`
- `SVGAnimatedLengthList.baseVal`
