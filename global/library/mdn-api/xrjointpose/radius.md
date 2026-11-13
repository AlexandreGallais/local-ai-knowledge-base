---
title: "XRJointPose: radius property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrjointpose/radius/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRJointPose: radius property

The read-only **`radius`** property of the `XRJointPose` interface indicates the radius (distance from skin) for a joint.

## Value

A number indicating the radius in meters.

## Examples

### Getting the `radius` for a hand joint

Call `XRFrame.getJointPose()` with an `XRJointSpace` and an `XRReferenceSpace` to get an `XRJointPose` object which provides the radius property.

```js
navigator.xr
  .requestSession({ optionalFeatures: ["hand-tracking"] })
  .then(/** … */);

function renderFrame(session, frame) {
  // …

  for (const inputSource of session.inputSources) {
    if (inputSource.hand) {
      const indexFingerTipJoint = inputSource.hand.get("index-finger-tip");
      const radius = frame.getJointPose(
        indexFingerTipJoint,
        referenceSpace,
      ).radius;
    }
  }
}
```

## See also

- `XRHand`
- `XRReferenceSpace`
- `XRJointSpace`
- `XRFrame.getJointPose()`
