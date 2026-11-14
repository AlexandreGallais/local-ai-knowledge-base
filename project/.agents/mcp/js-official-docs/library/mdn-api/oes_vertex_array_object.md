---
title: "OES_vertex_array_object extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oes_vertex_array_object/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OES_vertex_array_object extension

The **OES_vertex_array_object** extension is part of the WebGL API and provides vertex array objects (VAOs) which encapsulate vertex array states. These objects keep pointers to vertex data and provide names for different sets of vertex data.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is only available to `WebGL1` contexts. In `WebGL2`, the functionality of this extension is available on the WebGL2 context by default and the constants and methods are available without the `OES_` suffix.

## Constants

This extension exposes one new constant, which can be used in the `gl.getParameter()` method:

- `ext.VERTEX_ARRAY_BINDING_OES`
    Returns a `WebGLVertexArrayObject` object when used in the `gl.getParameter()` method as the `pname` parameter.

## Instance methods

This extension exposes four new methods.

- `ext.createVertexArrayOES()`
    Creates a new `WebGLVertexArrayObject`.
- `ext.deleteVertexArrayOES()`
    Deletes a given `WebGLVertexArrayObject`.
- `ext.isVertexArrayOES()`
    Returns `true` if a given object is a `WebGLVertexArrayObject`.
- `ext.bindVertexArrayOES()`
    Binds a given `WebGLVertexArrayObject` to the buffer.

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
- WebGL2 equivalent methods:
  - `WebGL2RenderingContext.createVertexArray()`
  - `WebGL2RenderingContext.deleteVertexArray()`
  - `WebGL2RenderingContext.isVertexArray()`
  - `WebGL2RenderingContext.bindVertexArray()`
