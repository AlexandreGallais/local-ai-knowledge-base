---
title: "`font-synthesis-weight` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-synthesis-weight/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-synthesis-weight` CSS property

The **`font-synthesis-weight`** CSS property lets you specify whether or not the browser may synthesize the bold typeface when it is missing in a font family.

It is often convenient to use the shorthand property `font-synthesis` to control all typeface synthesis values.

## Syntax

```css
/* Keyword values */
font-synthesis-weight: auto;
font-synthesis-weight: none;

/* Global values */
font-synthesis-weight: inherit;
font-synthesis-weight: initial;
font-synthesis-weight: revert;
font-synthesis-weight: revert-layer;
font-synthesis-weight: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    Indicates that the missing bold typeface may be synthesized by the browser if needed.
- `none`
    Indicates that the synthesis of the missing bold typeface by the browser is not allowed.

## Examples

### Disabling synthesis of bold typeface

This example shows turning off synthesis of the bold typeface by the browser in the `Montserrat` font.

#### HTML

```html
<p class="english">
  This is the default <strong>bold typeface</strong> and
  <em>oblique typeface</em>.
</p>

<p class="english no-syn">
  The <strong>bold typeface</strong> is turned off here but not the
  <em>oblique typeface</em>.
</p>
```

#### CSS

```css
@import "https://fonts.googleapis.com/css2?family=Montserrat&display=swap";

.english {
  font-family: "Montserrat", sans-serif;
}
.no-syn {
  font-synthesis-weight: none;
}
```

#### Result

## See also

- font-synthesis shorthand, font-synthesis-small-caps, font-synthesis-style
- `font-style`, `font-variant`, `font-weight`
