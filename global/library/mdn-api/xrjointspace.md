---
title: "XRJointSpace"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrjointspace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRJointSpace

The **`XRJointSpace`** interface is an `XRSpace` and represents the position and orientation of an `XRHand` joint.

## Instance properties

- `XRJointSpace.jointName` (read-only)
    The name of the joint that is tracked. See `XRHand` for possible hand joint names.

## Examples

### Using `XRJointSpace` objects

You can use an `XRJointSpace` object and an `XRReferenceSpace` to get an `XRJointPose` by calling `XRFrame.getJointPose()`.

```js
navigator.xr
  .requestSession({ optionalFeatures: ["hand-tracking"] })
  .then(/** … */);

function renderFrame(session, frame) {
  // …

  for (const inputSource of session.inputSources) {
    if (inputSource.hand) {
      const indexFingerTipJoint = inputSource.hand.get("index-finger-tip"); // XRJointSpace
      indexFingerTipJoint.jointName; // "index-finger-tip"
      frame.getJointPose(indexFingerTipJoint, referenceSpace); // XRJointPose
    }
  }
}
```

## See also

- `XRHand`
- `XRReferenceSpace`
- `XRJointPose`
- `XRFrame.getJointPose()`
