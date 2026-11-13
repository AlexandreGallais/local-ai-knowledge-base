---
title: "GPUUncapturedErrorEvent: GPUUncapturedErrorEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuuncapturederrorevent/gpuuncapturederrorevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUUncapturedErrorEvent: GPUUncapturedErrorEvent() constructor

The **`GPUUncapturedErrorEvent()`** constructor creates a new
`GPUUncapturedErrorEvent` object instance.

## Syntax

```js
new GPUUncapturedErrorEvent(type, options)
```

### Parameters

- `type`
    An enumerated value specifying the type of error. Possible values are:
    - `"internal"`
        The error is a `GPUInternalError`.
    - `"out-of-memory"`
        The error is a `GPUOutOfMemoryError`.
    - `"validation"`
        The error is a `GPUValidationError`.
- `options`
    An object, which can contain the following properties:
    - `error`
        A `GPUError` object instance providing access to the details of the error.

## Examples

A developer would not manually use the constructor to create a `GPUUncapturedErrorEvent` object. The user agent uses this constructor to create an appropriate object when the `GPUDevice` `uncapturederror` event fires to allow capturing of an unexpected error.

See the main `GPUUncapturedErrorEvent` page for an example.

## See also

- The WebGPU API
- WebGPU Error Handling best practices
