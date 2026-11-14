---
title: "WebGLRenderingContext: bindRenderbuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/bindrenderbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: bindRenderbuffer() method

The **`WebGLRenderingContext.bindRenderbuffer()`** method of
the WebGL API binds a given
`WebGLRenderbuffer` to a target, which must be
`gl.RENDERBUFFER`.

## Syntax

```js
bindRenderbuffer(target, renderbuffer)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target). Possible values:
    - `gl.RENDERBUFFER`
        Buffer data storage for single images in a
        renderable internal format.

- `renderbuffer`
    A `WebGLRenderbuffer` object to bind.

### Return value

None (`undefined`).

### Exceptions

A `gl.INVALID_ENUM` error is thrown if `target` is not
`gl.RENDERBUFFER`.

## Examples

### Binding a renderbuffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const renderbuffer = gl.createRenderbuffer();

gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
```

### Getting current bindings

To check the current renderbuffer binding, query the `RENDERBUFFER_BINDING`
constant.

```js
gl.getParameter(gl.RENDERBUFFER_BINDING);
```

## See also

- `WebGLRenderingContext.createRenderbuffer()`
- `WebGLRenderingContext.deleteRenderbuffer()`
- `WebGLRenderingContext.isRenderbuffer()`
- Other buffers: `WebGLBuffer`, `WebGLFramebuffer`
