---
title: "VRDisplayCapabilities: hasExternalDisplay property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplaycapabilities/hasexternaldisplay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplayCapabilities: hasExternalDisplay property

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

The **`hasExternalDisplay`** read-only property of the `VRDisplayCapabilities` interface returns `true` if the VR display is separate from the device's primary display.

> **Note:**
> If presenting VR content would obscure other content on the device, this will return `false`, in which case the application should not attempt to mirror VR content or update non-VR UI because that content will not be visible.

## Value

A boolean value.

## Examples

See `VRDisplayCapabilities` for example code.

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
