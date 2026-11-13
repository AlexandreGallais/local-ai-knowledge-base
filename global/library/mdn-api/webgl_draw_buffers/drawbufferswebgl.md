---
title: "WEBGL_draw_buffers: drawBuffersWEBGL() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_draw_buffers/drawbufferswebgl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_draw_buffers: drawBuffersWEBGL() method

The **`WEBGL_draw_buffers.drawBuffersWEBGL()`** method is part
of the WebGL API and allows you to define
the draw buffers to which all fragment colors are written.

This method is part of the `WEBGL_draw_buffers` extension.

> **Note:**
> When using `WebGL2`,
> this method is available as `gl.drawBuffers()`
> by default and the constants are named `gl.COLOR_ATTACHMENT1` etc. without the "WEBGL" suffix.

## Syntax

```js
drawBuffersWEBGL(buffers)
```

### Parameters

- `buffers`
    An `Array` of `GLenum` constants defining drawing buffers.
    Possible values:
    - `gl.NONE`: The fragment shader is not written to any color buffer.
    - `gl.BACK`: The fragment shader is written to the back color buffer.
    - `ext.COLOR_ATTACHMENT0_WEBGL` The fragment shader is written the
      n-th color attachment of the framebuffer.
    - `ext.COLOR_ATTACHMENT1_WEBGL`
    - `ext.COLOR_ATTACHMENT2_WEBGL`
    - `ext.COLOR_ATTACHMENT3_WEBGL`
    - `ext.COLOR_ATTACHMENT4_WEBGL`
    - `ext.COLOR_ATTACHMENT5_WEBGL`
    - `ext.COLOR_ATTACHMENT6_WEBGL`
    - `ext.COLOR_ATTACHMENT7_WEBGL`
    - `ext.COLOR_ATTACHMENT8_WEBGL`
    - `ext.COLOR_ATTACHMENT9_WEBGL`
    - `ext.COLOR_ATTACHMENT10_WEBGL`
    - `ext.COLOR_ATTACHMENT11_WEBGL`
    - `ext.COLOR_ATTACHMENT12_WEBGL`
    - `ext.COLOR_ATTACHMENT13_WEBGL`
    - `ext.COLOR_ATTACHMENT14_WEBGL`
    - `ext.COLOR_ATTACHMENT15_WEBGL`

### Return value

None (`undefined`).

## Examples

See `WEBGL_draw_buffers` for more context with this example code.

```js
ext.drawBuffersWEBGL([
  ext.COLOR_ATTACHMENT0_WEBGL, // gl_FragData[0]
  ext.COLOR_ATTACHMENT1_WEBGL, // gl_FragData[1]
  ext.COLOR_ATTACHMENT2_WEBGL, // gl_FragData[2]
  ext.COLOR_ATTACHMENT3_WEBGL, // gl_FragData[3]
]);
```

## See also

- `WEBGL_draw_buffers`
- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.framebufferRenderbuffer()`
- `WebGLRenderingContext.framebufferTexture2D()`
- `WebGLRenderingContext.getFramebufferAttachmentParameter()`
- `WebGLRenderingContext.getParameter()`
- WebGL deferred shading - Mozilla Hacks blog
