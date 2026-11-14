---
title: "ChannelMergerNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/channelmergernode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ChannelMergerNode

The `ChannelMergerNode` interface, often used in conjunction with its opposite, `ChannelSplitterNode`, reunites different mono inputs into a single output. Each input is used to fill a channel of the output. This is useful for accessing each channel separately, e.g., for performing channel mixing where gain must be separately controlled on each channel.

If `ChannelMergerNode` has one single output, but as many inputs as there are channels to merge; the number of inputs is defined as a parameter of its constructor and the call to `AudioContext.createChannelMerger()`. In the case that no value is given, it will default to `6`.

Using a `ChannelMergerNode`, it is possible to create outputs with more channels than the rendering hardware is able to process. In that case, when the signal is sent to the `AudioContext.listener` object, supernumerary channels will be ignored.

       | Number of inputs
       | variable; defaults to `6`.

       | Number of outputs
       | `1`

       | Channel count mode
       | `"explicit"`

       | Channel count
       | `2` (not used in the default count mode)

       | Channel interpretation
       | `"speakers"`

## Constructor

- `ChannelMergerNode()`
    Creates a new `ChannelMergerNode` object instance.

## Instance properties

_No specific property; inherits properties from its parent, `AudioNode`_.

## Instance methods

_No specific method; inherits methods from its parent, `AudioNode`_.

## Example

See `BaseAudioContext.createChannelMerger()` for example code.

## See also

- Using the Web Audio API
