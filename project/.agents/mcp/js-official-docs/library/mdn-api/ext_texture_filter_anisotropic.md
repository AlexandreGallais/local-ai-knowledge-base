---
title: "EXT_texture_filter_anisotropic extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_texture_filter_anisotropic/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_texture_filter_anisotropic extension

The **`EXT_texture_filter_anisotropic`** extension is part of the WebGL API and exposes two constants for anisotropic filtering (AF).

AF improves the quality of mipmapped texture access when viewing a textured primitive at an oblique angle. Using just mipmapping, these lookups have a tendency to average to gray.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is available to both, `WebGL1` and `WebGL2` contexts.

## Constants

- `ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT`
    This is the `pname` argument to the `gl.getParameter()` call, and it returns the maximum available anisotropy.
- `ext.TEXTURE_MAX_ANISOTROPY_EXT`
    This is the `pname` argument to the `gl.getTexParameter()` and `gl.texParameterf()` / `gl.texParameteri()` calls and sets the desired maximum anisotropy for a texture.

## Examples

```js
const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
const ext =
  gl.getExtension("EXT_texture_filter_anisotropic") ||
  gl.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
  gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
if (ext) {
  const max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
  gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
}
```

## See also

- `WebGLRenderingContext.getExtension()`
