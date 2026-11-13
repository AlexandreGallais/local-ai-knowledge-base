---
title: "WaveShaperNode: WaveShaperNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/waveshapernode/waveshapernode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WaveShaperNode: WaveShaperNode() constructor

The **`WaveShaperNode()`** constructor
of the Web Audio API creates a new
`WaveShaperNode` object which is an `AudioNode` that
represents a non-linear distorter.

## Syntax

```js
new WaveShaperNode(context, options)
```

### Parameters

- `context`
    A reference to an `AudioContext`.
- `options` (optional)
    Options are as follows:
    - `curve`
        The shaping curve used for the waveshaping effect. The input
        signal is nominally within the range \[-1;1].
    - `oversample`
        Specifies what type of oversampling (if any) should be
        used when applying the shaping curve. Valid values are `"none"`,
        `"2x"`, or `"4x"`. The default is `"none"`.
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

A new `WaveShaperNode` object instance.
