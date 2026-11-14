---
title: "mode"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# mode

The **`mode`** attribute defines the blending mode on the `<feBlend>` filter primitive.

You can use this attribute with the following SVG elements:

- `<feBlend>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="blending1" x="0" y="0" width="100%" height="100%">
    <feFlood
      result="floodFill"
      x="0"
      y="0"
      width="100%"
      height="100%"
      flood-color="seagreen"
      flood-opacity="1" />
    <feBlend in="SourceGraphic" in2="floodFill" mode="multiply" />
  </filter>
  <filter id="blending2" x="0" y="0" width="100%" height="100%">
    <feFlood
      result="floodFill"
      x="0"
      y="0"
      width="100%"
      height="100%"
      flood-color="seagreen"
      flood-opacity="1" />
    <feBlend in="SourceGraphic" in2="floodFill" mode="color-dodge" />
  </filter>

  <image
    href="mdn_logo_only_color.png"
    width="200"
    height="200"
    filter="url(#blending1)" />
  <image
    x="220"
    href="mdn_logo_only_color.png"
    width="200"
    height="200"
    filter="url(#blending2)" />
</svg>
```

## Usage notes

       | Value
       | `blend-mode`

       | Default value
       | `normal`

       | Animatable
       | Yes

For a description of the values, see `blend-mode`.
