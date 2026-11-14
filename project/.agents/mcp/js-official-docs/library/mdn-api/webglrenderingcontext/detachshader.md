---
title: "WebGLRenderingContext: detachShader() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/detachshader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: detachShader() method

The **`WebGLRenderingContext.detachShader()`** method of the WebGL API detaches a previously
attached `WebGLShader` from a `WebGLProgram`.

## Syntax

```js
detachShader(program, shader)
```

### Parameters

- `program`
    A `WebGLProgram`.
- `shader`
    A fragment or vertex `WebGLShader`.

### Return value

None (`undefined`).

## See also

- `WebGLProgram`
- `WebGLShader`
- `WebGLRenderingContext.attachShader()`
- `WebGLRenderingContext.compileShader()`
- `WebGLRenderingContext.createProgram()`
- `WebGLRenderingContext.createShader()`
- `WebGLRenderingContext.deleteProgram()`
- `WebGLRenderingContext.deleteShader()`
- `WebGLRenderingContext.getAttachedShaders()`
- `WebGLRenderingContext.getProgramParameter()`
- `WebGLRenderingContext.getProgramInfoLog()`
- `WebGLRenderingContext.getShaderParameter()`
- `WebGLRenderingContext.getShaderPrecisionFormat()`
- `WebGLRenderingContext.getShaderInfoLog()`
- `WebGLRenderingContext.getShaderSource()`
- `WebGLRenderingContext.isProgram()`
- `WebGLRenderingContext.isShader()`
- `WebGLRenderingContext.linkProgram()`
- `WebGLRenderingContext.shaderSource()`
- `WebGLRenderingContext.useProgram()`
- `WebGLRenderingContext.validateProgram()`
