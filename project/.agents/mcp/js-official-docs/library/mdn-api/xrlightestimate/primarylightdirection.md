---
title: "XRLightEstimate: primaryLightDirection property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrlightestimate/primarylightdirection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRLightEstimate: primaryLightDirection property

The _read-only_ **`primaryLightDirection`** property of the `XRLightEstimate` interface returns a `DOMPointReadOnly` representing the direction to the primary light source from the `probeSpace` of an `XRLightProbe`.

## Value

A `DOMPointReadOnly` object. If no estimated values from the user's environment are available, the point will be `{ x: 0.0, y: 1.0, z: 0.0, w: 0.0 }`, representing a light shining straight down from above.

## Examples

Within an `XRFrame` loop, you can use the `primaryLightDirection` and `primaryLightIntensity` properties
to render shadows based on the most prominent light source, for example.

```js
const lightProbe = await xrSession.requestLightProbe();

// frame loop
function onXRFrame(time, xrFrame) {
  let lightEstimate = xrFrame.getLightEstimate(lightProbe);

  // Render lights

  // Available properties
  lightEstimate.primaryLightDirection;
  lightEstimate.primaryLightIntensity;
}
```

## See also

- `XRLightEstimate.primaryLightIntensity`
- `XRLightProbe.probeSpace`
