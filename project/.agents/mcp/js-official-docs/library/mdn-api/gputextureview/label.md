---
title: "GPUTextureView: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gputextureview/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUTextureView: label property

The **`label`** property of the
`GPUTextureView` interface provides a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUTexture.createView()` call, or you can get and set it directly on the `GPUTextureView` object.

## Value

A string. If this has not been previously set as described above, it will be an empty string.

## Examples

Setting and getting a label via `GPUTextureView.label`:

```js
// …

const depthTexture = device.createTexture({
  size: [canvas.width, canvas.height],
  format: "depth24plus",
  usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

const view = depthTexture.createView();

view.label = "my_view";

console.log(view.label); // "my_view"
```

Setting a label via the originating `GPUTexture.createView()` call, and then getting it via `GPUTextureView.label`:

```js
// …

const depthTexture = device.createTexture({
  size: [canvas.width, canvas.height],
  format: "depth24plus",
  usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

const view = depthTexture.createView({
  label: "my_view",
});

console.log(view.label); // "my_view"
```

## See also

- The WebGPU API
