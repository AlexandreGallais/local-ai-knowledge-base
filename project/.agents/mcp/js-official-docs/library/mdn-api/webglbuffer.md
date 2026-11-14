---
title: "WebGLBuffer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLBuffer

The **WebGLBuffer** interface is part of the WebGL API and represents an opaque buffer object storing data such as vertices or colors.

## Description

The `WebGLBuffer` object does not define any methods or properties of its own and its content is not directly accessible. When working with `WebGLBuffer` objects, the following methods of the `WebGLRenderingContext` are useful:

- `WebGLRenderingContext.bindBuffer()`
- `WebGLRenderingContext.createBuffer()`
- `WebGLRenderingContext.deleteBuffer()`
- `WebGLRenderingContext.isBuffer()`

## Examples

### Creating a buffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const buffer = gl.createBuffer();
```

## See also

- `WebGLRenderingContext.bindBuffer()`
- `WebGLRenderingContext.createBuffer()`
- `WebGLRenderingContext.deleteBuffer()`
- `WebGLRenderingContext.isBuffer()`
- Other buffers: `WebGLFramebuffer`, `WebGLRenderbuffer`
