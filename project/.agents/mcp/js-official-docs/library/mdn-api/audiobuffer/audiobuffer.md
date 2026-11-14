---
title: "AudioBuffer: AudioBuffer() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiobuffer/audiobuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioBuffer: AudioBuffer() constructor

The **`AudioBuffer`** constructor of
the Web Audio API creates a new
`AudioBuffer` object.

## Syntax

```js
new AudioBuffer(options)
```

### Parameters

- `options`
    Options are as follows:
    - `length`
        The size of the audio buffer in sample-frames. To determine
        the `length` to use for a specific number of seconds of audio, use
        `numSeconds * sampleRate`.
    - `numberOfChannels`
        The number of channels for the buffer. The
        default is 1, and all user agents are required to support at least 32 channels.
    - `sampleRate`
        The sample rate in Hz for the buffer. User agents are required to support sample rates from 3,000 Hz to 768,000 Hz, inclusive.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if one or more of the options are negative or otherwise has an invalid value
    (such as `numberOfChannels` being higher than supported,
    or a `sampleRate` outside the nominal range).
- `RangeError`
    Thrown if there isn't enough memory available to allocate the buffer.
