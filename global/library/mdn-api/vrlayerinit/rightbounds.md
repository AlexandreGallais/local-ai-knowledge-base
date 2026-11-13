---
title: "VRLayerInit: rightBounds property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrlayerinit/rightbounds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRLayerInit: rightBounds property

The **`rightBounds`** property of the `VRLayerInit` interface (dictionary) defines the right texture bounds of the canvas whose contents will be presented by the `VRDisplay`.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

## Value

An array of four floating point values, which can take values from 0.0–1.0:

1. The left offset of the bounds.
2. The top offset of the bounds.
3. The width of the bounds.
4. The height of the bounds.

If `leftBounds` is not specified in the dictionary, the default value used is `[0.5, 0.0, 0.5, 1.0]`.

## Examples

See `VRLayerInit` for example code.

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
