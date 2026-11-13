---
title: "WebGL2RenderingContext: texStorage2D() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/texstorage2d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: texStorage2D() method

The **`texStorage2D()`** method of the `WebGL2RenderingContext` of the WebGL API specifies all levels of two-dimensional texture storage.

## Syntax

```js
texStorage2D(target, levels, internalformat, width, height)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target) of the active texture. Possible values:
    - `gl.TEXTURE_2D`: A two-dimensional texture.
    - `gl.TEXTURE_CUBE_MAP`: A cube-mapped texture.
- `levels`
    A `GLint` specifying the number of texture levels.
- `internalformat`
    A `GLenum` specifying the texture store format. Possible values:
    - `gl.R8`
    - `gl.R8_SNORM`
    - `gl.R16F`
    - `gl.R32F`
    - `gl.R8UI`
    - `gl.R8I`
    - `gl.R16UI`
    - `gl.R16I`
    - `gl.R32UI`
    - `gl.R32I`
    - `gl.RG8`
    - `gl.RG8_SNORM`
    - `gl.RG16F`
    - `gl.RG32F`
    - `gl.RG8UI`
    - `gl.RG8I`
    - `gl.RG16UI`
    - `gl.RG16I`
    - `gl.RG32UI`
    - `gl.RG32I`
    - `gl.RGB8`
    - `gl.SRGB8`
    - `gl.RGB565`
    - `gl.RGB8_SNORM`
    - `gl.R11F_G11F_B10F`
    - `gl.RGB9_E5`
    - `gl.RGB16F`
    - `gl.RGB32F`
    - `gl.RGB8UI`
    - `gl.RGB8I`
    - `gl.RGB16UI`
    - `gl.RGB16I`
    - `gl.RGB32UI`
    - `gl.RGB32I`
    - `gl.RGBA8`
    - `gl.SRGB8_ALPHA8`
    - `gl.RGBA8_SNORM`
    - `gl.RGB5_A1`
    - `gl.RGBA4`
    - `gl.RGB10_A2`
    - `gl.RGBA16F`
    - `gl.RGBA32F`
    - `gl.RGBA8UI`
    - `gl.RGBA8I`
    - `gl.RGB10_A2UI`
    - `gl.RGBA16UI`
    - `gl.RGBA16I`
    - `gl.RGBA32UI`
    - `gl.RGBA32I`
    - `gl.DEPTH_COMPONENT16`
    - `gl.DEPTH_COMPONENT24`
    - `gl.DEPTH_COMPONENT32F`
    - `gl.DEPTH24_STENCIL8`
    - `gl.DEPTH32F_STENCIL8`

    Unlike OpenGL 3.0, WebGL 2 **doesn't support** the following ETC2 and EAC compressed texture formats (see section 5.37 in the WebGL 2 spec). You might be able to enable them via the `WEBGL_compressed_texture_etc` extension, though.
    - `gl.COMPRESSED_R11_EAC`
    - `gl.COMPRESSED_SIGNED_R11_EAC`
    - `gl.COMPRESSED_RG11_EAC`
    - `gl.COMPRESSED_SIGNED_RG11_EAC`
    - `gl.COMPRESSED_RGB8_ETC2`
    - `gl.COMPRESSED_SRGB8_ETC2`
    - `gl.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2`
    - `gl.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2`
    - `gl.COMPRESSED_RGBA8_ETC2_EAC`
    - `gl.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC`

    For the description of these formats, see `WebGLRenderingContext.texImage2D()`. Because `texStorage2D` does not actually specify a buffer source, the `format` and `type` parameters are irrelevant, and can be considered to be any of the valid values corresponding to the `internalformat`.

- `width`
    A `GLsizei` specifying the width of the texture in texels.
- `height`
    A `GLsizei` specifying the height of the texture in texels.

### Return value

None (`undefined`).

## Examples

```js
gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, 256, 256);
```

## See also

- `WebGL2RenderingContext.texStorage3D()`
- `WEBGL_compressed_texture_etc`
