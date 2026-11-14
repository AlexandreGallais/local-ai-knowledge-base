---
title: "azimuth"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/azimuth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# azimuth

The **`azimuth`** attribute specifies the direction angle for the light source on the XY plane (clockwise), in degrees from the x axis.

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
      <feDistantLight azimuth="0" />
    </feDiffuseLighting>
  </filter>
  <filter id="distantLight2">
    <feDiffuseLighting>
      <feDistantLight azimuth="240" />
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
