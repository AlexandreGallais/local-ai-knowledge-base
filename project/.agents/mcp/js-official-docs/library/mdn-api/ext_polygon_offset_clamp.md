---
title: "EXT_polygon_offset_clamp extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_polygon_offset_clamp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_polygon_offset_clamp extension

The **`EXT_polygon_offset_clamp`** extension is part of the WebGL API and adds a limit to the depth offset set with `polygonOffset()`.

The depth offset of a polygon grows with its slope, so polygons that are almost parallel to the view direction can get very large offsets. In shadow mapping, this can push shadow-casting polygons behind the surfaces they should shadow, which shows up as holes in the shadows. Limiting the offset to a maximum value avoids this.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method. For more information, see also Using Extensions in the WebGL tutorial.

> **Note:**
> This extension is available to both `WebGL1` and `WebGL2` contexts. Support depends on the system's graphics driver.

## Constants

- `ext.POLYGON_OFFSET_CLAMP_EXT`
    A `GLenum` to pass to `getParameter()` to get the current offset limit, as a `GLfloat`. The default value is `0`.

## Instance methods

- `ext.polygonOffsetClampEXT()`
    Sets the scale factor and units used to calculate depth offsets, and a limit for the resulting offset.

## Examples

### Limiting the depth offset

The depth offset applies only when `gl.POLYGON_OFFSET_FILL` is enabled. This example sets the same factor and units as `polygonOffset(2, 3)` would, and also limits the offset to `0.001`:

```js
const ext = gl.getExtension("EXT_polygon_offset_clamp");

gl.enable(gl.POLYGON_OFFSET_FILL);
ext.polygonOffsetClampEXT(2, 3, 0.001);

gl.getParameter(ext.POLYGON_OFFSET_CLAMP_EXT); // 0.0010000000474974513
```

The value is stored as a 32-bit float, so it reads back as the nearest 32-bit value to `0.001`.

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.polygonOffset()`
