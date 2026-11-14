---
title: "SVGFESpecularLightingElement: in1 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfespecularlightingelement/in1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFESpecularLightingElement: in1 property

The **`in1`** read-only property of the `SVGFESpecularLightingElement` interface reflects the `in` attribute of the given `<feSpecularLighting>` element.

## Value

An `SVGAnimatedString` object.

## Examples

### Accessing the `in` Property of `feSpecularLighting` Element

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="specularLightingFilter">
      <!-- Adds specular lighting effect to the SourceGraphic -->
      <feSpecularLighting
        in="SourceGraphic"
        specularExponent="20"
        lighting-color="hotpink"
        surfaceScale="2">
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

We can access the `in` attribute of the `feSpecularLighting` element.

```js
// Select the feSpecularLighting element
const specularLightingElement = document.querySelector("feSpecularLighting");

// Access the in1 property
console.log(specularLightingElement.in1.baseVal); // Output: "SourceGraphic"
```

## See also

- `SVGAnimatedString`
