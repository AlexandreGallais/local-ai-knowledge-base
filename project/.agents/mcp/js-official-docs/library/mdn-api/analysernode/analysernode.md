---
title: "AnalyserNode: AnalyserNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/analysernode/analysernode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnalyserNode: AnalyserNode() constructor

The **`AnalyserNode()`** constructor of the Web Audio API creates a new `AnalyserNode` object instance.

## Syntax

```js
new AnalyserNode(context)
new AnalyserNode(context, options)
```

### Parameters

- `context`
    A reference to an `AudioContext` or `OfflineAudioContext`.
- `options` (optional)
    An object with the following properties, all optional:
    - `fftSize`
        The desired initial size of the FFT for frequency-domain analysis.
        The default is `2048`.
    - `maxDecibels`
        The desired initial maximum power in dB for FFT analysis.
        The default is `-30`.
    - `minDecibels`
        The desired initial minimum power in dB for FFT analysis.
        The default is `-100`.
    - `smoothingTimeConstant`
        The desired initial smoothing constant for the FFT analysis. The default is `0.8`.
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

## See also

- `BaseAudioContext.createAnalyser()`, the equivalent factory method
