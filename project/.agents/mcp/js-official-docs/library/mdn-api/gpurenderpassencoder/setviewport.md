---
title: "GPURenderPassEncoder: setViewport() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/setviewport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: setViewport() method

The **`setViewport()`** method of the
`GPURenderPassEncoder` interface sets the viewport used during the rasterization stage to linearly map from normalized device coordinates to viewport coordinates.

## Syntax

```js
setViewport(x, y, width, height, minDepth, maxDepth)
```

### Parameters

- `x`
    A number representing the minimum X value of the viewport, in pixels.
- `y`
    A number representing the minimum Y value of the viewport, in pixels.
- `width`
    A number representing the width of the viewport, in pixels.
- `height`
    A number representing the height of the viewport, in pixels.
- `minDepth`
    A number representing the minimum depth value of the viewport.
- `maxDepth`
    A number representing the maximum depth value of the viewport.

> **Note:**
> If a `setViewport()` call is not made, the default values are `(0, 0, attachment width, attachment height, 0, 1)` for each render pass.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`setViewport()`**, otherwise a `GPUValidationError` is generated and the `GPURenderPassEncoder` becomes invalid:

- `x`, `y`, `width`, and `height` are all greater than or equal to 0.
- `x` + `width` is less than or equal to the width of the render pass's render attachments (see note below).
- `y` + `height` is less than or equal to the height of the render pass's render attachments (see note below).
- `minDepth` and `maxDepth` are both inside the range 0.0–1.0 inclusive.
- `minDepth` is less than `maxDepth`.

> **Note:**
> See the color and depth/stencil attachments specified in the descriptor of `GPUCommandEncoder.beginRenderPass()`; the width and height are based on that of the `GPUTexture` that their `view`s originate from.

## Examples

### Basic <example-value>

In a typical canvas render, the following could be used to halve the width and height of the rendered graphics:

```js
passEncoder.setViewport(0, 0, canvas.width / 2, canvas.height / 2, 0, 1);
```

### In context

In the WebGPU Samples reversedZ example, `setViewport` is used several times to set the viewport for the different render passes. Study the example code listing for the full context.

For example:

```js
// …

colorPass.setViewport(
  (canvas.width * m) / 2,
  0,
  canvas.width / 2,
  canvas.height,
  0,
  1,
);

// …
```

## See also

- The WebGPU API
