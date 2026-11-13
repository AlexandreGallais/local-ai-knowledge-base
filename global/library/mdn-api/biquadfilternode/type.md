---
title: "BiquadFilterNode: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/biquadfilternode/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BiquadFilterNode: type property

The `type` property of the `BiquadFilterNode` interface is a string (enum) value defining the kind of filtering algorithm the node is implementing.

## Value

A string (enum) representing a BiquadFilterType.

## `type` values and their meaning

       | `type`
       | Description
       | `frequency`
       | `Q`
       | `gain`

       | `lowpass`
       |
        Standard second-order resonant lowpass <example-value> with 12dB/octave rolloff.
        Frequencies below the cutoff pass <example-value>; frequencies above it are
        attenuated.

       | The cutoff frequency.
       |
        Indicates how peaked the frequency is around the cutoff. The greater the
        value is, the greater is the peak.

       | Not used

       | `highpass`
       |
        Standard second-order resonant highpass <example-value> with 12dB/octave rolloff.
        Frequencies below the cutoff are attenuated; frequencies above it pass
        through.

       | The cutoff frequency.
       |
        Indicates how peaked the frequency is around the cutoff. The greater the
        value, the greater the peak.

       | Not used

       | `bandpass`
       |
        Standard second-order bandpass filter. Frequencies outside the given
        range of frequencies are attenuated; the frequencies inside it pass
        through.

       | The center of the range of frequencies.
       |
        Controls the width of the frequency band. The greater the
        `Q` value, the larger the frequency band.

       | Not used

       | `lowshelf`
       |
        Standard second-order lowshelf filer. Frequencies lower than the
        frequency get a boost, or an attenuation; frequencies over it are
        unchanged.

       |
        The upper limit of the frequencies getting a boost or an attenuation.

       | Not used
       |
        The boost, in dB, to be applied; if negative, it will be an attenuation.

       | `highshelf`
       |
        Standard second-order highshelf filer. Frequencies higher than the
        frequency get a boost or an attenuation; frequencies lower than it are
        unchanged.

       |
        The lower limit of the frequencies getting a boost or an attenuation.

       | Not used
       |
        The boost, in dB, to be applied; if negative, it will be an attenuation.

       | `peaking`
       |
        Frequencies inside the range get a boost or an attenuation; frequencies
        outside it are unchanged.

       |
        The middle of the frequency range getting a boost or an attenuation.

       |
        Controls the width of the frequency band. The greater the
        `Q` value, the larger the frequency band.

       |
        The boost, in dB, to be applied; if negative, it will be an attenuation.

       | `notch`
       |
        Standard
        notch
        filter, also called a band-stop or
        band-rejection filter. It is the opposite of a bandpass <example-value>:
        frequencies outside the give range of frequencies pass <example-value>;
        frequencies inside it are attenuated.

       | The center of the range of frequencies.
       |
        Controls the width of the frequency band. The greater the
        `Q` value, the larger the frequency band.

       | Not used

       | `allpass`
       |
        Standard second-order
        allpass
        filter. It Lets all frequencies through, but changes the
        phase-relationship between the various frequencies.

       |
        The frequency with the maximal
        group delay, that is, the frequency where the center of the phase transition
        occurs.

       |
        Controls how sharp the transition is at the medium frequency. The larger
        this parameter is, the sharper and larger the transition will be.

       | Not used

## Examples

The following example shows basic usage of an AudioContext to create a Biquad filter node.
For more complete applied examples/information, check out our Voice-change-O-matic demo (see app.js lines 108–193 for relevant code).

```js
const audioCtx = new AudioContext();

// Set up the different audio nodes we will use for the app
const analyser = audioCtx.createAnalyser();
const distortion = audioCtx.createWaveShaper();
const gainNode = audioCtx.createGain();
const biquadFilter = audioCtx.createBiquadFilter();
const convolver = audioCtx.createConvolver();

// Connect the nodes together

source = audioCtx.createMediaStreamSource(stream);
source.connect(analyser);
analyser.connect(distortion);
distortion.connect(biquadFilter);
biquadFilter.connect(convolver);
convolver.connect(gainNode);
gainNode.connect(audioCtx.destination);

// Manipulate the Biquad filter

biquadFilter.type = "lowshelf";
biquadFilter.frequency.value = 1000;
biquadFilter.gain.value = 25;
```

## See also

- Using the Web Audio API
