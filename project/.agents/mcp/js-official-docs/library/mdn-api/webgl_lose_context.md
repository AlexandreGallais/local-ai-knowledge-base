---
title: "WEBGL_lose_context extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_lose_context/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_lose_context extension

The **WEBGL_lose_context** extension is part of the WebGL API and exposes functions to simulate losing and restoring a `WebGLRenderingContext`.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is available to both, `WebGL1` and `WebGL2` contexts.

## Instance methods

- `WEBGL_lose_context.loseContext()`
    Simulates losing the context.
- `WEBGL_lose_context.restoreContext()`
    Simulates restoring the context.

## Examples

With this extension, you can simulate the `webglcontextlost` and `webglcontextrestored` events:

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

canvas.addEventListener("webglcontextlost", (event) => {
  console.log(event);
});

gl.getExtension("WEBGL_lose_context").loseContext();

// WebGLContextEvent event with type "webglcontextlost" is logged.
```

## See also

- `WebGLRenderingContext.isContextLost()`
- Events: `webglcontextlost`, `webglcontextrestored`, `webglcontextcreationerror`
