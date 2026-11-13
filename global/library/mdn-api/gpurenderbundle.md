---
title: "GPURenderBundle"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderbundle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderBundle

The **`GPURenderBundle`** interface of the `WebGPU API` represents a container for pre-recorded bundles of commands.

The command bundles are encoded using a `GPURenderBundleEncoder`; once the desired commands have been encoded, they are recorded into a `GPURenderBundle` object instance using the `GPURenderBundleEncoder.finish()` method.

These command bundles can then be reused across multiple render passes by passing the `GPURenderBundle` objects into `GPURenderPassEncoder.executeBundles()` calls. Reusing pre-recoded commands can significantly improve app performance in situations where JavaScript draw call overhead is a bottleneck. Render bundles are most effective in situations where a batch of objects will be drawn the same way across multiple views or frames, with the only differences being the buffer content being used (such as updated matrix uniforms).

A good example is VR rendering. Recording the rendering as a render bundle and then tweaking the view matrix and replaying it for each eye is a more efficient way to issue draw calls for both renderings of the scene.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Examples

In the WebGPU Samples Animometer example, a lot of like operations are done on many different objects simultaneously. A render bundle is encoded using the following function:

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

Later on, a `GPURenderBundleEncoder` is created, the function is invoked, and the render bundle is recorded using `GPURenderBundleEncoder.finish()`:

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
