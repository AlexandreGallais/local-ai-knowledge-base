---
title: "GPURenderBundleEncoder: drawIndirect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderbundleencoder/drawindirect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderBundleEncoder: drawIndirect() method

The **`drawIndirect()`** method of the
`GPURenderBundleEncoder` interface draws primitives using parameters read from a `GPUBuffer`.

> **Note:**
> This method is functionally identical to its equivalent on `GPURenderPassEncoder` — `drawIndirect()`.

## Syntax

```js
drawIndirect(indirectBuffer, indirectOffset)
```

### Parameters

- `indirectBuffer`
    A `GPUBuffer` containing the `vertexCount`, `instanceCount`, `firstVertex`, and `firstInstance` values needed to carry out the drawing operation. The buffer must contain a tightly packed block of four 32-bit unsigned integer values representing the values (16 bytes total), given in the same order as the arguments for `GPURenderBundleEncoder.draw()`. So for example:

    ```js
    const uint32 = new Uint32Array(4);
    uint32[0] = 3; // The vertexCount value
    uint32[1] = 1; // The instanceCount value
    uint32[2] = 0; // The firstVertex value
    uint32[3] = 0; // The firstInstance value

    // Write values into a GPUBuffer
    device.queue.writeBuffer(buffer, 0, uint32, 0, uint32.length);
    ```

    > **Note:**
    > The `indirect-first-instance` feature needs to be enabled for non-zero `firstInstance` values to be used. If the `indirect-first-instance` feature is not enabled and `firstInstance` is not zero, the `drawIndirect()` call will be treated as a no-op.

- `indirectOffset`
    The offset, in bytes, into `indirectBuffer` where the value data begins.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`drawIndirect()`**, otherwise a `GPUValidationError` is generated and the `GPURenderBundleEncoder` becomes invalid:

- `indirectBuffer`'s `GPUBuffer.usage` contains the `GPUBufferUsage.INDIRECT` flag.
- `indirectOffset` + the total size specified by the value parameters in the `indirectBuffer` is less than or equal to the `indirectBuffer`'s `GPUBuffer.size`.
- `indirectOffset` is a multiple of 4.

## Examples

```js
// …

// Create GPURenderBundleEncoder
const bundleEncoder = device.createRenderBundleEncoder(descriptor);

// Set pipeline and vertex buffer
bundleEncoder.setPipeline(renderPipeline);
bundleEncoder.setVertexBuffer(0, vertexBuffer);

// Create drawIndirect values
const uint32 = new Uint32Array(4);
uint32[0] = 3;
uint32[1] = 1;
uint32[2] = 0;
uint32[3] = 0;

// Create a GPUBuffer and write the draw values into it
const drawValues = device.createBuffer({
  size: 16,
  usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.INDIRECT,
});
device.queue.writeBuffer(drawValues, 0, uint32, 0, uint32.length);

// Draw the vertices
bundleEncoder.drawIndirect(drawValues, 0);

// End the bundle recording
const renderBundle = bundleEncoder.finish();

// …
```

## See also

- The WebGPU API
