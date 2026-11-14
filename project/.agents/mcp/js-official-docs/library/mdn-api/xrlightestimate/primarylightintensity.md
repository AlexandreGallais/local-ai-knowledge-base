---
title: "XRLightEstimate: primaryLightIntensity property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrlightestimate/primarylightintensity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRLightEstimate: primaryLightIntensity property

The _read-only_ **`primaryLightIntensity`** property of the `XRLightEstimate` interface returns a `DOMPointReadOnly` representing the intensity of the primary light source from the `probeSpace` of an `XRLightProbe`.

## Value

A `DOMPointReadOnly` object where an RGB value is mapped to the `x`, `y`, and `z` values. The `w` value is always `1.0`. If no estimated values from the user's environment are available, the point will be `{x: 0.0, y: 0.0, z: 0.0, w: 1.0}`, representing no illumination.

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

- `XRLightEstimate.primaryLightDirection`
- `XRLightProbe.probeSpace`
