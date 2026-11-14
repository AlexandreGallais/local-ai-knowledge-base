---
title: "GPUCanvasContext: canvas property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucanvascontext/canvas/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCanvasContext: canvas property

The **`canvas`** read-only property of the
`GPUCanvasContext` interface returns a reference to the canvas that the context was created from.

## Value

An `HTMLCanvasElement` or `OffscreenCanvas` object instance.

## Examples

```js
const canvas = document.querySelector("#gpuCanvas");
const context = canvas.getContext("webgpu");

// returns an HTMLCanvasElement reference
context.canvas;
```

## See also

- The WebGPU API
