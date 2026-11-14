---
title: "WebGLRenderingContext: stencilFunc() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/stencilfunc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: stencilFunc() method

The **`WebGLRenderingContext.stencilFunc()`** method of the WebGL API sets the front and back function
and reference value for stencil testing.

Stenciling enables and disables drawing on a per-pixel basis. It is typically used in
multipass <example-value> to achieve special effects.

## Syntax

```js
stencilFunc(func, ref, mask)
```

### Parameters

- `func`
    A `GLenum` specifying the test function. The default function is
    `gl.ALWAYS`. The possible values are:
    - `gl.NEVER`: Never pass.
    - `gl.LESS`: Pass if
      `(ref & mask) < (stencil & mask)`.
    - `gl.EQUAL`: Pass if
      `(ref & mask) = (stencil & mask)`.
    - `gl.LEQUAL`: Pass if
      `(ref & mask) <= (stencil & mask)`.
    - `gl.GREATER`: Pass if
      `(ref & mask) > (stencil & mask)`.
    - `gl.NOTEQUAL`: Pass if
      `(ref & mask) !== (stencil & mask)`.
    - `gl.GEQUAL`: Pass if
      `(ref & mask) >= (stencil & mask)`.
    - `gl.ALWAYS`: Always pass.

- `ref`
    A `GLint` specifying the reference value for the stencil test. This
    value is clamped to the range 0 to 2^n - 1 where n is the number of bitplanes
    in the stencil buffer. The default value is 0.
- `mask`
    A `GLuint` specifying a bit-wise mask that is used to AND the reference
    value and the stored stencil value when the test is done. The default value is all 1.

### Return value

None (`undefined`).

## Examples

The stencil testing is disabled by default. To enable or disable stencil testing, use
the `enable()` and
`disable()` methods with the argument
`gl.STENCIL_TEST`.

```js
gl.enable(gl.STENCIL_TEST);
gl.stencilFunc(gl.LESS, 0, 0b1110011);
```

To get the current stencil function, reference value, or other stencil information,
query the following constants with `getParameter()`.

```js
gl.getParameter(gl.STENCIL_FUNC);
gl.getParameter(gl.STENCIL_VALUE_MASK);
gl.getParameter(gl.STENCIL_REF);
gl.getParameter(gl.STENCIL_BACK_FUNC);
gl.getParameter(gl.STENCIL_BACK_VALUE_MASK);
gl.getParameter(gl.STENCIL_BACK_REF);
gl.getParameter(gl.STENCIL_BITS);
```

## See also

- `WebGLRenderingContext.stencilFuncSeparate()`
- `WebGLRenderingContext.stencilMask()`
- `WebGLRenderingContext.stencilMaskSeparate()`
- `WebGLRenderingContext.stencilOp()`
- `WebGLRenderingContext.stencilOpSeparate()`
