---
title: "MediaStreamAudioDestinationNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamaudiodestinationnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamAudioDestinationNode

The `MediaStreamAudioDestinationNode` interface represents an audio destination consisting of a WebRTC `MediaStream` with a single `AudioMediaStreamTrack`, which can be used in a similar way to a `MediaStream` obtained from `navigator.mediaDevices.getUserMedia()`.

It is an `AudioNode` that acts as an audio destination, created using the `AudioContext.createMediaStreamDestination()` method.

       | Number of inputs
       | `1`

       | Number of outputs
       | `0`

       | Channel count
       | `2`

       | Channel count mode
       | `"explicit"`

       | Channel count interpretation
       | `"speakers"`

## Constructor

- `MediaStreamAudioDestinationNode()`
    Creates a new `MediaStreamAudioDestinationNode` object instance.

## Instance properties

_Inherits properties from its parent, `AudioNode`_.

- `MediaStreamAudioDestinationNode.stream` (read-only)
    A `MediaStream` containing a single `MediaStreamTrack` whose `kind` is `audio` and with the same number of channels as the node. You can use this property to get a stream out of the audio graph and feed it into another construct, such as a Media Recorder.

## Instance methods

_Inherits methods from its parent, `AudioNode`_.

## Example

See `AudioContext.createMediaStreamDestination()` for example code that creates a `MediaStreamAudioDestinationNode` and uses it as a source for audio to be recorded.

## See also

- Using the Web Audio API
