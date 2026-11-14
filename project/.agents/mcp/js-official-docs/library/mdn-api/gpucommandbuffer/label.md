---
title: "GPUCommandBuffer: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandbuffer/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandBuffer: label property

The **`label`** property of the
`GPUCommandBuffer` interface is a string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUCommandEncoder.finish()` call, or you can get and set it directly on the `GPUCommandBuffer` object.

## Value

A string. If no label value has previously been set, getting the label returns an empty string.

## Examples

Setting and getting a label via `GPUCommandBuffer.label`:

```js
const commandBuffer = commandEncoder.finish();
commandBuffer.label = "my_command_buffer";
console.log(commandBuffer.label); // "my_command_buffer"
```

Setting a label via the originating `GPUCommandEncoder.finish()` call, and then getting it via `GPUCommandBuffer.label`:

```js
const commandBuffer = commandEncoder.finish({
  label: "my_command_buffer",
});

console.log(commandBuffer.label); // "my_command_buffer"
```

## See also

- The WebGPU API
