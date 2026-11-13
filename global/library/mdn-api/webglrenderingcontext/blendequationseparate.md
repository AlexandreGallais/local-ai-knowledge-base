---
title: "WebGLRenderingContext: blendEquationSeparate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/blendequationseparate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: blendEquationSeparate() method

The **`WebGLRenderingContext.blendEquationSeparate()`** method
of the WebGL API is used to set the RGB
blend equation and alpha blend equation separately.

The blend equation determines how a new pixel is combined with a pixel already in the
`WebGLFramebuffer`.

## Syntax

```js
blendEquationSeparate(modeRGB, modeAlpha)
```

### Parameters

- `modeRGB`
    A `GLenum` specifying how the red, green and blue components of source
    and destination colors are combined. Must be either:
    - `gl.FUNC_ADD`: source + destination (default value),
    - `gl.FUNC_SUBTRACT`: source - destination,
    - `gl.FUNC_REVERSE_SUBTRACT`: destination - source,
    - When using the `EXT_blend_minmax` extension:
      - `ext.MIN_EXT`: Minimum of source and destination,
      - `ext.MAX_EXT`: Maximum of source and destination.

    - When using a `WebGL 2 context`,
      the following values are available additionally:
      - `gl.MIN`: Minimum of source and destination,
      - `gl.MAX`: Maximum of source and destination.

- `modeAlpha`
    A `GLenum` specifying how the alpha component (transparency) of source
    and destination colors are combined. Must be either:
    - `gl.FUNC_ADD`: source + destination (default value),
    - `gl.FUNC_SUBTRACT`: source - destination,
    - `gl.FUNC_REVERSE_SUBTRACT`: destination - source,
    - When using the `EXT_blend_minmax` extension:
      - `ext.MIN_EXT`: Minimum of source and destination,
      - `ext.MAX_EXT`: Maximum of source and destination.

    - When using a `WebGL 2 context`,
      the following values are available additionally:
      - `gl.MIN`: Minimum of source and destination,
      - `gl.MAX`: Maximum of source and destination.

### Return value

None (`undefined`).

### Exceptions

If _mode_ is not one of the three possible values, a
`gl.INVALID_ENUM` error is thrown.

## Examples

To set the blend equations, use:

```js
gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_SUBTRACT);
```

To get the current blend equations, query the `BLEND_EQUATION`,
`BLEND_EQUATION_RGB` and `BLEND_EQUATION_ALPHA` constants which
return `gl.FUNC_ADD`, `gl.FUNC_SUBTRACT`,
`gl.FUNC_REVERSE_SUBTRACT`, or if the `EXT_blend_minmax` is
enabled: `ext.MIN_EXT` or `ext.MAX_EXT`.

```js
gl.getParameter(gl.BLEND_EQUATION_RGB) === gl.FUNC_ADD;
// true

gl.getParameter(gl.BLEND_EQUATION_ALPHA) === gl.FUNC_ADD;
// true
```

## See also

- `WebGLRenderingContext.blendEquation()`
- `WebGLRenderingContext.blendColor()`
- `WebGLRenderingContext.blendFunc()`
- `EXT_blend_minmax`
