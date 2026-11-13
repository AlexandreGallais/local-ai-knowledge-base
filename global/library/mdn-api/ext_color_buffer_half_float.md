---
title: "EXT_color_buffer_half_float extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_color_buffer_half_float/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_color_buffer_half_float extension

The **`EXT_color_buffer_half_float`** extension is part of the WebGL API and adds the ability to render to 16-bit floating-point color buffers.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is available to both, `WebGL1` and `WebGL2` contexts. On WebGL 2, it's an alternative to using the `EXT_color_buffer_float` extension on platforms that support 16-bit floating point render targets but not 32-bit floating point render targets.
>
> The `OES_texture_half_float` extension implicitly enables this extension.

## Constants

- `ext.RGBA16F_EXT`
    RGBA 16-bit floating-point color-renderable format.
- `ext.RGB16F_EXT`
    RGB 16-bit floating-point format. In WebGL 1.0, this may be color-renderable (implementation-dependent). In WebGL 2.0, this format is not color-renderable.
- `ext.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT`
    Passed to `WebGLRenderingContext.getFramebufferAttachmentParameter()` to get the framebuffer type.
- `ext.UNSIGNED_NORMALIZED_EXT`
    The framebuffer contains unsigned fixed-point components.

## Extended methods

This extension extends `WebGLRenderingContext.renderbufferStorage()`:

- In WebGL 1.0 contexts, the `internalFormat` parameter now accepts `ext.RGBA16F_EXT` and `ext.RGB16F_EXT`. However, `ext.RGB16F_EXT` support is optional and applications must check framebuffer completeness to determine if it's supported.
- In WebGL 2.0 contexts, the `internalFormat` parameter now accepts `ext.RGBA16F_EXT`. The `RGB16F` format is not color-renderable in WebGL 2.0.

It extends `WebGLRenderingContext.getFramebufferAttachmentParameter()`:

- In WebGL 1.0 contexts, the `pname` parameter now accepts `ext.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT`. An `INVALID_OPERATION` error is generated if `attachment` is `DEPTH_STENCIL_ATTACHMENT` and `pname` is `FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT`. When `pname` is `ext.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT`, `getFramebufferAttachmentParameter()` returns either `gl.FLOAT` or `gl.UNSIGNED_NORMALIZED_EXT` for floating-point or unsigned fixed-point components respectively.

## Examples

```js
const ext = gl.getExtension("EXT_color_buffer_half_float");

gl.renderbufferStorage(gl.RENDERBUFFER, ext.RGBA16F_EXT, 256, 256);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.renderbufferStorage()`
- `OES_texture_half_float`
