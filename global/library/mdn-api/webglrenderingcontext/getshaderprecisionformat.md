---
title: "WebGLRenderingContext: getShaderPrecisionFormat() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getshaderprecisionformat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getShaderPrecisionFormat() method

The
**`WebGLRenderingContext.getShaderPrecisionFormat()`** method of
the WebGL API returns a new
`WebGLShaderPrecisionFormat` object describing the range and precision for
the specified shader numeric format.

## Syntax

```js
getShaderPrecisionFormat(shaderType, precisionType)
```

### Parameters

- `shaderType`
    Either a `gl.FRAGMENT_SHADER` or a `gl.VERTEX_SHADER`.
- `precisionType`
    A precision type value. Either `gl.LOW_FLOAT`,
    `gl.MEDIUM_FLOAT`, `gl.HIGH_FLOAT`, `gl.LOW_INT`,
    `gl.MEDIUM_INT`, or `gl.HIGH_INT`.

### Return value

A `WebGLShaderPrecisionFormat` object or `null`, if an error
occurs.

### Exceptions

- `gl.INVALID_ENUM` if the shader or precision types aren't recognized.
- `gl.INVALID_OPERATION` if the shader compiler isn't supported.

## Examples

The following code gets the precision format of a `gl.VERTEX_SHADER` with a
`gl.MEDIUM_FLOAT` precision type.

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT);
// WebGLShaderPrecisionFormat { rangeMin: 127, rangeMax: 127, precision: 23 }
```

## See also

- `WebGLShaderPrecisionFormat`
