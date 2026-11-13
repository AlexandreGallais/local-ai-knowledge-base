---
title: "WEBGL_depth_texture extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_depth_texture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_depth_texture extension

The **`WEBGL_depth_texture`** extension is part of the WebGL API and defines 2D depth and depth-stencil textures.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is only available to `WebGL1` contexts. In `WebGL2`, the functionality of this extension is available on the WebGL2 context by default. The constant in WebGL2 is `gl.UNSIGNED_INT_24_8`.

## Constants

This extension adds a new constant:

- `ext.UNSIGNED_INT_24_8_WEBGL`
    Unsigned integer type for 24-bit depth texture data.

## Extended methods

This extension extends `WebGLRenderingContext.texImage2D()`:

- The `format` and `internalformat` parameters now accept `gl.DEPTH_COMPONENT` and `gl.DEPTH_STENCIL`.
- The `type` parameter now accepts `gl.UNSIGNED_SHORT`, `gl.UNSIGNED_INT`, and `ext.UNSIGNED_INT_24_8_WEBGL`.
- The `pixels` parameter now accepts a `Uint16Array` or a `Uint32Array` object.

This extension extends `WebGLRenderingContext.framebufferTexture2D()`:

- The `attachment` parameter now accepts `gl.DEPTH_STENCIL_ATTACHMENT`.

## Examples

```js
const ext = gl.getExtension("WEBGL_depth_texture");

gl.texImage2D(
  gl.TEXTURE_2D,
  0,
  gl.DEPTH_COMPONENT,
  512,
  512,
  0,
  gl.DEPTH_COMPONENT,
  gl.UNSIGNED_SHORT,
  null,
);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.texImage2D()`
- `WebGLRenderingContext.framebufferTexture2D()`
