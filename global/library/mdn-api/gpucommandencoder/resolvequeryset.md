---
title: "GPUCommandEncoder: resolveQuerySet() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandencoder/resolvequeryset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandEncoder: resolveQuerySet() method

The **`resolveQuerySet()`** method of the
`GPUCommandEncoder` interface encodes a command that resolves a `GPUQuerySet`, copying the results into a specified `GPUBuffer`.

## Syntax

```js
resolveQuerySet(querySet, firstQuery, queryCount, destination, destinationOffset)
```

### Parameters

- `querySet`
    A `GPUQuerySet` object representing the query set to be resolved.
- `firstQuery`
    The index number of the first query value to be copied over to the buffer.
- `queryCount`
    The number of queries to be copied over to the buffer, starting from `firstQuery`.
- `destination`
    A `GPUBuffer` representing the buffer to copy the query values to.
- `destinationOffset`
    A number representing the offset, in bytes, from the start of the buffer to start writing the query values at.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`resolveQuerySet()`**, otherwise a `GPUValidationError` is generated and the `GPUCommandEncoder` becomes invalid:

- The `destination.buffer`'s `GPUBuffer.usage` includes the `GPUBufferUsage.QUERY_RESOLVE` flag.
- `firstQuery` is smaller than the number of queries in `querySet`.
- `firstQuery` + `queryCount` is smaller than or equal to the number of queries in `querySet`.
- `destinationOffset` is a multiple of 256.
- `destinationOffset` + 8 × `queryCount` is less than or equal to `destination.size`.

## Examples

```js
// …

const queryBuffer = device.createBuffer({
  size: 1024,
  usage: GPUBufferUsage.QUERY_RESOLVE,
});

const querySet = device.createQuerySet({
  type: "timestamp",
  count: 32,
});

// …

const commandEncoder = device.createCommandEncoder();

// Write timestamps to querySet
commandEncoder.writeTimestamp(querySet, 0);
// …
commandEncoder.writeTimestamp(querySet, 1);
// etc.

// …

commandEncoder.resolveQuerySet(
  querySet,
  0, // First query to write
  16, // Number of queries to count
  queryBuffer,
  0, // Buffer offset
);

// …
```

## See also

- The WebGPU API
