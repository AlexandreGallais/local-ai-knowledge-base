---
title: "GPUCommandEncoder: writeTimestamp() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandencoder/writetimestamp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandEncoder: writeTimestamp() method

The **`writeTimestamp()`** method of the
`GPUCommandEncoder` interface encodes a command that writes a timestamp into a `GPUQuerySet` once the previous commands recorded into the same queued `GPUCommandBuffer` have been executed by the GPU.

> **Note:**
> To use timestamp queries, the `timestamp-query` `feature` must be enabled in the `GPUDevice`.

## Syntax

```js
writeTimestamp(querySet, queryIndex)
```

### Parameters

- `querySet`
    A `GPUQuerySet` object representing the query set that will store the timestamp values.
- `queryIndex`
    A number representing the index of the query in the query set.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`writeTimestamp()`**, otherwise a `GPUValidationError` is generated and the `GPUCommandEncoder` becomes invalid:

- The `timestamp-query` `feature` is enabled in the `GPUDevice`.
- The `querySet` `GPUQuerySet.type` is `"timestamp"`
- The `queryIndex` value is less than the `GPUQuerySet.count`.

## Examples

```js
// …

const querySet = device.createQuerySet({
  type: "timestamp",
  count: 32,
});

// …

commandEncoder.writeTimestamp(querySet, 0);

// …
```

## See also

- The WebGPU API
