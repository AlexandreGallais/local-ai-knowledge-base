---
title: "SVGFEConvolveMatrixElement: in1 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeconvolvematrixelement/in1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEConvolveMatrixElement: in1 property

The **`in1`** read-only property of the `SVGFEConvolveMatrixElement` interface reflects the `in` attribute of the given `<feConvolveMatrix>` element.

## Value

An `SVGAnimatedString` object.

## Examples

In this example, the `<feConvolveMatrix>` element applies a convolution filter to an input graphic specified by the `in` attribute.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="convolveFilter">
      <feConvolveMatrix
        in="SourceGraphic"
        order="3"
        kernelMatrix="0 -1 0 -1 4 -1 0 -1 0" />
    </filter>
  </defs>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="lightblue"
    filter="url(#convolveFilter)" />
</svg>
```

We can access the `in` attribute of the `<feConvolveMatrix>` element.

```js
const convolveMatrix = document.querySelector("feConvolveMatrix");

console.log(convolveMatrix.in1.baseVal); // Output: "SourceGraphic"
```

## See also

- `SVGAnimatedString`
