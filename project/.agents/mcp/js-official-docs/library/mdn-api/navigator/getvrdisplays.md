---
title: "Navigator: getVRDisplays() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/getvrdisplays/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: getVRDisplays() method

The **`getVRDisplays()`** method of the `Navigator` interface returns a promise that resolves to an array of `VRDisplay` objects representing any available VR displays connected to the computer.

## Syntax

```js
getVRDisplays()
```

### Parameters

None.

### Return value

A promise that resolves to an array of `VRDisplay` objects.

## Examples

See `VRDisplay` for example code.

## Specifications

This method was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API homepage
