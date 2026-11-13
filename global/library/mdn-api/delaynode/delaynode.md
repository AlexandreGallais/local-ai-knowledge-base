---
title: "DelayNode: DelayNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/delaynode/delaynode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DelayNode: DelayNode() constructor

The **`DelayNode()`**
constructor of the Web Audio API
creates a new `DelayNode` object with a delay-line; an AudioNode
audio-processing module that causes a delay between the arrival of an input data, and
its propagation to the output.

## Syntax

```js
new DelayNode(context)
new DelayNode(context, options)
```

### Parameters

- `context`
    A reference to an `AudioContext` or `OfflineAudioContext`.
- `options` (optional)
    An object specifying the delay node options. Can contain the following members:
    - `delayTime`
        The initial delay time for the node, in seconds. The
        default is `0`.
    - `maxDelayTime`
        The maximum delay time for the node, in seconds.
        Defaults to `1`.
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

A new `DelayNode` object instance.

## Examples

```js
const audioCtx = new AudioContext();
const delayNode = new DelayNode(audioCtx, {
  delayTime: 0.5,
  maxDelayTime: 2,
});
```
