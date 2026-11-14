---
title: "WebGL2RenderingContext: invalidateFramebuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/invalidateframebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: invalidateFramebuffer() method

The **`WebGL2RenderingContext.invalidateFramebuffer()`** method
of the WebGL 2 API invalidates the contents
of attachments in a framebuffer.

## Syntax

```js
invalidateFramebuffer(target, attachments)
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

### Return value

None (`undefined`).

## Examples

```js
gl.invalidateFramebuffer(gl.READ_FRAMEBUFFER, [
  gl.COLOR_ATTACHMENT0,
  gl.COLOR_ATTACHMENT1,
]);
```

## See also

- `WebGL2RenderingContext.invalidateSubFramebuffer()`
