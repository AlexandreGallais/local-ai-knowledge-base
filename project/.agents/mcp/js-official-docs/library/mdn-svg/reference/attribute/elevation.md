---
title: "elevation"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/elevation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# elevation

The **`elevation`** attribute specifies the direction angle for the light source from the XY plane towards the Z-axis, in degrees. Note that the positive Z-axis points towards the viewer of the content.

You can use this attribute with the following SVG elements:

- `<feDistantLight>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="distantLight1">
    <feDiffuseLighting>
      <feDistantLight elevation="0" />
    </feDiffuseLighting>
  </filter>
  <filter id="distantLight2">
    <feDiffuseLighting>
      <feDistantLight elevation="45" />
    </feDiffuseLighting>
  </filter>

  <circle cx="100" cy="100" r="80" filter="url(#distantLight1)" />
  <circle cx="340" cy="100" r="80" filter="url(#distantLight2)" />
</svg>
```

## Usage notes

       | Value
       | `number`

       | Default value
       | 0

       | Animatable
       | Yes
