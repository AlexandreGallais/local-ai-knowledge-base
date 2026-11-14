---
title: "WEBGL_lose_context: restoreContext() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_lose_context/restorecontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_lose_context: restoreContext() method

The **`restoreContext()`** method of the `WEBGL_lose_context` extension is part of the WebGL API and allows you to simulate restoring the context of a `WebGLRenderingContext`.

It triggers the steps described in the WebGL specification for handling context restored. The context is not usable until the `webglcontextrestored` event is fired.

## Syntax

```js
restoreContext()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

Browsers may not report WebGL errors by default. WebGL's error reporting works by calling `getError()` and checking for errors. The following exceptions may be thrown:

- `INVALID_OPERATION`
    Thrown if the context was not lost.

## Examples

With this method, you can simulate the `webglcontextrestored` event:

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

canvas.addEventListener("webglcontextrestored", (e) => {
  console.log(e);
});

gl.getExtension("WEBGL_lose_context").restoreContext();
```

## See also

- `WebGLRenderingContext.isContextLost()`
- Events: `webglcontextlost`, `webglcontextrestored`, `webglcontextcreationerror`
