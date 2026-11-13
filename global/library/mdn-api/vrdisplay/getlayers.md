---
title: "VRDisplay: getLayers() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplay/getlayers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplay: getLayers() method

The **`getLayers()`** method of the `VRDisplay` interface returns the layers currently being presented by the `VRDisplay`.

> **Note:**
> This method was part of the old WebVR API. It has been superseded by the WebXR Device API.

## Syntax

```js
getLayers()
```

### Parameters

None.

### Return value

If the `VRDisplay` is presenting, this method returns an array of the `VRLayerInit` objects currently being presented (this will currently be one, as `VRDisplayCapabilities.maxLayers` is currently always 1). If the `VRDisplay` is not presenting, this method returns an empty array.

## Examples

See `VRLayerInit` for example code.

## Specifications

This method was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
