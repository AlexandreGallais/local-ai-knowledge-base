---
title: "WebGL2RenderingContext: vertexAttribI4[u]i[v]() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/vertexattribi/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: vertexAttribI4[u]i[v]() method

The **`WebGL2RenderingContext.vertexAttribI4[u]iv`**
methods of the WebGL 2 API specify integer
values for generic vertex attributes.

## Syntax

```js
vertexAttribI4i(index, v0, v1, v2, v3)
vertexAttribI4ui(index, v0, v1, v2, v3)
vertexAttribI4iv(index, value)
vertexAttribI4uiv(index, value)
```

### Parameters

- `index`
    A `GLuint` specifying the position of the vertex attribute to be
    modified.
- `v0`, `v1`, `v2`, `v3`
    An integer `Number` for the vertex attribute value.
- `value`
    A `Uint32Array`/`Int32Array` or sequences of
    `GLuint`/ `GLint` for integer vector vertex attribute
    values.

### Return value

None (`undefined`).

## Examples

```js
gl.vertexAttribI4i(index, 10);
```

## See also

- `WebGLRenderingContext.getVertexAttrib()`
