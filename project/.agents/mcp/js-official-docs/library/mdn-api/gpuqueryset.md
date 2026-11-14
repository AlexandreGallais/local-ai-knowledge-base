---
title: "GPUQuerySet"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuqueryset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUQuerySet

The **`GPUQuerySet`** interface of the `WebGPU API` is used to record the results of queries on passes, such as occlusion or timestamp queries.

- Occlusion queries are available on render passes to query whether any fragment samples pass all the per-fragment tests for a set of drawing commands (including scissor, sample mask, alpha to coverage, stencil, and depth tests). To run an occlusion query, an appropriate `GPUQuerySet` must be provided as the value of the `occlusionQuerySet` descriptor property when invoking `GPUCommandEncoder.beginRenderPass()` to run a render pass.

- Timestamp queries allow applications to write timestamps to a `GPUQuerySet`. To run a timestamp query, appropriate `GPUQuerySet`s must be provided inside the value of the `timestampWrites` descriptor property when invoking `GPUCommandEncoder.beginRenderPass()` to run a render pass, or `GPUCommandEncoder.beginComputePass()` to run a compute pass.

> **Note:**
> The `timestamp-query` feature needs to be enabled to use timestamp queries.

A `GPUQuerySet` object instance is created using the `GPUDevice.createQuerySet()` method.

## Instance properties

- `count` (read-only)
    A number specifying the number of queries managed by the `GPUQuerySet`.
- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.
- `type` (read-only)
    An enumerated value specifying the type of queries managed by the `GPUQuerySet`.

## Instance methods

- `destroy()`
    Destroys the `GPUQuerySet`.

## Examples

The following snippet creates a `GPUQuerySet` that holds 32 occlusion query results, and then returns the `type` and `count`:

```js
const querySet = device.createQuerySet({
  type: "occlusion",
  count: 32,
});

console.log(querySet.count); // 32
console.log(querySet.type); // "occlusion"
```

## See also

- The WebGPU API
