---
title: "XRRigidTransform"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrrigidtransform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRRigidTransform

The **`XRRigidTransform`** is a WebXR API interface that represents the 3D geometric transform described by a position and orientation.

`XRRigidTransform` is used to specify transforms throughout the WebXR APIs, including:

- The offset and orientation relative to the parent reference space to use when creating a new reference space with `getOffsetReferenceSpace()`.
- The `transform` of an `XRView`.
- The `transform` of an `XRPose`.
- The `XRReferenceSpaceEvent` event's `transform` property, as found in the `reset` event received by an `XRReferenceSpace`.

Using `XRRigidTransform` in these places rather than bare arrays that provide the matrix data has an advantage. It automatically computes the inverse of the transform and even caches it making subsequent requests significantly faster.

## Constructor

- `XRRigidTransform()`
    Creates a new `XRRigidTransform` object which represents a transform that applies a specified position and/or orientation.

## Instance properties

- `XRRigidTransform.position` (read-only)
    A `DOMPointReadOnly` specifying a 3-dimensional point, expressed in meters, describing the translation component of the transform. The `w` property is always `1.0`.
- `XRRigidTransform.orientation` (read-only)
    A `DOMPointReadOnly` which contains a unit quaternion describing the rotational component of the transform. As a unit quaternion, its length is always normalized to `1.0`.
- `XRRigidTransform.matrix` (read-only)
    Returns the transform matrix in the form of a 16-member `Float32Array`. See the section Matrix format for how the array is used to represent a matrix.
- `XRRigidTransform.inverse` (read-only)
    Returns a `XRRigidTransform` which is the inverse of this transform. That is, if applied to an object that had been previously transformed by the original transform, it will undo the transform and return the original object.

## Usage notes

When an `XRRigidTransform` is interpreted, the orientation is always applied to the affected object before the position is applied.

## Example

This code snippet creates an `XRRigidTransform` to specify the offset and orientation in relation to the current reference space to use when creating a new reference space. It then requests the first animation frame callback by calling the session's `requestAnimationFrame()` method.

```js
xrSession.requestReferenceSpace(refSpaceType).then((refSpace) => {
  xrReferenceSpace = refSpace;
  xrReferenceSpace = xrReferenceSpace.getOffsetReferenceSpace(
    new XRRigidTransform(viewerStartPosition, cubeOrientation),
  );
  animationFrameRequestID = xrSession.requestAnimationFrame(drawFrame);
});
```
