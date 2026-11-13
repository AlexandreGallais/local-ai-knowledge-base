---
title: "VTTRegion: lines property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttregion/lines/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTRegion: lines property

The **`lines`** property of the `VTTRegion` interface represents the height of the region, in number of lines.

## Value

A number representing the number of lines inside the region that cue text is rendered in. The default is `3`.

## Examples

In the following example, a new `VTTRegion` is created, then the value of `lines` is set to `4`. The value is then printed to the console.

```js
const region = new VTTRegion();
region.lines = 4; // Render cues in 4 lines
console.log(region.lines);
```
