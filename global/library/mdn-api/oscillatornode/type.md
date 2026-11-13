---
title: "OscillatorNode: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oscillatornode/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OscillatorNode: type property

The **`type`** property of the `OscillatorNode` interface specifies what shape of waveform the
oscillator will output. There are several common waveforms available, as well as an
option to specify a custom waveform shape. The shape of the waveform will affect the
tone that is produced.

## Value

A string specifying the shape of oscillator wave. The different
available values are:

- `sine`
    A sine wave. This is the default value.
- `square`
    A square wave with a duty cycle of 0.5; that is, the signal is "high" for half of each period.
- `sawtooth`
    A sawtooth wave.
- `triangle`
    A triangle wave.
- `custom`
    A custom waveform. You never set `type` to `custom` manually;
    instead, use the `setPeriodicWave()`
    method to provide the data representing the waveform. Doing so automatically sets the
    `type` to `custom`.

Also see different oscillator node types for a visualization of the different waveform shapes.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the value `custom` was specified. To set a custom waveform, just call
    `setPeriodicWave()`. Doing so
    automatically sets the type for you.

## Examples

The following example shows basic usage of an `AudioContext` to create
an oscillator node. For an applied example, check out our Violent Theremin demo (see app.js for relevant code).

```js
// create web audio api context
const audioCtx = new AudioContext();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

oscillator.type = "square";
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
oscillator.start();
```

## See also

- Using the Web Audio API
