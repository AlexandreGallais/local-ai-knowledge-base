---
title: "Basic concepts behind Web Audio API (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_audio_api/basic_concepts_behind_web_audio_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Basic concepts behind Web Audio API

This article explains some of the audio theory behind how the features of the Web Audio API work to help you make informed decisions while designing how your app routes audio. If you are not already a sound engineer, it will give you enough background to understand why the Web Audio API works as it does.

## Audio graphs

An **audio graph** (or audio routing graph) is a network of connected audio nodes, contained inside an `AudioContext`, which the Web Audio API uses to process and produce sound. Each node does one specific job, and multiple nodes are connected together to build a signal path from a source to a destination, usually the speakers. This modular design provides the flexibility to create complex audio functions with dynamic effects.

Several sources with different channel layouts are supported, even within a single context.

Audio nodes are linked via their inputs and outputs, forming a chain that starts with one or more sources, goes through one or more nodes, then ends up at a destination (although you don't have to provide a destination if you only want to visualize some audio data). A simple, typical workflow for web audio would look something like this:

1. Create the audio context.
2. Create audio sources inside the context (such as `<audio>`, an oscillator, or stream).
3. Create audio effects (such as the reverb, biquad filter, panner, or compressor nodes).
4. Choose the final destination for the audio (such as the user's computer speakers).
5. Connect the source nodes to zero or more effect nodes and then to the chosen destination.

> **Note:**
> The channel notation is a numeric value, such as _2.0_ or _5.1_, representing the number of audio channels available on a signal. The first number is the number of full frequency range audio channels the signal includes. The number appearing after the period indicates the number of those channels reserved for low-frequency effect (LFE) outputs; these are often called **subwoofers**.

Each input or output is composed of one or more audio **channels**, which together represent a specific audio layout. Any discrete channel structure is supported, including _mono_, _stereo_, _quad_, _5.1_, and so on.

You have several ways to obtain audio:

- Sound can be generated directly in JavaScript by an audio node (such as an oscillator).
- It can be created from raw PCM data (such as .WAV files or other formats supported by `decodeAudioData()`).
- It can be generated from HTML media elements, such as `` or `<audio>`.
- It can be obtained from a WebRTC `MediaStream`, such as a webcam or microphone.

## Audio data: what's in a sample

When an audio signal is processed, sampling happens. **Sampling** is the conversion of a continuous signal to a discrete signal. Put another way, a continuous sound wave, such as a band playing live, is converted into a sequence of digital samples (a discrete-time signal) that allows a computer to handle the audio in distinct blocks.

You'll find more information on the Wikipedia page _Sampling (signal processing)_.

## Audio buffers: frames, samples, and channels

An `AudioBuffer` is defined with three parameters:

- the number of channels (1 for mono, 2 for stereo, six for 5.1, etc.),
- its length, meaning the number of sample frames inside the buffer,
- and the sample rate, the number of sample frames played per second.

Some important definitions:

- A _sample_ is a single 32-bit floating point value representing the value of the audio stream at each specific moment in time within a particular channel (left or right, if in the case of stereo).
- A _frame_, or _sample frame_, is the set of all values for all channels that will play at a specific moment in time (again, 1 for mono, there will be 2 for stereo...).
- The _sample rate_ is the quantity of those samples (or frames, since all samples of a frame play at the same time) that will play in one second, measured in Hz. The higher the sample rate, the better the sound quality.

Let's look at a _mono_ and a _stereo_ audio buffer, each one second long at a rate of 44100Hz:

- The _mono_ buffer will have 44,100 samples and 44,100 frames. The `length` property will be 44,100.
- The _stereo_ buffer will have 88,200 samples but still 44,100 frames. The `length` property will still be 44100 since it equals the number of frames.

When a buffer plays, you will first hear the leftmost sample frame, then the one right next to it, then the next, _and so on_, until the end of the buffer. In the case of stereo, you will hear both channels simultaneously. Sample frames are handy because they are independent of the number of channels and represent time in an ideal way for precise audio manipulation.

> **Note:**
> To get a time in seconds from a frame count, divide the number of frames by the sample rate. To get the number of frames from the number of samples, you only need to divide the latter value by the channel count.

Here are a couple of simple examples:

```js
const buffer = new AudioBuffer({
  numberOfChannels: 2,
  length: 22050,
  sampleRate: 44100,
});
```

> **Note:**
> In digital audio, **44,100 Hz** (alternately represented as **44.1 kHz**) is a common sampling frequency. Why 44.1 kHz?
>
> Firstly, because the hearing range of human ears is roughly 20 Hz to 20,000 Hz. Via the Nyquist–Shannon sampling theorem, the sampling frequency must be greater than twice the maximum frequency one wishes to reproduce. Therefore, the sampling rate has to be _greater_ than 40,000 Hz.
>
> Secondly, signals must be low-pass <example-value> before sampling, otherwise aliasing occurs. While an ideal low-pass <example-value> would perfectly pass <example-value> below 20 kHz (without attenuating them) and perfectly cut off frequencies above 20 kHz, in practice, a transition band is necessary, where frequencies are partly attenuated. The wider this transition band is, the easier and more economical it is to make an anti-aliasing filter. The 44.1 kHz sampling frequency allows for a 2.05 kHz transition band.

If you use this call above, you will get a stereo buffer with two channels that, when played back on an `AudioContext` running at 44100 Hz (very common, most normal sound cards run at this rate), will last for 0.5 seconds: 22,050 frames/44,100 Hz = 0.5 seconds.

```js
const buffer = new AudioBuffer({
  numberOfChannels: 1,
  length: 22050,
  sampleRate: 22050,
});
```

If you use this call, you will get a mono buffer (single-channel buffer) that, when played back on an `AudioContext` running at 44,100 Hz, will be automatically _resampled_ to 44,100 Hz (and therefore yield 44,100 frames), and last for 1.0 second: 44,100 frames/44,100 Hz = 1 second.

> **Note:**
> Audio resampling is very similar to image resizing. Say you've got a 16 x 16 image but want it to fill a 32 x 32 area. You resize (or resample) it. The result has less quality (it can be blurry or edgy, depending on the resizing algorithm), but it works, with the resized image taking up less space. Resampled audio is the same: you save space, but, in practice, you cannot correctly reproduce high-frequency content or treble sound.

### Planar versus interleaved buffers

The Web Audio API uses a planar buffer format. The left and right channels are stored like this:

```plain
LLLLLLLLLLLLLLLLRRRRRRRRRRRRRRRR (for a buffer of 16 frames)
```

This structure is widespread in audio processing, making it easy to process each channel independently.

The alternative is to use an interleaved buffer format:

```plain
LRLRLRLRLRLRLRLRLRLRLRLRLRLRLRLR (for a buffer of 16 frames)
```

This format is prevalent for storing and playing back audio without much processing, for example: .WAV files or a decoded MP3 stream.

Because the Web Audio API is designed for processing, it exposes _only_ planar buffers. It uses the planar format but converts the audio to the interleaved format when it sends it to the sound card for playback. Conversely, when the API decodes an MP3, it starts with the interleaved format and converts it to the planar format for processing.
