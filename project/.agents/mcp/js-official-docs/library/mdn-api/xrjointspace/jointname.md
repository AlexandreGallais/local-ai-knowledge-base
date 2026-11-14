---
title: "XRJointSpace: jointName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrjointspace/jointname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRJointSpace: jointName property

The read-only **`jointName`** property of the `XRJointSpace` interface contains the name of the joint it tracks.

## Value

A string indicating the name of the joint. See the list of hand joints on the `XRHand` page.

## Examples

### Getting the `jointName`

Given a `XRJointSpace`, the `jointName` property will contain the hand joint name.

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
    }
  }
}
```

## See also

- `XRHand`
