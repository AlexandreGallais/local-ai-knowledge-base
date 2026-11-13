---
title: "WebGLRenderingContext: getFramebufferAttachmentParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getframebufferattachmentparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getFramebufferAttachmentParameter() method

The
**`WebGLRenderingContext.getFramebufferAttachmentParameter()`**
method of the WebGL API returns information
about a framebuffer's attachment.

## Syntax

```js
getFramebufferAttachmentParameter(target, attachment, pname)
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
        Equivalent to `gl.FRAMEBUFFER`.
        Used as a destination for drawing, rendering, clearing, and writing operations.
    - `gl.READ_FRAMEBUFFER`
        Used as a source for reading operations.

- `attachment`
    A `GLenum` specifying the attachment point for the
    `texture`. Possible values:
    - `gl.COLOR_ATTACHMENT0`: Texture attachment for the framebuffer's
      color buffer.
    - `gl.DEPTH_ATTACHMENT`: Texture attachment for the framebuffer's depth
      buffer.
    - `gl.STENCIL_ATTACHMENT`: Texture attachment for the framebuffer's
      stencil buffer.
    - `gl.DEPTH_STENCIL_ATTACHMENT`: Texture attachment for both, the depth
      and stencil buffer.

    When using a `WebGL 2 context`,
    the following values are available additionally:
    - `gl.COLOR_ATTACHMENT1 gl.COLOR_ATTACHMENT2 gl.COLOR_ATTACHMENT3 gl.COLOR_ATTACHMENT4 gl.COLOR_ATTACHMENT5 gl.COLOR_ATTACHMENT6 gl.COLOR_ATTACHMENT7 gl.COLOR_ATTACHMENT8 gl.COLOR_ATTACHMENT9 gl.COLOR_ATTACHMENT10 gl.COLOR_ATTACHMENT11 gl.COLOR_ATTACHMENT12 gl.COLOR_ATTACHMENT13 gl.COLOR_ATTACHMENT14 gl.COLOR_ATTACHMENT15`

    When using the `WEBGL_draw_buffers` extension:
    - `ext.COLOR_ATTACHMENT0_WEBGL` (same as
      `gl.COLOR_ATTACHMENT0`)
      `ext.COLOR_ATTACHMENT1_WEBGL ext.COLOR_ATTACHMENT2_WEBGL ext.COLOR_ATTACHMENT3_WEBGL ext.COLOR_ATTACHMENT4_WEBGL ext.COLOR_ATTACHMENT5_WEBGL ext.COLOR_ATTACHMENT6_WEBGL ext.COLOR_ATTACHMENT7_WEBGL ext.COLOR_ATTACHMENT8_WEBGL ext.COLOR_ATTACHMENT9_WEBGL ext.COLOR_ATTACHMENT10_WEBGL ext.COLOR_ATTACHMENT11_WEBGL ext.COLOR_ATTACHMENT12_WEBGL ext.COLOR_ATTACHMENT13_WEBGL ext.COLOR_ATTACHMENT14_WEBGL ext.COLOR_ATTACHMENT15_WEBGL`

- `pname`
    A `GLenum` specifying information to query. Possible values:
    - `gl.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE`: The type which contains the
      attached image.
    - `gl.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME`: The texture or renderbuffer
      of the attached image (`WebGLRenderbuffer` or
      `WebGLTexture`).
    - `gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL`: Mipmap level. Default
      value: 0.
    - `gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE`: The name of
      cube-map face of the texture.

    When using the `EXT_sRGB` extension:
    - `ext.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT`: The framebuffer
      color encoding.

    When using a `WebGL 2 context`,
    the following values are available additionally:
    - `gl.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE`
    - `gl.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE`
    - `gl.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING`
    - `gl.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE`
    - `gl.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE`
    - `gl.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE`
    - `gl.FRAMEBUFFER_ATTACHMENT_RED_SIZE`
    - `gl.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE`
    - `gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER`

    When using the `OVR_multiview2` extension:
    - `ext.FRAMEBUFFER_ATTACHMENT_TEXTURE_NUM_VIEWS_OVR`: the number of views of the framebuffer object attachment.
    - `ext.FRAMEBUFFER_ATTACHMENT_TEXTURE_BASE_VIEW_INDEX_OVR`: the base view index of the framebuffer object attachment.

### Return value

Depends on the requested information (as specified with `pname`). Either a
`GLint`, a `GLenum`, a `WebGLRenderbuffer`, or a
`WebGLTexture`.

       | `pname` parameter
       | Return value

       | `gl.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE`
       |
        A `GLenum` indicating the
        type of the texture. Either `gl.RENDERBUFFER`,
        `gl.TEXTURE`, or if no image is attached,
        `gl.NONE`.

       | `gl.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME`
       |
        The texture (`WebGLTexture`) or renderbuffer
        (`WebGLRenderbuffer`) of the attached image.

       | `gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL`
       |
        A `GLint` indicating the
        mipmap level. Default value: 0.

       | `gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE`
       |
        A `GLenum` indicating the
        name of cube-map face of the texture. Possible values:

            `gl.TEXTURE_CUBE_MAP_POSITIVE_X`: Image for the positive
            X face of the cube.

            `gl.TEXTURE_CUBE_MAP_NEGATIVE_X`: Image for the negative
            X face of the cube.

            `gl.TEXTURE_CUBE_MAP_POSITIVE_Y`: Image for the positive
            Y face of the cube.

            `gl.TEXTURE_CUBE_MAP_NEGATIVE_Y`: Image for the negative
            Y face of the cube.

            `gl.TEXTURE_CUBE_MAP_POSITIVE_Z`: Image for the positive
            Z face of the cube.

            `gl.TEXTURE_CUBE_MAP_NEGATIVE_Z`: Image for the negative
            Z face of the cube.

       | `gl.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE`
       |
        A `GLint` indicating the
        number of bits in the alpha component of the attachment.

       | `gl.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE`
       |
        A `GLint` indicating the
        number of bits in the blue component of the attachment.

       | `gl.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING`
       |
        A `GLenum` indicating the
        encoding of components of the specified attachment. Either
        `gl.LINEAR` or `gl.SRGB`.

       | `gl.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE`
       |
        A `GLenum` indicating the
        format of the components of the specified attachment. Either
        `gl.FLOAT`, `gl.INT`,
        `gl.UNSIGNED_INT`, `gl.SIGNED_NORMALIZED`, or
        `gl.UNSIGNED_NORMALIZED`.

       | `gl.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE`
       |
        A `GLint` indicating the
        number of bits in the depth component of the attachment.

       | `gl.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE`
       |
        A `GLint` indicating the
        number of bits in the green component of the attachment.

       | `gl.FRAMEBUFFER_ATTACHMENT_RED_SIZE`
       |
        A `GLint` indicating the
        number of bits in the red component of the attachment.

       | `gl.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE`
       |
        A `GLint` indicating the
        number of bits in the stencil component of the attachment.

       | `gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER`
       |
        A `GLint` indicating the
        number of the texture layer which contains the attached image.

       | `ext.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT`
       |
        A `GLenum` indicating the
        framebuffer color encoding. Either `gl.LINEAR` or
        `ext.SRGB_EXT`.

       | `ext.FRAMEBUFFER_ATTACHMENT_TEXTURE_NUM_VIEWS_OVR`
       |
        A `GLsizei` indicating
        the number of views of the framebuffer object attachment.

       |
        `ext.FRAMEBUFFER_ATTACHMENT_TEXTURE_BASE_VIEW_INDEX_OVR`

       |
        A `GLint` indicating the
        base view index of the framebuffer object attachment.

### Exceptions

- A `gl.INVALID_ENUM` error is thrown if `target` is not
  `gl.FRAMEBUFFER`, `gl.DRAW_FRAMEBUFFER`,
  `gl.READ_FRAMEBUFFER` or if `attachment` is not one of the
  accepted attachment points.

## Examples

```js
gl.getFramebufferAttachmentParameter(
  gl.FRAMEBUFFER,
  gl.COLOR_ATTACHMENT0,
  gl.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE,
);
```

## See also

- `WebGLRenderingContext.createFramebuffer()`
- `WebGLRenderingContext.deleteFramebuffer()`
- `WebGLRenderingContext.isFramebuffer()`
- Other buffers: `WebGLBuffer`, `WebGLRenderbuffer`
- `EXT_sRGB`
- `WEBGL_draw_buffers`
