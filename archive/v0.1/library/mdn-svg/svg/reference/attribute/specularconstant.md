---
title: "specularConstant"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/specularconstant/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# specularConstant

The **`specularConstant`** attribute controls the ratio of reflection of the specular lighting. It represents the ks value in the Phong lighting model. The bigger the value the stronger the reflection.

You can use this attribute with the following SVG elements:

- `<feSpecularLighting>`

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
  <filter id="specularLighting1" x="0" y="0" width="100%" height="100%">
    <feSpecularLighting in="SourceGraphic" specularConstant="1.2">
      <fePointLight x="60" y="60" z="20" />
    </feSpecularLighting>
  </filter>
  <filter id="specularLighting2" x="0" y="0" width="100%" height="100%">
    <feSpecularLighting in="SourceGraphic" specularConstant="0.8">
      <fePointLight x="60" y="60" z="20" />
    </feSpecularLighting>
  </filter>

  <rect x="0" y="0" width="200" height="200" filter="url(#specularLighting1)" />
  <rect
    x="220"
    y="0"
    width="200"
    height="200"
    filter="url(#specularLighting2)" />
</svg>
```

## Usage notes

       | Value
       | `number`

       | Default value
       | `1`

       | Animatable
       | Yes

## See also

- Description of Phong reflection model on Wikipedia
