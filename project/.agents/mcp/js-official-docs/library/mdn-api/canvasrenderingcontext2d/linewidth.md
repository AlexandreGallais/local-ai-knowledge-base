---
title: "CanvasRenderingContext2D: lineWidth property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/linewidth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: lineWidth property

The
**`CanvasRenderingContext2D.lineWidth`**
property of the Canvas 2D API sets the thickness of lines.

> **Note:**
> Lines can be drawn with the
> `stroke()`,
> `strokeRect()`,
> and `strokeText()` methods.

## Value

A number specifying the line width, in coordinate space units. Zero, negative, `Infinity`, and `NaN` values are ignored. This value is `1.0` by default.

## Examples

### Changing line width

This example draws a line and a rectangle, using a line width of 15 units.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 15;

ctx.beginPath();
ctx.moveTo(20, 20);
ctx.lineTo(130, 130);
ctx.rect(40, 40, 70, 70);
ctx.stroke();
```

#### Result

### More examples

For more examples and explanation about this property, see Applying styles and color in the Canvas Tutorial.

## See also

- The interface defining this property: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.lineCap`
- `CanvasRenderingContext2D.lineJoin`
- Applying styles and color
