---
title: "HTMLCanvasElement: contextrestored event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcanvaselement/contextrestored_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCanvasElement: contextrestored event

The **`contextrestored`** event of the Canvas API is fired if the user agent restores the backing storage for a `CanvasRenderingContext2D`.

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

## Example

The code fragment below detects the context restored event.

```js
const canvas = document.getElementById("canvas");

canvas.addEventListener("contextrestored", (e) => {
  console.log(e);
  // call to redrawCanvas() or similar
});
```

## See also

- `HTMLCanvasElement`: `contextlost` event
- `CanvasRenderingContext2D.isContextLost()`
- `OffscreenCanvas`: `contextlost` event
