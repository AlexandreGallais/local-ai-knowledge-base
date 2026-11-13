---
title: "lengthAdjust"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/lengthadjust/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# lengthAdjust

The lengthAdjust attribute controls how the text is stretched into the length defined by the `textLength` attribute.

You can use this attribute with the following SVG elements:

- `<text>`
- `<textPath>`
- `<tspan>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg width="300" height="150" xmlns="http://www.w3.org/2000/svg">
  <g font-face="sans-serif">
    <text x="0" y="20" textLength="300" lengthAdjust="spacing">
      Stretched using spacing only.
    </text>
    <text x="0" y="50" textLength="300" lengthAdjust="spacingAndGlyphs">
      Stretched using spacing and glyphs.
    </text>
    <text x="0" y="80" textLength="100" lengthAdjust="spacing">
      Shrunk using spacing only.
    </text>
    <text x="0" y="110" textLength="100" lengthAdjust="spacingAndGlyphs">
      Shrunk using spacing and glyphs.
    </text>
  </g>
</svg>
```

## Usage notes

       | Value
       | `spacing` | `spacingAndGlyphs`

       | Default value
       | `spacing`

       | Animatable
       | Yes
