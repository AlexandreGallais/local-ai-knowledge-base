---
title: "WebGLRenderingContext: stencilMaskSeparate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/stencilmaskseparate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: stencilMaskSeparate() method

The **`WebGLRenderingContext.stencilMaskSeparate()`** method of
the WebGL API controls enabling and
disabling of front and/or back writing of individual bits in the stencil planes.

The `WebGLRenderingContext.stencilMask()` method can set both, the front
and back stencil writemasks to one value at the same time.

## Syntax

```js
stencilMaskSeparate(face, mask)
```

### Parameters

- `face`
    A `GLenum` specifying whether the front and/or back stencil writemask
    is updated. The possible values are:
    - `gl.FRONT`
    - `gl.BACK`
    - `gl.FRONT_AND_BACK`

- `mask`
    A `GLuint` specifying a bit mask to enable or disable writing of
    individual bits in the stencil planes. By default, the mask is all 1.

### Return value

None (`undefined`).

## Examples

```js
gl.stencilMaskSeparate(gl.FRONT, 110101);
```

To get the current stencil masks, query the `STENCIL_WRITEMASK`,
`STENCIL_BACK_WRITEMASK`, or `STENCIL_BITS` constants.

```js
gl.getParameter(gl.STENCIL_WRITEMASK);
// 110101
gl.getParameter(gl.STENCIL_BACK_WRITEMASK);
// 110101
gl.getParameter(gl.STENCIL_BITS);
// 0
```

## See also

- `WebGLRenderingContext.colorMask()`
- `WebGLRenderingContext.depthMask()`
- `WebGLRenderingContext.stencilMask()`
