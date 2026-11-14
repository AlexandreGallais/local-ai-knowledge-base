---
title: "GPUPipelineError: GPUPipelineError() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpupipelineerror/gpupipelineerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUPipelineError: GPUPipelineError() constructor

The **`GPUPipelineError()`** constructor creates a new
`GPUPipelineError` object instance.

## Syntax

```js
new GPUPipelineError(message, options)
```

### Parameters

- `message` (optional)
    A string providing a human-readable message that explains why the error occurred. If not specified, `message` defaults to an empty string (`""`).
- `options`
    An object, which can contain the following properties:
    - `reason`
        An enumerated value that defines the reason the pipeline creation failed in a machine-readable way. The value can be one of:
        - `"internal"`: Pipeline creation failed because of an internal error (see `GPUInternalError` for more information about these kinds of error).
        - `"validation"`: Pipeline creation failed because of a validation error (see `GPUValidationError` for more information about these kinds of error).

## Examples

A developer would not manually use the constructor to create a `GPUPipelineError` object. The user agent uses this constructor to create an appropriate object when a `Promise` returned by a `GPUDevice.createComputePipelineAsync()` or `GPUDevice.createRenderPipelineAsync()` call rejects, signaling a pipeline failure.

See the main `GPUPipelineError` page for an example involving a `GPUPipelineError` object instance.

## See also

- The WebGPU API
- WebGPU Error Handling best practices
