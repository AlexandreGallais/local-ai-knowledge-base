---
title: "SVGFESpotLightElement: pointsAtZ property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfespotlightelement/pointsatz/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFESpotLightElement: pointsAtZ property

The **`pointsAtZ`** read-only property of the `SVGFESpotLightElement` interface reflects the `pointsAtZ` attribute of the given `<feSpotLight>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `pointsAtZ` attribute of the `<feSpotLight>` element

In this example, we access the `z` location for the light source created by the `<feSpotLight>` SVG filter element in the SVG coordinate system by using the `pointsAtZ` read-only property of the `SVGFESpotLightElement` interface.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="specularLightingFilter">
      <!-- Apply a specular light effect to the SourceGraphic -->
      <feSpecularLighting
        in="SourceGraphic"
        specularExponent="20"
        lighting-color="hotpink"
        surfaceScale="30">
        <feSpotLight
          x="10"
          y="50"
          z="150"
          pointsAtX="150"
          pointsAtY="100"
          pointsAtZ="0"
          specularExponent="20" />
      </feSpecularLighting>
    </filter>
  </defs>

  <!-- A circle to display the effect of the lighting -->
  <circle cx="100" cy="100" r="50" filter="url(#specularLightingFilter)" />
</svg>
```

```js
// Select the feSpotLight element
const spotLightElement = document.querySelector("feSpotLight");
console.log(spotLightElement.pointsAtZ.baseVal); // Output: 0
```

## See also

- `SVGAnimatedNumber`
