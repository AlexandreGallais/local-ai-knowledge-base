---
title: "pointsAtX"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/pointsatx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# pointsAtX

The **`pointsAtX`** attribute represents the x location in the coordinate system established by attribute `primitiveUnits` on the `<filter>` element of the point at which the light source is pointing.

You can use this attribute with the following SVG elements:

- `<feSpotLight>`

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
  <filter id="lighting1" x="0" y="0" width="100%" height="100%">
    <feDiffuseLighting in="SourceGraphic">
      <feSpotLight x="60" y="60" z="50" pointsAtX="0" />
    </feDiffuseLighting>
  </filter>
  <filter id="lighting2" x="0" y="0" width="100%" height="100%">
    <feDiffuseLighting in="SourceGraphic">
      <feSpotLight x="60" y="60" z="50" pointsAtX="400" />
    </feDiffuseLighting>
  </filter>

  <rect x="0" y="0" width="200" height="200" filter="url(#lighting1)" />
  <rect x="220" y="0" width="200" height="200" filter="url(#lighting2)" />
</svg>
```

## Usage notes

       | Default value
       | `0`

       | Value
       | `number`

       | Animatable
       | Yes
