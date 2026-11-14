---
title: "VRFrameData"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrframedata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRFrameData

The **`VRFrameData`** interface of the WebVR API represents all the information needed to render a single frame of a VR scene; constructed by `VRDisplay.getFrameData()`.

> **Note:**
> This interface was part of the old WebVR API. It has been superseded by the WebXR Device API.

## Constructor

- `VRFrameData()` (deprecated) (non-standard)
    Creates a `VRFrameData` object instance.

## Instance properties

- `VRFrameData.leftProjectionMatrix` (deprecated) (read-only) (non-standard)
    A `Float32Array` representing a 4x4 matrix that describes the projection to be used for the left eye's rendering.
- `VRFrameData.leftViewMatrix` (deprecated) (read-only) (non-standard)
    A `Float32Array` representing a 4x4 matrix that describes the view transform to be used for the left eye's rendering.
- `VRFrameData.pose` (deprecated) (read-only) (non-standard)
    The `VRPose` of the `VRDisplay` at the current `VRFrameData.timestamp`.
- `VRFrameData.rightProjectionMatrix` (deprecated) (read-only) (non-standard)
    A `Float32Array` representing a 4x4 matrix that describes the projection to be used for the right eye's rendering.
- `VRFrameData.rightViewMatrix` (deprecated) (read-only) (non-standard)
    A `Float32Array` representing a 4x4 matrix that describes the view transform to be used for the right eye's rendering.
- `VRFrameData.timestamp` (deprecated) (read-only) (non-standard)
    A constantly increasing timestamp value representing the time a frame update occurred.

## Examples

See `VRDisplay.getFrameData()` for example code.

## Specifications

This interface was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
