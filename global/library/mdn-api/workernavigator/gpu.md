---
title: "WorkerNavigator: gpu property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workernavigator/gpu/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerNavigator: gpu property

The **`gpu`** read-only property of the `WorkerNavigator` interface returns the `GPU` object for the current worker context, which is the entry point for the `WebGPU API`.

## Value

A `GPU` object.

## Examples

```js
// Can be run inside a web worker
async function init() {
  if (!navigator.gpu) {
    throw Error("WebGPU not supported.");
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const device = await adapter.requestDevice();

  // …
}
```

## See also

- `WebGPU API`
