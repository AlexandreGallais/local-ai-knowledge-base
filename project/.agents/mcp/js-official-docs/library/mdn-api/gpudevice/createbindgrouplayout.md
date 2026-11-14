---
title: "GPUDevice: createBindGroupLayout() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/createbindgrouplayout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: createBindGroupLayout() method

The **`createBindGroupLayout()`** method of the
`GPUDevice` interface creates a `GPUBindGroupLayout` that defines the structure and purpose of related GPU resources such as buffers that will be used in a pipeline, and is used as a template when creating `GPUBindGroup`s.

## Syntax

```js
createBindGroupLayout(descriptor)
```

### Parameters

- `descriptor`
    An object containing the following properties:
    - `entries`
        An array of entry objects, each one of which describes a single shader resource binding to be included in the `GPUBindGroupLayout`. Each entry will correspond to an entry defined in a `GPUBindGroup` (created via a `GPUDevice.createBindGroup()` call) that uses this `GPUBindGroupLayout` object as a template.
    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

### Entry objects

An entry object includes the following properties:

- `binding`
    A number representing a unique identifier for this particular entry, which matches the `binding` value of a corresponding `GPUBindGroup` entry. In addition, it matches the `n` index value of the corresponding `@binding(n)` attribute in the shader (`GPUShaderModule`) used in the related pipeline.
- `visibility`
    One or more bitwise flags defining the shader stages that a `GPUBindGroup` entry corresponding to this entry will be visible to. Possible values are:
    - `GPUShaderStage.COMPUTE`: The bind group entry will be accessible to compute shaders.
    - `GPUShaderStage.FRAGMENT`: The bind group entry will be accessible to fragment shaders.
    - `GPUShaderStage.VERTEX`: The bind group entry will be accessible to vertex shaders.

    Note that multiple stages can be specified by separating values with bitwise OR, for example: `GPUShaderStage.FRAGMENT | GPUShaderStage.VERTEX`.

- "Resource layout object"
    An object that defines the required binding resource type and structure of the `GPUBindGroup` entry corresponding to this entry. This property can be one of `buffer`, `externalTexture`, `sampler`, `storageTexture`, or `texture`, the object structures of which are described in the next section.

### Resource layout objects

The resource layout object can be one of the following (see also `GPUDevice.createBindGroup()` for details of how the required resources for each entry are structured):

- `buffer`: Indicates that the corresponding `GPUBindGroup` entry will be a `GPUBufferBinding` object, which contains a `GPUBuffer` plus `offset` and `size` values. A `buffer` resource layout object can contain the following properties:
  - `hasDynamicOffset` (optional)
      A boolean. If set to `true`, it indicates that this binding requires a dynamic offset, for example as set during a `GPURenderPassEncoder.setBindGroup()` call. If omitted, `hasDynamicOffset` defaults to `false`.

  - `minBindingSize` (optional)
      A number indicating the minimum allowed size, in bytes, of bound buffers. If omitted, `minBindingSize` defaults to 0. If the value is 0, minimum buffer size is ignored during pipeline creation and is instead validated by issued draw/dispatch commands.

  - `type` (optional)
      An enumerated value specifying the required type for `GPUBuffer`s bound to this binding (see `GPUDevice.createBuffer()` for more information on buffer types). Possible values are:
      - `"read-only-storage"`: A read-only buffer created with a `usage` of `GPUBufferUsage.STORAGE`.
      - `"storage"`: A writable buffer created with a `usage` of `GPUBufferUsage.STORAGE`.
      - `"uniform"`: A buffer created with a `usage` of `GPUBufferUsage.UNIFORM`.

      If omitted, `type` defaults to `"uniform"`.

- `externalTexture`: Indicates that the corresponding `GPUBindGroup` entry will be a `GPUExternalTexture` object. An `externalTexture` resource layout object is empty — `{}`.

- `sampler`: Indicates that the corresponding `GPUBindGroup` entry will be a `GPUSampler` object. A `sampler` resource layout object can contain the following properties:
  - `type` (optional)
      An enumerated value specifying the required type for `GPUSampler`s bound to this binding (see `GPUDevice.createSampler()` for more information on sampler types). Possible values are:
      - `"comparison"`: A comparison sampler.
      - `"filtering"`: A filtering sampler.
      - `"non-filtering"`: A non-filtering sampler.

      If omitted, `type` defaults to `"filtering"`.

- `storageTexture`: Indicates that the corresponding `GPUBindGroup` entry will be a `GPUTextureView` object. A `storageTexture` resource layout object can contain the following properties:
  - `access` (optional)
      An enumerated value specifying whether texture views bound to this binding will be bound for read and/or write access. Possible values are:
      - `"read-only"`: Enables WGSL code to read storage textures.
      - `"read-write"`: Enables WGSL code to read and write to storage textures.
      - `"write-only"`: The default value; enables WGSL code to write to storage textures.

      The `"read-only"` and `"read-write"` values can only be used if the `"readonly_and_readwrite_storage_textures"` WGSL language extension is present in `WGSLLanguageFeatures`. If this is not the case, a `GPUValidationError` is generated.

  - `format`
      An enumerated value specifying the required format of texture views bound to this binding. See the specification's Texture Formats section for all the available `format` values. Also see Tier 1 and Tier 2 texture formats.
      > **Note:**
      > Use of the `bgra8unorm` format for read-only storage textures is deprecated. The specification explicitly disallows this, as this format is intended for write-only access and is not portable. Any browser support for this combination is considered a bug.
  - `viewDimension` (optional)
      An enumerated value specifying the required dimension for texture views bound to this binding. Possible values are:
      - `"1d"`: The texture is viewed as a one-dimensional image.
      - `"2d"`: The texture is viewed as a single two-dimensional image.
      - `"2d-array"`: The texture is viewed as an array of two-dimensional images.
      - `"cube"`: The texture is viewed as a cubemap. The view has 6 array layers, corresponding to the `[+X, -X, +Y, -Y, +Z, -Z]` faces of the cube. Sampling is done seamlessly across the faces of the cubemap.
      - `"cube-array"`: The texture is viewed as a packed array of `n` cubemaps, each with 6 array layers corresponding to the `[+X, -X, +Y, -Y, +Z, -Z]` faces of the cube. Sampling is done seamlessly across the faces of the cubemaps.
      - `"3d"`: The texture is viewed as a three-dimensional image.

      If omitted, `viewDimension` defaults to `"2d"`.

- `texture`: Indicates that the corresponding `GPUBindGroup` entry will be a `GPUTextureView` object. A `texture` resource layout object can contain the following properties:
  - `multisampled` (optional)
      A boolean. A value of `true` indicates that texture views bound to this binding must be multi-sampled. If omitted, `multisampled` defaults to `false`.

  - `sampleType` (optional)
      An enumerated value specifying the sample type required for texture views bound to this binding (see `GPUDevice.createTexture()` for more information on texture view types). Possible values are:
      - `"depth"`
      - `"float"`
      - `"sint"`
      - `"uint"`
      - `"unfilterable-float"`

      If omitted, `sampleType` defaults to `"float"`.

  - `viewDimension` (optional)
      An enumerated value specifying the required dimension for texture views bound to this binding. Possible and default values are the same as for `storageTexture` resource layout objects — see above.

### Return value

A `GPUBindGroupLayout` object instance.

### Validation

The following criteria must be met when calling **`createBindGroupLayout()`**, otherwise a `GPUValidationError` is generated and an invalid `GPUBindGroupLayout` object is returned:

- Each entry's `binding` value is unique.
- Each entry's `binding` value is less than the `GPUDevice`'s `maxBindingsPerBindGroup` `limit`.
- The number of entries does not exceed the binding slot limits.
- Only 1 resource layout object is defined per entry.
- If an entry's `visibility` includes `GPUShaderStage.VERTEX`:
  - If its resource layout object is a `buffer`, its `type` is not `"storage"`.
  - Its resource layout object is not a `storageTexture`.
- If an entry's resource layout object is a `texture`, and its `multisampled` value is `true`:
  - Its `viewDimension` is `"2d"`.
  - Its `sampleType` is not `"float"`.
- If an entry's resource layout object is a `storageTexture`:
  - Its `viewDimension` is not `"cube"` or `"cube-array"`.
  - Its `format` is a format that supports storage usage.

## Examples

> **Note:**
> The WebGPU samples feature many more examples.

### Basic <example-value>

Our basic <example-value> demo shows an example of creating a bind group layout and then using that as a template when creating a bind group.

```js
// …

const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: "storage",
      },
    },
  ],
});

const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: {
        buffer: output,
      },
    },
  ],
});

// …
```

## See also

- The WebGPU API
