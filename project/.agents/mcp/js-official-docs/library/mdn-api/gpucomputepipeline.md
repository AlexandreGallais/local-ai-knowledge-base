---
title: "GPUComputePipeline"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucomputepipeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUComputePipeline

The **`GPUComputePipeline`** interface of the `WebGPU API` represents a pipeline that controls the compute shader stage and can be used in a `GPUComputePassEncoder`.

A `GPUComputePipeline` object instance can be created using the `GPUDevice.createComputePipeline()` or `GPUDevice.createComputePipelineAsync()` methods.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Instance methods

- `getBindGroupLayout()`
    Returns the pipeline's `GPUBindGroupLayout` object with the given index (i.e., included in the originating `GPUDevice.createComputePipeline()` or `GPUDevice.createComputePipelineAsync()` call's pipeline layout).

## Examples

> **Note:**
> The WebGPU samples feature many more examples.

### Basic <example-value>

Our basic <example-value> demo shows a process of:

- Creating a bind group layout with `GPUDevice.createBindGroupLayout()`.
- Feeding the `bindGroupLayout` into `GPUDevice.createPipelineLayout()` to create a `GPUPipelineLayout`.
- Using that value immediately in a `createComputePipeline()` call to create a `GPUComputePipeline`.

```js
// …

const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: "storage",
      },
    },
  ],
});

const computePipeline = device.createComputePipeline({
  layout: device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  }),
  compute: {
    module: shaderModule,
    entryPoint: "main",
  },
});

// …
```

## See also

- The WebGPU API
