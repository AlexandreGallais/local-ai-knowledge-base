---
title: "VRDisplayCapabilities"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplaycapabilities/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplayCapabilities

The **`VRDisplayCapabilities`** interface of the WebVR API describes the capabilities of a `VRDisplay` — its features can be used to perform VR device capability tests, for example can it return position information.

> **Note:**
> This interface was part of the old WebVR API. It has been superseded by the WebXR Device API.

This interface is accessible through the `VRDisplay.capabilities` property.

## Instance properties

- `VRDisplayCapabilities.canPresent` (deprecated) (read-only) (non-standard)
    Returns a boolean value stating whether the VR display is capable of presenting content (e.g., through an HMD).
- `VRDisplayCapabilities.hasExternalDisplay` (deprecated) (read-only) (non-standard)
    Returns a boolean value stating whether the VR display is separate from the device's primary display.
- `VRDisplayCapabilities.hasOrientation` (deprecated) (read-only) (non-standard)
    Returns a boolean value stating whether the VR display can track and return orientation information.
- `VRDisplayCapabilities.hasPosition` (deprecated) (read-only) (non-standard)
    Returns a boolean value stating whether the VR display can track and return position information.
- `VRDisplayCapabilities.maxLayers` (deprecated) (read-only) (non-standard)
    Returns a number indicating the maximum number of `VRLayerInit`s that the VR display can present at once (e.g., the maximum length of the array that `VRDisplay.requestPresent()` can accept.)

## Examples

```js
function reportDisplays() {
  navigator.getVRDisplays().then((displays) => {
    displays.forEach((display, i) => {
      const cap = display.capabilities;
      // cap is a VRDisplayCapabilities object
      const listItem = document.createElement("li");
      listItem.innerText = `
VR Display ID: ${display.displayId}
VR Display Name: ${display.displayName}
Display can present content: ${cap.canPresent}
Display is separate from the computer's main display: ${cap.hasExternalDisplay}
Display can return position info: ${cap.hasPosition}
Display can return orientation info: ${cap.hasOrientation}
Display max layers: ${cap.maxLayers}`;
      listItem.insertBefore(
        document.createElement("strong"),
        listItem.firstChild,
      ).textContent = `Display ${i + 1}`;
      list.appendChild(listItem);
    });
  });
}
```

## Specifications

This interface was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
