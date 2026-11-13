---
title: "WebGLRenderingContext: enable() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/enable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: enable() method

The **`WebGLRenderingContext.enable()`** method of the WebGL API enables specific WebGL capabilities
for this context.

## Syntax

```js
enable(cap)
```

### Parameters

- `cap`
    A `GLenum` specifying which WebGL capability to enable. Possible
    values:

    | Constant                      | Description                                                                                                                                       |
    | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `gl.BLEND`                    | Activates blending of the computed fragment color values. See `WebGLRenderingContext.blendFunc()`.                                   |
    | `gl.CULL_FACE`                | Activates culling of polygons. See `WebGLRenderingContext.cullFace()`.                                                               |
    | `gl.DEPTH_TEST`               | Activates depth comparisons and updates to the depth buffer. See `WebGLRenderingContext.depthFunc()`.                                |
    | `gl.DITHER`                   | Activates dithering of color components before they get written to the color buffer.                                                              |
    | `gl.POLYGON_OFFSET_FILL`      | Activates adding an offset to depth values of polygon's fragments. See `WebGLRenderingContext.polygonOffset()`.                      |
    | `gl.SAMPLE_ALPHA_TO_COVERAGE` | Activates the computation of a temporary coverage value determined by the alpha value.                                                            |
    | `gl.SAMPLE_COVERAGE`          | Activates ANDing the fragment's coverage with the temporary coverage value. See `WebGLRenderingContext.sampleCoverage()`.            |
    | `gl.SCISSOR_TEST`             | Activates the scissor test that discards fragments that are outside of the scissor rectangle. See `WebGLRenderingContext.scissor()`. |
    | `gl.STENCIL_TEST`             | Activates stencil testing and updates to the stencil buffer. See `WebGLRenderingContext.stencilFunc()`.                              |

    When using a `WebGL 2 context`, the
    following values are available additionally:

    | Constant                | Description                                                                                                                                              |
    | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `gl.RASTERIZER_DISCARD` | Primitives are discarded immediately before the rasterization stage, but after the optional transform feedback stage. `gl.clear()` commands are ignored. |

### Return value

None (`undefined`).

## Examples

```js
gl.enable(gl.DITHER);
```

To check if a capability is enabled, use the
`WebGLRenderingContext.isEnabled()` method:

```js
gl.isEnabled(gl.DITHER);
// true
```

## See also

- `WebGLRenderingContext.disable()`
- `WebGLRenderingContext.isEnabled()`
