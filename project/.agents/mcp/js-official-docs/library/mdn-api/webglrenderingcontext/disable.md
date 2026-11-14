---
title: "WebGLRenderingContext: disable() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/disable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: disable() method

The **`WebGLRenderingContext.disable()`** method of the WebGL API disables specific WebGL
capabilities for this context.

## Syntax

```js
disable(capability)
```

### Parameters

- `capability`
    A `GLenum` specifying which WebGL capability to disable. Possible
    values:

    | Constant                      | Description                                                                                                                                         |
    | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `gl.BLEND`                    | Deactivates blending of the computed fragment color values. See `WebGLRenderingContext.blendFunc()`.                                   |
    | `gl.CULL_FACE`                | Deactivates culling of polygons. See `WebGLRenderingContext.cullFace()`.                                                               |
    | `gl.DEPTH_TEST`               | Deactivates depth comparisons and updates to the depth buffer. See `WebGLRenderingContext.depthFunc()`.                                |
    | `gl.DITHER`                   | Deactivates dithering of color components before they get written to the color buffer.                                                              |
    | `gl.POLYGON_OFFSET_FILL`      | Deactivates adding an offset to depth values of polygon's fragments. See `WebGLRenderingContext.polygonOffset()`.                      |
    | `gl.SAMPLE_ALPHA_TO_COVERAGE` | Deactivates the computation of a temporary coverage value determined by the alpha value.                                                            |
    | `gl.SAMPLE_COVERAGE`          | Deactivates ANDing the fragment's coverage with the temporary coverage value. See `WebGLRenderingContext.sampleCoverage()`.            |
    | `gl.SCISSOR_TEST`             | Deactivates the scissor test that discards fragments that are outside of the scissor rectangle. See `WebGLRenderingContext.scissor()`. |
    | `gl.STENCIL_TEST`             | Deactivates stencil testing and updates to the stencil buffer. See `WebGLRenderingContext.stencilFunc()`.                              |

    When using a `WebGL 2 context`, the
    following values are available additionally:

    | Constant                | Description                                                                                                                                                               |
    | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `gl.RASTERIZER_DISCARD` | Deactivates that primitives are discarded immediately before the rasterization stage, but after the optional transform feedback stage. `gl.clear()` commands are ignored. |

### Return value

None (`undefined`).

## Examples

```js
gl.disable(gl.DITHER);
```

To check if a capability is disabled, use the
`WebGLRenderingContext.isEnabled()` method:

```js
gl.isEnabled(gl.DITHER);
// false
```

## See also

- `WebGLRenderingContext.enable()`
- `WebGLRenderingContext.isEnabled()`
