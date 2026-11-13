---
title: "WebGL2RenderingContext: drawBuffers() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/drawbuffers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: drawBuffers() method

The **`WebGL2RenderingContext.drawBuffers()`** method of the WebGL 2 API defines draw buffers to which
fragment colors are written into. The draw buffer settings are part of the state of the
currently bound framebuffer or the drawing buffer if no framebuffer is bound.

## Syntax

```js
drawBuffers(buffers)
```

### Parameters

- `buffers`
    An `Array` of `GLenum` specifying the buffers into which
    fragment colors will be written. Possible values are:
    - `gl.NONE`
        Fragment shader output is not written into any color
        buffer.
    - `gl.BACK`
        Fragment shader output is written into the back color
        buffer.
    - `gl.COLOR_ATTACHMENT{0-15}`
        Fragment shader output is written in the
        nth color attachment of the current framebuffer.

### Return value

None (`undefined`).

### Exceptions

- If `buffers` contains not one of the accepted values, a
  `gl.INVALID_ENUM` error is thrown.

## Examples

```js
gl.drawBuffers([gl.NONE, gl.COLOR_ATTACHMENT1]);
```

## See also

- `WebGL2RenderingContext.clearBufferfiuv`
