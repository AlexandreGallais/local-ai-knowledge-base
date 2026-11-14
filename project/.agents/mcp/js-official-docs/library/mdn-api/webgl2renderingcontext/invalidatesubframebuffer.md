---
title: "WebGL2RenderingContext: invalidateSubFramebuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/invalidatesubframebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: invalidateSubFramebuffer() method

The **`WebGL2RenderingContext.invalidateSubFramebuffer()`**
method of the WebGL 2 API invalidates
portions of the contents of attachments in a framebuffer.

## Syntax

```js
invalidateSubFramebuffer(target, attachments, x, y, width, height)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target). Possible values:
    - `gl.FRAMEBUFFER`
        Collection buffer data storage of color, alpha,
        depth and stencil buffers used to render an image.
    - `gl.DRAW_FRAMEBUFFER`
        Equivalent to `gl.FRAMEBUFFER`.
    - `gl.READ_FRAMEBUFFER`
        Used as a source for reading operations.

- `attachments`
    An `Array` of `GLenum` specifying the attachment points to
    invalidate. Possible values:
    - `gl.COLOR_ATTACHMENT{0-15}`
        Invalidates one of the framebuffer's
        color buffers.
    - `gl.DEPTH_ATTACHMENT`
        Invalidates the framebuffer's depth buffer.
    - `gl.STENCIL_ATTACHMENT`
        Invalidates the framebuffer's stencil
        buffer.
    - `gl.DEPTH_STENCIL_ATTACHMENT`
        Invalidates both the framebuffer's
        depth and stencil buffer.

- `x`
    A `GLint` specifying the left origin of the pixel rectangle to
    invalidate.
- `y`
    A `GLint` specifying the bottom origin of the pixel rectangle to
    invalidate.
- `width`
    A `GLsizei` specifying the width of the pixel rectangle to invalidate.
- `height`
    A `GLsizei` specifying the height of the pixel rectangle to invalidate.

### Return value

None (`undefined`).

## Examples

```js
gl.invalidateSubFramebuffer(
  gl.READ_FRAMEBUFFER,
  [gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1],
  0,
  0,
  256,
  256,
);
```

## See also

- `WebGL2RenderingContext.invalidateFramebuffer()`
