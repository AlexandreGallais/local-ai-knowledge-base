---
title: "GPURenderPassEncoder: setBindGroup() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/setbindgroup/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: setBindGroup() method

The **`setBindGroup()`** method of the
`GPURenderPassEncoder` interface sets the `GPUBindGroup` to use for subsequent render commands, for a given index.

## Syntax

```js
setBindGroup(index, bindGroup)
setBindGroup(index, bindGroup, dynamicOffsets)
setBindGroup(index, bindGroup, dynamicOffsets, dynamicOffsetsStart,
             dynamicOffsetsLength)
```

### Parameters

- `index`
    The index to set the bind group at. This matches the `n` index value of the corresponding `@group(n)` attribute in the shader code (`GPUShaderModule`) used in the related pipeline.
- `bindGroup`
    The `GPUBindGroup` to use for subsequent render commands, or `null`, in which case any previously-set bind group in the given slot is unset.
- `dynamicOffsets` (optional)
    A value specifying the offset, in bytes, for each entry in `bindGroup` with `hasDynamicOffset: true` set (i.e., in the descriptor of the `GPUDevice.createBindGroupLayout()` call that created the `GPUBindGroupLayout` object that the `bindGroup` is based on). This value can be:
    - An array of numbers specifying the different offsets.
    - A `Uint32Array` containing numbers specifying the offsets.

If a `Uint32Array` value is specified for `dynamicOffsets`, both of the following parameters are also required:

- `dynamicOffsetsStart`
    A number specifying the offset, in array elements, into `dynamicOffsetsData`, where the dynamic offset data begins.
- `dynamicOffsetsLength`
    A number specifying the number of dynamic offset values to be read from in `dynamicOffsetsData`.

### Return value

None (`undefined`).

### Exceptions

For `setBindGroup()` calls that use a `Uint32Array` value for `dynamicOffsets`, the call will throw with a `RangeError` if:

- `dynamicOffsetsStart` is less than 0.
- `dynamicOffsetsStart` + `dynamicOffsetsLength` is greater than `dynamicOffsets.length`.

### Validation

The following criteria must be met when calling **`setBindGroup()`**, otherwise a `GPUValidationError` is generated and the `GPURenderPassEncoder` becomes invalid:

- `index` is less than or equal to the `GPUDevice`'s `maxBindGroups` `limit`.
- `dynamicOffsets.length` is the same as the number of entries in `bindGroup` with `hasDynamicOffset: true` set.
- For `bindGroup` entries where the bound `buffer`'s `type` is `"uniform"` (see `GPUDevice.createBindGroupLayout()`), each number in `dynamicOffsets` is a multiple of the `GPUDevice`'s `minUniformBufferOffsetAlignment` `limit`.
- For `bindGroup` entries where the bound `buffer`'s `type` is `"storage"` or `"read-only-storage"` (see `GPUDevice.createBindGroupLayout()`), each number in `dynamicOffsets` is a multiple of the `GPUDevice`'s `minStorageBufferOffsetAlignment` `limit`.
- For each `bindGroup` entry, the bound `buffer`'s `offset`, plus the corresponding layout entry's `minBindingSize`, plus the corresponding dynamic offset specified in `dynamicOffsets`, is less than or equal to the bound `buffer`'s `size`.

## Examples

### Set bind group

In the WebGPU Samples Textured Cube example, `setBindGroup()` is used to bind the `uniformBindGroup` to index position 0. Check out the example for the full context.

```js
// …

const commandEncoder = device.createCommandEncoder();
const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
passEncoder.setPipeline(pipeline);
passEncoder.setBindGroup(0, uniformBindGroup);
passEncoder.setVertexBuffer(0, verticesBuffer);
passEncoder.draw(cubeVertexCount, 1, 0, 0);
passEncoder.end();
device.queue.submit([commandEncoder.finish()]);

// …
```

> **Note:**
> Study the other WebGPU Samples for more examples of `setBindGroup()` usage.

### Unset bind group

```js
// Set bind group in slot 0
passEncoder.setBindGroup(0, uniformBindGroup);

// Later, unset bind group in slot 0
passEncoder.setBindGroup(0, null);
```

## See also

- The WebGPU API
