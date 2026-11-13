---
title: "MediaElementAudioSourceNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediaelementaudiosourcenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaElementAudioSourceNode

The `MediaElementAudioSourceNode` interface represents an audio source consisting of an HTML `<audio>` or `` element. It is an `AudioNode` that acts as an audio source.

A `MediaElementAudioSourceNode` has no inputs and exactly one output, and is created using the `AudioContext.createMediaElementSource()` method. The number of channels in the output equals the number of channels of the audio referenced by the `HTMLMediaElement` used in the creation of the node, or is 1 if the `HTMLMediaElement` has no audio.

       | Number of inputs
       | `0`

       | Number of outputs
       | `1`

       | Channel count
       |
        2 (but note that `AudioNode.channelCount` is only used for up-mixing and down-mixing `AudioNode` inputs, and `MediaElementAudioSourceNode` doesn't have any input)

## Constructor

- `MediaElementAudioSourceNode()`
    Creates a new `MediaElementAudioSourceNode` object instance.

## Instance properties

_Inherits properties from its parent, `AudioNode`_.

- `mediaElement` (read-only)
    The `HTMLMediaElement` used when constructing this `MediaStreamAudioSourceNode`.

## Instance methods

_Inherits methods from its parent, `AudioNode`_.

## Example

See `AudioContext.createMediaElementSource()` for example code.

## See also

- Using the Web Audio API
