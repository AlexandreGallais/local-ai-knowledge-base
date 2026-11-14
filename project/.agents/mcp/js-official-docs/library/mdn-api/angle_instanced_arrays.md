---
title: "ANGLE_instanced_arrays"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/angle_instanced_arrays/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ANGLE_instanced_arrays

The **`ANGLE_instanced_arrays`** extension is part of the WebGL API and allows you to draw the same object, or groups of similar objects multiple times, if they share the same vertex data, primitive count and type.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is only available to `WebGL1` contexts. In `WebGL2`, the functionality of this extension is available on the WebGL2 context by default and the constants and methods are available without the `ANGLE_` suffix.
>
> Despite the name "ANGLE", this extension works on any device if the hardware supports it and not just on Windows when using the ANGLE library. "ANGLE" just indicates that this extension has been written by the ANGLE library authors.

## Constants

This extension exposes one new constant, which can be used in the `gl.getVertexAttrib()` method:

- `ext.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE`
    Returns a `GLint` describing the frequency divisor used for instanced rendering when used in the `gl.getVertexAttrib()` as the `pname` parameter.

## Instance methods

This extension exposes three new methods.

- `ext.drawArraysInstancedANGLE()`
    Behaves identically to `gl.drawArrays()` except that multiple instances of the range of elements are executed, and the instance advances for each iteration.
- `ext.drawElementsInstancedANGLE()`
    Behaves identically to `gl.drawElements()` except that multiple instances of the set of elements are executed and the instance advances between each set.
- `ext.vertexAttribDivisorANGLE()`
    Modifies the rate at which generic vertex attributes advance when rendering multiple instances of primitives with `ext.drawArraysInstancedANGLE()` and `ext.drawElementsInstancedANGLE()`.

## Examples

The following example shows how to draw a given geometry multiple times with a single draw call.

> **Warning:**
> The following is educational, not production level code. It should generally be avoided to construct data / buffers within the rendering loop or right before use.

```js
// enable the extension
const ext = gl.getExtension("ANGLE_instanced_arrays");

// binding the geometry buffer as usual
gl.bindBuffer(gl.ARRAY_BUFFER, geometryVertexBuffer);
gl.enableVertexAttribArray(vertexPositionAttributeLocation);
gl.vertexAttribPointer(
  vertexPositionAttributeLocation,
  3,
  gl.FLOAT,
  false,
  0,
  0,
);

// build position buffer
const instancePositions = [];
for (const instance of instances) {
  instancePositions.push(
    instance.position.x,
    instance.position.y,
    instance.position.z,
  );
}
const instancePositionBuffer = createWebGLBufferFromData(instancePositions);

// binding the instance position buffer as you would with any attribute
gl.bindBuffer(gl.ARRAY_BUFFER, instancePositionBuffer);
gl.enableVertexAttribArray(instancePositionAttributeLocation);
gl.vertexAttribPointer(
  instancePositionAttributeLocation,
  3,
  gl.FLOAT,
  false,
  0,
  0,
);

// mark the attribute as instanced and advance it every single(1) instance rather than every vertex
ext.vertexAttribDivisorANGLE(instancePositionAttributeLocation, 1);

// draw geometry for each instance
ext.drawArraysInstancedANGLE(
  gl.TRIANGLES,
  0,
  numGeometryVertices,
  instances.length,
);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGL2RenderingContext.drawArraysInstanced()`
- `WebGL2RenderingContext.drawElementsInstanced()`
- `WebGL2RenderingContext.vertexAttribDivisor()`
