---
title: "ChannelMergerNode: ChannelMergerNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/channelmergernode/channelmergernode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ChannelMergerNode: ChannelMergerNode() constructor

The **`ChannelMergerNode()`** constructor creates a new `ChannelMergerNode` object instance.

## Syntax

```js
new ChannelMergerNode(context)
new ChannelMergerNode(context, options)
```

### Parameters

- `context`
    A `BaseAudioContext` representing the audio context you want the node to be associated with.
- `options` (optional)
    An object defining the properties you want the `ChannelMergerNode` to have:
    - `numberOfInputs` (optional)
        A number defining the number of inputs the `ChannelMergerNode` should have. If not specified, the default value used is 6.
    - `channelCount` (optional)
        An integer used to determine how many channels are used when up-mixing and down-mixing connections to any inputs to the node.
        (See `AudioNode.channelCount` for more information.)
        Its usage and precise definition depend on the value of `channelCountMode`.
    - `channelCountMode` (optional)
        A string describing the way channels must be matched between
        the node's inputs and outputs. (See `AudioNode.channelCountMode` for more
        information including default values.)
    - `channelInterpretation` (optional)
        A string describing the meaning of the channels.
        This interpretation will define how audio
        up-mixing and down-mixing will happen.
        The possible values are `"speakers"` or `"discrete"`.
        (See `AudioNode.channelCountMode` for more information including default values.)

### Return value

A new `ChannelMergerNode` object instance.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if an option such as `channelCount` or `channelCountMode` has been given an invalid value.

## Examples

```js
const ac = new AudioContext();

const options = {
  numberOfInputs: 2,
};

const myMerger = new ChannelMergerNode(ac, options);
```
