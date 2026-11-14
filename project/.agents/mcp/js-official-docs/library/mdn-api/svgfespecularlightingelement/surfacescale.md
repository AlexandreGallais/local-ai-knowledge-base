---
title: "SVGFESpecularLightingElement: surfaceScale property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfespecularlightingelement/surfacescale/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFESpecularLightingElement: surfaceScale property

The **`surfaceScale`** read-only property of the `SVGFESpecularLightingElement` interface reflects the `surfaceScale` attribute of the given `<feSpecularLighting>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `surfaceScale` Property

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="specularLightingFilter">
      <!-- Adds specular lighting with a surface scale -->
      <feSpecularLighting
        in="SourceGraphic"
        specularExponent="20"
        lighting-color="hotpink"
        surfaceScale="3">
        <fePointLight x="50" y="50" z="30" />
      </feSpecularLighting>
    </filter>
  </defs>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="lightblue"
    filter="url(#specularLightingFilter)" />
</svg>
```

```js
// Select the feSpecularLighting element
const specularLightingElement = document.querySelector("feSpecularLighting");

// Access the surfaceScale property
console.log(specularLightingElement.surfaceScale.baseVal); // Output: 3
```

## See also

- `SVGAnimatedNumber`
