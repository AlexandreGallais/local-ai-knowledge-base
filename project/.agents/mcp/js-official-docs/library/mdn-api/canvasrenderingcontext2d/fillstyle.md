---
title: "CanvasRenderingContext2D: fillStyle property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/fillstyle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: fillStyle property

The
**`CanvasRenderingContext2D.fillStyle`**
property of the Canvas 2D API specifies the
color, gradient, or pattern to use inside shapes. The default style is `black`.

> **Note:**
> For more examples of fill and stroke styles, see Applying styles and color in the Canvas tutorial.

## Value

One of the following:

- A string parsed as CSS `<color>` value.
- A `CanvasGradient` object (a linear or radial gradient).
- A `CanvasPattern` object (a repeating image).

## Examples

### Changing the fill color of a shape

This example applies a blue fill color to a rectangle.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 100, 100);
```

#### Result

### Creating multiple fill colors using loops

In this example, we use two `for` loops to draw a grid of rectangles, each
having a different fill color. To achieve this, we use the two variables `i`
and `j` to generate a unique RGB color for each square, and only modify the
red and green values. (The blue channel has a fixed value.) By modifying the channels,
you can generate all kinds of palettes.

```html
<canvas id="my-canvas" width="150" height="150"></canvas>
```

```js
const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    ctx.fillStyle = `rgb(
        ${Math.floor(255 - 42.5 * i)}
        ${Math.floor(255 - 42.5 * j)}
        0)`;
    ctx.fillRect(j * 25, i * 25, 25, 25);
  }
}
```

The result looks like this:

## Browser compatibility

### WebKit/Blink-specific note

In WebKit- and Blink-based browsers, the non-standard and deprecated method
`ctx.setFillColor()` is implemented in addition to this property.

```js
setFillColor(color, /* (optional) */ alpha);
setFillColor(grayLevel, /* (optional) */ alpha);
setFillColor(r, g, b, a);
setFillColor(c, m, y, k, a);
```

## See also

- Canvas API
- The interface defining this property: `CanvasRenderingContext2D`
- Values used by this property:
  - `<color>` CSS data type
  - `CanvasGradient` object
  - `CanvasPattern` object
