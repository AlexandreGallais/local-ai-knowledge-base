---
title: "GPUExternalTexture"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuexternaltexture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUExternalTexture

The **`GPUExternalTexture`** interface of the `WebGPU API` represents a wrapper object containing an `HTMLVideoElement` snapshot that can be used as a texture in GPU rendering operations.

A `GPUExternalTexture` object instance is created using `GPUDevice.importExternalTexture()`.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Examples

In the WebGPU samples Video Uploading sample, a `GPUExternalTexture` object (created via a `GPUDevice.importExternalTexture()` call) is used as the value of a bind group entry `resource`, specified when creating a `GPUBindGroup` via a `GPUDevice.createBindGroup()` call:

```js
// …
const uniformBindGroup = device.createBindGroup({
  layout: pipeline.getBindGroupLayout(0),
  entries: [
    {
      binding: 1,
      resource: sampler,
    },
    {
      binding: 2,
      resource: device.importExternalTexture({
        source: video,
      }),
    },
  ],
});
// …
```

## See also

- The WebGPU API
