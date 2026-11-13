---
title: "WebGLRenderingContext: clearDepth() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/cleardepth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: clearDepth() method

The **`WebGLRenderingContext.clearDepth()`** method of the WebGL API specifies the clear value for the
depth buffer.

This specifies what depth value to use when calling the
`clear()` method. The value is clamped
between 0 and 1.

## Syntax

```js
clearDepth(depth)
```

### Parameters

- `depth`
    A `GLclampf` specifying the depth value used when the depth buffer is
    cleared. Default value: 1.

### Return value

None (`undefined`).

## Examples

```js
gl.clearDepth(0.5);
```

To get the current depth clear value, query the `DEPTH_CLEAR_VALUE`
constant.

```js
gl.getParameter(gl.DEPTH_CLEAR_VALUE);
// 0.5
```

## See also

- `WebGLRenderingContext.clear()`
- `WebGLRenderingContext.clearColor()`
- `WebGLRenderingContext.clearStencil()`
