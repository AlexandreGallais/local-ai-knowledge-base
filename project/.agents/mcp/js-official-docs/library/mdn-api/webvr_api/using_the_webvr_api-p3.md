---
title: "Using the WebVR API (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webvr_api/using_the_webvr_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the WebVR API (part 3 of 3)

### Rendering and display

At this point, we've seen all the code required to access the VR hardware, request that we present our scene to the hardware, and start running the rending loop. Let's now look at the code for the rendering loop, and explain how the WebVR-specific parts of it work.

First of all, we begin the definition of our rendering loop function — `drawVRScene()`. The first thing we do inside here is make a call to `VRDisplay.requestAnimationFrame()` to keep the loop running after it has been called once (this occurred earlier on in our code when we started presenting to the VR display). This call is set as the value of the global `vrSceneFrame` variable, so we can cancel the loop with a call to `VRDisplay.cancelAnimationFrame()` once we exit VR presenting.

```js
function drawVRScene() {
  // WebVR: Request the next frame of the animation
  vrSceneFrame = vrDisplay.requestAnimationFrame(drawVRScene);
  // ...
}
```

Next, we call `VRDisplay.getFrameData()`, passing it the name of the variable that we want to use to contain the frame data. We initialized this earlier on — `frameData`. After the call completes, this variable will contain the data need to render the next frame to the VR device, packaged up as a `VRFrameData` object. This contains things like projection and view matrices for rendering the scene correctly for the left and right eye view, and the current `VRPose` object, which contains data on the VR display such as orientation, position, etc.

This has to be called on every frame so the rendered view is always up-to-date.

```js
function drawVRScene() {
  // ...
  // Populate frameData with the data of the next frame to display
  vrDisplay.getFrameData(frameData);
  // ...
}
```

Now we retrieve the current `VRPose` from the `VRFrameData.pose` property, store the position and orientation for use later on, and send the current pose to the pose stats box for display, if the `poseStatsDisplayed` variable is set to true.

```js
function drawVRScene() {
  // ...
  // You can get the position, orientation, etc. of the display from the current frame's pose

  const curFramePose = frameData.pose;
  const curPos = curFramePose.position;
  const curOrient = curFramePose.orientation;
  if (poseStatsDisplayed) {
    displayPoseStats(curFramePose);
  }
  // ...
}
```

We now clear the canvas before we start drawing on it, so that the next frame is clearly seen, and we don't also see previous rendered frames:

```js
function drawVRScene() {
  // ...
  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  // ...
}
```

We now render the view for both the left and right eyes. First of all we need to create projection and view locations for use in the rendering. These are `WebGLUniformLocation` objects, created using the `WebGLRenderingContext.getUniformLocation()` method, passing it the shader program's identifier and an identifying name as parameters.

```js
function drawVRScene() {
  // ...
  // WebVR: Create the required projection and view matrix locations needed
  // for passing into the uniformMatrix4fv methods below

  const projectionMatrixLocation = gl.getUniformLocation(
    shaderProgram,
    "projMatrix",
  );
  const viewMatrixLocation = gl.getUniformLocation(shaderProgram, "viewMatrix");
  // ...
}
```

The next rendering step involves:

- Specifying the viewport size for the left eye, using `WebGLRenderingContext.viewport` — this is logically the first half of the canvas width, and the full canvas height.
- Specifying the view and projection matrix values to use to render the left eye — this is done using the `WebGLRenderingContext.uniformMatrix4fv` method, which is passed the location values we retrieved above, and the left matrices obtained from the `VRFrameData` object.
- Running the `drawGeometry()` function, which renders the actual scene — because of what we specified in the previous two steps, we will render it for the left eye only.

```js
function drawVRScene() {
  // ...
  // WebVR: Render the left eye's view to the left half of the canvas
  gl.viewport(0, 0, canvas.width * 0.5, canvas.height);
  gl.uniformMatrix4fv(
    projectionMatrixLocation,
    false,
    frameData.leftProjectionMatrix,
  );
  gl.uniformMatrix4fv(viewMatrixLocation, false, frameData.leftViewMatrix);
  drawGeometry();
  // ...
}
```

We now do exactly the same thing, but for the right eye:

```js
function drawVRScene() {
  // ...
  // WebVR: Render the right eye's view to the right half of the canvas
  gl.viewport(canvas.width * 0.5, 0, canvas.width * 0.5, canvas.height);
  gl.uniformMatrix4fv(
    projectionMatrixLocation,
    false,
    frameData.rightProjectionMatrix,
  );
  gl.uniformMatrix4fv(viewMatrixLocation, false, frameData.rightViewMatrix);
  drawGeometry();
  // ...
}
```

Next we define our `drawGeometry()` function. Most of this is just general WebGL code required to draw our 3D cube. You'll see some WebVR-specific parts in the `mvTranslate()` and `mvRotate()` function calls — these pass <example-value> into the WebGL program that define the translation and rotation of the cube for the current frame

You'll see that we are modifying these values by the position (`curPos`) and orientation (`curOrient`) of the VR display we got from the `VRPose` object. The result is that, for example, as you move or rotate your head left, the x position value (`curPos[0]`) and y rotation value (`[curOrient[1]`) are added to the x translation value, meaning that the cube will move to the right, as you'd expect when you are looking at something and then move/turn your head left.

This is a quick and dirty way to use VR pose data, but it illustrates the basic principle.

```js
function drawGeometry() {
  // Establish the perspective with which we want to view the
  // scene. Our field of view is 45 degrees, with a width/height
  // ratio of 640:480, and we only want to see objects between 0.1 units
  // and 100 units away from the camera.
  perspectiveMatrix = makePerspective(45, 640.0 / 480.0, 0.1, 100.0);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  loadIdentity();

  // Now move the drawing position a bit to where we want to start
  // drawing the cube.
  mvTranslate([
    0.0 - curPos[0] * 25 + curOrient[1] * 25,
    5.0 - curPos[1] * 25 - curOrient[0] * 25,
    -15.0 - curPos[2] * 25,
  ]);

  // Save the current matrix, then rotate before we draw.
  mvPushMatrix();
  mvRotate(cubeRotation, [0.25, 0, 0.25 - curOrient[2] * 0.5]);

  // Draw the cube by binding the array buffer to the cube's vertices
  // array, setting attributes, and pushing it to GL.
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

  // Set the texture coordinates attribute for the vertices.
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

  // Specify the texture to map onto the faces.
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, cubeTexture);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

  // Draw the cube.
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

  // Restore the original matrix
  mvPopMatrix();
}
```

The next bit of the code has nothing to do with WebVR — it just updates the rotation of the cube on each frame:

```js
function drawVRScene() {
  // ...
  // Update the rotation for the next draw, if it's time to do so.
  let currentTime = new Date().getTime();
  if (lastCubeUpdateTime) {
    const delta = currentTime - lastCubeUpdateTime;

    cubeRotation += (30 * delta) / 1000.0;
  }
  lastCubeUpdateTime = currentTime;
  // ...
}
```

The last part of the rendering loop involves us calling `VRDisplay.submitFrame()` — now all the work has been done and we've rendered the display on the `<canvas>`, this method then submits the frame to the VR display so it is displayed on there as well.

```js
function drawVRScene() {
  // ...
  // WebVR: Indicate that we are ready to present the rendered frame to the VR display
  vrDisplay.submitFrame();
}
```

### Displaying the pose (position, orientation, etc.) data

In this section we'll discuss the `displayPoseStats()` function, which displays our updated pose data on each frame. The function is fairly simple.

First of all, we store the six different property values obtainable from the `VRPose` object in their own variables — each one is a `Float32Array`.

```js
function displayPoseStats(pose) {
  const pos = pose.position;
  const orient = pose.orientation;
  const linVel = pose.linearVelocity;
  const linAcc = pose.linearAcceleration;
  const angVel = pose.angularVelocity;
  const angAcc = pose.angularAcceleration;
  // ...
}
```

We then write out the data into the information box, updating it on every frame. We've clamped each value to three decimal places using `toFixed()`, as the values are hard to read otherwise.

You should note that we've used a conditional expression to detect whether the linear acceleration and angular acceleration arrays are successfully returned before we display the data. These values are not reported by most VR hardware as yet, so the code would throw an error if we did not do this (the arrays return `null` if they are not successfully reported).

```js
function displayPoseStats(pose) {
  // ...
  posStats.textContent =
    `Position: ` +
    `x ${pos[0].toFixed(3)}, ` +
    `y ${pos[1].toFixed(3)}, ` +
    `z ${pos[2].toFixed(3)}`;
  orientStats.textContent =
    `Orientation: ` +
    `x ${orient[0].toFixed(3)}, ` +
    `y ${orient[1].toFixed(3)}, ` +
    `z ${orient[2].toFixed(3)}`;
  linVelStats.textContent =
    `Linear velocity: ` +
    `x ${linVel[0].toFixed(3)}, ` +
    `y ${linVel[1].toFixed(3)}, ` +
    `z ${linVel[2].toFixed(3)}`;
  angVelStats.textContent =
    `Angular velocity: ` +
    `x ${angVel[0].toFixed(3)}, ` +
    `y ${angVel[1].toFixed(3)}, ` +
    `z ${angVel[2].toFixed(3)}`;

  if (linAcc) {
    linAccStats.textContent =
      `Linear acceleration: ` +
      `x ${linAcc[0].toFixed(3)}, ` +
      `y ${linAcc[1].toFixed(3)}, ` +
      `z ${linAcc[2].toFixed(3)}`;
  } else {
    linAccStats.textContent = "Linear acceleration not reported";
  }

  if (angAcc) {
    angAccStats.textContent =
      `Angular acceleration: ` +
      `x ${angAcc[0].toFixed(3)}, ` +
      `y ${angAcc[1].toFixed(3)}, ` +
      `z ${angAcc[2].toFixed(3)}`;
  } else {
    angAccStats.textContent = "Angular acceleration not reported";
  }
}
```

## WebVR events

The WebVR spec features a number of events that are fired, allowing our app code to react to changes in the state of the VR display (see Window events). For example:

- `vrdisplaypresentchange` — Fires when the presenting state of a VR display changes — i.e., goes from presenting to not presenting, or vice versa.
- `vrdisplayconnect` — Fires when a compatible VR display has been connected to the computer.
- `vrdisplaydisconnect` — Fires when a compatible VR display has been disconnected from the computer.

To demonstrate how they work, our simple demo includes the following example:

```js
window.addEventListener("vrdisplaypresentchange", (e) => {
  console.log(
    `Display ${e.display.displayId} presentation has changed. Reason given: ${e.reason}.`,
  );
});
```

As you can see, the `VRDisplayEvent` object provides two useful properties — `VRDisplayEvent.display`, which contains a reference to the `VRDisplay` the event was fired in response to, and `VRDisplayEvent.reason`, which contains a human-readable reason why the event was fired.

This is a very useful event; you could use it to handle cases where the display gets disconnected unexpectedly, stopping errors from being thrown and making sure the user is aware of the situation. In Google's webvr.info presentation demo, the event is used to run an `onVRPresentChange()` function, which updates the UI controls as appropriate and resizes the canvas.

## Summary

This article has given you the very basics of how to create a simple WebVR 1.1 app, to help you get started.
