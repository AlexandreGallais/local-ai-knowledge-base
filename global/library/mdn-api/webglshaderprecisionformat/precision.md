---
title: "WebGLShaderPrecisionFormat: precision property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglshaderprecisionformat/precision/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLShaderPrecisionFormat: precision property

The read-only **`WebGLShaderPrecisionFormat.precision`** property returns the number of bits of precision that can be represented.

For integer formats this value is always 0.

## Examples

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision; // 23
gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).precision; // 0
```

## See also

- `WebGLShaderPrecisionFormat`
- `WebGLRenderingContext.getShaderPrecisionFormat()`
