---
title: "XRSession: depthUsage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/depthusage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: depthUsage property

The _read-only_ **`depthUsage`** property of an `immersive-ar`
`XRSession` describes which depth-sensing usage is used.

## Value

This property can return the following values:

- `cpu-optimized`
    The depth data is intended to be used on the CPU; see the `XRCPUDepthInformation` interface.
- `gpu-optimized`
    The depth data is intended to be used on the GPU; see the `XRWebGLDepthInformation` interface.

## Examples

To request the desired usage method, you need to specify a `usagePreference` when requesting a session using `XRSystem.requestSession()`. Here, the caller is able to handle both CPU- and GPU-optimized usage. The order indicates preference for CPU:

```js
navigator.xr.requestSession("immersive-ar", {
  requiredFeatures: ["depth-sensing"],
  depthSensing: {
    usagePreference: ["cpu-optimized", "gpu-optimized"],
    formatPreference: ["luminance-alpha", "float32"],
  },
});
```

To check which usage was selected by the user agent, you can call the `depthUsage` property:

```js
console.log(session.depthUsage); // either "cpu-optimized" or "gpu-optimized"
```
