---
title: "WebGLRenderingContext: getAttribLocation() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getattriblocation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getAttribLocation() method

The **`WebGLRenderingContext.getAttribLocation()`** method of
the WebGL API returns the location of an
attribute variable in a given `WebGLProgram`.

## Syntax

```js
getAttribLocation(program, name)
```

### Parameters

- `program`
    A `WebGLProgram` containing the attribute variable.
- `name`
    A string specifying the name of the attribute variable whose
    location to get.

### Return value

A `GLint` number indicating the location of the variable name if found.
Returns -1 otherwise.

## Examples

```js
gl.getAttribLocation(program, "vColor");
```

## See also

- `WebGLRenderingContext.getUniformLocation()`
