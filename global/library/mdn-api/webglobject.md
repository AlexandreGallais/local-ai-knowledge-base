---
title: "WebGLObject"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglobject/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLObject

The **`WebGLObject`** is part of the WebGL API and is the parent interface for all WebGL objects.

This object has no public properties or methods on its own.

If the WebGL context is lost, the internal _invalidated_ flag of all `WebGLObject` instances is set to `true`.

## Objects inheriting from `WebGLObject`

WebGL 1:

- `WebGLBuffer`
- `WebGLFramebuffer`
- `WebGLProgram`
- `WebGLRenderbuffer`
- `WebGLShader`
- `WebGLTexture`

WebGL 2:

- `WebGLQuery` (and `WebGLTimerQueryEXT`)
- `WebGLSampler`
- `WebGLSync`
- `WebGLTransformFeedback`
- `WebGLVertexArrayObject` (and `WebGLVertexArrayObjectOES`)

## See also

- `WebGLRenderingContext.isContextLost()`
- `WEBGL_lose_context`
- `webglcontextlost` event
