---
title: "AudioNode: channelCountMode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audionode/channelcountmode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioNode: channelCountMode property

The `channelCountMode` property of the `AudioNode` interface represents an enumerated value describing the way channels must be matched between the node's inputs and outputs.

## Value

The possible values of the `channelCountMode` enumerated value, and their meanings are:

- `max`
    The number of channels is equal to the maximum number of channels of all connections.
    In this case, `channelCount` is ignored and only up-mixing happens.

    The following AudioNode children default to this value: `GainNode`, `DelayNode`, `ScriptProcessorNode`, `BiquadFilterNode`, `WaveShaperNode`.

- `clamped-max`
    The number of channels is equal to the maximum number of channels of all connections, clamped to the value of `channelCount`.

    The following AudioNode children default to this value: `PannerNode`, `ConvolverNode`, `DynamicsCompressorNode`

- `explicit`
    The number of channels is defined by the value of `channelCount`.

    The following AudioNode children default to this value: `AudioDestinationNode`, `AnalyserNode`, `ChannelSplitterNode`, `ChannelMergerNode`

> **Note:**
> In older versions of the spec, the default for a `ChannelSplitterNode` was `max`.

## Examples

```js
const audioCtx = new AudioContext();

const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

oscillator.channelCountMode = "explicit";
```

## See also

- Using the Web Audio API
