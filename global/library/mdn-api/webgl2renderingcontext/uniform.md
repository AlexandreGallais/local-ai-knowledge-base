---
title: "WebGL2RenderingContext: uniform[1234][uif][v]() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/uniform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: uniform[1234][uif][v]() method

The **`WebGL2RenderingContext.uniform1234v`**
methods of the WebGL API specify values of
uniform variables.

The names of these methods are formed by:

- The number of components in the uniform variable (1, 2, 3, or 4).
- The type of the uniform variable (`i` for integer, `f` for float, `ui` for unsigned integer).
- The presence of a vector (`v`) suffix for vector types.

They can be matched by the regex `uniform1234v?`.

Most of these signatures are inherited from the WebGL 1 API. WebGL 2 adds the unsigned integer versions, and the additional `srcOffset` and `srcLength` parameters to the vector methods.

## Syntax

```js
uniform1ui(location, v0)
uniform2ui(location, v0, v1)
uniform3ui(location, v0, v1, v2)
uniform4ui(location, v0, v1, v2, v3)

uniform1fv(location, data)
uniform1fv(location, data, srcOffset)
uniform1fv(location, data, srcOffset, srcLength)

uniform2fv(location, data)
uniform2fv(location, data, srcOffset)
uniform2fv(location, data, srcOffset, srcLength)

uniform3fv(location, data)
uniform3fv(location, data, srcOffset)
uniform3fv(location, data, srcOffset, srcLength)

uniform4fv(location, data)
uniform4fv(location, data, srcOffset)
uniform4fv(location, data, srcOffset, srcLength)

uniform1iv(location, data)
uniform1iv(location, data, srcOffset)
uniform1iv(location, data, srcOffset, srcLength)

uniform2iv(location, data)
uniform2iv(location, data, srcOffset)
uniform2iv(location, data, srcOffset, srcLength)

uniform3iv(location, data)
uniform3iv(location, data, srcOffset)
uniform3iv(location, data, srcOffset, srcLength)

uniform4iv(location, data)
uniform4iv(location, data, srcOffset)
uniform4iv(location, data, srcOffset, srcLength)

uniform1uiv(location, data)
uniform1uiv(location, data, srcOffset)
uniform1uiv(location, data, srcOffset, srcLength)

uniform2uiv(location, data)
uniform2uiv(location, data, srcOffset)
uniform2uiv(location, data, srcOffset, srcLength)

uniform3uiv(location, data)
uniform3uiv(location, data, srcOffset)
uniform3uiv(location, data, srcOffset, srcLength)

uniform4uiv(location, data)
uniform4uiv(location, data, srcOffset)
uniform4uiv(location, data, srcOffset, srcLength)
```

### Parameters

- `location`
    A `WebGLUniformLocation` object containing the location of the uniform
    attribute to modify.
- `data`, `v0`, `v1`, `v2`, `v3`
    A new value to be used for the uniform variable. Possible types:
    - A `Number` for unsigned integer values (methods with `ui`), for integer values (methods with `i`), or for floats (methods with `f`).
    - A `Uint32Array` (or an `Array` of unsigned integer numbers) for unsigned integer vector methods (methods with `uiv`).
    - An `Int32Array` (or an `Array` of integer numbers) for integer vector methods (methods with `iv`).
    - A `Float32Array` (or an `Array` of numbers) for floating point vector methods (methods with `fv`).
- `srcOffset` (optional)
    A non-negative integer specifying the index of the first element in the `data` array to be used. Defaults to `0`.
- `srcLength` (optional)
    A non-negative integer specifying the number of elements in the `data` array to be used. Defaults to `0`, which gets treated as `data.length - srcOffset`. `srcOffset + srcLength` must be less than or equal to `data.length`.

### Return value

None (`undefined`).

## See also

- `WebGLRenderingContext.uniform1234[v]()`
