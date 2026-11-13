---
title: "specularExponent"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/specularexponent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# specularExponent

The **`specularExponent`** attribute controls the focus for the light source. The bigger the value the brighter the light.

You can use this attribute with the following SVG elements:

- `<feSpecularLighting>`
- `<feSpotLight>`

## feSpecularLighting

For `<feSpecularLighting>`, `specularExponent` defines the exponent value for the specular term.

       | Value
       | `number`

       | Default value
       | `1`

       | Animatable
       | Yes

## feSpotLight

For `<feSpotLight>`, `specularExponent` defines the exponent value controlling the focus for the light source.

       | Value
       | `number`

       | Default value
       | `1`

       | Animatable
       | Yes

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="diffuseLighting1" x="0" y="0" width="100%" height="100%">
    <feSpecularLighting in="SourceGraphic" specularExponent="1">
      <fePointLight x="60" y="60" z="20" />
    </feSpecularLighting>
  </filter>
  <filter id="diffuseLighting2" x="0" y="0" width="100%" height="100%">
    <feSpecularLighting in="SourceGraphic" specularExponent="5">
      <fePointLight x="60" y="60" z="20" />
    </feSpecularLighting>
  </filter>

  <rect x="0" y="0" width="200" height="200" filter="url(#diffuseLighting1)" />
  <rect
    x="220"
    y="0"
    width="200"
    height="200"
    filter="url(#diffuseLighting2)" />
</svg>
```

## See also

- Description of Phong reflection model on Wikipedia
