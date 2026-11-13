---
title: "WebGLRenderingContext: compressedTexSubImage2D() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/compressedtexsubimage2d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: compressedTexSubImage2D() method

The **`compressedTexSubImage2D()`** method of the `WebGLRenderingContext` interface of the WebGL API specifies a two-dimensional sub-rectangle for a texture image in a compressed format.

Compressed image formats are only available via the `WebGL2RenderingContext` or some WebGL extension.

## Syntax

```js
// WebGL 1:
compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, srcData)

// Additionally available in WebGL 2:
compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, srcData, srcOffset)
compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, srcData, srcOffset, srcLengthOverride)
compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, offset)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target) of the active compressed texture. Possible values:
    - `gl.TEXTURE_2D`: A two-dimensional texture.
    - `gl.TEXTURE_CUBE_MAP_POSITIVE_X`: Positive X face for a cube-mapped texture.
    - `gl.TEXTURE_CUBE_MAP_NEGATIVE_X`: Negative X face for a cube-mapped texture.
    - `gl.TEXTURE_CUBE_MAP_POSITIVE_Y`: Positive Y face for a cube-mapped texture.
    - `gl.TEXTURE_CUBE_MAP_NEGATIVE_Y`: Negative Y face for a cube-mapped texture.
    - `gl.TEXTURE_CUBE_MAP_POSITIVE_Z`: Positive Z face for a cube-mapped texture.
    - `gl.TEXTURE_CUBE_MAP_NEGATIVE_Z`: Negative Z face for a cube-mapped texture.
- `level`
    A `GLint` specifying the level of detail. Level 0 is the base image level and level _n_ is the n-th mipmap reduction level.
- `xoffset`
    A `GLint` specifying the horizontal offset within the compressed texture image.
- `yoffset`
    A `GLint` specifying the vertical offset within the compressed texture image.
- `width`
    A `GLsizei` specifying the width of the compressed texture.
- `height`
    A `GLsizei` specifying the height of the compressed texture.
- `format`
    A `GLenum` specifying the compressed image format. For a list of possible values, see `WebGLRenderingContext.compressedTexImage2D()`.

The texture source can be provided in one of two ways: from an `ArrayBuffer` (possibly shared) using `srcData`, `srcOffset`, and `srcLengthOverride`; or, in WebGL 2, from `gl.PIXEL_UNPACK_BUFFER` using `imageSize` and `offset`.

- `srcData`
    A `TypedArray` or `DataView` containing the compressed texture data.
- `srcOffset` (optional)
    (WebGL 2 only) An integer specifying the index of `srcData` to start reading from. Defaults to `0`.
- `srcLengthOverride` (optional)
    (WebGL 2 only) An integer specifying the number of elements in `srcData` to read. Defaults to `srcData.length - srcOffset`.
- `imageSize`
    (WebGL 2 only) A `GLsizei` specifying the size of the image data in bytes.
- `offset`
    (WebGL 2 only) A `GLintptr` specifying the starting address in the buffer bound to `gl.PIXEL_UNPACK_BUFFER`.

### Return value

None (`undefined`).

## Examples

```js
const ext =
  gl.getExtension("WEBGL_compressed_texture_s3tc") ||
  gl.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
  gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
gl.compressedTexSubImage2D(
  gl.TEXTURE_2D,
  0,
  256,
  256,
  512,
  512,
  ext.COMPRESSED_RGBA_S3TC_DXT5_EXT,
  textureData,
);
```

## See also

- Using WebGL extensions
- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.compressedTexImage2D()`
- `WebGL2RenderingContext.compressedTexSubImage3D()`
- `WebGL2RenderingContext.compressedTexImage3D()`
- `WEBGL_compressed_texture_s3tc`
- `WEBGL_compressed_texture_s3tc_srgb`
- `WEBGL_compressed_texture_etc`
- `WEBGL_compressed_texture_pvrtc`
- `WEBGL_compressed_texture_astc`
- `EXT_texture_compression_bptc`
- `EXT_texture_compression_rgtc`
