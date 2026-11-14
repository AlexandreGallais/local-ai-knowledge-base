---
title: "WEBGL_compressed_texture_s3tc extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_compressed_texture_s3tc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_compressed_texture_s3tc extension

The **`WEBGL_compressed_texture_s3tc`** extension is part of the WebGL API and exposes four S3TC compressed texture formats.

Compressed textures reduce the amount of memory needed to store a texture on the GPU, allowing for higher resolution textures or more of the same resolution textures.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is available to both, `WebGL1` and `WebGL2` contexts.

## Constants

The compressed texture formats are exposed by four constants and can be used in two functions: `compressedTexImage2D()` and `compressedTexSubImage2D()`.

- `ext.COMPRESSED_RGB_S3TC_DXT1_EXT`
    A DXT1-compressed image in an RGB image format.
- `ext.COMPRESSED_RGBA_S3TC_DXT1_EXT`
    A DXT1-compressed image in an RGB image format with an on/off alpha value.
- `ext.COMPRESSED_RGBA_S3TC_DXT3_EXT`
    A DXT3-compressed image in an RGBA image format. Compared to a 32-bit RGBA texture, it offers 4:1 compression.
- `ext.COMPRESSED_RGBA_S3TC_DXT5_EXT`
    A DXT5-compressed image in an RGBA image format. It also provides a 4:1 compression, but differs to the DXT3 compression in how the alpha compression is done.

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

- S3 Texture Compression – OpenGL wiki
- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.compressedTexImage2D()`
- `WebGLRenderingContext.compressedTexSubImage2D()`
- `WebGLRenderingContext.getParameter()`
