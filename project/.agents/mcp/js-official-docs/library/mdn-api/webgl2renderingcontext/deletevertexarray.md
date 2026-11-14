---
title: "WebGL2RenderingContext: deleteVertexArray() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/deletevertexarray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: deleteVertexArray() method

The **`WebGL2RenderingContext.deleteVertexArray()`** method of
the WebGL 2 API deletes a given
`WebGLVertexArrayObject` object.

## Syntax

```js
deleteVertexArray(vertexArray)
```

### Parameters

- `vertexArray`
    A `WebGLVertexArrayObject` (VAO) object to delete.

### Return value

None (`undefined`).

## Examples

```js
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

// …

gl.deleteVertexArray(vao);
```

## See also

- `WebGLVertexArrayObject`
