---
title: "Window: mozInnerScreenX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/mozinnerscreenx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: mozInnerScreenX property

Gets the X coordinate of the top-left corner of the window's viewport, in screen
coordinates.

> **Note:**
> This coordinate is reported in CSS pixels, not in hardware pixels. That means it can be affected by the zoom level; to compute the actual number of physical screen pixels, you should use the `nsIDOMWindowUtils.screenPixelsPerCSSPixel` property.

## Value

The `window.mozInnerScreenX` property is a floating point, read-only value; it has no default value.

## Specifications

Not part of any W3C technical
specification or recommendation.

## See also

- `window.mozInnerScreenY`
- `nsIDOMWindowUtils.screenPixelsPerCSSPixel`
