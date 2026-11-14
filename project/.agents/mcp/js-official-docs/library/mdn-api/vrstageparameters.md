---
title: "VRStageParameters"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrstageparameters/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRStageParameters

The **`VRStageParameters`** interface of the WebVR API represents the values describing the stage area for devices that support room-scale experiences.

> **Note:**
> This interface was part of the old WebVR API. It has been superseded by the WebXR Device API.

This interface is accessible through the `VRDisplay.stageParameters` property.

## Instance properties

- `VRStageParameters.sittingToStandingTransform` (deprecated) (read-only) (non-standard)
    Contains a matrix that transforms the sitting-space view matrices of `VRFrameData` to standing-space.
- `VRStageParameters.sizeX` (deprecated) (read-only) (non-standard)
    _Returns the width_ of the play-area bounds in meters.
- `VRStageParameters.sizeZ` (deprecated) (read-only) (non-standard)
    _Returns the depth_ of the play-area bounds in meters.

## Examples

```js
const info = document.querySelector("p");
let vrDisplay;

navigator.getVRDisplays().then((displays) => {
  vrDisplay = displays[0];
  const stageParams = vrDisplay.stageParameters;
  // stageParams is a VRStageParameters object

  if (stageParams === null) {
    info.textContent =
      "Your VR Hardware does not support room-scale experiences.";
  } else {
    info.innerText = `
Sitting to standing transform: ${stageParams.sittingToStandingTransform}
Play area width (m): ${stageParams.sizeX}
Play area depth (m): ${stageParams.sizeZ}`;
    info.insertBefore(
      document.createElement("strong"),
      info.firstChild,
    ).textContent = "Display stage parameters";
  }
});
```

## Specifications

This interface was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
