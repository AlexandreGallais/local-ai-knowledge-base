---
title: "WebGLRenderingContext: compressedTexImage2D() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/compressedteximage2d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: compressedTexImage2D() method

The **`compressedTexImage2D()`** method of the `WebGLRenderingContext` interface of the WebGL API specifies a two-dimensional texture image in a compressed format.

Compressed image formats are only available via the `WebGL2RenderingContext` or some WebGL extension.

## Syntax

```js
// WebGL 1:
compressedTexImage2D(target, level, internalformat, width, height, border, srcData)

// Additionally available in WebGL 2:
compressedTexImage2D(target, level, internalformat, width, height, border, srcData, srcOffset)
compressedTexImage2D(target, level, internalformat, width, height, border, srcData, srcOffset, srcLengthOverride)
compressedTexImage2D(target, level, internalformat, width, height, border, imageSize, offset)
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
- `internalformat`
    A `GLenum` specifying the compressed image format. Compressed image formats are only available via the `WebGL2RenderingContext` or some WebGL extension. Possible values:
    - When using `WebGL2RenderingContext`:
      - `gl.GL_COMPRESSED_R11_EAC`
      - `gl.GL_COMPRESSED_SIGNED_R11_EAC`
      - `gl.GL_COMPRESSED_RG11_EAC`
      - `gl.GL_COMPRESSED_SIGNED_RG11_EAC`
      - `gl.GL_COMPRESSED_RGB8_ETC2`
      - `gl.GL_COMPRESSED_SRGB8_ETC2`
      - `gl.GL_COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2`
      - `gl.GL_COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2`
      - `gl.GL_COMPRESSED_RGBA8_ETC2_EAC`
      - `gl.GL_COMPRESSED_SRGB8_ALPHA8_ETC2_EAC`

    - When using the `WEBGL_compressed_texture_s3tc` extension:
      - `ext.COMPRESSED_RGB_S3TC_DXT1_EXT`
      - `ext.COMPRESSED_RGBA_S3TC_DXT1_EXT`
      - `ext.COMPRESSED_RGBA_S3TC_DXT3_EXT`
      - `ext.COMPRESSED_RGBA_S3TC_DXT5_EXT`

    - When using the `WEBGL_compressed_texture_s3tc_srgb` extension:
      - `ext.COMPRESSED_SRGB_S3TC_DXT1_EXT`
      - `ext.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT`
      - `ext.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT`
      - `ext.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT`

    - When using the `WEBGL_compressed_texture_etc` extension:
      - `ext.COMPRESSED_R11_EAC`
      - `ext.COMPRESSED_SIGNED_R11_EAC`
      - `ext.COMPRESSED_RG11_EAC`
      - `ext.COMPRESSED_SIGNED_RG11_EAC`
      - `ext.COMPRESSED_RGB8_ETC2`
      - `ext.COMPRESSED_RGBA8_ETC2_EAC`
      - `ext.COMPRESSED_SRGB8_ETC2`
      - `ext.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC`
      - `ext.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2`
      - `ext.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2`

    - When using the `WEBGL_compressed_texture_pvrtc` extension:
      - `ext.COMPRESSED_RGB_PVRTC_4BPPV1_IMG`
      - `ext.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG`
      - `ext.COMPRESSED_RGB_PVRTC_2BPPV1_IMG`
      - `ext.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG`

    - When using the `WEBGL_compressed_texture_etc1` extension:
      - `ext.COMPRESSED_RGB_ETC1_WEBGL`

    - When using the `WEBGL_compressed_texture_astc` extension:
      - `ext.COMPRESSED_RGBA_ASTC_4x4_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR`
      - `ext.COMPRESSED_RGBA_ASTC_5x4_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR`
      - `ext.COMPRESSED_RGBA_ASTC_5x5_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR`
      - `ext.COMPRESSED_RGBA_ASTC_6x5_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR`
      - `ext.COMPRESSED_RGBA_ASTC_6x6_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR`
      - `ext.COMPRESSED_RGBA_ASTC_8x5_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR`
      - `ext.COMPRESSED_RGBA_ASTC_8x6_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR`
      - `ext.COMPRESSED_RGBA_ASTC_8x8_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR`
      - `ext.COMPRESSED_RGBA_ASTC_10x5_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR`
      - `ext.COMPRESSED_RGBA_ASTC_10x6_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR`
      - `ext.COMPRESSED_RGBA_ASTC_10x6_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR`
      - `ext.COMPRESSED_RGBA_ASTC_10x10_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR`
      - `ext.COMPRESSED_RGBA_ASTC_12x10_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR`
      - `ext.COMPRESSED_RGBA_ASTC_12x12_KHR`, `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR`

    - When using the `EXT_texture_compression_bptc` extension:
      - `ext.COMPRESSED_RGBA_BPTC_UNORM_EXT`
      - `ext.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT`
      - `ext.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT`
      - `ext.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT`

    - When using the `EXT_texture_compression_rgtc` extension:
      - `ext.COMPRESSED_RED_RGTC1_EXT`
      - `ext.COMPRESSED_SIGNED_RED_RGTC1_EXT`
      - `ext.COMPRESSED_RED_GREEN_RGTC2_EXT`
      - `ext.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT`

- `width`
    A `GLsizei` specifying the width of the texture in texels.
- `height`
    A `GLsizei` specifying the height of the texture in texels.
- `depth`
    A `GLsizei` specifying the depth of the texture/the number of textures in a `TEXTURE_2D_ARRAY`.
- `border`
    A `GLint` specifying the width of the border. Must be 0.

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

const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.compressedTexImage2D(
  gl.TEXTURE_2D,
  0,
  ext.COMPRESSED_RGBA_S3TC_DXT5_EXT,
  512,
  512,
  0,
  textureData,
);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
```

## See also

- Using WebGL extensions
- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.compressedTexSubImage2D()`
- `WebGL2RenderingContext.compressedTexSubImage3D()`
- `WebGL2RenderingContext.compressedTexImage3D()`
- `WEBGL_compressed_texture_s3tc`
- `WEBGL_compressed_texture_s3tc_srgb`
- `WEBGL_compressed_texture_etc`
- `WEBGL_compressed_texture_pvrtc`
- `WEBGL_compressed_texture_etc1`
- `WEBGL_compressed_texture_astc`
- `EXT_texture_compression_bptc`
- `EXT_texture_compression_rgtc`
