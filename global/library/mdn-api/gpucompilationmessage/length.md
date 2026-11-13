---
title: "GPUCompilationMessage: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucompilationmessage/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCompilationMessage: length property

The **`length`** read-only property of the
`GPUCompilationMessage` interface is a number representing the length of the substring that the message corresponds to.

## Value

A number.

To be precise, `length` is the number of UTF-16 code units in the shader code substring that the message corresponds to. If the message corresponds to a single point rather than a substring, `length` will be 0.

## Examples

```js
const shaderModule = device.createShaderModule({
  code: shaders,
});

const shaderInfo = await shaderModule.getCompilationInfo();
const firstMessage = shaderInfo.messages[0];
console.log(firstMessage.length);
```

See the main `GPUCompilationInfo` page for a more detailed example.

## See also

- The WebGPU API
