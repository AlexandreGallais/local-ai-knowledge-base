---
title: "WebGLRenderingContext: getShaderParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getshaderparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getShaderParameter() method

The **`WebGLRenderingContext.getShaderParameter()`** method of
the WebGL API returns information about the
given shader.

## Syntax

```js
getShaderParameter(shader, pname)
```

### Parameters

- `shader`
    A `WebGLShader` to get parameter information from.
- `pname`
    A `GLenum` specifying the information to query. Possible values:
    - `gl.DELETE_STATUS`
        Returns a `GLboolean` indicating
        whether or not the shader is flagged for deletion.
    - `gl.COMPILE_STATUS`
        Returns a `GLboolean` indicating
        whether or not the last shader compilation was successful.
    - `gl.SHADER_TYPE`
        Returns a `GLenum` indicating whether
        the shader is a vertex shader (`gl.VERTEX_SHADER`) or fragment shader
        (`gl.FRAGMENT_SHADER`) object.

### Return value

Returns the requested shader information (as specified with `pname`).

## Examples

```js
gl.getShaderParameter(shader, gl.SHADER_TYPE);
```

## See also

- `WebGLRenderingContext.getProgramParameter()`
