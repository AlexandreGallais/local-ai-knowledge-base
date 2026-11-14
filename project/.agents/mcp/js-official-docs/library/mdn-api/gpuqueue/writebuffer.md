---
title: "GPUQueue: writeBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuqueue/writebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUQueue: writeBuffer() method

The **`writeBuffer()`** method of the
`GPUQueue` interface writes a provided data source into a given `GPUBuffer`.

This is a convenience function, which provides an alternative to setting buffer data via buffer mapping and buffer-to-buffer copies. It lets the user agent determine the most efficient way to copy the data over.

## Syntax

```js
writeBuffer(buffer, bufferOffset, data, dataOffset, size)
```

### Parameters

- `buffer`
    A `GPUBuffer` object representing the buffer to write data to.
- `bufferOffset`
    A number representing the offset, in bytes, to start writing the data at inside the `GPUBuffer`.
- `data`
    An object representing the data source to write into the `GPUBuffer`. This can be an `ArrayBuffer`, `TypedArray`, or `DataView`.
- `dataOffset` (optional)
    A number representing the offset to start writing the data from inside the data source. This value is a number of elements if `data` is a `TypedArray`, and a number of bytes if not. If omitted, `dataOffset` defaults to 0.
- `size` (optional)
    A number representing the size of the content to write from `data` to `buffer`. This value is a number of elements if `data` is a `TypedArray`, and a number of bytes if not. If omitted, `size` will be equal to the overall size of `data`, minus `dataOffset`.

### Return value

None (`undefined`).

### Exceptions

- `OperationError` `DOMException`
    The method throws an `OperationError` if the following criteria are not met:
    - The size of `data` is equal to or greater than 0.
    - `dataOffset` is equal to or smaller than the size of `data`.
    - The size of `data` (when converted to bytes, in the case of `TypedArray`s) is a multiple of 4.

### Validation

The following criteria must be met when calling **`writeBuffer()`**, otherwise a `GPUValidationError` is generated and the `GPUQueue` becomes invalid:

- `buffer` is available for use, i.e., not unavailable (`GPUBuffer`s are unavailable if they are currently `mapped`) or destroyed (with the `GPUBuffer.destroy()` method).
- The `buffer`'s `GPUBuffer.usage` includes the `GPUBufferUsage.COPY_DST` flag.
- `bufferOffset`, when converted to bytes, is a multiple of 4.
- The size of `data` - `dataOffset` + `bufferOffset`, when converted to bytes, is equal to or less than the `buffer`'s `GPUBuffer.size`.

## Examples

In our basic <example-value> demo, we define some vertex data in a `Float32Array` that we'll use to draw a triangle:

```js
const vertices = new Float32Array([
  0.0, 0.6, 0, 1, 1, 0, 0, 1, -0.5, -0.6, 0, 1, 0, 1, 0, 1, 0.5, -0.6, 0, 1, 0,
  0, 1, 1,
]);
```

To use this data in a render pipeline, we need to put it into a `GPUBuffer`. First we'll create the buffer:

```js
const vertexBuffer = device.createBuffer({
  size: vertices.byteLength, // make it big enough to store vertices in
  usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
});
```

To get the data into the buffer we can use `writeBuffer()`:

```js
device.queue.writeBuffer(vertexBuffer, 0, vertices, 0, vertices.length);
```

## See also

- The WebGPU API
