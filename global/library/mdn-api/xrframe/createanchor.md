---
title: "XRFrame: createAnchor() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrframe/createanchor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRFrame: createAnchor() method

The **`createAnchor()`** method of the `XRFrame` interface creates a free-floating `XRAnchor` which will be fixed relative to the real world.

See `XRHitTestResult.createAnchor()` for creating an anchor from a hit test result that is attached to a real-world object.

## Syntax

```js
createAnchor(pose, space)
```

### Parameters

- `pose`
    An `XRRigidTransform` object with the initial pose where the anchor should be created. The system will make sure that the relationship with the physical world made at this moment in time is maintained as the tracking system's understanding of the world evolves.
- `space`
    An `XRSpace` object the pose is relative to.

### Return value

A `Promise` resolving to an `XRAnchor` object.

## Examples

### Creating an anchor

```js
frame.createAnchor(anchorPose, referenceSpace).then(
  (anchor) => {
    // Do stuff with the anchor (assign objects that will be relative to this anchor)
  },
  (error) => {
    console.error(`Could not create anchor: ${error}`);
  },
);
```

## See also

- `XRHitTestResult.createAnchor()`
