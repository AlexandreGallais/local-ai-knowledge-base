---
title: "CanvasRenderingContext2D: rect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/rect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: rect() method

The
**`CanvasRenderingContext2D.rect()`**
method of the Canvas 2D API adds a rectangle to the current path.

Like other methods that modify the current path, this method does not directly render
anything. To draw the rectangle onto a canvas, you can use the
`fill()` or
`stroke()` methods.

> **Note:**
> To both create and render a rectangle in one step, use the
> `fillRect()` or
> `strokeRect()` methods.

## Syntax

```js
rect(x, y, width, height)
```

The `rect()` method creates a rectangular path whose starting point is at
`(x, y)` and whose size is specified by `width` and
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

### Drawing a rectangle

This example creates a rectangular path using the `rect()` method. The path
is then rendered using the `fill()` method.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

The rectangle's corner is located at (10, 20). It has a width of 150 and a height of
100\.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.beginPath(); // Start a new path
ctx.rect(10, 20, 150, 100); // Add a rectangle to the current path
ctx.fill(); // Render the path
```

#### Result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.fillRect`
- `CanvasRenderingContext2D.strokeRect()`
- `CanvasRenderingContext2D.fill()`
- `CanvasRenderingContext2D.stroke()`
