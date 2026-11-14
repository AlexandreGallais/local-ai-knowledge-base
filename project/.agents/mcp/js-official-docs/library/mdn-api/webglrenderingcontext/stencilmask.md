---
title: "WebGLRenderingContext: stencilMask() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/stencilmask/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: stencilMask() method

The **`WebGLRenderingContext.stencilMask()`** method of the WebGL API controls enabling and disabling of
both the front and back writing of individual bits in the stencil planes.

The `WebGLRenderingContext.stencilMaskSeparate()` method can set front and
back stencil writemasks to different values.

## Syntax

```js
stencilMask(mask)
```

### Parameters

- `mask`
    A `GLuint` specifying a bit mask to enable or disable writing of
    individual bits in the stencil planes. By default, the mask is all 1.

### Return value

None (`undefined`).

## Examples

```js
gl.stencilMask(110101);
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
- `WebGLRenderingContext.stencilMaskSeparate()`
