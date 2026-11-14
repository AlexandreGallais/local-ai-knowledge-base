---
title: "HTMLCanvasElement: webglcontextlost event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcanvaselement/webglcontextlost_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCanvasElement: webglcontextlost event

The **`webglcontextlost`** event of the WebGL API is fired if the user agent detects that the drawing buffer associated with a `WebGLRenderingContext` object has been lost.

This event does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("webglcontextlost", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onwebglcontextlost = (event) => { }
```

## Event type

A `WebGLContextEvent`. Inherits from `Event`.

## Example

With the help of the `WEBGL_lose_context` extension, you can simulate the `webglcontextlost` event:

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

canvas.addEventListener("webglcontextlost", (event) => {
  console.log(event);
});

gl.getExtension("WEBGL_lose_context").loseContext();

// "webglcontextlost" event is logged.
```

## See also

- `WebGLContextEvent`
- `WebGLRenderingContext.isContextLost()`
- `WEBGL_lose_context`, `WEBGL_lose_context.loseContext()`, `WEBGL_lose_context.restoreContext()`
