---
title: "WebGLRenderingContext: createBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/createbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: createBuffer() method

The **`WebGLRenderingContext.createBuffer()`** method of the WebGL API creates and initializes a
`WebGLBuffer` storing data such as vertices or colors.

## Syntax

```js
createBuffer()
```

### Parameters

None.

### Return value

A `WebGLBuffer` storing data such as vertices or colors.

## Examples

### Creating a buffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const buffer = gl.createBuffer();
```

## See also

- `WebGLRenderingContext.bindBuffer()`
- `WebGLRenderingContext.deleteBuffer()`
- `WebGLRenderingContext.isBuffer()`
- Other buffers: `WebGLFramebuffer`, `WebGLRenderbuffer`
