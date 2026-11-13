---
title: "WEBGL_color_buffer_float extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_color_buffer_float/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_color_buffer_float extension

The **`WEBGL_color_buffer_float`** extension is part of the WebGL API and adds the ability to render to 32-bit floating-point color buffers.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is available to `WebGL 1` contexts only. For `WebGL 2`, use the `EXT_color_buffer_float` extension.
>
> The `OES_texture_float` extension implicitly enables this extension.

## Constants

- `ext.RGBA32F_EXT`
    RGBA 32-bit floating-point color-renderable format.
- `ext.RGB32F_EXT` ((deprecated))
    RGB 32-bit floating-point color-renderable format.
- `ext.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT`
    ?
- `ext.UNSIGNED_NORMALIZED_EXT`
    ?

## Extended methods

This extension extends `WebGLRenderingContext.renderbufferStorage()`:

- The `internalformat` parameter now accepts `ext.RGBA32F_EXT` and `ext.RGB32F_EXT` ((deprecated)).

## Examples

```js
const ext = gl.getExtension("WEBGL_color_buffer_float");

gl.renderbufferStorage(gl.RENDERBUFFER, ext.RGBA32F_EXT, 256, 256);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.renderbufferStorage()`
- `OES_texture_float`
