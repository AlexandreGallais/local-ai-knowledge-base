---
title: "VRDisplay: stageParameters property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplay/stageparameters/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplay: stageParameters property

The **`stageParameters`** read-only property of the `VRDisplay` interface returns a `VRStageParameters` object containing room-scale parameters, if the `VRDisplay` is capable of supporting room-scale experiences.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

## Value

`VRStageParameters` object containing the `VRDisplay`'s room-scale parameters, or `null` if the `VRDisplay` is not capable of supporting room-scale experiences.

## Examples

See `VRStageParameters` for example code.

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
