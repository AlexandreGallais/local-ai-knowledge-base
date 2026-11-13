---
title: "IIRFilterNode: IIRFilterNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/iirfilternode/iirfilternode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IIRFilterNode: IIRFilterNode() constructor

The **`IIRFilterNode()`** constructor
of the Web Audio API creates a new
`IIRFilterNode` object which an `AudioNode` processor
which implements a general infinite impulse response filter.

## Syntax

```js
new IIRFilterNode(context, options)
```

### Parameters

- `context`
    A reference to an `AudioContext`.
- `options`
    Options are as follows:
    - `feedforward`
        A sequence of feedforward coefficients.
    - `feedback`
        A sequence of feedback coefficients.
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

Unlike other nodes in the Web Audio API, the options passed into the IIR
filter upon creation are not optional. The filter needs these values to work and with
the vast range of filters available, there is no default.

### Return value

A new `IIRFilterNode` object instance.

## Examples

```js
let feedForward = [0.00020298, 0.0004059599, 0.00020298];
let feedBackward = [1.0126964558, -1.9991880801, 0.9873035442];

const audioCtx = new AudioContext();

const iirFilter = new IIRFilterNode(audioCtx, {
  feedforward: feedForward,
  feedback: feedBackward,
});
```
