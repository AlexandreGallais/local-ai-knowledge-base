---
title: "`ascent-override` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@font-face/ascent-override/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `ascent-override` CSS at-rule descriptor

The **`ascent-override`** CSS descriptor for the `@font-face` at-rule defines the ascent metric for the font. The ascent metric is the height above the baseline that CSS uses to lay out line boxes in an inline formatting context.

## Syntax

```css
ascent-override: normal;
ascent-override: 90%;
```

### Values

- `normal`
    The default value. When used the metric value is obtained from the font file.
- `<percentage>`
    A `<percentage>` value.

## Examples

### Overriding metrics of a fallback font

The `ascent-override` property can help when overriding the metrics of a fallback font to better match those of a primary web font.

```css
@font-face {
  font-family: "web-font";
  src: url("https://example.com/font.woff");
}

@font-face {
  font-family: "local-font";
  src: local("Local Font");
  ascent-override: 125%;
}
```

## See also

- `descent-override`
- `font-display`
- `font-family`
- `font-weight`
- `font-style`
- `font-stretch`
- `font-feature-settings`
- `font-variation-settings`
- `line-gap-override`
- `src`
- `size-adjust`
- `unicode-range` descriptor
