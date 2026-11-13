---
title: "GPUCompilationMessage: lineNum property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucompilationmessage/linenum/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCompilationMessage: lineNum property

The **`lineNum`** read-only property of the
`GPUCompilationMessage` interface is a number representing the line number in the shader code that the message corresponds to.

## Value

A number.

Note that:

- If the message corresponds to a substring, `lineNum` refers to the line number that the substring begins on.
- If the message does not correspond to a specific line of code (perhaps it refers to the whole of the shader code), `lineNum` will be 0.
- Values are one-based — a value of 1 refers to the first line of code.
- Lines are delimited by line breaks. In WGSL, a specific list of characters is defined as line breaks.

## Examples

```js
const shaderModule = device.createShaderModule({
  code: shaders,
});

const shaderInfo = await shaderModule.getCompilationInfo();
const firstMessage = shaderInfo.messages[0];
console.log(firstMessage.lineNum);
```

See the main `GPUCompilationInfo` page for a more detailed example.

## See also

- The WebGPU API
