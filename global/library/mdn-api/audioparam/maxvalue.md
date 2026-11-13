---
title: "AudioParam: maxValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioparam/maxvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioParam: maxValue property

The **`maxValue`**
read-only property of the `AudioParam` interface represents the maximum
possible value for the parameter's nominal (effective) range.

## Value

A floating-point `Number` indicating the maximum value permitted for the
parameter's nominal range.

The default value of `maxValue` is the maximum positive single-precision
floating-point value (+340,282,346,638,528,859,811,704,183,484,516,925,440).

## Examples

```js
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
console.log(gainNode.gain.maxValue); // 3.4028234663852886e38
```

## See also

- `AudioParam.minValue`
