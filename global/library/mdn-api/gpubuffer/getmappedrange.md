---
title: "GPUBuffer: getMappedRange() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpubuffer/getmappedrange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUBuffer: getMappedRange() method

The **`getMappedRange()`** method of the
`GPUBuffer` interface returns an `ArrayBuffer` containing the mapped contents of the `GPUBuffer` in the specified range.

This can only happen once the `GPUBuffer` has been successfully mapped with `GPUBuffer.mapAsync()` (this can be checked via `GPUBuffer.mapState`). While the `GPUBuffer` is mapped it cannot be used in any GPU commands.

When you have finished working with the `GPUBuffer` values, call `GPUBuffer.unmap()` to unmap it, making it accessible to the GPU again. A `TypeError` is thrown if an attempt is made to detach the `ArrayBuffer` in any way other than via `GPUBuffer.unmap()`, such as by calling `transfer()`.

## Syntax

```js
getMappedRange()
getMappedRange(offset)
getMappedRange(offset, size)
```

### Parameters

- `offset` (optional)
    A number representing the offset, in bytes, from the start of the `GPUBuffer`'s mapped range to the start of the range to be returned in the `ArrayBuffer`. If `offset` is omitted, it defaults to 0.
- `size` (optional)
    A number representing the size, in bytes, of the `ArrayBuffer` to return. If `size` is omitted, the range extends to the end of the `GPUBuffer`'s mapped range.

### Return value

An `ArrayBuffer`.

### Validation

The following criteria must be met when calling **`getMappedRange()`**, otherwise an `OperationError` `DOMException` is thrown:

- `offset` is a multiple of 8.
- The total range to be mapped (`size` if specified, or mapped range length - `offset` if not) is a multiple of 4.
- The total range is inside the bounds of the mapped range and does not overlap with the `ArrayBuffer` ranges specified by any other active `getMappedRange()` calls.

## Examples

See the main `GPUBuffer` page for an example.

## See also

- The WebGPU API
