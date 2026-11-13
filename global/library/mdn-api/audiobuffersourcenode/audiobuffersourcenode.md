---
title: "AudioBufferSourceNode: AudioBufferSourceNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiobuffersourcenode/audiobuffersourcenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioBufferSourceNode: AudioBufferSourceNode() constructor

The **`AudioBufferSourceNode()`**
constructor creates a new `AudioBufferSourceNode` object instance.

## Syntax

```js
new AudioBufferSourceNode(context, options)
```

### Parameters

- `context`
    A reference to an `AudioContext`.
- `options` (optional)
    Options are as follows:
    - `buffer`
        An instance of `AudioBuffer` to be played.
    - `detune`
        A value in cents to modulate the speed of audio stream rendering. Its nominal range is (-∞ to +∞). The default is `0`.
    - `loop`
        A boolean indicating whether the audio should play in a loop.
        The default is `false`. If the loop is dynamically modified during
        playback, the new value will take effect on the next processing block of audio.
    - `loopEnd`
        An optional value, in seconds, where looping should end if
        the loop attribute is `true`. The default is `0`. Its value
        is exclusive to the content of the loop. The sample frames, comprising the loop,
        run from the values `loopStart` to
        `loopEnd`-(1/`sampleRate`). It's sensible to set this to a
        value between 0 and the duration of the buffer. If `loopEnd` is less
        than 0, looping will end at 0. If `loopEnd` is greater than the
        duration of the buffer, looping will end at the end of the buffer. This attribute
        is converted to an exact sample frame offset within the buffer, by multiplying by
        the buffer's sample rate and rounding to the nearest integer value. Thus, its
        behavior is independent of the value of the `playbackRate` parameter.
    - `loopStart`
        An optional value in seconds, where looping should begin
        if the loop attribute is `true`. The default is `0`. It's
        sensible to set this to a value between 0 and the duration of the buffer. If
        `loopStart` is less than 0, looping will begin at 0. If
        `loopStart` is greater than the duration of the buffer, looping will
        begin at the end of the buffer. This attribute is converted to an exact sample
        frame offset within the buffer, by multiplying by the buffer's sample rate and
        rounding to the nearest integer value. Thus, its behavior is independent of the
        value of the `playbackRate` parameter.
    - `playbackRate`
        The speed at which to render the audio stream. Its
        default value is `1`. This parameter is k-rate. This is a compound
        parameter with detune. Its nominal range is (-∞ to +∞).

### Return value

A new `AudioBufferSourceNode` object instance.
