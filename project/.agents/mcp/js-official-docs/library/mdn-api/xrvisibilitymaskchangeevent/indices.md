---
title: "XRVisibilityMaskChangeEvent: indices property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrvisibilitymaskchangeevent/indices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRVisibilityMaskChangeEvent: indices property

The **`indices`** read-only property of the `XRVisibilityMaskChangeEvent` interface specifies the index position of each coordinate pair (not individual array index) inside the `vertices` array that define the triangles used to draw the currently visible part of the scene displayed in the `XRView`. If this array is empty, the whole region of the `XRView` will be drawn.

The number of contained values should therefore be a multiple of three. See `vertices` for more explanation.

## Value

A `Uint32Array`.

## Examples

See the main `XRVisibilityMaskChangeEvent` page for an example.

## See also

- `XRVisibilityMaskChangeEvent.vertices`
