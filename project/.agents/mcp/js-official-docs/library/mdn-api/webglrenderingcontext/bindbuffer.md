---
title: "WebGLRenderingContext: bindBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/bindbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: bindBuffer() method

The **`WebGLRenderingContext.bindBuffer()`** method of the WebGL API binds a given
`WebGLBuffer` to a target.

## Syntax

```js
bindBuffer(target, buffer)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target). Possible values:
    - `gl.ARRAY_BUFFER`
        Buffer containing vertex attributes, such as
        vertex coordinates, texture coordinate data, or vertex color data.
    - `gl.ELEMENT_ARRAY_BUFFER`
        Buffer used for element indices.

    When using a `WebGL 2 context`, the following values are available additionally:
    - `gl.COPY_READ_BUFFER`
        Buffer for copying from one buffer object to another.
    - `gl.COPY_WRITE_BUFFER`
        Buffer for copying from one buffer object to another.
    - `gl.TRANSFORM_FEEDBACK_BUFFER`
        Buffer for transform feedback operations.
    - `gl.UNIFORM_BUFFER`
        Buffer used for storing uniform blocks.
    - `gl.PIXEL_PACK_BUFFER`
        Buffer used for pixel transfer operations.
    - `gl.PIXEL_UNPACK_BUFFER`
        Buffer used for pixel transfer operations.

- `buffer`
    A `WebGLBuffer` to bind.

### Return value

None (`undefined`).

### Exceptions

Only one target can be bound to a given `WebGLBuffer`. An attempt to bind
the buffer to another target will throw an `INVALID_OPERATION` error and the
current buffer binding will remain the same.

A `WebGLBuffer` which has been marked for deletion with
`deleteBuffer` cannot be
(re-)bound. An attempt to do so will generate an `INVALID_OPERATION` error,
and the current binding will remain untouched.

## Examples

### Binding a buffer to a target

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
```

### Getting current bindings

To check the current buffer bindings, query the `ARRAY_BUFFER_BINDING`
and `ELEMENT_ARRAY_BUFFER_BINDING` constants.

```js
gl.getParameter(gl.ARRAY_BUFFER_BINDING);
gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
```

## See also

- `WebGLRenderingContext.createBuffer()`
- `WebGLRenderingContext.deleteBuffer()`
- `WebGLRenderingContext.isBuffer()`
- Other buffers: `WebGLFramebuffer`, `WebGLRenderbuffer`
