---
title: "GPUCommandEncoder: beginRenderPass() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandencoder/beginrenderpass/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandEncoder: beginRenderPass() method

The **`beginRenderPass()`** method of the
`GPUCommandEncoder` interface starts encoding a render pass, returning a `GPURenderPassEncoder` that can be used to control rendering.

## Syntax

```js
beginRenderPass(descriptor)
```

### Parameters

- `descriptor`
    An object containing the following properties:
    - `colorAttachments`
        An array of objects (see Color attachment object structure) defining the color attachments that will be output to when executing this render pass.
    - `depthStencilAttachment` (optional)
        An object (see Depth/stencil attachment object structure) defining the depth/stencil attachment that will be output to and tested against when executing this render pass.
    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.
    - `maxDrawCount` (optional)
        A number indicating the maximum number of draw calls that will be done in the render pass. This is used by some implementations to size work injected before the render pass. You should keep the default value — 50000000 — unless you know that more draw calls will be done.
    - `occlusionQuerySet` (optional)
        The `GPUQuerySet` that will store the occlusion query results for this pass.
    - `timestampWrites` (optional)
        An array of objects defining where and when timestamp query values will be written for this pass. These objects have the following properties:
        - `querySet`
            A `GPUQuerySet` of type `"timestamp"` that the timestamp query results will be written to.
        - `beginningOfPassWriteIndex`
            A number specifying the query index in `querySet` where the timestamp at the beginning of the render pass will be written. This is optional - if not defined, no timestamp will be written for the beginning of the pass.
        - `endOfPassWriteIndex`
            A number specifying the query index in `querySet` where the timestamp at the end of the render pass will be written. This is optional - if not defined, no timestamp will be written for the end of the pass.

        > **Note:**
        > The `timestamp-query` feature needs to be enabled to use timestamp queries. Timestamp query values are written in nanoseconds, but how the value is determined is implementation-defined.

### Color attachment object structure

Color attachment objects can have the following properties:

- `clearValue` (optional)
    A color value to clear the `view` texture to, prior to executing the render pass. This value is ignored if `loadOp` is not set to `"clear"`. `clearValue` takes an array or object representing the four color components `r`, `g`, `b`, and `a` as decimals.

    For example, you can pass an array like `[0.0, 0.5, 1.0, 1.0]`, or its equivalent object `{ r: 0.0, g: 0.5, b: 1.0, a: 1.0 }`.

    If `clearValue` is omitted, it defaults to `{ r: 0, g: 0, b: 0, a: 0 }`.

- `depthSlice` (optional)
    A number representing the index of the 3D depth slice that will be output to for this color attachment, in the case of a 3D `GPUTextureView` `view`. When specified, this allows WebGPU to render directly to slices of 3D textures within render passes.

- `loadOp`
    An enumerated value indicating the load operation to perform on `view` prior to executing the render pass. Possible values are:
    - `"clear"`: Loads the `clearValue` for this attachment into the render pass.
    - `"load"`: Loads the existing value for this attachment into the render pass.

    > **Note:**
    > It is recommended to always use `"clear"` in cases where the initial value doesn't matter, as it will give better performance on some devices such as mobiles.

- `storeOp`
    An enumerated value indicating the store operation to perform on `view` after executing the render pass. Possible values are:
    - `"discard"`: Discards the resulting value of the render pass for this attachment.
    - `"store"`: Stores the resulting value of the render pass for this attachment.
- `resolveTarget` (optional)
    An object representing the texture subresource that will receive the resolved output for this color attachment if `view` is multisampled. This can be one of the following:
    - `GPUTextureView`
    - `GPUTexture`: Can be used in place of a `GPUTextureView`, provided a default view is desired. When used in this context, `GPUTexture` is equivalent to a `GPUTextureView` object created using a `GPUTexture.createView()` call with no argument specified.
- `view`
    An object representing the texture subresource that will be output to for this color attachment. This can be one of the following:
    - `GPUTextureView`
    - `GPUTexture`: Can be used in place of a `GPUTextureView`, provided a default view is desired. When used in this context, `GPUTexture` is equivalent to a `GPUTextureView` object created using a `GPUTexture.createView()` call with no argument specified.

    > **Note:**
    > Each color or depth/stencil attachment must be a unique texture subresource, and texture subresources used as attachments cannot be used inside the render pass.

### Depth/stencil attachment object structure

The `depthStencilAttachment` object can have the following properties:

- `depthClearValue` (optional)
    A number indicating the value to clear `view`'s depth component prior to executing the render pass. This is ignored if `depthLoadOp` is not set to `"clear"`.

    The value must be between 0.0 and 1.0, inclusive.

- `depthLoadOp` (optional)
    An enumerated value indicating the load operation to perform on `view`'s depth component prior to executing the render pass. Possible values are:
    - `"clear"`: Loads the `clearValue` for this attachment into the render pass.
    - `"load"`: Loads the existing value for this attachment into the render pass.

    > **Note:**
    > It is recommended to always use `"clear"` in cases where the initial value doesn't matter, as it will give better performance on some devices such as mobiles.

- `depthReadOnly` (optional)
    A boolean. Setting the value to `true` causes the depth component of `view` to be read-only. If `depthReadOnly` is omitted, it defaults to `false`.
- `depthStoreOp` (optional)
    An enumerated value indicating the store operation to perform on `view`'s depth component after executing the render pass. Possible values are:
    - `"discard"`: Discards the resulting value of the render pass for this attachment.
    - `"store"`: Stores the resulting value of the render pass for this attachment.
- `stencilClearValue` (optional)
    A number indicating the value to clear `view`'s stencil component to prior to executing the render pass. This is ignored if `stencilLoadOp` is not set to `"clear"`.

    If `stencilClearValue` is omitted, it defaults to 0.

- `stencilLoadOp` (optional)
    An enumerated value indicating the load operation to perform on `view`'s stencil component prior to executing the render pass. Possible values are:
    - `"clear"`: Loads the `clearValue` for this attachment into the render pass.
    - `"load"`: Loads the existing value for this attachment into the render pass.

    > **Note:**
    > It is recommended to always use `"clear"` in cases where the initial value doesn't matter, as it will give better performance on some devices such as mobiles.

- `stencilReadOnly` (optional)
    A boolean. Setting the value to `true` causes the stencil component of `view` to be read-only. If `stencilReadOnly` is omitted, it defaults to `false`.
- `stencilStoreOp` (optional)
    An enumerated value indicating the store operation to perform on `view`'s stencil component after executing the render pass. Possible values are:
    - `"discard"`: Discards the resulting value of the render pass for this attachment.
    - `"store"`: Stores the resulting value of the render pass for this attachment.
- `view`
    An object representing the texture subresource that will be output to and read from for this depth/stencil attachment. This can be one of the following:
    - `GPUTextureView`
    - `GPUTexture`: Can be used in place of a `GPUTextureView`, provided a default view is desired. When used in this context, `GPUTexture` is equivalent to a `GPUTextureView` object created using a `GPUTexture.createView()` call with no argument specified.

### Return value

A `GPURenderPassEncoder` object instance.

### Validation

The following criteria must be met when calling **`beginRenderPass()`**, otherwise a `GPUValidationError` is generated and an invalid `GPURenderPassEncoder` is returned.

General:

- `colorAttachments.length` is less than or equal to the `GPUDevice`'s `maxColorAttachments` `limit`.
- If `colorAttachments` contains only `null` values, `depthStencilAttachment` is provided.
- All `view`s in `colorAttachments` and `depthStencilAttachment` have equal `GPUTexture.sampleCount` values and render extents (`GPUTexture.height`, `GPUTexture.width`, and `GPUTexture.depthOrArrayLayers`).
- If `occlusionQuerySet` is set, the referenced `GPUQuerySet` has a `type` of `"occlusion"`.

For color attachment objects

- The `view` is renderable, and the `view`'s format (i.e., specified in the descriptor of the originating `GPUTexture.createView()` call) is a color renderable format.
- If `resolveTarget` is provided:
  - The `view`'s originating `GPUTexture`'s `sampleCount` is greater than 1.
  - The `resolveTarget`'s originating `GPUTexture`'s `sampleCount` is 1.
  - `resolveTarget` is renderable.
  - The sizes of the subresources that `view` and `resolveTarget` provide a view of match.
  - `view`'s and `resolveTarget`'s formats match.
- Color attachments bytes per sample is less than or equal to the `GPUDevice`'s `maxColorAttachmentBytesPerSample` `limit`.
- If the `usage` of the `GPUTexture.createView()` operation that created the associated view includes the `TRANSIENT_ATTACHMENT` bit:
  - `loadOp` is `"clear"`.
  - `storeOp` is `"discard"`.

For depth/stencil attachment objects:

- The `view` is renderable, and its format is a depth-or-stencil format.
- If `depthLoadOp` is set to `"clear"`, a valid `depthClearValue` is provided.
- If `view`'s format is a combined depth-or-stencil format, `depthReadOnly` matches `stencilReadOnly`.
- If `view`'s format has a depth aspect, and `depthReadOnly` is `false`, `depthLoadOp` and `depthStoreOp` are provided.
- If `view`'s format has a depth aspect, and `depthReadOnly` is `true`, `depthLoadOp` and `depthStoreOp` are not provided.
- If `view`'s format has a stencil aspect, and `stencilReadOnly` is `false`, `stencilLoadOp` and `stencilStoreOp` are provided.
- If `view`'s format has a stencil aspect, and `stencilReadOnly` is `true`, `stencilLoadOp` and `stencilStoreOp` are not provided.
- If the `usage` of the `GPUTexture.createView()` operation that created the associated view includes the `TRANSIENT_ATTACHMENT` bit:
  - If `view`'s format has a depth aspect:
    - `depthLoadOp` is `"clear"`.
    - `depthStoreOp` is `"discard"`.
  - If `view`'s format has a stencil aspect:
    - `stencilLoadOp` is `"clear"`.
    - `stencilStoreOp` is `"discard"`.

For timestamp queries:

- The `timestamp-query` `feature` is enabled in the `GPUDevice`.

## Examples

In our basic <example-value> demo, a number of commands are recorded via a `GPUCommandEncoder`. These commands originate from the `GPURenderPassEncoder` created via `beginRenderPass()` :

```js
// …

// Create GPUCommandEncoder
const commandEncoder = device.createCommandEncoder();

// Create GPURenderPassDescriptor to tell WebGPU which texture to draw into, then initiate render pass

const renderPassDescriptor = {
  colorAttachments: [
    {
      clearValue: clearColor,
      loadOp: "clear",
      storeOp: "store",
      view: context.getCurrentTexture().createView(),
    },
  ],
};

const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

// Draw a triangle

passEncoder.setPipeline(renderPipeline);
passEncoder.setVertexBuffer(0, vertexBuffer);
passEncoder.draw(3);

// End the render pass

passEncoder.end();

device.queue.submit([commandEncoder.finish()]);

// …
```

## See also

- The WebGPU API
