---
title: "VRDisplay: depthFar property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplay/depthfar/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplay: depthFar property

The **`depthFar`** property of the `VRDisplay` interface gets and sets the z-depth defining the far plane of the eye view frustum, i.e., the furthest viewable boundary of the scene.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

Generally you should leave the value as is, but you might want to reduce it if you are trying to improve performance on slower computers.

## Value

A double, representing the z-depth in meters.
It initial value is `10000.0`.

## Examples

```js
let vrDisplay;

navigator.getVRDisplays().then((displays) => {
  vrDisplay = displays[0];
  vrDisplay.depthNear = 1.0;
  vrDisplay.depthFar = 7500.0;
});
```

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
