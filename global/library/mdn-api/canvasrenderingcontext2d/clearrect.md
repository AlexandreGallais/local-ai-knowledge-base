---
title: "CanvasRenderingContext2D: clearRect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/clearrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: clearRect() method

The
**`CanvasRenderingContext2D.clearRect()`**
method of the Canvas 2D API erases the pixels in a rectangular area by setting them to
transparent black.

> **Note:**
> Be aware that `clearRect()` may cause unintended
> side effects if you're not using paths properly. Make sure to call
> `beginPath()` before starting to
> draw new items after calling `clearRect()`.

## Syntax

```js
clearRect(x, y, width, height)
```

The `clearRect()` method sets the pixels in a rectangular area to
transparent. The rectangle's top-left corner is at
`(x, y)`, and its size is specified by `width` and
`height`.

### Parameters

- `x`
    The x-axis coordinate of the rectangle's starting point.
- `y`
    The y-axis coordinate of the rectangle's starting point.
- `width`
    The rectangle's width. Positive values are to the right, and negative to the left.
- `height`
    The rectangle's height. Positive values are down, and negative are up.

### Return value

None (`undefined`).

## Examples

### Erasing the whole canvas

This code snippet erases the entire canvas. This is commonly required at the start of
each frame in an animation. The dimensions of the cleared area are set to equal the
`<canvas>` element's `width` and `height`
attributes.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

### Erasing part of a canvas

This example draws a blue triangle on top of a yellowish background. The
`clearRect()` method then erases part of the canvas.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

The cleared area is rectangular in shape, with its top-left corner at (10, 10). The
cleared area has a width of 120 and a height of 100.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Draw yellow background
ctx.beginPath();
ctx.fillStyle = "#ffff66";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw blue triangle
ctx.beginPath();
ctx.fillStyle = "blue";
ctx.moveTo(20, 20);
ctx.lineTo(180, 20);
ctx.lineTo(130, 130);
ctx.closePath();
ctx.fill();

// Clear part of the canvas
ctx.clearRect(10, 10, 120, 100);
```

#### Result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.fillRect()`
- `CanvasRenderingContext2D.strokeRect()`
