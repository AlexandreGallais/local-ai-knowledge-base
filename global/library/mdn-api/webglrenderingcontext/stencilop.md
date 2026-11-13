---
title: "WebGLRenderingContext: stencilOp() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/stencilop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: stencilOp() method

The **`WebGLRenderingContext.stencilOp()`** method of the WebGL API sets both the front and back-facing
stencil test actions.

## Syntax

```js
stencilOp(fail, zfail, zpass)
```

### Parameters

- `fail`
    A `GLenum` specifying the function to use when the stencil test fails.
    The default value is `gl.KEEP`.
- `zfail`
    A `GLenum` specifying the function to use when the stencil test passes,
    but the depth test fails. The default value is `gl.KEEP`.
- `zpass`
    A `GLenum` specifying the function to use when both the stencil test
    and the depth test pass, or when the stencil test passes and there is no depth buffer
    or depth testing is disabled. The default value is `gl.KEEP`.

### Return value

None (`undefined`).

## Constants

- `gl.KEEP`
    Keeps the current value.
- `gl.ZERO`
    Sets the stencil buffer value to 0.
- `gl.REPLACE`
    Sets the stencil buffer value to the reference value as specified by
    `WebGLRenderingContext.stencilFunc()`.
- `gl.INCR`
    Increments the current stencil buffer value. Clamps to the maximum representable
    unsigned value.
- `gl.INCR_WRAP`
    Increments the current stencil buffer value. Wraps stencil buffer value to zero when
    incrementing the maximum representable unsigned value.
- `gl.DECR`
    Decrements the current stencil buffer value. Clamps to 0.
- `gl.DECR_WRAP`
    Decrements the current stencil buffer value. Wraps stencil buffer value to the
    maximum representable unsigned value when decrementing a stencil buffer value of 0.
- `gl.INVERT`
    Inverts the current stencil buffer value bitwise.

## Examples

The stencil testing is disabled by default. To enable or disable stencil testing, use
the `enable()` and
`disable()` methods with the argument
`gl.STENCIL_TEST`.

```js
gl.enable(gl.STENCIL_TEST);
gl.stencilOp(gl.INCR, gl.DECR, gl.INVERT);
```

To get the current information about stencil and depth pass or fail, query the
following constants with `getParameter()`.

```js
gl.getParameter(gl.STENCIL_FAIL);
gl.getParameter(gl.STENCIL_PASS_DEPTH_PASS);
gl.getParameter(gl.STENCIL_PASS_DEPTH_FAIL);
gl.getParameter(gl.STENCIL_BACK_FAIL);
gl.getParameter(gl.STENCIL_BACK_PASS_DEPTH_PASS);
gl.getParameter(gl.STENCIL_BACK_PASS_DEPTH_FAIL);
gl.getParameter(gl.STENCIL_BITS);
```

## See also

- `WebGLRenderingContext.stencilOpSeparate()`
- `WebGLRenderingContext.stencilFunc()`
- `WebGLRenderingContext.stencilFuncSeparate()`
- `WebGLRenderingContext.stencilMask()`
- `WebGLRenderingContext.stencilMaskSeparate()`
