---
title: "SVGFESpotLightElement: limitingConeAngle property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfespotlightelement/limitingconeangle/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFESpotLightElement: limitingConeAngle property

The **`limitingConeAngle`** read-only property of the `SVGFESpotLightElement` interface reflects the `limitingConeAngle` attribute of the given `<feSpotLight>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `limitingConeAngle` attribute of the `<feSpotLight>` element

In this example, we access the angle in degrees between the spot light axis (i.e., the axis between the light source and the point to which it is pointing at) and the spot light cone, by using the `limitingConeAngle` read-only property of the `SVGFESpotLightElement` interface.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="specularLightingFilter">
      <!-- Apply a specular light effect to the SourceGraphic -->
      <feSpecularLighting
        in="SourceGraphic"
        specularExponent="40"
        lighting-color="lime"
        surfaceScale="5">
        <feSpotLight
          x="100"
          y="100"
          z="50"
          pointsAtX="100"
          pointsAtY="100"
          limitingConeAngle="30"
          specularExponent="40" />
      </feSpecularLighting>
    </filter>
  </defs>

  <!-- A circle to display the effect of the lighting -->
  <circle
    cx="100"
    cy="100"
    r="50"
    fill="lightblue"
    filter="url(#specularLightingFilter)" />
</svg>
```

```js
// Select the feSpotLight element
const spotLightElement = document.querySelector("feSpotLight");

// Access the limitingConeAngle property
console.log(spotLightElement.limitingConeAngle.baseVal); // Output: 30
```

## See also

- `SVGAnimatedNumber`
