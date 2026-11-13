---
title: "GPUOutOfMemoryError: GPUOutOfMemoryError() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuoutofmemoryerror/gpuoutofmemoryerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUOutOfMemoryError: GPUOutOfMemoryError() constructor

The **`GPUOutOfMemoryError()`** constructor creates a new
`GPUOutOfMemoryError` object instance.

## Syntax

```js
new GPUOutOfMemoryError(message)
```

### Parameters

- `message`
    A string providing a human-readable message that explains why the error occurred.

## Examples

A developer would not manually use the constructor to create a `GPUOutOfMemoryError` object. The user agent uses this constructor to create an appropriate object when an out-of-memory error is surfaced by `GPUDevice.popErrorScope` or the `uncapturederror` event.

See the main `GPUOutOfMemoryError` page for a specific example involving a `GPUOutOfMemoryError` object instance.

## See also

- The WebGPU API
- WebGPU Error Handling best practices
