---
title: "GPUDevice"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice

The **`GPUDevice`** interface of the `WebGPU API` represents a logical GPU device. This is the main interface through which the majority of WebGPU functionality is accessed.

A `GPUDevice` object is requested using the `GPUAdapter.requestDevice()` method.

## Instance properties

_Inherits properties from its parent, `EventTarget`._

- `adapterInfo` (read-only)
    A `GPUAdapterInfo` object containing identifying information about the device's originating adapter.

- `features` (read-only)
    A `GPUSupportedFeatures` object that describes additional functionality supported by the device.

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

- `limits` (read-only)
    A `GPUSupportedLimits` object that describes the limits supported by the device.

- `lost` (read-only)
    Contains a `Promise` that remains pending throughout the device's lifetime and resolves with a `GPUDeviceLostInfo` object when the device is lost.

- `queue` (read-only)
    Returns the primary `GPUQueue` for the device.

## Instance methods

_Inherits methods from its parent, `EventTarget`._

- `createBindGroup()`
    Creates a `GPUBindGroup` based on a `GPUBindGroupLayout` that defines a set of resources to be bound together in a group and how those resources are used in shader stages.

- `createBindGroupLayout()`
    Creates a `GPUBindGroupLayout` that defines the structure and purpose of related GPU resources such as buffers that will be used in a pipeline, and is used as a template when creating `GPUBindGroup`s.

- `createBuffer()`
    Creates a `GPUBuffer` in which to store raw data to use in GPU operations.

- `createCommandEncoder()`
    Creates a `GPUCommandEncoder`, which is used to encode commands to be issued to the GPU.

- `createComputePipeline()`
    Creates a `GPUComputePipeline` that can control the compute shader stage and be used in a `GPUComputePassEncoder`.

- `createComputePipelineAsync()`
    Returns a `Promise` that fulfills with a `GPUComputePipeline`, which can control the compute shader stage and be used in a `GPUComputePassEncoder`, once the pipeline can be used without any stalling.

- `createPipelineLayout()`
    Creates a `GPUPipelineLayout` that defines the `GPUBindGroupLayout`s used by a pipeline. `GPUBindGroup`s used with the pipeline during command encoding must have compatible `GPUBindGroupLayout`s.

- `createQuerySet()`
    Creates a `GPUQuerySet` that can be used to record the results of queries on passes, such as occlusion or timestamp queries.

- `createRenderBundleEncoder()`
    Creates a `GPURenderBundleEncoder` that can be used to pre-record bundles of commands. These can be reused in `GPURenderPassEncoder`s via the `executeBundles()` method, as many times as required.

- `createRenderPipeline()`
    Creates a `GPURenderPipeline` that can control the vertex and fragment shader stages and be used in a `GPURenderPassEncoder` or `GPURenderBundleEncoder`.

- `createRenderPipelineAsync()`
    Returns a `Promise` that fulfills with a `GPURenderPipeline`, which can control the vertex and fragment shader stages and be used in a `GPURenderPassEncoder` or `GPURenderBundleEncoder`, once the pipeline can be used without any stalling.

- `createSampler()`
    Creates a `GPUSampler`, which controls how shaders transform and filter texture resource data.

- `createShaderModule()`
    Creates a `GPUShaderModule` from a string of WGSL source code.

- `createTexture()`
    Creates a `GPUTexture` in which to store texture data to use in GPU rendering operations.

- `destroy()`
    Destroys the device, preventing further operations on it.

- `importExternalTexture()`
    Takes an `HTMLVideoElement` as an input and returns a `GPUExternalTexture` wrapper object containing a snapshot of the video that can be used in GPU rendering operations.

- `popErrorScope()`
    Pops an existing GPU error scope from the error scope stack and returns a `Promise` that resolves to an object (`GPUInternalError`, `GPUOutOfMemoryError`, or `GPUValidationError`) describing the first error captured in the scope, or `null` if no error occurred.

- `pushErrorScope()`
    Pushes a new GPU error scope onto the device's error scope stack, allowing you to capture errors of a particular type.

## Events

- `uncapturederror`
    Fired when an error is thrown that has not been observed by a GPU error scope, to provide a way to report unexpected errors. Known error cases should be handled using `pushErrorScope()` and `popErrorScope()`.

## Examples

```js
async function init() {
  if (!navigator.gpu) {
    throw Error("WebGPU not supported.");
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const device = await adapter.requestDevice();

  const shaderModule = device.createShaderModule({
    code: shaders,
  });

  // …
}
```

See the individual member pages listed above and the following demo sites for a lot more examples of `GPUDevice` usage:

- Basic <example-value> demo
- Basic <example-value> demo
- WebGPU samples

## See also

- The WebGPU API
