---
title: "WebGLRenderingContext: clearStencil() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/clearstencil/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: clearStencil() method

The **`WebGLRenderingContext.clearStencil()`** method of the WebGL API specifies the clear value for the
stencil buffer.

This specifies what stencil value to use when calling the
`clear()` method.

## Syntax

```js
clearStencil(s)
```

### Parameters

- `s`
    A `GLint` specifying the index used when the stencil buffer is cleared.
    Default value: 0.

### Return value

None (`undefined`).

## Examples

```js
gl.clearStencil(1);
```

To get the current stencil clear value, query the `STENCIL_CLEAR_VALUE`
constant.

```js
gl.getParameter(gl.STENCIL_CLEAR_VALUE);
// 1
```

## See also

- `WebGLRenderingContext.clear()`
- `WebGLRenderingContext.clearColor()`
- `WebGLRenderingContext.clearDepth()`
