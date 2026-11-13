---
title: "WebGLRenderingContext: useProgram() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/useprogram/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: useProgram() method

The **`WebGLRenderingContext.useProgram()`** method of the WebGL API sets the specified
`WebGLProgram` as part of the current rendering state.

## Syntax

```js
useProgram(program)
```

### Parameters

- `program`
    A `WebGLProgram` to use.

### Return value

None (`undefined`).

## Examples

```js
const program = gl.createProgram();

// Attach pre-existing shaders
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
gl.useProgram(program);
```

## See also

- `WebGLRenderingContext.createProgram()`
- `WebGLRenderingContext.deleteProgram()`
- `WebGLRenderingContext.isProgram()`
- `WebGLRenderingContext.linkProgram()`
- `WebGLRenderingContext.validateProgram()`
- `WebGLRenderingContext.getProgramParameter()`
- `WebGLRenderingContext.getProgramInfoLog()`
