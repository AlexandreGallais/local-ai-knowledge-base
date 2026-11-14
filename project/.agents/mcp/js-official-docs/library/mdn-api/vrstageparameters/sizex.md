---
title: "VRStageParameters: sizeX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrstageparameters/sizex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRStageParameters: sizeX property

The **`sizeX`** read-only property of the `VRStageParameters` interface _returns the width_ of the play-area bounds in meters.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

The bounds are defined as an axis-aligned rectangle on the floor, for safety purposes. Content should not require the user to move beyond these bounds; however, it is possible for the user to ignore the bounds resulting in position values outside of this rectangle. The center of the rectangle is at (0,0,0) in standing-space coordinates.

## Value

A float representing the width in meters.

## Examples

See `VRStageParameters` for example code.

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
