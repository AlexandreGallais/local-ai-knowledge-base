---
title: "GPUCompilationMessage: offset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucompilationmessage/offset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCompilationMessage: offset property

The **`offset`** read-only property of the
`GPUCompilationMessage` interface is a number representing the offset from the start of the shader code to the exact point, or the start of the relevant substring, that the message corresponds to.

## Value

A number.

To be precise, `offset` is the number of UTF-16 code units from the beginning of the shader code to the exact point or start of the relevant substring that the message corresponds to.

If the message does not correspond to a specific code position (perhaps it refers to the whole of the shader code), `offset` will be 0.

## Examples

```js
const shaderModule = device.createShaderModule({
  code: shaders,
});

const shaderInfo = await shaderModule.getCompilationInfo();
const firstMessage = shaderInfo.messages[0];
console.log(firstMessage.offset);
```

See the main `GPUCompilationInfo` page for a more detailed example.

## See also

- The WebGPU API
