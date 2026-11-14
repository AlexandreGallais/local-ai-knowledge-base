---
title: "WebGL2RenderingContext: texSubImage3D() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/texsubimage3d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: texSubImage3D() method

The **`texSubImage3D()`** method of the `WebGL2RenderingContext` interface of the WebGL API specifies a three-dimensional sub-rectangle for a texture image.

## Syntax

```js
texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, srcData)
texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, srcData, srcOffset)
texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, source)
texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, offset)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target) of the active texture. Possible values:
    - `gl.TEXTURE_3D`: A three-dimensional texture.
    - `gl.TEXTURE_2D_ARRAY`: A two-dimensional array texture.
- `level`
    A `GLint` specifying the level of detail. Level 0 is the base image level and level _n_ is the n-th mipmap reduction level.
- `xoffset`
    A `GLint` specifying the x offset within the texture image.
- `yoffset`
    A `GLint` specifying the y offset within the texture image.
- `zoffset`
    A `GLint` specifying the z offset within the texture image.
- `width`
    A `GLsizei` specifying the width of the texture in texels.
- `height`
    A `GLsizei` specifying the height of the texture in texels.
- `depth`
    A `GLsizei` specifying the depth of the texture/the number of textures in a `TEXTURE_2D_ARRAY`.
- `format`
    A `GLenum` specifying how each integer element in the raw texel data should be interpreted as color components.
- `type`
    A `GLenum` specifying the size of each integer element in the raw texel data. For the combinations of `format` and `type` available, see `WebGLRenderingContext.texSubImage2D()`.

The texture source can be provided in one of three ways: from an `ArrayBuffer` (possibly shared) using `srcData` and `srcOffset`; from a DOM pixel `source`; or from `gl.PIXEL_UNPACK_BUFFER` using `offset`.

- `srcData`
    A `TypedArray` or `DataView` containing the compressed texture data. Its type must match the `type` parameter; see `WebGLRenderingContext.texImage2D()`.
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
gl.texSubImage3D(
  gl.TEXTURE_3D,
  0,
  0,
  0,
  0,
  image.width,
  image.height,
  1,
  gl.RGBA,
  gl.UNSIGNED_BYTE,
  image,
);
```

## See also

- `WebGLRenderingContext.createTexture()`
- `WebGLRenderingContext.bindTexture()`
- `WebGL2RenderingContext.texImage3D()`
- `WebGL2RenderingContext.compressedTexImage3D()`
- `WebGL2RenderingContext.copyTexSubImage3D()`
- `WebGLRenderingContext.getTexParameter()`
- `OES_texture_float`
- `OES_texture_half_float`
- `EXT_sRGB`
- `EXT_texture_norm16`
