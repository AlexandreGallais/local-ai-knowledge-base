---
title: "SVGGradientElement: gradientTransform property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svggradientelement/gradienttransform/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGGradientElement: gradientTransform property

The **`gradientTransform`** read-only property of the `SVGGradientElement` interface reflects the `gradientTransform` attribute of the given element.

## Value

An `SVGAnimatedTransformList`.

## Examples

### Accessing the `gradientTransform` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <defs>
    <linearGradient id="gradient3" gradientTransform="rotate(45)">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="180" height="180" fill="url(#gradient3)" />
</svg>
```

```js
// Accessing the gradientTransform property
const gradient = document.getElementById("gradient3");
console.dir(gradient.gradientTransform.baseVal);
// Output: SVGTransformList object
```
