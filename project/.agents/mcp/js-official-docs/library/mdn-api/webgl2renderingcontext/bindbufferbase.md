---
title: "WebGL2RenderingContext: bindBufferBase() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/bindbufferbase/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: bindBufferBase() method

The **`WebGL2RenderingContext.bindBufferBase()`** method of the
WebGL 2 API binds a given
`WebGLBuffer` to a given binding point (`target`) at a given
`index`.

## Syntax

```js
bindBufferBase(target, index, buffer)
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

### Return value

None (`undefined`).

## Examples

```js
gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, buffer);
```

## See also

- `WebGL2RenderingContext.getIndexedParameter()`
