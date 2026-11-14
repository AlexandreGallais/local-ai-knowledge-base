---
title: "SVGGradientElement: gradientUnits property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svggradientelement/gradientunits/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
