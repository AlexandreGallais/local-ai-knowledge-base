---
title: "XRLightProbe: probeSpace property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrlightprobe/probespace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRLightProbe: probeSpace property

The _read-only_ **`probeSpace`** property of the `XRLightProbe` interface returns an `XRSpace` tracking the position and orientation that the lighting estimations are relative to.

## Value

An `XRSpace` object.

## Examples

The `probeSpace` property returns the position and orientation in space that the lighting estimate is relative to. It may update over time as the user moves around. Use the `XRFrame.getPose()` method to get the current lighting state with each frame.

```js
const lightProbe = await xrSession.requestLightProbe();
const probePose = xrFrame.getPose(lightProbe.probeSpace, xrReferenceSpace);
```

## See also

- `XRSpace()`
- `XRFrame.getPose()`
