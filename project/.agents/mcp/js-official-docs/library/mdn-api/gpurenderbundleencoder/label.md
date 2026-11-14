---
title: "GPURenderBundleEncoder: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderbundleencoder/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderBundleEncoder: label property

The **`label`** property of the
`GPURenderBundleEncoder` interface is a string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUDevice.createRenderBundleEncoder()` call, or you can get and set it directly on the `GPURenderBundleEncoder` object.

> **Note:**
> This property is functionally identical to its equivalent on `GPURenderPassEncoder` — `label`.

## Value

A string. If no label value has previously been set, getting the label returns an empty string.

## Examples

Setting and getting a label via `GPURenderBundleEncoder.label`:

```js
const renderBundleEncoder = device.createRenderBundleEncoder({
  colorFormats: [presentationFormat],
});

renderBundleEncoder.label = "my_render_bundle_encoder";
console.log(renderBundleEncoder.label); // "my_render_bundle_encoder"
```

Setting a label via the originating `GPUDevice.createRenderBundleEncoder()` call, and then getting it via `GPURenderBundleEncoder.label`:

```js
const renderBundleEncoder = device.createRenderBundleEncoder({
  colorFormats: [presentationFormat],
  label: "my_render_bundle_encoder",
});

console.log(renderBundleEncoder.label); // "my_render_bundle_encoder"
```

## See also

- The WebGPU API
