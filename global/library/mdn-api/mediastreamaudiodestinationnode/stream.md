---
title: "MediaStreamAudioDestinationNode: stream property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamaudiodestinationnode/stream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamAudioDestinationNode: stream property

The `stream` property of the `AudioContext` interface represents a `MediaStream` containing a single audio `MediaStreamTrack` with the same number of channels as the node itself.

You can use this property to get a stream out of the audio graph and feed it into another construct, such as a Media Recorder.

## Value

A `MediaStream` containing a single audio track. The audio track is a `MediaStreamTrack` whose `kind` is `audio`.

## Examples

See `AudioContext.createMediaStreamDestination()` for example code that creates a `MediaStreamAudioDestinationNode` and uses its `stream` property as a source for audio to be recorded.

## See also

- Using the Web Audio API
