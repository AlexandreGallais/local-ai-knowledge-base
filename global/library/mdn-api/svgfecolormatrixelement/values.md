---
title: "SVGFEColorMatrixElement: values property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfecolormatrixelement/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEColorMatrixElement: values property

The **`values`** read-only property of the `SVGFEColorMatrixElement` interface reflects the `values` attribute of the given element.

## Value

An `SVGAnimatedNumberList` object.

## Examples

### Accessing the `values` property

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="color-matrix-filter">
    <feColorMatrix
      type="matrix"
      values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
  </filter>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="red"
    filter="url(#color-matrix-filter)" />
</svg>
```

```js
const colorMatrix = document.querySelector("feColorMatrix");

console.dir(colorMatrix.values.baseVal); // Output: SVGAnimatedNumberList object
```
