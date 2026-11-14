---
title: "GPUShaderModule: getCompilationInfo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpushadermodule/getcompilationinfo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUShaderModule: getCompilationInfo() method

The **`getCompilationInfo()`** method of the
`GPUShaderModule` interface returns a `Promise` that fulfills with a `GPUCompilationInfo` object containing messages generated during the `GPUShaderModule`'s compilation.

## Syntax

```js
getCompilationInfo()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with a `GPUCompilationInfo` object.

`GPUCompilationInfo` contains a `messages` property, which is an array of `GPUCompilationMessage` objects, each one containing the details of an individual compilation message.

## Examples

In the example below, we have deliberately left a parenthesis out of a function declaration in our shader code:

```js
const shaders = `
struct VertexOut {
  @builtin(position) position : vec4f,
  @location(0) color : vec4f
}

@vertex
fn vertex_main(@location(0) position: vec4f,
               @location(1) color: vec4f -> VertexOut
{
  var output : VertexOut;
  output.position = position;
  output.color = color;
  return output;
}

@fragment
fn fragment_main(fragData: VertexOut) -> @location(0) vec4f
{
  return fragData.color;
}
`;
```

When we compile the shader module, we use `getCompilationInfo()` to grab some information about the resulting error:

```js
async function init() {
  // …

  const shaderModule = device.createShaderModule({
    code: shaders,
  });

  const shaderInfo = await shaderModule.getCompilationInfo();
  const firstMessage = shaderInfo.messages[0];

  console.log(firstMessage.lineNum); // 9
  console.log(firstMessage.message); // "expected ')' for function declaration"
  console.log(firstMessage.type); // "error"

  // …
}
```

## See also

- The WebGPU API
