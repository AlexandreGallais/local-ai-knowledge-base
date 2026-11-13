---
title: "VTTRegion: scroll property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttregion/scroll/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTRegion: scroll property

The **`scroll`** property of the `VTTRegion` interface is an enumerated value indicating how existing cues in the region move when a new cue is added.

## Value

A string. Possible values are:

- `""` (the empty string)
    Existing cues in the region don't scroll; instead, they are displayed at the same time as new cues. This is the default.
- `"up"`
    New cues are added at the bottom of the region, and existing cues scroll upwards to make space for them.

## Examples

In the following example, a new `VTTRegion` is created, then the value of `scroll` is set to `"up"`. The value is then printed to the console.

```js
const region = new VTTRegion();
region.scroll = "up";
console.log(region.scroll);
```
