---
title: "EXT_polygon_offset_clamp: polygonOffsetClampEXT() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_polygon_offset_clamp/polygonoffsetclampext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_polygon_offset_clamp: polygonOffsetClampEXT() method

The **`polygonOffsetClampEXT()`** method of the `EXT_polygon_offset_clamp` extension of the WebGL API specifies the scale factor and units used to calculate depth offsets, like `WebGLRenderingContext.polygonOffset()`, and a limit for the resulting offset.

The offset is computed from `factor` and `units` in the same way as with `polygonOffset()`, then limited by `clamp`:

- If `clamp` is positive, the offset is at most `clamp`.
- If `clamp` is negative, the offset is at least `clamp`.
- If `clamp` is `0` or `NaN`, the offset isn't limited.

Calling `polygonOffset()` is the same as calling `polygonOffsetClampEXT()` with a `clamp` of `0`, so it removes the limit.

The depth offset applies only when `gl.POLYGON_OFFSET_FILL` is enabled with `WebGLRenderingContext.enable()`.

## Syntax

```js
polygonOffsetClampEXT(factor, units, clamp)
```

### Parameters

- `factor`
    A `GLfloat` which sets the scale factor for the variable depth offset for each polygon. The default value is 0.
- `units`
    A `GLfloat` which sets the multiplier by which an implementation-specific value is multiplied with to create a constant depth offset. The default value is 0.
- `clamp`
    A `GLfloat` which sets the maximum (if positive) or minimum (if negative) depth offset. The default value is 0, which means no limit.

### Return value

None (`undefined`).

## Examples

### Limiting the depth offset

This example enables the depth offset, sets a factor of `2` and units of `3`, and limits the offset to `0.001`:

```js
const ext = gl.getExtension("EXT_polygon_offset_clamp");

gl.enable(gl.POLYGON_OFFSET_FILL);
ext.polygonOffsetClampEXT(2, 3, 0.001);
```

To check the current values, query the `POLYGON_OFFSET_FACTOR`, `POLYGON_OFFSET_UNITS`, and `POLYGON_OFFSET_CLAMP_EXT` constants:

```js
gl.getParameter(gl.POLYGON_OFFSET_FACTOR); // 2
gl.getParameter(gl.POLYGON_OFFSET_UNITS); // 3
gl.getParameter(ext.POLYGON_OFFSET_CLAMP_EXT); // 0.0010000000474974513
```

## See also

- `EXT_polygon_offset_clamp`
- `WebGLRenderingContext.polygonOffset()`
- `WebGLRenderingContext.getParameter()`
