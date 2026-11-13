---
title: "`<hue>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/hue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<hue>` CSS type

The **`<hue>`** CSS data type represents the hue angle of a color.
It is used in the color functions that accept hue expressed as a single value, specifically `hsl()`, `hwb()`, `lch()`, and `oklch()` functional notations.

## Syntax

A `<hue>` can be either an `<angle>` or a `<number>`.

### Values

- `angle`
    An angle expressed in degrees, gradians, radians, or turns using the `deg`, `grad`, `rad`, or `turn`, respectively.
- `<number>`
    A real number, representing degrees of the hue angle.

As an `<angle>` is periodic, `<hue>` is normalized to the range `[0deg, 360deg)`. It implicitly wraps around such that `480deg` is the same as `120deg`, `-120deg` is the same as `240deg`, `-1turn` is the same as `1turn`, and so on.

## Description

The color wheel above shows hues at all angles in the sRGB color space. In particular, _red_ is at `0deg`, _yellow_ is at `60deg`, _lime_ is at `120deg`, _cyan_ is at `180deg`, _blue_ is at `240deg`, and _magenta_ is at `300deg`.

The angles corresponding to particular hues differ depending on the color space. For example, the hue angle of sRGB green is `120deg` in the sRGB color space, but `134.39deg` in the CIELAB color space.

The following table lists typical colors at various angles in the sRGB (used by `hsl()` and `hwb()`), CIELAB (used by `lch()`), and Oklab (used by `oklch()`) color spaces:

       |
       | 0°
       | 60°
       | 120°
       | 180°
       | 240°
       | 300°

       | sRGB
       |
       |
       |
       |
       |
       |

       | CIELAB
       |
       |
       |
       |
       |
       |

       | Oklab
       |
       |
       |
       |
       |
       |

## Interpolation of `<hue>` values

`<hue>` values are interpolated as `angle` values, and the default interpolation algorithm is `shorter`. In some color-related CSS functions, this can be overridden by the `<hue-interpolation-method>` component.

## Examples

### Changing the hue of a color using a slider

The following example shows the effect of changing the `hue` value of the `hsl()` functional notation on a color.

#### HTML

```html
<input type="range" min="0" max="360" value="0" id="hue-slider" />
<p>Hue: <span id="hue-value">0deg</span></p>
<div id="box"></div>
```

#### CSS

```css
div {
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 1px solid black;
}
p {
  font-family: sans-serif;
}
span {
  font-family: monospace;
  background: rgb(0 0 0 / 10%);
  padding: 3px;
}
#hue-slider {
  width: 90%;
}
```

```css
#box {
  background-color: hsl(0 100% 50%);
}
```

#### JavaScript

```js
const hue = document.querySelector("#hue-slider");
const box = document.querySelector("#box");
hue.addEventListener("input", () => {
  box.style.backgroundColor = `hsl(${hue.value} 100% 50%)`;
  document.querySelector("#hue-value").textContent = `${hue.value}deg`;
});
```

#### Result

### Approximating red hues in different color spaces

The following example shows a similar red color in different color spaces.
The values in the `lch()` and `oklch()` functions are rounded for readability.

#### HTML

```html
<div data-color="hsl-red">hsl()</div>
<div data-color="hwb-red">hwb()</div>
<div data-color="lch-red">lch()</div>
<div data-color="oklch-red">oklch()</div>
```

#### CSS

```css
[data-color="hsl-red"] {
  /* hsl(<hue> <saturation> <lightness>) */
  background-color: hsl(0 100% 50%);
}
[data-color="hwb-red"] {
  /* hwb(<hue> <whiteness> <blackness>) */
  background-color: hwb(0 0% 0%);
}
[data-color="lch-red"] {
  /* lch(<lightness> <chroma> <hue>) */
  background-color: lch(50 150 40);
}
[data-color="oklch-red"] {
  /* oklch(<lightness> <chroma> <hue>) */
  background-color: oklch(0.6 0.4 20);
}
```

```css
div {
  font-family: monospace;
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 1px solid black;
  display: inline-block;
}
```

#### Result

## See also

- `<color>`
- `<hue-interpolation-method>`
