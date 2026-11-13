---
title: "SVGFEColorMatrixElement: in1 property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfecolormatrixelement/in1/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEColorMatrixElement: in1 property

The **`in1`** read-only property of the `SVGFEColorMatrixElement` interface reflects the `in` attribute of the given element.

## Value

An `SVGAnimatedString` object.

## Examples

In this example, two `<feColorMatrix>` elements are defined in a filter, each with a different `in` attribute.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="color-matrix-filter">
    <feColorMatrix
      in="SourceGraphic"
      type="matrix"
      values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
    <feColorMatrix
      in="BackgroundImage"
      type="matrix"
      values="0.5 0 0 0 0 0 0.5 0 0 0 0 0 0.5 0 0 0 0 0 1 0" />
  </filter>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="red"
    filter="url(#color-matrix-filter)" />
  <circle
    cx="100"
    cy="100"
    r="50"
    fill="blue"
    filter="url(#color-matrix-filter)" />
</svg>
```

We can access the `in` attribute:

```js
const colorMatrices = document.querySelectorAll("feColorMatrix");

console.log(colorMatrices[0].in1.baseVal); // Output: "SourceGraphic"
console.log(colorMatrices[1].in1.baseVal); // Output: "BackgroundImage"
```

## See also

- `SVGAnimatedString`
