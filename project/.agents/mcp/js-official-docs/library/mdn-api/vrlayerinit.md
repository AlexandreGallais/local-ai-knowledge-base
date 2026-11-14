---
title: "VRLayerInit"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrlayerinit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRLayerInit

The **`VRLayerInit`** dictionary of the WebVR API represents a content layer (an `HTMLCanvasElement` or `OffscreenCanvas`) that you want to present in a VR display.

> **Note:**
> This dictionary was part of the old WebVR API. It has been superseded by the WebXR Device API.

You can retrieve `VRLayerInit` objects using `VRDisplay.getLayers()`, and present them using the `VRDisplay.requestPresent()` method.

## Instance properties

- `VRLayerInit.leftBounds` (deprecated)
    Defines the left texture bounds of the canvas whose contents will be presented by the `VRDisplay`.
- `VRLayerInit.rightBounds` (deprecated)
    Defines the right texture bounds of the canvas whose contents will be presented by the `VRDisplay`.
- `VRLayerInit.source` (deprecated)
    Defines the canvas whose contents will be presented by the `VRDisplay` when `VRDisplay.submitFrame()` is called.

## Examples

```js
// currently returns an empty array
let layers = vrDisplay.getLayers();

if (navigator.getVRDisplays) {
  console.log("WebVR 1.1 supported");
  // Then get the displays attached to the computer
  navigator.getVRDisplays().then((displays) => {
    // If a display is available, use it to present the scene
    if (displays.length > 0) {
      vrDisplay = displays[0];
      console.log("Display found");
      // Starting the presentation when the button is clicked: It can only be called in response to a user gesture
      btn.addEventListener("click", () => {
        vrDisplay.requestPresent([{ source: canvas }]).then(() => {
          console.log("Presenting to WebVR display");

          // Here it returns an array of VRLayerInit objects
          layers = vrDisplay.getLayers();

          // …
        });
      });
    }
  });
}
```

`VRLayerInit` objects look something like this:

```js
const init = {
  leftBounds: [/* … */],
  rightBounds: [/* … */],
  source: canvasReference,
};
```

> **Note:**
> The `canvasReference` refers to the `<canvas>` element itself, not the WebGL context associated with the canvas. The other two members are arrays

## Specifications

This dictionary was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
