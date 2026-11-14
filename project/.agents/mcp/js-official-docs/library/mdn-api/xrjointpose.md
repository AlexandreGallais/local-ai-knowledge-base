---
title: "XRJointPose"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrjointpose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRJointPose

The **`XRJointPose`** interface is an `XRPose` with additional information about the size of the skeleton joint it represents.

## Instance properties

- `XRJointPose.radius` (read-only)
    The radius (distance from skin) for a joint.

## Examples

### Using `XRJointPose` objects

Call `XRFrame.getJointPose()` with an `XRJointSpace` and an `XRReferenceSpace` to get an `XRJointPose` object.

```js
navigator.xr
  .requestSession({ optionalFeatures: ["hand-tracking"] })
  .then(/* … */);

function renderFrame(session, frame) {
  // …

  for (const inputSource of session.inputSources) {
    if (inputSource.hand) {
      const indexFingerTipJoint = inputSource.hand.get("index-finger-tip");
      frame.getJointPose(indexFingerTipJoint, referenceSpace); // XRJointPose
    }
  }
}
```

## See also

- `XRHand`
- `XRReferenceSpace`
- `XRJointSpace`
- `XRFrame.getJointPose()`
