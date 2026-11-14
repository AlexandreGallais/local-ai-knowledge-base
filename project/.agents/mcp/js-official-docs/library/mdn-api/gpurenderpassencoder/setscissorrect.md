---
title: "GPURenderPassEncoder: setScissorRect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/setscissorrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: setScissorRect() method

The **`setScissorRect()`** method of the
`GPURenderPassEncoder` interface sets the scissor rectangle used during the rasterization stage. After transformation into viewport coordinates any fragments that fall outside the scissor rectangle will be discarded.

## Syntax

```js
setScissorRect(x, y, width, height)
```

### Parameters

- `x`
    A number representing the minimum X value of the scissor rectangle, in pixels.
- `y`
    A number representing the minimum Y value of the scissor rectangle, in pixels.
- `width`
    A number representing the width of the scissor rectangle, in pixels.
- `height`
    A number representing the height of the scissor rectangle, in pixels.

> **Note:**
> If a `setScissorRect()` call is not made, the default values are `(0, 0, attachment width, attachment height)` for each render pass.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`setViewport()`**, otherwise a `GPUValidationError` is generated and the `GPURenderPassEncoder` becomes invalid:

- `x` + `width` is less than or equal to the width of the render pass's render attachments (see note below).
- `y` + `height` is less than or equal to the height of the render pass's render attachments (see note below).

> **Note:**
> See the color and depth/stencil attachments specified in the descriptor of `GPUCommandEncoder.beginRenderPass()`; the width and height are based on that of the `GPUTexture` that their `view`s originate from.

## Examples

### Basic <example-value>

In a typical canvas render, the following could be used to discard any rendering outside of the top-left quarter of the canvas:

```js
passEncoder.setScissorRect(0, 0, canvas.width / 2, canvas.height / 2);
```

## See also

- The WebGPU API
