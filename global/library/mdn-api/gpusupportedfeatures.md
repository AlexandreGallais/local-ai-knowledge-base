---
title: "GPUSupportedFeatures (part 1 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpusupportedfeatures/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUSupportedFeatures

The **`GPUSupportedFeatures`** interface of the `WebGPU API` is a `Set`-like object that describes additional functionality supported by a `GPUAdapter`.

The `GPUSupportedFeatures` object for the current adapter is accessed via the `GPUAdapter.features` property — use this to test what features your current setup supports. To create a `GPUDevice` with a specific feature enabled, you need to specify it in the `requiredFeatures` array of the `GPUAdapter.requestDevice()` descriptor.

You should note that not all features will be available to WebGPU in all browsers that support it, even if the features are supported by the underlying hardware. This could be due to constraints in the underlying system, browser, or adapter. For example:

- The underlying system might not be able to guarantee exposure of a feature in a way that is compatible with a certain browser.
- The browser vendor might not have found a secure way to implement support for that feature, or might just not have gotten round to it yet.

If you are hoping to take advantage of a specific additional feature in a WebGPU app, thorough testing is advised.
