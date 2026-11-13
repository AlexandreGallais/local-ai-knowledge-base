---
title: "GPURenderBundle: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderbundle/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderBundle: label property

The **`label`** property of the
`GPURenderBundle` interface is a string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

This can be set by providing a `label` property in the descriptor object passed into the originating `GPURenderBundleEncoder.finish()` call, or you can get and set it directly on the `GPURenderBundle` object.

## Value

A string. If no label value has previously been set, getting the label returns an empty string.

## Examples

Setting and getting a label via `GPURenderBundle.label`:

```js
const renderBundle = renderBundleEncoder.finish();

renderBundle.label = "my_render_bundle";
console.log(renderBundle.label); // "my_render_bundle"
```

Setting a label via the originating `GPURenderBundleEncoder.finish()` call, and then getting it via `GPURenderBundle.label`:

```js
const renderBundle = renderBundleEncoder.finish({
  label: "my_render_bundle",
});

console.log(renderBundle.label); // "my_render_bundle"
```

## See also

- The WebGPU API
