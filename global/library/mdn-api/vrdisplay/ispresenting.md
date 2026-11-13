---
title: "VRDisplay: isPresenting property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplay/ispresenting/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplay: isPresenting property

The **`isPresenting`** read-only property of the `VRDisplay` interface returns a boolean value indicating whether the `VRDisplay` is currently having content presented through it.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

## Value

A boolean value; `true` means the display is presenting; `false` means it isn't.

## Examples

```js
function onVRExitPresent() {
  // No sense in exiting presentation if we're not actually presenting.
  // (This may happen if we get an event like vrdisplaydeactivate when
  // we weren't presenting.)
  if (!vrDisplay.isPresenting) return;
  vrDisplay.exitPresent().then(
    () => {
      // Nothing to do because we're handling things in onVRPresentChange.
    },
    (err) => {
      let errMsg = "exitPresent failed.";
      if (err && err.message) {
        errMsg += `<br/>${err.message}`;
      }
      VRSamplesUtil.addError(errMsg, 2000);
    },
  );
}
```

> **Note:**
> Code snippet taken from Google's VR Presentation demo.

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
