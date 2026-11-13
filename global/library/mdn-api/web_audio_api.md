---
title: "Web Audio API (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_audio_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Audio API

The Web Audio API provides a powerful and versatile system for controlling audio on the Web, allowing developers to choose audio sources, add effects to audio, create audio visualizations, apply spatial effects (such as panning) and much more.

## Web audio concepts and usage

The Web Audio API involves handling audio operations inside an **audio context**, and has been designed to allow **modular routing**. Basic audio operations are performed with **audio nodes**, which are linked together to form an **audio routing graph**. Several sources — with different types of channel layout — are supported even within a single context. This modular design provides the flexibility to create complex audio functions with dynamic effects.

Audio nodes are linked into chains and simple webs by their inputs and outputs. They typically start with one or more sources. Sources provide arrays of samples — measurements of the audio signal's amplitude at successive moments in time — often tens of thousands per second. These could be either computed mathematically (such as `OscillatorNode`), or they can be recordings from sound/video files (like `AudioBufferSourceNode` and `MediaElementAudioSourceNode`) and audio streams (`MediaStreamAudioSourceNode`). In fact, sound files are just recordings of sound intensities themselves, which come in from microphones or electric instruments, and get mixed down into a single, complicated wave.

Outputs of these nodes could be linked to inputs of others, which mix or modify these streams of sound samples into different streams. A common modification is multiplying the samples by a value to make them louder or quieter (as is the case with `GainNode`). Once the sound has been sufficiently processed for the intended effect, it can be linked to the input of a destination (`BaseAudioContext.destination`), which sends the sound to the speakers or headphones. This last connection is only necessary if the user is supposed to hear the audio.

A simple, typical workflow for web audio would look something like this:

1. Create audio context
2. Inside the context, create sources — such as `<audio>`, oscillator, stream
3. Create effects nodes, such as reverb, biquad filter, panner, compressor
4. Choose final destination of audio, for example your system speakers
5. Connect the sources up to the effects, and the effects to the destination.

Timing is controlled with high precision and low latency, allowing developers to write code that responds accurately to events and is able to target specific samples, even at a high sample rate. So applications such as drum machines and sequencers are well within reach.

The Web Audio API also allows us to control how audio is _spatialized_. Using a system based on a _source-listener model_, it allows control of the _panning model_ and deals with _distance-induced attenuation_ induced by a moving source (or moving listener).

> **Note:**
> You can read about the theory of the Web Audio API in a lot more detail in our article Basic <example-value> behind Web Audio API.

## Web Audio API target audience

The Web Audio API can seem intimidating to those that aren't familiar with audio or music terms, and as it incorporates a great deal of functionality it can prove difficult to get started if you are a developer.

It can be used to incorporate audio into your website or application, by providing atmosphere like futurelibrary.no, or auditory feedback on forms. However, it can also be used to create _advanced_ interactive instruments. With that in mind, it is suitable for both developers and musicians alike.

We have a simple introductory tutorial for those that are familiar with programming but need a good introduction to some of the terms and structure of the API.

There's also a Basic <example-value> Behind Web Audio API article, to help you understand the way digital audio works, specifically in the realm of the API. This also includes a good introduction to some of the concepts the API is built upon.

Learning coding is like playing cards — you learn the rules, then you play, then you go back and learn the rules again, then you play again. So if some of the theory doesn't quite fit after the first tutorial and article, there's an advanced tutorial which extends the first one to help you practice what you've learned, and apply some more advanced techniques to build up a step sequencer.

We also have other tutorials and comprehensive reference material available that covers all features of the API. See the sidebar on this page for more.

If you are more familiar with the musical side of things, are familiar with music theory concepts, want to start building instruments, then you can go ahead and start building things with the advanced tutorial and others as a guide (the above-linked tutorial covers scheduling notes, creating bespoke oscillators and envelopes, as well as an LFO among other things.)

If you aren't familiar with the programming basics, you might want to consult some beginner's JavaScript tutorials first and then come back here — see our Beginner's JavaScript learning module for a great place to begin.
