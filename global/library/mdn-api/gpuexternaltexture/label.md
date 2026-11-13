---
title: "GPUExternalTexture: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuexternaltexture/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUExternalTexture: label property

The **`label`** property of the
`GPUExternalTexture` interface provides a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUDevice.importExternalTexture()` call, or you can get and set it directly on the `GPUExternalTexture` object.

## Value

A string. If this has not been previously set as described above, it will be an empty string.

## Examples

Setting and getting a label via `GPUExternalTexture.label`:

```js
// …

const externalTexture = device.importExternalTexture({
  source: video,
});

externalTexture.label = "my_ext_texture";

console.log(externalTexture.label); // "my_ext_texture"
```

Setting a label via the originating `GPUDevice.importExternalTexture()` call, and then getting it via `GPUExternalTexture.label`:

```js
// …

const externalTexture = device.importExternalTexture({
  source: video,
  label: "my_ext_texture",
});

console.log(externalTexture.label); //  "my_ext_texture"
```

## See also

- The WebGPU API
