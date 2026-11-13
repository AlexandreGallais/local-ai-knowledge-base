---
title: "WebGLRenderingContext: deleteRenderbuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/deleterenderbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: deleteRenderbuffer() method

The **`WebGLRenderingContext.deleteRenderbuffer()`** method of
the WebGL API deletes a given
`WebGLRenderbuffer` object. This method has no effect if the render buffer
has already been deleted.

## Syntax

```js
deleteRenderbuffer(renderbuffer)
```

### Parameters

- `renderbuffer`
    A `WebGLRenderbuffer` object to delete.

### Return value

None (`undefined`).

## Examples

### Deleting a renderbuffer

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const renderbuffer = gl.createRenderbuffer();

// …

gl.deleteRenderbuffer(renderbuffer);
```

## See also

- `WebGLRenderingContext.bindRenderbuffer()`
- `WebGLRenderingContext.createRenderbuffer()`
- `WebGLRenderingContext.isRenderbuffer()`
- Other buffers: `WebGLBuffer`, `WebGLFramebuffer`
