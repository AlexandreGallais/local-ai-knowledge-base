---
title: "WebGLRenderingContext: isRenderbuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/isrenderbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: isRenderbuffer() method

The **`WebGLRenderingContext.isRenderbuffer()`** method of the
WebGL API returns `true` if the
passed `WebGLRenderbuffer` is valid and `false` otherwise.

## Syntax

```js
isRenderbuffer(renderbuffer)
```

### Parameters

- `renderbuffer`
    A `WebGLRenderbuffer` to check.

### Return value

A `GLboolean` indicating whether or not the renderbuffer is valid.

## Examples

### Checking a renderbuffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const renderbuffer = gl.createRenderbuffer();

gl.isRenderbuffer(renderbuffer);
```

## See also

- `WebGLRenderingContext.bindRenderbuffer()`
- `WebGLRenderingContext.createRenderbuffer()`
- `WebGLRenderingContext.deleteRenderbuffer()`
- Other buffers: `WebGLBuffer`, `WebGLFramebuffer`
