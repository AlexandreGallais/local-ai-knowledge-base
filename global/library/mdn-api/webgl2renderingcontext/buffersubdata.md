---
title: "WebGL2RenderingContext: bufferSubData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/buffersubdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: bufferSubData() method

The **`WebGL2RenderingContext.bufferSubData()`** method of the
WebGL API updates a subset of a buffer
object's data store.

## Syntax

```js
bufferSubData(target, dstByteOffset, srcData)
bufferSubData(target, dstByteOffset, srcData, srcOffset)
bufferSubData(target, dstByteOffset, srcData, srcOffset, length)
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

- `dstByteOffset`
    A `GLintptr` specifying an offset in bytes where the data replacement
    will start.
- `srcData`
    A `TypedArray` or a `DataView` that views an `ArrayBuffer` or `SharedArrayBuffer`
    that will be copied into the data store.
- `srcOffset` (optional)
    A `GLuint` specifying the element index offset where to start reading
    the buffer.
- `length` (optional)
    A `GLuint` defaulting to 0, where 0 means `bufferSubData` should calculate the length.

### Return value

None (`undefined`).

### Exceptions

- A `gl.INVALID_VALUE` error is thrown if the data would be written past
  the end of the buffer or if `data` is `null`.
- A `gl.INVALID_ENUM` error is thrown if `target` is not one of
  the allowed enums.

## See also

- `WebGLRenderingContext.bufferSubData()`
- `WebGLRenderingContext.createBuffer()`
- `WebGLRenderingContext.bufferData()`
- Other buffers: `WebGLFramebuffer`, `WebGLRenderbuffer`
