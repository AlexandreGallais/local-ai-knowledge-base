---
title: "EXT_texture_compression_rgtc extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_texture_compression_rgtc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_texture_compression_rgtc extension

The `EXT_texture_compression_rgtc` extension is part of the WebGL API and exposes 4 RGTC compressed texture formats. RGTC is a block-based texture compression format suited for unsigned and signed red and red-green textures (**R**ed-**G**reen **T**exture **C**ompression).

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> Support depends on the system's graphics driver. There is no support on Windows.
>
> This extension is available to both, `WebGL1` and `WebGL2` contexts.

## Constants

The compressed texture formats are exposed by 4 constants and can be used in two functions: `compressedTexImage2D()` and `compressedTexSubImage2D()`.

- `ext.COMPRESSED_RED_RGTC1_EXT`
    Each 4x4 block of texels consists of 64 bits of unsigned red image data. See also BC4 unsigned.
- `ext.COMPRESSED_SIGNED_RED_RGTC1_EXT`
    Each 4x4 block of texels consists of 64 bits of signed red image data. See also BC4 signed.
- `ext.COMPRESSED_RED_GREEN_RGTC2_EXT`
    Each 4x4 block of texels consists of 64 bits of compressed unsigned red image data followed by 64 bits of compressed unsigned green image data. See also BC5 unsigned.
- `ext.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT`
    Each 4x4 block of texels consists of 64 bits of compressed signed red image data followed by 64 bits of compressed signed green image data. See also BC5 signed.

## Examples

```js
const ext = gl.getExtension("EXT_texture_compression_rgtc");

const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.compressedTexImage2D(
  gl.TEXTURE_2D,
  0,
  ext.COMPRESSED_RED_RGTC1_EXT,
  128,
  128,
  0,
  textureData,
);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.compressedTexImage2D()`
- `WebGLRenderingContext.compressedTexSubImage2D()`
- `WebGLRenderingContext.getParameter()`
