---
title: "WebGLRenderingContext: scissor() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/scissor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: scissor() method

The **`WebGLRenderingContext.scissor()`** method of the WebGL API sets a scissor box, which limits
the drawing to a specified rectangle.

## Syntax

```js
scissor(x, y, width, height)
```

### Parameters

- `x`
    A `GLint` specifying the horizontal coordinate for the lower left
    corner of the box. Default value: 0.
- `y`
    A `GLint` specifying the vertical coordinate for the lower left corner
    of the box. Default value: 0.
- `width`
    A non-negative `GLsizei` specifying the width of the scissor box.
    Default value: width of the canvas.
- `height`
    A non-negative `GLsizei` specifying the height of the scissor box.
    Default value: height of the canvas.

### Return value

None (`undefined`).

### Exceptions

If either _width_ or _height_ is a negative value, a
`gl.INVALID_VALUE` error is thrown.

## Examples

When the scissor test is enabled, only pixels within the scissor box can be modified by
drawing commands.

```js
// turn on scissor test
gl.enable(gl.SCISSOR_TEST);

// set the scissor rectangle
gl.scissor(x, y, width, height);

// execute drawing commands in the scissor box (e.g. clear)

// turn off scissor test again
gl.disable(gl.SCISSOR_TEST);
```

To get the current scissor box dimensions, query the `SCISSOR_BOX` constant
which returns an `Int32Array`.

```js
gl.scissor(0, 0, 200, 200);
gl.getParameter(gl.SCISSOR_BOX);
// Int32Array[0, 0, 200, 200]
```

## See also

- `WebGLRenderingContext.viewport()`
- `WebGLRenderingContext.enable()`
- `WebGLRenderingContext.disable()`
