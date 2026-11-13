---
title: "WebGL2RenderingContext: readBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/readbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: readBuffer() method

The **`WebGL2RenderingContext.readBuffer()`** method of the WebGL 2 API selects a color buffer as the
source for pixels for subsequent calls to
`copyTexImage2D`,
`copyTexSubImage2D`,
`copyTexSubImage3D` or
`readPixels`.

## Syntax

```js
readBuffer(source)
```

### Parameters

- `source`
    A `GLenum` specifying a color buffer. Possible values:
    - `gl.BACK`
        Reads from the back color buffer.
    - `gl.NONE`
        Reads from no color buffer.
    - `gl.COLOR_ATTACHMENT{0-15}`
        Reads from one of the 16 color attachment buffers.

### Return value

None (`undefined`).

## Examples

```js
gl.readBuffer(gl.COLOR_ATTACHMENT0);
```

## See also

- `WebGLRenderingContext.copyTexImage2D()`
- `WebGLRenderingContext.copyTexSubImage2D()`
- `WebGL2RenderingContext.copyTexSubImage3D()`
- `WebGLRenderingContext.readPixels()`
