---
title: "XRFrame: getLightEstimate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrframe/getlightestimate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRFrame: getLightEstimate() method

The **`getLightEstimate()`** method of the `XRFrame` interface returns an `XRLightEstimate` object containing estimated lighting values for a given `XRLightProbe`.

## Syntax

```js
getLightEstimate(lightProbe)
```

### Parameters

- `lightProbe`
    An `XRLightProbe` object containing the current lighting state for the frame.

### Return value

An `XRLightEstimate` object or `null` if the device cannot estimate lighting for this frame.

## Examples

### Getting light estimates for each frame

Given a session's `XRLightProbe`, the `getLightEstimate()` method gets an `XRLightEstimate` object containing the lighting values for each frame.

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

- `XRLightEstimate`
- `XRLightProbe`
