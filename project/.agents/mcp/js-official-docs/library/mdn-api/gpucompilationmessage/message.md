---
title: "GPUCompilationMessage: message property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucompilationmessage/message/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCompilationMessage: message property

The **`message`** read-only property of the
`GPUCompilationMessage` interface is a string representing human-readable message text.

## Value

A string.

## Examples

```js
const shaderModule = device.createShaderModule({
  code: shaders,
});

const shaderInfo = await shaderModule.getCompilationInfo();
const firstMessage = shaderInfo.messages[0];
console.log(firstMessage.message);
```

See the main `GPUCompilationInfo` page for a more detailed example.

## See also

- The WebGPU API
