---
title: "GPUDevice: createQuerySet() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/createqueryset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: createQuerySet() method

The **`createQuerySet()`** method of the
`GPUDevice` interface creates a `GPUQuerySet` that can be used to record the results of queries on passes, such as occlusion or timestamp queries.

## Syntax

```js
createQuerySet(descriptor)
```

### Parameters

- `descriptor`
    An object containing the following properties:
    - `count`
        A number specifying the number of queries to be managed by the resulting `GPUQuerySet`.
    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.
    - `type`
        An enumerated value specifying the type of queries to be managed by the resulting `GPUQuerySet`. Possible values are:
        - `"occlusion"`
            Occlusion queries are available on render passes to query the number of fragment samples that pass all the per-fragment tests for a set of drawing commands (including scissor, sample mask, alpha to coverage, stencil, and depth tests). To run an occlusion query, an appropriate `GPUQuerySet` must be provided as the value of the `occlusionQuerySet` descriptor property when invoking `GPUCommandEncoder.beginRenderPass()` to run a render pass.
        - `"timestamp"`
            Timestamp queries allow applications to write timestamps to a `GPUQuerySet`. To run a timestamp query, appropriate `GPUQuerySet`s must be provided inside the value of the `timestampWrites` descriptor property when invoking `GPUCommandEncoder.beginRenderPass()` to run a render pass, or `GPUCommandEncoder.beginComputePass()` to run a compute pass. Alternatively, you can run a single timestamp query at any time by invoking `GPUCommandEncoder.writeTimeStamp()` with an appropriate `GPUQuerySet` as a parameter.

            > **Note:**
            > The `timestamp-query` feature needs to be enabled to use timestamp queries.

### Return value

A `GPUQuerySet` object instance.

### Validation

The following criteria must be met when calling **`createQuerySet()`**, otherwise a `GPUValidationError` is generated and an invalid `GPUQuerySet` object is returned:

- `count` is less than or equal to 4096.

## Examples

The following snippet creates a `GPUQuerySet` that holds 32 occlusion query results:

```js
const querySet = device.createQuerySet({
  type: "occlusion",
  count: 32,
});
```

## See also

- The WebGPU API
