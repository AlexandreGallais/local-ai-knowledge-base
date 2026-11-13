---
title: "GPUTexture: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gputexture/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUTexture: label property

The **`label`** property of the
`GPUTexture` interface provides a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUDevice.createTexture()` call, or you can get and set it directly on the `GPUTexture` object.

## Value

A string. If this has not been previously set as described above, it will be an empty string.

## Examples

Setting and getting a label via `GPUTexture.label`:

```js
// …

const depthTexture = device.createTexture({
  size: [canvas.width, canvas.height],
  format: "depth24plus",
  usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

depthTexture.label = "my_texture";

console.log(depthTexture.label); // "my_texture"
```

Setting a label via the originating `GPUDevice.createTexture()` call, and then getting it via `GPUTexture.label`:

```js
// …

const depthTexture = device.createTexture({
  size: [canvas.width, canvas.height],
  format: "depth24plus",
  usage: GPUTextureUsage.RENDER_ATTACHMENT,
  label: "my_texture",
});

console.log(depthTexture.label); // "my_texture"
```

## See also

- The WebGPU API
