---
title: "WebGLRenderingContext: deleteBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/deletebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: deleteBuffer() method

The **`WebGLRenderingContext.deleteBuffer()`** method of the WebGL API deletes a given
`WebGLBuffer`. This method has no effect if the buffer has already been
deleted. Normally you don't need to call this method yourself, when the buffer object is dereferenced it will be marked as free.

## Syntax

```js
deleteBuffer(buffer)
```

### Parameters

- `buffer`
    A `WebGLBuffer` object to delete.

### Return value

None (`undefined`).

## Examples

### Deleting a buffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const buffer = gl.createBuffer();

// …

gl.deleteBuffer(buffer);
```

## See also

- `WebGLRenderingContext.bindBuffer()`
- `WebGLRenderingContext.createBuffer()`
- `WebGLRenderingContext.isBuffer()`
- Other buffers: `WebGLFramebuffer`, `WebGLRenderbuffer`
