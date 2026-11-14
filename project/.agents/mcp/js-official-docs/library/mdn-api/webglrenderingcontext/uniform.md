---
title: "WebGLRenderingContext: uniform[1234][fi][v]() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/uniform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: uniform[1234][fi][v]() method

The **`WebGLRenderingContext.uniform1234v`** methods
of the WebGL API specify values of uniform
variables. All active uniform variables defined in a program object are initialized to 0
when the program object is linked successfully. They retain the values assigned to them
by a call to this method until the next successful link operation occurs on the program
object, when they are once again initialized to 0.

> **Note:**
> Many of the functions described here have expanded WebGL 2 interfaces, which can be
> found under
> `WebGL2RenderingContext.uniform1234[v]()`.

## Syntax

```js
uniform1f(location, v0)
uniform1fv(location, value)
uniform1i(location, v0)
uniform1iv(location, value)

uniform2f(location, v0, v1)
uniform2fv(location, value)
uniform2i(location, v0, v1)
uniform2iv(location, value)

uniform3f(location, v0, v1, v2)
uniform3fv(location, value)
uniform3i(location, v0, v1, v2)
uniform3iv(location, value)

uniform4f(location, v0, v1, v2, v3)
uniform4fv(location, value)
uniform4i(location, v0, v1, v2, v3)
uniform4iv(location, value)
```

### Parameters

- `location`
    A `WebGLUniformLocation` object containing the location of the uniform
    attribute to modify.
- `value`, `v0`, `v1`, `v2`, `v3`
    A new value to be used for the uniform variable. Possible types:
    - A floating point `Number` for floating point values (methods with
      "f").
    - A sequence of floating point numbers (for example a `Float32Array`
      or an `Array` of numbers) for floating point vector methods (methods
      with "fv").
    - An integer `Number` for integer values (methods with "i").
    - An `Int32Array` for integer vector methods (methods with "iv").

### Return value

None (`undefined`).

## Examples

```js
gl.uniform1f(u_alpha, 0.8);
```

## See also

- `WebGLRenderingContext.uniformMatrix()`
