---
title: "GPUTexture: depthOrArrayLayers property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gputexture/depthorarraylayers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUTexture: depthOrArrayLayers property

The **`depthOrArrayLayers`** read-only property of the
`GPUTexture` interface represents the depth or layer count of the `GPUTexture`.

This is set based on the `size` property in the descriptor object passed into the originating `GPUDevice.createTexture()` call.

## Value

A number. This represents:

- The depth in pixels, in the case of textures with a `"3d"` `GPUTexture.dimension`.
- The number of layers, in the case of layered textures with a `"2d"` `GPUTexture.dimension`.

In cases where the `GPUTexture` does not have a depth or layers, the value is 1.

## Examples

```js
// …

const test = device.createTexture({
  size: [128],
  format: "r8uint",
  dimension: "1d",
  usage: GPUTextureUsage.COPY_SRC,
});

console.log(test.depthOrArrayLayers); // 1
```

## See also

- The WebGPU API
