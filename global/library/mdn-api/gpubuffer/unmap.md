---
title: "GPUBuffer: unmap() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpubuffer/unmap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUBuffer: unmap() method

The **`unmap()`** method of the
`GPUBuffer` interface unmaps the mapped range of the `GPUBuffer`, making its contents available for use by the GPU again after it has previously been mapped with `GPUBuffer.mapAsync()` (the GPU cannot access a mapped `GPUBuffer`).

When `unmap()` is called, any `ArrayBuffer`s created via `GPUBuffer.getMappedRange()` are detached.

## Syntax

```js
unmap()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

See the main `GPUBuffer` page for an example.

## See also

- The WebGPU API
