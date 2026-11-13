---
title: "PannerNode: distanceModel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pannernode/distancemodel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PannerNode: distanceModel property

The `distanceModel` property of the `PannerNode` interface is an enumerated value determining which algorithm to use to reduce the volume of the audio source as it moves away from the listener.

The possible values are:

- `linear`: A _linear distance model_ calculating the gain induced by the distance according to:
  `1 - rolloffFactor * (distance - refDistance) / (maxDistance - refDistance)`
- `inverse`: An _inverse distance model_ calculating the gain induced by the distance according to:
  `refDistance / (refDistance + rolloffFactor * (Math.max(distance, refDistance) - refDistance))`
- `exponential`: An _exponential distance model_ calculating the gain induced by the distance according to:
  `pow((Math.max(distance, refDistance) / refDistance, -rolloffFactor)`.

`inverse` is the default value of `distanceModel`.

## Value

An enum — see `DistanceModelType`.

## Examples

See `BaseAudioContext.createPanner()` for example code.

## See also

- Using the Web Audio API
- Web Audio spatialization basics
