---
title: "WebGLRenderingContext: colorMask() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/colormask/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: colorMask() method

The **`WebGLRenderingContext.colorMask()`** method of the WebGL API sets which color components to
enable or to disable when drawing or rendering to a `WebGLFramebuffer`.

## Syntax

```js
colorMask(red, green, blue, alpha)
```

### Parameters

- `red`
    A `GLboolean` specifying whether or not the red color component can be
    written into the frame buffer. Default value: `true`.
- `green`
    A `GLboolean` specifying whether or not the green color component can
    be written into the frame buffer. Default value: `true`.
- `blue`
    A `GLboolean` specifying whether or not the blue color component can be
    written into the frame buffer. Default value: `true`.
- `alpha`
    A `GLboolean` specifying whether or not the alpha (transparency)
    component can be written into the frame buffer. Default value: `true`.

### Return value

None (`undefined`).

## Examples

```js
gl.colorMask(true, true, true, false);
```

To get the current color mask, query the `COLOR_WRITEMASK` constant which
returns an `Array`.

```js
gl.getParameter(gl.COLOR_WRITEMASK);
// [true, true, true, false]
```

## See also

- `WebGLRenderingContext.depthMask()`
- `WebGLRenderingContext.stencilMask()`
