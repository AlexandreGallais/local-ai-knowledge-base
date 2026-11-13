---
title: "PeriodicWave: PeriodicWave() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/periodicwave/periodicwave/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PeriodicWave: PeriodicWave() constructor

The **`PeriodicWave()`** constructor of the Web Audio API creates a new
`PeriodicWave` object instance.

## Syntax

```js
new PeriodicWave(context)
new PeriodicWave(context, options)
```

### Parameters

- `context`
    A `BaseAudioContext` representing the audio context you want the node
    to be associated with.
- `options` (optional)
    A
    `PeriodicWaveOptions`
    dictionary object defining the properties you want the `PeriodicWave` to
    have (It also inherits the options defined in the PeriodicWaveConstraints
    dictionary.):
    - `real`
        A `Float32Array` containing the cosine terms
        that you want to use to form the wave (equivalent to the `real`
        parameter of `BaseAudioContext.createPeriodicWave`).
    - `imag`
        A `Float32Array` containing the sine terms that
        you want to use to form the wave (equivalent to the `imag` parameter of
        `BaseAudioContext.createPeriodicWave`).

### Return value

A new `PeriodicWave` object instance.

## Examples

```js
const real = new Float32Array(2);
const imag = new Float32Array(2);
const ac = new AudioContext();

real[0] = 0;
imag[0] = 0;
real[1] = 1;
imag[1] = 0;

const wave = new PeriodicWave(ac, {
  real,
  imag,
  disableNormalization: false,
});
```
