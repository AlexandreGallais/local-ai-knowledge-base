---
title: "GPUDevice: createRenderPipelineAsync() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/createrenderpipelineasync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: createRenderPipelineAsync() method

The **`createRenderPipelineAsync()`** method of the
`GPUDevice` interface returns a `Promise` that fulfills with a `GPURenderPipeline`, which can control the vertex and fragment shader stages and be used in a `GPURenderPassEncoder` or `GPURenderBundleEncoder`, once the pipeline can be used without any stalling.

> **Note:**
> It is generally preferable to use this method over `GPUDevice.createRenderPipeline()` whenever possible, as it prevents blocking of GPU operation execution on pipeline compilation.

## Syntax

```js
createRenderPipelineAsync(descriptor)
```

### Parameters

- `descriptor`
    See the descriptor definition for the `GPUDevice.createRenderPipeline()` method.

### Return value

A `Promise` that fulfills with a `GPURenderPipeline` object instance when the created pipeline is ready to be used without additional delay.

### Validation

If pipeline creation fails and the resulting pipeline becomes invalid as a result, the returned promise rejects with a `GPUPipelineError`:

- If this is due to an internal error, the `GPUPipelineError` will have a `reason` of `"internal"`.
- If this is due to a validation error, the `GPUPipelineError` will have a `reason` of `"validation"`.

A validation error can occur if any of the following are false:

- For `depthStencil` objects:
  - `format` is a `depth-or-stencil` format.
  - The `depthBias`, `depthBiasClamp`, and `depthBiasSlopeScale` properties are set to `0` for line and point topologies, i.e., if `topology` is set to `"line-list"`, `"line-strip"`, or `"point-list"`.
  - If `depthWriteEnabled` is `true` or `depthCompare` is not `"always"`, `format` has a depth component.
  - If `stencilFront` or `stencilBack`'s properties are not at their default values, `format` has a stencil component.
- For `fragment` objects:
  - `targets.length` is less than or equal to the `GPUDevice`'s `maxColorAttachments` `limit`.
  - For each `target`, `writeMask`'s numeric equivalent is less than 16.
  - If any of the used blend factor operations use the source alpha channel (for example `"src-alpha-saturated"`), the output has an alpha channel (that is, it must be a `vec4`).
  - If the `entryPoint` property is omitted, the shader code contains a single fragment shader entry point function for the browser to use as the default entry point.
- For `primitive` objects:
  - If the `unclippedDepth` property is used, the `depth-clip-control` feature is enabled.
- For `vertex` objects:
  - If the `entryPoint` property is omitted, the shader code contains a single vertex shader entry point function for the browser to use as the default entry point.

## Examples

> **Note:**
> The WebGPU samples feature many more examples.

### Basic <example-value>

The following example shows a basic <example-value> of the construction of a valid render pipeline descriptor object, which is then used to create a `GPURenderPipeline` via a `createRenderPipelineAsync()` call.

```js
async function init() {
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

  const renderPipeline =
    await device.createRenderPipelineAsync(pipelineDescriptor);

  // …
}
```

## See also

- The WebGPU API
