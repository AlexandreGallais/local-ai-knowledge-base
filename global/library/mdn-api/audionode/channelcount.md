---
title: "AudioNode: channelCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audionode/channelcount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioNode: channelCount property

The **`channelCount`** property of the `AudioNode` interface represents an integer used to determine how many channels are used when up-mixing and down-mixing connections to any inputs to the node.

`channelCount`'s usage and precise definition depend on the value of `AudioNode.channelCountMode`:

- It is ignored if the `channelCountMode` value is `max`.
- It is used as a maximum value if the `channelCountMode` value is `clamped-max`.
- It is used as the exact value if the `channelCountMode` value is `explicit`.

## Value

An integer.

## Examples

```js
const audioCtx = new AudioContext();

const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

oscillator.channelCount;
```

## See also

- Using the Web Audio API
