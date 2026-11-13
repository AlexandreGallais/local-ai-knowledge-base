---
title: "SVGFEDiffuseLightingElement: diffuseConstant property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfediffuselightingelement/diffuseconstant/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEDiffuseLightingElement: diffuseConstant property

The **`diffuseConstant`** read-only property of the `SVGFEDiffuseLightingElement` interface reflects the `diffuseConstant` attribute of the given `<feDiffuseLighting>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Access the `diffuseConstant` property

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="diffuseLightingFilter">
      <feDiffuseLighting
        in="SourceGraphic"
        diffuseConstant="1.5"
        lighting-color="white">
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

```js
const diffuseLighting = document.querySelector("feDiffuseLighting");

console.log(diffuseLighting.diffuseConstant.baseVal); // Output: 1.5
```

## See also

- `SVGAnimatedNumber`
