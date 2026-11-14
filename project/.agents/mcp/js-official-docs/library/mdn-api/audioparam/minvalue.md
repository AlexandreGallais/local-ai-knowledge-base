---
title: "AudioParam: minValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioparam/minvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioParam: minValue property

The **`minValue`**
read-only property of the `AudioParam` interface represents the minimum
possible value for the parameter's nominal (effective) range.

## Value

A floating-point `Number` indicating the minimum value permitted for the
parameter's nominal range.

The default value of `minValue` is the minimum negative single-precision
floating-point value (-340,282,346,638,528,859,811,704,183,484,516,925,440).

## Examples

```js
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
console.log(gainNode.gain.minValue); // -3.4028234663852886e38
```

## See also

- `AudioParam.maxValue`
