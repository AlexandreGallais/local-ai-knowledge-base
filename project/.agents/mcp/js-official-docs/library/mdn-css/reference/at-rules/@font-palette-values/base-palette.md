---
title: "`base-palette` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@font-palette-values/base-palette/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `base-palette` CSS at-rule descriptor

The **`base-palette`** CSS descriptor is used to specify the name or index of a pre-defined palette to be used for creating a new palette. If the specified `base-palette` does not exist, then the palette defined at index 0 will be used.

## Syntax

```css
@font-palette-values --one {
  base-palette: 1;
}
```

The `base-palette` descriptor is specified using a zero-based index of the font-maker created palettes.

### Values

- `<index>`
    Specifies the index of the pre-defined palette to use.

## Examples

### Changing the default palette in a font

Using the Rocher Color Font, this example shows two instances of switching the default palette in the font to an alternate palette created by the font-maker.

#### HTML

```html
<h2>default base-palette</h2>
<h2 class="two">base-palette at index 2</h2>
<h2 class="five">base-palette at index 5</h2>
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

@font-palette-values --two {
  font-family: "Rocher";
  base-palette: 2;
}

@font-palette-values --five {
  font-family: "Rocher";
  base-palette: 5;
}

.two {
  font-palette: --two;
}

.five {
  font-palette: --five;
}
```

#### Result

## See also

- `@font-palette-values`
- `font-family` descriptor
- `override-colors` descriptor
- `font-palette` property
- `CSSFontPaletteValuesRule.basePalette`
