---
title: "DynamicsCompressorNode: DynamicsCompressorNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dynamicscompressornode/dynamicscompressornode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DynamicsCompressorNode: DynamicsCompressorNode() constructor

The **`DynamicsCompressorNode()`** constructor creates a new `DynamicsCompressorNode` object instance, which can be used to provide a compression effect that lowers the volume of the loudest parts of a signal.

Compression can help prevent clipping and distortion when multiple sounds are combined, and it is also used in music production and game audio for dynamic control, tone shaping, and creative effects.

## Syntax

```js
new DynamicsCompressorNode(context, options)
```

### Parameters

- `context`
    A reference to an `AudioContext`.
- `options` (optional)
    Options are as follows:
    - `attack`
        The amount of time (in seconds) to reduce the gain by 10dB.
        Its default value is 0.003.
        This parameter is k-rate.
        Its nominal range is \[0, 1].
    - `knee`
        A decibel value representing the range above the threshold where the curve smoothly transitions to the "ratio" portion.
        Its default value is 30.
        This parameter is k-rate.
        Its nominal range is \[0, 40].
    - `ratio`
        The amount of dB change in input for a 1 dB change in output.
        Its default value is 12.
        This parameter is k-rate.
        Its nominal range is \[1, 20].
    - `release`
        The amount of time (in seconds) to increase the gain by 10dB. Its
        default value is 0.250.
        This parameter is k-rate.
        Its nominal range is \[0, 1].
    - `threshold`
        The decibel value above which the compression will start taking effect.
        Its default value is -24.
        This parameter is k-rate.
        Its nominal range is\[-100, 0].
