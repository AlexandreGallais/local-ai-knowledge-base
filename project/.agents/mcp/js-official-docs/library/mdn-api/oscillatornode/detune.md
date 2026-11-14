---
title: "OscillatorNode: detune property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oscillatornode/detune/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OscillatorNode: detune property

The `detune` property of the `OscillatorNode` interface is an a-rate `AudioParam` representing detuning of oscillation in cents.

> **Note:**
> Though the `AudioParam` returned is read-only, the value it represents is not.

## Value

An a-rate `AudioParam`.

## Examples

The following example shows basic usage of an `AudioContext` to create an oscillator node. For applied examples/information, check out our Violent Theremin demo (see app.js for relevant code).

```js
// create web audio api context
const audioCtx = new AudioContext();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

oscillator.type = "square";
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
oscillator.detune.setValueAtTime(100, audioCtx.currentTime); // value in cents
oscillator.start();
```

## See also

- Using the Web Audio API
