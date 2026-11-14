---
title: "GPU: getPreferredCanvasFormat() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpu/getpreferredcanvasformat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPU: getPreferredCanvasFormat() method

The **`getPreferredCanvasFormat()`** method of the
`GPU` interface returns the optimal canvas texture format for displaying 8-bit depth, standard dynamic range content on the current system.

This is commonly used to provide a `GPUCanvasContext.configure()` call with the optimal `format` value for the current system. This is recommended — if you don't use the preferred format when configuring the canvas context, you may incur additional overhead, such as additional texture copies, depending on the platform.

## Syntax

```js
getPreferredCanvasFormat()
```

### Parameters

None.

### Return value

A string indicating a canvas texture format. The value can be `rgba8unorm` or `bgra8unorm`.

### Exceptions

None.

## Examples

```js
const canvas = document.querySelector("#gpuCanvas");
const context = canvas.getContext("webgpu");

context.configure({
  device,
  format: navigator.gpu.getPreferredCanvasFormat(),
  alphaMode: "premultiplied",
});
```

## See also

- The WebGPU API
