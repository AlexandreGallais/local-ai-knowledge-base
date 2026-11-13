---
title: "GPUBuffer: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpubuffer/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUBuffer: label property

The **`label`** property of the
`GPUBuffer` interface provides a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUDevice.createBuffer()` call, or you can get and set it directly on the `GPUBuffer` object.

## Value

A string. If this has not been previously set as described above, it will be an empty string.

## Examples

Setting and getting a label via `GPUBuffer.label`:

```js
const output = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
});

output.label = "my_buffer";

console.log(output.label); // "my_buffer"
```

Setting a label via the originating `GPUDevice.createBuffer()` call, and then getting it via `GPUBuffer.label`:

```js
const output = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
  label: "my_buffer",
});

console.log(output.label); // "my_buffer"
```

## See also

- The WebGPU API
