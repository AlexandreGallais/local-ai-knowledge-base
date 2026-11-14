---
title: "WebGLUniformLocation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgluniformlocation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLUniformLocation

The **WebGLUniformLocation** interface is part of the WebGL API and represents the location of a uniform variable in a shader program.

## Description

The `WebGLUniformLocation` object does not define any methods or properties of its own and its content is not directly accessible. When working with `WebGLUniformLocation` objects, the following methods of the `WebGLRenderingContext` are useful:

- `WebGLRenderingContext.getUniformLocation()`
- `WebGLRenderingContext.uniform()`

## Examples

### Getting a uniform location

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

const location = gl.getUniformLocation(WebGLProgram, "uniformName");
```

## See also

- `WebGLRenderingContext.getUniformLocation()`
