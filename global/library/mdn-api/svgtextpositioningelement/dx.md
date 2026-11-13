---
title: "SVGTextPositioningElement: dx property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtextpositioningelement/dx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTextPositioningElement: dx property

The **`dx`** read-only property of the `SVGTextPositioningElement` interface describes the x-axis coordinate of the `SVGTextElement` or `SVGTSpanElement` as an `SVGAnimatedLengthList`. It reflects the `dx` attribute's horizontal displacement of the individual text glyphs in the user coordinate system.

The attribute value is a list of `<length>`, `<percentage>`, or `<number>`. The numeric values in the `SVGAnimatedLengthList.baseVal` reflect the horizontal displacements in the user coordinate system.

## Value

An `SVGAnimatedLengthList`.

## Examples

Given the following SVG:

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="20" dx="5">Hello</text>
  <text x="50" y="50" dx="10">World</text>
</svg>
```

We can access the computed values of the `dx` attributes:

```js
const texts = document.querySelectorAll("text");

console.log(texts[0].dx.baseVal[0].value); // output: 5
console.log(texts[1].dx.baseVal[0].value); // output: 10
```

## See also

- `SVGTextPositioningElement.dy`
- `SVGAnimatedLengthList.baseVal`
