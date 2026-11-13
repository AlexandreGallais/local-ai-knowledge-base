---
title: "GPUTexture: dimension property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gputexture/dimension/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUTexture: dimension property

The **`dimension`** read-only property of the
`GPUTexture` interface represents the dimension of the set of texels for each `GPUTexture` subresource.

This is set via the `dimension` property in the descriptor object passed into the originating `GPUDevice.createTexture()` call, which defaults to `"2d"` if omitted.

## Value

An enumerated value. Possible values are:

- `"1d"`: A one-dimensional texture with a single dimension, width.
- `"2d"`: A two-dimensional texture with a width and height, which may also have layers. Only `"2d"` textures can have mipmaps, be multisampled, use a compressed or depth/stencil format, and be used as a render attachment.
- `"3d"`: A three-dimensional texture with a width, height, and depth.

## Examples

```js
// …

const depthTexture = device.createTexture({
  size: [canvas.width, canvas.height],
  format: "depth24plus",
  usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

console.log(depthTexture.dimension); // "2d"
```

## See also

- The WebGPU API
