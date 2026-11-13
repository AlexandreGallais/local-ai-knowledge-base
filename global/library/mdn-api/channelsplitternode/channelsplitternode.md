---
title: "ChannelSplitterNode: ChannelSplitterNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/channelsplitternode/channelsplitternode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ChannelSplitterNode: ChannelSplitterNode() constructor

The **`ChannelSplitterNode()`** constructor of the Web Audio API creates a new `ChannelSplitterNode` object instance, representing a node that splits the input into a separate output for each of the source node's audio channels.

## Syntax

```js
new ChannelSplitterNode(context)
new ChannelSplitterNode(context, options)
```

### Parameters

- `context`
    A `BaseAudioContext` representing the audio context you want the node to be associated with.
- `options` (optional)
    An object defining the properties you want the `ChannelSplitterNode` to have:
    - `numberOfOutputs` (optional)
        A number defining the number of outputs the `ChannelSplitterNode` should have. If not specified, the default value used is 6.
    - `channelCount` (optional)
        An integer used to determine how many channels are used when up-mixing and down-mixing connections to any inputs to the node.
        (See `AudioNode.channelCount` for more information.)
        Its usage and precise definition depend on the value of `channelCountMode`.
    - `channelCountMode` (optional)
        A string describing the way channels must be matched between the node's inputs and outputs.
        (See `AudioNode.channelCountMode` for more information including default values.)
    - `channelInterpretation` (optional)
        A string describing the meaning of the channels.
        This interpretation will define how audio up-mixing and down-mixing will happen.
        The possible values are `"speakers"` or `"discrete"`.
        (See `AudioNode.channelCountMode` for more information including default values.)

### Return value

A new `ChannelSplitterNode` object instance.

## Examples

```js
const ac = new AudioContext();

const options = {
  numberOfOutputs: 2,
};

const mySplitter = new ChannelSplitterNode(ac, options);
```
