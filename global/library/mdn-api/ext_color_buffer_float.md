---
title: "EXT_color_buffer_float extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_color_buffer_float/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_color_buffer_float extension

The **`EXT_color_buffer_float`** extension is part of WebGL and adds the ability to render a variety of floating point formats.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is available to `WebGL 2` contexts only.
>
> For `WebGL 1`, see the `EXT_color_buffer_half_float` and `WEBGL_color_buffer_float` extensions.

## Extended methods

The following sized formats become **color-renderable**:

- `gl.R16F`,
- `gl.RG16F`,
- `gl.RGBA16F`,
- `gl.R32F`,
- `gl.RG32F`,
- `gl.RGBA32F`,
- `gl.R11F_G11F_B10F`.

**Color-renderable** means:

- The `WebGLRenderingContext.renderbufferStorage()` method now accepts these formats.
- Framebuffers with attached textures of these formats may now be **FRAMEBUFFER_COMPLETE**.

## Examples

`gl` must be a `WebGL2RenderingContext`. This extension does not work in WebGL 1 contexts.

```js
const ext = gl.getExtension("EXT_color_buffer_float");

gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA16F, 256, 256);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.renderbufferStorage()`
- `EXT_color_buffer_half_float`
- `WEBGL_color_buffer_float`
