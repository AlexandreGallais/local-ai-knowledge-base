---
title: "WebGLRenderingContext: getShaderInfoLog() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getshaderinfolog/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getShaderInfoLog() method

The **WebGLRenderingContext.getShaderInfoLog** returns the information log
for the specified `WebGLShader` object. It contains warnings, debugging and
compile information.

## Syntax

```js
getShaderInfoLog(shader)
```

### Parameters

- `shader`
    A `WebGLShader` to query.

### Return value

A string that contains diagnostic messages, warning messages, and
other information about the last compile operation. When a `WebGLShader`
object is initially created, its information log will be a string of length 0.

## Examples

### Checking compilation messages

```js
/* load shader source code. */
gl.shaderSource(shader, shaderCode);

/* compile shader source code. */
gl.compileShader(shader);

const message = gl.getShaderInfoLog(shader);

if (message.length > 0) {
  /* message may be an error or a warning */
  throw message;
}
```

## See also

- `WebGLRenderingContext.getShaderParameter()` – used with
  `gl.COMPILE_STATUS` to check for a failed compile.
- `WebGLRenderingContext.getError()`
