---
title: "WebGLRenderingContext: renderbufferStorage() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/renderbufferstorage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: renderbufferStorage() method

The **`WebGLRenderingContext.renderbufferStorage()`** method of
the WebGL API creates and initializes a
renderbuffer object's data store.

## Syntax

```js
renderbufferStorage(target, internalFormat, width, height)
```

### Parameters

- `target`
    A `GLenum` specifying the target renderbuffer object. Possible values:
    - `gl.RENDERBUFFER`
        Buffer data storage for single images in a renderable internal format.

- `internalFormat`
    A `GLenum` specifying the internal format of the renderbuffer. Possible
    values:
    - `gl.RGBA4`: 4 red bits, 4 green bits, 4 blue bits 4 alpha bits.
    - `gl.RGB565`: 5 red bits, 6 green bits, 5 blue bits.
    - `gl.RGB5_A1`: 5 red bits, 5 green bits, 5 blue bits, 1 alpha bit.
    - `gl.DEPTH_COMPONENT16`: 16 depth bits.
    - `gl.STENCIL_INDEX8`: 8 stencil bits.
    - `gl.DEPTH_STENCIL`

    When using a `WebGL 2 context`,
    the following values are available additionally:
    - `gl.R8`
    - `gl.R8UI`
    - `gl.R8I`
    - `gl.R16UI`
    - `gl.R16I`
    - `gl.R32UI`
    - `gl.R32I`
    - `gl.RG8`
    - `gl.RG8UI`
    - `gl.RG8I`
    - `gl.RG16UI`
    - `gl.RG16I`
    - `gl.RG32UI`
    - `gl.RG32I`
    - `gl.RGB8`
    - `gl.RGBA8`
    - `gl.SRGB8_ALPHA8` (also available as an extension for WebGL 1, see below)
    - `gl.RGB10_A2`
    - `gl.RGBA8UI`
    - `gl.RGBA8I`
    - `gl.RGB10_A2UI`
    - `gl.RGBA16UI`
    - `gl.RGBA16I`
    - `gl.RGBA32I`
    - `gl.RGBA32UI`
    - `gl.DEPTH_COMPONENT24`
    - `gl.DEPTH_COMPONENT32F`
    - `gl.DEPTH24_STENCIL8`
    - `gl.DEPTH32F_STENCIL8`

    When using the `WEBGL_color_buffer_float` extension:
    - `ext.RGBA32F_EXT`: RGBA 32-bit floating-point type.
    - `ext.RGB32F_EXT`: RGB 32-bit floating-point type.

    When using the `EXT_sRGB` extension:
    - `ext.SRGB8_ALPHA8_EXT`: 8-bit sRGB and alpha.

    When using a `WebGL 2 context` and
    the `EXT_color_buffer_float` extension:
    - `gl.R16F`
    - `gl.RG16F`
    - `gl.RGBA16F`
    - `gl.R32F`
    - `gl.RG32F`
    - `gl.RGBA32F`
    - `gl.R11F_G11F_B10F`

- `width`
    A `GLsizei` specifying the width of the renderbuffer in pixels.
- `height`
    A `GLsizei` specifying the height of the renderbuffer in pixels.

### Return value

None (`undefined`).

## Examples

```js
gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA4, 256, 256);
```

## See also

- `WebGLRenderingContext.bindRenderbuffer()`
- `WebGLRenderingContext.createRenderbuffer()`
- `WebGLRenderingContext.deleteRenderbuffer()`
- `WebGLRenderingContext.getRenderbufferParameter()`
- `WEBGL_color_buffer_float`
- `EXT_sRGB`
- `EXT_color_buffer_float`
- `EXT_texture_norm16`
