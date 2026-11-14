---
title: "Example and tutorial: Simple synth keyboard (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_audio_api/simple_synth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Example and tutorial: Simple synth keyboard

This article presents the code and working demo of a video keyboard you can play using the mouse. The keyboard allows you to switch among the standard waveforms as well as one custom waveform, and you can control the main gain using a volume slider beneath the keyboard. This example makes use of the following Web API interfaces: `AudioContext`, `OscillatorNode`, `PeriodicWave`, and `GainNode`.

Because `OscillatorNode` is based on `AudioScheduledSourceNode`, this is to some extent an example for that as well.
