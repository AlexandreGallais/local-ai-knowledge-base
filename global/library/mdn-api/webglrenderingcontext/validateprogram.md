---
title: "WebGLRenderingContext: validateProgram() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/validateprogram/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: validateProgram() method

The **`WebGLRenderingContext.validateProgram()`** method of the
WebGL API validates a
`WebGLProgram`. It checks if it is successfully linked and if it can be
used in the current WebGL state.

## Syntax

```js
validateProgram(program)
```

### Parameters

- `program`
    A `WebGLProgram` to validate.

### Return value

None (`undefined`).

## Examples

```js
const program = gl.createProgram();

// Attach pre-existing shaders
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
gl.validateProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  const info = gl.getProgramInfoLog(program);
  throw new Error(`Could not compile WebGL program. \n\n${info}`);
}

gl.useProgram(program);
```

## See also

- `WebGLRenderingContext.createProgram()`
- `WebGLRenderingContext.deleteProgram()`
- `WebGLRenderingContext.isProgram()`
- `WebGLRenderingContext.linkProgram()`
- `WebGLRenderingContext.useProgram()`
- `WebGLRenderingContext.getProgramParameter()`
- `WebGLRenderingContext.getProgramInfoLog()`
