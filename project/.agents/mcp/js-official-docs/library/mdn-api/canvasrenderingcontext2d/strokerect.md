---
title: "CanvasRenderingContext2D: strokeRect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/strokerect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: strokeRect() method

The
**`CanvasRenderingContext2D.strokeRect()`**
method of the Canvas 2D API draws a rectangle that is stroked (outlined) according to
the current `strokeStyle` and other
context settings.

This method draws directly to the canvas without modifying the current path, so any
subsequent `fill()` or
`stroke()` calls will have no effect
on it.

## Syntax

```js
strokeRect(x, y, width, height)
```

The `strokeRect()` method draws a stroked rectangle whose starting point is
at `(x, y)` and whose size is specified by `width` and
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

### A simple stroked rectangle

This example draws a rectangle with a green outline using the `strokeRect()`
method.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

The rectangle's top-left corner is at (20, 10). It has a width of 160 and a height of
100\.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "green";
ctx.strokeRect(20, 10, 160, 100);
```

#### Result

### Applying various context settings

This example draws a rectangle with a drop shadow and thick, beveled outlines.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.shadowColor = "#dd5533";
ctx.shadowBlur = 20;
ctx.lineJoin = "bevel";
ctx.lineWidth = 15;
ctx.strokeStyle = "#3388ff";
ctx.strokeRect(30, 30, 160, 90);
```

#### Result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.strokeStyle`
- `CanvasRenderingContext2D.clearRect()`
- `CanvasRenderingContext2D.fillRect()`
