---
title: "Rendering and the WebXR frame animation callback (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/rendering/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Rendering and the WebXR frame animation callback (part 2 of 3)

## Drawing the scene

When the time comes to prepare the framebuffer so the browser can paint the next frame of your scene, the function you provided to `requestAnimationFrame()` is invoked. It receives as input the time at which the frame being drawn and an `XRFrame` object providing details about the state of the scene for the frame you need to render.

Ideally, you want this code to be fast enough that it can maintain a 60 FPS frame rate, or as close to that as possible, remembering that there's more going on than just your code in this one function. You need to make sure that the main thread doesn't need to run for more time per frame than the duration of the frame itself.

### A basic <example-value>

In this version of the WebXR rendering callback, we use a very straightforward approach that works great for relatively simple projects. This pseudocode outlines that process:

```plain
for each view in the pose's views list:
  get the WebXR GL layer's viewport
  set the WebGL viewport to match
  for each object in the scene
    bindProgram()
    bindVertices()
    bindMatrices()
    bindUniforms()
    bindBuffers()
    bindTextures()
    drawMyObject()
```

Put, this form of renderer is using **view-first order**. Each of the two views making up the XR device's display are rendered back to back, where every object is drawn on one view before rendering the same set of objects on the other view. As a result, there's a good bit of replicated effort, since much of the data needed to draw an object winds up getting sent to the GPU twice per frame. However, it simplifies porting existing WebGL code and is frequently good enough to do the job, so we'll look at this method first.

See Optimizing by rendering in object-first order for an alternative approach that renders each object twice back-to-back, once for each eye, before moving on to the next object that makes up the scene for that frame; that is, rendering in **object-first order**.

#### Sample rendering callback

Let's take a look at some real code that follows this basic pattern. Since in the example above we gave this function the name `myDrawFrame()`, we'll continue to use that here.

```js
let lastFrameTime = 0;

function myDrawFrame(currentFrameTime, frame) {
  const session = frame.session;
  let viewerPose;

  // Schedule the next frame to be painted when the time comes.

  animationFrameRequestID = session.requestAnimationFrame(myDrawFrame);

  // Get an XRViewerPose representing the position and
  // orientation of the viewer. If successful, render the
  // frame.

  viewerPose = frame.getViewerPose(viewerRefSpace);
  if (viewerPose) {
    const glLayer = session.renderState.baseLayer;
    gl.bindFrameBuffer(gl.FRAMEBUFFER, glLayer.framebuffer);

    // Start by erasing the color and depth framebuffers.

    gl.clearColor(0, 0, 0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Compute the time elapsed since the last frame was rendered.
    // Use this value to ensure your animation runs at the exact
    // rate you intend.

    const deltaTime = currentFrameTime - lastFrameTime;
    lastFrameTime = currentFrameTime;

    // Now call the scene rendering code once for each of
    // the session's views.

    for (const view of viewerPose.views) {
      const viewport = glLayer.getViewport(view);
      gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
      myDrawSceneIntoView(view, deltaTime);
    }
  }
}
```

The `myDrawFrame()` function grabs the `XRSession` from the `XRFrame` object specified by the `frame` parameter, then calls the session's `requestAnimationFrame()` method to immediately schedule the rendering of the next frame. This ensures we get into the queue right away, allowing the rest of the time spent in this iteration of the `myDrawFrame()` function to count toward the timing of drawing the next frame.

We then get the `XRViewerPose` object that describes the viewer's pose—their position and orientation—using the frame's `getViewerPose()` method, passing in the viewer's reference space from the `viewerRefSpace` previously obtained while setting up the WebXR session.

With the viewer's pose in hand, we can then begin to render the frame. The first step is to obtain access to the framebuffer into which the WebXR device wants the frame drawn; this is done by getting the target WebGL layer from the session's `renderState` object's `baseLayer` property, then getting the `framebuffer` from that `XRWebGLLayer` object. We then call `gl.bindFrameBuffer()` to bind that framebuffer as the target for all upcoming drawing commands.

The next step is to erase the framebuffer. While you can in theory skip this step—_if and only if your rendering code is guaranteed to write every single pixel in the framebuffer_—it's generally safest to just go ahead and clear it before you begin to draw, unless you need to eke out every ounce of performance you can and know you're touching all the pixels anyway. The background color is set to fully opaque black using `gl.clearColor()`; the clear depth is set to 1.0 by calling `gl.clearDepth()`, in order to clear all pixels regardless of how far away the object they're part of is; and finally, the frame's pixel and depth buffers are both erased by calling `gl.clear()`, passing in a bit mask in which both `COLOR_BUFFER_BIT` and `DEPTH_BUFFER_BIT` are set.

Since WebXR uses a single framebuffer for every view, with viewports upon the view being used to separate each eye's viewpoint within the framebuffer, we only need to clear a single framebuffer rather than cleaning it for each eye (or other viewpoints, if any) individually.

Next, the time elapsed since the previous frame was rendered is calculated by subtracting from the current time as specified by the `currentFrameTime` parameter the saved time at which the last frame was rendered, `lastFrameTime`. The result is a `DOMHighResTimeStamp` value indicating the number of milliseconds that have elapsed since the last frame was rendered. We can use this value while drawing the scene to ensure we move everything the appropriate distance given the true elapsed time, rather than assuming that the callback will be fired at a consistent frame rate. This elapsed time is saved in the variable `deltaTime`, and the value of `lastFrameTime` is replaced with this frame's time, ready to compute the differential for the next frame.

It's now time to actually render the scene for each eye. We iterate over the views within the viewer poses's `views` array. For each of these `XRView` objects representing an eye's perspective on the scene, we need to begin by limiting drawing to the area of the framebuffer which represents the current eye's visible image.

We begin by preparing WebGL to render the eye's contents by getting the viewport that restricts drawing to the area within the framebuffer that's reserved for the current eye's image by calling the `XRWebGLLayer` method `getViewport()`. We then set the WebGL viewport to match, passing in the X and Y origin of the viewport along with its width and height into `gl.viewport()`.

Finally, we call our method `myDrawSceneIntoView()` to actually use WebGL to render the scene. Into this, we pass the `XRView` representing the eye we're drawing for (in order to perform perspective mapping and the like) and `deltaTime`, so the scene drawing code can accurately represent the elapsed time when determining the positions of objects moving over time.

When the loop that's iterating over the views ends, every image required to represent the scene to the viewer has been rendered, and upon return, the framebuffer makes its way through the GPU and eventually to the XR device's display or displays. Since we called `requestAnimationFrame()` at the top of the function, our callback will be invoked once again when it's time to render the next frame of the scene's animation.

#### Drawbacks to this approach

Since it's important to minimize how much time you spend in this function as much as possible, the more time you spend handling state changes, the less time you have to actually draw things. This technique works very well for a small number of objects, but because it has to re-bind all the data for each object twice (once for the left eye, and once for the right), you're spending a lot of time adjusting the state, uploading buffers and textures, and so forth. In the next section, we look at an altered approach that reduces these state changes substantially, providing a potentially much faster rendering approach, especially as your object count goes up.

### Optimizing by rendering in object-first order

An advantage of WebXR's approach of using a single WebGL framebuffer to contain both the left and right eye's views in a single framebuffer makes it possible to substantially improve rendering performance by rearranging the order in which things are done. Instead of setting up the viewport for a given view (such as the left eye), then rendering every object visible to the left eye, one by one, reconfiguring buffers for each object as you go, you can instead render each object twice in a row, once for each eye, thereby only needing to set up the buffers, uniforms, and so forth once for both eyes.

The resulting pseudocode looks like this:

```plain
for each object in the scene
  bindProgram()
  bindUniforms()
  bindBuffers()
  bindTextures()
  for each view in the pose's views list
    get the XRWebGLLayer's viewport
    set the WebGL viewport to match
    bindVertices()
    bindMatrices()
    drawMyObject()
```

By changing things up in this way, we only bind programs, uniforms, buffers, textures, and potentially other things once per frame instead of twice for each object found in the scene. This reduces overhead by a potentially very large margin.

### Limiting the frame rate

If you need to intentionally cap your frame rate in order to establish a baseline frame rate to try to maintain while allowing more time for other code to run, you can do so by skipping frames intentionally, on a timed basis.

For example, to reduce the frame rate by 50%, just skip every other frame:

```js
let tick = 0;

function drawFrame(time, frame) {
  animationFrameRequestID = frame.session.requestAnimationFrame(drawFrame);

  if (!(tick % 2)) {
    /* Draw the scene */
  }
  tick++;
}
```

This version of the rendering callback maintains a `tick` counter. The frame is only rendered if `tick` is an even number value. This way, only every other frame gets rendered.

You can similarly render every fourth frame using `!(tick % 4)`, and so forth.

### Matching your animation to the elapsed time

The rendering callback receives a `time` parameter for a good reason. This `DOMHighResTimeStamp` value is a floating-point value indicating the time at which the frame was scheduled for rendering. Because the execution of your callback is not going to happen at precise 1/60th of a second intervals—and, indeed, could happen at other rates if the user's display has a different frame rate—you can't rely on the simple fact that your code is running to assume that it's been 1/60th of a second since the last frame.

For that reason, you need to use the timestamp provided to ensure your animation renders at precisely the desired speed. To do so, the first thing you need to do is to compute the time that has elapsed since the last frame was rendered:

```js
let lastFrameTime = 0;

function drawFrame(time, frame) {
  // schedule next frame, prepare the buffer, etc.

  const deltaTime = (time - lastFrameTime) * 0.001;
  lastFrameTime = time;

  for (const view of pose.views) {
    /* render each view */
  }
}
```

This maintains a global (or an object property) called `lastFrameTime` which contains the previous frame's time of rendering. In this case, since the time values are stored in milliseconds, we multiply by 0.001 to convert the time into seconds. In some cases, this saves time later. In other situations, you need the time in milliseconds, so you wouldn't need to change anything.

With the elapsed time in hand, your rendering code has the means to compute just how much every moving object has moved in the time elapsed. For instance, if an object is rotating, you might apply the rotation like this:

```js
const xDeltaRotation =
  xRotationDegreesPerSecond * RADIANS_PER_DEGREE * deltaTime;
const yDeltaRotation =
  yRotationDegreesPerSecond * RADIANS_PER_DEGREE * deltaTime;
const zDeltaRotation =
  zRotationDegreesPerSecond * RADIANS_PER_DEGREE * deltaTime;
```

This computes the amount by which the object has rotated around each of the three axes since the last time the frame was drawn. Without this, the shape would rotate by the given amount every frame, regardless of the elapsed time. This could cause substantial stutter in many cases.

The same concept applied for objects that are moving rather than rotating:

```js
const xDistanceMoved = xSpeedPerSecond * deltaTime;
const yDistanceMoved = ySpeedPerSecond * deltaTime;
const ZDistanceMoved = zSpeedPerSecond * deltaTime;
```

`xSpeedPerSecond`, `ySpeedPerSecond`, and `zSpeedPerSecond` each contain that axis's component of the object's velocity. In other words, `[xDistanceMoved, yDistanceMoved, zDistanceMoved]` is a vector representing the velocity of the object.
