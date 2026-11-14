---
title: "GPUBuffer: mapAsync() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpubuffer/mapasync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUBuffer: mapAsync() method

The **`mapAsync()`** method of the
`GPUBuffer` interface maps the specified range of the `GPUBuffer`. It returns a `Promise` that resolves when the `GPUBuffer`'s content is ready to be accessed. While the `GPUBuffer` is mapped it cannot be used in any GPU commands.

Once the buffer is successfully mapped (which can be checked via `GPUBuffer.mapState`), calls to `GPUBuffer.getMappedRange()` will return an `ArrayBuffer` containing the `GPUBuffer`'s current values, to be read and updated by JavaScript as required.

When you have finished working with the `GPUBuffer` values, call `GPUBuffer.unmap()` to unmap it, making it accessible to the GPU again.

## Syntax

```js
mapAsync(mode)
mapAsync(mode, offset, size)
```

### Parameters

- `mode`
    A bitwise flag that specifies whether the `GPUBuffer` is mapped for reading or writing. Possible values are:
    - `GPUMapMode.READ`
        The `GPUBuffer` is mapped for reading. Values can be read, but any changes made to the `ArrayBuffer` returned by `GPUBuffer.getMappedRange()` will be discarded once `GPUBuffer.unmap()` is called.

        Read-mode mapping can only be used on `GPUBuffer`s that have a usage of `GPUBufferUsage.MAP_READ` set on them (i.e., when created with `GPUDevice.createBuffer()`).

    - `GPUMapMode.WRITE`
        The `GPUBuffer` is mapped for writing. Values can be read and updated — any changes made to the `ArrayBuffer` returned by `GPUBuffer.getMappedRange()` will be saved to the `GPUBuffer` once `GPUBuffer.unmap()` is called.

        Write-mode mapping can only be used on `GPUBuffer`s that have a usage of `GPUBufferUsage.MAP_WRITE` set on them (i.e., when created with `GPUDevice.createBuffer()`).

- `offset` (optional)
    A number representing the offset, in bytes, from the start of the buffer to the start of the range to be mapped. If `offset` is omitted, it defaults to 0.
- `size` (optional)
    A number representing the size, in bytes, of the range to be mapped. If `size` is omitted, the range mapped extends to the end of the `GPUBuffer`.

### Return value

A `Promise` that resolves to `undefined` when the `GPUBuffer`'s content is ready to be accessed.

### Validation

The following criteria must be met when calling **`mapAsync()`**, otherwise an `OperationError` `DOMException` is thrown, the promise is rejected, and a `GPUValidationError` is generated:

- `offset` is a multiple of 8.
- The total range to be mapped (`size` if specified, or `GPUBuffer.size` - `offset` if not) is a multiple of 4.
- The total range to be mapped is inside the bounds of the `GPUBuffer`.
- If mode is `GPUMapMode.READ`, the `GPUBuffer` has a usage of `GPUBufferUsage.MAP_READ`.
- If mode is `GPUMapMode.WRITE`, the `GPUBuffer` has a usage of `GPUBufferUsage.MAP_WRITE`.

## Examples

See the main `GPUBuffer` page for an example.

## See also

- The WebGPU API
