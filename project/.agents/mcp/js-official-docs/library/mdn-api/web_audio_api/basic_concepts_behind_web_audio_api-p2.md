---
title: "Basic concepts behind Web Audio API (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_audio_api/basic_concepts_behind_web_audio_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Basic concepts behind Web Audio API (part 2 of 2)

## Audio channels

Each audio buffer may contain different numbers of channels. Most modern audio devices use the basic <example-value> (only one channel) and _stereo_ (left and right channels) settings. Some more complex sets support _surround sound_ settings (like _quad_ and _5.1_), which can lead to a richer sound experience thanks to their high channel count. We usually represent the channels with the standard abbreviations detailed in the table below:

| Name     | Channels                                                                                           |
| -------- | -------------------------------------------------------------------------------------------------- |
| _Mono_   | `0: M: mono`                                                                                       |
| _Stereo_ | `0: L: left 1: R: right`                                                                           |
| _Quad_   | `0: L: left 1: R: right 2: SL: surround left 3: SR: surround right`                                |
| _5.1_    | `0: L: left 1: R: right 2: C: center 3: LFE: subwoofer 4: SL: surround left 5: SR: surround right` |

### Up-mixing and down-mixing

When the numbers of channels of the input and the output don't match, up-mixing, or down-mixing, must be done. The following rules, controlled by setting the `AudioNode.channelInterpretation` property to `speakers` or `discrete`, apply:

       | Interpretation
       | Input channels
       | Output channels
       | Mixing rules

       | `speakers`
       | `1` (Mono)
       | `2` (Stereo)
       |
        Up-mix from mono to stereo.The `M` input
        channel is used for both output channels (`L` and
        `R`).<code
          >output.L = input.Moutput.R = input.M</code
        >

       | `1` (Mono)
       | `4` (Quad)
       |
        Up-mix from mono to quad.The `M` input channel
        is used for non-surround output channels (`L` and
        `R`). Surround output channels (`SL` and
        `SR`) are silent.<code
          >output.L = input.Moutput.R = input.Moutput.SL = 0output.SR
          = 0</code
        >

       | `1` (Mono)
       | `6` (5.1)
       |
        Up-mix from mono to 5.1.The `M` input channel
        is used for the center output channel (`C`). All the others
        (`L`, `R`, `LFE`, `SL`, and
        `SR`) are silent.<code
          >output.L = 0output.R = 0</code
        ><code
          >output.C = input.Moutput.LFE = 0output.SL = 0output.SR
          = 0</code
        >

       | `2` (Stereo)
       | `1` (Mono)
       |
        Down-mix from stereo to mono.Both input channels (<code
          >L</code
        >
        and `R`) are equally combined to produce the unique output
        channel (`M`).<code
          >output.M = 0.5 * (input.L + input.R)</code
        >

       | `2` (Stereo)
       | `4` (Quad)
       |
        Up-mix from stereo to quad.The `L` and
        `R` input channels are used for their non-surround respective
        output channels (`L` and `R`). Surround output
        channels (`SL` and `SR`) are silent.<code
          >output.L = input.Loutput.R = input.Routput.SL = 0output.SR
          = 0</code
        >

       | `2` (Stereo)
       | `6` (5.1)
       |
        Up-mix from stereo to 5.1.The `L` and
        `R` input channels are used for their non-surround respective
        output channels (`L` and `R`). Surround output
        channels (`SL` and `SR`), as well as the center
        (`C`) and subwoofer (`LFE`) channels, are left
        silent.<code
          >output.L = input.Loutput.R = input.Routput.C = 0output.LFE
          = 0output.SL = 0output.SR = 0</code
        >

       | `4` (Quad)
       | `1` (Mono)
       |
        Down-mix from quad to mono.All four input channels
        (`L`, `R`, `SL`, and `SR`)
        are equally combined to produce the unique output channel
        (`M`).
        `output.M = 0.25 * (input.L + input.R + input.SL + input.SR)`

       | `4` (Quad)
       | `2` (Stereo)
       |
        Down-mix from quad to stereo.Both left input channels
        (`L` and `SL`) are equally combined to produce the
        unique left output channel (`L`). And similarly, both right
        input channels (`R` and `SR`) are equally combined
        to produce the unique right output channel (`R`).
        `output.L = 0.5 * (input.L + input.SL)`
        `output.R = 0.5 * (input.R + input.SR)`

       | `4` (Quad)
       | `6` (5.1)
       |
        Up-mix from quad to 5.1.The `L`,
        `R`, `SL`, and `SR` input channels are
        used for their respective output channels (`L` and
        `R`). Center (`C`) and subwoofer
        (`LFE`) channels are left silent.
        `output.L = input.L`
        `output.R = input.R`
        `output.C = 0`
        `output.LFE = 0`
        `output.SL = input.SL`
        `output.SR = input.SR`

       | `6` (5.1)
       | `1` (Mono)
       |
        Down-mix from 5.1 to mono.The left (`L` and
        `SL`), right (`R` and `SR`) and central
        channels are all mixed together. The surround channels are slightly
        attenuated, and the regular lateral channels are power-compensated to
        make them count as a single channel by multiplying by `√2/2`.
        The subwoofer (`LFE`) channel is lost.
        `output.M = 0.7071 * (input.L + input.R) + input.C + 0.5 * (input.SL + input.SR)`

       | `6` (5.1)
       | `2` (Stereo)
       |
        Down-mix from 5.1 to stereo.The central channel
        (`C`) is summed with each lateral surround channel (<code
          >SL</code
        >
        or `SR`) and mixed to each lateral channel. As it is mixed
        down to two channels, it is mixed at a lower power: in each case, it is
        multiplied by `√2/2`. The subwoofer (`LFE`)
        channel is lost.
        `output.L = input.L + 0.7071 * (input.C + input.SL)`
        `output.R = input.R + 0.7071 * (input.C + input.SR)`

       | `6` (5.1)
       | `4` (Quad)
       |
        Down-mix from 5.1 to quad.The central (`C`) is
        mixed with the lateral non-surround channels (`L` and
        `R`). As it is mixed down to two channels, it is mixed at a
        lower power: in each case, it is multiplied by `√2/2`. The
        surround channels are passed unchanged. The subwoofer (`LFE`)
        channel is lost.
        `output.L = input.L + 0.7071 * input.C`
        `output.R = input.R + 0.7071 * input.C`
        `output.SL = input.SL`
        `output.SR = input.SR`

       | Other, non-standard layouts
       |
        Non-standard channel layouts behave as if
        `channelInterpretation` is set to
        `discrete`.The specification explicitly allows the future definition of new speaker layouts. Therefore, this fallback is not future-proof as the behavior of the browsers for a specific number of channels may change in the future.

       | `discrete`
       | any (`x`)
       | any (`y`) where `x&#x3C;y`
       |
        Up-mix discrete channels.Fill each output channel with
        its input counterpart — that is, the input channel with the same index.
        Channels with no corresponding input channels are left silent.

       | any (`x`)
       | any (`y`) where `x>y`
       |
        Down-mix discrete channels.Fill each output channel with
        its input counterpart — that is, the input channel with the same index.
        Input channels with no corresponding output channels are dropped.

## Visualizations

In general, we get the output over time to produce audio visualizations, usually reading its gain or frequency data. Then, using a graphical tool, we turn the obtained data into a visual representation, such as a graph. The Web Audio API has an `AnalyserNode` available that doesn't alter the audio signal passing through it. Additionally, it outputs the audio data, allowing us to process it via a technology such as `<canvas>`.

You can grab data using the following methods:

- `AnalyserNode.getFloatFrequencyData()`
    Copies the current frequency data into a `Float32Array` array passed into it.
- `AnalyserNode.getByteFrequencyData()`
    Copies the current frequency data into a `Uint8Array` (unsigned byte array) passed into it.
- `AnalyserNode.getFloatTimeDomainData()`
    Copies the current waveform, or time-domain, data into a `Float32Array` array passed into it.
- `AnalyserNode.getByteTimeDomainData()`
    Copies the current waveform, or time-domain, data into a `Uint8Array` (unsigned byte array) passed into it.

> **Note:**
> For more information, see our Visualizations with Web Audio API article.

## Spatializations

Audio spatialization allows us to model the position and behavior of an audio signal at a certain point in physical space, simulating the listener hearing that audio. In the Web Audio API, spatialization is handled by the `PannerNode` and the `AudioListener`.

The panner uses right-hand Cartesian coordinates to describe the audio source's _position_ as a vector and its _orientation_ as a 3D directional cone. The cone can be pretty large, for example, for omnidirectional sources.

Similarly, the Web Audio API describes the listener using right-hand Cartesian coordinates: their _position_ as one vector and their _orientation_ as two direction vectors, _up_ and _front_. These vectors define the direction of the top of the listener's head and the direction the listener's nose is pointing. The vectors are perpendicular to one another.

> **Note:**
> For more information, see our Web audio spatialization basics article.

## Fan-in and Fan-out

In audio terms, **fan-in** describes the process by which a `ChannelMergerNode` takes a series of _mono_ input sources and outputs a single multi-channel signal:

**Fan-out** describes the opposite process, whereby a `ChannelSplitterNode` takes a multi-channel input source and outputs multiple _mono_ output signals:
