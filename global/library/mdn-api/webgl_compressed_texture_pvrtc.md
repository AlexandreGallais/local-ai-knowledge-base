---
title: "WEBGL_compressed_texture_pvrtc extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_compressed_texture_pvrtc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_compressed_texture_pvrtc extension

The **`WEBGL_compressed_texture_pvrtc`** extension is part of the WebGL API and exposes four PVRTC compressed texture formats.

Compressed textures reduce the amount of memory needed to store a texture on the GPU, allowing for higher resolution textures or more of the same resolution textures.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> PVRTC is typically only available on mobile devices with PowerVR chipsets.
> It is used in all generations of the iPhone, iPod Touch and iPad and supported on certain Android devices that use a PowerVR GPU.
>
> This extension is available to both, `WebGL1` and `WebGL2` contexts.

> **Note:**
> On iOS devices, this extension is named `WEBKIT_WEBGL_compressed_texture_pvrtc`.

## Constants

The compressed texture formats are exposed by four constants and can be used in two functions: `compressedTexImage2D()` (where the `height` and `width` parameters must be powers of 2) and `compressedTexSubImage2D()` (where the height and width parameters must equal the current values of the existing texture and the `xoffset` and `yoffset` parameters must be 0).

- `ext.COMPRESSED_RGB_PVRTC_4BPPV1_IMG`
    RGB compression in 4-bit mode. One block for each 4×4 pixels.
- `ext.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG`
    RGBA compression in 4-bit mode. One block for each 4×4 pixels.
- `ext.COMPRESSED_RGB_PVRTC_2BPPV1_IMG`
    RGB compression in 2-bit mode. One block for each 8×4 pixels.
- `ext.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG`
    RGBA compression in 2-bit mode. One block for each 8×4 pixels.

## Examples

```js
const ext = gl.getExtension("WEBGL_compressed_texture_pvrtc");

const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.compressedTexImage2D(
  gl.TEXTURE_2D,
  0,
  ext.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
  512,
  512,
  0,
  textureData,
);
```

## See also

- PVRTC Texture Compression – Wikipedia
- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.compressedTexImage2D()`
- `WebGLRenderingContext.compressedTexSubImage2D()`
- `WebGLRenderingContext.getParameter()`
