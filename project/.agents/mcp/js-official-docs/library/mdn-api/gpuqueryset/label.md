---
title: "GPUQuerySet: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuqueryset/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUQuerySet: label property

The **`label`** property of the
`GPUQuerySet` interface is a string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUDevice.createQuerySet()` call, or you can get and set it directly on the `GPUQuerySet` object.

## Value

A string. If this has not been previously set as described above, it will be an empty string.

## Examples

Setting and getting a label via `GPUQuerySet.label`:

```js
const querySet = device.createQuerySet({
  type: "occlusion",
  count: 32,
});

querySet.label = "my_query_set";

console.log(querySet.label); // "my_query_set"
```

Setting a label via the originating `GPUDevice.createQuerySet()` call, and then getting it via `GPUQuerySet.label`:

```js
const querySet = device.createQuerySet({
  type: "occlusion",
  count: 32,
  label: "my_query_set",
});

console.log(querySet.label); // "my_query_set"
```

## See also

- The WebGPU API
