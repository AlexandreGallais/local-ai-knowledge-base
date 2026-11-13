---
title: "WebGL2RenderingContext: getFragDataLocation() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/getfragdatalocation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: getFragDataLocation() method

The **`WebGL2RenderingContext.getFragDataLocation()`** method
of the WebGL 2 API returns the binding of
color numbers to user-defined varying out variables.

## Syntax

```js
getFragDataLocation(program, name)
```

### Parameters

- `program`
    A `WebGLProgram` to query.
- `name`
    A string specifying the name of the user-defined varying out
    variable.

### Return value

A `GLint` indicating the assigned color number binding, or `-1`
otherwise.

## Examples

```js
// program is a linked WebGLProgram

gl.getFragDataLocation(program, "fragColor");
```

## See also

- `WebGLRenderingContext.createProgram()`
- `WebGLRenderingContext.deleteProgram()`
- `WebGLRenderingContext.isProgram()`
- `WebGLRenderingContext.linkProgram()`
- `WebGLRenderingContext.useProgram()`
- `WebGLRenderingContext.validateProgram()`
- `WebGLRenderingContext.getProgramParameter()`
- `WebGLRenderingContext.getProgramInfoLog()`
