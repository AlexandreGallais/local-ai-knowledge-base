---
title: "XRAnchor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xranchor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRAnchor

The **`XRAnchor`** interface creates anchors which keep track of the pose that is fixed relative to the real world. With anchors, you can specify poses in the world that need to be updated to correctly reflect the evolving understanding of the world, such that the poses remain aligned with the same place in the physical world. That helps to build an illusion that the placed objects are really present in the user's environment.

## Instance properties

- `XRAnchor.anchorSpace` (read-only) (experimental)
    Returns an `XRSpace` object to locate the anchor relative to other `XRSpace` objects.

## Instance methods

- `XRAnchor.delete()` (experimental)
    Removes the anchor.

## Examples

### Requesting a session with anchors enabled

```js
navigator.xr.requestSession("immersive-ar", {
  requireFeatures: ["anchors"],
});
```

### Adding anchors

You can use `XRFrame.createAnchor()` to create an anchor.

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

- `XRAnchorSet`
- `XRFrame.createAnchor()`
- `XRFrame.trackedAnchors`
- `XRHitTestResult.createAnchor()`
