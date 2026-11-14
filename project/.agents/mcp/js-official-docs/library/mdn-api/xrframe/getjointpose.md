---
title: "XRFrame: getJointPose() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrframe/getjointpose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRFrame: getJointPose() method

The **`getJointPose()`** method of the `XRFrame` interface returns an `XRJointPose` object providing the pose of a hand joint (see `XRHand`) relative to a given base space.

## Syntax

```js
getJointPose(joint, baseSpace)
```

### Parameters

- `joint`
    An `XRJointSpace` specifying the hand joint space for which to obtain an `XRJointPose` describing the item's position and orientation.
- `baseSpace`
    An `XRSpace` to use as the base or origin for the relative position and orientation.

### Return value

An `XRJointPose` object specifying the position and orientation of the hand joint, relative to
the `XRSpace` indicated by `baseSpace`.

## Examples

### Using `getJointPose()`

Call `getJointPose()` with an `XRJointSpace` and an `XRReferenceSpace` to get an `XRJointPose` object.

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
- `XRJointSpace`
- `XRSpace`
