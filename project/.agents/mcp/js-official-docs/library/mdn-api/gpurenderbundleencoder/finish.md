---
title: "GPURenderBundleEncoder: finish() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderbundleencoder/finish/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderBundleEncoder: finish() method

The **`finish()`** method of the
`GPURenderBundleEncoder` interface completes recording of the current render bundle command sequence, returning a `GPURenderBundle` object that can be passed into a `GPURenderPassEncoder.executeBundles()` call to execute those commands in a specific render pass.

## Syntax

```js
finish(descriptor)
```

### Parameters

- `descriptor` (optional)
    An object containing the following properties:
    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

### Return value

A `GPURenderBundle` object instance.

### Validation

The following criteria must be met when calling **`finish()`**, otherwise a `GPUValidationError` is generated and the `GPURenderBundleEncoder` becomes invalid:

- The `GPURenderBundleEncoder` is open (i.e., not already ended via a `finish()` call).
- The debug stack for the current render pass is empty (i.e., no render pass debug group is currently open, as opened by `pushDebugGroup()`).

## Examples

```js
const renderBundleEncoder = device.createRenderBundleEncoder({
  colorFormats: [presentationFormat],
});
recordRenderPass(renderBundleEncoder);
const renderBundle = renderBundleEncoder.finish();
```

The above snippet is taken from the WebGPU Samples Animometer example.

## See also

- The WebGPU API
