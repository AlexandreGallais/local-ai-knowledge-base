---
title: "GPUBuffer: usage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpubuffer/usage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUBuffer: usage property

The **`usage`** read-only property of the
`GPUBuffer` interface contains the bitwise flags representing the allowed usages of the `GPUBuffer`.

`usage` is set via the `usage` property in the descriptor object passed into the originating `GPUDevice.createBuffer()` call.

## Value

The bitwise flags representing the original usages set when the `GPUBuffer` was first created. The returned number is the sum of decimal values representing the different flags, as seen in the table below.

| Bitwise flag                   | Usage description                                                                                                                                                                                                                                                                                                                                    | Hex equiv. | Decimal equiv. |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------- |
| `GPUBufferUsage.COPY_SRC`      | The buffer can be used as the source of a copy operation, for example the source argument of a `copyBufferToBuffer()` call.                                                                                                                                                                      | 0x0004     | 4              |
| `GPUBufferUsage.COPY_DST`      | The buffer can be used as the destination of a copy/write operation, for example the destination argument of a `copyTextureToBuffer()` call.                                                                                                                                                   | 0x0008     | 8              |
| `GPUBufferUsage.INDEX`         | The buffer can be used as an index buffer, for example as the `buffer` argument passed to `setIndexBuffer()`.                                                                                                                                                                                    | 0x0010     | 16             |
| `GPUBufferUsage.INDIRECT`      | The buffer can be used to store indirect command arguments, for example as the `indirectBuffer` argument of a `drawIndirect()` or `dispatchWorkgroupsIndirect()` call.                                                            | 0x0100     | 256            |
| `GPUBufferUsage.MAP_READ`      | The buffer can be mapped for reading, for example when calling `mapAsync()` with a `mode` of `GPUMapMode.READ`. This flag may only be combined with `GPUBufferUsage.COPY_DST`.                                                                                                                                    | 0x0001     | 1              |
| `GPUBufferUsage.MAP_WRITE`     | The buffer can be mapped for writing, for example when calling `mapAsync()` with a `mode` of `GPUMapMode.WRITE`. This flag may only be combined with `GPUBufferUsage.COPY_SRC`.                                                                                                                                   | 0x0002     | 2              |
| `GPUBufferUsage.QUERY_RESOLVE` | The buffer can be used to capture query results, for example as the destination argument of a `resolveQuerySet()` call.                                                                                                                                                                            | 0x0200     | 512            |
| `GPUBufferUsage.STORAGE`       | The buffer can be used as a storage buffer, for example as a resource in a bind group entry when creating a `GPUBindGroup` (via `createBindGroup()`), which adheres to a `GPUBindGroupLayout` entry with a buffer binding layout `type` of `"storage"` or `"read-only-storage"`. | 0x0080     | 128            |
| `GPUBufferUsage.UNIFORM`       | The buffer can be used as a uniform buffer, for example as a resource in a bind group entry when creating a `GPUBindGroup` (via `createBindGroup()`), which adheres to a `GPUBindGroupLayout` entry with a buffer binding layout `type` of `"uniform"`.                          | 0x0040     | 64             |
| `GPUBufferUsage.VERTEX`        | The buffer can be used as a vertex buffer, for example as the `buffer` argument passed to `setVertexBuffer()`.                                                                                                                                                                                  | 0x0020     | 32             |

## Examples

```js
const output = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
});

console.log(output.usage); // 132

const stagingBuffer = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
});

console.log(stagingBuffer.usage); // 9
```

## See also

- The WebGPU API
