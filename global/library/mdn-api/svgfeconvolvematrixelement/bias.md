---
title: "SVGFEConvolveMatrixElement: bias property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeconvolvematrixelement/bias/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEConvolveMatrixElement: bias property

The **`bias`** read-only property of the `SVGFEConvolveMatrixElement` interface reflects the `bias` attribute of the given `<feConvolveMatrix>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Access the `bias` property

The `bias` property is used to adjust the brightness of the output.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="convolveFilterWithBias">
      <feConvolveMatrix
        in="SourceGraphic"
        order="3"
        kernelMatrix="0 -1 0 -1 5 -1 0 -1 0"
        bias="0.25" />
    </filter>
  </defs>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="lightblue"
    filter="url(#convolveFilterWithBias)" />
</svg>
```

```js
const convolveMatrix = document.querySelector("feConvolveMatrix");

console.log(convolveMatrix.bias.baseVal); // Output: 0.25
```

## See also

- `SVGAnimatedNumber`
