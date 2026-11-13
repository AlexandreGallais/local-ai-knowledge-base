---
title: "CanvasRenderingContext2D: moveTo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/moveto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: moveTo() method

The
**`CanvasRenderingContext2D.moveTo()`**
method of the Canvas 2D API begins a new sub-path at the point specified by the given
`(x, y)` coordinates.

## Syntax

```js
moveTo(x, y)
```

### Parameters

- `x`
    The x-axis (horizontal) coordinate of the point.
- `y`
    The y-axis (vertical) coordinate of the point.

### Return value

None (`undefined`).

## Examples

### Creating multiple sub-paths

This example uses `moveTo()` to create two sub-paths within a single path.
Both sub-paths are then rendered with a single `stroke()` call.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

The first line begins at (50, 50) and ends at (200, 50). The second line begins at (50,
90\) and ends at (280, 120).

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(50, 50); // Begin first sub-path
ctx.lineTo(200, 50);
ctx.moveTo(50, 90); // Begin second sub-path
ctx.lineTo(280, 120);
ctx.stroke();
```

#### Result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.lineTo()`
- `CanvasRenderingContext2D.stroke()`
