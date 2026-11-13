---
title: "ConvolverNode: ConvolverNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/convolvernode/convolvernode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ConvolverNode: ConvolverNode() constructor

The **`ConvolverNode()`** constructor of the Web Audio API creates a new
`ConvolverNode` object instance.

## Syntax

```js
new ConvolverNode(context, options)
```

### Parameters

- `context`
    A reference to an `AudioContext`.
- `options` (optional)
    Options are as follows:
    - `buffer`
        A mono, stereo, or
        4-channel `AudioBuffer` containing the
        (possibly multichannel) impulse response used by the `ConvolverNode`
        to create the reverb effect.
    - `disableNormalization`
        A boolean value controlling
        whether the impulse response from the buffer will be scaled by an equal-power
        normalization, or not. The default is `false`.
    - `channelCount`
        Represents an integer used to determine how many channels are used
        when up-mixing and down-mixing connections to any inputs to the node.
        (See `AudioNode.channelCount` for more information.)
        Its usage and precise definition depend on the value of `channelCountMode`.
    - `channelCountMode`
        Represents an enumerated value describing the way channels must be matched between the node's inputs and outputs.
        (See `AudioNode.channelCountMode` for more information including default values.)
    - `channelInterpretation`
        Represents an enumerated value describing the meaning of the channels.
        This interpretation will define how audio up-mixing and down-mixing will happen.
        The possible values are `"speakers"` or `"discrete"`.
        (See `AudioNode.channelCountMode` for more information including default values.)

### Return value

A new `ConvolverNode` object instance.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the referenced `AudioBuffer` does not have the
    correct number of channels, or it has a different sample rate to the
    associated `AudioContext`.
