---
title: "GPUBuffer: mapState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpubuffer/mapstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUBuffer: mapState property

The **`mapState`** read-only property of the
`GPUBuffer` interface represents the mapped state of the `GPUBuffer`.

## Value

An enumerated value. Possible values are:

- `unmapped`
    The buffer is not mapped. `GPUBuffer.getMappedRange()` cannot be used to access the contents of the `GPUBuffer` in JavaScript. This could be because:
    - `GPUBuffer.mapAsync()` has not yet been called.
    - The `GPUBuffer` was previously mapped, and then unmapped again with `GPUBuffer.unmap()`.
- `pending`
    The buffer is not yet mapped. `GPUBuffer.mapAsync()` has been called, but its `Promise` is currently pending. `GPUBuffer.getMappedRange()` cannot currently be used to access the contents of the `GPUBuffer` in JavaScript.
- `mapped`
    The buffer is mapped. The `GPUBuffer.mapAsync()` `Promise` has fulfilled, and `GPUBuffer.getMappedRange()` can now be used to access the contents of the `GPUBuffer` in JavaScript.

## Examples

```js
const stagingBuffer = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
});

console.log(stagingBuffer.mapState); // "unmapped"

// …

await stagingBuffer.mapAsync(
  GPUMapMode.READ,
  0, // Offset
  BUFFER_SIZE, // Length
);

console.log(stagingBuffer.mapState); // "mapped"
```

## See also

- The WebGPU API
