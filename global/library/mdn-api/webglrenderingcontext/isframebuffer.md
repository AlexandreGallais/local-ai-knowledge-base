---
title: "WebGLRenderingContext: isFramebuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/isframebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: isFramebuffer() method

The **`WebGLRenderingContext.isFramebuffer()`** method of the
WebGL API returns `true` if the
passed `WebGLFramebuffer` is valid and `false` otherwise.

## Syntax

```js
isFramebuffer(framebuffer)
```

### Parameters

- `framebuffer`
    A `WebGLFramebuffer` to check.

### Return value

A `GLboolean` indicating whether or not the frame buffer is valid.

## Examples

### Checking a frame buffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const framebuffer = gl.createFramebuffer();

gl.isFramebuffer(framebuffer);
```

## See also

- `WebGLRenderingContext.bindFramebuffer()`
- `WebGLRenderingContext.createFramebuffer()`
- `WebGLRenderingContext.deleteFramebuffer()`
- Other buffers: `WebGLBuffer`, `WebGLRenderbuffer`
