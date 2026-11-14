---
title: "WebGL2RenderingContext: compressedTexImage3D() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/compressedteximage3d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: compressedTexImage3D() method

The **`compressedTexImage3D()`** method of the `WebGL2RenderingContext` interface of the WebGL API specifies a three-dimensional texture image in a compressed format.

## Syntax

```js
compressedTexImage3D(target, level, internalformat, width, height, depth, border, imageSize, offset)

compressedTexImage3D(target, level, internalformat, width, height, depth, border, srcData)
compressedTexImage3D(target, level, internalformat, width, height, depth, border, srcData, srcOffset)
compressedTexImage3D(target, level, internalformat, width, height, depth, border, srcData, srcOffset, srcLengthOverride)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target) of the active compressed texture. Possible values:
    - `gl.TEXTURE_3D`: A three-dimensional texture.
    - `gl.TEXTURE_2D_ARRAY`: A two-dimensional array texture.
- `level`
    A `GLint` specifying the level of detail. Level 0 is the base image level and level _n_ is the n-th mipmap reduction level.
- `internalformat`
    A `GLenum` specifying the compressed image format. For a list of possible values, see `WebGLRenderingContext.compressedTexImage2D()`.
- `width`
    A `GLsizei` specifying the width of the texture in texels.
- `height`
    A `GLsizei` specifying the height of the texture in texels.
- `depth`
    A `GLsizei` specifying the depth of the texture/the number of textures in a `TEXTURE_2D_ARRAY`.
- `border`
    A `GLint` specifying the width of the border. Must be 0.

The texture source can be provided in one of two ways: from an `ArrayBuffer` (possibly shared) using `srcData`, `srcOffset`, and `srcLengthOverride`; or from `gl.PIXEL_UNPACK_BUFFER` using `imageSize` and `offset`.

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

## See also

- Using WebGL extensions
- `WebGLRenderingContext.getExtension()`
- `WebGL2RenderingContext.compressedTexSubImage3D()`
- `WebGLRenderingContext.compressedTexSubImage2D()`
- `WebGLRenderingContext.compressedTexImage2D()`
- `WEBGL_compressed_texture_s3tc`
- `WEBGL_compressed_texture_s3tc_srgb`
- `WEBGL_compressed_texture_etc`
- `WEBGL_compressed_texture_pvrtc`
- `WEBGL_compressed_texture_etc1`
- `WEBGL_compressed_texture_astc`
- `EXT_texture_compression_bptc`
- `EXT_texture_compression_rgtc`
