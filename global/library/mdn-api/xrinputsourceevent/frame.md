---
title: "XRInputSourceEvent: frame property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsourceevent/frame/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSourceEvent: frame property

The read-only `XRInputSourceEvent` property
**`frame`** specifies an `XRFrame` object
representing the event frame during which a WebXR user input occurred.
This may thus be an event which occurred in the past rather than a current or impending
event.

## Value

An `XRFrame` indicating the event frame at which the user input event
described by the object took place.

## Usage notes

The event frame does not correspond to a visual frame as is delivered to the frame
rendering callback function (see Rendering and the WebXR frame rendering callback for details on the callback). Instead, the `XRFrame`
specified by the `frame` property is a method to provide access to the
`getPose()` method, which you can use to get the
relative positions of the objects in the scene at the time the event occurred.

However, since the event frame isn't an animation frame, there is no viewer pose
available to represent the viewer's current point of view; the results of calling
`getViewerPose()` will be an
`XRViewerPose` with an empty `views`
list.

## Examples

This code shows a handler for the `selectstart` event which gets the target ray's pose from the frame, mapping the pose
representing the ray (`event.inputSource.targetRaySpace`) to the overall
reference space `myRefSpace`.

Then, if the result isn't `null`, the target ray pose's transform is passed
into a function called `myCheckAndHandleHit()` to see if the ray was pointing
at anything when the select was triggered.

```js
xrSession.onselectstart = (event) => {
  let targetRayPose = event.frame.getPose(
    event.inputSource.targetRaySpace,
    myRefSpace,
  );
  if (targetRayPose) {
    checkAndHandleHit(targetRayPose.transform);
  }
};
```
