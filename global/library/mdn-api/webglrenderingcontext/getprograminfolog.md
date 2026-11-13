---
title: "WebGLRenderingContext: getProgramInfoLog() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getprograminfolog/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getProgramInfoLog() method

The **WebGLRenderingContext.getProgramInfoLog** returns the information
log for the specified `WebGLProgram` object. It contains errors that
occurred during failed linking or validation of `WebGLProgram` objects.

## Syntax

```js
getProgramInfoLog(program)
```

### Parameters

- `program`
    The `WebGLProgram` to query.

### Return value

A string that contains diagnostic messages, warning messages, and
other information about the last linking or validation operation. When a
`WebGLProgram` object is initially created, its information log will be a
string of length 0.

## Examples

### Checking program errors

```js
const program = gl.createProgram();

// Attach pre-existing shaders
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

gl.getProgramInfoLog(program);
```

## See also

- `WebGLRenderingContext.getShaderInfoLog()`
- `WebGLRenderingContext.getError()`
