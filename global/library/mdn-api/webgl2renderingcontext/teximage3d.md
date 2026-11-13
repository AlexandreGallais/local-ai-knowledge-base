---
title: "WebGL2RenderingContext: texImage3D() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/teximage3d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: texImage3D() method

The **`texImage3D()`** method of the `WebGL2RenderingContext` interface of the WebGL API specifies a three-dimensional texture image.

## Syntax

```js
texImage3D(target, level, internalformat, width, height, depth, border, format, type, srcData)
texImage3D(target, level, internalformat, width, height, depth, border, format, type, srcData, srcOffset)
texImage3D(target, level, internalformat, width, height, depth, border, format, type, source)
texImage3D(target, level, internalformat, width, height, depth, border, format, type, offset)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target) of the active texture. Possible values:
    - `gl.TEXTURE_3D`: A three-dimensional texture.
    - `gl.TEXTURE_2D_ARRAY`: A two-dimensional array texture.
- `level`
    A `GLint` specifying the level of detail. Level 0 is the base image level and level _n_ is the n-th mipmap reduction level.
- `internalformat`
    A `GLenum` specifying how the texture should be stored after it's loaded.
- `width`
    A `GLsizei` specifying the width of the texture in texels.
- `height`
    A `GLsizei` specifying the height of the texture in texels.
- `depth`
    A `GLsizei` specifying the depth of the texture/the number of textures in a `TEXTURE_2D_ARRAY`.
- `border`
    A `GLint` specifying the width of the border. Must be 0.
- `format`
    A `GLenum` specifying how each integer element in the raw texel data should be interpreted as color components.
- `type`
    A `GLenum` specifying the size of each integer element in the raw texel data.

    The `internalformat`, `format`, and `type` values must be compatible with each other. For all valid combinations, see `WebGLRenderingContext.texImage2D()`.

The texture source can be provided in one of three ways: from an `ArrayBuffer` (possibly shared) using `srcData` and `srcOffset`; from a DOM pixel `source`; or from `gl.PIXEL_UNPACK_BUFFER` using `offset`.

- `srcData`
    A `TypedArray` or `DataView` containing the compressed texture data. Its type must match the `type` parameter; see `WebGLRenderingContext.texImage2D()`. When `type` is `FLOAT_32_UNSIGNED_INT_24_8_REV`, `srcData` must be `null`.
- `srcOffset` (optional)
    An integer specifying the index of `srcData` to start reading from. Defaults to `0`.
- `source`
    Read from a DOM pixel source, which can be one of:
    - `ImageBitmap`
    - `ImageData`
    - `HTMLImageElement`
    - `HTMLCanvasElement`
    - `HTMLVideoElement`
    - `OffscreenCanvas`
    - `VideoFrame`
- `offset`
    A `GLintptr` specifying the starting address in the buffer bound to `gl.PIXEL_UNPACK_BUFFER`.

### Return value

None (`undefined`).

## Examples

```js
gl.texImage3D(
  gl.TEXTURE_3D,
  0, // level
  gl.RGBA, // internalFormat
  1, // width
  1, // height
  1, // depth
  0, // border
  gl.RGBA, // format
  gl.UNSIGNED_BYTE, // type
  new Uint8Array([0xff, 0x00, 0x00, 0x00]),
); // data
```

## See also

- `WebGLRenderingContext.createTexture()`
- `WebGLRenderingContext.bindTexture()`
- `WebGL2RenderingContext.texSubImage3D()`
- `WebGL2RenderingContext.compressedTexImage3D()`
- `WebGL2RenderingContext.copyTexSubImage3D()`
- `WebGLRenderingContext.getTexParameter()`
- `WEBGL_depth_texture`
- `OES_texture_float`
- `OES_texture_half_float`
- `EXT_texture_norm16`
- `EXT_sRGB`
