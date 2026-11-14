---
title: "ChannelSplitterNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/channelsplitternode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ChannelSplitterNode

The `ChannelSplitterNode` interface, often used in conjunction with its opposite, `ChannelMergerNode`, separates the different channels of an audio source into a set of mono outputs. This is useful for accessing each channel separately, e.g., for performing channel mixing where gain must be separately controlled on each channel.

If your `ChannelSplitterNode` always has one single input, the amount of outputs is defined by a parameter on its constructor and the call to `AudioContext.createChannelSplitter()`. In the case that no value is given, it will default to `6`. If there are fewer channels in the input than there are outputs, supernumerary outputs are silent.

       | Number of inputs
       | `1`

       | Number of outputs
       | variable; defaults to `6`.

       | Channel count mode
       |
        `"explicit"`. Older implementations, as per earlier versions
        of the spec use `"max"`.

       | Channel count
       |
        Fixed to the number of outputs. Older implementations, as per earlier
        versions of the spec use `2` (not used in the default count
        mode).

       | Channel interpretation
       | `"discrete"`

## Constructor

- `ChannelSplitterNode()`
    Creates a new `ChannelSplitterNode` object instance.

## Instance properties

_No specific property; inherits properties from its parent, `AudioNode`_.

## Instance methods

_No specific method; inherits methods from its parent, `AudioNode`_.

## Example

See `BaseAudioContext.createChannelSplitter()` for example code.

## See also

- Using the Web Audio API
