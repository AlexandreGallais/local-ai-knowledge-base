---
title: "VTTRegion: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttregion/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTRegion: id property

The **`id`** property of the `VTTRegion` interface is a string that identifies the region.

## Value

A string that identifies the region. Initialized to an empty string when the `VTTRegion` object is first constructed.

## Examples

In the following example, a new `VTTRegion` is created, then the value of `id` is set to `"region1"`. The value is then printed to the console.

```js
const region = new VTTRegion();
region.id = "region1";
console.log(region.id);
```
