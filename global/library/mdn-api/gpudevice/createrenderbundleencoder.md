---
title: "GPUDevice: createRenderBundleEncoder() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/createrenderbundleencoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: createRenderBundleEncoder() method

The **`createRenderBundleEncoder()`** method of the
`GPUDevice` interface creates a `GPURenderBundleEncoder` that can be used to pre-record bundles of commands. These can be reused in `GPURenderPassEncoder`s via the `executeBundles()` method, as many times as required.

## Syntax

```js
createRenderBundleEncoder(descriptor)
```

### Parameters

- `descriptor`
    An object containing the following properties:
    - `colorFormats`
        An array of enumerated values specifying the expected color formats for render targets. For possible values, see the `GPUTextureFormat` definition in the spec.
    - `depthReadOnly` (optional)
        A boolean. If `true`, specifies that executing any `GPURenderBundle` created by the `GPURenderBundleEncoder` will not modify the depth component of the `depthStencilFormat` when executed. If omitted, `depthReadOnly` will default to `false`.
    - `depthStencilFormat` (optional)
        An enumerated value that specifies the expected depth-or-stencil format for render targets. For possible values, see the Depth-stencil formats section of the spec.
    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.
    - `sampleCount` (optional)
        A number representing the expected sample count for render targets.
    - `stencilReadOnly` (optional)
        A boolean. If `true`, specifies that executing any `GPURenderBundle` created by the `GPURenderBundleEncoder` will not modify the stencil component of the `depthStencilFormat` when executed. If omitted, `stencilReadOnly` will default to `false`.

### Return value

A `GPURenderBundleEncoder` object instance.

## Examples

In the WebGPU Samples Animometer example, numerous similar operations are done on many different objects simultaneously. A bundle of commands is encoded using the following function:

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

Later on, a `GPURenderBundleEncoder` is created using `createRenderBundleEncoder()`, the function is invoked, and the command bundle is recorded into a `GPURenderBundle` using `GPURenderBundleEncoder.finish()`:

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
