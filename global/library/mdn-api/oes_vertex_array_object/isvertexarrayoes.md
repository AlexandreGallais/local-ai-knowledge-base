---
title: "OES_vertex_array_object: isVertexArrayOES() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oes_vertex_array_object/isvertexarrayoes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OES_vertex_array_object: isVertexArrayOES() method

The **`OES_vertex_array_object.isVertexArrayOES()`** method of
the WebGL API returns `true` if
the passed object is a `WebGLVertexArrayObject` object.

## Syntax

```js
isVertexArrayOES(arrayObject)
```

### Parameters

- `arrayObject`
    A `WebGLVertexArrayObject` (VAO) object to test.

### Return value

A `GLboolean` indicating whether the given object is a
`WebGLVertexArrayObject` object (`true`) or not
(`false`).

## Examples

```js
const ext = gl.getExtension("OES_vertex_array_object");
const vao = ext.createVertexArrayOES();
ext.bindVertexArrayOES(vao);

// …

ext.isVertexArrayOES(vao);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.vertexAttribPointer()`
- WebGL2 equivalent: `WebGL2RenderingContext.isVertexArray()`
