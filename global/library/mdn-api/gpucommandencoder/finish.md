---
title: "GPUCommandEncoder: finish() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandencoder/finish/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandEncoder: finish() method

The **`finish()`** method of the
`GPUCommandEncoder` interface completes recording of the command sequence encoded on this `GPUCommandEncoder`, returning a corresponding `GPUCommandBuffer`.

## Syntax

```js
finish()
finish(descriptor)
```

### Parameters

- `descriptor` (optional)
    An object that can contain the following properties:
    - `label` (optional)
        A string providing a label for the returned `GPUCommandBuffer` that can be used to identify it, for example in `GPUError` messages or console warnings.

### Return value

A `GPUCommandBuffer` object instance.

### Validation

The following criteria must be met when calling **`finish()`**, otherwise a `GPUValidationError` is generated and the `GPUCommandEncoder` becomes invalid:

- There are no active debug groups (i.e., started via `pushDebugGroup()`).
- The `GPUCommandEncoder` is in an open state — this means that:
  - There are no child `GPUComputePassEncoder` or `GPURenderPassEncoder`s active that have not been ended (by calling `end()`).
  - The `GPUCommandEncoder` has not already had `finish()` called on it (in which case it cannot be used to encode any more commands).

## Examples

```js
// …

const commandBuffer = commandEncoder.finish();
device.queue.submit([commandBuffer]);

// …
```

## See also

- The WebGPU API
