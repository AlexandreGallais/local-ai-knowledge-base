---
title: "WebGLRenderingContext: createShader() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/createshader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: createShader() method

The `WebGLRenderingContext`
method **`createShader()`** of the WebGL API creates a
`WebGLShader` that can then be configured further using
`WebGLRenderingContext.shaderSource()` and
`WebGLRenderingContext.compileShader()`.

## Syntax

```js
createShader(type)
```

### Parameters

- `type`
    Either `gl.VERTEX_SHADER` or `gl.FRAGMENT_SHADER`. The `WebGLRenderingContext` will set the `gl.INVALID_ENUM` error flag if an unacceptable value has been specified.

### Return value

A new `WebGLShader` instance, or `null` if an error occurs creating the shader (for example, because `type` was an invalid value).

## Examples

See `WebGLShader` for usage and examples.

## See also

- `WebGLProgram`
- `WebGLShader`
- `WebGLRenderingContext.attachShader()`
- `WebGLRenderingContext.bindAttribLocation()`
- `WebGLRenderingContext.compileShader()`
- `WebGLRenderingContext.createProgram()`
- `WebGLRenderingContext.deleteProgram()`
- `WebGLRenderingContext.deleteShader()`
- `WebGLRenderingContext.detachShader()`
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
