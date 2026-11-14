---
title: "WebGLRenderingContext: disableVertexAttribArray() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/disablevertexattribarray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: disableVertexAttribArray() method

The **`WebGLRenderingContext.disableVertexAttribArray()`**
method of the WebGL API turns the generic
vertex attribute array off at a given index position.

## Syntax

```js
disableVertexAttribArray(index)
```

### Parameters

- `index`
    A `GLuint` specifying the index of the vertex attribute to disable.

### Return value

None (`undefined`).

## Examples

```js
gl.disableVertexAttribArray(0);
```

## See also

- `WebGLRenderingContext.enableVertexAttribArray()`
