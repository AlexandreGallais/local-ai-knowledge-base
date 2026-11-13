---
title: "XRPose"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrpose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRPose

`XRPose` is a WebXR API interface representing a position and orientation in the 3D space, relative to the `XRSpace` within which it resides. The `XRSpace`—which is either an `XRReferenceSpace` or an `XRBoundedReferenceSpace`—defines the coordinate system used for the pose and, in the case of an `XRViewerPose`, its underlying views.

To obtain the `XRPose` for the `XRSpace` used as the local coordinate system of an object, call `XRFrame.getPose()`, specifying that local `XRSpace` and the space to which you wish to convert:

```js
thePose = xrFrame.getPose(localSpace, baseSpace);
```

The pose for a viewer (or camera) is represented by the `XRViewerPose` subclass of `XRPose`. This is obtained using `XRFrame.getViewerPose()` instead of `getPose()`, specifying a reference space which has been adjusted to position and orient the node to provide the desired viewing position and angle:

```js
viewerPose = xrFrame.getViewerPose(adjReferenceSpace);
```

Here, `adjReferenceSpace` is a reference space which has been updated using the base frame of reference for the frame and any adjustments needed to position the viewer based on movement or rotation which is being supplied from a source other than the XR device, such as keyboard or mouse inputs.

See the article Movement, orientation, and motion for further details and an example with thorough explanations of what's going on.

## Instance properties

- `XRPose.angularVelocity` (read-only)
    A `DOMPointReadOnly` describing the angular velocity in radians per second relative to the base `XRSpace`.
- `XRPose.emulatedPosition` (read-only)
    A Boolean value which is `false` if the position and orientation given by `transform` is obtained directly from a full six degree of freedom (6DoF) XR device (that is, a device which tracks not only the pitch, yaw, and roll of the head but also the forward, backward, and side-to-side motion of the viewer). If any component of the `transform` is computed or created artificially (such as by using mouse or keyboard controls to move through space), this value is instead `true`, indicating that the `transform` is in part emulated in software.
- `XRPose.linearVelocity` (read-only)
    A `DOMPointReadOnly` describing the linear velocity in meters per second relative to the base `XRSpace`.
- `XRPose.transform` (read-only)
    A `XRRigidTransform` which provides the position and orientation of the pose relative to the base `XRSpace`.

## See also

- WebXR Device API
- `XRFrame.getPose()`
- `XRViewerPose`
