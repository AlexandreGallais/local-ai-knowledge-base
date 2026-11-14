---
title: "WebGL2RenderingContext: copyBufferSubData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/copybuffersubdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: copyBufferSubData() method

The **`WebGL2RenderingContext.copyBufferSubData()`** method of
the WebGL 2 API copies part of the data of a
buffer to another buffer.

## Syntax

```js
copyBufferSubData(readTarget, writeTarget, readOffset, writeOffset, size)
```

### Parameters

- `readTarget`, `writeTarget`
    A `GLenum` specifying the binding point (target) from whose data store
    should be read or written. Possible values:
    - `gl.ARRAY_BUFFER`: Buffer containing vertex attributes, such as
      vertex coordinates, texture coordinate data, or vertex color data.
    - `gl.ELEMENT_ARRAY_BUFFER`: Buffer used for element indices.
    - `gl.COPY_READ_BUFFER`: Buffer for copying from one buffer object to
      another (provided specifically for copy operations).
    - `gl.COPY_WRITE_BUFFER`: Buffer for copying from one buffer object to
      another (provided specifically for copy operations).
    - `gl.TRANSFORM_FEEDBACK_BUFFER`: Buffer for transform feedback
      operations.
    - `gl.UNIFORM_BUFFER`: Buffer used for storing uniform blocks.
    - `gl.PIXEL_PACK_BUFFER`: Buffer used for pixel transfer operations.
    - `gl.PIXEL_UNPACK_BUFFER`: Buffer used for pixel transfer operations.

- `readOffset`, `writeOffset`
    A `GLintptr` specifying the byte offset from which to start reading
    from or writing to the buffer.
- `size`
    A `GLsizei` in bytes specifying the size of the data to be copied from
    `readTarget` to `writeTarget`.

### Return value

None (`undefined`).

## Examples

```js
const srcBuffer = gl.createBuffer();
const dstBuffer = gl.createBuffer();

const data = new Float32Array(vertices);
const length = vertices.length * 4;

gl.bindBuffer(gl.ARRAY_BUFFER, srcBuffer);
gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
gl.bindBuffer(gl.COPY_READ_BUFFER, srcBuffer);

gl.bindBuffer(gl.ARRAY_BUFFER, dstBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(length), gl.STATIC_DRAW);

gl.copyBufferSubData(gl.COPY_READ_BUFFER, gl.ARRAY_BUFFER, 0, 0, length);
```

## See also

- `WebGLRenderingContext.bufferData()`
- `WebGLRenderingContext.bufferSubData()`
- `WebGLRenderingContext.getBufferParameter()`
- `WebGL2RenderingContext.getBufferSubData()`
