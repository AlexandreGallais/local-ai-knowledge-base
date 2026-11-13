---
title: "CanvasRenderingContext2D: resetTransform() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/resettransform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: resetTransform() method

The
**`CanvasRenderingContext2D.resetTransform()`**
method of the Canvas 2D API resets the current transform to the identity matrix.

## Syntax

```js
resetTransform()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Resetting the matrix

This example draws a rotated rectangle after modifying the matrix, and then resets the
matrix using the `resetTransform()` method.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

The `rotate()` method rotates the
transformation matrix by 45°. The `fillRect()` method draws a filled rectangle, adjusted according to that matrix.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Draw a rotated rectangle
ctx.rotate((45 * Math.PI) / 180);
ctx.fillRect(60, 0, 100, 30);

// Reset transformation matrix to the identity matrix
ctx.resetTransform();
```

#### Result

### Continuing with a regular matrix

Whenever you're done drawing transformed shapes, you should call
`resetTransform()` before rendering anything else. In this example, the first
two shapes are drawn with a skew transformation, and the last two are drawn with the
identity (regular) transformation.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Skewed rectangles
ctx.transform(1, 0, 1.7, 1, 0, 0);
ctx.fillStyle = "gray";
ctx.fillRect(40, 40, 50, 20);
ctx.fillRect(40, 90, 50, 20);

// Non-skewed rectangles
ctx.resetTransform();
ctx.fillStyle = "red";
ctx.fillRect(40, 40, 50, 20);
ctx.fillRect(40, 90, 50, 20);
```

#### Result

The skewed rectangles are gray, and the non-skewed rectangles are red.

## Polyfill

You can also use the `setTransform()` method to reset the current transform to the identity matrix, like so:

```js
ctx.setTransform(1, 0, 0, 1, 0, 0);
```

## See also

- The interface defining this method: `CanvasRenderingContext2D`
