---
title: "HTMLCanvasElement: contextlost event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcanvaselement/contextlost_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCanvasElement: contextlost event

The **`contextlost`** event of the Canvas API is fired if the user agent detects that the backing storage associated with a `CanvasRenderingContext2D` context is lost.
Contexts can be lost for several reasons like driver crashes or the application runs out of memory, etc.

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

## Example

The code fragment below detects the `contextlost` event.

```js
const canvas = document.getElementById("canvas");

canvas.addEventListener("contextlost", (event) => {
  console.log(event);
});
```

To prevent the context from being restored the code might instead look like this:

```js
const canvas = document.getElementById("canvas");

canvas.addEventListener("contextlost", (event) => {
  event.preventDefault();
});
```

## See also

- `HTMLCanvasElement: contextrestored` event
- `CanvasRenderingContext2D.isContextLost()`
- `OffscreenCanvas: contextlost` event
