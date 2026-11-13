---
title: "WebGLRenderingContext: attachShader() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/attachshader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: attachShader() method

The **WebGLRenderingContext.attachShader()** method of the WebGL API attaches either a fragment or
vertex `WebGLShader` to a `WebGLProgram`.

## Syntax

```js
attachShader(program, shader)
```

### Parameters

- `program`
    A `WebGLProgram`.
- `shader`
    A fragment or vertex `WebGLShader`.

### Return value

None (`undefined`).

## Examples

The following code attaches pre-existing shaders to a `WebGLProgram`.

```js
const program = gl.createProgram();

// Attach pre-existing shaders
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  const info = gl.getProgramInfoLog(program);
  throw new Error(`Could not compile WebGL program. \n\n${info}`);
}
```

## See also

- `WebGLProgram`
- `WebGLShader`
- `WebGLRenderingContext.compileShader()`
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
