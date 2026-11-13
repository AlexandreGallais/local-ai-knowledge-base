---
title: "PannerNode: maxDistance property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pannernode/maxdistance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PannerNode: maxDistance property

The `maxDistance` property of the `PannerNode` interface is a double value representing the maximum distance between the audio source and the listener, after which the volume is not reduced any further. This value is used only by the `linear` distance model.

The `maxDistance` property's default value is `10000`.

## Value

A double. The default is `10000`, and non-positive values are not allowed.

### Exceptions

- `RangeError`
    Thrown if the property has been given a value that is outside the accepted range.

## Examples

See `BaseAudioContext.createPanner()` for example code.

## See also

- Using the Web Audio API
