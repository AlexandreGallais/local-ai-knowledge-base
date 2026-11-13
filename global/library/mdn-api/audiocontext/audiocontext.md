---
title: "AudioContext: AudioContext() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiocontext/audiocontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioContext: AudioContext() constructor

The **`AudioContext()`** constructor creates a new `AudioContext` object which represents an audio-processing graph, built from audio modules linked together, each represented by an `AudioNode`.

## Syntax

```js
new AudioContext()
new AudioContext(options)
```

### Parameters

- `options` (optional)
    An object used to configure the context. The available properties are:
    - `latencyHint` (optional)
        Hints at the latency the browser should adopt for the type of playback the context will be used for. The user agent may or may not choose to meet this request;
        check the value of `AudioContext.baseLatency` to determine the true latency after creating the context. Possible values are:
        - `balanced`
            The browser balances audio output latency and power consumption when selecting a latency value.
        - `interactive`
            The audio is involved in interactive elements, such as responding to user actions or needing to coincide with visual cues such as a video or game action. The browser selects the lowest possible latency that doesn't cause glitches in the audio. This is likely to require increased power consumption.
        - `playback`
            The browser selects a latency that will maximize playback time by minimizing power consumption at the expense of latency. Useful for non-interactive playback, such as playing music.
        - A float
            A double-precision floating-point value indicating the preferred maximum latency of the context in seconds.

        If omitted, `latencyHint` defaults to `interactive`.

    - `renderSizeHint` (optional) (experimental)
        Requests a render quantum size for your audio context as a number of audio sample frames (see `renderQuantumSize` for more information). Possible values are:
        - `default`
            Uses the default value of `128`.
        - `hardware`
            Asks the browser to choose a suitable size for the underlying hardware. When `hardware` is specified, the resulting `AudioContext` instance's `renderQuantumSize` will return `0` until its `state` is `running`, to protect against fingerprinting.
        - An integer
            A specific number of frames between `1`, and 6 times the context's `sampleRate` (rounded down if this is not an integer), inclusive. The requested value may not be honored exactly, and you can query the context's `renderQuantumSize` to check the actual selected value.

        If omitted, `renderSizeHint` defaults to `128`.
    - `sampleRate` (optional)
        A float indicating the sample rate to use for the new context, which can range from 3000 to 768000 Hz, inclusive. The most common rate is 44100Hz, which is the sample rate used by CD audio. If the `sampleRate` property is not included in the options, or the options are not specified when creating the audio context, the new context's output device's preferred sample rate is used by default.
    - `sinkId` (optional) (experimental)
        Specifies the sink ID of the audio output device to use for the `AudioContext`. This can take one of the following value types:
        - A string representing the sink ID, retrieved for example via the `deviceId` property of the `MediaDeviceInfo` objects returned by `MediaDevices.enumerateDevices()`.
        - An object representing different options for a sink ID. Currently, this takes a single property, `type`, with a value of `none`. Setting this parameter causes the audio to be processed without being played through any audio output device.

### Return value

A new `AudioContext` instance.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the document is not fully active.
- `NotSupportedError` `DOMException`
    Thrown if:
    - The specified `sampleRate` isn't supported by the context.
    - The specified `renderSizeHint` is an integer outside the range of `1` and 6 times the context's `sampleRate`.

## Usage notes

The specification doesn't go into a lot of detail about things like how many audio contexts a user agent should support, or minimum or maximum latency requirements (if any), so these details can vary from browser to browser. Be sure to check the values if they matter to you.

In particular, the specification doesn't indicate a maximum or minimum number of audio contexts that must be able to be open at the same time, so this is left up to the browser implementations to decide.

### Google Chrome

#### Per-tab audio context limitation in Chrome

Prior to version 66 Google Chrome only supported up to six audio contexts _per tab_ at a time.

#### Non-standard exceptions in Chrome

If the value of the `latencyHint` property isn't valid, Chrome throws a `TypeError` exception with the message "The provided value '...' is not a valid enum value of type AudioContextLatencyCategory".

## Example

This example creates a new `AudioContext` for interactive audio (optimizing for latency), with a sample rate of 44.1kHz and a specific audio output.

```js
const audioCtx = new AudioContext({
  latencyHint: "interactive",
  sampleRate: 44100,
  sinkId: "bb04fea9a8318c96de0bd...", // truncated for brevity
});
```

## See also

- `OfflineAudioContext()` constructor
