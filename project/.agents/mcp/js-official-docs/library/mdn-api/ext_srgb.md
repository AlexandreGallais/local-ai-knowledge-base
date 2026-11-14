---
title: "EXT_sRGB extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_srgb/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_sRGB extension

The **`EXT_sRGB`** extension is part of the WebGL API and adds sRGB support to textures and framebuffer objects.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is only available to `WebGL1` contexts. In `WebGL2`, the functionality of this extension is available on the WebGL2 context by default. The constants in WebGL2 are: `gl.SRGB`, `gl.SRGB8`, `gl.SRGB8_ALPHA8` and `gl.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING`.

## Constants

This extension exposes the following constants, which can be used in the `texImage2D()`, `texSubImage2D()`, `renderbufferStorage()` and `getFramebufferAttachmentParameter()` methods.

- `ext.SRGB_EXT`
    Unsized sRGB format that leaves the precision up to the driver.
- `ext.SRGB_ALPHA_EXT`
    Unsized sRGB format with unsized alpha component.
- `ext.SRGB8_ALPHA8_EXT`
    Sized (8-bit) sRGB and alpha formats.
- `ext.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT`
    Returns the framebuffer color encoding (`gl.LINEAR` or `ext.SRGB_EXT`).

## Examples

```js
const ext = gl.getExtension("EXT_sRGB");

const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.texImage2D(
  gl.TEXTURE_2D,
  0,
  ext.SRGB_EXT,
  512,
  512,
  0,
  ext.SRGB_EXT,
  gl.UNSIGNED_BYTE,
  image,
);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.texImage2D()`
- `WebGLRenderingContext.texSubImage2D()`
- `WebGLRenderingContext.renderbufferStorage()`
- `WebGLRenderingContext.getFramebufferAttachmentParameter()`
