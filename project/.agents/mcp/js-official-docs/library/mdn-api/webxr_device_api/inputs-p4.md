---
title: "Inputs and input sources (part 4 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/inputs/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Inputs and input sources (part 4 of 4)

## Facing and targeting

**Facing** is the direction in which the viewer is looking. This isn't provided using an input source. Instead, it's obtained using the `XRPose` obtained from the current animation frame's `XRFrame.getViewerPose()` method. The rotation component of the viewer pose's transform matrix is the viewer's facing direction.

You can learn more about how to use this the viewer pose to determine the facing direction in the article Viewpoints and viewers.

**Targeting** is the act of the user pointing in a particular direction using an input source. The input source's `targetRaySpace` is an `XRSpace` (and actually probably an `XRReferenceSpace`) which can be used to determine the orientation of the target ray relative to the viewer's facing direction.

This may or may not involve actually pointing at a particular object within the 3D world; you have to determine this yourself using hit testing—that is, checking to see if the target ray intersects with any objects in your scene.

### Targeting and the targeting ray

The targeting ray, which is a ray whose origin is located at the origin of the targeting ray space and points in the direction that the user is pointing the controller device. The targeting ray is defined using an `XRSpace` whose origin is located at the targeting ray's source (typically the outward-facing end of the controller or its representation in the 3D world), and whose orientation has -Z extending outward from the controller in the same direction as the `XRInputSource`'s `gripSpace`.

This space is found in the input source's `targetRaySpace` property. It can be used to determine the direction the controller is pointing and to determine the origin and orientation of the target ray. That can be accomplished by doing something like the following example, which implements a `select` event handler that needs this information. As usual, this code is assuming the use of glMatrix to perform the matrix and vector math:

```js
xrSession.addEventListener("select", (event) => {
  const targetRaySpace = event.inputSource.targetRaySpace;

  let targetRayPose = event.frame.getPose(targetRaySpace, viewerRefSpace);
  if (!targetRayPose) {
    return;
  }

  let targetRayTransform = targetRayPose.transform;
  let targetObject = findTargetObject(targetRayTransform);

  if (targetObject) {
    /* do stuff with the targeted object */
  }
});
```

This obtains the origin of the targeting ray in the vector `targetSourcePoint` and the ray's orientation in the quaternion `targetDirection`. With either the

This starts by fetching the target ray's space into the local constant `targetRaySpace`. This is in turn used when calling the `XRFrame` method `getPose()` to create an `XRPose` object representing the position and orientation of the target ray in the viewer's reference space, `viewerRefSpace`. If this is `null`, the event handler returns without doing anything further.

The target ray's transform is obtained from the pose's `transform` property and stored in the local `targetRayTransform`. This is in turn used (in this case through a function called `findTargetObject()`) to find the first object the ray intersects with. If the targeting ray does intersect with an object in the scene, we can do whatever we need to with it.

If you need to peel out the actual position of the target ray's origin and the ray's directionality, you can do so like this:

```js
const targetRayOrigin = vec3.create();
const targetRayDirection = quat.create();
mat4.getTranslation(targetRayOrigin, viewerRefSpace);
mat4.getRotation(targetRayDirection, viewerRefSpace);
```

To determine what object is targeted, follow the targeting ray until it intersects an object. This process is called **hit testing** or **collision detection**. The approach you take to hit testing depends very much on the specific needs of your app. The first question is: are you detecting collisions with virtual objects or terrain, real-world objects or terrain, or both?

In any case, to identify the targeted object, you need to determine if the ray specified by the `XRInputSource` property `targetRaySpace` intersects any objects in the scene, whether they're virtual or real-world.

See Targeting and hit detection for a more detailed look at what's involved.

### Presenting hand-held objects

An input source's `gripSpace` property identifies an `XRSpace` describing the origin and orientation to use when rendering an object so that it appears to be held in the same hand as its input source. This space is intended to be used when drawing a model of the handheld WebXR input controller represented by the object `XRInputSource`, but can just as well be used to draw any object, such as a ball, a tool, or a weapon. We covered the grip space above, but let's see how it can be used to draw objects representative of the hand or in the hand.

Since the origin of the grip space is located at the center of the hand's grip, you can use it as a starting point for rendering your object. Apply any needed offset transform to shift the origin to the start point for rendering your object as you apply any rotation needed to orient your model correctly to align with the grip space's orientation.

## Advanced controllers using the gamepad object

An `XRInputSource` has a `gamepad` property whose value, if not `null`, is a `Gamepad` object which provides access to gamepad-style buttons, axis controllers (such as joysticks or thumbpads), and so forth. This may include the same buttons that trigger the standard `XRInputSource` actions, but may include any number of additional buttons and controls.

> **Note:**
> While `Gamepad` is defined by the Gamepad API, it is not managed by the Gamepad API, so you must not attempt to use any Gamepad API methods with it. The object type is reused as a convenience.

If the value of `gamepad` is `null`, the input source doesn't define any controls using the `Gamepad` record, either because it doesn't support it or because it doesn't have any added controls on it.

This `gamepad` object is not only used to obtain access to specialty buttons, trackpads, and so forth, but also provides a way to more directly access and monitor the controls that serve as the primary select and squeeze inputs, since these are included in its `buttons` list.

Because this use of the `Gamepad` interface is a convenience rather than a true application of the Gamepad API, there are several differences between how it's used with WebXR and how it's used in Gamepad API applications. The most notable—but not the only—difference is that WebXR adds the `xr-standard` gamepad mapping, see the `XRInputSource.gamepad` property for additional differences. This gamepad mapping defines how the controls on a typical one-hand handheld VR controller are mapped to gamepad controls.

## Incorporating input from non-WebXR sources

Sometimes, you need to have a way to let the user provide input using controllers which are external to WebXR. Most commonly, these inputs are from keyboards and mice, but you could also use non-XR gamepad devices, network inputs, or other sources of data to simulate user controls. While WebXR offers no support for directly interfacing these input devices with the XR scene, you can collect the input data yourself and apply it yourself.

Assuming inputs are used to control an avatar within the simulation, which is the most common use case, WebXR inputs are used to affect the avatar in the following ways, using data collected from the non-XR input device:

- Position
    The avatar's position is changed by applying a delta to the previously known position, then replacing the avatar's reference space with a new one whose transform reflects the new position.
- Orientation
    The avatar's orientation or facing direction is changed by applying a delta to its rotation around the three axes, updating its orientation vector, then recomputing its reference space.
- Action
    The avatar performs an action, such as using an object or weapon, jumping, or any other activity not related to basic <example-value> and rotation.

Some inputs are instead used to control the application rather than the avatar. For example, a button might open an options menu used to configure the application. While that menu is open, inputs that would otherwise control the avatar might be instead applied to controlling the menu's interface.

### Using keyboard and mouse events

Capturing input from the keyboard and mouse is done just like it is in any web application. Set up handlers for the events that you need to handle in order to obtain the inputs you want. It's what you do with those inputs that's interesting.

Imagine an `avatar` object which we'll use to track information about the avatar and its worldview. We want the player to be able to use the `W`, `A`, `S`, and `D` keys to move forward, left, backward, and right. Because we are managing the avatar's position as defined by the keyboard and mouse in addition to anything the XR hardware might be doing, we need to maintain that information separately and apply it as a transform before rendering the avatar (or the world from the avatar's point of view).

To accomplish that, we include in the `avatar` object a `posDelta` property, of type `DOMPoint`, which includes the offsets to apply to all three axes in order to adjust the avatar's position (the viewer pose's reference space's origin) to include movement and rotation from the keyboard and mouse.

The corresponding code for keyboard input might look something like this:

```js
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "a":
    case "A":
      avatar.posDelta.x -= ACCEL_X;
      break;
    case "d":
    case "D":
      avatar.posDelta.x += ACCEL_X;
      break;
    case "w":
    case "W":
      avatar.posDelta.y += ACCEL_Y;
      break;
    case "s":
    case "S":
      avatar.posDelta.y -= ACCEL_Y;
      break;
    default:
      break;
  }
});
```

This is a simple example, where acceleration is constant and not particularly realistic. You can enhance this greatly by applying some knowledge of physics to have the acceleration change over time based on how long the key is held down and other factors.

### Applying inputs to the scene

Now that we have the deltas that need to be applied to the position and orientation—in our example, in the `posDelta` and `orientDelta` properties of our `avatar` object—we can write code to apply those changes. Since we're already rendering the scene on a schedule, we can just add the code to apply these changes there, along with preparing and drawing the scene.

```js
function drawFrame(time, frame) {
  applyExternalInputs(avatar);
  let pose = frame.getViewerPose(avatar.referenceSpace);

  animationFrameRequest = session.requestAnimationFrame(drawFrame);

  /* draw the frame here */
}
```

The `drawFrame()` function shown here is the callback invoked when it's time to draw the frame, as established by calling the `XRSession` method `requestAnimationFrame()`. It calls a function `applyExternalInputs()` which we'll define momentarily; it takes the `avatar` object and uses its information to update the avatar's reference frame.

After that, everything proceeds as usual, getting the viewer's pose from the updated reference frame, requesting the next frame callback through `requestAnimationFrame()`, and then continuing to set up WebGL and draw the scene. The drawing and other related code can be found in the example Movement, orientation, and motion.

The `applyExternalInputs()` method takes the `avatar` object replaces its `referenceSpace` property with a new reference space that incorporates the updated deltas.

```js
function applyExternalInputs(avatar) {
  if (!avatar.posDelta.x && !avatar.posDelta.y && !avatar.posDelta.z) {
    return; // Player hasn't moved with keyboard
  }

  let newTransform = new XRRigidTransform({
    x: avatar.posDelta.x,
    y: avatar.posDelta.y,
    z: avatar.posDelta.z,
  });
  avatar.referenceSpace =
    avatar.referenceSpace.getOffsetReferenceSpace(newTransform);
}
```

## See also

- Targeting and hit detection
- Geometry and reference spaces in WebXR
- Spatial tracking in WebXR
- Rendering and the WebXR frame animation callback
- Viewpoints and viewers: Simulating cameras in WebXR
- Movement, orientation, and motion: A WebXR example
