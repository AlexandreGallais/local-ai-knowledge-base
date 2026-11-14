---
title: "WebGLRenderbuffer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderbuffer

The **WebGLRenderbuffer** interface is part of the WebGL API and represents a buffer that can contain an image, or that can be a source or target of a rendering operation.

## Description

The `WebGLRenderbuffer` object does not define any methods or properties of its own and its content is not directly accessible. When working with `WebGLRenderbuffer` objects, the following methods are useful:

- `WebGLRenderingContext.bindRenderbuffer()`
- `WebGLRenderingContext.createRenderbuffer()`
- `WebGLRenderingContext.deleteRenderbuffer()`
- `WebGLRenderingContext.framebufferRenderbuffer()`
- `WebGLRenderingContext.getRenderbufferParameter()`
- `WebGLRenderingContext.isRenderbuffer()`
- `WebGLRenderingContext.renderbufferStorage()`
- `WebGL2RenderingContext.renderbufferStorageMultisample()`

## Examples

### Creating a render buffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const buffer = gl.createRenderbuffer();
```

## See also

- `WebGLRenderingContext.bindRenderbuffer()`
- `WebGLRenderingContext.createRenderbuffer()`
- `WebGLRenderingContext.deleteRenderbuffer()`
- `WebGLRenderingContext.framebufferRenderbuffer()`
- `WebGLRenderingContext.getRenderbufferParameter()`
- `WebGLRenderingContext.isRenderbuffer()`
- `WebGLRenderingContext.renderbufferStorage()`
- Other buffers: `WebGLBuffer`, `WebGLFramebuffer`
