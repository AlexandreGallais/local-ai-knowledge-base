---
title: "WEBGL_compressed_texture_etc1 extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_compressed_texture_etc1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_compressed_texture_etc1 extension

The **`WEBGL_compressed_texture_etc1`** extension is part of the WebGL API and exposes the ETC1 compressed texture format.

Compressed textures reduce the amount of memory needed to store a texture on the GPU, allowing for higher resolution textures or more of the same resolution textures.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is available to both, `WebGL1` and `WebGL2` contexts.

## Constants

The compressed texture format is exposed by a constant and can be used with the `compressedTexImage2D()` method (note that ETC1 is **not** supported with the `compressedTexSubImage2D()` method).

- `ext.COMPRESSED_RGB_ETC1_WEBGL`
    Compresses 24-bit RGB data with no alpha channel.

## Examples

```js
const ext = gl.getExtension("WEBGL_compressed_texture_etc1");

const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.compressedTexImage2D(
  gl.TEXTURE_2D,
  0,
  ext.COMPRESSED_RGB_ETC1_WEBGL,
  512,
  512,
  0,
  textureData,
);
```

## See also

- Ericsson Texture Compression – Wikipedia
- `WEBGL_compressed_texture_etc` (ETC2 and EAC)
- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.compressedTexImage2D()`
- `WebGLRenderingContext.getParameter()`
