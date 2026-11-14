---
title: "AudioDestinationNode: maxChannelCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodestinationnode/maxchannelcount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioDestinationNode: maxChannelCount property

The `maxChannelCount` property of the `AudioDestinationNode` interface is an `unsigned long` defining the maximum amount of channels that the physical device can handle.

The `AudioNode.channelCount` property can be set between 0 and this value (both included). If `maxChannelCount` is `0`, like in `OfflineAudioContext`, the channel count cannot be changed.

## Value

An `unsigned long`.

## Examples

The following would set up an audio graph, featuring an `AudioDestinationNode` with `maxChannelCount` of 2:

```js
const audioCtx = new AudioContext();
const source = audioCtx.createMediaElementSource(myMediaElement);
source.connect(gainNode);
audioCtx.destination.maxChannelCount = 2;
gainNode.connect(audioCtx.destination);
```

To see a more complete implementation, check out one of our MDN Web Audio examples, such as Voice-change-o-matic or Violent Theremin.

## See also

- Using the Web Audio API
