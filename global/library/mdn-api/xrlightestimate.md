---
title: "XRLightEstimate"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrlightestimate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRLightEstimate

The **`XRLightEstimate`** interface of the WebXR Device API provides the estimated lighting values for an `XRLightProbe` at the time represented by an `XRFrame`.

To get an `XRLightEstimate` object, call the `XRFrame.getLightEstimate()` method.

## Instance properties

- `XRLightEstimate.primaryLightDirection` (read-only) (experimental)
    A `DOMPointReadOnly` representing the direction to the primary light source from the `probeSpace` of an `XRLightProbe`.
- `XRLightEstimate.primaryLightIntensity` (read-only) (experimental)
    A `DOMPointReadOnly` (with the `x`, `y`, `z` values mapped to RGB) representing the intensity of the primary light source from the `probeSpace` of an `XRLightProbe`.
- `XRLightEstimate.sphericalHarmonicsCoefficients` (read-only) (experimental)
    A `Float32Array` containing 9 spherical harmonics coefficients.

## Instance methods

None.

## Examples

### Getting an `XRLightProbe` object

First, use the `XRSession.requestLightProbe()` method to get a light probe from a session.
Then, within an `XRFrame` loop, the `getLightEstimate()` method will return a `XRLightEstimate` object containing the lighting values for each frame.

```js
const lightProbe = await xrSession.requestLightProbe();

// frame loop
function onXRFrame(time, xrFrame) {
  let lightEstimate = xrFrame.getLightEstimate(lightProbe);

  // Use light estimate data to light the scene

  // Available properties
  lightEstimate.sphericalHarmonicsCoefficients;
  lightEstimate.primaryLightDirection;
  lightEstimate.primaryLightIntensity;
}
```

## See also

- `XRFrame.getLightEstimate()`
