---
title: "WebGLRenderingContext: getBufferParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getbufferparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getBufferParameter() method

The **`WebGLRenderingContext.getBufferParameter()`** method of
the WebGL API returns information about the
buffer.

## Syntax

```js
getBufferParameter(target, pname)
```

### Parameters

- `target`
    A `GLenum` specifying the target buffer object. Possible values:
    - `gl.ARRAY_BUFFER`
        Buffer containing vertex attributes, such as
        vertex coordinates, texture coordinate data, or vertex color data.
    - `gl.ELEMENT_ARRAY_BUFFER`
        Buffer used for element indices.

    When using a `WebGL 2 context`,
    the following values are available additionally:
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

- `pname`
    A `GLenum` specifying information to query. Possible values:
    - `gl.BUFFER_SIZE`
        Returns a `GLint` indicating the size
        of the buffer in bytes.
    - `gl.BUFFER_USAGE`
        Returns a `GLenum` indicating the
        usage pattern of the buffer. One of the following:
        - `gl.STATIC_DRAW`
        - `gl.DYNAMIC_DRAW`
        - `gl.STREAM_DRAW`

        When using a `WebGL 2 context`,
        the following values are available additionally:
        - `gl.STATIC_READ`
        - `gl.DYNAMIC_READ`
        - `gl.STREAM_READ`
        - `gl.STATIC_COPY`
        - `gl.DYNAMIC_COPY`
        - `gl.STREAM_COPY`

### Return value

Depends on the requested information (as specified with `pname`). Either a
`GLint` or a `GLenum`.

## Examples

```js
gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE);
```

## See also

- `WebGLRenderingContext.bindBuffer()`
- `WebGLRenderingContext.createBuffer()`
- `WebGLRenderingContext.deleteBuffer()`
- `WebGLRenderingContext.bufferData()`
- Other buffers: `WebGLFramebuffer`, `WebGLRenderbuffer`
