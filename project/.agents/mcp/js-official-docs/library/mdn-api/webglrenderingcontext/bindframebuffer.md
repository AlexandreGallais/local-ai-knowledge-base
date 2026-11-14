---
title: "WebGLRenderingContext: bindFramebuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/bindframebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: bindFramebuffer() method

The **`WebGLRenderingContext.bindFramebuffer()`** method of the
WebGL API binds to the specified target the provided `WebGLFramebuffer`, or, if the `framebuffer` argument is null, the default `WebGLFramebuffer`, which is associated with the canvas rendering context.

## Syntax

```js
bindFramebuffer(target, framebuffer)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target). Possible values:
    - `gl.FRAMEBUFFER`
        Collection buffer data storage of color, alpha,
        depth and stencil buffers used as both a destination for drawing and as a source for reading (see below).

    When using a `WebGL 2 context`,
    the following values are available additionally:
    - `gl.DRAW_FRAMEBUFFER`
        Used as a destination for drawing operations such as `gl.draw*`, `gl.clear*` and `gl.blitFramebuffer`.
    - `gl.READ_FRAMEBUFFER`
        Used as a source for reading operations such as `gl.readPixels` and `gl.blitFramebuffer`.

- `framebuffer`
    A `WebGLFramebuffer` object to bind, or `null` for binding the `HTMLCanvasElement` or `OffscreenCanvas` object associated with the rendering context.

### Return value

None (`undefined`).

### Exceptions

A `gl.INVALID_ENUM` error is thrown if `target` is not
`gl.FRAMEBUFFER`, `gl.DRAW_FRAMEBUFFER`, or
`gl.READ_FRAMEBUFFER`.

## Examples

### Binding a frame buffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const framebuffer = gl.createFramebuffer();

gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
```

### Getting current bindings

To check the current frame buffer binding, query the `FRAMEBUFFER_BINDING`
constant.

```js
gl.getParameter(gl.FRAMEBUFFER_BINDING);
```

## See also

- `WebGLRenderingContext.createFramebuffer()`
- `WebGLRenderingContext.deleteFramebuffer()`
- `WebGLRenderingContext.isFramebuffer()`
- Other buffers: `WebGLBuffer`, `WebGLRenderbuffer`
