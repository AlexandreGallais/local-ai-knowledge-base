---
title: "WebGLRenderingContext: createRenderbuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/createrenderbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: createRenderbuffer() method

The **`WebGLRenderingContext.createRenderbuffer()`** method of
the WebGL API creates and initializes a
`WebGLRenderbuffer` object.

## Syntax

```js
createRenderbuffer()
```

### Parameters

None.

### Return value

A `WebGLRenderbuffer` object that stores data such an image, or can be
source or target of a rendering operation.

## Examples

### Creating a render buffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const renderBuffer = gl.createRenderbuffer();
```

## See also

- `WebGLRenderingContext.bindRenderbuffer()`
- `WebGLRenderingContext.deleteRenderbuffer()`
- `WebGLRenderingContext.isRenderbuffer()`
- Other buffers: `WebGLBuffer`, `WebGLFramebuffer`
