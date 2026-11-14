---
title: "GPUDevice: createShaderModule() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/createshadermodule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: createShaderModule() method

The **`createShaderModule()`** method of the
`GPUDevice` interface creates a `GPUShaderModule` from a string of WGSL source code.

## Syntax

```js
createShaderModule(descriptor)
```

### Parameters

- `descriptor`
    An object containing the following properties:
    - `code`
        A string representing the WGSL source code for the shader module.
    - `hints` (optional)
        A sequence of record types, with the structure `("string", compilationHint)`. These behave like ordered maps. In each case, the `"string"` is a key used to identify or select the record, and the `compilationHint` is either a `GPUPipelineLayout` object instance or an enumerated value of `"auto"`.

        The point of `hints` is to provide information about the pipeline layout as early as possible to improve performance. The idea is to maximize the amount of compilation that can be done once by `createShaderModule()`, rather than multiple times in multiple calls to `GPUDevice.createComputePipeline()` and `GPUDevice.createRenderPipeline()`.

        > **Note:**
        > Different implementations may handle `hints` in different ways, including possibly ignoring them entirely. Providing hints does not guarantee improved shader compilation performance on all browsers/systems.

    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.
    - `sourceMap` (optional)
        A source map definition to provide developer tool integration such as source-language debugging. WGSL names (identifiers) in source maps should follow the rules defined in WGSL identifier comparison. If defined, the source map may be interpreted as a source-map-v3 format.

        > **Note:**
        > Different implementations may handle `sourceMap`s in different ways, including possibly ignoring them entirely.

### Return value

A `GPUShaderModule` object instance.

### Validation

The following criteria must be met when calling **`createShaderModule()`**, otherwise a `GPUValidationError` is generated and an invalid `GPUShaderModule` object is returned:

- If your shader's WGSL code uses the half-precision floating-point type `f16`, it includes `enable f16;` at the top, and the associated `GPUDevice` is created with the `shader-f16` feature enabled.

## Examples

In our basic <example-value> demo, our shader module is created using the following code:

```js
const shaders = `
struct VertexOut {
  @builtin(position) position : vec4f,
  @location(0) color : vec4f
}

@vertex
fn vertex_main(@location(0) position: vec4f,
               @location(1) color: vec4f) -> VertexOut
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

async function init() {
  if (!navigator.gpu) {
    throw Error("WebGPU not supported.");
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const device = await adapter.requestDevice();

  // …
  // later on

  const shaderModule = device.createShaderModule({
    code: shaders,
  });

  // …
}
```

## See also

- The WebGPU API
- The WebGPU Shading Language specification
