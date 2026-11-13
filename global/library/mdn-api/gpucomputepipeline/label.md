---
title: "GPUComputePipeline: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucomputepipeline/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUComputePipeline: label property

The **`label`** property of the
`GPUComputePipeline` interface provides a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUDevice.createComputePipeline()` or `GPUDevice.createComputePipelineAsync()` call, or you can get and set it directly on the `GPUComputePipeline` object.

## Value

A string. If this has not been previously set as described above, it will be an empty string.

## Examples

Setting and getting a label via `GPUComputePipeline.label`:

```js
// …

const computePipeline = device.createComputePipeline({
  layout: device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  }),
  compute: {
    module: shaderModule,
    entryPoint: "main",
  },
});

computePipeline.label = "my_compute_pipeline";

console.log(computePipeline.label); // "my_compute_pipeline"
```

Setting a label via a `GPUDevice.createComputePipeline()` call, and then getting it via `GPUComputePipeline.label`:

```js
// …

const computePipeline = device.createComputePipeline({
  layout: device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  }),
  compute: {
    module: shaderModule,
    entryPoint: "main",
  },
  label: "my_compute_pipeline",
});

console.log(computePipeline.label); // "my_compute_pipeline"
```

## See also

- The WebGPU API
