---
title: "GPUCanvasContext: configure() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucanvascontext/configure/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCanvasContext: configure() method

The **`configure()`** method of the
`GPUCanvasContext` interface configures the context to use for rendering with a given `GPUDevice`. When called the canvas will initially be cleared to transparent black.

## Syntax

```js
configure(configuration)
```

### Parameters

- `configuration`
    An object containing the following properties:
    - `alphaMode` (optional)
        An enumerated value that specifies the effect that alpha values will have on the content of textures returned by `getCurrentTexture()` when read, displayed, or used as an image source. Possible values are:
        - `opaque`: Alpha values are ignored — if a texture is not already opaque, the alpha channel is cleared to 1.0 when it is used as an image source or displayed to the screen. This is the default value.
        - `premultiplied`: Color values are premultiplied by their alpha value. For example, 100% red at 50% alpha is `[0.5, 0, 0, 0.5]`.
    - `colorSpace` (optional)
        The color space that values written into textures returned by `getCurrentTexture()` should be displayed with. Possible values are `srgb` (the default) and `display-p3`.
    - `device`
        The `GPUDevice` that the rendering information for the context will come from.
    - `format`
        The format that textures returned by `getCurrentTexture()` will have. This can be `bgra8unorm`, `rgba8unorm`, or `rgba16float`. The optimal canvas texture format for the current system can be returned by `GPU.getPreferredCanvasFormat()`. Using this is recommended — if you don't use the preferred format when configuring the canvas context, you may incur additional overhead, such as additional texture copies, depending on the platform.

    - `toneMapping` (optional)
        An object specifying parameters that define the tone mapping for the context — how the content of associated textures are to be displayed. This allows WebGPU to draw colors brighter than `white` (`#FFFFFF`). Possible properties are:
        - `mode` (optional)
            An enumerated value specifying the tone mapping mode for the canvas. Possible values include:
            - `standard`
                The default value. Restricts rendered content to the Standard Dynamic Range (SDR) of the display. This mode is accomplished by clamping all color values in the color space of the screen to the `[0, 1]` interval.
            - `extended`
                Allows content to be rendered in the full High Dynamic Range (HDR) of the display, where available. HDR mode allows a wider range of colors and brightness levels to be displayed, with more precise instructions as to what color should be displayed in each case. This mode matches `"standard"` in the `[0, 1]` range of the screen. Clamping or projection is done to the extended dynamic range of the screen but not `[0, 1]`.

    - `usage` (optional)
        Bitwise flags specifying the allowed usage for textures returned by `getCurrentTexture()`. Possible values are:
        - `GPUTextureUsage.COPY_SRC`: The texture can be used as the source of a copy operation, for example the source argument of a `GPUCommandEncoder.copyTextureToBuffer()` call.
        - `GPUTextureUsage.COPY_DST`: The texture can be used as the destination of a copy/write operation, for example the destination argument of a `GPUCommandEncoder.copyTextureToTexture()` call.
        - `GPUTextureUsage.RENDER_ATTACHMENT`: The texture can be used as a color attachment in a render pass, for example in a color attachment view in a `GPUCommandEncoder.beginRenderPass()` call. `GPUTextureUsage.RENDER_ATTACHMENT` is the default `usage`, but note that it is not automatically included if a different value is explicitly set; in such cases you need to include it in addition.
        - `GPUTextureUsage.TEXTURE_BINDING`: The texture can be bound for use as a sampled texture in a shader, for example in a bind group entry in a `GPUDevice.createBindGroup()` call.
        - `GPUTextureUsage.STORAGE_BINDING`: The texture can be bound for use as a storage texture in a shader, for example in a bind group entry in a `GPUDevice.createBindGroup()` call.

        Note that multiple possible usages can be specified using the bitwise OR operator. For example, `usage: GPUTextureUsage.COPY_SRC | GPUTextureUsage.RENDER_ATTACHMENT`.

    - `viewFormats` (optional)
        An array of formats that views created from textures returned by `getCurrentTexture()` may use. See Texture Formats for all the possible values.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if `usage` includes the `TRANSIENT_ATTACHMENT` bit.

## Examples

### Basic usage

```js
const canvas = document.querySelector("#gpuCanvas");
const context = canvas.getContext("webgpu");

context.configure({
  device,
  format: navigator.gpu.getPreferredCanvasFormat(),
  alphaMode: "premultiplied",
});
```

### HDR `toneMapping` demos

See the Particles (HDR) sample and HDR support test.

## See also

- The WebGPU API
