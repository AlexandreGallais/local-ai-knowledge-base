---
title: "XRSession: depthDataFormat property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/depthdataformat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: depthDataFormat property

The _read-only_ **`depthDataFormat`** property of an `immersive-ar`
`XRSession` describes which depth sensing data format is used.

## Value

This property can return the following values:

- `luminance-alpha`
    2-byte unsigned integer data buffers (`LUMINANCE_ALPHA` `GLEnum`).
    CPU usage: interpret `XRCPUDepthInformation.data` as `Uint8Array`.
    GPU usage: inspect Luminance and Alpha channels to reassemble single value.
- `float32`
    4-byte floating point data buffers (`R32F` `GLEnum`).
    CPU usage: interpret `XRCPUDepthInformation.data` as `Float32Array`.
    GPU usage: inspect Red channel and use the value.

## Examples

To request the desired data format, you need to specify a `dataFormatPreference` when requesting a session using `XRSystem.requestSession()`. Here, the caller is able to handle both "luminance-alpha" and "float32" formats. The order indicates preference for "luminance-alpha":

```js
navigator.xr.requestSession("immersive-ar", {
  requiredFeatures: ["depth-sensing"],
  depthSensing: {
    usagePreference: ["cpu-optimized", "gpu-optimized"],
    formatPreference: ["luminance-alpha", "float32"],
  },
});
```

To check which data format was selected by the user agent, you can call the `depthDataFormat` property:

```js
console.log(session.depthDataFormat); // either "luminance-alpha" or "float32"
```
