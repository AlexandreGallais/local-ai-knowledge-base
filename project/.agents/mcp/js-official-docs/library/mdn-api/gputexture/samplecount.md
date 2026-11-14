---
title: "GPUTexture: sampleCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gputexture/samplecount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUTexture: sampleCount property

The **`sampleCount`** read-only property of the
`GPUTexture` interface represents the sample count of the `GPUTexture`.

This is set via the `sampleCount` property in the descriptor object passed into the originating `GPUDevice.createTexture()` call. If omitted, this defaults to 1.

## Value

A number. Possible values are:

- 1
- 4, which indicates a multi-sampled texture.

## Examples

```js
// …

const depthTexture = device.createTexture({
  size: [canvas.width, canvas.height],
  format: "depth24plus",
  usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

console.log(depthTexture.sampleCount); // 1
```

## See also

- The WebGPU API
