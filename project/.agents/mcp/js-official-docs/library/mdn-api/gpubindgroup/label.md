---
title: "GPUBindGroup: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpubindgroup/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUBindGroup: label property

The **`label`** property of the
`GPUBindGroup` interface provides a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPUDevice.createBindGroup()` call, or you can get and set it directly on the `GPUBindGroup` object.

## Value

A string. If this has not been previously set as described above, it will be an empty string.

## Examples

Setting and getting a label via `GPUBindGroup.label`:

```js
// …

const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: {
        buffer: output,
      },
    },
  ],
});

bindGroup.label = "my_bind_group";

console.log(bindGroup.label); // "my_bind_group"
```

Setting a label via the originating `GPUDevice.createBindGroup()` call, and then getting it via `GPUBindGroup.label`:

```js
// …

const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: {
        buffer: output,
      },
    },
  ],
  label: "my_bind_group",
});

console.log(bindGroup.label); // "my_bind_group"
```

## See also

- The WebGPU API
