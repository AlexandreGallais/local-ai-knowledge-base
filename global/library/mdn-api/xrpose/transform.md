---
title: "XRPose: transform property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrpose/transform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRPose: transform property

The `transform` read-only attribute of the
`XRPose` interface is a `XRRigidTransform` object providing
the position and orientation of the pose relative to the base `XRSpace`
as specified when the pose was obtained by calling
`XRFrame.getPose()`.

## Value

An `XRRigidTransform` which provides the position and orientation of the
`XRPose` relative to the `XRFrame` to which this
`XRPose` is aligned. This is the same pose that's returned by the frame's
`getPose()` method.

## Examples

This handler for the `XRSession` event `select` handles events for tracked pointers. It determines the targeted object by
passing the event frame's pose into a function called `findTargetUsingRay()`,
then dispatches the event differently depending on the user's handedness; this is done
by comparing the value of the `XRInputSource` property
`handedness` to a value in the variable
`user.handedness`. If the source is a controller in the user's primary hand,
a function is called on the targeted object called `primaryAction()`;
otherwise, it calls the targeted object's `offHandAction()` function.

```js
xrSession.addEventListener("select", (event) => {
  let source = event.inputSource;
  let frame = event.frame;
  let targetRayPose = frame.getPose(source.targetRaySpace, myRefSpace);
  let targetObject = findTargetUsingRay(targetRay.transform.matrix);

  if (source.targetRayMode === "tracked-pointer") {
    if (source.handedness === user.handedness) {
      targetObject.primaryAction();
    } else {
      targetObject.offHandAction();
    }
  }
});
```
