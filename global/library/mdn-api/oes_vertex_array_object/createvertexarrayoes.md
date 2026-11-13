---
title: "OES_vertex_array_object: createVertexArrayOES() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oes_vertex_array_object/createvertexarrayoes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OES_vertex_array_object: createVertexArrayOES() method

The **`OES_vertex_array_object.createVertexArrayOES()`** method
of the WebGL API creates and initializes a
`WebGLVertexArrayObject` object that represents a vertex array object (VAO)
pointing to vertex array data and which provides names for different sets of vertex
data.

## Syntax

```js
createVertexArrayOES()
```

### Parameters

None.

### Return value

A `WebGLVertexArrayObject` representing a vertex array object (VAO) which
points to vertex array data.

## Examples

```js
const ext = gl.getExtension("OES_vertex_array_object");
const vao = ext.createVertexArrayOES();
ext.bindVertexArrayOES(vao);

// …
// calls to bindBuffer or vertexAttribPointer
// which will be "recorded" in the VAO
// …
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.vertexAttribPointer()`
- WebGL2 equivalent: `WebGL2RenderingContext.createVertexArray()`
