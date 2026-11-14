---
title: "WebGL2RenderingContext: createVertexArray() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/createvertexarray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: createVertexArray() method

The **`WebGL2RenderingContext.createVertexArray()`** method of
the WebGL 2 API creates and initializes a
`WebGLVertexArrayObject` object that represents a vertex array object (VAO)
pointing to vertex array data and which provides names for different sets of vertex
data.

## Syntax

```js
createVertexArray()
```

### Parameters

None.

### Return value

A `WebGLVertexArrayObject` representing a vertex array object (VAO) which
points to vertex array data.

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

- `WebGLVertexArrayObject`
