---
title: "WebGLRenderingContext: depthFunc() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/depthfunc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: depthFunc() method

The **`WebGLRenderingContext.depthFunc()`** method of the WebGL API specifies a function that compares
incoming pixel depth to the current depth buffer value.

## Syntax

```js
depthFunc(func)
```

### Parameters

- `func`
    A `GLenum` specifying the depth comparison function, which sets the
    conditions under which the pixel will be drawn. The default value is
    `gl.LESS`. Possible values are:
    - `gl.NEVER` (never pass)
    - `gl.LESS` (pass if the incoming value is less than the depth buffer
      value)
    - `gl.EQUAL` (pass if the incoming value equals the depth buffer value)
    - `gl.LEQUAL` (pass if the incoming value is less than or equal to the
      depth buffer value)
    - `gl.GREATER` (pass if the incoming value is greater than the depth
      buffer value)
    - `gl.NOTEQUAL` (pass if the incoming value is not equal to the depth
      buffer value)
    - `gl.GEQUAL` (pass if the incoming value is greater than or equal to
      the depth buffer value)
    - `gl.ALWAYS` (always pass)

### Return value

None (`undefined`).

## Examples

The depth testing is disabled by default. To enable or disable depth testing, use the
`enable()` and
`disable()` methods with the argument
`gl.DEPTH_TEST`.

```js
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.NEVER);
```

To check the current depth function, query the `DEPTH_FUNC` constant.

```js
gl.getParameter(gl.DEPTH_FUNC) === gl.NEVER;
// true
```

## See also

- `WebGLRenderingContext.enable()`
