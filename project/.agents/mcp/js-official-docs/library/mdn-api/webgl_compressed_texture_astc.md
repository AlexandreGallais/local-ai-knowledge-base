---
title: "WEBGL_compressed_texture_astc extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_compressed_texture_astc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_compressed_texture_astc extension

The **`WEBGL_compressed_texture_astc`** extension is part of the WebGL API and exposes Adaptive Scalable Texture Compression (ASTC) compressed texture formats to WebGL.

For more information, see the article Using ASTC Texture Compression for Game Assets by NVIDIA.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> ASTC compression is typically available on Mali ARM GPUs, Intel GPUs, and NVIDIA Tegra chips.
>
> This extension is available to both, `WebGL1` and `WebGL2` contexts.

## Constants

The compressed texture formats are exposed by 28 constants and can be used in two functions: `compressedTexImage2D()` and `compressedTexSubImage2D()`.

       | Constants
       | Blocks
       | Bits per pixel
       | `ArrayBuffer` `byteLength`
       | bytes if height and width are 512

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_4x4_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR</code
        >

       | 4x4
       | 8.00
       |
        `floor((width + 3) / 4) * floor((height + 3) / 4) * 16`

       | 262144

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_5x4_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR</code
        >

       | 5x4
       | 6.40
       |
        `floor((width + 4) / 5) * floor((height + 3) / 4) * 16`

       | 210944

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_5x5_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR</code
        >

       | 5x5
       | 5.12
       |
        `floor((width + 4) / 5) * floor((height + 4) / 5) * 16`

       | 169744

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_6x5_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR</code
        >

       | 6x5
       | 4.27
       |
        `floor((width + 5) / 6) * floor((height + 4) / 5) * 16`

       | 141728

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_6x6_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR</code
        >

       | 6x6
       | 3.56
       |
        `floor((width + 5) / 6) * floor((height + 5) / 6) * 16`

       | 118336

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_8x5_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR</code
        >

       | 8x5
       | 3.20
       |
        `floor((width + 7) / 8) * floor((height + 4) / 5) * 16`

       | 105472

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_8x6_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR</code
        >

       | 8x6
       | 2.67
       |
        `floor((width + 7) / 8) * floor((height + 5) / 6) * 16`

       | 88064

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_8x8_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR</code
        >

       | 8x8
       | 2.00
       |
        `floor((width + 7) / 8) * floor((height + 7) / 8) * 16`

       | 65536

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_10x5_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR</code
        >

       | 10x5
       | 2.56
       |
        `floor((width + 9) / 10) * floor((height + 4) / 5) * 16`

       | 85696

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_10x6_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR</code
        >

       | 10x6
       | 2.13
       |
        `floor((width + 9) / 10) * floor((height + 5) / 6) * 16`

       | 71552

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_10x8_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR</code
        >

       | 10x8
       | 1.60
       |
        `floor((width + 9) / 10) * floor((height + 7) / 8) * 16`

       | 53248

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_10x10_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR</code
        >

       | 10x10
       | 1.28
       |
        `floor((width + 9) / 10) * floor((height + 9) / 10) * 16`

       | 43264

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_12x10_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR</code
        >

       | 12x10
       | 1.07
       |
        `floor((width + 11) / 12) * floor((height + 9) / 10) * 16`

       | 35776

       |
        <code
          >ext.COMPRESSED_RGBA_ASTC_12x12_KHRext.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR</code
        >

       | 12x12
       | 0.89
       |
        `floor((width + 11) / 12) * floor((height + 11) / 12) * 16`

       | 29584

## Instance methods

This extension exposes one new method.

- `ext.getSupportedProfiles()`
    Returns an array of strings containing the names of the ASTC profiles supported by the implementation.

## Examples

```js
const ext = gl.getExtension("WEBGL_compressed_texture_astc");

const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.compressedTexImage2D(
  gl.TEXTURE_2D,
  0,
  ext.COMPRESSED_RGBA_ASTC_12x12_KHR,
  512,
  512,
  0,
  textureData,
);
```

## See also

- Using ASTC Texture Compression for Game Assets
- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.compressedTexImage2D()`
- `WebGLRenderingContext.compressedTexSubImage2D()`
- `WebGLRenderingContext.getParameter()`
