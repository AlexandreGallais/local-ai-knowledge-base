---
title: "OES_vertex_array_object: deleteVertexArrayOES() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oes_vertex_array_object/deletevertexarrayoes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OES_vertex_array_object: deleteVertexArrayOES() method

The **`OES_vertex_array_object.deleteVertexArrayOES()`** method
of the WebGL API deletes a given
`WebGLVertexArrayObject` object.

## Syntax

```js
deleteVertexArrayOES(arrayObject)
```

### Parameters

- `arrayObject`
    A `WebGLVertexArrayObject` (VAO) object to delete.

### Return value

None (`undefined`).

## Examples

```js
const ext = gl.getExtension("OES_vertex_array_object");
const vao = ext.createVertexArrayOES();
ext.bindVertexArrayOES(vao);

// …

ext.deleteVertexArrayOES(vao);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.vertexAttribPointer()`
- WebGL2 equivalent: `WebGL2RenderingContext.deleteVertexArray()`
