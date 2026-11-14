---
title: "GPUSampler"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpusampler/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUSampler

The **`GPUSampler`** interface of the `WebGPU API` represents an object that can control how shaders transform and filter texture resource data.

A `GPUSampler` object instance is created using the `GPUDevice.createSampler()` method.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Examples

The following snippet creates a `GPUSampler` that does trilinear filtering and repeats texture coordinates:

```js
// …
const sampler = device.createSampler({
  addressModeU: "repeat",
  addressModeV: "repeat",
  magFilter: "linear",
  minFilter: "linear",
  mipmapFilter: "linear",
});
```

The WebGPU samples Shadow Mapping sample uses comparison samplers to sample from a depth texture to render shadows.

## See also

- The WebGPU API
