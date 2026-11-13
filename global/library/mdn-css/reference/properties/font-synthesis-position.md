---
title: "`font-synthesis-position` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-synthesis-position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-synthesis-position` CSS property

The **`font-synthesis-position`** CSS property lets you specify whether or not a browser may synthesize the subscript and superscript "position" typefaces when they are missing in a font family, while using `font-variant-position` to set the positions.

The **`font-synthesis-position`** property has no effect when using the `` and `` elements.

It is often convenient to use the shorthand property `font-synthesis` to control all typeface synthesis values.

## Syntax

```css
/* Keyword values */
font-synthesis-position: auto;
font-synthesis-position: none;

/* Global values */
font-synthesis-position: inherit;
font-synthesis-position: initial;
font-synthesis-position: revert;
font-synthesis-position: revert-layer;
font-synthesis-position: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    Indicates that a missing position typeface may be synthesized by the browser if needed.
- `none`
    Indicates that the synthesis of a missing position typeface by the browser is not allowed.

## Examples

### Disabling synthesis of position typeface

This example shows turning off synthesis of the superscript and subscript typefaces by the browser in the `Montserrat` font.

#### HTML

```html
<p>
  These are the default position <span class="super">superscript</span>,
  position <span class="sub">subscript</span>, <strong>bold</strong> and
  <em>oblique</em> typefaces.
</p>

<p class="no-syn">
  The positions <span class="super">superscript</span> and
  <span class="sub">subscript</span> typeface is turned off here but not the
  <strong>bold</strong> and <em>oblique</em> typefaces (on browsers that support
  <code>font-synthesis-position</code>).
</p>
```

#### CSS

```css
@import "https://fonts.googleapis.com/css2?family=Montserrat&display=swap";

* {
  font-family: "Montserrat", sans-serif;
}
.super {
  font-variant-position: super;
}
.sub {
  font-variant-position: sub;
}
.no-syn {
  font-synthesis-position: none;
}
```

#### Result

## See also

- `font-synthesis` shorthand, `font-synthesis-style`, `font-synthesis-weight`
- `font-style`, `font-variant`, `font-variant-position`, `font-weight`
