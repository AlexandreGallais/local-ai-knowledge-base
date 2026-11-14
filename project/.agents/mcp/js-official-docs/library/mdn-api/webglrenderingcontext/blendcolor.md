---
title: "WebGLRenderingContext: blendColor() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/blendcolor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: blendColor() method

The **`WebGLRenderingContext.blendColor()`** method of the WebGL API is used to set the source and
destination blending factors.

## Syntax

```js
blendColor(red, green, blue, alpha)
```

### Parameters

- `red`
    A `GLclampf` for the red component in the range of 0 to 1. Default value is 0.
- `green`
    A `GLclampf` for the green component in the range of 0 to 1. Default value is 0.
- `blue`
    A `GLclampf` for the blue component in the range of 0 to 1. Default value is 0.
- `alpha`
    A `GLclampf` for the alpha component (transparency) in the range of 0.
    to 1. Default value is 0.

### Return value

None (`undefined`).

## Examples

To set the blend color, use:

```js
gl.blendColor(0, 0.5, 1, 1);
```

To get the blend color, query the `BLEND_COLOR` constant which returns a
`Float32Array`.

```js
gl.getParameter(gl.BLEND_COLOR);
// Float32Array[0, 0.5, 1, 1]
```

## See also

- `WebGLRenderingContext.blendEquation()`
- `WebGLRenderingContext.blendFunc()`
