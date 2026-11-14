---
title: "BaseAudioContext: createOscillator() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/createoscillator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: createOscillator() method

The `createOscillator()` method of the `BaseAudioContext`
interface creates an `OscillatorNode`, a source representing a periodic
waveform. It basically generates a constant tone.

> **Note:**
> The `OscillatorNode()`
> constructor is the recommended way to create an `OscillatorNode`; see
> Creating an AudioNode.

## Syntax

```js
createOscillator()
```

### Parameters

None.

### Return value

An `OscillatorNode`.

## Examples

The following example shows basic usage of an AudioContext to create an oscillator
node. For applied examples/information, check out our Violent Theremin demo (see app.js for relevant code); also see our `OscillatorNode` page for
more information.

```js
// create web audio api context
const audioCtx = new AudioContext();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

oscillator.type = "square";
oscillator.frequency.setValueAtTime(3000, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);
oscillator.start();
```

## See also

- Using the Web Audio API
