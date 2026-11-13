---
title: "XRDepthInformation: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrdepthinformation/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRDepthInformation: height property

The _read-only_ **`height`** property of the `XRDepthInformation` interface contains the height of the depth buffer (number of rows).

## Value

An unsigned long integer.

## Examples

Use `XRFrame.getDepthInformation()` (CPU) or `XRWebGLBinding.getDepthInformation()` (WebGL) to obtain depth information. The returned objects will contain the `height` of the depth buffer, which you can use for further calculations.

```js
const smallerDepthDimension = Math.min(depthInfo.width, depthInfo.height);
const largerDepthDimension = Math.max(depthInfo.width, depthInfo.height);
```
