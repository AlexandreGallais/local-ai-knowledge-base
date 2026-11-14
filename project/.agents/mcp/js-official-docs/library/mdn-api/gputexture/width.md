---
title: "GPUTexture: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gputexture/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUTexture: width property

The **`width`** read-only property of the
`GPUTexture` interface represents the width of the `GPUTexture`.

This is set based on the value of the `size` property in the descriptor object passed into the originating `GPUDevice.createTexture()` call.

## Value

A number.

## Examples

```js
// …

const depthTexture = device.createTexture({
  size: [640, 480],
  format: "depth24plus",
  usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

console.log(depthTexture.width); // 640
```

## See also

- The WebGPU API
