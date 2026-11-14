---
title: "VRDisplay: resetPose() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplay/resetpose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplay: resetPose() method

The **`resetPose()`** method of the `VRDisplay` interface resets the pose for the `VRDisplay`, treating its current `VRPose.position` and `VRPose.orientation` as the "origin/zero" values.

> **Note:**
> This method was part of the old WebVR API. It has been superseded by the WebXR Device API.

After `resetPost()` has been called, future poses returned from `VRDisplay.getPose()`/`VRDisplay.getImmediatePose()` will describe positions relative to the `VRDisplay`'s position when `resetPose()` was last called and will treat the display's yaw when `resetPose()` was last called as the forward orientation.

The VRDisplay's reported roll and pitch do not change when `resetPose()` is called as they are relative to gravity. Calling `resetPose()` may change the `VRStageParameters.sittingToStandingTransform` matrix.

## Syntax

```js
resetPose()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
// Assuming vrDisplay already contains a VRDisplay object,
// and we have a <button> referenced inside btn
btn.addEventListener("click", () => {
  vrDisplay.resetPose();
  console.log("Current pose set as origin/center");
});
```

## Specifications

This method was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
