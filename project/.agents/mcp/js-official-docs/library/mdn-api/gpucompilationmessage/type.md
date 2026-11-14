---
title: "GPUCompilationMessage: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucompilationmessage/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCompilationMessage: type property

The **`type`** read-only property of the
`GPUCompilationMessage` interface is an enumerated value representing the type of the message. Each type represents a different severity level.

## Value

An enumerated value. Possible values are:

- `"error"`
    A shader-creation error, which stops successful compilation.
- `"info"`
    A purely informative message, which is low severity.
- `"warning"`
    A warning about an issue that will not stop successful compilation, but merits attention by the developer. An example is usage of deprecated functions or syntax.

## Examples

```js
const shaderModule = device.createShaderModule({
  code: shaders,
});

const shaderInfo = await shaderModule.getCompilationInfo();
const firstMessage = shaderInfo.messages[0];
console.log(firstMessage.type);
```

See the main `GPUCompilationInfo` page for a more detailed example.

## See also

- The WebGPU API
