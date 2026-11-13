---
title: "VTTRegion: viewportAnchorX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttregion/viewportanchorx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTRegion: viewportAnchorX property

The **`viewportAnchorX`** property of the `VTTRegion` interface represents the x-coordinate of the viewport anchor, as a percentage of the video's width.

## Value

A number, in the range `0` to `100` inclusive, representing the x-coordinate of the viewport anchor as a percentage of the video's width. The default is `0`.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown when set to a value that is negative or greater than `100`.

## Examples

In the following example, a new `VTTRegion` is created, then the value of `viewportAnchorX` is set to `25`. The value is then printed to the console.

```js
const region = new VTTRegion();
region.viewportAnchorX = 25; // Place the region 25% from the left edge of the video
console.log(region.viewportAnchorX);
```
