---
title: "SVGFESpecularLightingElement: specularExponent property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfespecularlightingelement/specularexponent/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFESpecularLightingElement: specularExponent property

The **`specularExponent`** read-only property of the `SVGFESpecularLightingElement` interface reflects the `specularExponent` attribute of the given `<feSpecularLighting>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `specularExponent` Property

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="specularLightingFilter">
      <!-- Adds specular lighting with a specified exponent -->
      <feSpecularLighting
        in="SourceGraphic"
        specularExponent="40"
        lighting-color="hotpink">
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

// Access the specularExponent property
console.log(specularLightingElement.specularExponent.baseVal); // Output: 40
```

## See also

- `SVGAnimatedNumber`
