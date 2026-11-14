---
title: "Movement, orientation, and motion: A WebXR example (part 2 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/movement_and_motion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Movement, orientation, and motion: A WebXR example (part 2 of 4)

## Starting up and shutting down WebXR

```js
xrButton.addEventListener("click", onXRButtonClick);

if (!navigator.xr || enableForcePolyfill) {
  console.log("Using the polyfill");
  polyfill = new WebXRPolyfill();
}
setupXRButton();
```

We add a handler for `click` events. Then we look to see if `navigator.xr` is defined. If it isn't—and/or the `enableForcePolyfill` configuration constant is set to `true`—we install the WebXR polyfill by instantiating the `WebXRPolyfill` class.

### Handling the startup and shutdown UI

Then we call the `setupXRButton()` function, which handles configuring the "Enter/Exit WebXR" button to enable or disable it as necessary depending on the availability of WebXR support for the session type specified in the `SESSION_TYPE` constant.

```js
function setupXRButton() {
  if (navigator.xr.isSessionSupported) {
    navigator.xr.isSessionSupported(SESSION_TYPE).then((supported) => {
      xrButton.disabled = !supported;
    });
  } else {
    navigator.xr
      .supportsSession(SESSION_TYPE)
      .then(() => {
        xrButton.disabled = false;
      })
      .catch(() => {
        xrButton.disabled = true;
      });
  }
}
```

The label of the button gets adjusted in the code that actually handles starting and stopping the WebXR session; we'll see that below.

The WebXR session is toggled on and off by the handler for `click` events on the button, whose label is appropriately set to either "Enter WebXR" or "Exit WebXR". This is done by the `onXRButtonClick()` event handler.

```js
async function onXRButtonClick(event) {
  if (!xrSession) {
    navigator.xr.requestSession(SESSION_TYPE).then(sessionStarted);
  } else {
    await xrSession.end();

    if (xrSession) {
      sessionEnded();
    }
  }
}
```

This begins by looking at the value of `xrSession` to see if we already have a `XRSession` object representing an ongoing WebXR session. If we don't, the click represents a request to enable WebXR mode, so call `requestSession()` to request a WebXR session of the desired WebXR session type, and then call `sessionStarted()` to begin running the scene in that WebXR session.

If we already have an ongoing session, on the other hand, we call its `end()` method to stop the session.

The last thing we do in this code is to check to see if `xrSession` is still non-`NULL`. If it is, we call `sessionEnded()`, the handler for the `end` event. This code should not be necessary, but there appears to be an issue in which at least some browsers are not correctly firing the `end` event. By running the event handler directly, we complete the close-out process manually in this situation.

### Starting up the WebXR session

The `sessionStarted()` function handles actually setting up and starting the session, by setting up event handlers, compiling and installing the GLSL code for the vertex and fragment shaders, and attaching the WebGL layer to the WebXR session before kicking off the rendering loop. It gets called as the handler for the promise returned by `requestSession()`.

```js
function sessionStarted(session) {
  let refSpaceType;

  xrSession = session;
  xrButton.innerText = "Exit WebXR";
  xrSession.addEventListener("end", sessionEnded);

  let canvas = document.querySelector("canvas");
  gl = canvas.getContext("webgl", { xrCompatible: true });

  if (allowMouseRotation) {
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  }

  if (allowKeyboardMotion) {
    document.addEventListener("keydown", handleKeyDown);
  }

  shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexNormal: gl.getAttribLocation(shaderProgram, "aVertexNormal"),
      textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix",
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      normalMatrix: gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
      uSampler: gl.getUniformLocation(shaderProgram, "uSampler"),
    },
  };

  buffers = initBuffers(gl);
  texture = loadTexture(
    gl,
    "https://mdn.github.io/shared-assets/images/examples/fx-nightly-512.png",
  );

  xrSession.updateRenderState({
    baseLayer: new XRWebGLLayer(xrSession, gl),
  });

  const isImmersiveVr = SESSION_TYPE === "immersive-vr";
  refSpaceType = isImmersiveVr ? "local" : "viewer";

  mat4.fromTranslation(cubeMatrix, viewerStartPosition);

  vec3.copy(cubeOrientation, viewerStartOrientation);

  xrSession.requestReferenceSpace(refSpaceType).then((refSpace) => {
    xrReferenceSpace = refSpace.getOffsetReferenceSpace(
      new XRRigidTransform(viewerStartPosition, cubeOrientation),
    );
    animationFrameRequestID = xrSession.requestAnimationFrame(drawFrame);
  });

  return xrSession;
}
```

After storing the newly-created `XRSession` object into `xrSession`, the label of the button is set to "Exit WebXR" to indicate its new function after starting the scene, and a handler is installed for the `end` event, so we get notified when the `XRSession` ends.

Then we get a reference to the `<canvas>` found in our HTML—as well as its WebGL rendering context—which will be used as the drawing surface for the scene. The `xrCompatible` property is requested when calling `getContext()` on the element to gain access to the WebGL rendering context for the canvas. This ensures that the context is configured for use as a source for WebXR rendering.

Next, we add event handlers for the `mousemove` and `contextmenu`, but only if the `allowMouseRotation` constant is `true`. The `mousemove` handler will deal with the pitching and yawing of the view based upon the movement of the mouse. Since the "" feature functions only while the right mouse button is held down, and clicking using the right mouse button triggers the context menu, we add a handler for the `contextmenu` event to the canvas to prevent the context menu from appearing when the user initially begins their drag of the mouse.

Next, we compile the shader programs; get references to its variables; initialize the buffers that store the array of each position; the indexes into the position table for each vertex; the vertex normals; and the texture coordinates for each vertex. This is all taken directly from the WebGL sample code, so refer to Lighting in WebGL and its preceding articles Creating 3D objects using WebGL and Using textures in WebGL. Then our `loadTexture()` function is called to load the texture file.

Now that the rendering structures and data are loaded, we start preparing to run the `XRSession`. We connect the session to the WebGL layer so it knows what to use as a rendering surface by calling `XRSession.updateRenderState()` with a `baseLayer` set to a new `XRWebGLLayer`.

We then look at the value of the `SESSION_TYPE` constant to see whether the WebXR context should be immersive or inline. Immersive sessions use the `local` reference space, while inline sessions use the `viewer` reference space.

The `glMatrix` library's `fromTranslation()` function for 4x4 matrices is used to convert the viewer's start position as given in the `viewerStartPosition` constant into a transform matrix, `cubeMatrix`. The viewer's starting orientation, `viewerStartOrientation` constant, is copied into the `cubeOrientation`, which will be used to track the rotation of the cube over time.

`sessionStarted()` finishes up by calling the session's `requestReferenceSpace()` method to get a reference space object describing the space in which the object is being created. When the promise returned resolves to a `XRReferenceSpace` object, we call its `getOffsetReferenceSpace` method to obtain a reference space object to represent the object's coordinate system. The origin of the new space is located at the world coordinates specified by the `viewerStartPosition` and its orientation set to `cubeOrientation`. Then we let the session know we're ready to draw a frame by calling its `requestAnimationFrame()` method. We record the returned request ID in case we need to cancel the request later.

Finally, `sessionStarted()` returns the `XRSession` representing the user's WebXR session.

### When the session ends

When the WebXR session ends—either because it's being shut down by the user or by calling `XRSession.end()`—the `end` event is sent; we have set this up to call a function called `sessionEnded()`.

```js
function sessionEnded() {
  xrButton.innerText = "Enter WebXR";

  if (animationFrameRequestID) {
    xrSession.cancelAnimationFrame(animationFrameRequestID);
    animationFrameRequestID = 0;
  }
  xrSession = null;
}
```

We can also call `sessionEnded()` directly if we wish to programmatically end the WebXR session. In either case, the label of the button is updated to indicate that a click will start a session, and then, if there is a pending request for an animation frame, we cancel it by calling `cancelAnimationFrame`

Once that's done, the value of `xrSession` is changed to `NULL` to indicate that we're done with the session.

## Implementing the controls

Now let's take a look at the code that handles turning keyboard and mouse events into something usable for controlling an avatar in a WebXR scenario.

### Moving using the keyboard

In order to allow the user to move through the 3D world even if they don't have a WebXR device with the inputs to perform movement through space, our handler for `keydown` events, `handleKeyDown()`, responds by updating offsets from the object's origin based on which key was pressed.

```js
function handleKeyDown(event) {
  switch (event.key) {
    case "w":
    case "W":
      verticalDistance -= MOVE_DISTANCE;
      break;
    case "s":
    case "S":
      verticalDistance += MOVE_DISTANCE;
      break;
    case "a":
    case "A":
      transverseDistance += MOVE_DISTANCE;
      break;
    case "d":
    case "D":
      transverseDistance -= MOVE_DISTANCE;
      break;
    case "ArrowUp":
      axialDistance += MOVE_DISTANCE;
      break;
    case "ArrowDown":
      axialDistance -= MOVE_DISTANCE;
      break;
    case "r":
    case "R":
      transverseDistance = axialDistance = verticalDistance = 0;
      mouseYaw = mousePitch = 0;
      break;
    default:
      break;
  }
}
```

The keys and their effects are:

- The `W` key moves the viewer upward by `MOVE_DISTANCE`.
- The `S` key moves the viewer downward by `MOVE_DISTANCE`.
- The `A` key <example-value> the viewer to the left by `MOVE_DISTANCE`.
- The `D` key <example-value> the viewer to the right by `MOVE_DISTANCE`.
- The up arrow key, `↑`, slides the viewer forward by `MOVE_DISTANCE`.
- The down arrow key, `↓`, slides the viewer backward by `MOVE_DISTANCE`.
- The `R` key <example-value> the viewer to their starting position and orientation by resetting the input offsets all to 0.

These offsets will be applied by the renderer starting with the next frame drawn.

### Pitching and yawing with the mouse

We also have a `mousemove` event handler which checks to see if the right mouse button is down, and if so, calls the `rotateViewBy()` function, defined next, to calculate and store the new pitch (looking up and down) and yaw (looking left and right) values.

```js
function handlePointerMove(event) {
  if (event.buttons & 2) {
    rotateViewBy(event.movementX, event.movementY);
  }
}
```

Calculating the new pitch and yaw values is handled by the function `rotateViewBy()`:

```js
function rotateViewBy(dx, dy) {
  mouseYaw -= dx * MOUSE_SPEED;
  mousePitch -= dy * MOUSE_SPEED;

  if (mousePitch < -Math.PI * 0.5) {
    mousePitch = -Math.PI * 0.5;
  } else if (mousePitch > Math.PI * 0.5) {
    mousePitch = Math.PI * 0.5;
  }
}
```

Given as input the mouse deltas, `dx` and `dy`, the new yaw value is computed by subtracting from the current value of `mouseYaw` the product of `dx` and the `MOUSE_SPEED` scaling constant. You can, then, control how responsive the mouse is by increasing the value of `MOUSE_SPEED`.
