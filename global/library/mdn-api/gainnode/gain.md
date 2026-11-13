---
title: "GainNode: gain property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gainnode/gain/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GainNode: gain property

The `gain` property of the `GainNode` interface is an a-rate `AudioParam` representing the amount of gain to apply.

## Value

An `AudioParam`.

> **Note:**
> Though the `AudioParam` returned is read-only, the value it represents is not.

## Examples

See `BaseAudioContext.createGain()` for example code showing how to use an `AudioContext` to create a `GainNode`, which is then used to mute and unmute the audio by changing the gain property value.

## See also

- Using the Web Audio API
