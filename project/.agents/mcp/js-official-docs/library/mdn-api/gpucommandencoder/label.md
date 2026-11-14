---
title: "GPUCommandEncoder: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandencoder/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandEncoder: label property

The **`label`** property of the
`GPUCommandEncoder` interface is a string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUDevice.createCommandEncoder()` call, or you can get and set it directly on the `GPUCommandEncoder` object.

## Value

A string. If no label value has previously been set, getting the label returns an empty string.

## Examples

Setting and getting a label via `GPUCommandEncoder.label`:

```js
const commandEncoder = device.createCommandEncoder();
commandEncoder.label = "my_command_encoder";
console.log(commandEncoder.label); // "my_command_encoder"
```

Setting a label via the originating `GPUDevice.createCommandEncoder()` call, and then getting it via `GPUCommandEncoder.label`:

```js
const commandEncoder = device.createCommandEncoder({
  label: "my_command_encoder",
});

console.log(commandEncoder.label); // "my_command_encoder"
```

## See also

- The WebGPU API
