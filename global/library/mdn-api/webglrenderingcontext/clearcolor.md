---
title: "WebGLRenderingContext: clearColor() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/clearcolor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: clearColor() method

The **`WebGLRenderingContext.clearColor()`** method of the WebGL API specifies the color values used
when clearing color buffers.

This specifies what color values to use when calling the
`clear()` method. The values are clamped
between 0 and 1.

## Syntax

```js
clearColor(red, green, blue, alpha)
```

### Parameters

- `red`
    A `GLclampf` specifying the red color value used when the color buffers
    are cleared. Default value: 0.
- `green`
    A `GLclampf` specifying the green color value used when the color
    buffers are cleared. Default value: 0.
- `blue`
    A `GLclampf` specifying the blue color value used when the color
    buffers are cleared. Default value: 0.
- `alpha`
    A `GLclampf` specifying the alpha (transparency) value used when the
    color buffers are cleared. Default value: 0.

### Return value

None (`undefined`).

## Examples

```js
gl.clearColor(1, 0.5, 0.5, 1);
```

To get the current clear color, query the `COLOR_CLEAR_VALUE` constant which
returns a `Float32Array`.

```js
gl.getParameter(gl.COLOR_CLEAR_VALUE);
// Float32Array[1, 0.5, 0.5, 1]
```

## See also

- `WebGLRenderingContext.clear()`
- `WebGLRenderingContext.clearDepth()`
- `WebGLRenderingContext.clearStencil()`
