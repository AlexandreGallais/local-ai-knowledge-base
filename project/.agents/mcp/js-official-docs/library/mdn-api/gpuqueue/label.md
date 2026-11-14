---
title: "GPUQueue: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuqueue/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUQueue: label property

The **`label`** property of the
`GPUQueue` interface is a string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

You can get and set it directly on the `GPUQueue` object.

## Value

A string. If no label value has previously been set, getting the label returns an empty string.

## Examples

Setting and getting a label via `GPUQueue.label`:

```js
device.queue.label = "my_queue";
console.log(device.queue.label); // "my_queue"
```

You can also set the queue's label at the time you request the device, like this:

```js
const device = adapter.requestDevice({
  defaultQueue: { label: "my_queue" },
});
```

## See also

- The WebGPU API
