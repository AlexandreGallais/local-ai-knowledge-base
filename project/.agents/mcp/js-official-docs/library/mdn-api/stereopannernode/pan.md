---
title: "StereoPannerNode: pan property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stereopannernode/pan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StereoPannerNode: pan property

The `pan` property of the `StereoPannerNode` interface is an a-rate `AudioParam` representing the amount of panning to apply. The value can range between `-1` (full left pan) and `1` (full right pan).

## Value

An a-rate `AudioParam` containing the panning to apply.

> **Note:**
> Though the `AudioParam` returned is read-only, the value it represents is not.

## Examples

See `BaseAudioContext.createStereoPanner()` for example code.

## See also

- Using the Web Audio API
