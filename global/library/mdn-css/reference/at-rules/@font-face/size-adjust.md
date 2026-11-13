---
title: "`size-adjust` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@font-face/size-adjust/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `size-adjust` CSS at-rule descriptor

The **`size-adjust`** CSS descriptor for the `@font-face` at-rule defines a multiplier for glyph outlines and metrics associated with this font. This makes it easier to harmonize the designs of various fonts when rendered at the same font size.

The `size-adjust` descriptor behaves in a similar fashion to the `font-size-adjust` property. It calculates an adjustment per font by matching ex heights.

## Syntax

```css
size-adjust: 90%;
```

### Values

- `<percentage>`
    A `<percentage>` value with an initial value of 100%.

All metrics associated with this font are scaled by the given percentage. This includes glyph advances, baseline tables, and overrides provided by `@font-face` descriptors.

## Examples

### Overriding metrics of a fallback font

The `size-adjust` property can help when overriding the metrics of a fallback font to better match those of a primary web font.

```css
@font-face {
  font-family: "web-font";
  src: url("https://example.com/font.woff");
}

@font-face {
  font-family: "local-font";
  src: local("Local Font");
  size-adjust: 90%;
}
```

## See also

- `font-display` descriptor
- `font-family` descriptor
- `font-weight` descriptor
- `font-style` descriptor
- `font-stretch` descriptor
- `font-feature-settings`
- `font-variation-settings` descriptor
- `src` descriptor
- `unicode-range` descriptor
- `font-size-adjust` property
