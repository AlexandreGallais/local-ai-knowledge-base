---
title: "CanvasRenderingContext2D: isContextLost() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/iscontextlost/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: isContextLost() method

The **`CanvasRenderingContext2D.isContextLost()`** method of the Canvas 2D API returns `true` if the rendering context is lost (and has not yet been reset).
This might occur due to driver crashes, running out of memory, and so on.

If the user agent detects that the canvas backing storage is lost it will fire the `contextlost` event at the associated `HTMLCanvasElement`.
If this event is not canceled it will attempt to reset the backing storage to the default state (this is equivalent to calling `CanvasRenderingContext2D.reset()`).
On success it will fire the `contextrestored` event, indicating that the context is ready to reinitialize and redraw.

## Syntax

```js
isContextLost()
```

### Parameters

None.

### Return value

`true` if the rendering context was lost; `false` otherwise.

### Examples

```js
const ctx = canvas.getContext("2d");

if (ctx.isContextLost()) {
  console.log("Context is lost");
}
```

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `HTMLCanvasElement: contextlost` event
- `HTMLCanvasElement: contextrestored` event
