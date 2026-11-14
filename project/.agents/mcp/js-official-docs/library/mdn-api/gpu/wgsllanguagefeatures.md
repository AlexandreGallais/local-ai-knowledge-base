---
title: "GPU: wgslLanguageFeatures property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpu/wgsllanguagefeatures/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPU: wgslLanguageFeatures property

The **`wgslLanguageFeatures`** read-only property of the
`GPU` interface returns a `WGSLLanguageFeatures` object that reports the WGSL language extensions supported by the WebGPU implementation.

> **Note:**
> Not all WGSL language extensions are available to WebGPU in all browsers that support the API. We recommend you thoroughly test any extensions you choose to use.

## Value

A `WGSLLanguageFeatures` object instance. This is a setlike object.

## Examples

```js
if (!navigator.gpu) {
  throw Error("WebGPU not supported.");
}

const wgslFeatures = navigator.gpu.wgslLanguageFeatures;

// Return the size of the set
console.log(wgslFeatures.size);

// Iterate through all the set values using values()
const valueIterator = wgslFeatures.values();
for (const value of valueIterator) {
  console.log(value);
}

// …
```

## See also

- WebGPU API
