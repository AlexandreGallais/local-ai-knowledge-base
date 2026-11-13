---
title: "WEBGL_lose_context: loseContext() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_lose_context/losecontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_lose_context: loseContext() method

The **`loseContext()`** method of the `WEBGL_lose_context` extension is part of the WebGL API and allows you to simulate losing the context of a `WebGLRenderingContext`.

It triggers the steps described in the WebGL specification for handling context lost. The context will remain lost until `WEBGL_lose_context.restoreContext()` is called. It also destroys the underlying graphics context and all graphics resources. This is the recommended mechanism for applications to programmatically halt their use of the WebGL API.

## Syntax

```js
loseContext()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

With this method, you can simulate the `webglcontextlost` event:

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
- Events: `webglcontextlost`, `webglcontextrestored`, `webglcontextcreationerror`
