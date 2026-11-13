---
title: "VRDisplay: requestAnimationFrame() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplay/requestanimationframe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplay: requestAnimationFrame() method

The **`requestAnimationFrame()`** method of the `VRDisplay` interface is a special implementation of `Window.requestAnimationFrame` containing a callback function that will be called every time a new frame of the `VRDisplay` presentation is rendered:

> **Note:**
> This method was part of the old WebVR API. It has been superseded by the WebXR Device API.

- When the `VRDisplay` is not presenting a scene, this is functionally equivalent to `Window.requestAnimationFrame`.
- When the `VRDisplay` is presenting, the callback is called at its native refresh rate.

## Syntax

```js
requestAnimationFrame(callback)
```

### Parameters

- `callback`
    A callback function that will be called every time a new frame of the `VRDisplay` presentation is rendered.

### Return value

A long representing the handle of the `requestAnimationFrame()` call. This can then be passed to a `VRDisplay.cancelAnimationFrame()` call to unregister the callback.

## Examples

```js
const frameData = new VRFrameData();
let vrDisplay;

navigator.getVRDisplays().then((displays) => {
  vrDisplay = displays[0];
  console.log("Display found");
  // Starting the presentation when the button is clicked: It can only be called in response to a user gesture
  btn.addEventListener("click", () => {
    vrDisplay.requestPresent([{ source: canvas }]).then(() => {
      drawVRScene();
    });
  });
});

// WebVR: Draw the scene for the WebVR display.
function drawVRScene() {
  // WebVR: Request the next frame of the animation
  vrSceneFrame = vrDisplay.requestAnimationFrame(drawVRScene);

  // Populate frameData with the data of the next frame to display
  vrDisplay.getFrameData(frameData);

  // You can get the position, orientation, etc. of the display from the current frame's pose
  const curFramePose = frameData.pose;
  const curPos = curFramePose.position;
  const curOrient = curFramePose.orientation;

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // WebVR: Create the required projection and view matrix locations needed
  // for passing into the uniformMatrix4fv methods below

  const projectionMatrixLocation = gl.getUniformLocation(
    shaderProgram,
    "projMatrix",
  );
  const viewMatrixLocation = gl.getUniformLocation(shaderProgram, "viewMatrix");

  // WebVR: Render the left eye's view to the left half of the canvas
  gl.viewport(0, 0, canvas.width * 0.5, canvas.height);
  gl.uniformMatrix4fv(
    projectionMatrixLocation,
    false,
    frameData.leftProjectionMatrix,
  );
  gl.uniformMatrix4fv(viewMatrixLocation, false, frameData.leftViewMatrix);
  drawGeometry();

  // WebVR: Render the right eye's view to the right half of the canvas
  gl.viewport(canvas.width * 0.5, 0, canvas.width * 0.5, canvas.height);
  gl.uniformMatrix4fv(
    projectionMatrixLocation,
    false,
    frameData.rightProjectionMatrix,
  );
  gl.uniformMatrix4fv(viewMatrixLocation, false, frameData.rightViewMatrix);
  drawGeometry();

  function drawGeometry() {
    // draw the view for each eye
  }

  // …

  // WebVR: Indicate that we are ready to present the rendered frame to the VR display
  vrDisplay.submitFrame();
}
```

> **Note:**
> You can see this complete code at raw-webgl-example.

## Specifications

This method was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
