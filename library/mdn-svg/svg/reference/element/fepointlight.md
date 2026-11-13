---
title: "<fePointLight>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/fepointlight/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <fePointLight>

The **`<fePointLight>`** SVG element defines a light source which allows you to create a point light effect. It can be used within a lighting filter primitive: `<feDiffuseLighting>` or `<feSpecularLighting>`.

## Attributes

- `x`
- `y`
- `z`

## DOM Interface

This element implements the `SVGFEPointLightElement` interface.

## Example

### SVG

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
        specularExponent="80"
        lighting-color="white">
        <fePointLight x="50" y="50" z="220" />
      </feSpecularLighting>
      <feComposite
        in="SourceGraphic"
        in2="spotlight"
        operator="arithmetic"
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
- `<feSpotLight>`
- SVG tutorial: Filter effects
