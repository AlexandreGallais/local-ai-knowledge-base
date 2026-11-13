---
title: "OscillatorNode: OscillatorNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oscillatornode/oscillatornode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OscillatorNode: OscillatorNode() constructor

The **`OscillatorNode()`** constructor of the Web Audio API creates a new
`OscillatorNode` object which is an `AudioNode` that
represents a periodic waveform, like a sine wave, optionally setting the node's
properties' values to match values in a specified object.

If the default values of the properties are acceptable, you can optionally use the
`BaseAudioContext.createOscillator()` factory method instead; see
Creating an AudioNode.

## Syntax

```js
new OscillatorNode(context, options)
```

### Parameters

- `context`
    A reference to an `AudioContext`.
- `options` (optional)
    An object whose properties specify the initial values for the oscillator node's
    properties. Any properties omitted from the object will take on the default value
    as documented.
    - `type`
        The shape of the wave produced by the node. Valid values are
        `"sine"`, `"square"`, `"sawtooth"`,
        `"triangle"` and `"custom"`. The default is
        `"sine"`.
    - `detune`
        A detuning value (in cents) which will offset
        the `frequency` by the given amount. Its default is 0.
    - `frequency`
        The frequency (in hertz) of the periodic
        waveform. Its default is 440.
    - `periodicWave`
        An arbitrary period waveform described by a `PeriodicWave`
        object.
    - `channelCount`
        Represents an integer used to determine how many channels are used when up-mixing and down-mixing connections to any inputs to the node. (See
        `AudioNode.channelCount` for more information.) Its usage and precise
        definition depend on the value of `channelCountMode`.
    - `channelCountMode`
        Represents an enumerated value describing the way channels must be matched between
        the node's inputs and outputs. (See `AudioNode.channelCountMode` for more
        information including default values.)
    - `channelInterpretation`
        Represents an enumerated value describing the meaning of the channels. This
        interpretation will define how audio up-mixing and down-mixing will happen.
        The possible values are `"speakers"` or `"discrete"`. (See
        `AudioNode.channelCountMode` for more information including default
        values.)

### Return value

A new `OscillatorNode` object instance.
