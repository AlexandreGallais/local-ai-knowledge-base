---
title: "WebGLRenderingContext: deleteProgram() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/deleteprogram/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: deleteProgram() method

The **`WebGLRenderingContext.deleteProgram()`** method of the
WebGL API deletes a given
`WebGLProgram` object. This method has no effect if the program has already
been deleted.

## Syntax

```js
deleteProgram(program)
```

### Parameters

- `program`
    A `WebGLProgram` object to delete.

### Return value

None (`undefined`).

## Examples

### Deleting a program

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const program = gl.createProgram();

// …

gl.deleteProgram(program);
```

## See also

- `WebGLRenderingContext.createProgram()`
- `WebGLRenderingContext.isProgram()`
- `WebGLRenderingContext.linkProgram()`
- `WebGLRenderingContext.useProgram()`
- `WebGLRenderingContext.validateProgram()`
- `WebGLRenderingContext.getProgramParameter()`
- `WebGLRenderingContext.getProgramInfoLog()`
