---
title: "EXT_texture_compression_bptc extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_texture_compression_bptc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_texture_compression_bptc extension

The `EXT_texture_compression_bptc` extension is part of the WebGL API and exposes 4 BPTC compressed texture formats. These compression formats are called BC7 and BC6H in Microsoft's DirectX API.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> Support depends on the system's graphics driver. There is no support on Windows.
>
> This extension is available to both, `WebGL1` and `WebGL2` contexts.

## Constants

The compressed texture formats are exposed by 4 constants and can be used in two functions: `compressedTexImage2D()` and `compressedTexSubImage2D()`.

- `ext.COMPRESSED_RGBA_BPTC_UNORM_EXT`
    Compresses 8-bit fixed-point data. Each 4x4 block of texels consists of 128 bits of RGBA or image data. See also BC7 format.
- `ext.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT`
    Compresses 8-bit fixed-point data. Each 4x4 block of texels consists of 128 bits of SRGB_ALPHA or image data. See also BC7 format.
- `ext.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT`
    Compresses high dynamic range signed floating point values. Each 4x4 block of texels consists of 128 bits of RGB data. It only contains RGB data, so the returned alpha value is 1.0. See also BC6H format.
- `ext.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT`
    Compresses high dynamic range unsigned floating point values. Each 4x4 block of texels consists of 128 bits of RGB data. It only contains RGB data, so the returned alpha value is 1.0. See also BC6H format.

## Examples

```js
const ext = gl.getExtension("EXT_texture_compression_bptc");

const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.compressedTexImage2D(
  gl.TEXTURE_2D,
  0,
  ext.COMPRESSED_RGBA_BPTC_UNORM_EXT,
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
