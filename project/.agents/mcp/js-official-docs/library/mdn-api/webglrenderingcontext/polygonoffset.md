---
title: "WebGLRenderingContext: polygonOffset() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/polygonoffset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: polygonOffset() method

The **`WebGLRenderingContext.polygonOffset()`** method of the
WebGL API specifies the scale factors and
units to calculate depth values.

The offset is added before the depth test is performed and before the value is written
into the depth buffer.

## Syntax

```js
polygonOffset(factor, units)
```

### Parameters

- `factor`
    A `GLfloat` which sets the scale factor for the variable depth offset
    for each polygon. The default value is 0.
- `units`
    A `GLfloat` which sets the multiplier by which an
    implementation-specific value is multiplied with to create a constant depth offset.
    The default value is 0.

### Return value

None (`undefined`).

## Examples

The polygon offset fill is disabled by default. To enable or disable polygon offset
fill, use the `enable()` and
`disable()` methods with the argument
`gl.POLYGON_OFFSET_FILL`.

```js
gl.enable(gl.POLYGON_OFFSET_FILL);
gl.polygonOffset(2, 3);
```

To check the current polygon offset factor or units, query the
`POLYGON_OFFSET_FACTOR` and `POLYGON_OFFSET_UNITS` constants.

```js
gl.getParameter(gl.POLYGON_OFFSET_FACTOR); // 2
gl.getParameter(gl.POLYGON_OFFSET_UNITS); // 3
```

## See also

- `WebGLRenderingContext.depthFunc()`
- `EXT_polygon_offset_clamp.polygonOffsetClampEXT()`
