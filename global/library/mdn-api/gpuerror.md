---
title: "GPUError"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUError

The **`GPUError`** interface of the `WebGPU API` is the base interface for errors surfaced by `GPUDevice.popErrorScope` and the `uncapturederror` event.

## Instance properties

- `message` (read-only)
    A string providing a human-readable message that explains why the error occurred.

## Examples

For usage examples of error objects based on `GPUError`, see:

- `GPUDevice.popErrorScope`
- The `GPUDevice uncapturederror` event
- `GPUInternalError`, `GPUOutOfMemoryError`, and `GPUValidationError`

## See also

- The WebGPU API
- WebGPU Error Handling best practices
