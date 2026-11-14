---
title: "CanvasRenderingContext2D: lineTo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/lineto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: lineTo() method

The `CanvasRenderingContext2D` method
**`lineTo()`**, part of the Canvas 2D API, adds a straight line
to the current sub-path by connecting the sub-path's last point to the specified
`(x, y)` coordinates.

Like other methods that modify the current path, this method does not directly render
anything. To draw the path onto a canvas, you can use the
`fill()` or
`stroke()` methods.

## Syntax

```js
lineTo(x, y)
```

### Parameters

- `x`
    The x-axis coordinate of the line's end point.
- `y`
    The y-axis coordinate of the line's end point.

### Return value

None (`undefined`).

## Examples

### Drawing a straight line

This example draws a straight line using the `lineTo()` method.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

The line begins at (30, 50) and ends at (150, 100).

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath(); // Start a new path
ctx.moveTo(30, 50); // Move the pen to (30, 50)
ctx.lineTo(150, 100); // Draw a line to (150, 100)
ctx.stroke(); // Render the path
```

#### Result

### Drawing connected lines

Each call of `lineTo()` (and similar methods) automatically adds to the
current sub-path, which means that all the lines will all be stroked or filled together.
This example draws a letter 'M' with a single contiguous line.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.moveTo(90, 130);
ctx.lineTo(95, 25);
ctx.lineTo(150, 80);
ctx.lineTo(205, 25);
ctx.lineTo(210, 130);
ctx.lineWidth = 15;
ctx.stroke();
```

#### Result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.moveTo()`
- `CanvasRenderingContext2D.stroke()`
