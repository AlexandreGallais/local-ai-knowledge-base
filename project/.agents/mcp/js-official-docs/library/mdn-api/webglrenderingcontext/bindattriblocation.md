---
title: "WebGLRenderingContext: bindAttribLocation() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/bindattriblocation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: bindAttribLocation() method

The **`WebGLRenderingContext.bindAttribLocation()`** method of
the WebGL API binds a generic vertex index
to an attribute variable.

## Syntax

```js
bindAttribLocation(program, index, name)
```

### Parameters

- `program`
    A `WebGLProgram` object to bind.
- `index`
    A `GLuint` specifying the index of the generic vertex to bind.
- `name`
    A string specifying the name of the variable to bind to the
    generic vertex index. This name cannot start with `"webgl_"` or `"_webgl_"`, as these are
    reserved for use by WebGL.

### Return value

None (`undefined`).

## Examples

```js
gl.bindAttribLocation(program, colorLocation, "vColor");
```

## See also

- `WebGLRenderingContext.getActiveAttrib()`
- `WebGLRenderingContext.getAttribLocation()`
- `WebGLRenderingContext.getVertexAttrib()`
