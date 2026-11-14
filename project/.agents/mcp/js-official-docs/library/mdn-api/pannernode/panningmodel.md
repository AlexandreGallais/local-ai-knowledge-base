---
title: "PannerNode: panningModel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pannernode/panningmodel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PannerNode: panningModel property

The `panningModel` property of the `PannerNode` interface is an enumerated value determining which spatialization algorithm to use to position the audio in 3D space.

The possible values are:

- `equalpower`: Represents the equal-power panning algorithm, generally regarded as simple and efficient. `equalpower` is the default value.
- `HRTF`: Renders a stereo output of higher quality than `equalpower` — it uses a convolution with measured impulse responses from human subjects.

## Value

An enum — see `PanningModelType`.

## Examples

See `BaseAudioContext.createPanner()` for example code.

## See also

- Using the Web Audio API
