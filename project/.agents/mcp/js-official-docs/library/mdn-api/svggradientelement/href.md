---
title: "SVGGradientElement: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svggradientelement/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGGradientElement: href property

The **`href`** read-only property of the `SVGGradientElement` interface reflects the `href` or `xlink:href` (deprecated) attribute of the given element.

## Value

An `SVGAnimatedString`.

## Examples

### Accessing the `href` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <defs>
    <linearGradient id="gradient1">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </linearGradient>
    <linearGradient id="gradient2" href="#gradient1" />
  </defs>
  <rect x="10" y="10" width="180" height="180" fill="url(#gradient2)" />
</svg>
```

```js
const gradient = document.getElementById("gradient2");
console.log(gradient.href.baseVal); // Output: "#gradient1"
```
