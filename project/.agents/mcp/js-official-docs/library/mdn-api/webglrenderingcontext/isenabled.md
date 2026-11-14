---
title: "WebGLRenderingContext: isEnabled() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/isenabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: isEnabled() method

The **`WebGLRenderingContext.isEnabled()`** method of the WebGL API tests whether a specific WebGL
capability is enabled or not for this context.

By default, all capabilities except `gl.DITHER` are
**disabled**.

## Syntax

```js
isEnabled(cap)
```

### Parameters

- `cap`
    A `GLenum` specifying which WebGL capability to test. Possible values:

    | Constant                      | Description                                                                                                                         |
    | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
    | `gl.BLEND`                    | Blending of the computed fragment color values. See `WebGLRenderingContext.blendFunc()`.                               |
    | `gl.CULL_FACE`                | Culling of polygons. See `WebGLRenderingContext.cullFace()`.                                                           |
    | `gl.DEPTH_TEST`               | Depth comparisons and updates to the depth buffer. See `WebGLRenderingContext.depthFunc()`.                            |
    | `gl.DITHER`                   | Dithering of color components before they get written to the color buffer.                                                          |
    | `gl.POLYGON_OFFSET_FILL`      | Adding an offset to depth values of polygon's fragments. See `WebGLRenderingContext.polygonOffset()`.                  |
    | `gl.SAMPLE_ALPHA_TO_COVERAGE` | Computation of a temporary coverage value determined by the alpha value.                                                            |
    | `gl.SAMPLE_COVERAGE`          | ANDing the fragment's coverage with the temporary coverage value. See `WebGLRenderingContext.sampleCoverage()`.        |
    | `gl.SCISSOR_TEST`             | Scissor test that discards fragments that are outside of the scissor rectangle. See `WebGLRenderingContext.scissor()`. |
    | `gl.STENCIL_TEST`             | Stencil testing and updates to the stencil buffer. See `WebGLRenderingContext.stencilFunc()`.                          |

    When using a `WebGL 2 context`, the
    following values are available additionally:

    | Constant                | Description                                                                                                                                              |
    | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `gl.RASTERIZER_DISCARD` | Primitives are discarded immediately before the rasterization stage, but after the optional transform feedback stage. `gl.clear()` commands are ignored. |

### Return value

A `GLboolean` indicating if the capability _cap_ is enabled
(`true`), or not (`false`).

## Examples

```js
gl.isEnabled(gl.STENCIL_TEST);
// false
```

To activate or deactivate a specific capability, use the
`WebGLRenderingContext.enable()` and
`WebGLRenderingContext.disable()` methods:

```js
gl.enable(gl.STENCIL_TEST);
gl.disable(gl.STENCIL_TEST);
```

## See also

- `WebGLRenderingContext.enable()`
- `WebGLRenderingContext.disable()`
