---
title: "VRDisplayCapabilities: canPresent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplaycapabilities/canpresent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplayCapabilities: canPresent property

The **`canPresent`** read-only property of the `VRDisplayCapabilities` interface returns a boolean value stating whether the VR display is capable of presenting content (e.g., through an HMD).

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

This is useful for identifying "magic window" devices that are capable of 6DoF tracking but for which `VRDisplay.requestPresent()` is not meaningful. If `canPresent` is `false`, calls to `VRDisplay.requestPresent()` will fail, and `VRDisplay.getEyeParameters()` will return `null`.

## Value

A boolean value.

## Examples

See `VRDisplayCapabilities` for example code.

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
