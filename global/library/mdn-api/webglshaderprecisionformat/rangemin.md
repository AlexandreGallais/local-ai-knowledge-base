---
title: "WebGLShaderPrecisionFormat: rangeMin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglshaderprecisionformat/rangemin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLShaderPrecisionFormat: rangeMin property

The read-only **`WebGLShaderPrecisionFormat.rangeMin`** property returns the base 2 log of the absolute value of the minimum value that can be represented.

## Examples

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMin; // 127
gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMin; // 24
```

## See also

- `WebGLShaderPrecisionFormat`
- `WebGLRenderingContext.getShaderPrecisionFormat()`
