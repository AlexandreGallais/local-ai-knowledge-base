---
title: "VTTRegion: VTTRegion() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttregion/vttregion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTRegion: VTTRegion() constructor

The **`VTTRegion()`** constructor creates a new `VTTRegion` object instance.

## Syntax

```js
new VTTRegion()
```

### Parameters

None.

### Return value

A new `VTTRegion` object.

The properties of the returned object are initialized to the following values:

- `id`: `""` (the empty string)
- `width`: `100`
- `lines`: `3`
- `regionAnchorX`: `0`
- `regionAnchorY`: `100`
- `viewportAnchorX`: `0`
- `viewportAnchorY`: `100`
- `scroll`: `""` (the empty string)

## Examples

```js
const region = new VTTRegion();
region.width = 50; // Use 50% of the video width
region.lines = 4; // Use 4 lines of height.
```
