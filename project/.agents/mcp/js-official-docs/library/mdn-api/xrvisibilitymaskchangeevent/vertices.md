---
title: "XRVisibilityMaskChangeEvent: vertices property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrvisibilitymaskchangeevent/vertices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRVisibilityMaskChangeEvent: vertices property

The read-only **`vertices`** property of the `XRVisibilityMaskChangeEvent` interface is an array representing all the coordinate values that may be used in the visibility mask. If this array is empty, the whole region of the `XRView` will be drawn.

## Value

A `Float32Array`.

## Description

Each pair of values available in the `vertices` array represents the `x` and `y` coordinate values of a point on a flat mask in clip space. So for example, a simple square mask might be represented by the following array:

```plain
[0, 0, 0, 1, 1, 1, 1, 0]
```

which represents the x,y coordinates (0,0), (0,1), (1,1), and (1,0). These coordinates the boundary of the visibility mask — the region of the display that is actually visible to the user. Anything outside the mask is not visible to the user, and does not need to be drawn. It can be skipped to improve performance.

The `indices` array specifies the index position of each coordinate pair (not individual array index) inside the `vertices` array that define the triangles used to draw the currently visible part of the scene displayed in the `XRView`. The number of contained values should therefore be a multiple of three. A sample `indices` array related to the above `vertices` example might looks like this:

```plain
[0,1,2,0,3,2]
```

Which represent two triangles represented by coordinate pairs 0, 1, and 2, and 0, 3, and 2, which can be used to create a basic mesh. The `vertices` and `indices` arrays are designed to be passed to a graphics library.

## Examples

See the main `XRVisibilityMaskChangeEvent` page for an example.

## See also

- `XRVisibilityMaskChangeEvent.indices`
