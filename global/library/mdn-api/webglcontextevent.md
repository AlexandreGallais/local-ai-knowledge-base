---
title: "WebGLContextEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglcontextevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLContextEvent

The **WebGLContextEvent** interface is part of the WebGL API and is an interface for an event that is generated in response to a status change to the WebGL rendering context.

## Constructor

- `WebGLContextEvent()`
    Creates a new `WebGLContextEvent` object.

## Instance properties

_This interface inherits properties from its parent interface, `Event`._

- `WebGLContextEvent.statusMessage` (read-only)
    A property containing additional information about the event.

## Instance methods

_This interface doesn't define any own methods, but inherits methods from its parent interface, `Event`._

## Examples

With the help of the `WEBGL_lose_context` extension, you can simulate the `webglcontextlost` and `webglcontextrestored` events:

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

canvas.addEventListener("webglcontextlost", (e) => {
  console.log(e);
});

gl.getExtension("WEBGL_lose_context").loseContext();

// WebGLContextEvent event with type "webglcontextlost" is logged.
```

## See also

- `WebGLRenderingContext.isContextLost()`
- `WEBGL_lose_context`, `WEBGL_lose_context.loseContext()`, `WEBGL_lose_context.restoreContext()`
- Events: webglcontextlost, webglcontextrestored, webglcontextcreationerror
