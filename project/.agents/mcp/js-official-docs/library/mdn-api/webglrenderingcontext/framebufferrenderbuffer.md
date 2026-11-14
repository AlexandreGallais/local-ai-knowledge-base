---
title: "WebGLRenderingContext: framebufferRenderbuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/framebufferrenderbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: framebufferRenderbuffer() method

The **`WebGLRenderingContext.framebufferRenderbuffer()`**
method of the WebGL API attaches a
`WebGLRenderbuffer` object to a `WebGLFramebuffer` object.

## Syntax

```js
framebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target) for the framebuffer.
    Possible values:
    - `gl.FRAMEBUFFER`
        Collection buffer data storage of color, alpha,
        depth and stencil buffers used to render an image.

    When using a `WebGL 2 context`,
    the following values are available additionally:
    - `gl.DRAW_FRAMEBUFFER`
        Equivalent to `gl.FRAMEBUFFER`.
        Used as a destination for drawing, rendering, clearing, and writing operations.
    - `gl.READ_FRAMEBUFFER`
        Used as a source for reading operations.

- `attachment`
    A `GLenum` specifying the attachment point for the render buffer.
    Possible values:
    - `gl.COLOR_ATTACHMENT0`: color buffer.
    - `gl.DEPTH_ATTACHMENT`: depth buffer.
    - `gl.DEPTH_STENCIL_ATTACHMENT`: depth and stencil buffer.
    - `gl.STENCIL_ATTACHMENT`: stencil buffer.

    When using a `WebGL 2 context`,
    the following values are available additionally:
    - `gl.COLOR_ATTACHMENT1 gl.COLOR_ATTACHMENT2 gl.COLOR_ATTACHMENT3 gl.COLOR_ATTACHMENT4 gl.COLOR_ATTACHMENT5 gl.COLOR_ATTACHMENT6 gl.COLOR_ATTACHMENT7 gl.COLOR_ATTACHMENT8 gl.COLOR_ATTACHMENT9 gl.COLOR_ATTACHMENT10 gl.COLOR_ATTACHMENT11 gl.COLOR_ATTACHMENT12 gl.COLOR_ATTACHMENT13 gl.COLOR_ATTACHMENT14 gl.COLOR_ATTACHMENT15`

    When using the `WEBGL_draw_buffers` extension:
    - `ext.COLOR_ATTACHMENT0_WEBGL` (same as
      `gl.COLOR_ATTACHMENT0`)
    - `ext.COLOR_ATTACHMENT1_WEBGL ext.COLOR_ATTACHMENT2_WEBGL ext.COLOR_ATTACHMENT3_WEBGL ext.COLOR_ATTACHMENT4_WEBGL ext.COLOR_ATTACHMENT5_WEBGL ext.COLOR_ATTACHMENT6_WEBGL ext.COLOR_ATTACHMENT7_WEBGL ext.COLOR_ATTACHMENT8_WEBGL ext.COLOR_ATTACHMENT9_WEBGL ext.COLOR_ATTACHMENT10_WEBGL ext.COLOR_ATTACHMENT11_WEBGL ext.COLOR_ATTACHMENT12_WEBGL ext.COLOR_ATTACHMENT13_WEBGL ext.COLOR_ATTACHMENT14_WEBGL ext.COLOR_ATTACHMENT15_WEBGL`

- `renderbuffertarget`
    A `GLenum` specifying the binding point (target) for the render buffer.
    Possible values:
    - `gl.RENDERBUFFER`
        Buffer data storage for single images in a renderable internal format.

- `renderbuffer`
    A `WebGLRenderbuffer` object to attach.

### Return value

None (`undefined`).

### Exceptions

- A `gl.INVALID_ENUM` error is thrown if `target` is not
  `gl.FRAMEBUFFER`, `gl.DRAW_FRAMEBUFFER`, or
  `gl.READ_FRAMEBUFFER`.
- A `gl.INVALID_ENUM` error is thrown if `renderbuffertarget` is
  not `gl.RENDERBUFFER`.
- A `gl.INVALID_ENUM` error is thrown if `attachment` is not one
  of the allowed enums.

## Examples

```js
gl.framebufferRenderbuffer(
  gl.FRAMEBUFFER,
  gl.COLOR_ATTACHMENT0,
  gl.RENDERBUFFER,
  renderbuffer,
);
```

## See also

- `WebGLRenderingContext.createFramebuffer()`
- `WebGLRenderingContext.deleteFramebuffer()`
- `WebGLRenderingContext.isFramebuffer()`
- Other buffers: `WebGLBuffer`, `WebGLRenderbuffer`
- `WEBGL_draw_buffers`
