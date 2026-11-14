---
title: "OscillatorNode: setPeriodicWave() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oscillatornode/setperiodicwave/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OscillatorNode: setPeriodicWave() method

The **`setPeriodicWave()`** method of the `OscillatorNode` interface is used to point to a `PeriodicWave`
defining a periodic waveform that can be used to shape the oscillator's output, when
`type` is `custom`.

## Syntax

```js
setPeriodicWave(wave)
```

### Parameters

- `wave`
    A `PeriodicWave` object representing the waveform to use as the shape
    of the oscillator's output.

### Return value

None (`undefined`).

## Examples

The following example illustrates simple usage of `createPeriodicWave()`,
recreating a sine wave from a periodic wave.

```js
const real = new Float32Array(2);
const imag = new Float32Array(2);
const ac = new AudioContext();
const osc = ac.createOscillator();

real[0] = 0;
imag[0] = 0;
real[1] = 1;
imag[1] = 0;

const wave = ac.createPeriodicWave(real, imag);

osc.setPeriodicWave(wave);

osc.connect(ac.destination);

osc.start();
osc.stop(2);
```

This works because a sound that contains only a fundamental tone is by definition a
sine wave.

Here, we create a `PeriodicWave` with two values. The first value is the DC
offset, which is the value at which the oscillator starts. 0 is good here, because we
want to start the curve at the middle of the \[-1.0; 1.0] range.

The second and subsequent values are sine and cosine components. You can think of it as
the result of a Fourier transform, where you get frequency domain values from time
domain value. Here, with `createPeriodicWave()`, you specify the frequencies,
and the browser performs an inverse Fourier transform to get a time domain buffer for
the frequency of the oscillator. Here, we only set one component at full volume (1.0) on
the fundamental tone, so we get a sine wave.

## See also

- Using the Web Audio API
- AudioContext.createPeriodicWave
