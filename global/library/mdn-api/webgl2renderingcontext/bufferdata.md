---
title: "WebGL2RenderingContext: bufferData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/bufferdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: bufferData() method

The **`WebGL2RenderingContext.bufferData()`** method of the WebGL API creates and initializes the buffer object's data store.

## Syntax

```js
bufferData(target, size, usage)
bufferData(target, srcData, usage)
bufferData(target, srcData, usage, srcOffset)
bufferData(target, srcData, usage, srcOffset, length)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target). Possible values:
    - `gl.ARRAY_BUFFER`
        Buffer containing vertex attributes, such as
        vertex coordinates, texture coordinate data, or vertex color data.
    - `gl.ELEMENT_ARRAY_BUFFER`
        Buffer used for element indices.
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

- `size` (optional)
    A `GLsizeiptr` setting the size in bytes of the buffer object's data
    store.
    One of `size` and `srcData` must be provided.
- `srcData` (optional)
    A `TypedArray` or a `DataView` that views an `ArrayBuffer` or `SharedArrayBuffer`
    that will be copied into the data store.
    If `null`, a data store is still created, but the content is uninitialized and undefined.
    One of `size` and `srcData` must be provided.
- `usage`
    A `GLenum` specifying the intended usage pattern of the data store
    for optimization purposes. Possible values:
    - `gl.STATIC_DRAW`
        The contents are intended to be specified
        once by the application, and used many times as the source for WebGL
        drawing and image specification commands.
    - `gl.DYNAMIC_DRAW`
        The contents are intended to be respecified
        repeatedly by the application, and used many times as the source for WebGL
        drawing and image specification commands.
    - `gl.STREAM_DRAW`
        The contents are intended to be specified
        once by the application, and used at most a few times as the source for
        WebGL drawing and image specification commands.
    - `gl.STATIC_READ`
        The contents are intended to be
        specified once by reading data from WebGL, and queried many times
        by the application.
    - `gl.DYNAMIC_READ`
        The contents are intended to be
        respecified repeatedly by reading data from WebGL, and queried
        many times by the application.
    - `gl.STREAM_READ`
        The contents are intended to be
        specified once by reading data from WebGL, and queried at most a
        few times by the application
    - `gl.STATIC_COPY`
        The contents are intended to be
        specified once by reading data from WebGL, and used many times as
        the source for WebGL drawing and image specification commands.
    - `gl.DYNAMIC_COPY`
        The contents are intended to be
        respecified repeatedly by reading data from WebGL, and used many
        times as the source for WebGL drawing and image specification
        commands.
    - `gl.STREAM_COPY`
        The contents are intended to be
        specified once by reading data from WebGL, and used at most a few
        times as the source for WebGL drawing and image specification
        commands.

- `srcOffset` (optional)
    A `GLuint` specifying the element index offset where to start reading
    the buffer.
    Only allowed if `srcData` is provided.
- `length` (optional)
    A `GLuint` defaulting to 0.
    Only allowed if `srcOffset` is given.

### Return value

None (`undefined`).

### Exceptions

- A `gl.OUT_OF_MEMORY` error is thrown if the context is unable to create
  a data store with the given `size`.
- A `gl.INVALID_VALUE` error is thrown if `size` is negative.
- A `gl.INVALID_ENUM` error is thrown if `target` or
  `usage` are not one of the allowed enums.

## See also

- `WebGLRenderingContext.bufferData()`
- `WebGLRenderingContext.createBuffer()`
- `WebGLRenderingContext.bufferSubData()`
- Other buffers: `WebGLFramebuffer`, `WebGLRenderbuffer`
