---
title: "CanvasRenderingContext2D: quadraticCurveTo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/quadraticcurveto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: quadraticCurveTo() method

The
**`CanvasRenderingContext2D.quadraticCurveTo()`**
method of the Canvas 2D API adds a quadratic Bézier curve to the current
sub-path. It requires two points: the first one is a control point and the second one is
the end point. The starting point is the latest point in the current path, which can be
changed using `moveTo()` before creating
the quadratic Bézier curve.

## Syntax

```js
quadraticCurveTo(cpx, cpy, x, y)
```

### Parameters

- `cpx`
    The x-axis coordinate of the control point.
- `cpy`
    The y-axis coordinate of the control point.
- `x`
    The x-axis coordinate of the end point.
- `y`
    The y-axis coordinate of the end point.

### Return value

None (`undefined`).

## Examples

### How quadraticCurveTo works

This example shows how a quadratic Bézier curve is drawn.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Quadratic Bézier curve
ctx.beginPath();
ctx.moveTo(50, 20);
ctx.quadraticCurveTo(230, 30, 50, 100);
ctx.stroke();

// Start and end points
ctx.fillStyle = "blue";
ctx.beginPath();
ctx.arc(50, 20, 5, 0, 2 * Math.PI); // Start point
ctx.arc(50, 100, 5, 0, 2 * Math.PI); // End point
ctx.fill();

// Control point
ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(230, 30, 5, 0, 2 * Math.PI);
ctx.fill();
```

#### Result

In this example, the control point is red and the
start and end points are blue.

### A simple quadratic curve

This example draws a simple quadratic Bézier curve using
`quadraticCurveTo()`.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

The curve begins at the point specified by `moveTo()`: (20, 110). The
control point is placed at (230, 150). The curve ends at (250, 20).

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(20, 110);
ctx.quadraticCurveTo(230, 150, 250, 20);
ctx.stroke();
```

#### Result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- Bézier curve
