---
title: "GPUPipelineLayout"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpupipelinelayout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUPipelineLayout

The **`GPUPipelineLayout`** interface of the `WebGPU API` defines the `GPUBindGroupLayout`s used by a pipeline. `GPUBindGroup`s used with the pipeline during command encoding must have compatible `GPUBindGroupLayout`s.

A `GPUPipelineLayout` object instance is created using the `GPUDevice.createPipelineLayout()` method.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Examples

> **Note:**
> The WebGPU samples feature many more examples.

### Basic <example-value> layout example

The following snippet:

- Creates a `GPUBindGroupLayout` that describes a binding with a buffer, a texture, and a sampler.
- Creates a `GPUPipelineLayout` based on the `GPUBindGroupLayout`.

```js
// …

const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
      buffer: {},
    },
    {
      binding: 1,
      visibility: GPUShaderStage.FRAGMENT,
      texture: {},
    },
    {
      binding: 2,
      visibility: GPUShaderStage.FRAGMENT,
      sampler: {},
    },
  ],
});

const pipelineLayout = device.createPipelineLayout({
  bindGroupLayouts: [bindGroupLayout],
});

// …
```

## See also

- The WebGPU API
