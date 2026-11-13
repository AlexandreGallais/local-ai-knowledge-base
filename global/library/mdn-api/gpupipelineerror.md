---
title: "GPUPipelineError"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpupipelineerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUPipelineError

The **`GPUPipelineError`** interface of the `WebGPU API` describes a pipeline failure. This is the value received when a `Promise` returned by a `GPUDevice.createComputePipelineAsync()` or `GPUDevice.createRenderPipelineAsync()` call rejects.

## Constructor

- `GPUPipelineError()`
    Creates a new `GPUPipelineError` object instance.

## Instance properties

_Inherits properties from its parent, `DOMException`._

- `reason` (read-only)
    An enumerated value that defines the reason the pipeline creation failed in a machine-readable way.

## Examples

In the following snippet we are attempting to create a `GPUComputePipeline` using `GPUDevice.createComputePipelineAsync()`. However, we have misspelled our compute pipeline `entryPoint` as `"maijn"` (it should be `"main"`), therefore pipeline creation fails, and our `catch` block prints the resulting reason and error message to the console.

```js
// …

let computePipeline;

try {
  computePipeline = await device.createComputePipelineAsync({
    layout: device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout],
    }),
    compute: {
      module: shaderModule,
      entryPoint: "maijn",
    },
  });
} catch (error) {
  // error is a GPUPipelineError object instance
  console.error(error.reason);
  console.error(`Pipeline creation failed: ${error.message}`);
}

// …
```

In this case, the given `reason` is `"Validation"`, and the `message` is `"Entry point "maijn" doesn't exist in the shader module [ShaderModule]."`

## See also

- The WebGPU API
- WebGPU Error Handling best practices
