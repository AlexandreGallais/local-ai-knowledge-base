---
title: "HTMLCanvasElement: webglcontextcreationerror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcanvaselement/webglcontextcreationerror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCanvasElement: webglcontextcreationerror event

The **`webglcontextcreationerror`** event of the WebGL API is fired if the user agent is unable to create a `WebGLRenderingContext` context.

This event has a `WebGLContextEvent.statusMessage` property, which can contain a platform dependent string with more information about the failure.

This event does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("webglcontextcreationerror", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onwebglcontextcreationerror = (event) => { }
```

## Event type

A `WebGLContextEvent`. Inherits from `Event`.

## Example

```js
const canvas = document.getElementById("canvas");

canvas.addEventListener("webglcontextcreationerror", (e) => {
  console.log(e.statusMessage || "Unknown error");
});

const gl = canvas.getContext("webgl");
// logs statusMessage or "Unknown error" if unable to create WebGL context
```

## See also

- `WebGLContextEvent`
- `WebGLRenderingContext.isContextLost()`
- `WEBGL_lose_context`, `WEBGL_lose_context.loseContext()`, `WEBGL_lose_context.restoreContext()`
