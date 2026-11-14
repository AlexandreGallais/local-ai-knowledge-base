---
title: "GPUCommandBuffer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandBuffer

The **`GPUCommandBuffer`** interface of the `WebGPU API` represents a pre-recorded list of GPU commands that can be submitted to a `GPUQueue` for execution.

A `GPUCommandBuffer` is created via the `GPUCommandEncoder.finish()` method; the GPU commands recorded within are submitted for execution by passing the `GPUCommandBuffer` into the parameter of a `GPUQueue.submit()` call.

> **Note:**
> Once a `GPUCommandBuffer` object has been submitted, it cannot be used again.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Examples

```js
// …

const commandBuffer = commandEncoder.finish();
device.queue.submit([commandBuffer]);
```

> **Note:**
> Study the WebGPU samples to find complete examples.

## See also

- The WebGPU API
