---
title: "SVGFEDiffuseLightingElement: in1 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfediffuselightingelement/in1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEDiffuseLightingElement: in1 property

The **`in1`** read-only property of the `SVGFEDiffuseLightingElement` interface reflects the `in` attribute of the given `<feDiffuseLighting>` element.

## Value

An `SVGAnimatedString` object.

## Examples

### Accessing the `in` Property of `feDiffuseLighting` Element

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="diffuseLightingFilter">
      <feDiffuseLighting
        in="SourceGraphic"
        result="diffuseLightingResult"
        lighting-color="white"
        surfaceScale="1">
        <feDistantLight azimuth="45" elevation="55" />
      </feDiffuseLighting>
    </filter>
  </defs>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="lightblue"
    filter="url(#diffuseLightingFilter)" />
</svg>
```

We can access the `in` attribute of the `feDiffuseLighting` element.

```js
const diffuseLighting = document.querySelector("feDiffuseLighting");

console.log(diffuseLighting.in1.baseVal); // Output: "SourceGraphic"
```

## See also

- `SVGAnimatedString`
