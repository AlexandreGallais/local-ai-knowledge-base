---
title: "GPUPipelineLayout: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpupipelinelayout/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUPipelineLayout: label property

The **`label`** property of the
`GPUPipelineLayout` interface provides a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUDevice.createPipelineLayout()` call, or you can get and set it directly on the `GPUPipelineLayout` object.

## Value

A string. If this has not been previously set as described above, it will be an empty string.

## Examples

Setting and getting a label via `GPUPipelineLayout.label`:

```js
// …

const pipelineLayout = device.createPipelineLayout({
  bindGroupLayouts: [bindGroupLayout],
});

pipelineLayout.label = "my_pipeline_layout";

console.log(pipelineLayout.label); // "my_pipeline_layout"
```

Setting a label via the originating `GPUDevice.createPipelineLayout()` call, and then getting it via `GPUPipelineLayout.label`:

```js
// …

const pipelineLayout = device.createPipelineLayout({
  bindGroupLayouts: [bindGroupLayout],
  label: "my_pipeline_layout",
});

console.log(pipelineLayout.label); // "my_pipeline_layout"
```

## See also

- The WebGPU API
