---
title: "GPUBindGroupLayout"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpubindgrouplayout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUBindGroupLayout

The **`GPUBindGroupLayout`** interface of the `WebGPU API` defines the structure and purpose of related GPU resources such as buffers that will be used in a pipeline, and is used as a template when creating `GPUBindGroup`s.

A `GPUBindGroupLayout` object instance is created using the `GPUDevice.createBindGroupLayout()` method.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Examples

> **Note:**
> The WebGPU samples feature many more examples.

### Basic <example-value>

Our basic <example-value> demo shows an example of creating a bind group layout and then using that as a template when creating a bind group.

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

const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: {
        buffer: output,
      },
    },
  ],
});

// …
```

## See also

- The WebGPU API
