---
title: "XRFrame: getPose() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrframe/getpose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRFrame: getPose() method

The `XRFrame` method **`getPose()`** returns the relative position and
orientation—the pose—of one `XRSpace` to that of another space. With this, you can observe the motion of objects relative to each other and to fixed locations throughout the scene.

For example, to get the position of a controller relative to the viewer's head, you would compare the controller's `gripSpace` to the `XRReferenceSpace` of type `viewer`.

## Syntax

```js
getPose(space, baseSpace)
```

### Parameters

- `space`
    An `XRSpace` specifying the space for which to obtain an
    `XRPose` describing the item's position and orientation.
- `baseSpace`
    An `XRSpace` to use as the base or origin for the purposes of computing
    the relative position and orientation.

### Return value

An `XRPose` object specifying the position and orientation, relative to
the `XRSpace` indicated by `baseSpace`.
