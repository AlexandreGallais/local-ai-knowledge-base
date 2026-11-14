---
title: "VTTRegion: regionAnchorX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttregion/regionanchorx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTRegion: regionAnchorX property

The **`regionAnchorX`** property of the `VTTRegion` interface represents the x-coordinate of the region anchor, as a percentage of the region's width.

## Value

A number, in the range `0` to `100` inclusive, representing the x-coordinate of the region anchor as a percentage of the region's width. The default is `0`.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown when set to a value that is negative or greater than `100`.

## Examples

In the following example, a new `VTTRegion` is created, then the value of `regionAnchorX` is set to `30`. The value is then printed to the console.

```js
const region = new VTTRegion();
region.regionAnchorX = 30;
console.log(region.regionAnchorX);
```
