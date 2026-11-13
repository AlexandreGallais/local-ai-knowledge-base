---
title: "VREyeParameters"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vreyeparameters/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VREyeParameters

The **`VREyeParameters`** interface of the WebVR API represents all the information required to correctly render a scene for a given eye, including field of view information.

> **Note:**
> This interface was part of the old WebVR API. It has been superseded by the WebXR Device API.

This interface is accessible through the `VRDisplay.getEyeParameters()` method.

> **Warning:**
> The values in this interface should not be used to compute view or projection matrices. In order to ensure the widest possible hardware compatibility use the matrices provided by `VRFrameData`.

## Instance properties

- `VREyeParameters.offset` (deprecated) (read-only) (non-standard)
    Represents the offset from the center point between the user's eyes to the center of the eye, measured in meters.
- `VREyeParameters.fieldOfView` (deprecated) (read-only) (non-standard)
    Describes the current field of view for the eye, which can vary as the user adjusts their interpupillary distance (IPD).
- `VREyeParameters.maximumFieldOfView` (deprecated) (read-only) (non-standard)
    Describes the maximum supported field of view for the current eye.
- `VREyeParameters.minimumFieldOfView` (deprecated) (read-only) (non-standard)
    Describes the minimum supported field of view for the current eye.
- `VREyeParameters.renderWidth` (deprecated) (read-only) (non-standard)
    Describes the recommended render target width of each eye viewport, in pixels.
- `VREyeParameters.renderHeight` (deprecated) (read-only) (non-standard)
    Describes the recommended render target height of each eye viewport, in pixels.

## Examples

```js
navigator.getVRDisplays().then((displays) => {
  // If a display is available, use it to present the scene
  vrDisplay = displays[0];
  console.log("Display found");
  // Starting the presentation when the button is clicked:
  //   It can only be called in response to a user gesture
  btn.addEventListener("click", () => {
    vrDisplay.requestPresent([{ source: canvas }]).then(() => {
      console.log("Presenting to WebVR display");

      // Set the canvas size to the size of the vrDisplay viewport

      const leftEye = vrDisplay.getEyeParameters("left");
      const rightEye = vrDisplay.getEyeParameters("right");

      canvas.width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
      canvas.height = Math.max(leftEye.renderHeight, rightEye.renderHeight);

      drawVRScene();
    });
  });
});
```

## Specifications

This interface was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
