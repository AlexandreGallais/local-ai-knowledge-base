---
title: "GPUBindGroupLayout: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpubindgrouplayout/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUBindGroupLayout: label property

The **`label`** property of the
`GPUBindGroupLayout` interface provides a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUDevice.createBindGroupLayout()` call, or you can get and set it directly on the `GPUBindGroupLayout` object.

## Value

A string. If this has not been previously set as described above, it will be an empty string.

## Examples

Setting and getting a label via `GPUBindGroupLayout.label`:

```js
// …

const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: "storage",
      },
    },
  ],
});

bindGroupLayout.label = "my_bind_group_layout";

console.log(bindGroupLayout.label); // "my_bind_group_layout"
```

Setting a label via the originating `GPUDevice.createBindGroupLayout()` call, and then getting it via `GPUBindGroupLayout.label`:

```js
// …

const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: "storage",
      },
    },
  ],
  label: "my_bind_group_layout",
});

console.log(bindGroupLayout.label); // "my_bind_group_layout"
```

## See also

- The WebGPU API
