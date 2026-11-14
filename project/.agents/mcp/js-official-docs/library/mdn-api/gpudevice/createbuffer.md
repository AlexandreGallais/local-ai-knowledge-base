---
title: "GPUDevice: createBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/createbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: createBuffer() method

The **`createBuffer()`** method of the
`GPUDevice` interface creates a `GPUBuffer` in which to store raw data to use in GPU operations.

## Syntax

```js
createBuffer(descriptor)
```

### Parameters

- `descriptor`
    An object containing the following properties:
    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.
    - `mappedAtCreation` (optional)
        A boolean. If set to `true`, the buffer will be mapped upon creation, meaning that you can set the values inside the buffer immediately by calling `GPUBuffer.getMappedRange()`. The default value is `false`.

        Note that it is valid to set `mappedAtCreation: true` so you can set the buffer's initial data, even if the `GPUBufferUsage.MAP_READ` or `GPUBufferUsage.MAP_WRITE` usage flags are not set.

    - `size`
        A number representing the size of the buffer, in bytes. If `mappedAtCreation` is set to `true`, this must be a multiple of `4`.
    - `usage`
        The bitwise flags representing the allowed usages for the `GPUBuffer`. The possible values are in the `GPUBuffer.usage` value table.

        Note that multiple possible usages can be specified by separating values with bitwise OR, for example: `GPUBufferUsage.COPY_SRC | GPUBufferUsage.MAP_WRITE`.

### Return value

A `GPUBuffer` object instance.

### Exceptions

- `RangeError`
    Thrown if `mappedAtCreation` is set to `true`, and the specified `size` is not a multiple of `4`.

### Validation

The following criteria must be met when calling **`createBuffer()`**, otherwise a `GPUValidationError` is generated and an invalid `GPUBuffer` object is returned:

- A valid `usage` is specified.
- `GPUBufferUsage.MAP_READ` is specified, and no additional flags are specified other than `GPUBufferUsage.COPY_DST`.
- `GPUBufferUsage.MAP_WRITE` is specified, and no additional flags are specified other than `GPUBufferUsage.COPY_SRC`.

> **Note:**
> If the buffer allocation fails without any specific side-effects, a `GPUOutOfMemoryError` object is generated.

## Examples

In our basic <example-value> demo, we create an output buffer to read GPU calculations to, and a staging buffer to be mapped for JavaScript access.

```js
const output = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
});

const stagingBuffer = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
});
```

## See also

- The WebGPU API
