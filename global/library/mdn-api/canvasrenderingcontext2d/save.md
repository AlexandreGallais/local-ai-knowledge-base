---
title: "CanvasRenderingContext2D: save() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/save/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: save() method

The
**`CanvasRenderingContext2D.save()`**
method of the Canvas 2D API saves the entire state of the canvas by pushing the current
state onto a stack.

## Syntax

```js
save()
```

### Parameters

None.

### Return value

None (`undefined`).

## Description

The drawing state that gets saved onto a stack consists of:

- The current transformation matrix.
- The current clipping region.
- The current dash list.
- The current values of the following attributes:
  - `direction`
  - `fillStyle`
  - `filter`
  - `font`
  - `fontKerning`
  - `fontStretch`
  - `fontVariantCaps`
  - `globalAlpha`
  - `globalCompositeOperation`
  - `imageSmoothingEnabled`
  - `imageSmoothingQuality`
  - `letterSpacing`
  - `lineCap`
  - `lineDashOffset`
  - `lineJoin`
  - `lineWidth`
  - `miterLimit`
  - `shadowBlur`
  - `shadowColor`
  - `shadowOffsetX`
  - `shadowOffsetY`
  - `strokeStyle`
  - `textAlign`
  - `textBaseline`
  - `textRendering`
  - `wordSpacing`

## Examples

### Saving the drawing state

This example uses the `save()` method to save the current state and
`restore()` to restore it later, so that you are able to draw a rect with the
current state later.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Save the current state
ctx.save();

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);

// Restore to the state saved by the most recent call to save()
ctx.restore();

ctx.fillRect(150, 40, 100, 100);
```

#### Result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.restore()`
