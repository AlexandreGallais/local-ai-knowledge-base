---
title: "CanvasRenderingContext2D: shadowOffsetX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/shadowoffsetx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: shadowOffsetX property

The
**`CanvasRenderingContext2D.shadowOffsetX`**
property of the Canvas 2D API specifies the distance that shadows will be offset
horizontally.

> **Note:**
> Shadows are only drawn if the
> `shadowColor` property is set to
> a non-transparent value. One of the `shadowBlur`, `shadowOffsetX`, or
> `shadowOffsetY` properties must
> be non-zero, as well.

## Value

A float specifying the distance that shadows will be offset horizontally. Positive values are to the right, and negative to the left. The default value is `0` (no horizontal offset). `Infinity` and `NaN` values are ignored.

## Examples

### Moving a shadow horizontally

This example adds a blurred shadow to a rectangle. The
`shadowColor` property sets its
color, `shadowOffsetX` sets its offset 25 units to the right, and
`shadowBlur` gives it a blur level
of 10.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Shadow
ctx.shadowColor = "red";
ctx.shadowOffsetX = 25;
ctx.shadowBlur = 10;

// Rectangle
ctx.fillStyle = "blue";
ctx.fillRect(20, 20, 150, 100);
```

#### Result

## See also

- The interface defining this property: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.shadowOffsetY`
- `CanvasRenderingContext2D.shadowColor`
- `CanvasRenderingContext2D.shadowBlur`
