---
title: "WebGL2RenderingContext: compressedTexSubImage3D() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/compressedtexsubimage3d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: compressedTexSubImage3D() method

The **`compressedTexSubImage3D()`** method of the `WebGL2RenderingContext` interface of the WebGL API specifies a three-dimensional sub-rectangle for a texture image in a compressed format.

Compressed image formats are only available via some WebGL extension.

## Syntax

```js
compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, offset)

compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, srcData)
compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, srcData, srcOffset)
compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, srcData, srcOffset, srcLengthOverride)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target) of the active compressed texture. Possible values:
    - `gl.TEXTURE_3D`: A three-dimensional texture.
    - `gl.TEXTURE_2D_ARRAY`: A two-dimensional array texture.
- `level`
    A `GLint` specifying the level of detail. Level 0 is the base image level and level _n_ is the n-th mipmap reduction level.
- `xoffset`
    A `GLint` specifying the x offset within the compressed texture image.
- `yoffset`
    A `GLint` specifying the y offset within the compressed texture image.
- `zoffset`
    A `GLint` specifying the z offset within the compressed texture image.
- `width`
    A `GLsizei` specifying the width of the compressed texture in texels.
- `height`
    A `GLsizei` specifying the height of the compressed texture in texels.
- `depth`
    A `GLsizei` specifying the depth of the texture/the number of textures in a `TEXTURE_2D_ARRAY`.
- `format`
    A `GLenum` specifying the compressed image format. For a list of possible values, see `WebGLRenderingContext.compressedTexImage2D()`.

The texture source can be provided in one of two ways: from an `ArrayBuffer` (possibly shared) using `srcData`, `srcOffset`, and `srcLengthOverride`; or, in WebGL 2, from `gl.PIXEL_UNPACK_BUFFER` using `imageSize` and `offset`.

- `srcData`
    A `TypedArray` or `DataView` containing the compressed texture data.
- `srcOffset` (optional)
    An integer specifying the index of `srcData` to start reading from. Defaults to `0`.
- `srcLengthOverride` (optional)
    An integer specifying the number of elements in `srcData` to read. Defaults to `srcData.length - srcOffset`.
- `imageSize`
    A `GLsizei` specifying the size of the image data in bytes.
- `offset`
    A `GLintptr` specifying the starting address in the buffer bound to `gl.PIXEL_UNPACK_BUFFER`.

### Return value

None (`undefined`).

## Examples

```js
gl.compressedTexSubImage3D(
  gl.TEXTURE_3D,
  0,
  0,
  0,
  512,
  512,
  512,
  gl.COMPRESSED_R11_EAC,
  textureData,
);
```

## See also

- Using WebGL extensions
- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.compressedTexSubImage2D()`
- `WebGL2RenderingContext.compressedTexImage3D()`
- `WEBGL_compressed_texture_s3tc`
- `WEBGL_compressed_texture_s3tc_srgb`
- `WEBGL_compressed_texture_etc`
- `WEBGL_compressed_texture_pvrtc`
- `WEBGL_compressed_texture_astc`
- `EXT_texture_compression_bptc`
- `EXT_texture_compression_rgtc`
