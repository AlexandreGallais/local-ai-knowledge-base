---
title: "AudioProcessingEvent: AudioProcessingEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioprocessingevent/audioprocessingevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioProcessingEvent: AudioProcessingEvent() constructor

The **`AudioProcessingEvent()`** constructor creates a new `AudioProcessingEvent` object.

> **Note:**
> Usually, this constructor is not directly called by your code, as the browser creates these objects itself and provides them to the event handler.

## Syntax

```js
new AudioProcessingEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `audioprocess`.
- `options`
    An object that has the following properties:
    - `playbackTime`
        A number representing the time when the audio will be played.
    - `inputBuffer`
        An `AudioBuffer` containing the input audio data.
    - `outputBuffer`
        An `AudioBuffer` where the output audio data will be written.

### Return value

A new `AudioProcessingEvent`.

## See also

- `AudioProcessingEvent`
- `ScriptProcessorNode`
