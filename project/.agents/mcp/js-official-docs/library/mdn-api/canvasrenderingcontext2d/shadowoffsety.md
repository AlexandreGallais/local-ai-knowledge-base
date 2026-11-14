---
title: "CanvasRenderingContext2D: shadowOffsetY property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/shadowoffsety/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: shadowOffsetY property

The
**`CanvasRenderingContext2D.shadowOffsetY`**
property of the Canvas 2D API specifies the distance that shadows will be offset
vertically.

> **Note:**
> Shadows are only drawn if the
> `shadowColor` property is set to
> a non-transparent value. One of the `shadowBlur`,
> `shadowOffsetX`, or `shadowOffsetY` properties must be non-zero, as
> well.

## Value

A float specifying the distance that shadows will be offset vertically. Positive values are down, and negative are up. The default value is `0` (no vertical offset). `Infinity` and `NaN` values are ignored.

## Examples

### Moving a shadow vertically

This example adds a blurred shadow to a rectangle. The
`shadowColor` property sets its
color, `shadowOffsetY` sets its offset 25 units towards the bottom, and
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
ctx.shadowOffsetY = 25;
ctx.shadowBlur = 10;

// Rectangle
ctx.fillStyle = "blue";
ctx.fillRect(20, 20, 150, 80);
```

#### Result

## See also

- The interface defining this property: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.shadowOffsetX`
- `CanvasRenderingContext2D.shadowColor`
- `CanvasRenderingContext2D.shadowBlur`
