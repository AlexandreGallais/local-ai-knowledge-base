---
title: "WebGLRenderingContext: isShader() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/isshader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: isShader() method

The **`WebGLRenderingContext.isShader()`** method of the WebGL API returns `true` if the
passed `WebGLShader` is valid, `false` otherwise.

## Syntax

```js
isShader(shader)
```

### Parameters

- `shader`
    A `WebGLShader` to check.

### Return value

A `GLboolean` indicating whether or not the shader is valid.

## Examples

### Checking a shader

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const shader = gl.createShader(gl.VERTEX_SHADER);

// …

gl.isShader(shader);
```

## See also

- `WebGLRenderingContext.createShader()`
- `WebGLRenderingContext.deleteShader()`
