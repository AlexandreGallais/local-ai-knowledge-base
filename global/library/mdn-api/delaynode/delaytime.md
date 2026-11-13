---
title: "DelayNode: delayTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/delaynode/delaytime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DelayNode: delayTime property

The `delayTime` property of the `DelayNode` interface is an a-rate `AudioParam` representing the amount of delay to apply.

`delayTime` is expressed in seconds, its minimal value is `0`, and its maximum value is defined by the `maxDelayTime` argument of the `BaseAudioContext.createDelay` method that created it.

> **Note:**
> Though the `AudioParam` returned is read-only, the value it represents is not.

## Value

An `AudioParam`.

## Examples

See `BaseAudioContext.createDelay()` for example code.

## See also

- Using the Web Audio API
