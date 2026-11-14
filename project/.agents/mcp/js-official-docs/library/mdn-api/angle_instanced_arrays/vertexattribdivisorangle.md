---
title: "ANGLE_instanced_arrays: vertexAttribDivisorANGLE() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/angle_instanced_arrays/vertexattribdivisorangle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ANGLE_instanced_arrays: vertexAttribDivisorANGLE() method

The **ANGLE_instanced_arrays.vertexAttribDivisorANGLE()** method of the WebGL API modifies the rate at which generic vertex attributes advance when rendering multiple instances of primitives with `ext.drawArraysInstancedANGLE()` and `ext.drawElementsInstancedANGLE()`.

> **Note:**
> When using `WebGL2`, this method is available as `gl.vertexAttribDivisor()` by default.

## Syntax

```js
vertexAttribDivisorANGLE(index, divisor)
```

### Parameters

- `index`
    A `GLuint` specifying the index of the generic vertex attributes.
- `divisor`
    A `GLuint` specifying the number of instances that will pass <example-value> updates of the generic attribute.

### Return value

None (`undefined`).

## Examples

```js
const ext = gl.getExtension("ANGLE_instanced_arrays");
ext.vertexAttribDivisorANGLE(0, 2);
```

## See also

- `ext.drawArraysInstancedANGLE()`
- `ext.drawElementsInstancedANGLE()`
- `WebGLRenderingContext.drawArrays()`
- `WebGLRenderingContext.drawElements()`
- `WebGL2RenderingContext.drawArraysInstanced()`
- `WebGL2RenderingContext.drawElementsInstanced()`
- `WebGL2RenderingContext.vertexAttribDivisor()`
