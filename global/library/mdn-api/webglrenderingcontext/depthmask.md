---
title: "WebGLRenderingContext: depthMask() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/depthmask/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: depthMask() method

The **`WebGLRenderingContext.depthMask()`** method of the WebGL API sets whether writing into the depth
buffer is enabled or disabled.

## Syntax

```js
depthMask(flag)
```

### Parameters

- `flag`
    A `GLboolean` specifying whether or not writing into the depth buffer
    is enabled. Default value: `true`, meaning that writing is enabled.

### Return value

None (`undefined`).

## Examples

```js
gl.depthMask(false);
```

To get the current depth mask, query the `DEPTH_WRITEMASK` constant which
returns a boolean value.

```js
gl.getParameter(gl.DEPTH_WRITEMASK);
// false
```

## See also

- `WebGLRenderingContext.colorMask()`
- `WebGLRenderingContext.stencilMask()`
