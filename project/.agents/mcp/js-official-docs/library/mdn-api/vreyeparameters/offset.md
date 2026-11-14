---
title: "VREyeParameters: offset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vreyeparameters/offset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VREyeParameters: offset property

The **`offset`** read-only property of the `VREyeParameters` interface represents the offset from the center point between the user's eyes to the center of the eye, measured in meters.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

This value should represent half the user's interpupillary distance (IPD), but may also represent the distance from the center point of the headset to the center point of the lens for the given eye.

## Value

A `Float32Array` representing a vector describing the offset from the center point between the users eyes to the center of the eye in meters.

> **Note:**
> Values for the left eye will be negative; values for the right eye will be positive.

## Examples

See `VRFieldOfView` for example code.

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
