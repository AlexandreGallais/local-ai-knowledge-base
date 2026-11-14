---
title: "WebGLRenderingContext: compileShader() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/compileshader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: compileShader() method

The **WebGLRenderingContext.compileShader()** method of the WebGL API compiles a GLSL shader into binary
data so that it can be used by a `WebGLProgram`.

## Syntax

```js
compileShader(shader)
```

### Parameters

- `shader`
    A fragment or vertex `WebGLShader`.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the specified `shader` is not of type `WebGLShader`.

## Examples

```js
const shader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(shader, shaderSource);
gl.compileShader(shader);
```

## See also

- `WebGLProgram`
- `WebGLShader`
- `WebGLRenderingContext.attachShader()`
- `WebGLRenderingContext.createProgram()`
- `WebGLRenderingContext.createShader()`
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
