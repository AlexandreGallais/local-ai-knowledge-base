---
title: "CanvasRenderingContext2D: fillRect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/fillrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: fillRect() method

The
**`CanvasRenderingContext2D.fillRect()`**
method of the Canvas 2D API draws a rectangle that is filled according to the current
`fillStyle`.

This method draws directly to the canvas without modifying the current path, so any
subsequent `fill()` or
`stroke()` calls will have no effect
on it.

## Syntax

```js
fillRect(x, y, width, height)
```

The `fillRect()` method draws a filled rectangle whose starting point is at
`(x, y)` and whose size is specified by `width` and
`height`. The fill style is determined by the current `fillStyle`
attribute.

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

### A simple filled rectangle

This example draws a filled green rectangle using the `fillRect()` method.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

The rectangle's top-left corner is at (20, 10). It has a width of 150 and a height of
100\.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
ctx.fillRect(20, 10, 150, 100);
```

#### Result

### Filling the whole canvas

This code snippet fills the entire canvas with a rectangle. This is often useful for
creating a background, on top of which other things may then be drawn. To achieve this,
the dimensions of the rectangle are set to equal the `<canvas>` element's
`width` and `height` attributes.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.fillStyle`
- `CanvasRenderingContext2D.clearRect()`
- `CanvasRenderingContext2D.strokeRect()`
