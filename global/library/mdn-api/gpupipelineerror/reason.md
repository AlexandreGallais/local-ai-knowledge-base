---
title: "GPUPipelineError: reason property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpupipelineerror/reason/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUPipelineError: reason property

The **`reason`** read-only property of the
`GPUPipelineError` interface defines the reason the pipeline creation failed in a machine-readable way.

## Value

An enumerated value that can be one of:

- `"internal"`
    Pipeline creation failed because of an internal error (see `GPUInternalError` for more information about these kinds of error.)
- `"validation"`
    Pipeline creation failed because of a validation error (see `GPUValidationError` for more information about these kinds of error.)

## Examples

See the main `GPUPipelineError` page for an example involving a `GPUPipelineError` object instance.

## See also

- The WebGPU API
