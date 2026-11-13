---
title: "XRRigidTransform: XRRigidTransform() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrrigidtransform/xrrigidtransform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRRigidTransform: XRRigidTransform() constructor

The
**`XRRigidTransform()`** constructor creates
a new `XRRigidTransform` object, representing the position and
orientation of a point or object. Among other things,
`XRRigidTransform` is used when providing a transform to translate between
coordinate systems across spaces.

## Syntax

```js
new XRRigidTransform()
new XRRigidTransform(position)
new XRRigidTransform(position, orientation)
```

### Parameters

- `position` (optional)
    An object which specifies the coordinates
    at which the point or object is located. These dimensions are specified in meters. If
    this parameter is left out or is invalid, the
    position used is assumed to be `{x: 0, y: 0, z: 0, w: 1}`. `w`
    must _always_ be 1.
- `orientation` (optional)
    An object which specifies the direction in
    which the object is facing. The default value for `orientation` is
    `{x: 0, y: 0, z: 0, w: 1}`. The specified orientation gets normalized if
    it's not already.

### Return value

A new `XRRigidTransform` object which has been initialized to represent a
transform matrix that would adjust the position and orientation of an object from the
origin to the specified `position` and facing in the direction indicated by
`orientation`.

### Exceptions

- `TypeError`
    Thrown if the value of the `w` coordinate in the specified `position` is
    not 1.0.

## Examples

In this example, the beginning of the animation of a scene is shown, starting with a
request for a reference space of a given type, then shifting the coordinate system based
on a transform before requesting the first animation frame.

```js
let animationFrameRequestID = 0;

xrSession.requestReferenceSpace("local-floor").then((refSpace) => {
  xrReferenceSpace = refSpace.getOffsetReferenceSpace(
    new XRRigidTransform(viewerPosition, viewerOrientation),
  );
  animationFrameRequestID = xrSession.requestAnimationFrame(drawFrame);
});
```

After requesting a reference space of type `local-floor`, the returned
promise is eventually resolved, at which time we receive a new reference space object,
`refSpace`. After creating an `XRRigidTransform` from the viewer's
initial position and orientation, we pass the new transform into
`getOffsetReferenceSpace()` to
create _another_ reference space, now offset so that its origin is located at the
same place in space as the coordinates given by `viewerPosition`, with the
orientation also revised in the same fashion.

Then `requestAnimationFrame()` is
called to ask for a new animation frame to draw into. The `drawFrame()`
callback will be executed when the system is ready to draw the next frame.

You can find more examples in Movement, orientation, and motion.
