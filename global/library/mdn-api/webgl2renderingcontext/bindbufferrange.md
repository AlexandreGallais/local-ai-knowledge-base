---
title: "WebGL2RenderingContext: bindBufferRange() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/bindbufferrange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: bindBufferRange() method

The **`WebGL2RenderingContext.bindBufferRange()`** method of
the WebGL 2 API binds a range of a given
`WebGLBuffer` to a given binding point (`target`) at a given
`index`.

## Syntax

```js
bindBufferRange(target, index, buffer, offset, size)
```

### Parameters

- `target`
    A `GLenum` specifying the target for the bind operation. Possible
    values:
    - `gl.TRANSFORM_FEEDBACK_BUFFER`
    - `gl.UNIFORM_BUFFER`

- `index`
    A `GLuint` specifying the index of the `target`.
- `buffer`
    A `WebGLBuffer` which to bind to the binding point
    (`target`).
- `offset`
    A `GLintptr` specifying the starting offset.
- `size`
    A `GLsizeiptr` specifying the amount of data that can be read from the
    buffer.

### Return value

None (`undefined`).

## Examples

```js
gl.bindBufferRange(gl.TRANSFORM_FEEDBACK_BUFFER, 1, buffer, 0, 4);
```

## See also

- `WebGL2RenderingContext.bindBufferBase()`
