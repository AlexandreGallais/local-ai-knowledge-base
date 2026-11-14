---
title: "Viewpoints and viewers: Simulating cameras in WebXR (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/cameras/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Viewpoints and viewers: Simulating cameras in WebXR (part 3 of 3)

### Pedestaling (Moving up or down)

A **pedestal** shot is one involving keeping the camera fixed horizontally relative to the floor, but moved straight up or down. Picture the camera on a pedestal (or pole) that gets taller or shorter. This is useful when tracking a subject that's getting taller or shorter, or is standing up or sitting down from a chair, or moving straight up and down.

This is similar to a **crane** shot, which involves moving a camera attached to a crane up and down. To perform a pedestal or crane motion, translate the view along the Y axis in the opposite direction from the direction you want to move the camera:

```js
mat4.translate(viewMatrix, viewMatrix, [0, -pedestalDistance, 0]);
```

By negating the value of `pedestalDistance`, we compensate for the fact that we're actually moving the world rather than the camera. So positive values of `pedestalDistance` will move the camera up, while negative values will move it down.

### Canting (Rolling left and right)

**Cant** (or **roll**) is a rotation of the camera around its roll axis; that is, the camera remains fixed in space, and remains pointed at the same location, but rotates around so that the top of the camera is pointed in a different direction.

You can visualize this by holding your arm out in front of you with your hand open, palm down. Imagine that your hand is the camera and the back of your hand represents the top of the camera. Now rotate your hand so that the "camera" is upside-down. You have just canted your hand around the roll axis. In cinematography, cant can be used to simulate various types of unsteady motion such as waves or turbulence, but can also be used for dramatic effect.

To accomplish this rotation around the Z axis using glMatrix:

```js
mat4.rotateZ(viewMatrix, viewMatrix, cantAngle);
```

## Combining movements

You can perform multiple movements at once, such as zooming while panning, or tilting and canting at the same time.

### Translating along multiple axes

Translating along multiple axes is quite easy. Previously, we performed our translations like this:

```js
mat4.translate(viewMatrix, viewMatrix, [-truckDistance, 0, 0]);
mat4.translate(viewMatrix, viewMatrix, [0, -pedestalDistance, 0]);
mat4.translate(viewMatrix, viewMatrix, [0, 0, dollyDistance]);
```

The solution here is obvious. SInce the translation is expressed as a vector providing the distance to move along each axis, we can combine them like this:

```js
mat4.translate(viewMatrix, viewMatrix, [
  -truckDistance,
  -pedestalDistance,
  dollyDistance,
]);
```

This will shift the origin of the matrix `viewMatrix` by the specified amount along each axis.

### Rotating around multiple axes

You can also combine rotations around multiple axes into a single rotation around a quaternion representing a shared axis for the rotations. To perform the rotations separately, you use Euler angles (separate angles around each axis) to apply pitch, yaw, and roll like this:

```js
mat4.rotateX(viewMatrix, viewMatrix, pitchAngle);
mat4.rotateY(viewMatrix, viewMatrix, yawAngle);
mat4.rotateZ(viewMatrix, viewMatrix, rollAngle);
```

You can instead construct a quaternion representing a combined rotation axis from the Euler angles, then rotate the matrix using multiplication, like this:

```js
const axisQuat = quat.create();
const rotateMatrix = mat4.create();
quat.fromEuler(axisQuat, pitchAngle, yawAngle, rollAngle);
mat4.fromQuat(rotateMatrix, axisQuat);
mat4.multiply(viewMatrix, viewMatrix, rotateMatrix);
```

This converts the Euler angles for pitch, yaw, and roll into a quaternion representing all three rotations. This is then converted into a rotation transform matrix; then, finally, the view matrix is multiplied by the rotation transform to complete the rotations.

## Representing 3D with WebXR

WebXR takes 3D graphics a step further, allowing them to be presented using special visual hardware such as goggles or a headset to create 3D graphics that appear to actually exist in three dimensions, potentially within the context of the real world (in the case of augmented reality).

In order to perceive depth, it's necessary to have two perspectives on the scene. By comparing the two views, it's possible to recognize the depth of objects and, by extension, the distance between the viewer and objects which are seen. This is why we have two eyes, spaced slightly apart. You can remind yourself of this fact by closing one eye at a time, switching back and forth between the two eyes. Notice how your left eye can see the left side of your nose but not the right, while your right eye sees the right side of your nose but not the left. That's just one of many differences that exist between what each of your eyes see.

Our brain receives two sets of data about light levels and wavelengths throughout our field of view—one from each eye. The brain uses this data to construct the scene in our minds, using the slight differences between the two perspectives to figure out depth and distance.

### Rendering the scene

An XR—shorthand that encompasses both virtual reality (VR) and augmented reality (AR)—headset presents 3D imagery to us by drawing two views of the scene, slightly offset from one another just like the views obtained by our two eyes. These views are then separately fed to each eye, in order to allow them to collect the data our brain needs in order to construct a 3D image in our minds.

To do this, WebXR asks your renderer to draw the scene twice for each frame of video—once for each eye. The two views are rendered into the same framebuffer, one on the left and one on the right. The XR device then uses screens and lenses to present the left half of the produced image to our left eye and the right half to our right eye.

For example, consider a device which uses a 2560x1440 pixel frame buffer. Dividing this into two parts—half for each eye—results in each eye's view being drawn at a resolution of 1280x1440 pixels. Here's what that looks like conceptually:

Your code tells the WebXR engine that you want to provide the next animation frame by calling the `XRSession` method `requestAnimationFrame()`, providing a callback function that renders a frame of animation. When the browser needs you to render the scene, it invokes the callback, providing as input parameters the current time and an `XRFrame` encapsulating the data needed to render the correct frame.

This information includes the `XRViewerPose` describing the position and facing direction of the viewer within the scene as well as a list of `XRView` objects, each representing one perspective on the scene. In current WebXR implementations, there will never be more than two entries in this list: one describing the position and viewing angle of the left eye and another doing the same for the right. You can tell which eye a given `XRView` represents by checking the value of its `eye` property, which is a string whose value is `left` or `right` (a third possible value, `none`, theoretically may be used to represent another point of view, but support for this is not entirely available in the current API).

### Example frame callback

A fairly basic (but typical) callback for rendering frames might look like this:

```js
function myAnimationFrameCallback(time, frame) {
  const adjustedRefSpace = applyPositionOffsets(xrReferenceSpace);
  const pose = frame.getViewerPose(adjustedRefSpace);

  animationFrameRequestID = frame.session.requestAnimationFrame(
    myAnimationFrameCallback,
  );

  if (pose) {
    const glLayer = frame.session.renderState.baseLayer;
    gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer);
    CheckGLError("Binding the framebuffer");

    gl.clearColor(0, 0, 0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    CheckGLError("Clearing the framebuffer");

    const deltaTime = (time - lastFrameTime) * 0.001;
    lastFrameTime = time;

    for (const view of pose.views) {
      const viewport = glLayer.getViewport(view);
      gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
      CheckGLError(`Setting viewport for eye: ${view.eye}`);

      myRenderScene(gl, view, sceneData, deltaTime);
    }
  }
}
```

The callback begins by calling a custom function, `applyPositionOffsets()`, which takes a reference space and applies to its transform matrix any changes that need to be made to take into account things such as user inputs from devices not controlled by WebXR, such as the keyboard and mouse. The adjusted `XRReferenceSpace` returned by this function is then passed into the `XRFrame` method `getViewerPose()` to get the `XRViewerPose` representing the viewer's position and viewing angle.

Next, we go ahead and queue up the request to render the next frame of video, so we don't have to worry about doing it later, by calling `requestAnimationFrame()` again.

Now it's time to render the scene. If we did successfully obtain a pose, we get the `XRWebGLLayer` we need to use for rendering from the session's `renderState` object's `baseLayer` property. We bind this to WebGL's `gl.FRAMEBUFFER` target using the `WebGLRenderingContext` method `gl.bindFrameBuffer()`.

Then we clear the framebuffer to ensure we're starting with a known state, since our renderer will not be touching every pixel. We set the clear color to opaque black using `gl.clearColor()` and the value to clear the depth buffer to 1.0 by calling the `WebGLRenderingContext` method `gl.clearDepth()`. Then we call the `WebGLRenderingContext` method `gl.clear()`, which clears the framebuffer (since we include `gl.COLOR_BUFFER_BIT` in the mask parameter) and the depth buffer (because we include `gl.DEPTH_BUFFER_BIT`).

Then we determine how much time has elapsed since the previous frame was rendered by comparing the frame's desired render time with the time at which the last frame was drawn. Since this value is in milliseconds, we convert it to seconds by multiplying by 0.001 (or dividing by 1000).

Now we loop over the pose's views, as found in the `XRViewerPose` array, `views`. For each view, we ask the `XRWebGLLayer` for the appropriate viewport to use, configure the WebGL viewport to match by passing the position and size information into `gl.viewport()`. This constrains rendering so that we can only draw into the portion of the framebuffer that represents the image seen by the eye identified by `view.eye`.

With the constraints so established and everything else we need ready, we call a custom function, `myRenderScene()`, to actually perform the computations and WebGL rendering to render the frame. In this case, we're passing in the WebGL context, `gl`, the `XRView` `view`, a `sceneData` object (which contains things like the vertex and fragment shaders, vertex lists, textures, and so forth), and `deltaTime`, which indicates how much time has passed since the previous frame, so that we know how far to advance the animation.

When this function returns, the WebGL framebuffer being used by WebXR now has in it two copies of the scene, each occupying half the frame: one for the left eye, and one for the right eye. This makes its way through the XR software and drivers into the headset, where each half is shown to the appropriate eye.

## See also

- Geometry and reference spaces
- WebGL model view projection
- Matrix math for the web
- Movement, orientation, and motion: A WebXR example
