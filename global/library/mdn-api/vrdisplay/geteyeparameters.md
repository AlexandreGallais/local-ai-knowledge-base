---
title: "VRDisplay: getEyeParameters() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplay/geteyeparameters/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplay: getEyeParameters() method

The **`getEyeParameters()`** method of the `VRDisplay` interface returns the `VREyeParameters` object containing the eye parameters for the specified eye.

> **Note:**
> This method was part of the old WebVR API. It has been superseded by the WebXR Device API.

## Syntax

```js
getEyeParameters(whichEye)
```

### Parameters

- `whichEye`
    A string representing the eye you want to return the eye parameters for. Available values are `left` and `right` (defined in the VREye enum).

### Return value

A `VREyeParameters` object, or null if the VR is not able to present content (e.g., `VRDisplayCapabilities.canPresent` returns `false`).

## Examples

See `VREyeParameters` for example code.

## Specifications

This method was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
