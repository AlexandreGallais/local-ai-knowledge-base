---
title: "WEBGL_multi_draw extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_multi_draw/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_multi_draw extension

The **`WEBGL_multi_draw`** extension is part of the
WebGL API and allows you to render more
than one primitive with a single function call. This can improve a WebGL application's performance
as it reduces binding costs in the renderer and speeds up GPU thread time with uniform data.

When this extension is enabled:

- New methods that handle multiple lists of arguments in one call are added
  (see method list below).
- The `gl_DrawID` built-in is added to the shading language.

> **Note:**
> This extension is available to both,
> `WebGL 1` and
> `WebGL 2` contexts.
>
> In shader code, the directive `#extension GL_ANGLE_multi_draw`
> needs to be called to enable the extension.
>
> This extension enables the `ANGLE_instanced_arrays` extension implicitly.

## Instance methods

- `ext.multiDrawArraysWEBGL()`
    Renders multiple primitives from array data (identical to multiple calls to
    `drawArrays`).
- `ext.multiDrawElementsWEBGL()`
    Renders multiple primitives from element array data (identical to multiple calls to
    `drawElements`).
- `ext.multiDrawArraysInstancedWEBGL()`
    Renders multiple primitives from array data (identical to multiple calls to
    `drawArraysInstanced`).
- `ext.multiDrawElementsInstancedWEBGL()`
    Renders multiple primitives from element array data (identical to multiple calls to
    `drawElementsInstanced`).

## Shader extension

Note: Although the extension name is named `WEBGL_multi_draw`,
the extension must be enabled with the `#extension GL_ANGLE_multi_draw`
directive to use the extension in a shader.

When this extension is enabled, the `gl_DrawID` built-in can be used
in shader code. For any `multi*` draw call variant,
the index of the draw `i` may be read by the vertex shader
as `gl_DrawID`. For non-`multi*` calls, the value of
`gl_DrawID` is `0`.

```html
<script type="x-shader/x-vertex">
  #extension GL_ANGLE_multi_draw : require
  void main() {
    gl_Position = vec4(gl_DrawID, 0, 0, 1);
  }
</script>
```

## Examples

### Enabling the extension

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

```js
let ext = gl.getExtension("WEBGL_multi_draw");
```

### Drawing multiple arrays

Example calls for `ext.multiDrawArraysWEBGL()`
and `ext.multiDrawArraysInstancedWEBGL()`:

```js
// multiDrawArrays variant
const firsts = new Int32Array(/* … */);
const counts = new Int32Array(/* … */);
ext.multiDrawArraysWEBGL(gl.TRIANGLES, firsts, 0, counts, 0, firsts.length);
```

```js
// multiDrawArraysInstanced variant
const firsts = new Int32Array(/* … */);
const counts = new Int32Array(/* … */);
const instanceCounts = new Int32Array(/* … */);
ext.multiDrawArraysInstancedWEBGL(
  gl.TRIANGLES,
  firsts,
  0,
  counts,
  0,
  instanceCounts,
  0,
  firsts.length,
);
```

### Drawing multiple elements

Example calls for `ext.multiDrawElementsWEBGL()`
and `ext.multiDrawElementsInstancedWEBGL()`.

Assumes that the indices which have been previously uploaded to the
`ELEMENT_ARRAY_BUFFER` are to be treated as `UNSIGNED_SHORT`.

```js
// multiDrawElements variant
const counts = new Int32Array(/* … */);
const offsets = new Int32Array(/* … */);
ext.multiDrawElementsWEBGL(
  gl.TRIANGLES,
  counts,
  0,
  gl.UNSIGNED_SHORT,
  offsets,
  0,
  counts.length,
);
```

```js
// multiDrawElementsInstanced variant
const counts = new Int32Array(/* … */);
const offsets = new Int32Array(/* … */);
const instanceCounts = new Int32Array(/* … */);
ext.multiDrawElementsInstancedWEBGL(
  gl.TRIANGLES,
  counts,
  0,
  gl.UNSIGNED_SHORT,
  offsets,
  0,
  instanceCounts,
  0,
  counts.length,
);
```

## See also

- `WebGLRenderingContext.drawArrays()`
- `WebGLRenderingContext.drawElements()`
- `ANGLE_instanced_arrays.drawArraysInstancedANGLE()` or
  in WebGL 2: `WebGL2RenderingContext.drawArraysInstanced()`
- `ANGLE_instanced_arrays.drawElementsInstancedANGLE()` or
  in WebGL 2: `WebGL2RenderingContext.drawElementsInstanced()`
