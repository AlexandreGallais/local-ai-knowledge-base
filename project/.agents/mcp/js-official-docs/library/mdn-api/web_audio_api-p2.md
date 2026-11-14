---
title: "Web Audio API (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_audio_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Audio API (part 2 of 2)

## Web Audio API interfaces

The Web Audio API has a number of interfaces and associated events, which we have split up into nine categories of functionality.

### General audio graph definition

General containers and definitions that shape audio graphs in Web Audio API usage.

- `AudioContext`
    The **`AudioContext`** interface represents an audio-processing graph built from audio modules linked together, each represented by an `AudioNode`. An audio context controls the creation of the nodes it contains and the execution of the audio processing, or decoding. You need to create an `AudioContext` before you do anything else, as everything happens inside a context.
- `AudioNode`
    The **`AudioNode`** interface represents an audio-processing module like an _audio source_ (e.g., an HTML `<audio>` or `` element), _audio destination_, _intermediate processing module_ (e.g., a filter like `BiquadFilterNode`, or _volume control_ like `GainNode`).
- `AudioParam`
    The **`AudioParam`** interface represents an audio-related parameter, like one of an `AudioNode`. It can be set to a specific value or a change in value, and can be scheduled to happen at a specific time and following a specific pattern.
- `AudioParamMap`
    Provides a map-like interface to a group of `AudioParam` interfaces, which means it provides the methods `forEach()`, `get()`, `has()`, `keys()`, and `values()`, as well as a `size` property.
- `BaseAudioContext`
    The **`BaseAudioContext`** interface acts as a base definition for online and offline audio-processing graphs, as represented by `AudioContext` and `OfflineAudioContext` respectively. You wouldn't use `BaseAudioContext` directly — you'd use its features via one of these two inheriting interfaces.
- The `ended` event
    The `ended` event is fired when playback has stopped because the end of the media was reached.

### Defining audio sources

Interfaces that define audio sources for use in the Web Audio API.

- `AudioScheduledSourceNode`
    The **`AudioScheduledSourceNode`** is a parent interface for several types of audio source node interfaces. It is an `AudioNode`.
- `OscillatorNode`
    The **`OscillatorNode`** interface represents a periodic waveform, which can be sine, square, sawtooth, triangle, or custom. It is an `AudioNode` audio-processing module that causes a given _frequency_ of wave to be created.
- `AudioBuffer`
    The **`AudioBuffer`** interface represents a short audio asset residing in memory, created from an audio file using the `BaseAudioContext.decodeAudioData` method, or created with raw data using `BaseAudioContext.createBuffer`. Once decoded into this form, the audio can then be put into an `AudioBufferSourceNode`.
- `AudioBufferSourceNode`
    The **`AudioBufferSourceNode`** interface represents an audio source consisting of in-memory audio data, stored in an `AudioBuffer`. It is an `AudioNode` that acts as an audio source.
- `MediaElementAudioSourceNode`
    The **`MediaElementAudioSourceNode`** interface represents an audio source consisting of an HTML `<audio>` or `` element. It is an `AudioNode` that acts as an audio source.
- `MediaStreamAudioSourceNode`
    The **`MediaStreamAudioSourceNode`** interface represents an audio source consisting of a `MediaStream` (such as a webcam, microphone, or a stream being sent from a remote computer). If multiple audio tracks are present on the stream, the track whose `id` comes first lexicographically (alphabetically) is used. It is an `AudioNode` that acts as an audio source.
- `MediaStreamTrackAudioSourceNode`
    A node of type `MediaStreamTrackAudioSourceNode` represents an audio source whose data comes from a `MediaStreamTrack`. When creating the node using the `createMediaStreamTrackSource()` method to create the node, you specify which track to use. This provides more control than `MediaStreamAudioSourceNode`.

### Defining audio effects filters

Interfaces for defining effects that you want to apply to your audio sources.

- `BiquadFilterNode`
    The **`BiquadFilterNode`** interface represents a simple low-order filter. It is an `AudioNode` that can represent different kinds of filters, tone control devices, or graphic equalizers. A `BiquadFilterNode` always has exactly one input and one output.
- `ConvolverNode`
    The **`ConvolverNode`** interface is an `AudioNode` that performs a Linear Convolution on a given `AudioBuffer`, and is often used to achieve a reverb effect.
- `DelayNode`
    The **`DelayNode`** interface represents a delay-line; an `AudioNode` audio-processing module that causes a delay between the arrival of an input data and its propagation to the output.
- `DynamicsCompressorNode`
    The **`DynamicsCompressorNode`** interface provides a compression effect, which lowers the volume of the loudest parts of the signal in order to help prevent clipping and distortion that can occur when multiple sounds are played and multiplexed together at once.
- `GainNode`
    The **`GainNode`** interface represents a change in volume. It is an `AudioNode` audio-processing module that causes a given _gain_ to be applied to the input data before its propagation to the output.
- `WaveShaperNode`
    The **`WaveShaperNode`** interface represents a non-linear distorter. It is an `AudioNode` that use a curve to apply a waveshaping distortion to the signal. Beside obvious distortion effects, it is often used to add a warm feeling to the signal.
- `PeriodicWave`
    Describes a periodic waveform that can be used to shape the output of an `OscillatorNode`.
- `IIRFilterNode`
    Implements a general infinite impulse response (IIR) filter; this type of filter can be used to implement tone-control devices and graphic equalizers as well.

### Defining audio destinations

Once you are done processing your audio, these interfaces define where to output it.

- `AudioDestinationNode`
    The **`AudioDestinationNode`** interface represents the end destination of an audio source in a given context — usually the speakers of your device.
- `MediaStreamAudioDestinationNode`
    The **`MediaStreamAudioDestinationNode`** interface represents an audio destination consisting of a WebRTC `MediaStream` with a single `AudioMediaStreamTrack`, which can be used in a similar way to a `MediaStream` obtained from `getUserMedia()`. It is an `AudioNode` that acts as an audio destination.

### Data analysis and visualization

Interfaces for extracting audio graph statistics, for the purposes of data analysis and visualization.

- `AnalyserNode`
    Represents a node able to provide real-time frequency and time-domain analysis information.
- `AudioPlaybackStats`
    Provides access to duration, underrun, and latency statistics for the associated `AudioContext`. These statistics allow you to measure audio delay and glitches.

### Splitting and merging audio channels

To split and merge audio channels, you'll use these interfaces.

- `ChannelSplitterNode`
    The **`ChannelSplitterNode`** interface separates the different channels of an audio source out into a set of _mono_ outputs.
- `ChannelMergerNode`
    The **`ChannelMergerNode`** interface reunites different mono inputs into a single output. Each input will be used to fill a channel of the output.

### Audio spatialization

These interfaces allow you to add audio spatialization panning effects to your audio sources.

- `AudioListener`
    The **`AudioListener`** interface represents the position and orientation of the unique person listening to the audio scene used in audio spatialization.
- `PannerNode`
    The **`PannerNode`** interface represents the position and behavior of an audio source signal in 3D space, allowing you to create complex panning effects.
- `StereoPannerNode`
    The **`StereoPannerNode`** interface represents a simple stereo panner node that can be used to pan an audio stream left or right.

### Audio processing in JavaScript

Using audio worklets, you can define custom audio nodes written in JavaScript or WebAssembly. Audio worklets implement the `Worklet` interface, a lightweight version of the `Worker` interface.

- `AudioWorklet`
    The `AudioWorklet` interface is available through the `AudioContext` object's `audioWorklet`, and lets you add modules to the audio worklet to be executed off the main thread.
- `AudioWorkletNode`
    The `AudioWorkletNode` interface represents an `AudioNode` that is embedded into an audio graph and can pass <example-value> to the corresponding `AudioWorkletProcessor`.
- `AudioWorkletProcessor`
    The `AudioWorkletProcessor` interface represents audio processing code running in an `AudioWorkletGlobalScope` that generates, processes, or analyzes audio directly, and can pass <example-value> to the corresponding `AudioWorkletNode`.
- `AudioWorkletGlobalScope`
    The `AudioWorkletGlobalScope` interface is a `WorkletGlobalScope`-derived object representing a worker context in which an audio processing script is run; it is designed to enable the generation, processing, and analysis of audio data directly using JavaScript in a worklet thread rather than on the main thread.

#### Obsolete: script processor nodes

Before audio worklets were defined, the Web Audio API used the `ScriptProcessorNode` for JavaScript-based audio processing. Because the code runs in the main thread, they have bad performance. The `ScriptProcessorNode` is kept for historic reasons but is marked as deprecated.

- `ScriptProcessorNode` (deprecated)
    The **`ScriptProcessorNode`** interface allows the generation, processing, or analyzing of audio using JavaScript. It is an `AudioNode` audio-processing module that is linked to two buffers, one containing the current input, one containing the output. An event, implementing the `AudioProcessingEvent` interface, is sent to the object each time the input buffer contains new data, and the event handler terminates when it has filled the output buffer with data.
- `audioprocess` (event) (deprecated)
    The `audioprocess` event is fired when an input buffer of a Web Audio API `ScriptProcessorNode` is ready to be processed.
- `AudioProcessingEvent` (deprecated)
    The `AudioProcessingEvent` represents events that occur when a `ScriptProcessorNode` input buffer is ready to be processed.

### Offline/background audio processing

It is possible to process/render an audio graph very quickly in the background — rendering it to an `AudioBuffer` rather than to the device's speakers — with the following.

- `OfflineAudioContext`
    The **`OfflineAudioContext`** interface is an `AudioContext` interface representing an audio-processing graph built from linked together `AudioNode`s. In contrast with a standard `AudioContext`, an `OfflineAudioContext` doesn't really render the audio but rather generates it, _as fast as it can_, in a buffer.
- `complete` (event)
    The `complete` event is fired when the rendering of an `OfflineAudioContext` is terminated.
- `OfflineAudioCompletionEvent`
    The `OfflineAudioCompletionEvent` represents events that occur when the processing of an `OfflineAudioContext` is terminated. The `complete` event uses this interface.

## Libraries

- Tone.js: a framework for creating interactive music in the browser.
- howler.js: a JS audio library that defaults to Web Audio API and falls back to HTML Audio, as well as providing other useful features.
- Mooog: jQuery-style chaining of AudioNodes, mixer-style sends/returns, and more.
- XSound: Web Audio API Library for Synthesizer, Effects, Visualization, Recording, etc.
- OpenLang: HTML video language lab web application using the Web Audio API to record and combine video and audio from different sources into a single file (source on GitHub)
- Pts.js: Simplifies web audio visualization (guide)

## Examples

You can find a number of examples at our webaudio-examples repo on GitHub.

## See also

- Basic <example-value> behind Web Audio API
- Using the Web Audio API
- Advanced techniques: creating sound, sequencing, timing, scheduling
- Autoplay guide for media and Web Audio APIs
- Using IIR filters
- Visualizations with Web Audio API
- Web audio spatialization basics
- Controlling multiple parameters with ConstantSourceNode
- Web media technologies
- Guide to media types and formats on the web
- Mixing Positional Audio and WebGL (2012)
- Developing Game Audio with the Web Audio API (2012)
