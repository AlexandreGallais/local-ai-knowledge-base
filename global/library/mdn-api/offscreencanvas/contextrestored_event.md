---
title: "OffscreenCanvas: contextrestored event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/offscreencanvas/contextrestored_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OffscreenCanvas: contextrestored event

The **`contextrestored`** event of the `OffscreenCanvas` interface is fired if the browser restores an `OffscreenCanvasRenderingContext2D` context that was previously lost.

You can redraw, re-retrieve resources, and reinitialize the state of your context after receiving this event.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("contextrestored", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncontextrestored = (event) => { }
```

## Event type

A generic `Event`.

## Examples

The code fragment below detects the context restored event.

```js
const canvas = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("2d");

canvas.addEventListener("contextrestored", (e) => {
  console.log(e);
  // call to redrawCanvas() or similar
});
```

## See also

- `OffscreenCanvas: contextlost` event
- `OffscreenCanvasRenderingContext2D.isContextLost()`
- `HTMLCanvasElement: contextrestored` event
