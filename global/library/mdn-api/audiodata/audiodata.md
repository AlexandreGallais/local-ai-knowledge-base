---
title: "AudioData: AudioData() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodata/audiodata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioData: AudioData() constructor

The **`AudioData()`** constructor creates a new `AudioData` object which represents an individual audio sample.

## Syntax

```js
new AudioData(init)
```

### Parameters

- `init`
    An object containing the following:
    - `format`
        One of:
        - "u8"
        - "s16"
        - "s32"
        - "f32"
        - "u8-planar"
        - "s16-planar"
        - "s32-planar"
        - "f32-planar"
    - `sampleRate`
        A decimal containing the sample rate in Hz.
    - `numberOfFrames`
        An integer containing the number of frames in this sample.
    - `numberOfChannels`
        An integer containing the number of channels in this sample.
    - `timestamp`
        An integer indicating the data's time in microseconds.
    - `data`
        A typed array of the audio data for this sample.
    - `transfer`
        An array of `ArrayBuffer`s that `AudioData` will detach and take ownership of. If the array contains the `ArrayBuffer` backing `data`, `AudioData` will use that buffer directly instead of copying from it.

### Exceptions

- `TypeError`
    Thrown if `init` is in an incorrect format.
