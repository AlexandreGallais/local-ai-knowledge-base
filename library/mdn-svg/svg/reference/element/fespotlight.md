---
title: "<feSpotLight>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/fespotlight/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <feSpotLight>

The **`<feSpotLight>`** SVG element defines a light source that can be used to create a spotlight effect.
It is used within a lighting filter primitive: `<feDiffuseLighting>` or `<feSpecularLighting>`.

## Attributes

- `x`
- `y`
- `z`
- `pointsAtX`
- `pointsAtY`
- `pointsAtZ`
- `specularExponent`
- `limitingConeAngle`

## DOM Interface

This element implements the `SVGFESpotLightElement` interface.

## Example

### HTML

```html
<svg
  width="200"
  height="200"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <filter id="spotlight">
      <feSpecularLighting
        result="spotlight"
        specularConstant="1.5"
        specularExponent="4"
        lighting-color="white">
        <feSpotLight x="600" y="600" z="400" limitingConeAngle="5.5" />
      </feSpecularLighting>
      <feComposite
        in="SourceGraphic"
        in2="spotlight"
        operator="out"
        k1="0"
        k2="1"
        k3="1"
        k4="0" />
    </filter>
  </defs>

  <image
    href="mdn_logo_only_color.png"
    x="10%"
    y="10%"
    width="80%"
    height="80%"
    filter="url(#spotlight)" />
</svg>
```

## See also

- `<filter>`
- `<animate>`
- `<set>`
- `<feDiffuseLighting>`
- `<feSpecularLighting>`
- `<feDistantLight>`
- `<fePointLight>`
- SVG tutorial: Filter effects
