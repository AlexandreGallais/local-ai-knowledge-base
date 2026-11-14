---
title: "WebGLRenderingContext: deleteFramebuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/deleteframebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: deleteFramebuffer() method

The **`WebGLRenderingContext.deleteFramebuffer()`** method of
the WebGL API deletes a given
`WebGLFramebuffer` object. This method has no effect if the frame buffer
has already been deleted.

## Syntax

```js
deleteFramebuffer(framebuffer)
```

### Parameters

- `framebuffer`
    A `WebGLFramebuffer` object to delete.

### Return value

None (`undefined`).

## Examples

### Deleting a frame buffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const framebuffer = gl.createFramebuffer();

// …

gl.deleteFramebuffer(framebuffer);
```

## See also

- `WebGLRenderingContext.bindFramebuffer()`
- `WebGLRenderingContext.createFramebuffer()`
- `WebGLRenderingContext.isFramebuffer()`
- Other buffers: `WebGLBuffer`, `WebGLRenderbuffer`
