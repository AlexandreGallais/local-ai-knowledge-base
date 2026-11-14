---
title: "`<color>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/color_value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<color>` CSS type

The **`<color>`** CSS data type represents a color.
A `<color>` may also include an alpha-channel _transparency value_, indicating how the color should composite with its background.

> **Note:**
> Although `<color>` values are precisely defined, their actual appearance may vary (sometimes significantly) from device to device. This is because most devices are not calibrated, and some browsers do not support output devices' color profiles.

## Syntax

```css
/* Named colors */
rebeccapurple
aliceblue

/* RGB Hexadecimal */
#f09
#ff0099

/* RGB (Red, Green, Blue) */
rgb(255 0 153)
rgb(255 0 153 / 80%)

/* HSL (Hue, Saturation, Lightness) */
hsl(150 30% 60%)
hsl(150 30% 60% / 80%)

/* HWB (Hue, Whiteness, Blackness) */
hwb(12 50% 0%)
hwb(194 0% 0% / 0.5)

/* Lab (Lightness, A-axis, B-axis) */
lab(50% 40 59.5)
lab(50% 40 59.5 / 0.5)

/* LCH (Lightness, Chroma, Hue) */
lch(52.2% 72.2 50)
lch(52.2% 72.2 50 / 0.5)

/* Oklab (Lightness, A-axis, B-axis) */
oklab(59% 0.1 0.1)
oklab(59% 0.1 0.1 / 0.5)

/* OkLCh (Lightness, Chroma, Hue) */
oklch(60% 0.15 50)
oklch(60% 0.15 50 / 0.5)

/* Relative CSS colors */
/* HSL hue change */
hsl(from red 240deg s l)
/* HWB alpha channel change */
hwb(from green h w b / 0.5)
/* LCH lightness change */
lch(from blue calc(l + 20) c h)

/* light-dark */
light-dark(white, black)
light-dark(rgb(255 255 255), rgb(0 0 0))
```

A `<color>` value can be specified using one of the methods listed below:

- By keywords: `named-color` (such as `blue` or `pink`), `<system-color>`, and `currentColor`.
- By hexadecimal notations: `<hex-color>` (such as `#ff0000`).
- By `<color-function>`, with parameters in a color space using functional notations:
  - sRGB color space: `hsl()`, `hwb()`, and `rgb()`.
  - CIELAB color space: `lab()` and `lch()`.
  - Oklab color space: `oklab()` and `oklch()`.
  - Other color spaces: `color()`, `device-cmyk()`.
- By using relative color syntax to output a new color based on an existing color. Any of the above color functions can take an **origin color** preceded by the `from` keyword and followed by definitions of the channel values for the new **output color**.
- By mixing two colors: `color-mix()`.
- By specifying a color that you want a contrasting color returned for: `contrast-color()`.
- By specifying two colors, using the first for light color-schemes and the second for dark color-schemes: `light-dark()`.

### `currentColor` keyword

The `currentColor` keyword represents the value of an element's `color` property. This lets you use the `color` value on properties that do not receive it by default.

If `currentColor` is used as the value of the `color` property, it instead takes its value from the inherited value of the `color` property.

```html
<div class="container">
  The color of this text is blue.
  <div class="child"></div>
  This block is surrounded by a blue border.
</div>
```

```css
.container {
  color: blue;
  border: 1px dashed currentColor;
}
.child {
  background: currentColor;
  height: 9px;
}
```

### Missing color components

Each component of any CSS color functions - except for those using the legacy comma-separated syntax - can be specified as the keyword `none` to be a missing component.

Explicitly specifying missing components in color interpolation is useful for cases where you would like to interpolate some color components but not others. For all other purposes, a missing component will effectively have a zero value in an appropriate unit: `0`, `0%`, or `0deg`. For example, the following colors are equivalent when used outside of interpolation:

```css
/* These are equivalent */
color: oklab(50% none -0.25);
color: oklab(50% 0 -0.25);

/* These are equivalent */
background-color: hsl(none 100% 50%);
background-color: hsl(0deg 100% 50%);
```

## Interpolation

Color interpolation happens with gradients, transitions, and animations.

When interpolating `<color>` values, they are first converted to a given color space, and then each component of the computed values are interpolated linearly, with interpolation's speed being determined by the easing function in transitions and animations. The interpolation color space defaults to Oklab, but can be overridden through `<color-interpolation-method>` in some color-related functional notations.

### Interpolation with missing components

#### Interpolating colors in the same space

When interpolating colors that are exactly in the interpolation color space, missing components from one color are replaced with existing values of the same components from the other color.
For example, the following two expressions are equivalent:

```css
color-mix(in oklch, oklch(none 0.2 10), oklch(60% none 30))
color-mix(in oklch, oklch(60% 0.2 10), oklch(60% 0.2 30))
```

> **Note:**
> If a component is missing from both colors, this component will be missing after the interpolation.

#### Interpolating colors from different spaces: analogous components

If any color to be interpolated is not in the interpolation color space, its missing components are transferred into the converted color based on **analogous components** of the same category as described in the following table:

| Category     | Analogous components |
| ------------ | -------------------- |
| Reds         | `R`, `X`             |
| Greens       | `G`, `Y`             |
| Blues        | `B`, `Z`             |
| Lightness    | `L`                  |
| Colorfulness | `C`, `S`             |
| Hue          | `H`                  |
| a            | `a`                  |
| b            | `b`                  |

For example:

- `X` (`0.2`) in `color(xyz 0.2 0.1 0.6)` is analogous to `R` (`50%`) in `rgb(50% 70% 30%)`.
- `H` (`0deg`) in `hsl(0deg 100% 80%)` is analogous to `H` (`140`) in `oklch(80% 0.1 140)`.

Using OkLCh as the interpolation color space and the two colors below as an example:

```css
lch(80% 30 none)
color(display-p3 0.7 0.5 none)
```

The preprocessing procedure is:

1. Replace the missing components in both colors with a zero value:

   ```css
   lch(80% 30 0)
   color(display-p3 0.7 0.5 0)
   ```

2. Convert both colors into the interpolation color space:

   ```css
   oklch(83.915% 0.0902 0.28)
   oklch(63.612% 0.1522 78.748)
   ```

3. If any component of the converted colors is analogous to a missing component in the corresponding original color, reset it as a missing component:

   ```css
   oklch(83.915% 0.0902 none)
   oklch(63.612% 0.1522 78.748)
   ```

4. Replace any missing component with the same component from the other converted color:

   ```css
   oklch(83.915% 0.0902 78.748)
   oklch(63.612% 0.1522 78.748)
   ```

## Accessibility

Some people have difficulty distinguishing colors. The WCAG 2.2 recommendation strongly advises against using color as the only means of conveying a specific message, action, or result. See color and color contrast for more information.

## Examples

### Exploring color values

In this example, we provide a `` and a text input. Entering a valid color into the input causes the `` to adopt that color, allowing you to test our color values.

#### HTML

```html
<div></div>
<hr />
<label for="color">Enter a valid color value:</label>
<input type="text" id="color" />
```

```css
div {
  height: 200px;
  width: 200px;
}
```

```js
const inputElem = document.querySelector("input");
const divElem = document.querySelector("div");

function validTextColor(stringToTest) {
  if (stringToTest === "inherit" || stringToTest === "transparent") {
    return false;
  }

  const div = document.createElement("div");
  div.style.color = stringToTest;
  return !!div.style.color;
}

inputElem.addEventListener("input", () => {
  if (validTextColor(inputElem.value)) {
    divElem.style.backgroundColor = inputElem.value;
    divElem.textContent = "";
  } else {
    divElem.removeAttribute("style");
    divElem.textContent = "Invalid color value";
  }
});
```

#### Result

### Generating fully saturated sRGB colors

This example shows fully saturated sRGB colors in the sRGB color space.

#### HTML

```html
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
```

#### CSS

```css
body {
  display: flex;
  flex-wrap: wrap;
}
div {
  height: 80px;
  margin: 10px;
  width: 80px;
}
```

```css
div:nth-child(1) {
  background-color: hsl(0 100% 50%);
}
div:nth-child(2) {
  background-color: hsl(30 100% 50%);
}
div:nth-child(3) {
  background-color: hsl(60 100% 50%);
}
div:nth-child(4) {
  background-color: hsl(90 100% 50%);
}
div:nth-child(5) {
  background-color: hsl(120 100% 50%);
}
div:nth-child(6) {
  background-color: hsl(150 100% 50%);
}
div:nth-child(7) {
  background-color: hsl(180 100% 50%);
}
div:nth-child(8) {
  background-color: hsl(210 100% 50%);
}
div:nth-child(9) {
  background-color: hsl(240 100% 50%);
}
div:nth-child(10) {
  background-color: hsl(270 100% 50%);
}
div:nth-child(11) {
  background-color: hsl(300 100% 50%);
}
div:nth-child(12) {
  background-color: hsl(330 100% 50%);
}
```

#### Result

### Creating different shades of red

This example shows reds of different shades in the sRGB color space.

#### HTML

```html
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
```

#### CSS

```css
body {
  display: flex;
  flex-wrap: wrap;
}
div {
  box-sizing: border-box;
  height: 80px;
  margin: 10px;
  width: 80px;
}
```

```css
div:nth-child(1) {
  background-color: hsl(0 100% 0%);
}
div:nth-child(2) {
  background-color: hsl(0 100% 20%);
}
div:nth-child(3) {
  background-color: hsl(0 100% 40%);
}
div:nth-child(4) {
  background-color: hsl(0 100% 60%);
}
div:nth-child(5) {
  background-color: hsl(0 100% 80%);
}
div:nth-child(6) {
  background-color: hsl(0 100% 100%);
  border: solid;
}
```

#### Result

### Creating reds of different saturation

This example shows reds of different saturations in the sRGB color space.

#### HTML

```html
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
```

#### CSS

```css
body {
  display: flex;
  flex-wrap: wrap;
}
div {
  height: 80px;
  margin: 10px;
  width: 80px;
}
```

```css
div:nth-child(1) {
  background-color: hsl(0 0% 50%);
}
div:nth-child(2) {
  background-color: hsl(0 20% 50%);
}
div:nth-child(3) {
  background-color: hsl(0 40% 50%);
}
div:nth-child(4) {
  background-color: hsl(0 60% 50%);
}
div:nth-child(5) {
  background-color: hsl(0 80% 50%);
}
div:nth-child(6) {
  background-color: hsl(0 100% 50%);
}
```

#### Result

## See also

- `opacity`: the property defining transparency at the element level
- `hue`: the data type representing the hue angle of a color
- `color`, `background-color`, `border-color`, `box-shadow`, `outline-color`, `text-shadow`: common properties that use `<color>`
- `color_value/color` function
- Applying color to HTML elements using CSS
- Using relative colors
- New functions, gradients, and hues in CSS colors (Level 4) on MDN blog (2023)
