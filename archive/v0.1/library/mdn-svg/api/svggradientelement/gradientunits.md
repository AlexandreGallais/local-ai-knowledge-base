---
title: "SVGGradientElement: gradientUnits property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svggradientelement/gradientunits/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGGradientElement: gradientUnits property

The **`gradientUnits`** read-only property of the `SVGGradientElement` interface reflects the `gradientUnits` attribute of the given element. It takes one of the `SVG_UNIT_TYPE_*` constants defined in `SVGUnitTypes`.

## Value

An `SVGAnimatedEnumeration`.

## Examples

### Accessing the `gradientUnits` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <defs>
    <linearGradient id="gradient1" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="180" height="180" fill="url(#gradient1)" />
</svg>
```

```js
const gradient = document.getElementById("gradient1");
console.log(gradient.gradientUnits.baseVal); // Output: 1 (SVG_UNIT_TYPE_USERSPACEONUSE)
```
