---
title: "AudioContext"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiocontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioContext

The `AudioContext` interface represents an audio-processing graph built from audio modules linked together, each represented by an `AudioNode`.

An audio context controls both the creation of the nodes it contains and the execution of the audio processing, or decoding. You need to create an `AudioContext` before you do anything else, as everything happens inside a context. It's recommended to create one AudioContext and reuse it instead of initializing a new one each time, and it's OK to use a single `AudioContext` for several different audio sources and pipeline concurrently.

## Constructor

- `AudioContext()`
    Creates and returns a new `AudioContext` object.

## Instance properties

_Also inherits properties from its parent interface, `BaseAudioContext`._

- `AudioContext.baseLatency` (read-only)
    Returns the number of seconds of processing latency incurred by the `AudioContext` passing the audio from the `AudioDestinationNode` to the audio subsystem.
- `AudioContext.outputLatency` (read-only)
    Returns an estimation of the output latency of the current audio context.
- `AudioContext.playbackStats` (read-only) (experimental)
    Returns an `AudioPlaybackStats` object providing access to duration, underrun, and latency statistics for the `AudioContext`.
- `AudioContext.sinkId` (read-only) (experimental) (secure context)
    Returns the sink ID of the current output audio device.

## Instance methods

_Also inherits methods from its parent interface, `BaseAudioContext`._

- `AudioContext.close()`
    Closes the audio context, releasing any system audio resources that it uses.
- `AudioContext.createMediaElementSource()`
    Creates a `MediaElementAudioSourceNode` associated with an `HTMLMediaElement`. This can be used to play and manipulate audio from `` or `<audio>` elements.
- `AudioContext.createMediaStreamSource()`
    Creates a `MediaStreamAudioSourceNode` associated with a `MediaStream` representing an audio stream which may come from the local computer microphone or other sources.
- `AudioContext.createMediaStreamDestination()`
    Creates a `MediaStreamAudioDestinationNode` associated with a `MediaStream` representing an audio stream which may be stored in a local file or sent to another computer.
- `AudioContext.createMediaStreamTrackSource()`
    Creates a `MediaStreamTrackAudioSourceNode` associated with a `MediaStream` representing a media stream track.
- `AudioContext.getOutputTimestamp()`
    Returns a new `AudioTimestamp` object containing two audio timestamp values relating to the current audio context.
- `AudioContext.resume()`
    Resumes the progression of time in an audio context that has previously been suspended/paused.
- `AudioContext.setSinkId()` (experimental) (secure context)
    Sets the output audio device for the `AudioContext`.
- `AudioContext.suspend()`
    Suspends the progression of time in the audio context, temporarily halting audio hardware access and reducing CPU/battery usage in the process.

## Events

- `sinkchange` (experimental)
    Fired when the output audio device (and therefore, the `AudioContext.sinkId`) has changed.

## Examples

Basic audio context declaration:

```js
const audioCtx = new AudioContext();

const oscillatorNode = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();
const finish = audioCtx.destination;
// etc.
```

## See also

- Using the Web Audio API
- `OfflineAudioContext`
