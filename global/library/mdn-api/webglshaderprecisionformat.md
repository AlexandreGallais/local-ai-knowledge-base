---
title: "WebGLShaderPrecisionFormat"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglshaderprecisionformat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLShaderPrecisionFormat

The **WebGLShaderPrecisionFormat** interface is part of the WebGL API and represents the information returned by calling the `WebGLRenderingContext.getShaderPrecisionFormat()` method.

## Instance properties

- `WebGLShaderPrecisionFormat.rangeMin` (read-only)
    The base 2 log of the absolute value of the minimum value that can be represented.
- `WebGLShaderPrecisionFormat.rangeMax` (read-only)
    The base 2 log of the absolute value of the maximum value that can be represented.
- `WebGLShaderPrecisionFormat.precision` (read-only)
    The number of bits of precision that can be represented. For integer formats this value is always 0.

## Examples

A `WebGLShaderPrecisionFormat` object is returned by the `WebGLRenderingContext.getShaderPrecisionFormat()` method.

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT);
// WebGLShaderPrecisionFormat { rangeMin: 127, rangeMax: 127, precision: 23 }
```

## See also

- `WebGLRenderingContext.getShaderPrecisionFormat()`
