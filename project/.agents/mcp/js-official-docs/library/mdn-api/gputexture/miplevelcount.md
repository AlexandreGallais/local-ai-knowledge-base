---
title: "GPUTexture: mipLevelCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gputexture/miplevelcount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUTexture: mipLevelCount property

The **`mipLevelCount`** read-only property of the
`GPUTexture` interface represents the number of mip levels of the `GPUTexture`.

This is set via the `mipLevelCount` property in the descriptor object passed into the originating `GPUDevice.createTexture()` call. If omitted, this defaults to 1.

## Value

A number.

## Examples

```js
// …

const depthTexture = device.createTexture({
  size: [canvas.width, canvas.height],
  format: "depth24plus",
  usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

console.log(depthTexture.mipLevelCount); // 1
```

## See also

- The WebGPU API
