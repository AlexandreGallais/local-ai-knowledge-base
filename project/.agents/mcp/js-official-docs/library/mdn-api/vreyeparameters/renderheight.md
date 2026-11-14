---
title: "VREyeParameters: renderHeight property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vreyeparameters/renderheight/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VREyeParameters: renderHeight property

The **`renderHeight`** read-only property of the `VREyeParameters` interface describes the recommended render target height of each eye viewport, in pixels.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

This is already in device pixel units, so there's no need to multiply by Window.devicePixelRatio before setting to HTMLCanvasElement.height.

## Value

A number, representing the height in pixels.

## Examples

See `VREyeParameters` for example code.

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
