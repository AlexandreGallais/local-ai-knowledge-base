---
title: "WebGLFramebuffer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglframebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLFramebuffer

The **WebGLFramebuffer** interface is part of the WebGL API and represents a collection of buffers that serve as a rendering destination.

## Description

The `WebGLFramebuffer` object does not define any methods or properties of its own and its content is not directly accessible. When working with `WebGLFramebuffer` objects, the following methods of the `WebGLRenderingContext` are useful:

- `WebGLRenderingContext.bindFramebuffer()`
- `WebGLRenderingContext.createFramebuffer()`
- `WebGLRenderingContext.deleteFramebuffer()`
- `WebGLRenderingContext.isFramebuffer()`
- `WebGLRenderingContext.framebufferRenderbuffer()`
- `WebGLRenderingContext.framebufferTexture2D()`

## Examples

### Creating a frame buffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const buffer = gl.createFramebuffer();
```

## See also

- `WebGLRenderingContext.bindFramebuffer()`
- `WebGLRenderingContext.createFramebuffer()`
- `WebGLRenderingContext.deleteFramebuffer()`
- `WebGLRenderingContext.isFramebuffer()`
- `WebGLRenderingContext.framebufferRenderbuffer()`
- `WebGLRenderingContext.framebufferTexture2D()`
- Other buffers: `WebGLBuffer`, `WebGLRenderbuffer`
