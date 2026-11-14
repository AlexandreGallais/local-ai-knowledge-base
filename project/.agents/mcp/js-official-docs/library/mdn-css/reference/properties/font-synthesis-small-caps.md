---
title: "`font-synthesis-small-caps` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-synthesis-small-caps/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-synthesis-small-caps` CSS property

The **`font-synthesis-small-caps`** CSS property lets you specify whether or not the browser may synthesize small-caps typeface when it is missing in a font family. Small-caps glyphs typically use the form of uppercase letters but are reduced to the size of lowercase letters.

It is often convenient to use the shorthand property `font-synthesis` to control all typeface synthesis values.

## Syntax

```css
/* Keyword values */
font-synthesis-small-caps: auto;
font-synthesis-small-caps: none;

/* Global values */
font-synthesis-small-caps: inherit;
font-synthesis-small-caps: initial;
font-synthesis-small-caps: revert;
font-synthesis-small-caps: revert-layer;
font-synthesis-small-caps: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    Indicates that the missing small-caps typeface may be synthesized by the browser if needed.
- `none`
    Indicates that the synthesis of the missing small-caps typeface by the browser is not allowed.

## Examples

### Disabling synthesis of small-caps typeface

This example shows turning off synthesis of the small-caps typeface by the browser in the `Montserrat` font.

#### HTML

```html
<p class="english">
  These are the default <span class="small-caps">small-caps</span>,
  <strong>bold</strong>, and <em>oblique</em> typefaces.
</p>

<p class="english no-syn">
  The <span class="small-caps">small-caps</span> typeface is turned off here but
  not the <strong>bold</strong> and <em>oblique</em> typefaces.
</p>
```

#### CSS

```css
@import "https://fonts.googleapis.com/css2?family=Montserrat&display=swap";

.english {
  font-family: "Montserrat", sans-serif;
}
.small-caps {
  font-variant: small-caps;
}
.no-syn {
  font-synthesis-small-caps: none;
}
```

#### Result

## See also

- font-synthesis shorthand, font-synthesis-style, font-synthesis-weight
- `font-style`, `font-variant`, `font-variant-caps`, `font-weight`
- CanvasRenderingContext2D: fontVariantCaps property
