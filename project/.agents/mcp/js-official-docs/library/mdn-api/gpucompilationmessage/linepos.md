---
title: "GPUCompilationMessage: linePos property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucompilationmessage/linepos/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCompilationMessage: linePos property

The **`linePos`** read-only property of the
`GPUCompilationMessage` interface is a number representing the position in the code line that the message corresponds to. This could be an exact point, or the start of the relevant substring.

## Value

A number.

To be precise, `linePos` is the number of UTF-16 code units from the beginning of the line to the exact point or start of the relevant substring that the message corresponds to.

Note that:

- If the message corresponds to a substring, `linePos` refers to the first UTF-16 code unit of the substring.
- If the message does not correspond to a specific code position (perhaps it refers to the whole of the shader code), `linePos` will be 0.
- Values are one-based — a value of 1 refers to the first code unit of the line.

## Examples

```js
const shaderModule = device.createShaderModule({
  code: shaders,
});

const shaderInfo = await shaderModule.getCompilationInfo();
const firstMessage = shaderInfo.messages[0];
console.log(firstMessage.linePos);
```

See the main `GPUCompilationInfo` page for a more detailed example.

## See also

- The WebGPU API
