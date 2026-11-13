---
title: "WebGLShaderPrecisionFormat: rangeMax property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglshaderprecisionformat/rangemax/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLShaderPrecisionFormat: rangeMax property

The read-only **`WebGLShaderPrecisionFormat.rangeMax`** property returns the base 2 log of the absolute value of the maximum value that can be represented.

## Examples

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMax; // 127
gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMax; // 24
```

## See also

- `WebGLShaderPrecisionFormat`
- `WebGLRenderingContext.getShaderPrecisionFormat()`
