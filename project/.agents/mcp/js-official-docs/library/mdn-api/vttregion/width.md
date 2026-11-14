---
title: "VTTRegion: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttregion/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTRegion: width property

The **`width`** property of the `VTTRegion` interface represents the width of the region, as a percentage of the video's width.

## Value

A number in the range `0` to `100` inclusive, representing the width of the region as a percentage of the video's width. The default is `100`.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown when set to a value that is negative or greater than `100`.

## Examples

In the following example, a new `VTTRegion` is created, then the value of `width` is set to `50`. The value is then printed to the console.

```js
const region = new VTTRegion();
region.width = 50; // Set the region to 50% of the video's width
console.log(region.width);
```
