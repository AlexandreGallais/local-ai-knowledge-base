---
title: "OffscreenCanvasRenderingContext2D: commit() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/offscreencanvasrenderingcontext2d/commit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OffscreenCanvasRenderingContext2D: commit() method

The
**`OffscreenCanvasRenderingContext2D.commit()`**
method of the Canvas 2D API was intended to copy the rendering context's bitmap to the bitmap of the placeholder `<canvas>` element of the associated `OffscreenCanvas` object.
The copy operation is synchronous. Calling this method is not needed for the transfer, since it happens automatically during the event-loop execution.

## Syntax

```js
commit()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
const placeholder = document.createElement("canvas");
const offscreen = placeholder.transferControlToOffscreen();
const ctx = offscreenCanvas.getContext("2d");

// Perform some drawing using the 2d context
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 10, 10);

// Push placeholder to the canvas element
ctx.commit();
```

## Specifications

Not part of any specification.

## See also

- The interface defining this method: `OffscreenCanvasRenderingContext2D`
