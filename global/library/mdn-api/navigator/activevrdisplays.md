---
title: "Navigator: activeVRDisplays property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/activevrdisplays/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: activeVRDisplays property

The **`activeVRDisplays`** read-only property of the
`Navigator` interface returns an array containing every
`VRDisplay` object that is currently presenting
(`VRDisplay.isPresenting` is `true`).

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

## Value

An array of `VRDisplay` objects.

## Examples

```js
function showActive() {
  const displays = navigator.activeVRDisplays;
  for (const display of displays) {
    console.log(`Display ${display.displayId} is active.`);
  }
}
```

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
