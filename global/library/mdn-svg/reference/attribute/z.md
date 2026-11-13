---
title: "z"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/z/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# z

The **`z`** attribute defines the location along the z-axis for a light source in the coordinate system established by the `primitiveUnits` attribute on the `<filter>` element, assuming that, in the initial coordinate system, the positive z-axis comes out towards the person viewing the content and assuming that one unit along the z-axis equals one unit in x and y.

## Elements

You can use this attribute with the SVG elements described in the sections below.

### `<fePointLight>`

For `<fePointLight>`, `z` defines the location along the z-axis for the light source in the coordinate system established by the `primitiveUnits` attribute on the `<filter>` element.

       | Value
       | `number`

       | Default value
       | `1`

       | Animatable
       | Yes

### `<feSpotLight>`

For `<feSpotLight>`, `z` defines the location along the z-axis for the light source in the coordinate system established by the `primitiveUnits` attribute on the `<filter>` element.

       | Value
       | `number`

       | Default value
       | `1`

       | Animatable
       | Yes

## Examples

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
    <feDiffuseLighting in="SourceGraphic">
      <fePointLight x="60" y="60" z="10" />
    </feDiffuseLighting>
  </filter>
  <filter id="diffuseLighting2" x="0" y="0" width="100%" height="100%">
    <feDiffuseLighting in="SourceGraphic">
      <fePointLight x="340" y="60" z="50" />
    </feDiffuseLighting>
  </filter>

  <rect x="0" y="0" width="200" height="200" filter="url(#diffuseLighting1)" />
  <rect
    x="200"
    y="0"
    width="200"
    height="200"
    filter="url(#diffuseLighting2)" />
</svg>
```
