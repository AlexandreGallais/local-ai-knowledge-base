---
title: "GPUDevice: popErrorScope() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/poperrorscope/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: popErrorScope() method

The **`popErrorScope()`** method of the
`GPUDevice` interface pops an existing GPU error scope from the error scope stack (originally pushed using `GPUDevice.pushErrorScope()`) and returns a `Promise` that resolves to an object describing the first error captured in the scope, or `null` if no error occurred.

## Syntax

```js
popErrorScope()
```

### Parameters

None.

### Return value

A `Promise` that resolves to an object describing the first error captured in the scope. This can be of type:

- `GPUInternalError`
- `GPUOutOfMemoryError`
- `GPUValidationError`

If no error occurred, it resolves to `null`.

## Examples

The following example uses an error scope to capture a suspected validation error, logging it to the console.

```js
device.pushErrorScope("validation");

let sampler = device.createSampler({
  maxAnisotropy: 0, // Invalid, maxAnisotropy must be at least 1.
});

device.popErrorScope().then((error) => {
  if (error) {
    sampler = null;
    console.error(`An error occurred while creating sampler: ${error.message}`);
  }
});
```

See WebGPU Error Handling best practices for a lot more examples and information.

## See also

- The WebGPU API
