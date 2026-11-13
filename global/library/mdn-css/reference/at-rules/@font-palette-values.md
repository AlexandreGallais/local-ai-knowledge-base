---
title: "`@font-palette-values` CSS at-rule"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@font-palette-values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `@font-palette-values` CSS at-rule

The **`@font-palette-values`** CSS at-rule allows you to customize the default values of font-palette created by the font-maker.

## Syntax

```css
@font-palette-values --identifier {
  font-family: "Bixa";
}
.my-class {
  font-palette: --identifier;
}
```

The <dashed-ident> is a user-defined identifier, that while it looks like a CSS custom property behaves in a different way and is not wrapped in a CSS var() function.

### Descriptors

- `base-palette`
    Specifies the name or index of the base-palette, created by the font-maker, to use.
- `font-family`
    Specifies the name of the font family that this palette can be applied to. A `font-family` name is required for the `@font-palette-values` rule to be valid.
- `override-colors`
    Specifies the colors in the base palette to override.

## Examples

### Overriding colors in an existing palette

This example shows how you can change some or all of the colors in a color font.

#### HTML

```html
<p>default colors</p>
<p class="alternate">alternate colors</p>
```

#### CSS

```css
@import "https://fonts.googleapis.com/css2?family=Bungee+Spice";
p {
  font-family: "Bungee Spice", fantasy;
  font-size: 2rem;
}
@font-palette-values --Alternate {
  font-family: "Bungee Spice";
  override-colors:
    0 #00ffbb,
    1 #007744;
}
.alternate {
  font-palette: --Alternate;
}
```

#### Result

When overriding colors of the normal or base-palette at index 0 you do not need to declare which base-palette to use. This should only be done when overriding a different base-palette. If you are overriding all the colors then there is also no need to specify the base-palette to use.

## See also

- `font-palette` property
- `font-family` descriptor
- `base-palette` descriptor
- `override-colors` descriptor
- `CSSFontPaletteValuesRule`
