---
title: "VRFrameData: leftViewMatrix property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrframedata/leftviewmatrix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRFrameData: leftViewMatrix property

The **`leftViewMatrix`** read-only property of the `VRFrameData` interface returns a `Float32Array` representing a 4x4 matrix that describes the view transform to be used for the left eye's rendering.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

This value may be passed directly to WebGL's `uniformMatrix4fv` function.

> **Warning:**
> It is highly recommended that applications use this matrix when rendering.

## Value

A `Float32Array` object.

## Examples

See `VRDisplay.getFrameData()` for example code.

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
