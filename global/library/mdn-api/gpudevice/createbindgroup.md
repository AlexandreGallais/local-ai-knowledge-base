---
title: "GPUDevice: createBindGroup() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/createbindgroup/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: createBindGroup() method

The **`createBindGroup()`** method of the
`GPUDevice` interface creates a `GPUBindGroup` based on a `GPUBindGroupLayout` that defines a set of resources to be bound together in a group and how those resources are used in shader stages.

## Syntax

```js
createBindGroup(descriptor)
```

### Parameters

- `descriptor`
    An object containing the following properties:
    - `entries`
        An array of entry objects describing the resources to expose to the shader. There will be one for each corresponding entry described by the `GPUBindGroupLayout` referenced in `layout`. Each entry object has the following properties:
        - `binding`
            A number representing a unique identifier for this resource binding, which matches the `binding` value of a corresponding `GPUBindGroupLayout` entry. In addition, it matches the `n` index value of the corresponding `@binding(n)` attribute in the shader (`GPUShaderModule`) used in the related pipeline.
        - `resource`
            The resource to bind. This can be one of the following:
            - `GPUBufferBinding`: Wraps a `GPUBuffer`; see GPUBufferBinding objects for a definition.
            - `GPUBuffer`: Can be used directly rather than being wrapped in a `GPUBufferBinding`, provided the default `offset` and `size` values are being used.
            - `GPUExternalTexture`
            - `GPUTextureView`: Can be used in place of a `GPUExternalTexture` provided it is compatible (a 2D format with a single subresource, that is, `dimension: "2d"`).
            - `GPUTexture`: Can be used in place of a `GPUTextureView`, provided a default view is desired. When used in this context, `GPUTexture` is equivalent to a `GPUTextureView` object created using a `GPUTexture.createView()` call with no argument specified.
            - `GPUSampler`
    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.
    - `layout`
        The `GPUBindGroupLayout` that the `entries` of this bind group will conform to.

### GPUBufferBinding objects

A `GPUBufferBinding` object can contain the following properties:

- `buffer`
    The `GPUBuffer` object you want to bind.
- `offset` (optional)
    The offset, in bytes, from the beginning of the `buffer` to the beginning of the range exposed to the shader by the buffer binding. If omitted, `offset` defaults to 0.
- `size` (optional)
    The size, in bytes, of the buffer binding. If omitted, `size` will be the range starting at `offset` and ending at the end of the `buffer`. If both `offset` and `size` are omitted, the entire buffer is exposed to the shader.

### Return value

A `GPUBindGroup` object instance.

### Validation

The following criteria must be met when calling **`createBindGroup()`**, otherwise a `GPUValidationError` is generated and an invalid `GPUBindGroup` object is returned:

- The number of entries in the `layout` `GPUBindGroupLayout` equals the number of entry objects in `entries`.
- For each entry in the `layout` `GPUBindGroupLayout`, the corresponding entry object in `entries` binds the correct resource type. For example, a `buffer` resource layout object has a `GPUBufferBinding` object specified in the corresponding binding.
- If the resource layout object is a `buffer`:
  - The corresponding bound `GPUBuffer`:
    - Has its bound part (as specified by `offset` and `size`) contained inside it completely, with a non-zero size.
    - Has a size bigger than the `buffer` resource layout's `minBindingSize`.
  - If the resource layout object `type` is `"uniform"`:
    - The bound `GPUBuffer` has a `usage` that includes `GPUBufferUsage.UNIFORM`.
    - The effective size of the bound buffer segment is less than or equal to the `GPUDevice`'s `maxUniformBufferBindingSize` `limit`.
    - The specified `GPUBufferBinding` `offset` is a multiple of the `GPUDevice`'s `minUniformBufferOffsetAlignment` `limit`.
  - If the resource layout object `type` is `"storage"` or `"read-only-storage"`:
    - The bound `GPUBuffer` has a `usage` that includes `GPUBufferUsage.STORAGE`.
    - The effective size of the bound buffer segment is less than or equal to the `GPUDevice`'s `maxStorageBufferBindingSize` `limit`.
    - The effective size of the bound buffer segment is a multiple of 4.
    - The specified `GPUBufferBinding` `offset` is a multiple of the `GPUDevice`'s `minStorageBufferOffsetAlignment` `limit`.
- If the resource layout object is a `storageTexture`, the corresponding bound `GPUTextureView`:
  - Has a `dimension` equal to the resource layout object's `viewDimension` (see `GPUTexture.createView()` for more details of a texture view's settings).
  - Has a `format` equal to the resource layout object's `sampleType`.
  - Has a `mipLevelCount` equal to 1.
  - Is a view of a `GPUTexture` with a `usage` that includes `GPUTextureUsage.STORAGE_BINDING`.
- If the resource layout object is a `texture`, the corresponding bound `GPUTextureView`:
  - Has a `dimension` equal to the resource layout object's `viewDimension` (see `GPUTexture.createView()` for more details of a texture view's settings).
  - Has a `format` compatible with the resource layout object's `sampleType`.
  - Is a view of a `GPUTexture` with a `usage` that includes `GPUTextureUsage.TEXTURE_BINDING`.
  - is a view of a `GPUTexture` with a `sampleCount` greater than 1 if the resource layout object's `multisampled` property is `true`, or equal to 1 if it is `false`.

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
