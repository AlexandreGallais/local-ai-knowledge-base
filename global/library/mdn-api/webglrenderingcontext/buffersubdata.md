---
title: "WebGLRenderingContext: bufferSubData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/buffersubdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: bufferSubData() method

The **`WebGLRenderingContext.bufferSubData()`** method of the WebGL API updates a subset of a buffer object's data store.

## Syntax

```js
bufferSubData(target, offset)
bufferSubData(target, offset, srcData)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target). Possible values:
    - `gl.ARRAY_BUFFER`
        Buffer containing vertex attributes, such as vertex coordinates, texture coordinate data, or vertex color data.
    - `gl.ELEMENT_ARRAY_BUFFER`
        Buffer used for element indices.

- `offset`
    A `GLintptr` specifying an offset in bytes where the data replacement will start.
- `srcData` (optional)
    A `TypedArray` or a `DataView` that views an `ArrayBuffer` or `SharedArrayBuffer` that will be copied into the data store.

### Return value

None (`undefined`).

### Exceptions

- A `gl.INVALID_VALUE` error is thrown if the data would be written past the end of the buffer or if `data` is `null`.
- A `gl.INVALID_ENUM` error is thrown if `target` is not one of the allowed enums.

## Examples

### Using `bufferSubData`

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const buffer = gl.createBuffer();
const data = new Float32Array([1, 2, 3, 4]);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, 1024, gl.STATIC_DRAW);
gl.bufferSubData(gl.ARRAY_BUFFER, 512, data);
```

## See also

- `WebGL2RenderingContext.bufferSubData()`
- `WebGLRenderingContext.createBuffer()`
- `WebGLRenderingContext.bufferData()`
- Other buffers: `WebGLFramebuffer`, `WebGLRenderbuffer`
