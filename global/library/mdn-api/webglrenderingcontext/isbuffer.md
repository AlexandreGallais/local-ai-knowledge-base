---
title: "WebGLRenderingContext: isBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/isbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: isBuffer() method

The **`WebGLRenderingContext.isBuffer()`** method of the WebGL API returns `true` if the
passed `WebGLBuffer` is valid and `false` otherwise.

## Syntax

```js
isBuffer(buffer)
```

### Parameters

- `buffer`
    A `WebGLBuffer` to check.

### Return value

A `GLboolean` indicating whether or not the buffer is valid.

## Examples

### Creating a buffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const buffer = gl.createBuffer();

gl.isBuffer(buffer);
```

## See also

- `WebGLRenderingContext.bindBuffer()`
- `WebGLRenderingContext.createBuffer()`
- `WebGLRenderingContext.deleteBuffer()`
- Other buffers: `WebGLFramebuffer`, `WebGLRenderbuffer`
