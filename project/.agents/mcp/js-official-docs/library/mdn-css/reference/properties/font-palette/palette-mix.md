---
title: "`palette-mix()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-palette/palette-mix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `palette-mix()` CSS function

The **`palette-mix()`** CSS function can be used to create a new `font-palette` value by blending together two `font-palette` values by specified percentages and color interpolation methods.

## Syntax

```css
/* Blending font-defined palettes */
font-palette: palette-mix(in lch, normal, dark)

/* Blending author-defined palettes */
font-palette: palette-mix(in lch, --blues, --yellows)

/* Varying percentage of each palette mixed */
font-palette: palette-mix(in lch, --blues 50%, --yellows 50%)
font-palette: palette-mix(in lch, --blues 70%, --yellows 30%)

/* Varying color interpolation method */
font-palette: palette-mix(in srgb, --blues, --yellows)
font-palette: palette-mix(in hsl, --blues, --yellows)
font-palette: palette-mix(in hsl shorter hue, --blues, --yellows)

```

### Values

Functional notation:

```plain
palette-mix(method, palette1 [p1], palette2 [p2])
```

- `method`
    A `<color-interpolation-method>` specifying the interpolation color space.
- `palette1`, `palette2`
    The `font-palette` values to blend together. These can be _any_ `font-palette` values, including `palette-mix()` functions, `normal`, `dark`, and `light`.
- `p1`, `p2` (optional)
    `<percentage>` values between `0%` and `100%` specifying the amount of each palette to mix. They are normalized as follows:
    - If both `p1` and `p2` are omitted, then `p1 = p2 = 50%`.
    - If `p1` is omitted, then `p1 = 100% - p2`.
    - If `p2` is omitted, then `p2 = 100% - p1`.
    - If `p1 = p2 = 0%`, the function is invalid.
    - If `p1 + p2 ≠ 100%`, then `p1' = p1 / (p1 + p2)` and `p2' = p2 / (p1 + p2)`, where `p1'` and `p2'` are the normalization results.

## Examples

### Using `palette-mix()` to blend two palettes

This example shows how to use the `palette-mix()` function to create a new palette by blending two others.

#### HTML

The HTML contains three paragraphs to apply our font information to:

```html
<p class="yellowPalette">Yellow palette</p>
<p class="bluePalette">Blue palette</p>
<p class="mixedPalette">Mixed palette</p>
```

#### CSS

In the CSS, we import a color font from Google Fonts, and define two custom `font-palette` values using the `@font-palette-values` at-rule. We then apply three different `font-palette` values to the paragraphs — `--yellow`, `--blue`, and a new green palette, created using `palette-mix()` to blend the blue and yellow palettes together.

```css
@import "https://fonts.googleapis.com/css2?family=Nabla&display=swap";

@font-palette-values --blue-nabla {
  font-family: "Nabla";
  base-palette: 2; /* this is Nabla's blue palette */
}

@font-palette-values --yellow-nabla {
  font-family: "Nabla";
  base-palette: 7; /* this is Nabla's yellow palette */
}

p {
  font-family: "Nabla", fantasy;
  font-size: 4rem;
  text-align: center;
  margin: 0;
}

.yellowPalette {
  font-palette: --yellow-nabla;
}

.bluePalette {
  font-palette: --blue-nabla;
}

.mixedPalette {
  font-palette: palette-mix(in lch, --blue-nabla 55%, --yellow-nabla 45%);
}
```

#### Result

The output looks like this:

## See also

- `font-palette`
- `@font-palette-values`
- `color-mix()`
- CSS color values guide
- Color space
