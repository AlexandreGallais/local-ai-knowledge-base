---
title: "GPUBuffer: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpubuffer/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUBuffer: size property

The **`size`** read-only property of the
`GPUBuffer` interface represents the length of the `GPUBuffer`'s memory allocation, in bytes.

`size` is set via the `size` property in the descriptor object passed into the originating `GPUDevice.createBuffer()` call.

## Value

A number.

## Examples

```js
// Define global buffer size
const BUFFER_SIZE = 1000;

// …

const output = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
});

console.log(output.size); // 1000
```

## See also

- The WebGPU API
