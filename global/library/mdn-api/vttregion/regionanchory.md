---
title: "VTTRegion: regionAnchorY property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttregion/regionanchory/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTRegion: regionAnchorY property

The **`regionAnchorY`** property of the `VTTRegion` interface represents the y-coordinate of the region anchor, as a percentage of the region's height.

## Value

A number, in the range `0` to `100` inclusive, representing the y-coordinate of the region anchor as a percentage of the region's height. The default is `100`.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown when set to a value that is negative or greater than `100`.

## Examples

In the following example, a new `VTTRegion` is created, then the value of `regionAnchorY` is set to `70`. The value is then printed to the console.

```js
const region = new VTTRegion();
region.regionAnchorY = 70;
console.log(region.regionAnchorY);
```
