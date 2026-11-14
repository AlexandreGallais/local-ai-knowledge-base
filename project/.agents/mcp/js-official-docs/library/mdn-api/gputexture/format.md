---
title: "GPUTexture: format property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gputexture/format/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUTexture: format property

The **`format`** read-only property of the
`GPUTexture` interface represents the format of the `GPUTexture`.

This is set via the `format` property in the descriptor object passed into the originating `GPUDevice.createTexture()` call.

## Value

An enumerated value. See the specification's Texture formats section for all the possible values. Also see Tier 1 and Tier 2 texture formats.

## Examples

```js
// …

const depthTexture = device.createTexture({
  size: [canvas.width, canvas.height],
  format: "depth24plus",
  usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

console.log(depthTexture.format); // "depth24plus"
```

## See also

- The WebGPU API
