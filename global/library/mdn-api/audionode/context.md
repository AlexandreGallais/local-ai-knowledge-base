---
title: "AudioNode: context property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audionode/context/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioNode: context property

The read-only `context` property of the
`AudioNode` interface returns the associated
`BaseAudioContext`, that is the object representing the processing graph
the node is participating in.

## Value

The `AudioContext` or `OfflineAudioContext` object that was
used to construct this `AudioNode`.

## Examples

```js
const audioCtx = new AudioContext();

const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();
oscillator.connect(gainNode).connect(audioCtx.destination);

console.log(oscillator.context); // AudioContext
console.log(oscillator.context === audioCtx); // true
```

## See also

- Using the Web Audio API
