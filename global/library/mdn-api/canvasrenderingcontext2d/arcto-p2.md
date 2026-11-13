---
title: "CanvasRenderingContext2D: arcTo() method (part 2 of 5)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/arcto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: arcTo() method (part 2 of 5)

## Examples

### How `arcTo()` works

One way to think about `arcTo()` is to imagine two straight segments: one
from the starting point to a first control point, and another from there to a second
control point. Without `arcTo()`, these two segments would form a sharp
corner: `arcTo()` creates a circular arc at this corner and smooths it
out. In other words, the arc is tangential to both segments.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Tangential lines
ctx.beginPath();
ctx.strokeStyle = "gray";
ctx.moveTo(200, 20);
ctx.lineTo(200, 130);
ctx.lineTo(50, 20);
ctx.stroke();

// Arc
ctx.beginPath();
ctx.strokeStyle = "black";
ctx.lineWidth = 5;
ctx.moveTo(200, 20);
ctx.arcTo(200, 130, 50, 20, 40);
ctx.stroke();

// Start point
ctx.beginPath();
ctx.fillStyle = "blue";
ctx.arc(200, 20, 5, 0, 2 * Math.PI);
ctx.fill();

// Control points
ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(200, 130, 5, 0, 2 * Math.PI); // Control point one
ctx.arc(50, 20, 5, 0, 2 * Math.PI); // Control point two
ctx.fill();
```

#### Result

In this example, the path created by `arcTo()` is **thick and
black**. Tangent lines are gray, control points are red, and the start point is blue.

### Creating a rounded corner

This example creates a rounded corner using `arcTo()`. This is one of the
method's most common uses.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

The arc begins at the point specified by `moveTo()`: (230, 20). It is shaped
to fit control points at (90, 130) and (20, 20), and has a radius of 50. The
`lineTo()` method connects the arc to (20, 20) with a straight line. Note
that the arc's second control point and the point specified by `lineTo()` are
the same, which produces a totally smooth corner.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const p0 = { x: 230, y: 20 };
const p1 = { x: 90, y: 130 };
const p2 = { x: 20, y: 20 };

const labelPoint = (p) => {
  const offset = 10;
  ctx.fillText(`(${p.x},${p.y})`, p.x + offset, p.y + offset);
};

ctx.beginPath();
ctx.lineWidth = 4;
ctx.font = "1em sans-serif";
ctx.moveTo(p0.x, p0.y);
ctx.arcTo(p1.x, p1.y, p2.x, p2.y, 50);
ctx.lineTo(p2.x, p2.y);

labelPoint(p0);
labelPoint(p1);
labelPoint(p2);

ctx.stroke();
```

#### Result

### Result of a large radius

If you use a relatively large radius, the arc may appear in a place you didn't expect.
In this example, the arc's connecting line goes above, instead of below, the coordinate
specified by `moveTo()`. This happens because the radius is too large for the
arc to fit entirely below the starting point.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(180, 90);
ctx.arcTo(180, 130, 110, 130, 130);
ctx.lineTo(110, 130);
ctx.stroke();
```

#### Result
