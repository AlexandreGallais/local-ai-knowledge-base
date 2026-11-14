---
title: "WebGLRenderingContext: clear() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/clear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: clear() method

The **`WebGLRenderingContext.clear()`** method of the WebGL API clears buffers to preset values.

The preset values can be set by `clearColor()`, `clearDepth()` or `clearStencil()`.

The scissor box, dithering, and buffer writemasks can affect the `clear()` method. For example, if buffer writing is disabled via `colorMask()`, `depthMask()`, or `stencilMask()`, `clear()` has no effect on the corresponding buffer.

## Syntax

```js
clear(mask)
```

### Parameters

- `mask`
    A `GLbitfield` bitwise OR mask that indicates the buffers to be
    cleared. Possible values are:
    - `gl.COLOR_BUFFER_BIT`
    - `gl.DEPTH_BUFFER_BIT`
    - `gl.STENCIL_BUFFER_BIT`

### Return value

None (`undefined`).

### Exceptions

If _mask_ is not one of the listed possible values, a
`gl.INVALID_ENUM` error is thrown.

## Examples

The `clear()` method accepts multiple values.

```js
gl.clear(gl.DEPTH_BUFFER_BIT);
gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
```

To get the current clear values, query the `COLOR_CLEAR_VALUE`,
`DEPTH_CLEAR_VALUE`, and `STENCIL_CLEAR_VALUE` constants.

```js
gl.getParameter(gl.COLOR_CLEAR_VALUE);
gl.getParameter(gl.DEPTH_CLEAR_VALUE);
gl.getParameter(gl.STENCIL_CLEAR_VALUE);
```

## See also

- `WebGLRenderingContext.clearColor()`
- `WebGLRenderingContext.clearDepth()`
- `WebGLRenderingContext.clearStencil()`
