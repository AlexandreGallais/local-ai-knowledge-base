---
title: "AudioListener: upZ property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiolistener/upz/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioListener: upZ property

The `upZ` read-only property of the `AudioListener` interface is an `AudioParam` representing the z value of the direction vector defining the up direction the listener is pointing in.

> **Note:**
> The parameter is _a-rate_ when used with a `PannerNode` whose `PannerNode` is set to equalpower, or _k-rate_ otherwise.

## Value

An `AudioParam`. Its default value is 0, and it can range between positive and negative infinity.

## Examples

See `BaseAudioContext.createPanner()` for example code.

## See also

- Using the Web Audio API
