---
title: "CanvasRenderingContext2D: fill() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/fill/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: fill() method

The
**`CanvasRenderingContext2D.fill()`**
method of the Canvas 2D API fills the current or given path with the current
`fillStyle`.

## Syntax

```js
fill()
fill(path)
fill(fillRule)
fill(path, fillRule)
```

### Parameters

- `fillRule`
    The algorithm by which to determine if a point is inside or outside the filling
    region.
    Possible values:
    - `nonzero`
        The non-zero winding rule.
        Default rule.
    - `evenodd`
        The even-odd winding rule.

- `path`
    A `Path2D` path to fill.

### Return value

None (`undefined`).

## Examples

### Filling a rectangle

This example fills a rectangle with the `fill()` method.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.rect(10, 10, 150, 100);
ctx.fill();
```

#### Result

### Specifying a path and a fillRule

This example saves some intersecting lines to a Path2D object. The `fill()`
method is then used to render the object to the canvas. A hole is left unfilled in the
object's center by using the `"evenodd"` rule; by default (with the
`"nonzero"` rule), the hole would also be filled.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create path
let region = new Path2D();
region.moveTo(30, 90);
region.lineTo(110, 20);
region.lineTo(240, 130);
region.lineTo(60, 130);
region.lineTo(190, 20);
region.lineTo(270, 90);
region.closePath();

// Fill path
ctx.fillStyle = "green";
ctx.fill(region, "evenodd");
```

#### Result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.fillStyle`
