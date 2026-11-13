---
title: "GPUTexture: usage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gputexture/usage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUTexture: usage property

The **`usage`** read-only property of the
`GPUTexture` interface is the bitwise flags representing the allowed usages of the `GPUTexture`.

This is set via the `usage` property in the descriptor object passed into the originating `GPUDevice.createTexture()` call.

## Value

The bitwise flags representing the original usages set when the `GPUTexture` was first created. The returned number is the sum of decimal values representing the different flags, as seen in the table below.

| Usage flag                             | Usage description                                                                                                                                                                                                                                                                                                                               | Hex equiv. | Decimal equiv. |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------- |
| `GPUTextureUsage.COPY_SRC`             | The texture can be used as the source of a copy operation, for example the source argument of a `copyTextureToBuffer()` call.                                                                                                                                                             | 0x01       | 1              |
| `GPUTextureUsage.COPY_DST`             | The texture can be used as the destination of a copy/write operation, for example the destination argument of a `copyBufferToTexture()` call.                                                                                                                                             | 0x02       | 2              |
| `GPUTextureUsage.RENDER_ATTACHMENT`    | The texture can be used as a color or depth/stencil attachment in a render pass, for example as the `view` property of the descriptor object in a `beginRenderPass()` call.                                                                                                                   | 0x10       | 16             |
| `GPUTextureUsage.STORAGE_BINDING`      | The texture can be bound for use as a storage texture in a shader, for example as a resource in a bind group entry when creating a `GPUBindGroup` (via `createBindGroup()`), which adheres to a `GPUBindGroupLayout` entry with a specified storage texture binding layout. | 0x08       | 8              |
| `GPUTextureUsage.TEXTURE_BINDING`      | The texture can be bound for use as a sampled texture in a shader, for example as a resource in a bind group entry when creating a `GPUBindGroup` (via `createBindGroup()`), which adheres to a `GPUBindGroupLayout` entry with a specified texture binding layout.         | 0x04       | 4              |
| `GPUTextureUsage.TRANSIENT_ATTACHMENT` | The texture is intended to be a temporary optimization hint, creating memory-efficient attachments that are only used within the current render pass. Related render pass <example-value> stay in tile memory, which avoids VRAM traffic and can avoid VRAM allocation for the textures.                                                             | 0x20       | 32             |

## Examples

```js
// …

const depthTexture = device.createTexture({
  size: [canvas.width, canvas.height],
  format: "depth24plus",
  usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

console.log(depthTexture.usage); // 16
```

## See also

- The WebGPU API
