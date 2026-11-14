---
title: "GPURenderBundleEncoder"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderbundleencoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderBundleEncoder

The **`GPURenderBundleEncoder`** interface of the `WebGPU API` is used to pre-record bundles of commands.

The command bundles are encoded by calling the methods of `GPURenderBundleEncoder`; once the desired commands have been encoded, they are recorded into a `GPURenderBundle` object instance using the `GPURenderBundleEncoder.finish()` method. These render bundles can then be reused across multiple render passes by passing the `GPURenderBundle` objects into `GPURenderPassEncoder.executeBundles()` calls.

In effect, this is like a partial render pass — `GPURenderBundleEncoder`s have all the same functionality available as `GPURenderPassEncoder`s, except that they can't begin and end occlusion queries, and can't set the scissor rect, viewport, blend constant, and stencil reference. The `GPURenderBundle` will inherit all these values from the `GPURenderPassEncoder` that executes it.

> **Note:**
> Currently set vertex buffers, index buffers, bind groups, and pipeline are all cleared prior to executing a render bundle, and once the render bundle has finished executing.

Reusing pre-recoded commands can significantly improve app performance in situations where JavaScript draw call overhead is a bottleneck. Render bundles are most effective in situations where a batch of objects will be drawn the same way across multiple views or frames, with the only differences being the buffer content being used (such as updated matrix uniforms). A good example is VR rendering. Recording the rendering as a render bundle and then tweaking the view matrix and replaying it for each eye is a more efficient way to issue draw calls for both renderings of the scene.

A `GPURenderBundleEncoder` object instance is created via the `GPUDevice.createRenderBundleEncoder()` property.

> **Note:**
> The methods of `GPURenderBundleEncoder` are functionally identical to their equivalents available on `GPURenderPassEncoder`, except for `GPURenderBundleEncoder.finish()`, which is similar in purpose to `GPUCommandEncoder.finish()`.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Instance methods

- `draw()`
    Draw primitives based on the vertex buffers provided by `setVertexBuffer()`.
- `drawIndexed()`
    Draw indexed primitives based on the vertex and index buffers provided by `setVertexBuffer()` and `setIndexBuffer()`
- `drawIndirect()`
    Draw primitives using parameters read from a `GPUBuffer`.
- `drawIndexedIndirect()`
    Draw indexed primitives using parameters read from a `GPUBuffer`.

- `finish()`
    Completes recording of the current render pass <example-value> sequence.

- `insertDebugMarker()`
    Marks a specific point in a series of encoded commands with a label.
- `popDebugGroup()`
    Ends a debug group, which is begun with a `pushDebugGroup()` call.
- `pushDebugGroup()`
    Begins a debug group, which is marked with a specified label, and will contain all subsequent encoded commands up until a `popDebugGroup()` method is invoked.
- `setBindGroup()`
    Sets the `GPUBindGroup` to use for subsequent render bundle commands, for a given index.

- `setIndexBuffer()`
    Sets the current `GPUBuffer` that will provide index data for subsequent drawing commands.

- `setPipeline()`
    Sets the `GPURenderPipeline` to use for this render bundle.

- `setVertexBuffer()`
    Sets or unsets the current `GPUBuffer` that will provide vertex data for subsequent drawing commands.

## Examples

In the WebGPU Samples Animometer example, a lot of like operations are done on many different objects simultaneously. A bundle of commands is encoded using the following function:

```js
// passEncoder is a GPURenderBundleEncoder or a GPURenderPassEncoder
function recordRenderPass(passEncoder) {
  if (settings.dynamicOffsets) {
    passEncoder.setPipeline(dynamicPipeline);
  } else {
    passEncoder.setPipeline(pipeline);
  }
  passEncoder.setVertexBuffer(0, vertexBuffer);
  passEncoder.setBindGroup(0, timeBindGroup);
  const dynamicOffsets = [0];
  for (let i = 0; i < numTriangles; ++i) {
    if (settings.dynamicOffsets) {
      dynamicOffsets[0] = i * alignedUniformBytes;
      passEncoder.setBindGroup(1, dynamicBindGroup, dynamicOffsets);
    } else {
      passEncoder.setBindGroup(1, bindGroups[i]);
    }
    passEncoder.draw(3, 1, 0, 0);
  }
}
```

Later on, a `GPURenderBundleEncoder` is created, the function is invoked, and the command bundle is recorded into a `GPURenderBundle` using `GPURenderBundleEncoder.finish()`:

```js
const renderBundleEncoder = device.createRenderBundleEncoder({
  colorFormats: [presentationFormat],
});
recordRenderPass(renderBundleEncoder);
const renderBundle = renderBundleEncoder.finish();
```

`GPURenderPassEncoder.executeBundles()` is then used to reuse the work across multiple render passes to improve performance. Study the example code listing for the full context.

```js
// …

return function doDraw(timestamp) {
  if (startTime === undefined) {
    startTime = timestamp;
  }
  uniformTime[0] = (timestamp - startTime) / 1000;
  device.queue.writeBuffer(uniformBuffer, timeOffset, uniformTime.buffer);

  renderPassDescriptor.colorAttachments[0].view = context
    .getCurrentTexture()
    .createView();

  const commandEncoder = device.createCommandEncoder();
  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

  if (settings.renderBundles) {
    passEncoder.executeBundles([renderBundle]);
  } else {
    recordRenderPass(passEncoder);
  }

  passEncoder.end();
  device.queue.submit([commandEncoder.finish()]);
};

// …
```

## See also

- The WebGPU API
