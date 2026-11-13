---
title: "PeriodicWave"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/periodicwave/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PeriodicWave

The **`PeriodicWave`** interface defines a periodic waveform that can be used to shape the output of an `OscillatorNode`.

`PeriodicWave` has no inputs or outputs; it is used to define custom oscillators when calling `OscillatorNode.setPeriodicWave()`. The `PeriodicWave` itself is created/returned by `BaseAudioContext.createPeriodicWave`.

## Constructor

- `PeriodicWave()`
    Creates a new `PeriodicWave` object instance using the default values for all properties. If you wish to establish custom property values at the outset, use the `BaseAudioContext.createPeriodicWave` factory method instead.

## Instance properties

None; also, `PeriodicWave` doesn't inherit any properties.

## Instance methods

None; also, `PeriodicWave` doesn't inherit any methods.

## Example

See `BaseAudioContext.createPeriodicWave` for simple example code that shows how to create a `PeriodicWave` object containing a simple sine wave.

## See also

- Using the Web Audio API
