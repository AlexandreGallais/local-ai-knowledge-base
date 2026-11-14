---
title: "SVGGradientElement: spreadMethod property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svggradientelement/spreadmethod/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
