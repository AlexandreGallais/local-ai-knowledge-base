---
title: "SVGFEDistantLightElement: azimuth property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfedistantlightelement/azimuth/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEDistantLightElement: azimuth property

The **`azimuth`** read-only property of the `SVGFEDistantLightElement` interface reflects the `azimuth` attribute of the given `<feDistantLight>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `azimuth` Property

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

console.log(distantLight.azimuth.baseVal); // Output: 45
```

## See also

- `SVGAnimatedNumber`
