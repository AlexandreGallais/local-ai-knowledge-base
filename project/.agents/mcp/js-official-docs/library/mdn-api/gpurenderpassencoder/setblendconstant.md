---
title: "GPURenderPassEncoder: setBlendConstant() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/setblendconstant/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: setBlendConstant() method

The **`setBlendConstant()`** method of the
`GPURenderPassEncoder` interface sets the constant blend color and alpha values used with `"constant"` and `"one-minus-constant"` blend factors (as set in the descriptor of the `GPUDevice.createRenderPipeline()` method, in the `blend` property).

## Syntax

```js
setBlendConstant(color)
```

### Parameters

- `color`
    An object or array representing the color to use when blending — the `r`, `g`, `b`, and `a` components are represented as floating point numbers between 0.0 and 1.0.

    What follows is an object example:

    ```js
    const color = { r: 0.0, g: 0.5, b: 1.0, a: 1.0 };
    ```

    The array equivalent would look like this:

    ```js
    const color = [0.0, 0.5, 1.0, 1.0];
    ```

> **Note:**
> If a `setBlendConstant()` call is not made, the blend constant color value defaults to `(0, 0, 0, 0)` for each render pass.

### Return value

None (`undefined`).

## Examples

```js
// …

const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

passEncoder.setPipeline(renderPipeline);
passEncoder.setVertexBuffer(0, vertexBuffer);
passEncoder.setBlendConstant([1.0, 0.0, 0.0, 1.0]);
passEncoder.draw(3);

passEncoder.end();

// …
```

## See also

- The WebGPU API
