---
title: "AudioWorklet"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioworklet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioWorklet

The **`AudioWorklet`** interface of the Web Audio API is used to supply custom audio processing scripts that execute in a separate thread to provide very low latency audio processing.

The worklet's code is run in the `AudioWorkletGlobalScope` global execution context, using a separate Web Audio thread which is shared by the worklet and other audio nodes.

Access the audio context's instance of `AudioWorklet` through the `BaseAudioContext.audioWorklet` property.

## Instance properties

_This interface also inherits properties defined on its parent interface, `Worklet`._

- `port` (read-only) (experimental)
    Returns a `MessagePort` for custom, asynchronous communication between code in the main thread and the global scope of an audio worklet.
    This allows for custom messages, such as sending and receiving control data or global settings.

## Instance methods

_This interface inherits methods from `Worklet`. The `AudioWorklet` interface does not define any methods of its own._

## Events

_`AudioWorklet` has no events to which it responds._

## Examples

See `AudioWorkletNode` for complete examples of custom audio node creation.

## See also

- `AudioWorkletGlobalScope` — the global execution context of an `AudioWorklet`
- Web Audio API
- Using the Web Audio API
- Using AudioWorklet
