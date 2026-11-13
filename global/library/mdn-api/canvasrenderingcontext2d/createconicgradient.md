---
title: "CanvasRenderingContext2D: createConicGradient() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/createconicgradient/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: createConicGradient() method

The **`CanvasRenderingContext2D.createConicGradient()`** method of the Canvas 2D API creates a gradient around a point with given coordinates.

This method returns a conic `CanvasGradient`. To be applied to a shape, the gradient must first be assigned to the `fillStyle` or `strokeStyle` properties.

> **Note:**
> Gradient coordinates are global, i.e., relative to the current coordinate space. When applied to a shape, the coordinates are NOT relative to the shape's coordinates.

## Syntax

```js
createConicGradient(startAngle, x, y)
```

### Parameters

- `startAngle`
    The angle at which to begin the gradient, in radians. The angle starts from a line going horizontally right from the center, and proceeds clockwise.
- `x`
    The x-axis coordinate of the center of the gradient.
- `y`
    The y-axis coordinate of the center of the gradient.

### Return value

A conic `CanvasGradient`.

## Examples

### Filling a rectangle with a conic gradient

This example initializes a conic gradient using the `createConicGradient()` method. Five color stops between around the center coordinate are then created. Finally, the gradient is assigned to the canvas context, and is rendered to a filled rectangle.

#### HTML

```html
<canvas id="canvas" width="240" height="240"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create a conic gradient
// The start angle is 0
// The center position is 100, 100
const gradient = ctx.createConicGradient(0, 100, 100);

// Add five color stops
gradient.addColorStop(0, "red");
gradient.addColorStop(0.25, "orange");
gradient.addColorStop(0.5, "yellow");
gradient.addColorStop(0.75, "green");
gradient.addColorStop(1, "blue");

// Set the fill style and draw a rectangle
ctx.fillStyle = gradient;
ctx.fillRect(20, 20, 200, 200);
```

#### Rectangle result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasGradient`
- `CanvasRenderingContext2D.createLinearGradient()`
- `CanvasRenderingContext2D.createRadialGradient()`
