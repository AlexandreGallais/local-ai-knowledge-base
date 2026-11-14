---
title: "WebGLVertexArrayObject"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglvertexarrayobject/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLVertexArrayObject

The **`WebGLVertexArrayObject`** interface is part of the WebGL 2 API, represents vertex array objects (VAOs) pointing to vertex array data, and provides names for different sets of vertex data.

When working with `WebGLVertexArrayObject` objects, the following methods are useful:

- `WebGL2RenderingContext.createVertexArray()`
- `WebGL2RenderingContext.deleteVertexArray()`
- `WebGL2RenderingContext.isVertexArray()`
- `WebGL2RenderingContext.bindVertexArray()`

> **Note:**
> The `OES_vertex_array_object` extension allows you to use vertex array objects in a WebGL 1 context.

## Examples

```js
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

// …

// calls to bindBuffer or vertexAttribPointer
// which will be "recorded" in the VAO

// …
```

## See also

- `OES_vertex_array_object`
