---
title: "CanvasRenderingContext2D: globalAlpha property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/globalalpha/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: globalAlpha property

The
**`CanvasRenderingContext2D.globalAlpha`**
property of the Canvas 2D API specifies the alpha (transparency) value that is applied
to shapes and images before they are drawn onto the canvas.

> **Note:**
> See also the chapter Applying styles and color in the Canvas Tutorial.

## Value

A number between `0.0` (fully transparent) and `1.0` (fully opaque), inclusive. The default value is `1.0`. Values outside that range, including `Infinity` and `NaN`, will not be set, and `globalAlpha` will retain its previous value.

## Examples

### Drawing translucent shapes

This example uses the `globalAlpha` property to draw two semi-transparent
rectangles.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.globalAlpha = 0.5;

ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 100, 100);

ctx.fillStyle = "red";
ctx.fillRect(50, 50, 100, 100);
```

#### Result

### Overlaying transparent shapes

This example illustrates the effect of overlaying multiple transparent shapes on top of
each other. We begin by drawing a solid background composed of four differently colored
squares. Next, we set the `globalAlpha` property to `0.2` (20%
opaque); this alpha level will apply to all of our transparent shapes. After that, we
use a `for` loop to draw a series of circles with increasing radii.

With each new circle, the opacity of the previous circles underneath is effectively
increased. If we were to increase the step count (and thus draw more circles), the
background would eventually disappear completely from the center of the image.

```html
<canvas id="my-canvas" width="150" height="150"></canvas>
```

```js
const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

// Draw background
ctx.fillStyle = "#ffdd00";
ctx.fillRect(0, 0, 75, 75);
ctx.fillStyle = "#66cc00";
ctx.fillRect(75, 0, 75, 75);
ctx.fillStyle = "#0099ff";
ctx.fillRect(0, 75, 75, 75);
ctx.fillStyle = "#ff3300";
ctx.fillRect(75, 75, 75, 75);
ctx.fillStyle = "white";

// Set transparency value
ctx.globalAlpha = 0.2;

// Draw transparent circles
for (let i = 0; i < 7; i++) {
  ctx.beginPath();
  ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
  ctx.fill();
}
```

## Browser compatibility

### Gecko-specific notes

- Starting with Gecko 5.0, specifying invalid values for `globalAlpha` no
  longer throws a `SYNTAX_ERR` exception; these are now correctly silently
  ignored.

### WebKit/Blink-specific notes

- In WebKit- and Blink-based browsers, a non-standard and deprecated method
  `ctx.setAlpha()` is implemented in addition to this property.

## See also

- The interface defining this property: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.globalCompositeOperation`
