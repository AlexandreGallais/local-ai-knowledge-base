---
title: "SVGFETurbulenceElement: stitchTiles property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeturbulenceelement/stitchtiles/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFETurbulenceElement: stitchTiles property

The **`stitchTiles`** read-only property of the `SVGFETurbulenceElement` interface reflects the `stitchTiles` attribute of the given `<feTurbulence>` element. It takes one of the `SVG_STITCHTYPE_*` constants defined on this interface.

## Value

An `SVGAnimatedEnumeration` object.

## Examples

### Accessing the `stitchTiles` property

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="turbulenceFilter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.05"
        numOctaves="3"
        stitchTiles="stitch" />
    </filter>
  </defs>

  <rect
    x="20"
    y="20"
    width="160"
    height="160"
    fill="lightblue"
    filter="url(#turbulenceFilter)" />
</svg>
```

```js
// Select the feTurbulence element
const turbulenceElement = document.querySelector("feTurbulence");

// Access the stitchTiles property
console.log(turbulenceElement.stitchTiles.baseVal); // Output: 1 (SVG_STITCHTYPE_STITCH)
```
