---
title: "Applying styles and colors (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvas_api/tutorial/applying_styles_and_colors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Applying styles and colors

In the chapter about drawing shapes, we used only the default line and fill styles. Here we will explore the canvas options we have at our disposal to make our drawings a little more attractive. You will learn how to add different colors, line styles, gradients, patterns and shadows to your drawings.

> **Note:**
> Canvas content is not accessible to screen readers. If the canvas is purely decorative, include `role="presentation"` on the `<canvas>` opening tag. Otherwise, include descriptive text as the value of the `aria-label` attribute directly on the canvas element itself or include fallback content placed within the opening and closing canvas tag. Canvas content is not part of the DOM, but nested fallback content is.

## Colors

Up until now we have only seen methods of the drawing context. If we want to apply colors to a shape, there are two important properties we can use: `fillStyle` and `strokeStyle`.

- `fillStyle = color`
    Sets the style used when filling shapes.
- `strokeStyle = color`
    Sets the style for shapes' outlines.

`color` is a string representing a CSS `<color>`, a gradient object, or a pattern object. We'll look at gradient and pattern objects later. By default, the stroke and fill color are set to black (CSS color value `#000000`).

> **Note:**
> When you set the `strokeStyle` and/or `fillStyle` property, the new value becomes the default for all shapes being drawn from then on. For every shape you want in a different color, you will need to reassign the `fillStyle` or `strokeStyle` property.

The valid strings you can enter should, according to the specification, be CSS `<color>` values. Each of the following examples describe the same color.

```js
// these all set the fillStyle to 'orange'

ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255 165 0)";
ctx.fillStyle = "rgb(255 165 0 / 100%)";
```

### A `fillStyle` example

In this example, we once again use two `for` loops to draw a grid of rectangles, each in a different color. The resulting image should look something like the screenshot. There is nothing too spectacular happening here. We use the two variables `i` and `j` to generate a unique RGB color for each square, and only modify the red and green values. The blue channel has a fixed value. By modifying the channels, you can generate all kinds of palettes. By increasing the steps, you can achieve something that looks like the color palettes Photoshop uses.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)} ${Math.floor(
        255 - 42.5 * j,
      )} 0)`;
      ctx.fillRect(j * 25, i * 25, 25, 25);
    }
  }
}
```

```html
<canvas id="my-canvas" width="150" height="150"
  >A 6 by 6 square grid displaying 36 different colors</canvas
>
```

```js
draw();
```

The result looks like this:

### A `strokeStyle` example

This example is similar to the one above, but uses the `strokeStyle` property to change the colors of the shapes' outlines. We use the `arc()` method to draw circles instead of squares.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.strokeStyle = `rgb(0 ${Math.floor(255 - 42.5 * i)} ${Math.floor(
        255 - 42.5 * j,
      )})`;
      ctx.beginPath();
      ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, 2 * Math.PI, true);
      ctx.stroke();
    }
  }
}
```

```html
<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>
```

```js
draw();
```

The result looks like this:

## Transparency

In addition to drawing opaque shapes to the canvas, we can also draw semi-transparent (or translucent) shapes. This is done by either setting the `globalAlpha` property or by assigning a semi-transparent color to the stroke and/or fill style.

- `globalAlpha = transparencyValue`
    Applies the specified transparency value to all future shapes drawn on the canvas. The value must be between 0.0 (fully transparent) to 1.0 (fully opaque). This value is 1.0 (fully opaque) by default.

The `globalAlpha` property can be useful if you want to draw a lot of shapes on the canvas with similar transparency, but otherwise it's generally more useful to set the transparency on individual shapes when setting their colors.

Because the `strokeStyle` and `fillStyle` properties accept CSS rgb color values, we can use the following notation to assign a transparent color to them.

```js
// Assigning transparent colors to stroke and fill style

ctx.strokeStyle = "rgb(255 0 0 / 50%)";
ctx.fillStyle = "rgb(255 0 0 / 50%)";
```

The `rgb()` function has an optional extra parameter. The last parameter sets the transparency value of this particular color. The valid range is specified as a percentage between `0%` (fully transparent) and `100%` (fully opaque) or as a number between `0.0` (equivalent to `0%`) and `1.0` (equivalent to `100%`).

### A `globalAlpha` example

In this example, we'll draw a background of four different colored squares. On top of these, we'll draw a set of semi-transparent circles. The `globalAlpha` property is set at `0.2` which will be used for all shapes from that point on. Every step in the `for` loop draws a set of circles with an increasing radius. The final result is a radial gradient. By overlaying ever more circles on top of each other, we effectively reduce the transparency of the circles that have already been drawn. By increasing the step count and in effect drawing more circles, the background would completely disappear from the center of the image.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");
  // draw background
  ctx.fillStyle = "#ffdd00";
  ctx.fillRect(0, 0, 75, 75);
  ctx.fillStyle = "#66cc00";
  ctx.fillRect(75, 0, 75, 75);
  ctx.fillStyle = "#0099ff";
  ctx.fillRect(0, 75, 75, 75);
  ctx.fillStyle = "#ff3300";
  ctx.fillRect(75, 75, 75, 75);
  ctx.fillStyle = "white";

  // set transparency value
  ctx.globalAlpha = 0.2;

  // Draw semi transparent circles
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
    ctx.fill();
  }
}
```

```html
<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>
```

```js
draw();
```

### An example using `rgb()` with alpha transparency

In this second example, we do something similar to the one above, but instead of drawing circles on top of each other, I've drawn small rectangles with increasing opacity. Using `rgb()` gives you a little more control and flexibility because we can set the fill and stroke style individually.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");

  // Draw background
  ctx.fillStyle = "rgb(255 221 0)";
  ctx.fillRect(0, 0, 150, 37.5);
  ctx.fillStyle = "rgb(102 204 0)";
  ctx.fillRect(0, 37.5, 150, 37.5);
  ctx.fillStyle = "rgb(0 153 255)";
  ctx.fillRect(0, 75, 150, 37.5);
  ctx.fillStyle = "rgb(255 51 0)";
  ctx.fillRect(0, 112.5, 150, 37.5);

  // Draw semi transparent rectangles
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = `rgb(255 255 255 / ${(i + 1) / 10})`;
    for (let j = 0; j < 4; j++) {
      ctx.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);
    }
  }
}
```

```html
<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>
```

```js
draw();
```
