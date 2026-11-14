---
title: "WebGLRenderingContext: getUniform() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getuniform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getUniform() method

The **`WebGLRenderingContext.getUniform()`** method of the WebGL API returns the value of a uniform
variable at a given location.

## Syntax

```js
getUniform(program, location)
```

### Parameters

- `program`
    A `WebGLProgram` containing the uniform attribute.
- `location`
    A `WebGLUniformLocation` object containing the location of the uniform
    attribute to get.

### Return value

The returned type depends on the uniform type:

       | Uniform type
       | Returned type

       | WebGL 1 only

       | `boolean`
       | `GLBoolean`

       | `int`
       | `GLint`

       | `float`
       | `GLfloat`

       | `vec2`
       | `Float32Array` (with 2 elements)

       | `ivec2`
       | `Int32Array` (with 2 elements)

       | `bvec2`
       |
        `Array` of
        `GLBoolean` (with 2
        elements)

       | `vec3`
       | `Float32Array` (with 3 elements)

       | `ivec3`
       | `Int32Array` (with 3 elements)

       | `bvec3`
       |
        `Array` of
        `GLBoolean` (with 3
        elements)

       | `vec4`
       | `Float32Array` (with 4 elements)

       | `ivec4`
       | `Int32Array` (with 4 elements)

       | `bvec4`
       |
        `Array` of
        `GLBoolean` (with 4
        elements)

       | `mat2`
       | `Float32Array` (with 4 elements)

       | `mat3`
       | `Float32Array` (with 9 elements)

       | `mat4`
       | `Float32Array` (with 16 elements)

       | `sampler2D`
       | `GLint`

       | `samplerCube`
       | `GLint`

       | Additionally available in WebGL 2

       | `uint`
       | `GLuint`

       | `uvec2`
       | `Uint32Array` (with 2 elements)

       | `uvec3`
       | `Uint32Array` (with 3 elements)

       | `uvec4`
       | `Uint32Array` (with 4 elements)

       | `mat2x3`
       | `Float32Array` (with 6 elements)

       | `mat2x4`
       | `Float32Array` (with 8 elements)

       | `mat3x2`
       | `Float32Array` (with 6 elements)

       | `mat3x4`
       | `Float32Array` (with 12 elements)

       | `mat4x2`
       | `Float32Array` (with 8 elements)

       | `mat4x3`
       | `Float32Array` (with 12 elements)

       | any sampler type
       | `GLint`

## Examples

```js
const loc = gl.getUniformLocation(program, "u_foobar");
gl.getUniform(program, loc);
```

## See also

- `WebGLUniformLocation`
- `WebGLRenderingContext.getActiveUniform()`
