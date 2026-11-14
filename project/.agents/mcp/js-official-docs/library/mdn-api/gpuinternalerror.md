---
title: "GPUInternalError"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuinternalerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUInternalError

The **`GPUInternalError`** interface of the `WebGPU API` describes an application error indicating that an operation failed for a system or implementation-specific reason, even when all validation requirements were satisfied.

It represents one of the types of errors surfaced by `GPUDevice.popErrorScope` and the `uncapturederror` event.

Internal errors occur when something happens in the WebGPU implementation that wasn't caught by validation and wasn't clearly identifiable as an out-of-memory error. It generally means that an operation your code performed hit a system limit in a way that was difficult to express with WebGPU's supported limits. The same operation might succeed on a different device. These can only be raised by pipeline creation, usually if the shader is too complex for the device.

## Constructor

- `GPUInternalError()`
    Creates a new `GPUInternalError` object instance.

## Instance properties

The `message` property is inherited from its parent, `GPUError`:

- `message` (experimental) (read-only)
    A string providing a human-readable message that explains why the error occurred.

## Examples

The following example uses an error scope to capture a suspected validation error, logging it to the console.

```js
device.pushErrorScope("internal");

let module = device.createShaderModule({
  code: shader, // REALLY complex shader
});

device.popErrorScope().then((error) => {
  if (error) {
    // error is a GPUInternalError object instance
    module = null;
    console.error(`An error occurred while creating shader: ${error.message}`);
  }
});
```

## See also

- The WebGPU API
- WebGPU Error Handling best practices
