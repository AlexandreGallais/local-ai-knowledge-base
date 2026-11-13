---
title: "WebGLRenderingContext: shaderSource() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/shadersource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: shaderSource() method

The **`WebGLRenderingContext.shaderSource()`** method of the WebGL API sets the source code of a
`WebGLShader`.

## Syntax

```js
shaderSource(shader, source)
```

### Parameters

- `shader`
    A `WebGLShader` object in which to set the source code.
- `source`
    A string containing the GLSL source code to set.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the specified `shader` is not of type `WebGLShader`.

## Examples

```js
const shader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(shader, originalSource);

const source = gl.getShaderSource(shader);
```

## See also

- `WebGLRenderingContext.createShader()`
- `WebGLRenderingContext.isShader()`
- `WebGLRenderingContext.deleteShader()`
- `WebGLRenderingContext.getShaderSource()`
