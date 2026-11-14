---
title: "HTMLCanvasElement: webglcontextrestored event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcanvaselement/webglcontextrestored_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCanvasElement: webglcontextrestored event

The **`webglcontextrestored`** event of the WebGL API is fired if the user agent restores the drawing buffer for a `WebGLRenderingContext` object.

Once the context is restored, WebGL resources such as textures and buffers that were created before the context was lost are no longer valid. You need to reinitialize the state of your WebGL application and recreate resources.

This event does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("webglcontextrestored", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onwebglcontextrestored = (event) => { }
```

## Event type

A `WebGLContextEvent`. Inherits from `Event`.

## Example

With the help of the `WEBGL_lose_context` extension, you can simulate the `webglcontextrestored` event:

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

canvas.addEventListener("webglcontextrestored", (e) => {
  console.log(e);
});

gl.getExtension("WEBGL_lose_context").restoreContext();

// "webglcontextrestored" event is logged.
```

## See also

- `WebGLContextEvent`
- `WebGLRenderingContext.isContextLost()`
- `WEBGL_lose_context`, `WEBGL_lose_context.loseContext()`, `WEBGL_lose_context.restoreContext()`
