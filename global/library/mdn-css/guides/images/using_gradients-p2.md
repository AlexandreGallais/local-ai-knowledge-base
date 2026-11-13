---
title: "Using CSS gradients (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/images/using_gradients/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS gradients (part 2 of 2)

## Using conic gradients

The **`conic-gradient()`** CSS function creates an image consisting of a gradient with color transitions rotated around a center point (rather than radiating from the center). Example conic gradients include pie charts and color wheels, but they can also be used for creating checker boards and other interesting effects.

The conic-gradient syntax is similar to the radial-gradient syntax, but the color-stops are placed around a gradient arc, the circumference of a circle, rather than on the gradient line emerging from the center of the gradient, and the color-stops are percentages or degrees: absolute lengths are not valid.

In a radial gradient, the colors transition from the center of an ellipse, outward, in all directions. With conic gradients, the colors transition as if spun around the center of a circle, starting at the top and going clockwise. Similar to radial gradients, you can position the center of the gradient. Similar to linear gradients, you can change the gradient angle.

### A basic conic gradient

As with linear and radial gradients, all you need to create a conic gradient are two colors. By default, the center of the gradient is at the 50% 50% mark, with the start of the gradient facing up:

```html
<div class="simple-conic"></div>
```

```css
div {
  width: 120px;
  height: 120px;
}
```

```css
.simple-conic {
  background: conic-gradient(red, blue);
}
```

### Positioning the conic center

Like radial gradients, you can position the center of the conic gradient with keyterms, percentage, or absolute lengths, with the keyword "at"

```html
<div class="conic-gradient"></div>
```

```css
div {
  width: 120px;
  height: 120px;
}
```

```css
.conic-gradient {
  background: conic-gradient(at 0% 30%, red 10%, yellow 30%, dodgerblue 50%);
}
```

### Changing the angle

By default, the different color stops you specify are spaced equidistantly around the circle. You can position the starting angle of the conic gradient using the "from" keyword at the beginning followed by an angle or a length, and you can specify different positions for the colors stops by including an angle or length after them.

```html
<div class="conic-gradient"></div>
```

```css
div {
  width: 120px;
  height: 120px;
}
```

```css
.conic-gradient {
  background: conic-gradient(from 45deg, red, orange 50%, yellow 85%, green);
}
```

## Using repeating gradients

The `linear-gradient()`, `radial-gradient()`, and `conic-gradient()` functions don't support automatically repeated color stops. However, the `repeating-linear-gradient()`, `repeating-radial-gradient()`, and `repeating-conic-gradient()` functions are available to offer this functionality.

The size of the gradient line or arc that repeats is the length between the first color stop value and the last color stop length value. If the first color stop just has a color and no color stop length, the value defaults to 0. If the last color stop has just a color and no color stop length, the value defaults to 100%. If neither is declared, the gradient line is 100% meaning the linear and conic gradients will not repeat and the radial gradient will only repeat if the radius of the gradient is smaller than the length between the center of the gradient and the farthest corner. If the first color stop is declared, and the value is greater than 0, the gradient will repeat, as the size of the line or arc is the difference between the first color stop and last color stop is less than 100% or 360 degrees.

### Repeating linear gradients

This example uses `repeating-linear-gradient()` to create a gradient that progresses repeatedly in a straight line. The colors get cycled over again as the gradient repeats. In this case the gradient line is 10px long.

```html
<div class="repeating-linear"></div>
```

```css
div {
  width: 120px;
  height: 120px;
}
```

```css
.repeating-linear {
  background: repeating-linear-gradient(
    -45deg,
    red,
    red 5px,
    blue 5px,
    blue 10px
  );
}
```

### Multiple repeating linear gradients

Similar to regular linear and radial gradients, you can include multiple gradients, one on top of the other. This only makes sense if the gradients are partially transparent allowing subsequent gradients to show through the transparent areas, or if you include different background-sizes, optionally with different background-position property values, for each gradient image. We are using transparency.

In this case the gradient lines are 300px, 230px, and 300px long.

```html
<div class="multi-repeating-linear"></div>
```

```css
div {
  width: 600px;
  height: 400px;
}
```

```css
.multi-repeating-linear {
  background:
    repeating-linear-gradient(
      190deg,
      rgb(255 0 0 / 50%) 40px,
      rgb(255 153 0 / 50%) 80px,
      rgb(255 255 0 / 50%) 120px,
      rgb(0 255 0 / 50%) 160px,
      rgb(0 0 255 / 50%) 200px,
      rgb(75 0 130 / 50%) 240px,
      rgb(238 130 238 / 50%) 280px,
      rgb(255 0 0 / 50%) 300px
    ),
    repeating-linear-gradient(
      -190deg,
      rgb(255 0 0 / 50%) 30px,
      rgb(255 153 0 / 50%) 60px,
      rgb(255 255 0 / 50%) 90px,
      rgb(0 255 0 / 50%) 120px,
      rgb(0 0 255 / 50%) 150px,
      rgb(75 0 130 / 50%) 180px,
      rgb(238 130 238 / 50%) 210px,
      rgb(255 0 0 / 50%) 230px
    ),
    repeating-linear-gradient(
      23deg,
      red 50px,
      orange 100px,
      yellow 150px,
      green 200px,
      blue 250px,
      indigo 300px,
      violet 350px,
      red 370px
    );
}
```

### Plaid gradient

To create plaid we include several overlapping gradients with transparency. We use the multiple position color stop syntax:

```html
<div class="plaid-gradient"></div>
```

```css
div {
  width: 200px;
  height: 200px;
}
```

```css
.plaid-gradient {
  background:
    repeating-linear-gradient(
      90deg,
      transparent 0 50px,
      rgb(255 127 0 / 25%) 50px 56px,
      transparent 56px 63px,
      rgb(255 127 0 / 25%) 63px 69px,
      transparent 69px 116px,
      rgb(255 206 0 / 25%) 116px 166px
    ),
    repeating-linear-gradient(
      0deg,
      transparent 0 50px,
      rgb(255 127 0 / 25%) 50px 56px,
      transparent 56px 63px,
      rgb(255 127 0 / 25%) 63px 69px,
      transparent 69px 116px,
      rgb(255 206 0 / 25%) 116px 166px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent 0 5px,
      rgb(143 77 63 / 25%) 5px 10px
    ),
    repeating-linear-gradient(
      45deg,
      transparent 0 5px,
      rgb(143 77 63 / 25%) 5px 10px
    );
}
```

### Repeating radial gradients

This example uses `repeating-radial-gradient()` to create a gradient that radiates repeatedly from a central point. The colors get cycled over and over as the gradient repeats.

```html
<div class="repeating-radial"></div>
```

```css
div {
  width: 120px;
  height: 120px;
}
```

```css
.repeating-radial {
  background: repeating-radial-gradient(
    black,
    black 5px,
    white 5px,
    white 10px
  );
}
```

### Multiple repeating radial gradients

```html
<div class="multi-target"></div>
```

```css
div {
  width: 250px;
  height: 150px;
}
```

```css
.multi-target {
  background:
    repeating-radial-gradient(
        ellipse at 80% 50%,
        rgb(0 0 0 / 50%),
        rgb(0 0 0 / 50%) 15px,
        rgb(255 255 255 / 50%) 15px,
        rgb(255 255 255 / 50%) 30px
      )
      top left no-repeat,
    repeating-radial-gradient(
        ellipse at 20% 50%,
        rgb(0 0 0 / 50%),
        rgb(0 0 0 / 50%) 10px,
        rgb(255 255 255 / 50%) 10px,
        rgb(255 255 255 / 50%) 20px
      )
      top left no-repeat yellow;
  background-size:
    200px 200px,
    150px 150px;
}
```

### Repeating conic gradients

This example uses `repeating-conic-gradient()` to create a gradient that rotates repeatedly around a center point. In this case, the declared color stops are repeated four times.

```html
<div class="repeating-conic"></div>
```

```css
div {
  width: 120px;
  height: 120px;
}
```

```css
.repeating-conic {
  background: repeating-conic-gradient(
    #66ccff 0% 8.25%,
    #6633ff 8.25% 16.5%,
    #ff3399 16.5% 25%
  );
}
```

### Multiple repeating conic gradients

Just like linear and radial repeating gradients, you can stack multiple conic gradients on top of each other, creating interesting effects by using different `at <position>` values so the conic gradients don't overlap at their centers and different `from <angle>` values so the repeating effects don't line up. This example overlaps three semi-transparent repeating radial gradients that each repeat their color schemes four times. To make overlapping gradients visible, you need to ensure either that the colors of the gradients on the top of the stack are partially transparent or use the `background-blend-mode` CSS property.

```html
<div class="multi-repeating-conic"></div>
```

```css
div {
  width: 250px;
  height: 250px;
}
```

```css
.multi-repeating-conic {
  background:
    repeating-conic-gradient(
      from 0deg at 80% 50%,
      #5691f580 0% 8.25%,
      #b338ff80 8.25% 16.5%,
      #f8305880 16.5% 25%
    ),
    repeating-conic-gradient(
      from 15deg at 50% 50%,
      #e856f580 0% 8.25%,
      #ff384c80 8.25% 16.5%,
      #e7f83080 16.5% 25%
    ),
    repeating-conic-gradient(
      from 0deg at 20% 50%,
      #f58356ff 0% 8.25%,
      #caff38ff 8.25% 16.5%,
      #30f88aff 16.5% 25%
    );
}
```

## See also

- Gradient functions: `linear-gradient()`, `radial-gradient()`, `conic-gradient()`, `repeating-linear-gradient()`, `repeating-radial-gradient()`, `repeating-conic-gradient()`
- Gradient-related CSS data types: `gradient`, `image`
- Gradient-related CSS properties: `background`, `background-image`
- CSS Gradients Patterns Gallery, by Lea Verou
- Gradient CSS Generator
- Advanced CSS Gradient Generator
- HDR gradient generator
