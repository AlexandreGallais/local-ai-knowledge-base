---
title: "WebGL2RenderingContext: vertexAttribDivisor() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/vertexattribdivisor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: vertexAttribDivisor() method

The **`WebGL2RenderingContext.vertexAttribDivisor()`** method
of the WebGL 2 API modifies the rate at
which generic vertex attributes advance when rendering multiple instances of primitives
with `gl.drawArraysInstanced()` and `gl.drawElementsInstanced()`.

> **Note:**
> When using `WebGL 1`, the `ANGLE_instanced_arrays` extension can provide this method,
> too.

## Syntax

```js
vertexAttribDivisor(index, divisor)
```

### Parameters

- `index`
    A `GLuint` specifying the index of the generic vertex attributes.
- `divisor`
    A `GLuint` specifying the number of instances that will pass <example-value>
    updates of the generic attribute.

### Return value

None (`undefined`).

## Examples

```js
gl.vertexAttribDivisor(0, 2);
```

## See also

- `ANGLE_instanced_arrays.vertexAttribDivisorANGLE()`
