---
title: "`font-family` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@font-face/font-family/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-family` CSS at-rule descriptor

The **`font-family`** CSS descriptor sets the font family for a font specified in an `@font-face` at-rule.

The value is used for name matching against a particular `@font-face` when styling elements using the `font-family` property.
Any name may be used, and this overrides any name specified in the underlying font data.

## Syntax

```css
/* <string> values */
font-family: "font family";
font-family: "another font family";

/* <custom-ident> value */
font-family: example-font;
```

### Values

- `<family-name>`
    Specifies the name of the font family.

## Examples

### Setting the font family name

```css
@font-face {
  font-family: "Some font family";
  src: url("some_font_name.ttf");
}
```

## See also

- `font-display`
- `font-stretch`
- `font-style`
- `font-weight`
- `font-feature-settings`
- `font-variation-settings`
- `src`
- `unicode-range`
