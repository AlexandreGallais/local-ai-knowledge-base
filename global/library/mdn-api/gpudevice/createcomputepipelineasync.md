---
title: "GPUDevice: createComputePipelineAsync() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/createcomputepipelineasync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: createComputePipelineAsync() method

The **`createComputePipelineAsync()`** method of the
`GPUDevice` interface returns a `Promise` that fulfills with a `GPUComputePipeline`, which can control the compute shader stage and be used in a `GPUComputePassEncoder`, once the pipeline can be used without any stalling.

> **Note:**
> It is generally preferable to use this method over `GPUDevice.createComputePipeline()` whenever possible, as it prevents blocking of GPU operation execution on pipeline compilation.

## Syntax

```js
createComputePipelineAsync(descriptor)
```

### Parameters

- `descriptor`
    See the descriptor definition for the `GPUDevice.createComputePipeline()` method.

### Return value

A `Promise` that fulfills with a `GPUComputePipeline` object instance when the created pipeline is ready to be used without additional delay.

### Validation

If pipeline creation fails and the resulting pipeline becomes invalid as a result, the returned promise rejects with a `GPUPipelineError`:

- If this is due to an internal error, the `GPUPipelineError` will have a `reason` of `"internal"`.
- If this is due to a validation error, the `GPUPipelineError` will have a `reason` of `"validation"`.

A validation error can occur if any of the following are false:

- The workgroup storage size used by the `module` referenced inside the `compute` property is less than or equal to the `GPUDevice`'s `maxComputeWorkgroupStorageSize` `limit`.
- The `module` uses a number of compute invocations per workgroup less than or equal to the `GPUDevice`'s `maxComputeInvocationsPerWorkgroup` `limit`.
- The `module`'s workgroup size is less than or equal to the `GPUDevice`'s corresponding `maxComputeWorkgroupSizeX`, `maxComputeWorkgroupSizeY`, or `maxComputeWorkgroupSizeZ` `limit`.
- If the `entryPoint` property is omitted, the shader code contains a single compute shader entry point function for the browser to use as the default entry point.

## Examples

> **Note:**
> The WebGPU samples feature many more examples.

### Basic <example-value>

The following example shows a process of:

- Creating a bind group layout with `GPUDevice.createBindGroupLayout()`.
- Feeding the `bindGroupLayout` into `GPUDevice.createPipelineLayout()` to create a `GPUPipelineLayout`.
- Using that value immediately in a `createComputePipelineAsync()` call to create a `GPUComputePipeline`.

```js
async function init() {
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

  const computePipeline = await device.createComputePipelineAsync({
    layout: device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout],
    }),
    compute: {
      module: shaderModule,
      entryPoint: "main",
    },
  });

  // …
}
```

## See also

- The WebGPU API
