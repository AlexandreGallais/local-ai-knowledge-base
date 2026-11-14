---
title: "WebGLRenderingContext: isProgram() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/isprogram/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: isProgram() method

The **`WebGLRenderingContext.isProgram()`** method of the WebGL API returns `true` if the
passed `WebGLProgram` is valid, `false` otherwise.

## Syntax

```js
isProgram(program)
```

### Parameters

- `program`
    A `WebGLProgram` to check.

### Return value

A `GLboolean` indicating whether or not the program is valid.

## Examples

### Checking a program

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const program = gl.createProgram();

// …

gl.isProgram(program);
```

## See also

- `WebGLRenderingContext.createProgram()`
- `WebGLRenderingContext.deleteProgram()`
- `WebGLRenderingContext.linkProgram()`
- `WebGLRenderingContext.useProgram()`
- `WebGLRenderingContext.validateProgram()`
- `WebGLRenderingContext.getProgramParameter()`
- `WebGLRenderingContext.getProgramInfoLog()`
