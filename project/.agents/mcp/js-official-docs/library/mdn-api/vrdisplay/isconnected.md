---
title: "VRDisplay: isConnected property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplay/isconnected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplay: isConnected property

The **`isConnected`** read-only property of the `VRDisplay` interface returns a boolean value indicating whether the `VRDisplay` is connected to the computer.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

## Value

A boolean value; `true` means the display is connected; `false` means it isn't.

## Examples

```js
navigator.getVRDisplays().then((displays) => {
  // If a display is available, use it to present the scene
  if (displays.length > 0) {
    vrDisplay = displays[0];

    // Starting the presentation when the button is clicked: It can only be called in response to a user gesture
    btn.addEventListener("click", () => {
      // Only request presentation if the display is still connected.
      if (vrDisplay.isConnected) {
        vrDisplay.requestPresent([{ source: canvas }]).then(() => {
          // start rendering the app, etc.
        });
      } else {
        console.log("Connection to display lost");
      }
    });
  }
});
```

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
