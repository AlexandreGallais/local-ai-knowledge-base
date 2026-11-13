---
title: "SVGGradientElement: spreadMethod property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svggradientelement/spreadmethod/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGGradientElement: spreadMethod property

The **`spreadMethod`** read-only property of the `SVGGradientElement` interface reflects the `spreadMethod` attribute of the given element. It takes one of the `SVG_SPREADMETHOD_*` constants defined on this interface.

## Value

An `SVGAnimatedEnumeration`.

## Examples

### Accessing the `spreadMethod` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <defs>
    <linearGradient id="gradient2" spreadMethod="reflect">
      <stop offset="0%" stop-color="red" />
      <stop offset="50%" stop-color="yellow" />
      <stop offset="100%" stop-color="blue" />
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="180" height="180" fill="url(#gradient2)" />
</svg>
```

```js
const gradient = document.getElementById("gradient2");
console.log(gradient.spreadMethod.baseVal); // Output: 2 (SVG_SPREADMETHOD_REFLECT)
```
