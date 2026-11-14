---
title: "GPUSampler: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpusampler/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUSampler: label property

The **`label`** property of the
`GPUSampler` interface provides a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUDevice.createSampler()` call, or you can get and set it directly on the `GPUSampler` object.

## Value

A string. If this has not been previously set as described above, it will be an empty string.

## Examples

Setting and getting a label via `GPUSampler.label`:

```js
// …

const sampler = device.createSampler({
  compare: "less",
});

sampler.label = "my_sampler";

console.log(sampler.label); // "my_sampler"
```

Setting a label via the originating `GPUDevice.createSampler()` call, and then getting it via `GPUSampler.label`:

```js
// …

const sampler = device.createSampler({
  compare: "less",
  label: "my_sampler",
});

console.log(sampler.label); // "my_sampler"
```

## See also

- The WebGPU API
