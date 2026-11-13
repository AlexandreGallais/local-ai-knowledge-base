---
title: "GPUDevice: createPipelineLayout() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/createpipelinelayout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: createPipelineLayout() method

The **`createPipelineLayout()`** method of the
`GPUDevice` interface creates a `GPUPipelineLayout` that defines the `GPUBindGroupLayout`s used by a pipeline. `GPUBindGroup`s used with the pipeline during command encoding must have compatible `GPUBindGroupLayout`s.

## Syntax

```js
createPipelineLayout(descriptor)
```

### Parameters

- `descriptor`
    An object containing the following properties:
    - `bindGroupLayouts`
        An array of values representing the bind group layouts for a pipeline. Each value can be:
        - A `GPUBindGroupLayout` object, created via a call to `GPUDevice.createBindGroupLayout()`. Each object corresponds to a `@group` attribute in the shader code contained in the `GPUShaderModule` used in a related pipeline.
        - `null`, which represents an empty bind group layout. `null` values are ignored when creating a pipeline layout.
    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

### Return value

A `GPUPipelineLayout` object instance.

### Validation

The following criteria must be met when calling **`createPipelineLayout()`**, otherwise a `GPUValidationError` is generated and an invalid `GPUPipelineLayout` object is returned:

- The `GPUBindGroupLayout` objects in `bindGroupLayouts` are valid.
- The number of `GPUBindGroupLayout` objects in `bindGroupLayouts` is less than the `GPUDevice`'s `maxBindGroups` `limit`.

## Examples

> **Note:**
> The WebGPU samples feature many more examples.

### Multiple bind group layouts, bind group, and pipeline layout

The following snippet:

- Creates a `GPUBindGroupLayout` that describes a binding with a buffer, a texture, and a sampler.
- Creates a `GPUPipelineLayout` based on the `GPUBindGroupLayout`.

```js
// …

const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
      buffer: {},
    },
    {
      binding: 1,
      visibility: GPUShaderStage.FRAGMENT,
      texture: {},
    },
    {
      binding: 2,
      visibility: GPUShaderStage.FRAGMENT,
      sampler: {},
    },
  ],
});

const pipelineLayout = device.createPipelineLayout({
  bindGroupLayouts: [bindGroupLayout],
});

// …
```

### Specifying an empty bind group layout

In this snippet, we create three bind group layouts, with bind group layout 1 representing fragment data and bind group layout 2 representing vertex data. If we want to create a pipeline that uses only bind group layouts 0 and 2, we can pass `null` for bind group layout 1 and then render without a fragment shader.

```js
const bgl0 = device.createBindGroupLayout({ entries: myGlobalEntries });
const bgl1 = device.createBindGroupLayout({ entries: myFragmentEntries });
const bgl2 = device.createBindGroupLayout({ entries: myVertexEntries });

// pipeline layout can be used to render without a fragment shader
const pipelineLayout = device.createPipelineLayout({
  bindGroupLayouts: [bgl0, null, bgl2],
});
```

## See also

- The WebGPU API
