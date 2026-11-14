---
title: "WebGLRenderingContext: getVertexAttribOffset() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getvertexattriboffset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getVertexAttribOffset() method

The **`WebGLRenderingContext.getVertexAttribOffset()`** method
of the WebGL API returns the address of a
specified vertex attribute.

## Syntax

```js
getVertexAttribOffset(index, pname)
```

### Parameters

- `index`
    A `GLuint` specifying the index of the vertex attribute.
- `pname`
    A `GLenum` which must be `gl.VERTEX_ATTRIB_ARRAY_POINTER`.

### Return value

A `GLintptr` indicating the address of the vertex attribute.

## Examples

```js
gl.getVertexAttribOffset(i, gl.VERTEX_ATTRIB_ARRAY_POINTER);
```

## See also

- `WebGLRenderingContext.vertexAttribPointer()`
