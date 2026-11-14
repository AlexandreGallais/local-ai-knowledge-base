---
title: "GainNode: GainNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gainnode/gainnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GainNode: GainNode() constructor

The **`GainNode()`** constructor of the Web Audio API creates a new
`GainNode` object which is an `AudioNode` that represents a
change in volume.

## Syntax

```js
new GainNode(context, options)
```

### Parameters

- `context`
    A reference to a `BaseAudioContext`, e.g., an `AudioContext`.
- `options` (optional)
    Options are as follows:
    - `gain`
        The amount of gain to apply. This parameter is a- `rate`
        and it's nominal range is (-∞,+∞). The default is `1`.
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
        `AudioNode.channelInterpretation` for more information including default
        values.)

### Return value

A new `GainNode` object instance.
