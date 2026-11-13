---
title: "WebGLRenderingContext: createFramebuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/createframebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: createFramebuffer() method

The **`WebGLRenderingContext.createFramebuffer()`** method of
the WebGL API creates and initializes a
`WebGLFramebuffer` object.

## Syntax

```js
createFramebuffer()
```

### Parameters

None.

### Return value

A `WebGLFramebuffer` object.

## Examples

### Creating a frame buffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const framebuffer = gl.createFramebuffer();
```

## See also

- `WebGLRenderingContext.bindFramebuffer()`
- `WebGLRenderingContext.deleteFramebuffer()`
- `WebGLRenderingContext.isFramebuffer()`
- Other buffers: `WebGLBuffer`, `WebGLRenderbuffer`
