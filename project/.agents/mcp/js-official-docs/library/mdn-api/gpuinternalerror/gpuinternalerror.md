---
title: "GPUInternalError: GPUInternalError() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuinternalerror/gpuinternalerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUInternalError: GPUInternalError() constructor

The **`GPUInternalError()`** constructor creates a new
`GPUInternalError` object instance.

## Syntax

```js
new GPUInternalError(message)
```

### Parameters

- `message`
    A string providing a human-readable message that explains why the error occurred.

## Examples

A developer would not manually use the constructor to create a `GPUInternalError` object. The user agent uses this constructor to create an appropriate object when an internal error is surfaced by `GPUDevice.popErrorScope` or the `uncapturederror` event.

See the main `GPUInternalError` page for an example involving a `GPUInternalError` object instance.

## See also

- The WebGPU API
- WebGPU Error Handling best practices
