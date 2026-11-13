---
title: "`font-palette` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-palette/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-palette` CSS property

The **`font-palette`** CSS property allows specifying one of the many palettes contained in a color font that a user agent may use for the font. Users can also override the values in a palette or create a new palette by using the `@font-palette-values` at-rule.

> **Note:**
> A `font-palette` palette takes precedence when coloring a font. The `color` property will not override a font palette, even if specified with `!important`.

## Syntax

```css
/* Using a font-defined palette */
font-palette: normal;

/* Using a user-defined palette */
font-palette: --one;

/* Creating a new palette by blending two others */
font-palette: palette-mix(in lch, --blue, --yellow);
```

### Values

This property is specified as a single value from the following list:

- `normal`
    Specifies the default color palette or the default glyph colorization (set by the font maker) to be used for the font. With this setting, the palette in the font at index 0 is rendered.
- `light`
    Specifies the first palette in the font that matches 'light' to be used for the font. Some fonts contain metadata that identify a palette as applicable for a light (close to white) background. If a font does not have this metadata, the `light` value behaves as `normal`.
- `dark`
    Specifies the first palette in the font that matches 'dark' to be used for the font. Some fonts contain metadata that identify a palette as applicable for a dark (close to black) background. If a font does not have this metadata, the value behaves as `normal`.
- `<dashed-ident>`
    Allows you to specify your own values for the font palette by using the `<palette-identifier>` of a @font-palette-values at-rule.
- `palette-mix()`
    Creates a new `font-palette` value by blending together two `font-palette` values by specified percentages and color interpolation methods.

## Examples

### Specifying a dark palette

This example allows you to use the first palette marked as _dark_ (works best on a near black background) by the font-maker.

```css
@media (prefers-color-scheme: dark) {
  .banner {
    font-palette: dark;
  }
}
```

### Animating between two palettes

This example illustrates how to animate `font-palette` value changes to create a smooth font animation.

#### HTML

The HTML contains a single paragraph of text to animate:

```html
<p>color-palette<br />animation</p>
```

#### CSS

In the CSS, we import a color font called Nabla from Google Fonts, and define two custom `font-palette` values using the `@font-palette-values` at-rule. We then create `@keyframes` that animate between these two palettes, and apply this animation to our paragraph.

```css
@import "https://fonts.googleapis.com/css2?family=Nabla&display=swap";

@font-palette-values --blue-nabla {
  font-family: "Nabla";
  base-palette: 2; /* this is Nabla's blue palette */
}

@font-palette-values --grey-nabla {
  font-family: "Nabla";
  base-palette: 3; /* this is Nabla's grey palette */
}

@keyframes animate-palette {
  from {
    font-palette: --grey-nabla;
  }

  to {
    font-palette: --blue-nabla;
  }
}

p {
  font-family: "Nabla", fantasy;
  font-size: 5rem;
  margin: 0;
  text-align: center;
  animation: animate-palette 4s infinite alternate linear;
}
```

#### Result

The output looks like this:

> **Note:**
> Browsers that still implement `discrete` `font-palette` animation will flip between the two palettes rather than smoothly animating.

## See also

- `palette-mix()`
- `@font-palette-values`
- `base-palette` descriptor
- `font-family` descriptor
- `override-colors` descriptor
