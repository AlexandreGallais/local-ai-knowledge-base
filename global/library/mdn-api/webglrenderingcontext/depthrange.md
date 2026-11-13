---
title: "WebGLRenderingContext: depthRange() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/depthrange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: depthRange() method

The **`WebGLRenderingContext.depthRange()`** method of the WebGL API specifies the depth range mapping
from normalized device coordinates to window or viewport coordinates.

## Syntax

```js
depthRange(zNear, zFar)
```

### Parameters

- `zNear`
    A `GLclampf` specifying the mapping of the near clipping plane to
    window or viewport coordinates. Clamped to the range 0 to 1 and must be less than or
    equal to `zFar`. The default value is 0.
- `zFar`
    A `GLclampf` specifying the mapping of the far clipping plane to window
    or viewport coordinates. Clamped to the range 0 to 1. The default value
    is 1.

### Return value

None (`undefined`).

## Examples

```js
gl.depthRange(0.2, 0.6);
```

To check the current depth range, query the `DEPTH_RANGE` constant which
returns a `Float32Array`

```js
gl.getParameter(gl.DEPTH_RANGE);
// Float32Array[0.2, 0.6]
```

## See also

- `WebGLRenderingContext.viewport()`
- `WebGLRenderingContext.depthFunc()`
