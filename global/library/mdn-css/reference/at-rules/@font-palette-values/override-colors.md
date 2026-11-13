---
title: "`override-colors` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@font-palette-values/override-colors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `override-colors` CSS at-rule descriptor

The **`override-colors`** CSS descriptor is used to override colors in the chosen base-palette for a color font.

## Syntax

```css
/* basic <example-value> */
override-colors: <index of color> <color>;

/* using color names */
override-colors: 0 red;

/* using hex-color */
override-colors: 0 #ff0000;

/* using rgb */
override-colors: 0 rgb(255 0 0);

/* overriding multiple colors */
override-colors:
  0 red,
  1 green,
  2 blue;
```

The `override-colors` descriptor takes a comma-separated list of the color index and new color value.

The color index is zero-based and any color value can be used.

For each key-value pair of index and color, the color with the index in the specified base-palette will be overwritten. If the color font does not have a color at the specified index, it will be ignored.

### Values

- `[ <integer [0,∞]> <absolute-color-base> ]`
    Specifies the index of a color in a base-palette and the color to overwrite it with.

## Examples

### Changing colors of emojis

This example shows how to override colors in the Noto Color Emoji color font to match your site's brand.

#### HTML

```html
<section class="hats">
  <div class="hat">
    <h2>Original Hat</h2>
    <div class="emoji">🎩</div>
  </div>
  <div class="hat">
    <h2>Red Hat</h2>
    <div class="emoji red-hat">🎩</div>
  </div>
</section>
```

#### CSS

```css
.hats {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
```

```css
@font-face {
  font-family: "Noto Color Emoji";
  font-style: normal;
  font-weight: normal;
  src: url("https://mdn.github.io/shared-assets/fonts/noto-color-emoji/NotoColorEmoji-Regular.woff2")
    format("woff2");
}

.emoji {
  font-family: "Noto Color Emoji", emoji;
  font-size: 3rem;
}
@font-palette-values --red {
  font-family: "Noto Color Emoji";
  override-colors:
    720 rgb(74 11 0),
    1192 rgb(149 22 1),
    2052 rgb(183 27 1),
    3426 rgb(193 28 1),
    4614 rgb(230 34 1);
}
.red-hat {
  font-palette: --red;
}
```

#### Result

### Changing a color in an alternate base-palette

Using Rocher Color Font, this example shows how to override one color in the font.

#### HTML

```html
<h2 class="normal-palette">Normal Palette</h2>
<h2 class="override-palette">Override Palette</h2>
```

#### CSS

```css
@font-face {
  font-family: "Rocher";
  src: url("[path-to-font]/RocherColorGX.woff2") format("woff2");
}
h2 {
  font-family: "Rocher", fantasy;
}
@font-palette-values --override-palette {
  font-family: "Rocher";
  base-palette: 3;
}
@font-palette-values --override-palette {
  font-family: "Rocher";
  base-palette: 3;
  override-colors: 0 rebeccapurple;
}
.normal-palette {
  font-palette: --normal-palette;
}
.override-palette {
  font-palette: --override-palette;
}
```

#### Result

This example shows that in `base-palette` `3`, the color at index 0 is overridden with `rebeccapurple`.

## See also

- `@font-palette-values`
- `base-palette`
- `font-family`
- `font-palette`
- `CSSFontPaletteValuesRule.overrideColors`
