---
title: "CanvasRenderingContext2D: arc() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/arc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: arc() method

The
**`CanvasRenderingContext2D.arc()`**
method of the Canvas 2D API adds a circular arc to the current sub-path.

## Syntax

```js
arc(x, y, radius, startAngle, endAngle)
arc(x, y, radius, startAngle, endAngle, counterclockwise)
```

The `arc()` method creates a circular arc centered at `(x, y)`
with a radius of `radius`. The path starts at `startAngle`, ends
at `endAngle`, and travels in the direction given by
`counterclockwise` (defaulting to clockwise).

### Parameters

- `x`
    The horizontal coordinate of the arc's center.
- `y`
    The vertical coordinate of the arc's center.
- `radius`
    The arc's radius. Must be positive.
- `startAngle`
    The angle at which the arc starts in radians, measured from the positive x-axis.
- `endAngle`
    The angle at which the arc ends in radians, measured from the positive x-axis.
- `counterclockwise` (optional)
    An optional boolean value. If `true`, draws the arc
    counter-clockwise between the start and end angles. The default is `false`
    (clockwise).

### Return value

None (`undefined`).

## Examples

### Drawing a full circle

This example draws a complete circle with the `arc()` method.

#### HTML

```html
<canvas></canvas>
```

#### JavaScript

The arc is given an x-coordinate of 100, a y-coordinate of 75, and a radius of 50. To
make a full circle, the arc begins at an angle of 0 radians (0°), and
ends at an angle of 2π radians (360°).

```js
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.stroke();
```

#### Result

### Different shapes demonstrated

This example draws various shapes to show what is possible with `arc()`.

```html
<canvas width="150" height="200"></canvas>
```

```js
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Draw shapes
for (let i = 0; i <= 3; i++) {
  for (let j = 0; j <= 2; j++) {
    ctx.beginPath();
    let x = 25 + j * 50; // x coordinate
    let y = 25 + i * 50; // y coordinate
    let radius = 20; // Arc radius
    let startAngle = 0; // Starting point on circle
    let endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
    let counterclockwise = i % 2 === 1; // Draw counterclockwise

    ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);

    if (i > 1) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
}
```

#### Result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- Use `CanvasRenderingContext2D.ellipse()` to draw an elliptical arc.
