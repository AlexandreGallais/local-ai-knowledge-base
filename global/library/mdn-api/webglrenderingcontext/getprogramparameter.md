---
title: "WebGLRenderingContext: getProgramParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getprogramparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getProgramParameter() method

The **`WebGLRenderingContext.getProgramParameter()`** method of
the WebGL API returns information about the
given program.

## Syntax

```js
getProgramParameter(program, pname)
```

### Parameters

- `program`
    A `WebGLProgram` to get parameter information from.
- `pname`
    A `GLenum` specifying the information to query. Possible values:
    - `gl.DELETE_STATUS`
        Returns a `GLboolean` indicating
        whether or not the program is flagged for deletion.
    - `gl.LINK_STATUS`
        Returns a `GLboolean` indicating
        whether or not the last link operation was successful.
    - `gl.VALIDATE_STATUS`
        Returns a `GLboolean` indicating
        whether or not the last validation operation was successful.
    - `gl.ATTACHED_SHADERS`
        Returns a `GLint` indicating the
        number of attached shaders to a program.
    - `gl.ACTIVE_ATTRIBUTES`
        Returns a `GLint` indicating the
        number of active attribute variables to a program.
    - `gl.ACTIVE_UNIFORMS`
        Returns a `GLint` indicating the
        number of active uniform variables to a program.

    When using a `WebGL 2 context`,
    the following values are available additionally:
    - `gl.TRANSFORM_FEEDBACK_BUFFER_MODE`
        Returns a
        `GLenum` indicating the buffer mode when transform feedback is
        active. May be `gl.SEPARATE_ATTRIBS` or
        `gl.INTERLEAVED_ATTRIBS`.
    - `gl.TRANSFORM_FEEDBACK_VARYINGS`
        Returns a `GLint`
        indicating the number of varying variables to capture in transform feedback
        mode.
    - `gl.ACTIVE_UNIFORM_BLOCKS`
        Returns a `GLint`
        indicating the number of uniform blocks containing active uniforms.

### Return value

Returns the requested program information (as specified with `pname`).

## Examples

```js
gl.getProgramParameter(program, gl.DELETE_STATUS);
```

## See also

- `WebGLRenderingContext.getShaderParameter()`
