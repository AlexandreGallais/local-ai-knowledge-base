---
title: "CanvasRenderingContext2D: restore() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/restore/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: restore() method

The
**`CanvasRenderingContext2D.restore()`**
method of the Canvas 2D API restores the most recently saved canvas state by popping the
top entry in the drawing state stack. If there is no saved state, this method does
nothing.

For more information about the drawing state, see `CanvasRenderingContext2D.save()`.

## Syntax

```js
restore()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Restoring a saved state

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
- `CanvasRenderingContext2D.save()`
