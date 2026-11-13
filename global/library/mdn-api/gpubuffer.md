---
title: "GPUBuffer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpubuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUBuffer

The **`GPUBuffer`** interface of the `WebGPU API` represents a block of memory that can be used to store raw data to use in GPU operations.

A `GPUBuffer` object instance is created using the `GPUDevice.createBuffer()` method.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in
    `GPUError` messages or console warnings.
- `mapState` (read-only)
    An enumerated value representing the mapped state of the `GPUBuffer`.
- `size` (read-only)
    A number representing the length of the `GPUBuffer`'s memory allocation, in bytes.
- `usage` (read-only)
    The bitwise flags representing the allowed usages of the `GPUBuffer`.

## Instance methods

- `destroy()`
    Destroys the `GPUBuffer`.
- `getMappedRange()`
    Returns an `ArrayBuffer` containing the mapped contents of the `GPUBuffer` in the specified range.
- `mapAsync()`
    Maps the specified range of the `GPUBuffer`. Returns a `Promise` that resolves when the `GPUBuffer`'s content is ready to be accessed with `GPUBuffer.getMappedRange()`.
- `unmap()`
    Unmaps the mapped range of the `GPUBuffer`, making its contents available for use by the GPU again.

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

Later on, once the `stagingBuffer` contains the results of the GPU computation, a combination of `GPUBuffer` methods are used to read the data back to JavaScript so that it can then be logged to the console:

- `GPUBuffer.mapAsync()` is used to map the `GPUBuffer` for reading.
- `GPUBuffer.getMappedRange()` is used to return an `ArrayBuffer` containing the `GPUBuffer`'s contents.
- `GPUBuffer.unmap()` is used to unmap the `GPUBuffer` again, once we have read the content into JavaScript as needed.

```js
// map staging buffer to read results back to JS
await stagingBuffer.mapAsync(
  GPUMapMode.READ,
  0, // Offset
  BUFFER_SIZE, // Length
);

const copyArrayBuffer = stagingBuffer.getMappedRange(0, BUFFER_SIZE);
const data = copyArrayBuffer.slice(0);
stagingBuffer.unmap();
console.log(new Float32Array(data));
```

## See also

- The WebGPU API
