---
title: "SVGTextPositioningElement: rotate property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtextpositioningelement/rotate/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGTextPositioningElement: rotate property

The **`rotate`** read-only property of the `SVGTextPositioningElement` interface reflects the rotation of individual text glyphs, as specified by the `rotate` attribute of the given element.

## Value

An `SVGAnimatedNumberList` object.

## Examples

Given the following SVG:

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="20" rotate="45">Hello</text>
  <text x="50" y="50" rotate="90">World</text>
</svg>
```

We can access the `rotate` attribute:

```js
const texts = document.querySelectorAll("text");

console.log(texts[0].rotate.baseVal); // output: 45
console.log(texts[1].rotate.baseVal); // output: 90
```

## See also

- `SVGAnimatedNumberList`
