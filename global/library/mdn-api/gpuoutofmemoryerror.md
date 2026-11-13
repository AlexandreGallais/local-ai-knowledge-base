---
title: "GPUOutOfMemoryError"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuoutofmemoryerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUOutOfMemoryError

The **`GPUOutOfMemoryError`** interface of the `WebGPU API` describes an out-of-memory (oom) error indicating that there was not enough free memory to complete the requested operation.

It represents one of the types of errors surfaced by `GPUDevice.popErrorScope` and the `uncapturederror` event.

Out-of-memory errors should be relatively rare in a well-behaved app but are less predictable than `GPUValidationError`s. This is because they are dependent on the device your app is running on as well as other apps that are using GPU resources at the time.

## Constructor

- `GPUOutOfMemoryError()`
    Creates a new `GPUOutOfMemoryError` object instance.

## Instance properties

The `message` property is inherited from its parent, `GPUError`:

- `message` (experimental) (read-only)
    A string providing a human-readable message that explains why the error occurred.

## Examples

The following example uses an error scope to capture an out-of-memory error, logging it to the console.

```js
device.pushErrorScope("out-of-memory");

let buffer = device.createBuffer({
  size: 100_000_000_000, // 100GB; far too big
  usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.MAP_WRITE,
});

device.popErrorScope().then((error) => {
  if (error) {
    // error is a GPUOutOfMemoryError object instance
    buffer = null;
    console.error(`Out of memory, buffer too large. Error: ${error.message}`);
  }
});
```

## See also

- The WebGPU API
- WebGPU Error Handling best practices
