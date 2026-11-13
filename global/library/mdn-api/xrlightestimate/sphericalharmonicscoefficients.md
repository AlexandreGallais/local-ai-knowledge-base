---
title: "XRLightEstimate: sphericalHarmonicsCoefficients property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrlightestimate/sphericalharmonicscoefficients/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRLightEstimate: sphericalHarmonicsCoefficients property

The _read-only_ **`sphericalHarmonicsCoefficients`** property of the `XRLightEstimate` interface returns a `Float32Array` containing 9 spherical harmonics coefficients.

Spherical harmonic lighting is a technique that uses spherical functions instead of standard lighting equations. See Wikipedia for more information.

## Value

A `Float32Array` containing 9 spherical harmonics coefficients. The array contains 27 elements in total, with every 3 elements defining red, green, and blue components for each coefficient.

The first 3 elements must be a valid lighting estimate component; the rest may be 0 due to privacy settings or limitations of the device to provide more data.

## Examples

Within an `XRFrame` loop, you can use the `sphericalHarmonicsCoefficients` property to light the scene.

```js
const lightProbe = await xrSession.requestLightProbe();

// frame loop
function onXRFrame(time, xrFrame) {
  let lightEstimate = xrFrame.getLightEstimate(lightProbe);

  // Render lights using lightEstimate.sphericalHarmonicsCoefficients
}
```

## See also

- `XRFrame.getLightEstimate()`
