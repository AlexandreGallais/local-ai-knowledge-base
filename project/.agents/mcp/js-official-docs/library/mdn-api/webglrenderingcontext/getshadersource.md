---
title: "WebGLRenderingContext: getShaderSource() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getshadersource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getShaderSource() method

The **`WebGLRenderingContext.getShaderSource()`** method of the
WebGL API returns the source code of a
`WebGLShader` as a string.

## Syntax

```js
getShaderSource(shader)
```

### Parameters

- `shader`
    A `WebGLShader` object to get the source code from.

### Return value

A string containing the source code of the shader.

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
