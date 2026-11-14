---
title: "WebGL2RenderingContext: bindVertexArray() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/bindvertexarray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: bindVertexArray() method

The **`WebGL2RenderingContext.bindVertexArray()`** method of
the WebGL 2 API binds a
passed `WebGLVertexArrayObject` object to the buffer.

## Syntax

```js
bindVertexArray(vertexArray)
```

### Parameters

- `vertexArray`
    A `WebGLVertexArrayObject` (VAO) object to bind.

### Return value

None (`undefined`).

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
