---
title: "GPURenderPassEncoder: drawIndexedIndirect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/drawindexedindirect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: drawIndexedIndirect() method

The **`drawIndexedIndirect()`** method of the
`GPURenderPassEncoder` interface draws indexed primitives using parameters read from a `GPUBuffer`.

## Syntax

```js
drawIndexedIndirect(indirectBuffer, indirectOffset)
```

### Parameters

- `indirectBuffer`
    A `GPUBuffer` containing the `indexCount`, `instanceCount`, `firstIndex`, `baseVertex`, and `firstInstance` values needed to carry out the drawing operation. The buffer must contain a tightly packed block of five 32-bit unsigned integer values representing the values (20 bytes total), given in the same order as the arguments for `GPURenderPassEncoder.drawIndexed()`. So for example:

    ```js
    const uint32 = new Uint32Array(5);
    uint32[0] = 3; // The indexCount value
    uint32[1] = 1; // The instanceCount value
    uint32[2] = 0; // The firstIndex value
    uint32[3] = 0; // The baseVertex value
    uint32[4] = 0; // The firstInstance value

    // Write values into a GPUBuffer
    device.queue.writeBuffer(buffer, 0, uint32, 0, uint32.length);
    ```

    > **Note:**
    > The `indirect-first-instance` feature needs to be enabled for non-zero `firstInstance` values to be used. If the `indirect-first-instance` feature is not enabled and `firstInstance` is not zero, the `drawIndexedIndirect()` call will be treated as a no-op.

- `indirectOffset`
    The offset, in bytes, into `indirectBuffer` where the value data begins.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`drawIndirect()`**, otherwise a `GPUValidationError` is generated and the `GPURenderPassEncoder` becomes invalid:

- `indirectBuffer`'s `GPUBuffer.usage` contains the `GPUBufferUsage.INDIRECT` flag.
- `indirectOffset` + the total size specified by the value parameters in the `indirectBuffer` is less than or equal to the `indirectBuffer`'s `GPUBuffer.size`.
- `indirectOffset` is a multiple of 4.

## Examples

```js
// …

// Create GPURenderPassEncoder
const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

// Set pipeline and vertex buffer
passEncoder.setPipeline(renderPipeline);
passEncoder.setVertexBuffer(0, vertexBuffer);
passEncoder.setIndexBuffer(indexBuffer, "uint16");

// Create drawIndexedIndirect values
const uint32 = new Uint32Array(5);
uint32[0] = 3;
uint32[1] = 1;
uint32[2] = 0;
uint32[3] = 0;
uint32[4] = 0;

// Create a GPUBuffer and write the draw values into it
const drawValues = device.createBuffer({
  size: 20,
  usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.INDIRECT,
});
device.queue.writeBuffer(drawValues, 0, uint32, 0, uint32.length);

// Draw the vertices
passEncoder.drawIndexedIndirect(drawValues, 0);

// End the render pass
passEncoder.end();

// End frame by passing array of GPUCommandBuffers to command queue for execution
device.queue.submit([commandEncoder.finish()]);

// …
```

## See also

- The WebGPU API
