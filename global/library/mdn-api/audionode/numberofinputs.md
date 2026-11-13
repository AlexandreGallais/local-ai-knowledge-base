---
title: "AudioNode: numberOfInputs property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audionode/numberofinputs/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioNode: numberOfInputs property

The **`numberOfInputs`** read-only property of the `AudioNode` interface returns the number of inputs feeding the node. Source nodes are defined as nodes having a `numberOfInputs` property with a value of 0.

## Value

An integer ≥ 0.

## Examples

```js
const audioCtx = new AudioContext();

const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

oscillator.connect(gainNode).connect(audioCtx.destination);

console.log(oscillator.numberOfInputs); // 0
console.log(gainNode.numberOfInputs); // 1
console.log(audioCtx.destination.numberOfInputs); // 1
```

## See also

- Using the Web Audio API
