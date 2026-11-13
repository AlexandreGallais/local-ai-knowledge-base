---
title: "StereoPannerNode: StereoPannerNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stereopannernode/stereopannernode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StereoPannerNode: StereoPannerNode() constructor

The **`StereoPannerNode()`** constructor of the Web Audio API creates a new `StereoPannerNode` object which is an `AudioNode` that represents a simple stereo panner node that can be used to pan an audio stream left or right.

## Syntax

```js
new StereoPannerNode(context, options)
```

### Parameters

- `context`
    A reference to an `AudioContext`.
- `options` (optional)
    Options are as follows:
    - `pan`
        A floating point number in the range \[-1,1] indicating the position of an `AudioNode` in an output image.
        The value -1 represents full left and 1 represents full right.
        The default value is `0`.
    - `channelCount`
        Represents an integer used to determine how many channels are used when up-mixing and down-mixing connections to any inputs to the node.
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

A new `StereoPannerNode` object instance.
