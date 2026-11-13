---
title: "WebGLRenderingContext: frontFace() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/frontface/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: frontFace() method

The **`WebGLRenderingContext.frontFace()`** method of the WebGL API specifies whether polygons are
front- or back-facing by setting a winding orientation.

## Syntax

```js
frontFace(mode)
```

### Parameters

- `mode`
    A GLenum type winding orientation.
    The default value is `gl.CCW`. Possible values:
    - `gl.CW`: Clock-wise winding.
    - `gl.CCW`: Counter-clock-wise winding.

### Return value

None (`undefined`).

## Examples

```js
gl.frontFace(gl.CW);
```

## See also

- `WebGLRenderingContext.cullFace()`
