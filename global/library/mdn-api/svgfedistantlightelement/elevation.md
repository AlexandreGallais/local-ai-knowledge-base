---
title: "SVGFEDistantLightElement: elevation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfedistantlightelement/elevation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEDistantLightElement: elevation property

The **`elevation`** read-only property of the `SVGFEDistantLightElement` interface reflects the `elevation` attribute of the given `<feDistantLight>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `elevation` Property

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="lightingFilter">
      <feDistantLight azimuth="45" elevation="30" />
      <feDiffuseLighting result="light" lighting-color="white" surfaceScale="2">
        <feDistantLight azimuth="45" elevation="30" />
      </feDiffuseLighting>
    </filter>
  </defs>
  <rect
    x="50"
    y="50"
    width="100"
    height="100"
    fill="yellow"
    filter="url(#lightingFilter)" />
</svg>
```

```js
const distantLight = document.querySelector("feDistantLight");

console.log(distantLight.elevation.baseVal); // Output: 30
```

## See also

- `SVGAnimatedNumber`
