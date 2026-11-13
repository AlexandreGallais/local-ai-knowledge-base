---
title: "WebGLRenderingContext: getAttachedShaders() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getattachedshaders/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getAttachedShaders() method

The **`WebGLRenderingContext.getAttachedShaders()`** method of
the WebGL API returns a list of
`WebGLShader` objects attached to a `WebGLProgram`.

## Syntax

```js
getAttachedShaders(program)
```

### Parameters

- `program`
    A `WebGLProgram` object to get attached shaders for.

### Return value

An `Array` of `WebGLShader` objects that are attached to the
given `WebGLProgram`.

## Examples

```js
const program = gl.createProgram();

// Attach pre-existing shaders
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

gl.getAttachedShaders(program);
```

## See also

- `WebGLRenderingContext.createShader()`
- `WebGLRenderingContext.isShader()`
- `WebGLRenderingContext.deleteShader()`
