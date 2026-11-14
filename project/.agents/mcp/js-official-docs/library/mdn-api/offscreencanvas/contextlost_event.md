---
title: "OffscreenCanvas: contextlost event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/offscreencanvas/contextlost_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OffscreenCanvas: contextlost event

The **`contextlost`** event of the `OffscreenCanvas` interface is fired if the browser detects that the `OffscreenCanvasRenderingContext2D` context is lost.
Contexts can be lost for several reasons, such as an associated GPU driver crashes, or the application runs out of memory, and so on.

By default the user agent will attempt to restore the context and then fire the `contextrestored` event.
User code can prevent the context from being restored by calling `Event.preventDefault()` during event handling.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("contextlost", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncontextlost = (event) => { }
```

## Event type

A generic `Event`.

## Examples

The code fragment below detects the `contextlost` event.

```js
const canvas = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("2d");

// Do drawing etc

canvas.addEventListener("contextlost", (event) => {
  console.log(event);
});
```

To prevent the context from being restored the event handler code might instead look like this:

```js
canvas.addEventListener("contextlost", (event) => {
  event.preventDefault();
});
```

## See also

- `OffScreenCanvas: contextrestored` event
- `OffscreenCanvasRenderingContext2D.isContextLost()`
- `HTMLCanvasElement: contextlost` event
