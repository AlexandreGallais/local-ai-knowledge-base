---
title: "CanvasRenderingContext2D: beginPath() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/beginpath/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: beginPath() method

The
**`CanvasRenderingContext2D.beginPath()`**
method of the Canvas 2D API starts a new path by emptying the list of sub-paths. Call
this method when you want to create a new path.

> **Note:**
> To create a new sub-path, i.e., one matching the current
> canvas state, you can use `CanvasRenderingContext2D.moveTo()`.

## Syntax

```js
beginPath()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Creating distinct paths

This example creates two paths, each of which contains a single line.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

The `beginPath()` method is called before beginning each line, so that they
may be drawn with different colors.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// First path
ctx.beginPath();
ctx.strokeStyle = "blue";
ctx.moveTo(20, 20);
ctx.lineTo(200, 20);
ctx.stroke();

// Second path
ctx.beginPath();
ctx.strokeStyle = "green";
ctx.moveTo(20, 20);
ctx.lineTo(120, 120);
ctx.stroke();
```

#### Result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.closePath()`
