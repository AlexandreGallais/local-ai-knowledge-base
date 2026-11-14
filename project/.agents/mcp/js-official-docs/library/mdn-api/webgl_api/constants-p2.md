---
title: "WebGL constants (part 2 of 9)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/constants/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL constants (part 2 of 9)

## Standard WebGL 1 constants

These constants are defined on the `WebGLRenderingContext` interface.

### Clearing buffers

Constants passed to `WebGLRenderingContext.clear()` to clear buffer masks.

| Constant name        | Value      | Description                                            |
| -------------------- | ---------- | ------------------------------------------------------ |
| `DEPTH_BUFFER_BIT`   | 0x00000100 | Passed to `clear` to clear the current depth buffer.   |
| `STENCIL_BUFFER_BIT` | 0x00000400 | Passed to `clear` to clear the current stencil buffer. |
| `COLOR_BUFFER_BIT`   | 0x00004000 | Passed to `clear` to clear the current color buffer.   |

### Rendering primitives

Constants passed to `WebGLRenderingContext.drawElements()` or `WebGLRenderingContext.drawArrays()` to specify what kind of primitive to render.

| Constant name    | Value  | Description                                                                                                                                            |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `POINTS`         | 0x0000 | Passed to `drawElements` or `drawArrays` to draw single points.                                                                                        |
| `LINES`          | 0x0001 | Passed to `drawElements` or `drawArrays` to draw lines. Each vertex connects to the one after it.                                                      |
| `LINE_LOOP`      | 0x0002 | Passed to `drawElements` or `drawArrays` to draw lines. Each set of two vertices is treated as a separate line segment.                                |
| `LINE_STRIP`     | 0x0003 | Passed to `drawElements` or `drawArrays` to draw a connected group of line segments from the first vertex to the last.                                 |
| `TRIANGLES`      | 0x0004 | Passed to `drawElements` or `drawArrays` to draw triangles. Each set of three vertices creates a separate triangle.                                    |
| `TRIANGLE_STRIP` | 0x0005 | Passed to `drawElements` or `drawArrays` to draw a connected group of triangles.                                                                       |
| `TRIANGLE_FAN`   | 0x0006 | Passed to `drawElements` or `drawArrays` to draw a connected group of triangles. Each vertex connects to the previous and the first vertex in the fan. |

### Blending modes

Constants passed to `WebGLRenderingContext.blendFunc()` or `WebGLRenderingContext.blendFuncSeparate()` to specify the blending mode (for both, RGB and alpha, or separately).

| Constant name              | Value  | Description                                                                                                                                 |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `ZERO`                     | 0      | Passed to `blendFunc` or `blendFuncSeparate` to turn off a component.                                                                       |
| `ONE`                      | 1      | Passed to `blendFunc` or `blendFuncSeparate` to turn on a component.                                                                        |
| `SRC_COLOR`                | 0x0300 | Passed to `blendFunc` or `blendFuncSeparate` to multiply a component by the source element's color.                                         |
| `ONE_MINUS_SRC_COLOR`      | 0x0301 | Passed to `blendFunc` or `blendFuncSeparate` to multiply a component by one minus the source element's color.                               |
| `SRC_ALPHA`                | 0x0302 | Passed to `blendFunc` or `blendFuncSeparate` to multiply a component by the source's alpha.                                                 |
| `ONE_MINUS_SRC_ALPHA`      | 0x0303 | Passed to `blendFunc` or `blendFuncSeparate` to multiply a component by one minus the source's alpha.                                       |
| `DST_ALPHA`                | 0x0304 | Passed to `blendFunc` or `blendFuncSeparate` to multiply a component by the destination's alpha.                                            |
| `ONE_MINUS_DST_ALPHA`      | 0x0305 | Passed to `blendFunc` or `blendFuncSeparate` to multiply a component by one minus the destination's alpha.                                  |
| `DST_COLOR`                | 0x0306 | Passed to `blendFunc` or `blendFuncSeparate` to multiply a component by the destination's color.                                            |
| `ONE_MINUS_DST_COLOR`      | 0x0307 | Passed to `blendFunc` or `blendFuncSeparate` to multiply a component by one minus the destination's color.                                  |
| `SRC_ALPHA_SATURATE`       | 0x0308 | Passed to `blendFunc` or `blendFuncSeparate` to multiply a component by the minimum of source's alpha or one minus the destination's alpha. |
| `CONSTANT_COLOR`           | 0x8001 | Passed to `blendFunc` or `blendFuncSeparate` to specify a constant color blend function.                                                    |
| `ONE_MINUS_CONSTANT_COLOR` | 0x8002 | Passed to `blendFunc` or `blendFuncSeparate` to specify one minus a constant color blend function.                                          |
| `CONSTANT_ALPHA`           | 0x8003 | Passed to `blendFunc` or `blendFuncSeparate` to specify a constant alpha blend function.                                                    |
| `ONE_MINUS_CONSTANT_ALPHA` | 0x8004 | Passed to `blendFunc` or `blendFuncSeparate` to specify one minus a constant alpha blend function.                                          |

### Blending equations

Constants passed to `WebGLRenderingContext.blendEquation()` or `WebGLRenderingContext.blendEquationSeparate()` to control how the blending is calculated (for both, RGB and alpha, or separately).

| Constant name           | Value  | Description                                                                                                                  |
| ----------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `FUNC_ADD`              | 0x8006 | Passed to `blendEquation` or `blendEquationSeparate` to set an addition blend function.                                      |
| `FUNC_SUBTRACT`         | 0x800A | Passed to `blendEquation` or `blendEquationSeparate` to specify a subtraction blend function (source - destination).         |
| `FUNC_REVERSE_SUBTRACT` | 0x800B | Passed to `blendEquation` or `blendEquationSeparate` to specify a reverse subtraction blend function (destination - source). |
