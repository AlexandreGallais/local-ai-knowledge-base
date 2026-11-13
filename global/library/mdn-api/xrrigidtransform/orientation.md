---
title: "XRRigidTransform: orientation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrrigidtransform/orientation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRRigidTransform: orientation property

The read-only `XRRigidTransform` property
**`orientation`** is a `DOMPointReadOnly`
containing a normalized quaternion (also called a **unit
quaternion** or **versor**)
specifying the rotational component of the transform represented by the object.
If you specify a quaternion whose length is not exactly 1.0 meters, it will be
normalized for you.

## Value

A `DOMPointReadOnly` object which contains a unit quaternion providing the
orientation component of the transform. As a unit quaternion, the length of the returned
quaternion is always 1.0 meters.

## Examples

To create a reference space which is oriented to look straight up, positioned 2 meters
off of ground level:

```js
xrReferenceSpace = refSpace.getOffsetReferenceSpace(
  new XRRigidTransform({ y: -2 }, { x: 0.0, y: 1.0, z: 0.0, w: 1.0 }),
);
```

The unit quaternion specified here is \[0.0, 1.0, 0.0, 1.0] to indicate that the object
should be facing directly along the _y_ axis.

## See also

- Movement, orientation, and motion
- Unit quaternions
- Quaternions and spatial rotation
