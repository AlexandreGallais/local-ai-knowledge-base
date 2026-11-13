---
title: "MediaStreamTrackAudioSourceNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrackaudiosourcenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrackAudioSourceNode

The **`MediaStreamTrackAudioSourceNode`** interface is a type of `AudioNode` which represents a source of audio data taken from a specific `MediaStreamTrack` obtained through the WebRTC or Media Capture and Streams APIs.

The audio itself might be input from a microphone or other audio sampling device, or might be received through a `RTCPeerConnection`, among other possible options.

A `MediaStreamTrackAudioSourceNode` has no inputs and exactly one output, and is created using the `AudioContext.createMediaStreamTrackSource()` method. This interface is similar to `MediaStreamAudioSourceNode`, except it lets you specifically state the track to use, rather than assuming the first audio track on a stream.

       | Number of inputs
       | `0`

       | Number of outputs
       | `1`

       | Channel count
       |
        defined by the first audio `MediaStreamTrack`
        passed to the
        `AudioContext.createMediaStreamTrackSource()`
        method that created it.

## Constructor

- `MediaStreamTrackAudioSourceNode()`
    Creates a new `MediaStreamTrackAudioSourceNode` object instance with the specified options.

## Instance properties

_The `MediaStreamTrackAudioSourceNode` interface has no properties of its own; however, it inherits the properties of its parent, `AudioNode`._

## Instance methods

_Inherits methods from its parent, `AudioNode`_.

## Example

See `AudioContext.createMediaStreamSource()` for example code that uses this object.

## See also

- Using the Web Audio API
- WebRTC API
- Media Capture and Streams API (Media Streams)
- `MediaStreamAudioSourceNode`
