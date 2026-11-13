---
title: "Spaces and reference spaces: Spatial tracking in WebXR (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/spatial_tracking/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Spaces and reference spaces: Spatial tracking in WebXR

The WebXR APIs used for implementing augmented and virtual reality is designed specifically to provide the ability to insert a human into a virtual environment. To accomplish this, software needs the ability to not only track the locations, orientation, and movements of objects in the virtual world, but the user's location, orientation, and movement as well. But WebXR goes beyond that by adding the ability to track the location, orientation, and motion of the input devices which generate data used to determine the position and movement of individual parts of the viewer's body (with appropriate equipment).

The location and movement of the user's headset represent their head's position and orientation in the virtual environment. Hand controllers represent their hands in the same manner. Other hardware elements can be used similarly to represent other parts of the body, providing additional data to use when simulating the user's actions in their environment.

In this guide, we'll explore how WebXR uses **spaces** and, more specifically, **reference spaces**, to track the positions, orientations, and movements of objects and of the user's body in the virtual world.

> **Note:**
> This article presumes that you are familiar with the concepts introduced in Geometry and reference spaces in WebXR: that is, the basics of 3D coordinate systems, as well as WebXR spaces, reference spaces, and how reference spaces are used to create local coordinate systems for individual objects or movable components within a scene.

## Representing a position using a reference space

As covered in Defining spatial relationships with reference spaces, reference spaces establish a local coordinate system which is offset from another coordinate system that is itself defined by some other space. Thus, a reference space can be used to define the position and orientation of a point and by extension the entire object for which that point is the origin. While this is a little heavy-handed to be used for every single object in a scene, it can be very useful for a few specific objects to have their own coordinate system in this manner.

- **The world space**; the origin of this space is the origin of the WebGL coordinate system underlying the entire 3D canvas.
- The player, avatar, or camera; the origin of this space is used as the camera position for rendering the scene to be displayed to the user.
- The hand and/or hand controller; each of these represents one of the user's hands, either in the form of the hand itself or a controller (or both). The origin is generally the center of the user's fisted hand.
- **The target ray**; each controller or other handheld device may have a targeting ray associated with it, which is represented by a space whose origin is at the point on the controller at which the ray is emitted, and is oriented so that -Z extends in the direction of the target it's pointing at.

Because each of these is defined using a reference space as its foundation, the WebXR Device API can easily be used to convert among the coordinate systems, perform operations affecting these spaces and their corresponding objects, and so forth.

## Describing a position relative to a space

There are two scenarios in which you may need to describe a position and/or orientation relative to a space. The first is described above: applying a reference space to an offset (or vice versa, since the result is the same) to determine the transform matrix that represents the resulting location in the space's coordinate system.

### Poses

Once your reference space or spaces are established for the various key <example-value> in the scene, you will have times when you need to describe another position relative to the origin of a particular reference space. This is done using poses. A pose, put, describes a position and orientation relative to the origin of the reference space from which it was created.

In WebXR, a pose is represented by an `XRPose` object, whose `transform` property is an `XRRigidTransform` defining the transform matrix that, applied to any coordinate, vector, or matrix in the original space, converts it to the target space. Thus a pose can be used to not only convert and determine positions, but also rotational information.

There is only one way to create an `XRPose`, and that's using the `getPose()` method on an animation frame as given using an `XRFrame` object. This means that most frequently, you'll be using poses within your frame rendering code, which is executed as a callback from the `XRFrame` method `requestAnimationFrame()`.

`getPose()` computes the position of an `XRReferenceSpace` relative to the origin of a specified `XRSpace` and then creates a pose representing the resulting position and orientation.

For example, if you wish to draw a hand controller's representation using the controller's `gripSpace`, you can get the pose needed like this:

```js
let controlPose = frame.getPose(inputSource.gripSpace, worldRefSpace);
```

This converts the position and orientation of the input's grip space to use the world's coordinate system, then generates the corresponding `XRPose`, storing it in `controlPose`. You can then apply `controlPose`'s `transform` to the vertices in the object model representing the controller to calculate the WebGL coordinates to use when rendering the controller's representation to the framebuffer.

### Viewer poses

A specialized type of pose, the **viewer pose**, is the pose that represents the perspective of the viewer of the scene. A viewer pose is represented by WebXR's `XRViewerPose` interface. When rendering a frame, you'll use the viewer pose to determine the position and facing direction of the viewer in order to place the virtual camera and render the scene.

The only way to obtain a pose that adapts positional information from one space to another is through the `XRFrame` object received by your frame rendering callback function specified when you called the `XRSession` method `requestAnimationFrame()`.

For example, given an `XRSession` whose reference space is `worldRefSpace`, the following line of code would request the first frame of animation to be scheduled:

```js
animationFrameRequestID = xrSession.requestAnimationFrame(myDrawFrame);
```

Then, the `myDrawFrame()` function—the callback executed when it's time to draw the frame—might be something like this:

```js
function myDrawFrame(currentFrameTime, frame) {
  let session = frame.session;
  let viewerPose = frame.getViewerPose(viewerRefSpace);

  animationFrameRequestID = session.requestAnimationFrame(myDrawFrame);

  if (viewerPose) {
    // render the frame
  }
}
```

The `frame` parameter is the `XRFrame` representing the animation frame information provided by WebXR. When called, this function begins by getting the `XRSession` from the frame object, then uses the frame's `getViewerPose()` method to compute the `XRViewerPose` for the viewer, given `viewerRefSpace`, which describes the current facing direction and position of the viewer.

The returned viewer pose, `viewerPose`, can in turn be used to compute positions and orientations to properly render the objects in the scene given the user's point of view.

## Offsetting or moving reference spaces

While you can't change a reference space since both `XRReferenceSpace` and `XRBoundedReferenceSpace` are read-only, you can easily create new reference spaces by applying an offset transform to them. This is done by calling the reference space's `getOffsetReferenceSpace()` method.

### Offsetting positions within a reference space

The simplest case for using `getOffsetReferenceSpace()` is to transform a point or matrix within the context of the same space. For example, to create a new reference space that moves the reference space `aRefSpace` a half meter in each direction, you can do something like this:

```js
let halfMeterTransform = new XRRigidTransform({
  x: 0.5,
  y: 0.5,
  z: 0.5,
  w: 1.0,
});
aRefSpace = aRefSpace.getOffsetReferenceSpace(halfMeterTransform);
```

This replaces the existing reference space `aRefSpace` with one whose coordinates and orientation have had the transform `halfMeterTransform` applied. With no orientation data included in the transform, the orientation of `aRefSpace` is unaffected.

### Converting between WebXR session types

Another common reason you may need to convert positional information from one reference space to another is when it's necessary to change the session type from `inline` to `immersive-vr` or back. This commonly happens when your user interface provides a way to preview the scene inline within the context of a web page, with a button or other control to switch to immersive mode.

Since most users would prefer that you maintain the same viewer position and facing direction while performing this transition, you can use the `XRFrame` method `getViewerPose()` to obtain the current `XRViewerPose`, switch the session, then use the saved viewer pose to restore the viewer's position and facing.

```js
let viewerPose = frame.getViewerPose(worldReferenceSpace);
let newSession = navigator.xr.requestSession("immersive-vr", {
  requiredFeatures: "unbounded",
});
worldReferenceSpace = await newSession.requestReferenceSpace("unbounded");
viewerPose = worldReferenceSpace.getOffsetReferenceSpace(viewerPose.transform);
```

Here, the viewer pose is obtained, with its transform defined relative to `worldReferenceSpace`, the current session's global reference space. Then a new session is established and a reference space created to become the new world reference space.

Finally, the saved `viewerPose` is converted to the new world space's coordinate system by calling the new reference system's `getOffsetReferenceSpace()` method. With this in hand, we can resume rendering the scene as usual, with the viewer's perspective unaffected.

### Converting between bounded and unbounded spaces

Sometimes when your primary experience uses an unbounded space, you may have a need to temporarily transition the user's experience to a bounded space. For instance, it may be easier to implement the interactions with the objects in a single room in a house by switching to a bounded space representing the single room. This might make it easier to do things like implement support for customizing the walls, placing furniture on the floor, and so forth.

In cases like this, where you need to begin tracking using a different reference space than the one you've been using, you can use a combination of `getViewerPose()` and some matrix computations to transition everything in your scene to be based at the new reference frame's origin.

Because `getViewerPose()` is only available in an `XRFrame`, you will need to begin this process in your rendering callback, possibly using a worker to do the computations in order to reduce frame dropping.

```js
let previousViewerPose = null;

function myDrawFrame(currentFrameTime, frame) {
  let session = frame.session;
  let viewerPose = frame.getViewerPose(viewerRefSpace);

  animationFrameRequestID = session.requestAnimationFrame(myDrawFrame);

  if (viewerPose) {
    previousViewerPose ??= viewerPose;
    let offsetMatrix = mat4.create();
    mat4.sub(
      offsetMatrix,
      previousViewerPose.transform.matrix,
      viewerPose.transform.matrix,
    );

    previousViewerPose = viewerPose;
  }
}
```
