---
title: "OES_draw_buffers_indexed: enableiOES() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oes_draw_buffers_indexed/enableioes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OES_draw_buffers_indexed: enableiOES() method

The `enableiOES()` method of the `OES_draw_buffers_indexed` WebGL extension enables blending for a particular draw buffer.

## Syntax

```js
enableiOES(target, index)
```

### Parameters

- `target`
    Must be `gl.BLEND`.
- `index`
    An integer `i` specifying the draw buffer associated with the constant `gl.DRAW_BUFFERi`, see WebGL draw buffer constants.

### Return value

None (`undefined`).

### Exceptions

- If `target` is not `gl.BLEND`, a `gl.INVALID_ENUM` error is thrown.
- If `index` is not a valid value, a `gl.INVALID_VALUE` error is thrown.

## Examples

### Enabling blending for draw buffers

The following two calls enable blending for the draw buffers `gl.DRAW_BUFFER0` and `gl.DRAW_BUFFER1`.

```js
const ext = gl.getExtension("OES_draw_buffers_indexed");

ext.enableiOES(gl.BLEND, 0);
ext.enableiOES(gl.BLEND, 1);
```

You can use `WebGLRenderingContext.getParameter()` to see how many draw buffers are available.

```js
const maxDrawBuffers = gl.getParameter(gl.MAX_DRAW_BUFFERS);
```

## See also

- `OES_draw_buffers_indexed.disableiOES()`
- WebGL draw buffer constants
