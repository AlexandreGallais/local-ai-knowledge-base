---
title: "WebGL2RenderingContext: blitFramebuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/blitframebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: blitFramebuffer() method

The **`WebGL2RenderingContext.blitFramebuffer()`** method of
the WebGL 2 API transfers a block of pixels
from the read framebuffer to the draw framebuffer. Read and draw framebuffers are bound
using `WebGLRenderingContext.bindFramebuffer()`.

## Syntax

```js
blitFramebuffer(srcX0, srcY0, srcX1, srcY1,
                dstX0, dstY0, dstX1, dstY1,
                mask, filter)
```

### Parameters

- `srcX0`, `srcY0`, `srcX1`, `srcY1`
    A `GLint` specifying the bounds of the source rectangle.
- `dstX0`, `dstY0`, `dstX1`, `dstY1`
    A `GLint` specifying the bounds of the destination rectangle.
- `mask`
    A `GLbitfield` specifying a bitwise OR mask indicating which buffers
    are to be copied. Possible values:
    - `gl.COLOR_BUFFER_BIT`
    - `gl.DEPTH_BUFFER_BIT`
    - `gl.STENCIL_BUFFER_BIT`

- `filter`
    A `GLenum` specifying the interpolation to be applied if the image is
    stretched. Possible values:
    - `gl.NEAREST`
    - `gl.LINEAR`

### Return value

None (`undefined`).

## Examples

```js
gl.blitFramebuffer(
  0,
  0,
  canvas.width,
  canvas.height,
  0,
  0,
  canvas.width,
  canvas.height,
  gl.COLOR_BUFFER_BIT,
  gl.NEAREST,
);
```

## See also

- `WebGLRenderingContext.bindFramebuffer()`
- `WebGLRenderingContext.getRenderbufferParameter()`
