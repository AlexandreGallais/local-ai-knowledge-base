---
title: "XRDepthInformation: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrdepthinformation/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRDepthInformation: width property

The _read-only_ **`width`** property of the `XRDepthInformation` interface contains the width of the depth buffer (number of columns).

## Value

An unsigned long integer.

## Examples

Use `XRFrame.getDepthInformation()` (CPU) or `XRWebGLBinding.getDepthInformation()` (WebGL) to obtain depth information. The returned objects will contain the `width` of the depth buffer, which you can use for further calculations.

```js
const smallerDepthDimension = Math.min(depthInfo.width, depthInfo.height);
const largerDepthDimension = Math.max(depthInfo.width, depthInfo.height);
```
