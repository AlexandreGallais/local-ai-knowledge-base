---
title: "GPUDevice: pushErrorScope() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/pusherrorscope/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: pushErrorScope() method

The **`pushErrorScope()`** method of the
`GPUDevice` interface pushes a new GPU error scope onto the device's error scope stack, allowing you to capture errors of a particular type.

Once you are done capturing errors, you can end capture by invoking `GPUDevice.popErrorScope()`. This pops the scope from the stack and returns a `Promise` that resolves to an object describing the first error captured in the scope, or `null` if no errors were captured.

## Syntax

```js
pushErrorScope(filter)
```

### Parameters

- `filter`
    An enumerated value that specifies what type of error will be caught in this particular error scope. Possible values are:
    - `"internal"`
        The error scope will catch a `GPUInternalError`.
    - `"out-of-memory"`
        The error scope will catch a `GPUOutOfMemoryError`.
    - `"validation"`
        The error scope will catch a `GPUValidationError`.

### Return value

None (`undefined`).

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
