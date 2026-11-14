---
title: "GPURenderPipeline"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpipeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPipeline

The **`GPURenderPipeline`** interface of the `WebGPU API` represents a pipeline that controls the vertex and fragment shader stages and can be used in a `GPURenderPassEncoder` or `GPURenderBundleEncoder`.

A `GPURenderPipeline` object instance can be created using the `GPUDevice.createRenderPipeline()` or `GPUDevice.createRenderPipelineAsync()` methods.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Instance methods

- `getBindGroupLayout()`
    Returns the pipeline's `GPUBindGroupLayout` object with the given index (i.e., included in the originating `GPUDevice.createRenderPipeline()` or `GPUDevice.createRenderPipelineAsync()` call's pipeline layout).

## Examples

> **Note:**
> The WebGPU samples feature many more examples.

### Basic <example-value>

Our basic <example-value> demo provides an example of the construction of a valid render pipeline descriptor object, which is then used to create a `GPURenderPipeline` via a `createRenderPipeline()` call.

```js
// …

const vertexBuffers = [
  {
    attributes: [
      {
        shaderLocation: 0, // position
        offset: 0,
        format: "float32x4",
      },
      {
        shaderLocation: 1, // color
        offset: 16,
        format: "float32x4",
      },
    ],
    arrayStride: 32,
    stepMode: "vertex",
  },
];

const pipelineDescriptor = {
  vertex: {
    module: shaderModule,
    entryPoint: "vertex_main",
    buffers: vertexBuffers,
  },
  fragment: {
    module: shaderModule,
    entryPoint: "fragment_main",
    targets: [
      {
        format: navigator.gpu.getPreferredCanvasFormat(),
      },
    ],
  },
  primitive: {
    topology: "triangle-list",
  },
  layout: "auto",
};

const renderPipeline = device.createRenderPipeline(pipelineDescriptor);

// …
```

## See also

- The WebGPU API
