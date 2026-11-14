---
title: "WebGLRenderingContext: cullFace() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/cullface/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: cullFace() method

The **`WebGLRenderingContext.cullFace()`** method of the WebGL API specifies whether or not front-
and/or back-facing polygons can be culled.

## Syntax

```js
cullFace(mode)
```

### Parameters

- `mode`
    A `GLenum` specifying whether front- or back-facing polygons are
    candidates for culling. The default value is `gl.BACK`. Possible values
    are:
    - `gl.FRONT`
    - `gl.BACK`
    - `gl.FRONT_AND_BACK`

### Return value

None (`undefined`).

## Examples

Polygon culling is disabled by default. To enable or disable culling, use the
`enable()` and
`disable()` methods with the argument
`gl.CULL_FACE`.

```js
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.FRONT_AND_BACK);
```

To check the current cull face mode, query the `CULL_FACE_MODE` constant.

```js
gl.getParameter(gl.CULL_FACE_MODE) === gl.FRONT_AND_BACK;
// true
```

## See also

- `WebGLRenderingContext.enable()`
- `WebGLRenderingContext.frontFace()`
