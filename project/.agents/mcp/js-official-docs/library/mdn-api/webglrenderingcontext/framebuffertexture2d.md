---
title: "WebGLRenderingContext: framebufferTexture2D() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/framebuffertexture2d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: framebufferTexture2D() method

The **`WebGLRenderingContext.framebufferTexture2D()`** method
of the WebGL API attaches a texture to a
`WebGLFramebuffer`.

## Syntax

```js
framebufferTexture2D(target, attachment, textarget, texture, level)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target). Possible values:
    - `gl.FRAMEBUFFER`
        Collection buffer data storage of color, alpha,
        depth and stencil buffers used to render an image.

    When using a `WebGL 2 context`,
    the following values are available additionally:
    - `gl.DRAW_FRAMEBUFFER`
        Used as a destination for drawing,
        rendering, clearing, and writing operations.
    - `gl.READ_FRAMEBUFFER`
        Used as a source for reading operations.

    When binding, `gl.FRAMEBUFFER` sets both the
    `gl.DRAW_FRAMEBUFFER` and `gl.READ_FRAMEBUFFER` binding
    points. When referencing, `gl.FRAMEBUFFER` refers to the
    `gl.DRAW_FRAMEBUFFER` binding

- `attachment`
    A `GLenum` specifying the attachment point for the
    `texture`. Possible values:
    - `gl.COLOR_ATTACHMENT0`: Attaches the texture to the framebuffer's
      color buffer.
    - `gl.DEPTH_ATTACHMENT`: Attaches the texture to the framebuffer's
      depth buffer.
    - `gl.STENCIL_ATTACHMENT`: Attaches the texture to the framebuffer's
      stencil buffer.

    When using a `WebGL 2 context`,
    the following values are available additionally:
    - `gl.DEPTH_STENCIL_ATTACHMENT`: depth and stencil buffer.
    - `gl.COLOR_ATTACHMENT1 gl.COLOR_ATTACHMENT2 gl.COLOR_ATTACHMENT3 gl.COLOR_ATTACHMENT4 gl.COLOR_ATTACHMENT5 gl.COLOR_ATTACHMENT6 gl.COLOR_ATTACHMENT7 gl.COLOR_ATTACHMENT8 gl.COLOR_ATTACHMENT9 gl.COLOR_ATTACHMENT10 gl.COLOR_ATTACHMENT11 gl.COLOR_ATTACHMENT12 gl.COLOR_ATTACHMENT13 gl.COLOR_ATTACHMENT14 gl.COLOR_ATTACHMENT15`

    When using the `WEBGL_draw_buffers` extension:
    - `ext.COLOR_ATTACHMENT0_WEBGL` (same as
      `gl.COLOR_ATTACHMENT0`)
    - `ext.COLOR_ATTACHMENT1_WEBGL ext.COLOR_ATTACHMENT2_WEBGL ext.COLOR_ATTACHMENT3_WEBGL ext.COLOR_ATTACHMENT4_WEBGL ext.COLOR_ATTACHMENT5_WEBGL ext.COLOR_ATTACHMENT6_WEBGL ext.COLOR_ATTACHMENT7_WEBGL ext.COLOR_ATTACHMENT8_WEBGL ext.COLOR_ATTACHMENT9_WEBGL ext.COLOR_ATTACHMENT10_WEBGL ext.COLOR_ATTACHMENT11_WEBGL ext.COLOR_ATTACHMENT12_WEBGL ext.COLOR_ATTACHMENT13_WEBGL ext.COLOR_ATTACHMENT14_WEBGL ext.COLOR_ATTACHMENT15_WEBGL`

    When using the `WEBGL_depth_texture` extension:
    - `gl.DEPTH_STENCIL_ATTACHMENT`: Depth and stencil buffer data storage.

- `textarget`
    A `GLenum` specifying the texture target. Possible values:
    - `gl.TEXTURE_2D`: A 2D image.
    - `gl.TEXTURE_CUBE_MAP_POSITIVE_X`: Image for the positive X face of
      the cube.
    - `gl.TEXTURE_CUBE_MAP_NEGATIVE_X`: Image for the negative X face of
      the cube.
    - `gl.TEXTURE_CUBE_MAP_POSITIVE_Y`: Image for the positive Y face of
      the cube.
    - `gl.TEXTURE_CUBE_MAP_NEGATIVE_Y`: Image for the negative Y face of
      the cube.
    - `gl.TEXTURE_CUBE_MAP_POSITIVE_Z`: Image for the positive Z face of
      the cube.
    - `gl.TEXTURE_CUBE_MAP_NEGATIVE_Z`: Image for the negative Z face of
      the cube.

- `texture`
    A `WebGLTexture` object whose image to attach.
- `level`
    A `GLint` specifying the mipmap level of the texture image to be
    attached. Must be 0.

### Return value

None (`undefined`).

### Exceptions

- A `gl.INVALID_ENUM` error is thrown if
  - `target` is not `gl.FRAMEBUFFER`.
  - `attachment` is not one of the accepted attachment points.
  - `textarget` is not one of the accepted texture targets.

- A `gl.INVALID_VALUE` error is thrown if `level` is not 0.
- A `gl.INVALID_OPERATION` error is thrown if `texture` isn't 0
  or the name of an existing texture object.

## Examples

```js
gl.framebufferTexture2D(
  gl.FRAMEBUFFER,
  gl.COLOR_ATTACHMENT0,
  gl.TEXTURE_2D,
  texture,
  0,
);
```

## See also

- `WebGLRenderingContext.createFramebuffer()`
- `WebGLRenderingContext.deleteFramebuffer()`
- `WebGLRenderingContext.isFramebuffer()`
- Other buffers: `WebGLBuffer`, `WebGLRenderbuffer`
- `WEBGL_depth_texture`
- `WEBGL_draw_buffers`
