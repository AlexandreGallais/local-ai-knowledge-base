---
title: "WebGLRenderingContext: createProgram() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/createprogram/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: createProgram() method

The **`WebGLRenderingContext.createProgram()`** method of the
WebGL API creates and initializes a
`WebGLProgram` object.

## Syntax

```js
createProgram()
```

### Parameters

None.

### Return value

A `WebGLProgram` object that is a combination of two compiled
`WebGLShader`s consisting of a vertex shader and a fragment shader (both
written in GLSL). These are then linked into a usable program.

## Examples

### Creating a WebGL program

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

See `WebGLShader` for information on creating the
`vertexShader` and `fragmentShader` in the above example.

## See also

- `WebGLRenderingContext.deleteProgram()`
- `WebGLRenderingContext.isProgram()`
- `WebGLRenderingContext.linkProgram()`
- `WebGLRenderingContext.useProgram()`
- `WebGLRenderingContext.validateProgram()`
- `WebGLRenderingContext.getProgramParameter()`
- `WebGLRenderingContext.getProgramInfoLog()`
