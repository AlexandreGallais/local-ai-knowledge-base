---
title: "WebGLRenderingContext: viewport() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/viewport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: viewport() method

The **`WebGLRenderingContext.viewport()`** method of the WebGL API sets the viewport, which specifies
the affine transformation of x and y from normalized device coordinates to window
coordinates.

## Syntax

```js
viewport(x, y, width, height)
```

### Parameters

- `x`
    A `GLint` specifying the horizontal coordinate for the lower left
    corner of the viewport origin. Default value: 0.
- `y`
    A `GLint` specifying the vertical coordinate for the lower left corner
    of the viewport origin. Default value: 0.
- `width`
    A non-negative `GLsizei` specifying the width of the viewport. Default
    value: width of the canvas.
- `height`
    A non-negative `GLsizei` specifying the height of the viewport. Default
    value: height of the canvas.

### Return value

None (`undefined`).

### Exceptions

If either _width_ or _height_ is a negative value, a
`gl.INVALID_VALUE` error is thrown.

## Examples

When you first create a WebGL context, the size of the viewport will match the size of
the canvas. However, if you resize the canvas, you will need to tell the WebGL context a
new viewport setting. In this situation, you can use `gl.viewport`.

```js
gl.viewport(0, 0, canvas.width, canvas.height);
```

The viewport width and height are clamped to a range that is implementation dependent.
To get this range, you can use the `MAX_VIEWPORT_DIMS` constant, which
returns an `Int32Array`.

```js
gl.getParameter(gl.MAX_VIEWPORT_DIMS);
// e.g. Int32Array[16384, 16384]
```

To get the current viewport, query the `VIEWPORT` constant.

```js
gl.getParameter(gl.VIEWPORT);
// e.g. Int32Array[0, 0, 640, 480]
```

## See also

- `WebGLRenderingContext.scissor()`
- `WebGLRenderingContext.getParameter()`
