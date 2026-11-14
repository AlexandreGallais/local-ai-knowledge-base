---
title: "GPUShaderModule: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpushadermodule/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUShaderModule: label property

The **`label`** property of the
`GPUShaderModule` interface provides a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUDevice.createShaderModule()` call, or you can get and set it directly on the `GPUShaderModule` object.

## Value

A string. If this has not been previously set as described above, it will be an empty string.

## Examples

Setting and getting a label via `GPUShaderModule.label`:

```js
// …

const shaderModule = device.createShaderModule({
  code: shaders,
});

shaderModule.label = "my_shader";

console.log(shaderModule.label); // "my_shader"
```

Setting a label via the originating `GPUDevice.createShaderModule()` call, and then getting it via `GPUShaderModule.label`:

```js
// …

const shaderModule = device.createShaderModule({
  code: shaders,
  label: "my_shader",
});

console.log(shaderModule.label); // "my_shader"
```

## See also

- The WebGPU API
