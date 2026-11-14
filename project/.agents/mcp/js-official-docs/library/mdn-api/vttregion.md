---
title: "VTTRegion"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttregion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTRegion

The `VTTRegion` interface of the WebVTT API describes a portion of the video to render a `VTTCue` onto.

## Constructor

- `VTTRegion()`
    Creates a new `VTTRegion` object instance.

## Instance properties

- `VTTRegion.id`
    A string that identifies the region.
- `VTTRegion.width`
    Represents the width of the region, as a percentage of the video's width.
- `VTTRegion.lines`
    Represents the height of the region, in number of lines.
- `VTTRegion.regionAnchorX`
    Represents the region anchor X offset, as a percentage of the region's width.
- `VTTRegion.regionAnchorY`
    Represents the region anchor Y offset, as a percentage of the region's height.
- `VTTRegion.viewportAnchorX`
    Represents the viewport anchor X offset, as a percentage of the video's width.
- `VTTRegion.viewportAnchorY`
    Represents the viewport anchor Y offset, as a percentage of the video's height.
- `VTTRegion.scroll`
    An enumerated value indicating how existing cues in the region move when a new cue is added.

## Examples

```js
const region = new VTTRegion();
region.width = 50; // Set the region to 50% of the video's width
region.lines = 4; // Render cues in 4 lines
region.viewportAnchorX = 25; // Place the region 25% from the left edge of the video
const cue = new VTTCue(2, 3, "Cool text to be displayed");
cue.region = region; // This cue will be drawn only within this region.
```
