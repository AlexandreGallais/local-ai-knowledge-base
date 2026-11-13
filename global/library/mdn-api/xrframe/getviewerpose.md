---
title: "XRFrame: getViewerPose() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrframe/getviewerpose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRFrame: getViewerPose() method

The **`getViewerPose()`** method, a member of the `XRFrame` interface, returns a `XRViewerPose` object which describes the viewer's pose (position and orientation) relative to the specified reference space.

See the `getPose()` method for a way to calculate a pose that represents the difference between two spaces.

## Syntax

```js
getViewerPose(referenceSpace)
```

### Parameters

- `referenceSpace`
    An `XRReferenceSpace` object specifying the space to use as the
    reference point or base for the computation of the viewer's current pose.

### Return value

A `XRViewerPose` describing the viewer's position and orientation relative
to the specified reference space.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if `getViewerPose()` was not
    called within the context of a callback to a
    session's `XRSession.requestAnimationFrame()`.

## Examples

In this callback function for `requestAnimationFrame()`, the `XRViewerPose` describing the viewer's viewpoint on the world is obtained by calling `getViewerPose()` on the `XRFrame` passed into the callback.

```js
viewerPose = xrFrame.getViewerPose(xrReferenceSpace);

if (viewerPose) {
  /* render the pose's views */
}
```

To see a complete example, take a look at Movement, orientation, and motion.
