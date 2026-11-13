---
title: "text-rendering"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/text-rendering/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# text-rendering

The **`text-rendering`** attribute provides hints to the renderer about what tradeoffs to make when rendering text.

> **Note:**
> As a presentation attribute, `text-rendering` also has a CSS property counterpart: `text-rendering`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<text>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
  <text y="15" text-rendering="geometricPrecision">Geometric precision</text>
  <text y="35" text-rendering="optimizeLegibility">Optimized legibility</text>
</svg>
```

## Usage notes

       | Value
       |
        `auto` | `optimizeSpeed` |
        `optimizeLegibility` | `geometricPrecision`

       | Default value
       | `auto`

       | Animatable
       | discrete

- `auto`
    This value indicates that the user agent shall make appropriate tradeoffs to balance speed, legibility and geometric precision, but with legibility given more importance than speed and geometric precision.
- `optimizeSpeed`
    This value indicates that the user agent shall emphasize rendering speed over legibility and geometric precision. This option will sometimes cause some user agents to turn off text anti-aliasing.
- `optimizeLegibility`
    This value indicates that the user agent shall emphasize legibility over rendering speed and geometric precision. The user agent will often choose whether to apply anti-aliasing techniques, built-in font hinting or both to produce the most legible text.
- `geometricPrecision`
    This value indicates that the user agent shall emphasize geometric precision over legibility and rendering speed. This option will usually cause the user agent to suspend the use of hinting so that glyph outlines are drawn with comparable geometric precision to the rendering of path data.

## See also

- CSS `text-rendering` property
