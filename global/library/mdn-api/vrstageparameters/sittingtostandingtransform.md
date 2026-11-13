---
title: "VRStageParameters: sittingToStandingTransform property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrstageparameters/sittingtostandingtransform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRStageParameters: sittingToStandingTransform property

The **`sittingToStandingTransform`** read-only property of the `VRStageParameters` interface contains a matrix that transforms the sitting-space view matrices of `VRFrameData` to standing-space.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

Basically, this can be passed into your WebGL code to transform the rendered view from a sitting to standing view.

## Value

A 16-element `Float32Array` containing the components of a 4×4 transform matrix.

## Examples

See `VRStageParameters` for example code.

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
