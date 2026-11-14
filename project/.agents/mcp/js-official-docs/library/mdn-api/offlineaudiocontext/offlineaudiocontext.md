---
title: "OfflineAudioContext: OfflineAudioContext() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/offlineaudiocontext/offlineaudiocontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OfflineAudioContext: OfflineAudioContext() constructor

The **`OfflineAudioContext()`** constructor creates and returns a new `OfflineAudioContext` object instance, which can then be used to render audio to an `AudioBuffer` rather than to an audio output device.

## Syntax

```js
new OfflineAudioContext(options)
new OfflineAudioContext(numberOfChannels, length, sampleRate)
```

### Parameters

- `numberOfChannels`
    An integer specifying the number of channels the resulting `AudioBuffer` should have. This can range from 1 up to the maximum number of channels the implementation supports, inclusive, which is 32 for both Chrome and Firefox. The spec requires browsers to support at least 32.
- `length`
    An integer specifying the size of the buffer to create for the audio context, in sample frames, where one sample frame is a unit that can contain a single sample of
    audio data for every channel in the audio data. For example, a 5-second buffer with a `sampleRate` of 48000Hz would have a length of `5 * 48000 = 240000` sample frames. The `length` must be greater than `0`, and the upper limit is bounded only by the system's available memory.
- `renderSizeHint` (optional) (experimental)
    Requests a render quantum size for your audio context as a number of audio sample frames (see `BaseAudioContext.renderQuantumSize` for more information). Possible values are:
    - `default`
        Uses the default value of `128`.
    - `hardware`
        Asks the browser to choose a suitable size for the underlying hardware. An `OfflineAudioContext` renders audio to an audio buffer, so hardware timing and latency don't apply, therefore specifying `hardware` in this case is equivalent to `default`.
    - An integer
        A specific number of frames between `1`, and 6 times the context's `sampleRate` (rounded down if this is not an integer), inclusive. The requested value may not be honored exactly; you can query the context's `renderQuantumSize` to check the actual selected value.

    If omitted, `renderSizeHint` defaults to `128`.
- `sampleRate`
    The sample rate of the linear audio data in sample frames per second, which can range from 3000 to 768000 Hz, inclusive. The most common rate is 44100Hz, which is the sample rate used by CD audio.

You can specify the parameters for the `OfflineAudioContext()` constructor as positional arguments or properties of an `options` object. Note that you can only specify a `renderSizeHint` value in an `options` object. When using positional arguments, you can only specify `numberOfChannels`, `length`, and `sampleRate`.

Unlike the `AudioContext()` constructor, which has no required arguments, the `OfflineAudioContext()` constructor requires an `options` object or three positional arguments, since it needs to create an `AudioBuffer`. Internally, this is equivalent to creating a new `AudioBuffer` with the `BaseAudioContext.createBuffer()` method.

### Return value

A new `OfflineAudioContext` object whose associated `AudioBuffer` is configured as requested.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the document is not fully active.
- `NotSupportedError` `DOMException`
    Thrown if the specified `numberOfChannels`, `length`, `renderSizeHint`, or `sampleRate` are out of range.

## Examples

### Basic usage

```js
const offlineCtx = new OfflineAudioContext({
  numberOfChannels: 2,
  length: 44100 * 40,
  sampleRate: 44100,
});
const source = offlineCtx.createBufferSource();
// …
```

For a full working example, see our offline-audio-context-promise GitHub repo (see the source code too.)

## See also

- Audio buffers: frames, samples and channels
