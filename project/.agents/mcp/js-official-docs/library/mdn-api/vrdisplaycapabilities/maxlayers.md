---
title: "VRDisplayCapabilities: maxLayers property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplaycapabilities/maxlayers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplayCapabilities: maxLayers property

The **`maxLayers`** read-only property of the `VRDisplayCapabilities` interface returns a number indicating the maximum number of `VRLayerInit`s that the VR display can present at once (e.g., the maximum length of the array that `VRDisplay.requestPresent()` can accept.)

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

## Value

A number, which must be 1 if `VRDisplayCapabilities.canPresent` is `true`, or 0 otherwise.

## Examples

See `VRDisplayCapabilities` for example code.

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
