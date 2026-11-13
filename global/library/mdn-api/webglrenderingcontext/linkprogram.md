---
title: "WebGLRenderingContext: linkProgram() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/linkprogram/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: linkProgram() method

The `WebGLRenderingContext` interface's
**`linkProgram()`** method links a given
`WebGLProgram`, completing the process of preparing the GPU code for the
program's fragment and vertex shaders.

## Syntax

```js
linkProgram(program)
```

### Parameters

- `program`
    The `WebGLProgram` to link.

### Return value

None (`undefined`).

## Examples

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

- `WebGLRenderingContext.createProgram()`
- `WebGLRenderingContext.deleteProgram()`
- `WebGLRenderingContext.isProgram()`
- `WebGLRenderingContext.useProgram()`
- `WebGLRenderingContext.validateProgram()`
- `WebGLRenderingContext.getProgramParameter()`
- `WebGLRenderingContext.getProgramInfoLog()`
