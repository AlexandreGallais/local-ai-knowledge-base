---
title: "Starting up and shutting down a WebXR session (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/startup_and_shutdown/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Starting up and shutting down a WebXR session (part 2 of 2)

## Creating and starting the session

A WebXR session is represented by an `XRSession` object. To obtain an `XRSession`, you call your `XRSystem`'s `requestSession()` method, which returns a promise that resolves with an `XRSession` if it's able to establish one successfully. Fundamentally, that looks like this:

```js
xr.requestSession("immersive-vr").then((session) => {
  xrSession = session;
  /* continue to set up the session */
});
```

Note the parameter passed into `requestSession()` in this code snippet: `immersive-vr`. This string specifies the type of WebXR session you want to establish—in this case, a fully-immersive virtual reality experience. There are three options:

- `immersive-vr`
    A fully-immersive virtual reality session using a headset or similar device that fully replaces the world around the user with the images you present.
- `immersive-ar`
    An augmented reality session in which images are added to the real world using a headset or similar apparatus. _This option is not yet widely supported, as the AR specification is in flux._
- `inline`
    An on-screen presentation of the XR imagery within the context of the document window.

If the session couldn't be created for some reason—such as feature policy disallowing its use or the user declining to grant permission to use the headset—the promise gets rejected. So a more complete function that starts up and returns a WebXR session could look like this:

```js
async function createImmersiveSession(xr) {
  session = await xr.requestSession("immersive-vr");
  return session;
}
```

This function returns the new `XRSession` or throws an exception if an error occurs while creating the session.

### Customizing the session

In addition to the display mode, the `requestSession()` method can take an optional object with initialization parameters to customize the session. Currently, the only configurable aspect of the session is which of the reference spaces should be used to represent the world's coordinate system. You can specify either required or optional reference spaces in order to obtain a session compatible with the reference spaces you need or prefer to use.

For example, if you need an `unbounded` reference space, you can specify that as a required feature in order to ensure that the session you get can use unbounded spaces:

```js
async function createImmersiveSession(xr) {
  session = await xr.requestSession("immersive-vr", {
    requiredFeatures: ["unbounded"],
  });
  return session;
}
```

On the other hand, if you need an _inline_ session and would prefer a `local` reference space, you can do this:

```js
async function createInlineSession(xr) {
  session = await xr.requestSession("inline", {
    optionalFeatures: ["local"],
  });
  return session;
}
```

This `createInlineSession()` function will try to create an inline session that's compatible with the `local` reference space. When you're ready to create your reference space, you can try for a local space, and if that fails, fall back to a `viewer` reference space, which all devices are required to support.

### Preparing the new session for use

Once the `requestSession()` method's returned promise successfully resolves, you know you have a usable WebXR session in hand. You can then proceed to prepare the session for use and begin your animations.

The key <example-value> you need (or may need) to do in order to finish the configuration of your session include:

- Add handlers for the events you need to watch. This most likely includes the `end` at a minimum, so you can detect when the session is over.
- If you use XR input controllers, watch the `inputsourceschange` event to detect the addition or removal of XR input controllers, and the various select and squeeze action events.
- You may want to watch for the `XRSystem` event `devicechange` so you can be advised when the set of available immersive devices changes.
- Obtain a WebGL context for the canvas into which you intend to render your frames by calling the `HTMLCanvasElement` method `getContext()` on the target context.
- Set up your WebGL data and models and prepare to render the scene.
- Set the WebGL context as the source for the XR system by creating an `XRWebGLLayer` and passing set the value of the session's `renderState` property `baseLayer`.
- Perform calculations for the initial position and scale of your objects as needed.
- Begin the frame rendering cycle.

In basic form, code to do this final setup might look something like this:

```js
async function runSession(session) {
  session.addEventListener("end", onSessionEnd);

  const canvas = document.querySelector("canvas");
  const gl = canvas.getContext("webgl", { xrCompatible: true });

  // Set up WebGL data and such

  const worldData = loadGLPrograms(session, "world-data.xml");
  if (!worldData) {
    return null;
  }

  // Finish configuring WebGL

  worldData.session.updateRenderState({
    baseLayer: new XRWebGLLayer(worldData.session, gl),
  });

  // Start rendering the scene

  referenceSpace = await worldData.session.requestReferenceSpace("unbounded");
  worldData.referenceSpace = referenceSpace.getOffsetReferenceSpace(
    new XRRigidTransform(
      worldData.playerSpawnPosition,
      worldData.playerSpawnOrientation,
    ),
  );
  worldData.animationFrameRequestID =
    worldData.session.requestAnimationFrame(onDrawFrame);

  return worldData;
}
```

For the purposes of this example, an object named `worldData` gets created to encapsulate data about the world and rendering environment. This includes the `XRSession` itself, all of the data used to render the scene in WebGL, the world reference space, and the ID returned by `requestAnimationFrame()`.

First, a handler for the `end` event is set up. Then the rendering canvas is obtained and a reference to its WebGL context is retrieved, specifying the `xrCompatible` option when calling `getContext()`.

Next, any data and setup needed for the WebGL renderer is performed before then configuring WebGL to use the framebuffer of the WebGL context as its own framebuffer. This is done using the `XRSession` method `updateRenderState()` to set the render state's `baseLayer` to a newly-created `XRWebGLLayer` encapsulating the WebGL context.

### Preparing to render the scene

At this point, the `XRSession` itself has been fully configured, so we can begin rendering. First, we need a reference space within which coordinates for the world will be stated. We can get the initial reference space for the session by calling the `XRSession`'s `requestReferenceSpace()` method. We specify when calling `requestReferenceSpace()` the name of the type of reference space we want; in this case, `unbounded`. You might just as easily specify `local` or `viewer`, depending on your needs.

> **Note:**
> To understand how to select the right reference space for your needs, see Selecting the reference space type.

The reference space returned by `requestReferenceSpace()` places the origin (0, 0, 0) in the center of the space. This is great—if your player's viewpoint starts in the exact center of the world. But most likely, that's not the case at all. If that's so, you call `getOffsetReferenceSpace()` on the initial reference space to create a _new_ reference space which offsets the coordinate system so that (0, 0, 0) is located at the position of the viewer, with the orientation likewise shifted to face in the desired direction. The input value into `getOffsetReferenceSpace()` is an `XRRigidTransform` encapsulating the player's position and orientation as specified in the default world coordinates.

With the new reference space in hand and stored into the `worldData` object for safe-keeping, we call the session's `requestAnimationFrame()` method to schedule a callback to be executed when it's time to render the next frame of animation for the WebXR session. The returned value is an ID we can use later to cancel the request if need be, so we save that into `worldData` as well.

In the end, the `worldData` object is returned to the caller to allow the main code to reference the data it needs later. At this point, the setup process is complete and we've entered the rendering stage of our application. To learn more about rendering, see the article Rendering and the WebXR frame animation callback.

### On operational details

Obviously, this was a just an example. You don't need a `worldData` object to store everything; you can store the information you need to maintain any way you want to. You may need different information or have different specific requirements that cause you to do things differently, or in a different order.

Similarly, the specific methodology you use for loading models and other information and setting up your WebGL data—textures, vertex buffers, shaders, and so on—will vary a great deal depending on your needs, what if any frameworks you're using, and the like.

## Important session maintenance events

Over the course of your WebXR session, you may receive any of a number of events which indicate changes to the state of the session, or which let you know about things you need to do to keep the session operating properly.

### Detecting changes to session's visibility state

When the state of the `XRSession`'s visibility changes—such as when the session is hidden or displayed, or when the user has focused another context—the session receives a `visibilitychange` event.

```js
session.onvisibilitychange = (event) => {
  switch (event.session.visibilityState) {
    case "hidden":
      myFrameRate = 10;
      break;
    case "blurred-visible":
      myFrameRate = 30;
      break;
    case "visible":
    default:
      myFrameRate = 60;
      break;
  }
};
```

This example changes a variable `myFrameRate` depending on the visibility state as it changes. Presumably the renderer uses this value to compute how often to render new frames as the animation loop progresses, thus rendering less frequently the more "blurred" the scene becomes.

### Detecting reference space resets

Occasionally, discontinuities or jumps in the native origin may occur while tracking the user's position in the world. The most common scenarios in which this happens are when the user requests a recalibration of their XR device or when a hiccup or glitch occurs in the flow of tracking data received from the XR hardware. These situations cause the native origin to jump abruptly by the distance and directional angle necessary to bring the native origin back into alignment with the user's position and facing direction.

When this happens, a `reset` event is sent to the session's `XRReferenceSpace`. The event's `transform` property is an `XRRigidTransform` detailing the transform needed to realign the native origin.

> **Note:**
> The `reset` event is fired at the `XRReferenceSpace`, not the `XRSession`!

Another common cause for `reset` events is when a bounded reference space (`bounded-floor`) has its geometry as specified by the `XRBoundedReferenceSpace`'s property `boundsGeometry` change.

For more common causes of reference space resets and more details and sample code, see the documentation for the `reset` event.

### Detecting when the available set of WebXR input controls changes

WebXR maintains a list of input controls which is specific to the WebXR system. These devices include things such as the handheld controllers, motion-sensing cameras, motion-sensitive gloves and other feedback devices. When the user connects or disconnects a WebXR controller device, the `inputsourceschange` event is dispatched to the `XRSession`. This is an opportunity to notify the user of the device's availability, begin to monitor it for inputs, offer configuration options, or whatever you need to do with it.

## Ending the WebXR session

When the user's VR or AR session draws to a close, the session ends. The shutdown of an `XRSession` can happen either due to the session itself deciding it's time to shut down (such as if the user turns off their XR device), because the user has clicked a button to end the session, or some other situation as appropriate for your application.

Here we discuss both how to request a shutdown of the WebXR session and how to detect when the session has ended, whether by your request or otherwise.

### Shutting down the session

To cleanly shut down the WebXR session when you're done with it, you should call the session's `end()` method. This returns a promise you can use to know when the shutdown is complete.

```js
async function shutdownXR(session) {
  if (session) {
    await session.end();

    /* At this point, WebXR is fully shut down */
  }
}
```

When `shutdownXR()` returns to its caller, the WebXR session is fully and safely shut down.

If you have work that must be done when the session ends, such as releasing resources and the like, you should do that work in your `end` event handler rather than in your main code body. That way, you handle the cleanup regardless of whether the shutdown was automatically or manually triggered.

### Detecting when the session has ended

As previously established, you can detect when the WebXR session has ended—whether because you've called its `end()` method, the user turned off their headset, or some sort of irresolvable error occurred in the XR system—by watching for the `end` event to be sent to the `XRSession`.

```js
session.onend = (event) => {
  /* the session has shut down */

  freeResources();
};
```

Here, when the session has ended and the `end` event is received, a `freeResources()` function is called to release the resources previously allocated and/or loaded to handle the XR presentation. By calling `freeResources()` in the `end` event handler, we call it both when the user clicks a button that triggers a shutdown such as by calling the `shutdownXR()` function shown above _and_ when the session ends automatically, whether due to an error or some other reason.

## See also

- WebXR Device API
- Fundamentals of WebXR
- Spatial tracking in WebXR
- Viewpoints and viewers: Simulating cameras in WebXR
- Using bounded reference spaces
- Inputs and input sources
